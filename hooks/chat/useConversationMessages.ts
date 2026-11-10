"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { InfiniteData, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useMessageSocket } from "@/lib/providers/MessageSocketProvider";
import {
  MessageSocketError,
  requestSocketAck,
  socketEvents,
  type MessageHistoryResult,
  type TextMessageEvent,
} from "@/lib/socket/messageSocket";

export const conversationMessagesKey = (conversationId: string | null) =>
  ["conversation", conversationId, "messages"] as const;

type MessagePages = InfiniteData<MessageHistoryResult, string | undefined>;

function addMessageToCache(
  queryClient: ReturnType<typeof useQueryClient>,
  conversationId: string,
  message: TextMessageEvent,
) {
  queryClient.setQueryData<MessagePages>(conversationMessagesKey(conversationId), (cached) => {
    if (!cached?.pages.length) return cached;
    if (cached.pages.some((page) => page.data.some((item) => item.id === message.id))) {
      return cached;
    }
    return {
      ...cached,
      pages: cached.pages.map((page, index) =>
        index === 0 ? { ...page, data: [message, ...page.data] } : page,
      ),
    };
  });
}

function uuid() {
  return crypto.randomUUID();
}

export default function useConversationMessages(conversationId: string | null) {
  const { socket, connected, connectionError } = useMessageSocket();
  const queryClient = useQueryClient();
  const [joined, setJoined] = useState(false);
  const [joinError, setJoinError] = useState<string | null>(null);
  // Retain an operation ID only when the outcome is uncertain, so retrying the
  // same draft is idempotent while a later, separate send gets a fresh ID.
  const uncertainOperations = useRef(new Map<string, string>());
  const receivedMessages = useRef(new Map<string, TextMessageEvent>());

  useEffect(() => {
    setJoined(false);
    setJoinError(null);
    if (!socket || !connected || !conversationId) return;

    let active = true;
    const onMessageCreated = (message: TextMessageEvent) => {
      if (message.conversationId === conversationId) {
        receivedMessages.current.set(message.id, message);
        if (receivedMessages.current.size > 1_000) {
          const oldestMessageId = receivedMessages.current.keys().next().value;
          if (oldestMessageId) receivedMessages.current.delete(oldestMessageId);
        }
        addMessageToCache(queryClient, conversationId, message);
      }
    };
    socket.on(socketEvents.messageCreated, onMessageCreated);

    void requestSocketAck<{ conversationId: string }>(socket, socketEvents.joinConversation, {
      conversationId,
    })
      .then(() => {
        if (active) setJoined(true);
      })
      .catch((error: unknown) => {
        if (active) {
          setJoinError(error instanceof Error ? error.message : "Could not open this conversation.");
        }
      });

    return () => {
      active = false;
      socket.off(socketEvents.messageCreated, onMessageCreated);
      if (socket.connected) {
        void requestSocketAck(socket, socketEvents.leaveConversation, { conversationId }).catch(() => undefined);
      }
    };
  }, [socket, connected, conversationId, queryClient]);

  const query = useInfiniteQuery({
    queryKey: conversationMessagesKey(conversationId),
    queryFn: async ({ pageParam }) => {
      if (!socket || !conversationId) throw new Error("Conversation is unavailable.");
      const page = await requestSocketAck<MessageHistoryResult>(socket, socketEvents.getMessageHistory, {
        conversationId,
        ...(pageParam ? { before: pageParam } : {}),
        limit: 50,
      });
      if (!pageParam) {
        const messageIds = new Set(page.data.map((message) => message.id));
        const liveMessages = [...receivedMessages.current.values()].filter(
          (message) =>
            message.conversationId === conversationId && !messageIds.has(message.id),
        );
        return { ...page, data: [...liveMessages, ...page.data] };
      }
      return page;
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: Boolean(socket && connected && joined && conversationId),
    retry: false,
    staleTime: 0,
  });

  const sendMessage = useCallback(async (body: string) => {
    const trimmedBody = body.trim();
    if (!socket || !conversationId || !connected || !joined) {
      throw new MessageSocketError("DISCONNECTED", "Chat is reconnecting. Your draft is safe; try again shortly.");
    }
    if (!trimmedBody || trimmedBody.length > 10_000) {
      throw new MessageSocketError("INVALID_PAYLOAD", "Messages must be between 1 and 10,000 characters.");
    }

    const operationId = uncertainOperations.current.get(trimmedBody) ?? uuid();
    try {
      const result = await requestSocketAck<{ message: TextMessageEvent; duplicate: boolean }>(
        socket,
        socketEvents.sendTextMessage,
        { conversationId, operationId, body: trimmedBody },
      );
      uncertainOperations.current.delete(trimmedBody);
      // Both normal and duplicate acknowledgments resolve to the one persisted row.
      addMessageToCache(queryClient, conversationId, result.message);
      return result.message;
    } catch (error) {
      if (
        error instanceof MessageSocketError &&
        ["ACK_TIMEOUT", "DISCONNECTED"].includes(error.code)
      ) {
        uncertainOperations.current.set(trimmedBody, operationId);
      } else {
        uncertainOperations.current.delete(trimmedBody);
      }
      throw error;
    }
  }, [socket, conversationId, connected, joined, queryClient]);

  const restartHistory = useCallback(
    () => queryClient.resetQueries({ queryKey: conversationMessagesKey(conversationId), exact: true }),
    [queryClient, conversationId],
  );

  return { ...query, sendMessage, restartHistory, joined, joinError, connected, connectionError };
}

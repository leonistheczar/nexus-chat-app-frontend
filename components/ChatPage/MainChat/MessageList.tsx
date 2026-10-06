"use client";

import { ChatMessage } from "@/app/types/types";
import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

type MessageListProps = {
  messages: ChatMessage[];
  currentUserId: number;
  onDeleteMessage: (messageId: number | string) => void;
  onCopyMessage: (content: string) => void;
  canLoadOlder?: boolean;
  isLoadingOlder?: boolean;
  onLoadOlder?: () => void;
  canDeleteMessages?: boolean;
};

export default function MessageList({
  messages,
  currentUserId,
  onDeleteMessage,
  onCopyMessage,
  canLoadOlder = false,
  isLoadingOlder = false,
  onLoadOlder,
  canDeleteMessages = true,
}: MessageListProps) {
  const chatEndRef = useRef<HTMLDivElement>(null);
  const latestMessageId = messages.at(-1)?.id ?? null;
  const previousLatestMessageId = useRef<number | string | null>(null);

  // Keep the view at the bottom for new messages without jumping on older pages.
  useEffect(() => {
    if (latestMessageId !== previousLatestMessageId.current) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
      previousLatestMessageId.current = latestMessageId;
    }
  }, [latestMessageId]);

  if (messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-text-500 text-sm">
        No messages yet. Start a conversation!
      </div>
    );
  }

  return (
    <div
      id="chat-ui"
      className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-background-300 scrollbar-track-transparent"
    >
      {canLoadOlder && (
        <button
          type="button"
          onClick={onLoadOlder}
          disabled={isLoadingOlder}
          className="mx-auto block rounded-full bg-primary-100 px-3 py-1 text-xs text-text-600 hover:bg-primary-200 disabled:opacity-60"
        >
          {isLoadingOlder ? "Loading older notes..." : "Load older notes"}
        </button>
      )}
      {messages.map((message) => {
        const isCurrentUser = message.sender.id === currentUserId;

        return (
          <MessageBubble
            key={message.id}
            message={message}
            isCurrentUser={isCurrentUser}
            onDelete={onDeleteMessage}
            onCopy={onCopyMessage}
            canDelete={canDeleteMessages}
          />
        );
      })}
      <div ref={chatEndRef} />
    </div>
  );
}

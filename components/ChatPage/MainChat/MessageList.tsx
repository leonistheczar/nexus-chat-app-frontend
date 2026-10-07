"use client";

import { ChatMessage } from "@/app/types/types";
import { Fragment, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

const getLocalDayKey = (date?: Date) => {
  if (!date || Number.isNaN(date.getTime())) return null;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
};

const formatDayLabel = (date: Date) => {
  const today = new Date();
  const todayKey = getLocalDayKey(today);
  const dateKey = getLocalDayKey(date);

  if (dateKey === todayKey) return "Today";

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (dateKey === getLocalDayKey(yesterday)) return "Yesterday";

  return new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

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
      {messages.map((message, index) => {
        const isCurrentUser = message.sender.id === currentUserId;
        const dayKey = getLocalDayKey(message.createdAt);
        const previousDayKey = getLocalDayKey(messages[index - 1]?.createdAt);
        const showDaySeparator = dayKey !== null && dayKey !== previousDayKey;
        const dayLabel = message.createdAt ? formatDayLabel(message.createdAt) : null;

        return (
          <Fragment key={message.id}>
            {showDaySeparator && dayLabel && (
              <div
                className="flex justify-center py-1"
                role="separator"
                aria-label={dayLabel}
              >
                <span className="rounded-full bg-accent-100/40 px-3 py-1 text-xs text-text-600 shadow-sm">
                  {dayLabel}
                </span>
              </div>
            )}
            <MessageBubble
              message={message}
              isCurrentUser={isCurrentUser}
              onDelete={onDeleteMessage}
              onCopy={onCopyMessage}
              canDelete={canDeleteMessages}
            />
          </Fragment>
        );
      })}
      <div ref={chatEndRef} />
    </div>
  );
}

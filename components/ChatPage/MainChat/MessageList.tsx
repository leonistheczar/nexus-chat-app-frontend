"use client";

import { ChatMessage } from "@/app/types/types";
import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

type MessageListProps = {
  messages: ChatMessage[];
  currentUserId: number;
  onDeleteMessage: (messageId: number) => void;
  onCopyMessage: (content: string) => void;
};

export default function MessageList({
  messages,
  currentUserId,
  onDeleteMessage,
  onCopyMessage,
}: MessageListProps) {
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
      {messages.map((message) => {
        const isCurrentUser = message.sender.id === currentUserId;

        return (
          <MessageBubble
            key={message.id}
            message={message}
            isCurrentUser={isCurrentUser}
            onDelete={onDeleteMessage}
            onCopy={onCopyMessage}
          />
        );
      })}
      <div ref={chatEndRef} />
    </div>
  );
}
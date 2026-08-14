// components/chat/MessageInput.tsx
"use client";

import { SendHorizontal, Loader2 } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";

type MessageInputProps = {
  onSendMessage: (content: string) => void;
  placeholder?: string;
  disabled?: boolean;
};

export default function MessageInput({
  onSendMessage,
  placeholder = "Type a message...",
  disabled = false,
}: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`;
    }
  }, [message]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!message.trim() || disabled) return;

      setIsSending(true);
      try {
        await onSendMessage(message.trim());
        setMessage("");
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto";
        }
      } finally {
        setIsSending(false);
      }
    },
    [message, disabled, onSendMessage]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e);
      }
    },
    [handleSubmit]
  );

  return (
    <form
      className="bg-secondary-100 mb-2 mx-2 rounded-2xl flex items-center justify-between gap-x-2 shrink-0"
      onSubmit={handleSubmit}
    >
      <textarea
        ref={textareaRef}
        name="message"
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full text-sm focus:outline-none p-3 resize-none overflow-y-auto bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Type a message"
      />
      <button
        title="Send message"
        type="submit"
        disabled={!message.trim() || disabled}
        className="relative right-2 bg-primary-200 p-2 rounded-full transition-all duration-100 hover:bg-primary-300/80 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSending ? (
          <Loader2 size={20} className="animate-spin" />
        ) : (
          <SendHorizontal size={20} />
        )}
      </button>
    </form>
  );
}
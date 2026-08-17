"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Message } from "@/app/types/types";
import Image from "next/image";

type ChatSimulationProps = {
  autoPlay?: boolean;
  playOnce?: boolean;
  className?: string;
  messageDelay?: number;
  typingDelay?: number;
};

export default function ChatSimulation({
  autoPlay = true,
  playOnce = true,
  className = "",
  messageDelay = 800,
  typingDelay = 1400,
}: ChatSimulationProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [error, setError] = useState<string | null>(null);
  
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const hasRun = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Scroll to bottom when messages or typing state changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, typing]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const delay = useCallback(
    (ms: number) =>
      new Promise<void>((resolve, reject) => {
        const timeoutId = setTimeout(resolve, ms);
        abortControllerRef.current?.signal.addEventListener("abort", () => {
          clearTimeout(timeoutId);
          reject(new Error("Aborted"));
        });
      }),
    []
  );

  const addMessage = useCallback((text: string, sender: Message["sender"]) => {
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text,
        sender,
        timestamp: new Date(),
      },
    ]);
  }, []);

  const handleTyping = useCallback((isTyping: boolean) => {
    setTyping(isTyping);
  }, []);

  const resetChat = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();
    setMessages([]);
    setTyping(false);
    setError(null);
    hasRun.current = false;
  }, []);

  const playSequence = useCallback(async () => {
    if (hasRun.current && playOnce) return;
    hasRun.current = true;
    setIsPlaying(true);
    setError(null);
    abortControllerRef.current = new AbortController();

    try {
      await delay(messageDelay);
      addMessage("Hey, is Nexus real-time?", "other");

      await delay(1000);
      handleTyping(true);

      await delay(typingDelay);
      handleTyping(false);
      addMessage("Yep. Messages are instant ⚡", "me");

      await delay(1000);
      addMessage("And encrypted?", "other");

      await delay(900);
      handleTyping(true);

      await delay(typingDelay);
      handleTyping(false);
      addMessage("End-to-end 🔐", "me");
    } catch (err) {
      if ((err as Error).message !== "Aborted") {
        setError("Failed to play simulation");
        console.error("Simulation error:", err);
      }
    } finally {
      setIsPlaying(false);
    }
  }, [addMessage, delay, handleTyping, messageDelay, playOnce, typingDelay]);

  useEffect(() => {
    if (autoPlay && !hasRun.current) {
      playSequence();
    }
  }, [autoPlay, playSequence]);

  const messageItems = useMemo(
    () =>
      messages.map((msg) => (
        <motion.div
          key={msg.id}
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className={`flex ${
            msg.sender === "me" ? "justify-end" : "justify-start"
          }`}
          role="listitem"
          aria-label={`${msg.sender === "me" ? "You" : "Other"} said: ${msg.text}`}
        >
          <div className="flex items-end gap-2 max-w-[80%]">
            {/* Avatar for other messages */}
            {msg.sender === "other" && (
              <div className="relative w-6 h-6 rounded-full bg-background-50 overflow-hidden shrink-0">
                <Image
                  src="/logo/nexus-logo.png"
                  alt="Nexus"
                  fill
                  sizes="24px"
                  className="object-contain"
                  priority
                />
              </div>
            )}

            {/* Message Bubble */}
            <div
              className={`px-4 py-2 rounded-2xl text-sm leading-relaxed wrap-break-word ${
                msg.sender === "me"
                  ? "bg-primary-700 text-text-100 rounded-br-md"
                  : "bg-primary-400/30 text-primary-900 rounded-bl-md"
              }`}
            >
              {msg.text}
            </div>
          </div>
        </motion.div>
      )),
    [messages]
  );

  return (
    <div
      className={`max-w-md mx-auto bg-primary-200/40 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-primary-700/30 ${className}`}
      role="region"
      aria-label="Chat simulation"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-text-800">
          Live Demo
        </h3>
        <div className="flex gap-2">
          {isPlaying ? (
            <span className="text-xs text-text-500">Playing...</span>
          ) : (
            <button
              onClick={() => {
                resetChat();
                playSequence();
              }}
              className="text-xs text-primary-600 hover:text-primary-700 hover:underline cursor-pointer"
              aria-label="Replay simulation"
            >
              Replay
            </button>
          )}
        </div>
      </div>

      {/* Chat container */}
      <div
        ref={scrollContainerRef}
        className="relative space-y-3 overflow-y-auto overflow-x-hidden p-1 min-h-60 scrollbar-thin scrollbar-thumb-primary-300 scrollbar-track-transparent"
        role="list"
      >
        {error && (
          <div className="text-center text-sm text-red-500 py-4">
            {error}
          </div>
        )}

        {messages.length === 0 && !isPlaying && (
          <div className="text-center text-sm text-text-500 py-8">
            No messages yet
          </div>
        )}

        <AnimatePresence mode="popLayout">
          {messageItems}
        </AnimatePresence>

        {typing && (
         <motion.div
         initial={{ opacity: 0, x: 20 }}
         animate={{ opacity: 1, x: 0 }}
         exit={{ opacity: 0, x: 20 }}
         transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
         className="flex items-center gap-2 justify-end"
         role="status"
         aria-label="Typing indicator"
       >
         <div className="flex gap-1 px-3 py-2 rounded-2xl bg-primary-700/20">
           <span className="w-1.5 h-1.5 bg-primary-700 rounded-full animate-bounce" />
           <span className="w-1.5 h-1.5 bg-primary-700 rounded-full animate-bounce [animation-delay:0.2s]" />
           <span className="w-1.5 h-1.5 bg-primary-700 rounded-full animate-bounce [animation-delay:0.4s]" />
         </div>
         {/* Avatar for "me" on the right */}
         <div className="w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center">
           <span className="text-xs text-white">💬</span>
         </div>
       </motion.div>
        )}
      </div>
    </div>
  );
}
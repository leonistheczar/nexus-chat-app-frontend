"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Message } from "@/app/types/types";
import Image from "next/image";

export default function ChatSimulation() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    const sequence = async () => {
      await delay(800);
      addMessage("Hey, is Nexus real-time?", "other");

      await delay(1000);
      setTyping(true);

      await delay(1400);
      setTyping(false);
      addMessage("Yep. Messages are instant ⚡", "me");

      await delay(1000);
      addMessage("And encrypted?", "other");

      await delay(900);
      setTyping(true);

      await delay(1300);
      setTyping(false);
      addMessage("End-to-end 🔐", "me");
    };

    sequence();
  }, []);

  // ✅ Scroll the container div, not the page
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const addMessage = (text: string, sender: Message["sender"]) => {
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), text, sender }]);
  };

  return (
    <div className="max-w-md mx-auto bg-primary-200/40 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-primary-700/30">
      <div ref={scrollContainerRef} className="space-y-3 overflow-y-auto pr-1">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex ${
                msg.sender === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="flex items-end gap-2 max-w-[80%]">
                {/* Avatar */}
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
                  className={`px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === "me"
                      ? "bg-primary-700 text-text-100 rounded-br-md"
                      : "bg-primary-400/30 text-primary-900 rounded-bl-md"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {typing && (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary-400/60" />
            <div className="flex gap-1 px-3 py-2 rounded-2xl bg-primary-400/30">
              <span className="w-1.5 h-1.5 bg-primary-700 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-primary-700 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-primary-700 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

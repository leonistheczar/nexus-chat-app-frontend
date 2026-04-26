"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Message } from "@/app/types/types";

export default function ChatSimulation() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const sequence = async () => {
      await delay(800);
      addMessage("Hey, is Nexus real-time?", "other");

      await delay(1200);
      setTyping(true);

      await delay(1500);
      setTyping(false);
      addMessage("Yep. Messages are instant ⚡", "me");

      await delay(1200);
      addMessage("And encrypted?", "other");

      await delay(1000);
      setTyping(true);

      await delay(1400);
      setTyping(false);
      addMessage("End-to-end 🔐", "me");
    };

    sequence();
  }, []);

  const delay = (ms: number) =>
    new Promise((res) => setTimeout(res, ms));

  const addMessage = (text: string, sender: Message["sender"]) => {
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text, sender },
    ]);
  };

  return (
    <div className="max-w-md mx-auto bg-primary-200/40 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-primary-700/30">
      <div className="space-y-3 h-72 overflow-hidden">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex ${
                msg.sender === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-xl text-sm max-w-[75%] ${
                  msg.sender === "me"
                    ? "bg-primary-700 text-text-100"
                    : "bg-primary-400/30 text-primary-900"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {typing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-primary-500"
          >
            typing...
          </motion.div>
        )}
      </div>
    </div>
  );
}
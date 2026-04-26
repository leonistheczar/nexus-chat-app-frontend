"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const tabs = [
  {
    id: "encryption",
    title: "Encryption",
    content:
      "Messages are encrypted on your device before being sent. Only the recipient can decrypt them.",
  },
  {
    id: "realtime",
    title: "Realtime",
    content:
      "Powered by WebSockets for instant communication with zero refresh.",
  },
  {
    id: "groups",
    title: "Groups",
    content:
      "Create mini communities and collaborate seamlessly.",
  },
  {
    id: "analytics",
    title: "Analytics",
    content:
      "Monitor usage and insights through admin dashboards.",
  },
];

export default function FeatureTabs() {
  const [active, setActive] = useState(tabs[0].id);

  const current = tabs.find((t) => t.id === active);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`px-4 py-2 rounded-xl transition hover:cursor-pointer ${
              active === tab.id
                ? "bg-primary-700 text-text-200"
                : "bg-primary-200 text-text-800 hover:bg-primary-300"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Content */}
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl bg-secondary-100 shadow-sm mb-4"
      >
        <p className="text-text-700">{current?.content}</p>
      </motion.div>
    </div>
  );
}
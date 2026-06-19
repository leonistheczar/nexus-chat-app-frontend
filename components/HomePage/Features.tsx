"use client";

import { motion } from "framer-motion";
import {
  Shield,
  MessageSquare,
  Users,
  Zap,
  Globe,
  Lock,
} from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Real-time Messaging",
    description:
      "Instant communication powered by WebSockets. No refresh, no delay, just seamless conversation.",
  },
  {
    icon: Shield,
    title: "End-to-End Encryption",
    description:
      "Your messages are encrypted before they leave your device. Only the intended recipient can read them.",
  },
  {
    icon: Users,
    title: "Group Conversations",
    description:
      "Create private groups and collaborate with multiple users in a secure environment.",
  },
  {
    icon: Zap,
    title: "Blazing Fast UI",
    description:
      "Built with modern React and optimized rendering for a smooth, lag-free experience.",
  },
  {
    icon: Globe,
    title: "Cross-Platform Access",
    description:
      "Access Nexus anywhere via browser. Responsive design ensures consistency across devices.",
  },
  {
    icon: Lock,
    title: "Secure Authentication",
    description:
      "JWT-based authentication with protected routes and session management.",
  },
];

export default function FeaturesSection() {
  return (
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{once: true}}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-primary-900"
        >
          Powerful Features for Modern Communication
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{once: true}}
          transition={{ delay: 0.1 }}
          className="mt-4 text-primary-700 max-w-2xl mx-auto"
        >
          Nexus combines performance, security, and simplicity to deliver a
          next-generation chat experience.
        </motion.p>

        {/* Grid */}
        <div className="grid gap-6 mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{once: true}}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center p-6 rounded-2xl bg-accent-50/90 backdrop-blur-md hover:shadow-md hover:-translate-y-1 transition-all border border-primary-100"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary-100 mb-4">
                  <Icon className="w-6 h-6 text-primary-700" />
                </div>

                <h3 className="text-lg font-semibold text-primary-900">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm text-primary-700 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
  );
}
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Shield, Zap, Users, Code2 } from "lucide-react";

export default function AboutClient() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="bg-background-50 text-primary-900 px-6 py-16 rounded-lg shadow-md">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto space-y-16"
      >
        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div variants={item} className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              About <span className="text-primary-500">Nexus</span>
            </h1>
            <p className="text-base sm:text-lg max-w-xl text-muted-foreground">
              Nexus explores modern communication systems through real-time
              messaging, security, and scalable architecture. Built to reflect
              how real-world platforms actually work.
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96"
          >
            <Image
              src="/ui-photos/about-us-banner.svg"
              alt="About Nexus"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain"
              priority
            />
          </motion.div>
        </div>

        {/* Motivation */}
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <motion.div
            variants={item}
            className="relative w-full h-60 sm:h-72 md:h-80 lg:h-96 order-2 lg:order-1"
          >
            <Image
              src="/ui-photos/about-us-motivation.svg"
              alt="Motivation"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain"
            />
          </motion.div>

          {/* Text */}
          <motion.div variants={item} className="space-y-4 order-1 lg:order-2">
            <h2 className="text-2xl sm:text-3xl font-semibold">
              The Motivation
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
              This project goes beyond building a chat app. It focuses on
              understanding scalable systems, real-time communication, and
              secure architecture through hands-on development.
            </p>
          </motion.div>
        </div>

        {/* Vision Cards */}
        <motion.div
          variants={container}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            {
              icon: Shield,
              title: "Privacy First",
              desc: "Messages are encrypted so only users can access them.",
            },
            {
              icon: Zap,
              title: "Real-Time",
              desc: "Instant communication powered by sockets.",
            },
            {
              icon: Users,
              title: "Connection",
              desc: "Designed for natural and meaningful conversations.",
            },
            {
              icon: Code2,
              title: "Built to Learn",
              desc: "A deep dive into full-stack engineering.",
            },
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                variants={item}
                className="p-6 rounded-2xl bg-background-100 shadow-sm hover:shadow-lg transition"
              >
                <Icon className="w-7 h-7 text-primary-500 mb-3" />
                <h3 className="font-semibold text-base mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Purpose */}
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div variants={item} className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-semibold">
              Why Nexus Exists
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
              Nexus is driven by curiosity and growth. The goal is not to
              compete, but to understand and build something meaningful from the
              ground up.
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="relative w-full h-60 sm:h-72 md:h-80 lg:h-96"
          >
            <Image
              src="/ui-photos/about-us-purpose.svg"
              alt="Purpose"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

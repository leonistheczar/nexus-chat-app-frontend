"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ClerkSignIn from "@/components/AuthPage/ClerkSignIn";
import ClerkSignUp from "@/components/AuthPage/ClerkSignUp";

function modeFromParam(value: string | null): "signin" | "signup" {
  return value === "signup" ? "signup" : "signin";
}

export default function AuthClient() {
  const searchParams = useSearchParams();
  const currentMode = modeFromParam(searchParams.get("mode"));
  return <AuthFormContent key={currentMode} defaultMode={currentMode} />;
}

function AuthFormContent({ defaultMode }: { defaultMode: "signin" | "signup" }) {
  const [mode, setMode] = useState<"signin" | "signup">(defaultMode);

  return (
    // ✅ Fixed: Full viewport height, proper centering
    <section className="min-h-screen w-full bg-background-50 flex items-center justify-center p-4 sm:p-10">
      <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-6 items-center">
        
        {/* LEFT: Illustration */}
        <div className="hidden md:block relative h-100 lg:h-125 w-full">
          <Image
            src="/ui-photos/signin.png"
            alt="Auth"
            fill
            sizes="(max-width: 768px) 0vw, 50vw"
            className="object-contain"
            priority
          />
        </div>

        {/* RIGHT: Form */}
        <div className="w-full max-w-md mx-auto px-4 sm:px-0">
          
          {/* Toggle */}
          <div className="flex justify-center mb-6">
            <div className="relative flex bg-primary-100 rounded-lg p-1">
              
              {/* Sliding Indicator */}
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="absolute top-1 bottom-1 w-24 rounded-md bg-secondary-300/50 shadow"
                style={{
                  left: mode === "signin" ? "4px" : "50%",
                }}
              />

              <button
                onClick={() => setMode("signin")}
                className="relative z-10 px-4 py-1 text-sm w-24 transition hover:cursor-pointer"
              >
                Sign In
              </button>

              <button
                onClick={() => setMode("signup")}
                className="relative z-10 px-4 py-1 text-sm w-24 transition hover:cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Animated Forms */}
          <div className="w-full">
            <AnimatePresence mode="wait">
              {mode === "signin" ? <ClerkSignIn key="signin" /> : <ClerkSignUp key="signup" />}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
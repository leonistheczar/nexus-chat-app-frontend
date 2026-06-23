"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SignIn from "@/components/AuthPage/SignIn";
import SignUp from "@/components/AuthPage/SignUp";

function modeFromParam(value: string | null): "signin" | "signup" {
  return value === "signup" ? "signup" : "signin";
}

export default function AuthClient() {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<"signin" | "signup">(() =>
    modeFromParam(searchParams.get("mode"))
  );

  useEffect(() => {
    const param = searchParams.get("mode");
    if (param === "signup" || param === "signin") {
      setMode(param);
    }
  }, [searchParams]);

  return (
    <section className="h-fit sm:min-h-screen bg-background-50 block sm:flex items-center p-10 shadow-md rounded-lg">
      <div className="max-w-6xl mx-auto block sm:grid md:grid-cols-2 gap-6 items-center w-full">
        
        {/* LEFT: Illustration */}
        <div className="hidden md:block relative w-full h-[420px]">
          <Image
            src="/ui-photos/signin.png"
            alt="Auth"
            fill
            sizes="50vw"
            className="object-contain"
            priority
          />
        </div>

        {/* RIGHT: Form */}
        <div className="bg-background-50 p-4 w-full max-w-md mx-auto">
          
          {/* Toggle */}
          <div className="flex justify-center mb-6">
            <div className="relative flex bg-primary-100 rounded-lg p-1">
              
              {/* Sliding Indicator */}
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={`absolute top-1 bottom-1 w-24 rounded-md bg-secondary-300/50 shadow`}
                style={{
                  left: mode === "signin" ? "4px" : "50%",
                }}
              />

              <button
                onClick={() => setMode("signin")}
                className={`relative z-10 px-4 py-1 text-sm w-24 transition hover:cursor-pointer`}
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
          <div className="relative h-fit sm:h-[calc(70dvh-2rem)] p-4 ">
            <AnimatePresence mode="wait">
              {mode === "signin" ? <SignIn /> : <SignUp />}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
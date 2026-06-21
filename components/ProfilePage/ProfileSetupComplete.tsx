"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useProfileSetupStore } from "./store/profileSetupStore";

export default function ProfileSetupComplete() {
  const router = useRouter();
  const formData = useProfileSetupStore((state) => state.formData);

  const handleGoToChat = () => {
    router.push("/chat");
  };

  return (
    <section className="flex h-full min-h-dvh items-center justify-center bg-background-50 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg rounded-2xl border border-primary-100 bg-background-50 p-8 shadow-lg shadow-primary-100/40 text-center space-y-6"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-500 text-white">
          <Sparkles className="h-7 w-7" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-text-800">
            Profile complete
          </h1>
          <p className="text-sm text-text-500">
            Welcome to Nexus,{" "}
            <span className="font-medium text-text-700">
              {formData.firstName}
            </span>
            . Your account is ready for conversations.
          </p>
        </div>

        <div className="rounded-xl bg-primary-50 p-4 text-left text-sm space-y-2">
          <p>
            <span className="text-text-500">Name:</span>{" "}
            <span className="font-medium text-text-700">
              {formData.firstName} {formData.lastName}
            </span>
          </p>
          <p>
            <span className="text-text-500">Username:</span>{" "}
            <span className="font-medium text-text-700">
              @{formData.username}
            </span>
          </p>
          <p>
            <span className="text-text-500">Contact:</span>{" "}
            <span className="font-medium text-text-700">{formData.contact}</span>
          </p>
        </div>

        <button
          type="button"
          onClick={handleGoToChat}
          className="btn-primary hover:cursor-pointer"
        >
          Start chatting
        </button>
      </motion.div>
    </section>
  );
}

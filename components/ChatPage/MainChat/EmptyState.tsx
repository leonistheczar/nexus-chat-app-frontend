"use client";

import { PanelLeftOpen } from "lucide-react";
import Image from "next/image";

type EmptyStateProps = {
  showContacts: boolean;
  setShowContacts: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EmptyState({
  showContacts,
  setShowContacts,
}: EmptyStateProps) {
  return (
    <div className="relative h-dvh flex flex-col items-center justify-center md:border-r border-background-400 text-text-600 gap-4">
      <button
        onClick={() => setShowContacts(!showContacts)}
        className="absolute top-4 left-4 md:hidden bg-primary-200 p-1.5 rounded-lg hover:bg-primary-300/80 transition-colors cursor-pointer"
        aria-label="Toggle contacts panel"
      >
        <PanelLeftOpen size={22} />
      </button>
      
      <div className="relative h-32 w-32 opacity-90">
        <Image
          src="/logo/nexus-logo.png"
          alt="Nexus Logo"
          fill
          priority
          sizes="128px"
          className="object-contain"
        />
      </div>
      
      <div className="text-center space-y-1">
        <h2 className="text-4xl font-semibold text-text-800">
          Welcome to Nexus
        </h2>
        <p className="text-sm text-text-500">
          Select a contact to start a conversation
        </p>
      </div>
    </div>
  );
}
"use client";

import ContactLeft from "@/components/ChatPage/ContactLeft";
import MainChat from "@/components/ChatPage/MainChat";
import UserProfileRight from "@/components/ChatPage/UserProfileRight";
export default function Chat() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-full">
      {/* Left . Contacts */}
      <section className="lg:col-span-1">
        <ContactLeft />
      </section>

      {/* Middle . Chat UI */}
      <section className="lg:col-span-2">
        <MainChat />
      </section>

      {/* Right . User Profile */}
      <section className="lg:col-span-1">
        <UserProfileRight />
      </section>
    </div>
  );
}

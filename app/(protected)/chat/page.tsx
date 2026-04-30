"use client";

import ContactLeft from "@/components/ChatPage/ContactLeft";
import MainChat from "@/components/ChatPage/MainChat";
import UserProfileRight from "@/components/ChatPage/UserProfileRight";

export default function Chat() {
  return (
    <div className="grid grid-cols-4">
        {/* Left - Contacts */}
      <section className="col-span-1">
        <ContactLeft />
      </section>
      {/* Middle - Chat-UI */}
      <section className="col-span-2">
        <MainChat />
      </section>
      {/* Right - User Profile */}
      <section className="col-span-1">
        <UserProfileRight />
      </section>
    </div>
  );
}

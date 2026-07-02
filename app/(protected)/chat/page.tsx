"use client";

import ContactLeft from "@/components/ChatPage/ContactLeft";
import MainChat from "@/components/ChatPage/MainChat";
import UserProfileRight from "@/components/ChatPage/UserProfileRight";
import { useChatContacts } from "@/components/ChatPage/ChatProvider";
import { Contact } from "@/app/types/types";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import LogoutModal from "@/components/ChatPage/LogOutModal";

export default function Chat() {
  const {contacts, showContacts, setShowContacts, open, setOpen} = useChatContacts();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const onClose = () => {
    setOpen(false);
  }
  const onLogout = () => {
    window.location.href = "/";
  }
  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-4 h-full">
        <LogoutModal open={open} onClose={onClose} onLogout={onLogout} />
      <section className="md:col-span-1">
        <ContactLeft
          contacts={contacts}
          selectedContact={selectedContact}
          onSelectContact={setSelectedContact}
          showContacts={showContacts}
          setShowContacts={setShowContacts}
          setOpen={setOpen}
        />
      </section>

      <section className="md:col-span-2">
        <MainChat 
          selectedContact={selectedContact}
          showContacts={showContacts}
          setShowContacts={setShowContacts} />
      </section>

      <section className="hidden md:block col-span-1">
        <UserProfileRight selectedContact={selectedContact} />
      </section>
    </div>
  );
}

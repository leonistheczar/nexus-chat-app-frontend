"use client";

import ContactLeft from "@/components/ChatPage/ContactLeft";
import MainChat from "@/components/ChatPage/MainChat";
import UserProfileRight from "@/components/ChatPage/UserProfileRight";
import { useChatContacts } from "@/lib/providers/ChatProvider";
import { Contact } from "@/app/types/types";
import { useState } from "react";
import LogoutModal from "@/components/ChatPage/LogOutModal";
import Settings from "@/components/ChatPage/ContactsLeft/DropDown/DropDownSettings/Settings";

export default function Chat() {
  const {contacts, showContacts, setShowContacts, open, setOpen, setOpenSettings} = useChatContacts();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const onClose = () => {
    setOpen(false);
  }
  const onLogout = () => {
    window.location.href = "/";
  }
  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-4 h-full">
        <Settings />
        <LogoutModal open={open} onClose={onClose} onLogout={onLogout} />
      <section className="col-span-1">
        <ContactLeft
          contacts={contacts}
          selectedContact={selectedContact}
          onSelectContact={setSelectedContact}
          showContacts={showContacts}
          setShowContacts={setShowContacts}
          setOpen={setOpen}
          setOpenSettings={setOpenSettings}
        />
      </section>

      <section className="col-span-2">
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

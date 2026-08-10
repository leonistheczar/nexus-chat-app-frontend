"use client";

import { useEffect, useState } from "react";

import { Contact } from "@/app/types/types";
import ContactLeft from "@/components/ChatPage/ContactLeft";
import LogoutModal from "@/components/ChatPage/LogOutModal";
import MainChat from "@/components/ChatPage/MainChat";
import UserProfileRight from "@/components/ChatPage/UserProfileRight";
import Settings from "@/components/ChatPage/ContactsLeft/DropDown/DropDownSettings/Settings";
import { useChatContacts } from "@/lib/providers/ChatProvider";
import NewUser from "@/components/ChatPage/ContactsLeft/AddNew/NewUser";
import NewGroup from "@/components/ChatPage/ContactsLeft/AddNew/NewGroup";

export default function Chat() {
  const {
    contacts,
    showContacts,
    setShowContacts,
    open,
    setOpen,
  } = useChatContacts();

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    setSelectedContact((current) => {
      if (!current) return null;

      return contacts.find(({ id }) => id === current.id) ?? current;
    });
  }, [contacts]);

  return (
    <div className="relative grid h-full grid-cols-1 lg:grid-cols-4">
      <NewUser />
      <NewGroup />
      <Settings />
      <LogoutModal
        open={open}
        onClose={() => setOpen(false)}
        onLogout={() => {
          window.location.href = "/";
        }}
      />

      <section className="relative z-20 lg:col-span-1">
        <ContactLeft
          contacts={contacts}
          selectedContact={selectedContact}
          onSelectContact={setSelectedContact}
          showContacts={showContacts}
          setShowContacts={setShowContacts}
          setOpen={setOpen}
        />
      </section>

      <section className="lg:col-span-2">
        <MainChat
          selectedContact={selectedContact}
          showContacts={showContacts}
          setShowContacts={setShowContacts}
        />
      </section>

      <section className="hidden md:block lg:col-span-1">
        <UserProfileRight selectedContact={selectedContact} />
      </section>
    </div>
  );
}
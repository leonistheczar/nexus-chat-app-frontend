"use client";

import { useEffect, useState } from "react";

import { Contact } from "@/app/types/types";
import ContactLeft from "@/components/ChatPage/ContactLeft";
import MainChat from "@/components/ChatPage/MainChat/MainChat";
import UserProfileRight from "@/components/ChatPage/UserProfileRight";
import Settings from "@/components/ChatPage/ContactsLeft/DropDown/DropDownSettings/Settings";
import { useChatContacts } from "@/lib/providers/ChatProvider";
import NewUser from "@/components/ChatPage/ContactsLeft/AddNew/NewUser";
import NewGroup from "@/components/ChatPage/ContactsLeft/AddNew/NewGroup";
import ConfirmationDialog from "@/components/shared/ConfirmationDialog";
import { useClickOutside } from "@/hooks/useClickOutside";

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
      <NewUser onContactSelect={(contact: Contact) => setSelectedContact(contact)} />
      <NewGroup />
      <Settings />
      <ConfirmationDialog
        isOpen={open}
        setOpen={setOpen}
        title="Logout"
        description="Are you sure you want to logout from your account?"
        confirmText="Logout"
        onCancel={() => setOpen(false)}
        onConfirm={() => {
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
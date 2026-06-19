"use client";

import ContactLeft from "@/components/ChatPage/ContactLeft";
import MainChat from "@/components/ChatPage/MainChat";
import UserProfileRight from "@/components/ChatPage/UserProfileRight";
import { useChatContacts } from "@/components/ChatPage/ChatContactsProvider";
import { Contact } from "@/app/types/types";
import { useEffect, useState } from "react";

export default function Chat() {
  const contacts = useChatContacts();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

    // useEffect(() => {
    //   if (contacts.length > 0 && !selectedContact) {
    //     setSelectedContact(contacts[0]);
    //   }
    // }, [contacts, selectedContact]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 h-full">
      <section className="lg:col-span-1">
        <ContactLeft
          contacts={contacts}
          selectedContact={selectedContact}
          onSelectContact={setSelectedContact}
        />
      </section>

      <section className="lg:col-span-2">
        <MainChat selectedContact={selectedContact} />
      </section>

      <section className="lg:col-span-1">
        <UserProfileRight selectedContact={selectedContact} />
      </section>
    </div>
  );
}

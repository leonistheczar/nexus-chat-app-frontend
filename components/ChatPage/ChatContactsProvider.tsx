"use client";

import { Contact } from "@/app/types/types";
import { createContext, useContext } from "react";

const ChatContactsContext = createContext<Contact[]>([]);

export function ChatContactsProvider({
  contacts,
  children,
}: {
  contacts: Contact[];
  children: React.ReactNode;
}) {
  return (
    <ChatContactsContext.Provider value={contacts}>
      {children}
    </ChatContactsContext.Provider>
  );
}

export function useChatContacts() {
  return useContext(ChatContactsContext);
}

"use client";

import { Contact } from "@/app/types/types";
import React, { createContext, useContext, useState } from "react";

type ChatType = {
  contacts: Contact[];
  showContacts: boolean;
  setShowContacts: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  open: boolean, 
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const ChatContactsContext =
  createContext<ChatType | null>(null);

export function ChatContactsProvider({
  contacts,
  children,
}: {
  contacts: Contact[];
  children: React.ReactNode;
}) {

  const [showContacts, setShowContacts] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <ChatContactsContext.Provider
      value={{
        contacts,
        showContacts,
        setShowContacts,
        open,
        setOpen
      }}
    >
      {children}
    </ChatContactsContext.Provider>
  );
}

export function useChatContacts() {
  const context = useContext(ChatContactsContext);

  if (!context) {
    throw new Error(
      "useChatContacts must be used inside ChatContactsProvider"
    );
  }

  return context;
}
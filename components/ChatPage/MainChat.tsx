"use client";

import { Contact } from "@/app/types/types";
import { SendHorizontal } from "lucide-react";
import Image from "next/image";

type MainChatProps = {
  selectedContact: Contact | null;
};

export default function MainChat({ selectedContact }: MainChatProps) {
  if (!selectedContact) {
    return (
      <div className="container h-dvh flex flex-col items-center justify-center border-r border-background-400 text-text-600 gap-4">
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

  return (
    <div className="container h-dvh flex flex-col justify-between border-r border-background-400">
      <div
        id="profile-top-bar"
        className="border-b border-background-400 p-4 flex items-center gap-3"
      >
        <div className="relative w-10 h-10 shrink-0 overflow-hidden rounded-full">
          <Image
            src={selectedContact.profile_pic}
            alt={`${selectedContact.first_name} ${selectedContact.last_name}`}
            fill
            className="object-cover"
            sizes="40px"
          />
        </div>
        <div>
          <p className="font-medium">
            {selectedContact.first_name} {selectedContact.last_name}
          </p>
          <p className="text-xs text-text-600">{selectedContact.contact}</p>
        </div>
      </div>
      <div id="chat" className="flex flex-col flex-1 justify-end">
        <div id="chat-ui" className="flex-1 overflow-auto p-4">
          <div
            id="reciever"
            className="max-w-[75%] rounded-2xl bg-primary-200 px-4 py-2 text-sm"
          >
            {selectedContact.message}
          </div>
        </div>
        <form 
          className="bg-secondary-100 mb-2 mx-2 rounded-2xl flex items-center justify-between gap-x-2"
          onSubmit={(e) => e.preventDefault()}>
          <textarea
            name="message"
            id="message"
            autoFocus
            placeholder={`Message ${selectedContact.first_name}...`}
            className="w-full whitespace-normal text-wrap focus:outline-none p-2 resize-none overflow-y-auto"
          />
          <button
            title="Send"
            type="submit"
            className="relative right-2 bg-primary-200 p-2 rounded-full transition-all duration-100 hover:bg-primary-300/80 hover:cursor-pointer"
          >
            <SendHorizontal size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}

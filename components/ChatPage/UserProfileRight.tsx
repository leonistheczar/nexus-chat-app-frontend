"use client";

import { Contact } from "@/app/types/types";
import Image from "next/image";

type UserProfileRightProps = {
  selectedContact: Contact | null;
};

export default function UserProfileRight({
  selectedContact,
}: UserProfileRightProps) {
  if (!selectedContact) {
    return (
      <div className="container h-dvh flex flex-col items-center justify-center text-text-600 gap-3">
        <div className="text-4xl">💬</div>

        <div className="text-center space-y-1">
          <h2 className="text-lg font-semibold text-text-800">
            No conversation selected
          </h2>

          <p className="text-sm text-text-500">
            Choose a contact to start messaging
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container h-dvh p-4">
      <div id="user-profile" className="flex flex-col items-center gap-4">
        <div
          id="user-avatar"
          className="relative w-24 h-24 overflow-hidden rounded-full shadow-sm"
        >
          <Image
            src={selectedContact.profile_pic}
            alt={`${selectedContact.first_name} ${selectedContact.last_name}`}
            fill
            className="object-cover"
            sizes="96px"
          />
        </div>
        <div id="user-info" className="text-center">
          <p className="text-lg font-medium">
            {selectedContact.first_name} {selectedContact.last_name}
          </p>
          <p className="text-sm text-text-600">{selectedContact.contact}</p>
        </div>
        <div id="profile-fns" className="flex gap-2">
          <button className="rounded-lg bg-primary-200 px-4 py-2 text-sm hover:bg-primary-300 transition-colors">
            Chat
          </button>
          <button className="rounded-lg bg-primary-200 px-4 py-2 text-sm hover:bg-primary-300 transition-colors">
            Media
          </button>
        </div>
      </div>
    </div>
  );
}

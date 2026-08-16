// components/chat/ChatHeader.tsx
"use client";

import { Contact } from "@/app/types/types";
import { ChevronRight, EllipsisVertical, PanelLeftOpen } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import UserChatMenu from "./UserChatMenu";

type ChatHeaderProps = {
  selectedContact: Contact;
  showContacts: boolean;
  setShowContacts: React.Dispatch<React.SetStateAction<boolean>>;
  onAvatarClick?: () => void;
};

export default function ChatHeader({
  selectedContact,
  showContacts,
  setShowContacts,
  onAvatarClick,
}: ChatHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Determine if avatar is clickable (only on tablet)
  const isClickable = Boolean(onAvatarClick);

  return (
    <div
      id="profile-top-bar"
      className="border-b border-background-400 p-4 flex items-center gap-3 shrink-0"
    >
      {/* Mobile Contacts Toggle */}
      <button
        onClick={() => setShowContacts(!showContacts)}
        className="md:hidden bg-primary-200 p-1.5 rounded-lg hover:bg-primary-300/80 transition-colors cursor-pointer"
        aria-label="Toggle contacts panel"
        aria-expanded={showContacts}
      >
        <PanelLeftOpen size={22} />
      </button>

      {/* Avatar Button - Clickable on tablet only */}
      <button
        onClick={onAvatarClick}
        disabled={!isClickable}
        className={`relative w-10 h-10 shrink-0 overflow-hidden rounded-full transition-all ${
          isClickable
            ? "hover:scale-105 active:scale-95 hover:ring-2 hover:ring-primary-300 cursor-pointer lg:hover:scale-100 lg:hover:ring-0 lg:cursor-default"
            : "cursor-default"
        }`}
        aria-label={isClickable ? "View profile" : "Contact avatar"}
        title={isClickable ? "View profile" : undefined}
      >
        {selectedContact.profile_pic ? (
          <Image
            src={selectedContact.profile_pic}
            alt={`${selectedContact.first_name} ${selectedContact.last_name}`}
            fill
            className="object-cover"
            sizes="40px"
          />
        ) : (
          <div className="w-full h-full bg-primary-200 flex items-center justify-center">
            <span className="text-sm font-medium text-primary-600">
              {getInitials(selectedContact.first_name, selectedContact.last_name)}
            </span>
          </div>
        )}
      </button>

      {/* Contact Info - Clickable on tablet only */}
      <button
        onClick={onAvatarClick}
        disabled={!isClickable}
        className={`flex-1 min-w-0 text-left ${
          isClickable ? "cursor-pointer lg:cursor-default" : "cursor-default"
        }`}
        aria-label={isClickable ? "View profile" : undefined}
        title={isClickable ? "View profile" : undefined}
      >
        <p className="font-medium truncate">
          {selectedContact.first_name} {selectedContact.last_name}
        </p>
        <p className="text-xs text-text-600 truncate flex items-center gap-1">
          {selectedContact.contact}
          {isClickable && (
            <ChevronRight
              size={14}
              className="hidden md:inline-block lg:hidden text-text-400 shrink-0"
            />
          )}
        </p>
      </button>

      {/* Ellipsis Menu */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-1 hover:bg-secondary-200/60 rounded-full cursor-pointer"
          aria-label="More options"
          aria-expanded={isMenuOpen}
        >
          <EllipsisVertical size={20} className="text-text-600" />
        </button>

        {isMenuOpen && (
          <UserChatMenu
            selectedContact={selectedContact}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            isMuted={isMuted}
            setIsMuted={setIsMuted}
          />
        )}
      </div>
    </div>
  );
}
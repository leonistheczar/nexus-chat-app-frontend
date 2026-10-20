"use client";

import { Contact } from "@/app/types/types";
import { Bell, ChevronLeft, CirclePlus, EllipsisVertical } from "lucide-react";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useChatContacts } from "@/lib/providers/ChatUIProvider";
import SettingsDropDown from "./DropDown/SettingsDropDown";
import AddNew from "./AddNew/AddNew";
import Skeleton from "@/components/SharedComponents/Skeleton";
import useCurrentUser from "@/hooks/useCurrentUser";
type ContactLeftProps = {
  contacts: Contact[];
  selectedContact: Contact | null;
  onSelectContact: (contact: Contact) => void;
  isPending: boolean;
  isError: boolean;
  showContacts: boolean;
  setShowContacts: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSelectSelfChat: () => void;
  isSelfChatSelected: boolean;
  onOpenNotifications: (trigger: HTMLButtonElement) => void;
};

const PRIORITY_COUNT = 10; // only avatars likely visible

function formatMessagePreview(message: string | undefined | null): string {
  const text = message ?? "";
  if (text.length <= 30) return text;
  return `${text.slice(0, 30)}...`;
}

type ContactItemProps = {
  contact: Contact;
  isSelected: boolean;
  isPriority: boolean;
  onSelect: (contact: Contact) => void;
};

const ContactItem = memo(function ContactItem({
  contact,
  isSelected,
  isPriority,
  onSelect,
}: ContactItemProps) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(contact)}
        className={`flex items-center text-left w-full gap-3 p-2 rounded-xl transition-colors cursor-pointer hover:bg-secondary-200/40 ${
          isSelected ? "bg-secondary-200/50" : ""
        }`}
      >
        <div className="relative w-12 h-12 shrink-0 overflow-hidden rounded-full shadow-sm">
          <Image
            src={`${contact.profile_pic}`}
            alt={`${contact.first_name} ${contact.last_name}`}
            fill
            className="object-cover"
            sizes="48px"
            priority={isPriority}
            loading={isPriority ? undefined : "lazy"}
          />
        </div>
        <div className="flex flex-col">
          <p className="font-medium truncate">
            {contact.first_name} {contact.last_name}
          </p>
          <p className="text-[12px] text-text-600">
            {formatMessagePreview(contact.message)}
          </p>
        </div>
      </button>
    </li>
  );
});

// Extracted list + search, shared by desktop and mobile
type SidebarBodyProps = {
  search: string;
  setSearch: (v: string) => void;
  filteredContacts: Contact[];
  isPending: boolean;
  isError: boolean;
  selectedContact: Contact | null;
  onSelect: (contact: Contact) => void;
  inputName: string;
  openDrop: boolean;
  setOpenDrop: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSelectSelfChat: () => void;
  isSelfChatSelected: boolean;
  onOpenNotifications: (trigger: HTMLButtonElement) => void;
};
type tabFilter = "All" | "Unread" | "Groups" | "Favorites";
function SidebarBody({
  search,
  setSearch,
  filteredContacts,
  selectedContact,
  onSelect,
  inputName,
  isPending,
  isError,
  openDrop,
  setOpenDrop,
  setOpen,
  onSelectSelfChat,
  isSelfChatSelected,
  onOpenNotifications,
}: SidebarBodyProps) {
  const [addNewDropDown, setAddNewDropDown] = useState(false);
  const { showContacts, setShowContacts } = useChatContacts();
  const [directTab, setDirectTab] = useState<tabFilter>("All");
  const { data: currentUser } = useCurrentUser();
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };
  // Tabs
  const directTabs: tabFilter[] = ["All", "Unread", "Groups", "Favorites"];
  return (
    <div className="bg-primary-100 relative flex flex-col border-r border-primary-200 h-screen">
      {/* Close ContactLeft */}
      <button
        className={`md:hidden absolute top-1/2 -right-3 z-10 bg-primary-100 border border-primary-200 rounded-full p-1.5 shadow-md hover:bg-primary-200 transition-colors cursor-pointer ${!showContacts && "hidden"}`}
        aria-label="Close sidebar"
        onClick={() => setShowContacts(false)}
      >
        <ChevronLeft size={16} className="text-text-600" />
      </button>
      <div className="flex justify-between items-center p-3 ">
        <h1 className="text-xl font-semibold"> Nexus</h1>
        <div className="flex shrink-0 items-center gap-x-1">
          <motion.button
            type="button"
            aria-label="Open notifications"
            aria-haspopup="dialog"
            onClick={(event) => onOpenNotifications(event.currentTarget)}
            className="grid p-1 place-items-center cursor-pointer rounded-full transition-colors hover:bg-primary-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          >
            <Bell size={21}/>
          </motion.button>

          <div className="relative">
            <motion.button
              type="button"
              aria-label="Add a contact or group"
              aria-expanded={addNewDropDown}
              onClick={() => setAddNewDropDown((prev) => !prev)}
              className="grid p-1 place-items-center cursor-pointer rounded-full transition-colors hover:bg-primary-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
            >
              <CirclePlus size={21} />
            </motion.button>
            <AddNew
              addNewDropDown={addNewDropDown}
              setAddNewDropDown={setAddNewDropDown}
            />
          </div>

          <div className="relative">
            <motion.button
              type="button"
              aria-label="Open settings menu"
              aria-expanded={openDrop}
              onClick={() => setOpenDrop((prev) => !prev)}
              className="grid p-1 place-items-center cursor-pointer rounded-full transition-colors bg-primary-200 hover:bg-primary-300/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
            >
              <EllipsisVertical size={21}  />
            </motion.button>
            <SettingsDropDown
              openDrop={openDrop}
              setOpen={setOpen}
              setOpenDrop={setOpenDrop}
            />
          </div>
        </div>
      </div>
      {/* Search */}
      <div className="p-2">
        <input
          type="text"
          name={inputName}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-primary-200 w-full text-sm p-1.5 rounded-md outline-0 outline-primary-300 focus:outline-none focus:ring-1 focus:ring-primary-300 transition-all"
          placeholder="Search or start a new conversation"
        />
      </div>
      {/* Direct Tabs */}
      <div className="p-2">
        <ul className="flex items-center justify-center gap-x-2">
          {directTabs.map((tab) => (
            <li key={tab} className="flex-1 text-xs font-medium">
              <button
                onClick={() => setDirectTab(tab)}
                className={`w-full flex items-center justify-center p-2 border border-background-700/20 rounded-full transition-all cursor-pointer ${
                  directTab === tab
                    ? "bg-primary-300/60 text-text-800 shadow-sm"
                    : "text-text-600 hover:bg-primary-400/20 hover:text-text-800"
                }`}
              >
                <span className="truncate">{tab}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <ul className="flex flex-col gap-y-2 px-2 overflow-auto scrollbar-thumb-primary-200">
        {/* Self chat */}
        <li>
          <button
            type="button"
            onClick={() => {
              onSelectSelfChat();
              setShowContacts(false);
            }}
            className={`flex items-center text-left w-full gap-3 p-2 rounded-xl transition-colors cursor-pointer hover:bg-secondary-200/40 ${isSelfChatSelected ? "bg-secondary-200/50" : ""}`}
          >
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-primary-200">
              {currentUser?.avatarUrl ? (
                <Image
                  src={currentUser.avatarUrl}
                  alt={currentUser.displayName}
                  fill
                  className="rounded-full object-cover"
                  sizes="40px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="text-sm font-medium text-primary-600">
                    {getInitials(currentUser?.firstName ?? "", currentUser?.lastName ?? "")}
                  </span>
                </div>
              )}
            </div>
            <div className="min-w-0">
              <p className="font-medium truncate">{`${currentUser?.displayName} (You)`}</p>
              <p className="text-[12px] text-text-600 truncate">Only you can see these messages</p>
            </div>
          </button>
        </li>
        {isPending ? (
          <li
            className="space-y-2 py-2"
            role="status"
            aria-label="Loading contacts"
          >
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="flex items-center gap-3 p-2">
                <Skeleton variant="circle" width={48} height={48} />
                <div className="min-w-0 flex-1 space-y-2">
                  <Skeleton width="58%" height={14} />
                  <Skeleton width="82%" height={12} />
                </div>
              </div>
            ))}
          </li>
        ) : isError ? (
          <li className="px-2 py-4 text-sm text-center text-red-600" role="alert">
            Failed to fetch contacts. Please try again.
          </li>
        ) : filteredContacts.length === 0 ? (
          <li className="text-sm text-center text-text-600 px-2 mt-4">
            No contact found
          </li>
        ) : (
          filteredContacts.map((contact, index) => (
            <ContactItem
              key={contact.id}
              contact={contact}
              isSelected={selectedContact?.id === contact.id}
              isPriority={index < PRIORITY_COUNT}
              onSelect={onSelect}
            />
          ))
        )}
      </ul>
    </div>
  );
}

// Main component
function ContactLeft({
  contacts,
  selectedContact,
  isPending,
  isError,
  onSelectContact,
  showContacts,
  setShowContacts,
  setOpen,
  onSelectSelfChat,
  isSelfChatSelected,
  onOpenNotifications,
}: ContactLeftProps) {
  const [search, setSearch] = useState("");
  const [openDrop, setOpenDrop] = useState(false);
  const sideBarRef = useRef<HTMLDivElement>(null);

  const filteredContacts = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return contacts;
    return contacts.filter((contact) => {
      const fullName =
        `${contact.first_name} ${contact.last_name}`.toLowerCase();
      return (
        fullName.includes(query) ||
        (contact.message ?? "").toLowerCase().includes(query)
      );
    });
  }, [contacts, search]);

  const handleSelect = useCallback(
    (contact: Contact) => {
      onSelectContact(contact);
      setShowContacts(false);
    },
    [onSelectContact, setShowContacts],
  );

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:flex flex-col h-screen">
        <SidebarBody
          search={search}
          setSearch={setSearch}
          filteredContacts={filteredContacts}
          isPending={isPending}
          isError={isError}
          selectedContact={selectedContact}
          onSelect={handleSelect}
          inputName="contact-search-desktop"
          openDrop={openDrop}
          setOpenDrop={setOpenDrop}
          setOpen={setOpen}
          onSelectSelfChat={onSelectSelfChat}
          isSelfChatSelected={isSelfChatSelected}
          onOpenNotifications={onOpenNotifications}
        />
      </div>

      {/* Mobile */}
      <div
        ref={sideBarRef}
        className={`fixed text-sm inset-y-0 left-0 z-50 w-72 bg-background transition-transform duration-300 md:hidden ${
          showContacts ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <aside>
          <SidebarBody
            search={search}
            setSearch={setSearch}
            filteredContacts={filteredContacts}
            isPending={isPending}
            isError={isError}
            selectedContact={selectedContact}
            onSelect={handleSelect}
            inputName="contact-search-mobile"
            openDrop={openDrop}
            setOpenDrop={setOpenDrop}
            setOpen={setOpen}
            onSelectSelfChat={onSelectSelfChat}
            isSelfChatSelected={isSelfChatSelected}
            onOpenNotifications={onOpenNotifications}
          />
        </aside>
      </div>
    </>
  );
}

export default memo(ContactLeft);

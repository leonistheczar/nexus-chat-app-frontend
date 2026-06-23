"use client";

import { Contact } from "@/app/types/types";
import {
  CirclePlus,
  EllipsisVertical,
  LogOut,
  MessageSquare,
  Settings,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import ThemeToggler from "../baseComponents/ThemeToggler";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type ContactLeftProps = {
  contacts: Contact[];
  selectedContact: Contact | null;
  onSelectContact: (contact: Contact) => void;
};

export default function ContactLeft({
  contacts,
  selectedContact,
  onSelectContact,
}: ContactLeftProps) {
  const [search, setSearch] = useState("");

  // Checking for outside click(event listener) for dropdown to close
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const filteredContacts = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return contacts;

    return contacts.filter((contact) => {
      const fullName =
        `${contact.first_name} ${contact.last_name}`.toLowerCase();
      return (
        fullName.includes(query) ||
        contact.message.toLowerCase().includes(query)
      );
    });
  }, [contacts, search]);

  return (
    <div className="container bg-primary-100 flex flex-col border-r border-primary-200 h-screen">
      <div
        id="contact-base"
        className="flex justify-between items-center px-4 py-2"
      >
        <h1 className="text-xl"> Nexus</h1>
        <div className="flex items-center gap-x-2 scale-90">
          <ThemeToggler />
          <button className="hover:cursor-pointer hover:bg-primary-200 p-1.5 rounded-full transition-all">
            <CirclePlus />
          </button>
          <div className="relative" ref={menuRef}>
            <motion.button
              onClick={() => setOpen(!open)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              className="hover:cursor-pointer hover:bg-primary-200 p-1.5 rounded-full transition-all">
              <EllipsisVertical />
            </motion.button>
            <AnimatePresence>
              {open && (
              <motion.div
                key="menu"
                initial={{
                  opacity: 0,
                  y: -8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -8,
                  scale: 0.95,
                }}
                transition={{
                  duration: 0.15,
                  ease: "easeOut",
                }}
                className="absolute left-0 mt-2 w-48 bg-secondary-100 px-3 py-4 rounded-xl flex flex-col gap-y-1 shadow-md shadow-background-900/5">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="p-2 flex gap-x-2 items-center hover:cursor-pointer hover:bg-primary-300/50 rounded-lg transition">
                  <Settings size={20} />
                  <span>Settings</span>
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="p-2 flex gap-x-2 items-center hover:cursor-pointer hover:bg-primary-300/50 rounded-lg transition">
                  <MessageSquare size={20} />
                  <span>Mark all as read</span>
                </motion.button>

                <div className="w-full h-px bg-slate-800/40 my-1" />

                <motion.button
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="group hover:bg-red-500/40 p-2 flex gap-x-2 items-center rounded-lg transition cursor-pointer">
                  <LogOut
                    size={20}
                    className="group-hover:text-red-500 transition-colors"/>
                  <span
                    className="group-hover:text-red-500 transition-colors">
                    Logout
                  </span>
                </motion.button>
              </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div id="contact-search" className="p-2">
        <input
          type="text"
          name="contact-search"
          id="contact-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-primary-200 w-full text-sm p-1.5 rounded-md outline-0 outline-primary-300 focus:outline-none focus:ring-1 focus:ring-primary-300 transition-all"
          placeholder="Search or start a new conversation"
        />{" "}
      </div>
      <ul
        id="contacts"
        className="flex flex-col gap-y-2 px-2 overflow-auto scrollbar-thumb-primary-200"
      >
        {filteredContacts &&
          filteredContacts.map((contact) => (
            <li key={contact.id}>
              <button 
                type="button"
                onClick={() => onSelectContact(contact)}
                className={`flex items-center text-left w-full gap-3 p-2 rounded-xl transition-colors cursor-pointer hover:bg-secondary-100/90 ${
                  selectedContact?.id === contact.id
                    ? "bg-secondary-100/90"
                    : ""
                }`}
              >
                <div className="relative w-12 h-12 shrink-0 overflow-hidden rounded-full shadow-sm">
                  <Image
                    src={`${contact.profile_pic}`}
                    alt={`${contact.first_name} ${contact.last_name}`}
                    fill
                    className="object-cover"
                    sizes="48px"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <p className="font-medium truncate">
                    {contact.first_name} {contact.last_name}
                  </p>
                  <p className="text-[12px] text-text-600">
                    {contact.message.slice(0, 30) + "..."}
                  </p>
                </div>
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

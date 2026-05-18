"use client";

import { CirclePlus, EllipsisVertical } from "lucide-react";
import { useEffect, useState } from "react";
import ThemeToggler from "../baseComponents/ThemeToggler";
import Image from "next/image";

export default function ContactLeft() {
  const [contacts, setContacts] = useState<any[]>([]);
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch("/test-json-data/mock_db.json");
        const data = await res.json();
        setContacts(data);
        console.log(data);
      } catch (error: any) {
        throw new Error("Failed to fetch contacts", error);
      }
    };
    fetchContacts();
  }, []);
  const filteredContacts = contacts.slice(0, 10);
  return (
    <div className="container bg-primary-100 flex flex-col border-r border-primary-200 h-screen">
      <div id="contact-base" className="flex justify-between items-center px-4 py-2">
        <h1 className="text-xl">Nexus</h1>
        <div className="flex items-center gap-x-2 scale-90">
          <ThemeToggler />
          <button className="hover:cursor-pointer hover:bg-primary-200 p-1.5 rounded-full transition-all">
            <CirclePlus />
          </button>
          <button className="hover:cursor-pointer hover:bg-primary-200 p-1.5 rounded-full transition-all">
            <EllipsisVertical />
          </button>
        </div>
      </div>
      <div id="contact-search" className="p-2">
        <input
          type="text"
          name="contact-search"
          id="contact-search"
          className="bg-primary-200 w-full text-sm p-1.5 rounded-md outline-0 outline-primary-300 focus:outline-none focus:ring-1 focus:ring-primary-300 transition-all"
          placeholder="Search or start a new conversation"
        />
      </div>
      <ul id="contacts" className="flex flex-col gap-y-2 px-2 overflow-auto">
        {filteredContacts &&
          filteredContacts.map((contact) => (
            <li key={contact.id}>
              <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted transition-colors cursor-pointer hover:bg-primary-200">
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
                  {contact.message.slice(0,30) + "..."}
                </p>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

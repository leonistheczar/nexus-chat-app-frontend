"use client";

import { CirclePlus, EllipsisVertical } from "lucide-react";
import { useEffect, useState } from "react";
import ThemeToggler from "../baseComponents/ThemeToggler";

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
    <div className="container py-4 px-6 flex flex-col gap-y-2 border-r border-primary-200 h-screen">
      <div id="contact-base" className="flex justify-between items-center">
        <h1 className="text-2xl">Nexus</h1>
        <div className="flex items-center gap-x-2">
            <ThemeToggler />
          <button className="hover:cursor-pointer hover:bg-primary-200 p-1.5 rounded-full transition-all">
            <CirclePlus />
          </button>
          <button className="hover:cursor-pointer hover:bg-primary-200 p-1.5 rounded-full transition-all">
            <EllipsisVertical />
          </button>
        </div>
      </div>
      <div id="contact-search" className="my-2">
        <input
          type="text"
          name="contact-search"
          id="contact-search"
          className="bg-primary-200 w-full text-sm p-1.5 rounded-md outline-0 outline-primary-300 focus:outline-none focus:ring-1 focus:ring-primary-300 transition-all"
          placeholder="Search or start a new conversation"
        />
      </div>
      <ul id="contacts" className="flex flex-col gap-y-2">
        {filteredContacts &&
          filteredContacts.map((contact) => (
            <li key={contact.id}>{contact.first_name + contact.last_name}</li>
          ))}
      </ul>
    </div>
  );
}

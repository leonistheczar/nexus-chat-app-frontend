'use client';

import { useEffect, useState } from "react";

export default function ContactLeft(){
    const [contacts, setContacts] = useState<any[]>([]);
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const res = await fetch('/test-json-data/mock_db.json');
                const data = await res.json();
                setContacts(data);
                console.log(data);
            } catch (error: any) {
                throw new Error("Failed to fetch contacts", error)
            }
        }
        fetchContacts();
    }, [])
    const filteredContacts = contacts.slice(0,10);
    return (
        <div className="container p-6">
                        <div id="contact-base">
                            <h1 className="text-2xl">Nexus</h1>
                        </div>
                        <div id="contact-search" className="my-2">
                            <input type="text" name="contact-search" id="contact-search" placeholder="Search a contact"  />
                        </div>
                    <ul id="contacts" className="flex flex-col gap-y-2">
                        {filteredContacts && filteredContacts.map((contact) => (
                            <li key={contact.id}>{contact.first_name + contact.last_name}</li>
                        ))}
                    </ul>
        </div>
    )
}
import ContactClient from "@/components/ContactPage/ContactClient";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contact Us", 
  description:
    "Nexus is a modern real-time messaging platform built for seamless conversations. Designed for speed, privacy, and simplicity.",
};
export default function ContactPage() {
  return (
    <ContactClient />
  );
}

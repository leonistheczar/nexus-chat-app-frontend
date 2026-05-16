import AboutClient from "@/components/AboutPage/AboutClient";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "About Us", 
  description:
    "Nexus is a modern real-time messaging platform built for seamless conversations. Designed for speed, privacy, and simplicity.",
};
export default function AboutPage() {
  return (
    <AboutClient />
  );
}

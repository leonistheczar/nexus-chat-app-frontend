import HomeClient from "@/components/HomePage/HomeClient";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Home", 
  description:
    "Nexus is a modern real-time messaging platform built for seamless conversations. Designed for speed, privacy, and simplicity.",
};
export default function Home() {
  return (
      <HomeClient />
  );
}

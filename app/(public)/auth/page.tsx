import AuthClient from "@/components/AuthPage/AuthClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication", 
  description:
    "Nexus is a modern real-time messaging platform built for seamless conversations. Designed for speed, privacy, and simplicity.",
};
export default function AuthPage() {
  return (
    <AuthClient />
  );
}
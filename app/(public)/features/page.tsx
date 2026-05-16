import FeaturesClient from "@/components/FeaturesPage/FeaturesClient";
import { Metadata } from "next";
export const metadata: Metadata = {
  title:"Features",
  description: "Explore Nexus features including real-time messaging, secure authentication, instant notifications, and a smooth modern chat experience designed for performance and privacy."
}
export default function FeaturesPage() {
  return (
    <FeaturesClient />
  );
}

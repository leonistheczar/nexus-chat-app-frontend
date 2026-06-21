import ProfileSetupClient from "@/components/ProfilePage/ProfileSetupClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Complete Profile",
  description:
    "Finish setting up your Nexus profile with your name, username, and contact details.",
};

export default function ProfilePage() {
  return <ProfileSetupClient />;
}

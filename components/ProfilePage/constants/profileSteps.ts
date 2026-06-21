import { AtSign, Phone, User } from "lucide-react";

export const PROFILE_STEPS = [
  {
    id: 1,
    label: "Name",
    title: "Tell us your name",
    description: "This is how you'll appear to other Nexus users.",
    icon: User,
  },
  {
    id: 2,
    label: "Username",
    title: "Pick a username",
    description: "Choose a unique handle for your profile and mentions.",
    icon: AtSign,
  },
  {
    id: 3,
    label: "Contact",
    title: "Add your contact number",
    description: "We'll use this to help you connect with people you know.",
    icon: Phone,
  },
] as const;

export const INITIAL_PROFILE_FORM_DATA = {
  firstName: "",
  lastName: "",
  username: "",
  contact: "",
};

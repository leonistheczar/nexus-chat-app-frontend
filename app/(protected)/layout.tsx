import type { Metadata } from "next";
import ProtectedChatGuard from "./ProtectedChatGuard";

export const metadata: Metadata = {
  title: {
    default: "Chat",
    template: "%s | Nexus",
  },
  description:
    "Nexus is a modern real-time messaging platform built for seamless conversations. Designed for speed, privacy, and simplicity.",
  icons: {
    icon: [
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicons/favicon-64x64.png", sizes: "64x64", type: "image/png" },
    ],
    apple: [
      { url: "/favicons/favicon-57x57.png", sizes: "57x57" },
      { url: "/favicons/favicon-60x60.png", sizes: "60x60" },
      { url: "/favicons/favicon-152x152.png", sizes: "152x152" },
      { url: "/favicons/favicon-180x180.png", sizes: "180x180" },
    ],
    shortcut: "/favicons/favicon-32x32.png",
    other: [
      { rel: "msapplication-TileImage", url: "/favicons/favicon-150x150.png" },
      {
        rel: "msapplication-square310x310logo",
        url: "/favicons/favicon-310x310.png",
      },
    ],
  },
  applicationName: "Nexus",
  keywords: [
    "chat app",
    "real-time messaging",
    "Nexus",
    "secure chat",
    "MERN chat app",
  ],
};

export default function ProtectedChatLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ProtectedChatGuard>
      <main className="h-screen">{children}</main>
    </ProtectedChatGuard>
  );
}

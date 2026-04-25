import type { Metadata } from "next";
import "./main.css";
import Navbar from "./components/baseComponents/Navbar";
import Footer from "./components/baseComponents/Footer";
import ThemeProviderWrapper from "./providers/ThemeProvider";
export const metadata: Metadata = {
  title: "Nexus - A Modern Real-time Messaging Platform",
  description:
    "Nexus is a modern real-time messaging platform built for seamless conversations. Designed for speed, privacy, and simplicity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased scroll-smooth"
      suppressHydrationWarning
    >
      <body className="geist-font min-h-screen flex flex-col bg-primary-200/20 text-primary-900 antialiased">
        <ThemeProviderWrapper>
          <Navbar />
          <main className="flex-1 flex flex-col min-h-0 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}

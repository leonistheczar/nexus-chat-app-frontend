"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";

export default function ThemeProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      {children}
    </NextThemeProvider>
  );
}
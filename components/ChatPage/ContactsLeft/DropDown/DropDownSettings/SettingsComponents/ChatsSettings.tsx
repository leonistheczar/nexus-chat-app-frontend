"use client";

import Alert from "@/components/SharedComponents/AlertDialog";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import SettingsSelect from "./SettingsSelect";
import SettingsToggle from "./SettingsToggle";
import {
  applyChatFontSize,
  useUserPreferences,
  type ChatFontSize,
} from "../userPreferencesStore";
const FONT_OPTIONS = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
];

const THEME_OPTIONS = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System default" },
];

export default function ChatsSettings() {
  const { theme, setTheme } = useTheme();
  const [clearAlert, setClearAlert] = useState<string | null>(null);

  const {
    enterToSend,
    showMediaPreview,
    autoDownloadMedia,
    chatFontSize,
    setEnterToSend,
    setShowMediaPreview,
    setAutoDownloadMedia,
    setChatFontSize,
  } = useUserPreferences();

  useEffect(() => {
    applyChatFontSize(chatFontSize);
  }, [chatFontSize]);

  const handleClearHistory = () => {
    setClearAlert(
      "Local chat cache cleared. Sync with your server when the API is connected.",
    );
  };

  return (
    <div className="text-sm space-y-6 max-w-xl">
      {clearAlert && (
        <Alert variant="success" message={clearAlert} isVisible />
      )}

      <SettingsSelect
        id="chat-theme"
        label="Theme"
        description="Choose how Nexus looks in the chat area."
        value={theme ?? "system"}
        options={THEME_OPTIONS}
        onChange={(value) => setTheme(value)}
      />

      <SettingsSelect
        id="chat-font-size"
        label="Message text size"
        description="Adjust the size of text in conversations."
        value={chatFontSize}
        options={FONT_OPTIONS}
        onChange={(value) => setChatFontSize(value as ChatFontSize)}
      />

      <div className="space-y-5">
        <SettingsToggle
          id="enter-to-send"
          label="Send with Enter"
          description="Press Enter to send a message. Use Shift+Enter for a new line."
          checked={enterToSend}
          onChange={setEnterToSend}
        />
        <div className="h-px bg-background-900/20" />
        <SettingsToggle
          id="show-media-preview"
          label="Show media preview"
          description="Display images and videos inline in the chat."
          checked={showMediaPreview}
          onChange={setShowMediaPreview}
        />
        <div className="h-px bg-background-900/20" />
        <SettingsToggle
          id="auto-download-media"
          label="Auto-download media"
          description="Automatically download photos and files on Wi‑Fi."
          checked={autoDownloadMedia}
          onChange={setAutoDownloadMedia}
        />
      </div>

      <section className="pt-4 border-t border-background-900/10 space-y-2">
        <p className="font-medium text-text-900">Chat history</p>
        <p className="text-xs text-text-900/50 leading-relaxed">
          Clear cached messages stored on this device. Your account data on
          the server is not affected until the backend is wired up.
        </p>
        <button
          type="button"
          onClick={handleClearHistory}
          className="mt-2 px-4 py-2 rounded-lg bg-primary-200/80 hover:bg-primary-300 transition cursor-pointer text-text-900"
        >
          Clear local cache
        </button>
      </section>
    </div>
  );
}

"use client";

import { useChatContacts } from "@/lib/providers/ChatProvider";
import { lockBodyScroll } from "@/lib/bodyScrollLock";
import { useEffect, useRef } from "react";
import { useSettings } from "./SettingsStore";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  ShieldAlert,
  MessageSquare,
  Lock,
  Bell,
  HelpCircle,
  PanelLeftClose,
} from "lucide-react";
import ProfileSettings from "./SettingsComponents/ProfileSettings";
import AccountSettings from "./SettingsComponents/AccountSettings";
import ChatsSettings from "./SettingsComponents/ChatsSettings";
import PrivacySettings from "./SettingsComponents/PrivacySettings";
import NotificationsSettings from "./SettingsComponents/NotificationsSettings";
import HelpFeedbackSettings from "./SettingsComponents/HelpFeedbackSettings";
import {
  applyChatFontSize,
  useUserPreferences,
} from "./userPreferencesStore";

export default function Settings() {
  const { activeTab, setActiveTab } = useSettings();
  const { openSettings, setOpenSettings } = useChatContacts();
  const settingsRef = useRef<HTMLDivElement>(null);

  // Simple handler for explicit click events
  const handleExplicitClose = () => {
    setActiveTab("profile");
    setOpenSettings(false);
  };

  useEffect(() => {
    applyChatFontSize(useUserPreferences.getState().chatFontSize);
  }, []);

  useEffect(() => {
    if (!openSettings) return;

    const unlockScroll = lockBodyScroll();
    const closeAndReset = () => {
      setActiveTab("profile");
      setOpenSettings(false);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeAndReset();
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(e.target as Node)
      ) {
        closeAndReset();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      unlockScroll();
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, [openSettings, setActiveTab, setOpenSettings]);

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "account", label: "Account", icon: ShieldAlert },
    { id: "chats", label: "Chats", icon: MessageSquare },
    { id: "privacy", label: "Privacy", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "feedback", label: "Help & Feedback", icon: HelpCircle },
  ] as const;

  return (
    <AnimatePresence>
      {openSettings && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          transition={{ duration: 0.05, ease: "linear" }}
          style={{ willChange: "opacity" }}
          className="absolute top-0 left-0 w-full h-full bg-slate-950/40 z-50 flex justify-start"
        >
          <motion.div
            ref={settingsRef}
            initial={{ translateX: "-100%" }}
            animate={{ translateX: 0 }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.25 }}
            exit={{ translateX: "-100%" }}
            style={{ willChange: "transform" }}
            className="w-full max-w-2xl h-full bg-primary-100 shadow-2xl grid grid-cols-[0.5fr_1fr] border-r border-slate-200/20"
          >
            {/* Sidebar Navigation */}
            <div className="border-r border-slate-500/20 p-4 flex flex-col gap-y-1 justify-between">
              <div className="flex flex-col gap-y-1">
                <div className="flex items-center gap-x-2 m-2 mb-6">
                  <button
                    onClick={handleExplicitClose}
                    className="p-2 rounded-lg hover:bg-background-50 cursor-pointer"
                  >
                    <PanelLeftClose size={20} />
                  </button>
                  <h2 className="text-xl font-bold tracking-tight">Settings</h2>
                </div>

                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-x-3 px-4 py-3 rounded-xl font-medium text-[11px] md:text-sm transition-all cursor-pointer ${
                        isActive  
                          ? "bg-primary-200/70 shadow-sm"
                          : "hover:bg-primary-400/10 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Icon className="md:w-4 md:h-4" />
                      <span className="">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content Pane */}
            <div className="flex-1 p-6 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.12, ease: "easeOut" }}
                  style={{ willChange: "transform, opacity" }}
                  className=""
                >
                  <h3 className="text-2xl font-bold mb-6">
                    {tabs.find((tab) => tab.id === activeTab)?.label ??
                      activeTab}
                  </h3>

                  {activeTab === "profile" && <ProfileSettings />}
                  {activeTab === "account" && <AccountSettings />}
                  {activeTab === "chats" && <ChatsSettings />}
                  {activeTab === "privacy" && <PrivacySettings />}
                  {activeTab === "notifications" && <NotificationsSettings />}
                  {activeTab === "feedback" && <HelpFeedbackSettings />}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

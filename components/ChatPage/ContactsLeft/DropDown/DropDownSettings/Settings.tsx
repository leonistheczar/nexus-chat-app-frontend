"use client";

import { useChatContacts } from "@/components/ChatPage/ChatProvider";
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
  X 
} from "lucide-react";

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
    if (!openSettings) return;

    document.body.style.overflow = "hidden";
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
      document.body.style.overflow = "";
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
          exit={{ opacity: 0 }}
          transition={{ duration: 0.05, ease: "linear" }}
          style={{ willChange: "opacity" }}
          className="absolute top-0 left-0 w-full h-full bg-slate-950/40 z-50 flex justify-start"
        >
          <motion.div
            ref={settingsRef}
            initial={{ translateX: "-100%" }}
            animate={{ translateX: 0 }}
            transition={{type: "tween", ease:"linear", duration:0.1}}
            exit={{ translateX: "-100%" }}
            style={{ willChange: "transform" }}
            className="w-full max-w-2xl h-full bg-primary-100 shadow-2xl flex border-r border-slate-200/20"
          >
            {/* Sidebar Navigation */}
            <div className="w-64 border-r border-slate-200/20 p-4 flex flex-col gap-y-1 justify-between">
              <div className="flex flex-col gap-y-1">
                <div className="flex items-center justify-between m-2 mb-6">
                  <h2 className="text-xl font-bold tracking-tight">Settings</h2>
                  <button 
                    onClick={handleExplicitClose}
                    className="p-1.5 rounded-lg hover:bg-slate-200/20 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-x-3 px-4 py-3 rounded-xl font-medium text-sm transition-all cursor-pointer ${
                        isActive
                          ? "bg-slate-200/30 shadow-sm"
                          : "hover:bg-slate-200/10 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content Pane */}
            <div className="flex-1 p-8 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.12, ease: "easeOut" }}
                  style={{ willChange: "transform, opacity" }}
                  className="h-full"
                >
                  <h3 className="text-2xl font-bold mb-6 capitalize">{activeTab}</h3>
                  
                  {activeTab === "profile" && <div className="text-sm">Profile Configuration Panel</div>}
                  {activeTab === "account" && <div className="text-sm">Account Security and Setup</div>}
                  {activeTab === "chats" && <div className="text-sm">Chat Customization and History</div>}
                  {activeTab === "privacy" && <div className="text-sm">Privacy Options and Visibility</div>}
                  {activeTab === "notifications" && <div className="text-sm">Alerts and Notification Adjustments</div>}
                  {activeTab === "feedback" && <div className="text-sm">Support Queries and Bug Feedback</div>}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
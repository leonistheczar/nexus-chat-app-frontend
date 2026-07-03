"use client";

import { useChatContacts } from "@/components/ChatPage/ChatProvider";
import { useEffect, useRef } from "react";
import { useSettings } from "./SettingsStore";
export default function Settings(){
    const {activeTab, setActiveTab} = useSettings();
      // Contact Provider
      const { openSettings, setOpenSettings } = useChatContacts();
      const settingsRef = useRef<HTMLDivElement>(null);
      
      useEffect(() => {
          if (!openSettings) return;
      
          document.body.style.overflow = "hidden";
      
          const handleKeyDown = (e: KeyboardEvent) => {
              if (e.key === "Escape") {
                  setActiveTab("profile");
                  setOpenSettings(false);
              }
          };
      
          const handleMouseDown = (e: MouseEvent) => {
              if (
                  settingsRef.current &&
                  !settingsRef.current.contains(e.target as Node)
              ) {
                  setActiveTab("profile");
                  setOpenSettings(false);
              }
          };
      
          window.addEventListener("keydown", handleKeyDown);
          window.addEventListener("mousedown", handleMouseDown);
      
          return () => {
              document.body.style.overflow = "";
              window.removeEventListener("keydown", handleKeyDown);
              window.removeEventListener("mousedown", handleMouseDown);
          };
      }, [openSettings, setOpenSettings]);
    return (
         openSettings && (
            <div className="absolute top-0 left-0 w-full h-full bg-slate-950/10 z-99">
                <div ref={settingsRef} className="bg-primary-100">
                    <div className="flex flex-col gap-y-4">
                        <button onClick={() => setActiveTab("profile")} className="hover:cursor-pointer">Profile</button>
                        <button onClick={() => setActiveTab("account")} className="hover:cursor-pointer">Account</button>
                        <button onClick={() => setActiveTab("chats")} className="hover:cursor-pointer">Chats</button>
                        <button onClick={() => setActiveTab("privacy")} className="hover:cursor-pointer">Privacy</button>
                        <button onClick={() => setActiveTab("notifications")} className="hover:cursor-pointer">Notifications</button>
                        <button onClick={() => setActiveTab("feedback")} className="hover:cursor-pointer">Help & Feedback</button>
                    </div>
                    <div>
                        {activeTab === "profile" && (<div>Profile</div>)}
                        {activeTab === "account" && (<div>Account</div>)}
                        {activeTab === "chats" && (<div>Chats</div>)}
                        {activeTab === "privacy" && (<div>Privacy</div>)}
                        {activeTab === "notifications" && (<div>Notifications</div>)}
                        {activeTab === "feedback" && (<div>Help & Feedback</div>)}
                    </div>
                </div>
            </div>
        )
    )
}
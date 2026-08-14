import { create } from "zustand";
export type ActiveSettingsTabs = "profile" | "account" | "chats" | "privacy" | "notifications" | "feedback";
type SettingStoreType = {
    activeTab: ActiveSettingsTabs,
    setActiveTab: (tab: ActiveSettingsTabs) => void;
}
export const useSettings = create<SettingStoreType>((set) => ({
    // Initial State
    activeTab: "profile",
    // Dynamic State
    setActiveTab: (tab) => set({activeTab: tab})
}))
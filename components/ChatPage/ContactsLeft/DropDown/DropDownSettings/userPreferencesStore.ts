import { create } from "zustand";
import { persist } from "zustand/middleware";

export type LastSeenPrivacy = "everyone" | "contacts" | "nobody";
export type ProfileVisibility = "everyone" | "contacts" | "nobody";
export type ChatFontSize = "small" | "medium" | "large";

type UserPreferencesState = {
  enterToSend: boolean;
  showMediaPreview: boolean;
  autoDownloadMedia: boolean;
  chatFontSize: ChatFontSize;

  lastSeen: LastSeenPrivacy;
  profilePhotoVisibility: ProfileVisibility;
  aboutVisibility: ProfileVisibility;
  readReceipts: boolean;

  notificationsEnabled: boolean;
  messageNotifications: boolean;
  groupNotifications: boolean;
  notificationPreview: boolean;
  notificationSound: boolean;
  emailNotifications: boolean;

  twoFactorEnabled: boolean;

  setEnterToSend: (value: boolean) => void;
  setShowMediaPreview: (value: boolean) => void;
  setAutoDownloadMedia: (value: boolean) => void;
  setChatFontSize: (value: ChatFontSize) => void;

  setLastSeen: (value: LastSeenPrivacy) => void;
  setProfilePhotoVisibility: (value: ProfileVisibility) => void;
  setAboutVisibility: (value: ProfileVisibility) => void;
  setReadReceipts: (value: boolean) => void;

  setNotificationsEnabled: (value: boolean) => void;
  setMessageNotifications: (value: boolean) => void;
  setGroupNotifications: (value: boolean) => void;
  setNotificationPreview: (value: boolean) => void;
  setNotificationSound: (value: boolean) => void;
  setEmailNotifications: (value: boolean) => void;

  setTwoFactorEnabled: (value: boolean) => void;
};

export const useUserPreferences = create<UserPreferencesState>()(
  persist(
    (set) => ({
      enterToSend: true,
      showMediaPreview: true,
      autoDownloadMedia: false,
      chatFontSize: "medium",

      lastSeen: "contacts",
      profilePhotoVisibility: "everyone",
      aboutVisibility: "contacts",
      readReceipts: true,

      notificationsEnabled: true,
      messageNotifications: true,
      groupNotifications: true,
      notificationPreview: true,
      notificationSound: true,
      emailNotifications: false,

      twoFactorEnabled: false,

      setEnterToSend: (value) => set({ enterToSend: value }),
      setShowMediaPreview: (value) => set({ showMediaPreview: value }),
      setAutoDownloadMedia: (value) => set({ autoDownloadMedia: value }),
      setChatFontSize: (value) => set({ chatFontSize: value }),

      setLastSeen: (value) => set({ lastSeen: value }),
      setProfilePhotoVisibility: (value) =>
        set({ profilePhotoVisibility: value }),
      setAboutVisibility: (value) => set({ aboutVisibility: value }),
      setReadReceipts: (value) => set({ readReceipts: value }),

      setNotificationsEnabled: (value) =>
        set(
          value
            ? { notificationsEnabled: true }
            : {
                notificationsEnabled: false,
                messageNotifications: false,
                groupNotifications: false,
                notificationPreview: false,
                notificationSound: false,
              },
        ),
      setMessageNotifications: (value) => set({ messageNotifications: value }),
      setGroupNotifications: (value) => set({ groupNotifications: value }),
      setNotificationPreview: (value) => set({ notificationPreview: value }),
      setNotificationSound: (value) => set({ notificationSound: value }),
      setEmailNotifications: (value) => set({ emailNotifications: value }),

      setTwoFactorEnabled: (value) => set({ twoFactorEnabled: value }),
    }),
    { name: "nexus-user-preferences" },
  ),
);

export function applyChatFontSize(size: ChatFontSize) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.chatFontSize = size;
}

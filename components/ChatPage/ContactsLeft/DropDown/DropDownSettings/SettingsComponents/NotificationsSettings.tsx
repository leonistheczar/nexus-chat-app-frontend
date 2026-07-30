"use client";

import SettingsToggle from "./SettingsToggle";
import { useUserPreferences } from "../userPreferencesStore";

export default function NotificationsSettings() {
  const {
    notificationsEnabled,
    messageNotifications,
    groupNotifications,
    notificationPreview,
    notificationSound,
    emailNotifications,
    setNotificationsEnabled,
    setMessageNotifications,
    setGroupNotifications,
    setNotificationPreview,
    setNotificationSound,
    setEmailNotifications,
  } = useUserPreferences();

  const subToggleDisabled = !notificationsEnabled;

  return (
    <div className="text-sm space-y-5 max-w-lg">
      <SettingsToggle
        id="notifications-master"
        label="Notifications"
        description="Turn all push and in-app alerts on or off."
        checked={notificationsEnabled}
        onChange={setNotificationsEnabled}
      />
      <div className="h-px bg-background-900/20" />

      <SettingsToggle
        id="message-notifications"
        label="Direct messages"
        description="Alerts for new one-to-one messages."
        checked={messageNotifications}
        onChange={setMessageNotifications}
        disabled={subToggleDisabled}
      />
      <div className="h-px bg-background-900/20" />

      <SettingsToggle
        id="group-notifications"
        label="Group chats"
        description="Alerts for mentions and messages in groups."
        checked={groupNotifications}
        onChange={setGroupNotifications}
        disabled={subToggleDisabled}
      />
      <div className="h-px bg-background-900/20" />

      <SettingsToggle
        id="notification-preview"
        label="Show message preview"
        description="Display sender name and message snippet in notifications."
        checked={notificationPreview}
        onChange={setNotificationPreview}
        disabled={subToggleDisabled}
      />
      <div className="h-px bg-background-900/20" />

      <SettingsToggle
        id="notification-sound"
        label="Notification sounds"
        description="Play a sound when a new message arrives."
        checked={notificationSound}
        onChange={setNotificationSound}
        disabled={subToggleDisabled}
      />
      <div className="h-px bg-background-900/20" />

      <SettingsToggle
        id="email-notifications"
        label="Email digests"
        description="Occasional email when you are away for a long time."
        checked={emailNotifications}
        onChange={setEmailNotifications}
      />
    </div>
  );
}

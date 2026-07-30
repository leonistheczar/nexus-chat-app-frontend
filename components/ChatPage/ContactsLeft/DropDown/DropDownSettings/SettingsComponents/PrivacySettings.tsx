"use client";

import { UserX } from "lucide-react";
import SettingsSelect from "./SettingsSelect";
import SettingsToggle from "./SettingsToggle";
import {
  useUserPreferences,
  type LastSeenPrivacy,
  type ProfileVisibility,
} from "../userPreferencesStore";

const VISIBILITY_OPTIONS = [
  { value: "everyone", label: "Everyone" },
  { value: "contacts", label: "My contacts" },
  { value: "nobody", label: "Nobody" },
];

export default function PrivacySettings() {
  const {
    lastSeen,
    profilePhotoVisibility,
    aboutVisibility,
    readReceipts,
    setLastSeen,
    setProfilePhotoVisibility,
    setAboutVisibility,
    setReadReceipts,
  } = useUserPreferences();

  return (
    <div className="text-sm space-y-6 max-w-lg">
      <p className="text-xs text-text-900/50 leading-relaxed">
        Control who can see your activity and profile details. Preferences are
        saved on this device and ready to sync with your account API.
      </p>

      <SettingsSelect
        id="last-seen"
        label="Last seen & online"
        description="Who can see when you were last active."
        value={lastSeen}
        options={VISIBILITY_OPTIONS}
        onChange={(value) => setLastSeen(value as LastSeenPrivacy)}
      />

      <SettingsSelect
        id="profile-photo-visibility"
        label="Profile photo"
        description="Who can view your profile picture."
        value={profilePhotoVisibility}
        options={VISIBILITY_OPTIONS}
        onChange={(value) =>
          setProfilePhotoVisibility(value as ProfileVisibility)
        }
      />

      <SettingsSelect
        id="about-visibility"
        label="About"
        description="Who can see your bio and status."
        value={aboutVisibility}
        options={VISIBILITY_OPTIONS}
        onChange={(value) => setAboutVisibility(value as ProfileVisibility)}
      />

      <div className="space-y-4">
        <SettingsToggle
          id="read-receipts"
          label="Read receipts"
          description="Let others know when you have read their messages."
          checked={readReceipts}
          onChange={setReadReceipts}
        />
        <div className="h-px bg-background-900/20" />
      </div>

      <section className="pt-2 border-t border-background-900/10">
        <div className="flex items-center gap-2 mb-2">
          <UserX className="w-4 h-4 text-text-900/60" />
          <p className="font-medium text-text-900">Blocked contacts</p>
        </div>
        <p className="text-xs text-text-900/50 leading-relaxed">
          You have not blocked anyone. Blocked users cannot message you or see
          your last seen when that API is enabled.
        </p>
        <button
          type="button"
          disabled
          className="mt-3 px-4 py-2 rounded-lg bg-background-200/50 text-text-900/40 text-sm cursor-not-allowed"
        >
          Manage blocked contacts
        </button>
      </section>
    </div>
  );
}

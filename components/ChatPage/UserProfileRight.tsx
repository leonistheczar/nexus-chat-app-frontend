"use client";

import { Contact } from "@/app/types/types";
import {
  Search,
  Image as ImageIcon,
  Phone,
  Video,
  Bell,
  BellOff,
  Shield,
  Star,
  FileText,
  Link2,
  Users,
  Ban,
  Trash2,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState, useMemo, useCallback } from "react";

type UserProfileRightProps = {
  selectedContact: Contact | null;
};

// Feature configuration
const profileFeatures = [
  {
    key: "search",
    icon: Search,
    label: "Search",
    description: "Search messages",
  },
  {
    key: "media",
    icon: ImageIcon,
    label: "Media",
    description: "Shared photos & videos",
  },
  {
    key: "files",
    icon: FileText,
    label: "Files",
    description: "Shared documents",
  },
  {
    key: "links",
    icon: Link2,
    label: "Links",
    description: "Shared links",
  },
];

const preferenceFeatures = [
  {
    key: "mute",
    icon: Bell,
    activeIcon: BellOff,
    label: "Mute Notifications",
    activeLabel: "Unmute Notifications",
  },
  {
    key: "star",
    icon: Star,
    label: "Star Contact",
    activeLabel: "Unstar Contact",
  },
];

const dangerFeatures = [
  {
    key: "block",
    icon: Ban,
    label: "Block Contact",
  },
  {
    key: "delete",
    icon: Trash2,
    label: "Delete Chat",
  },
];

export default function UserProfileRight({
  selectedContact,
}: UserProfileRightProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "overview" | "media" | "files" | "links"
  >("overview");

  const getInitials = useCallback((firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }, []);

  // Empty state
  if (!selectedContact) {
    return (
      <div className="h-dvh flex flex-col items-center justify-center text-text-600 gap-3 p-4">
        <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center">
          <Users className="w-10 h-10 text-primary-300" />
        </div>
        <div className="text-center space-y-1">
          <h2 className="text-lg font-semibold text-text-800">
            No conversation selected
          </h2>
          <p className="text-sm text-text-500">
            Choose a contact to start messaging
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-dvh flex flex-col bg-text-50">
      {/* Profile Header */}
      <div className="p-6 border-b border-background-200">
        <div className="flex flex-col items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            <div className="relative w-24 h-24 overflow-hidden rounded-full shadow-lg ring-2 ring-primary-200">
              {selectedContact.profile_pic ? (
                <Image
                  src={selectedContact.profile_pic}
                  alt={`${selectedContact.first_name} ${selectedContact.last_name}`}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              ) : (
                <div className="w-full h-full bg-primary-100 flex items-center justify-center">
                  <span className="text-2xl font-medium text-primary-600">
                    {getInitials(
                      selectedContact.first_name,
                      selectedContact.last_name,
                    )}
                  </span>
                </div>
              )}
            </div>
            {/* Online status indicator */}
            <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white" />
          </div>

          {/* User Info */}
          <div className="text-center">
            <h2 className="text-lg font-semibold text-text-800">
              {selectedContact.first_name} {selectedContact.last_name}
            </h2>
            <p className="text-sm text-text-500 flex items-center justify-center gap-1 mt-1">
              <Phone className="w-3.5 h-3.5" />
              {selectedContact.contact}
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-background-300 scrollbar-track-transparent">
        {/* Profile Features Grid */}
        <div className="p-4">
          <h3 className="text-xs font-medium text-text-500 uppercase tracking-wider mb-3">
            Shared Content
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {profileFeatures.map((feature) => (
              <button
                key={feature.key}
                onClick={() => setActiveTab(feature.key as typeof activeTab)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all cursor-pointer ${
                  activeTab === feature.key
                    ? "border-primary-300 bg-primary-50"
                    : "border-background-200 hover:border-primary-200 hover:bg-primary-50/50"
                }`}
              >
                <feature.icon
                  size={24}
                  strokeWidth={1.5}
                  className="text-primary-500"
                />
                <span className="text-sm font-medium text-text-700">
                  {feature.label}
                </span>
                <span className="text-xs text-text-500">
                  {feature.description}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div className="p-4 border-t border-background-200">
          <h3 className="text-xs font-medium text-text-500 uppercase tracking-wider mb-3">
            Preferences
          </h3>
          <div className="space-y-1">
            {preferenceFeatures.map((feature) => {
              const isActive = feature.key === "mute" ? isMuted : isStarred;
              const IconComponent =
                isActive && feature.activeIcon
                  ? feature.activeIcon
                  : feature.icon;
              const label =
                isActive && feature.activeLabel
                  ? feature.activeLabel
                  : feature.label;

              return (
                <button
                  key={feature.key}
                  onClick={() => {
                    if (feature.key === "mute") setIsMuted(!isMuted);
                    if (feature.key === "star") setIsStarred(!isStarred);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                    isActive
                      ? "bg-primary-50 text-primary-600"
                      : "hover:bg-background-100 text-text-700"
                  }`}
                >
                  <IconComponent size={18} strokeWidth={1.5} />
                  <span className="text-sm font-medium">{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="p-4 border-t border-background-200">
          <h3 className="text-xs font-medium text-text-500 uppercase tracking-wider mb-3">
            Danger Zone
          </h3>
          <div className="space-y-1">
            {dangerFeatures.map((feature) => (
              <button
                key={feature.key}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
              >
                <feature.icon size={18} strokeWidth={1.5} />
                <span className="text-sm font-medium">{feature.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

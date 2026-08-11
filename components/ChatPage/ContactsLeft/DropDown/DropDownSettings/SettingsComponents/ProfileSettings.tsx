"use client";

import { useClickOutside } from "@/hooks/useClickOutside";
import { Camera, Copy, CopyCheck, Pencil, UserRound } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";

interface EditableFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  showCopy?: boolean;
}

function EditableField({ label, value, onChange, showCopy = false }: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useClickOutside<HTMLDivElement>({
    enabled: isEditing,
    onOutsideClick: () => setIsEditing(false),
    onEnter: () => setIsEditing(false),
    onEscape: () => setIsEditing(false),
  })

  // Focus and select input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  // Reset copy state after delay
  useEffect(() => {
    if (!copied) return;
    
    const timeoutId = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeoutId);
  }, [copied]);

  const handleCopy = useCallback(async () => {
    if (!value.trim()) return;
    
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  }, [value]);

  const toggleEdit = useCallback(() => {
    setIsEditing((prev) => !prev);
  }, []);

  return (
    <div ref={containerRef} className="group">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <label 
            htmlFor={`field-${label.toLowerCase()}`}
            className="text-sm font-medium text-text-900/60"
          >
            {label}
          </label>
          <input
            ref={inputRef}
            id={`field-${label.toLowerCase()}`}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            readOnly={!isEditing} 
            className={`mt-1 w-full bg-transparent outline-none transition-all duration-200 truncate ${
              isEditing 
                ? "text-text-900 cursor-text" 
                : "cursor-default text-text-900/80"
            }`}
          />
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {showCopy && (
            <button
              type="button"
              onClick={handleCopy}
              disabled={!value.trim()}
              className="p-2 text-text-900/50 transition-all duration-200 hover:text-text-900 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              title={copied ? "Copied!" : "Copy to clipboard"}
              aria-label={copied ? "Copied to clipboard" : "Copy to clipboard"}
            >
              {copied ? (
                <CopyCheck strokeWidth={1.25} size={18} className="text-green-500" />
              ) : (
                <Copy strokeWidth={1.5} size={18} />
              )}
            </button>
          )}
          <button
            type="button"
            onClick={toggleEdit}
            className="p-2 text-text-900/50 transition-all duration-200 hover:text-text-900 cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100"
            title={isEditing ? "Done editing" : "Edit field"}
            aria-label={isEditing ? "Done editing" : "Edit field"}
          >
            <Pencil size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div
        className={`mt-4 h-px transition-all duration-300 ${
          isEditing 
            ? "bg-primary-500 scale-x-100" 
            : "bg-background-900/20 scale-x-100"
        }`}
        aria-hidden="true"
      />
    </div>
  );
}

export default function ProfileSettings() {
  const [name, setName] = useState("User");
  const [email, setEmail] = useState("user@email.com");
  const [phone, setPhone] = useState("+92-XXXXXXXXX");
  const [isSaving, setIsSaving] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Saving profile:", { name, email, phone });
      // Add success toast/notification here
    } catch (error) {
      console.error("Failed to save profile:", error);
      // Add error toast/notification here
    } finally {
      setIsSaving(false);
    }
  };

  const isFormValid = name.trim() && email.trim() && phone.trim();

  return (
    <div className="text-sm max-w-md mx-auto">
      <div className="flex flex-col">
        {/* Avatar Section */}
        <div className="relative flex flex-col items-center">
          <div className="relative bg-background-300 rounded-full p-1 flex items-center justify-center">
            {avatarError ? (
              <UserRound strokeWidth={0.5} size={100} className="text-text-900/60" />
            ) : (
              <UserRound strokeWidth={0.5} size={100} className="text-text-900/60" />
            )}
            <button
              type="button"
              onClick={() => {/* Implement image upload */}}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-x-2 bg-slate-900 text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl"
              aria-label="Change profile photo"
            >
              <Camera strokeWidth={1.5} size={16} />
              <span className="text-xs font-medium whitespace-nowrap">Edit Photo</span>
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="mt-10 space-y-6">
          <EditableField
            label="Name"
            value={name}
            onChange={setName}
          />
          <EditableField
            label="Email"
            value={email}
            onChange={setEmail}
            showCopy
          />
          <EditableField
            label="Phone"
            value={phone}
            onChange={setPhone}
            showCopy
          />
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={handleSave}
            disabled={!isFormValid || isSaving}
            className="px-6 py-2.5 text-white bg-primary-400/90 rounded-lg transition-all duration-200 hover:bg-primary-400 active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary-400/90 disabled:active:scale-100 flex items-center justify-center gap-2"
          >
            {isSaving ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
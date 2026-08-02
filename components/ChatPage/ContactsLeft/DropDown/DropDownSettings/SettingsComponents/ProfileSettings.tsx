"use client";

import { Camera, Copy, CopyCheck, Pencil, UserRound } from "lucide-react";
import { useState, useRef, useEffect } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  // Handle outside click and Escape key
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsEditing(false);
      }
    }
    
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsEditing(false);
      }
    }

    if (isEditing) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscape);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isEditing]);

  // Reset copy
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (copied) {
      timeoutId = setTimeout(() => setCopied(false), 2000);
    }
    return () => clearTimeout(timeoutId);
  }, [copied]);

  const handleCopy = async () => {
    if (!value.trim()) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  return (
    <div ref={containerRef}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium text-text-900/60">
            {label}
          </label>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            readOnly={!isEditing}
            className={`mt-1 w-full bg-transparent outline-none transition-colors ${
              isEditing ? "text-text-900" : "cursor-default"
            }`}
          />
        </div>

        <div className="flex items-center gap-2">
          {showCopy && (
            <button
              type="button"
              className="p-2 text-text-900/50 transition hover:text-text-900 cursor-pointer"
              onClick={handleCopy}
              title="Copy to clipboard"
            >
              {copied ? (
                <CopyCheck strokeWidth={1.25} size={18} />
              ) : (
                <Copy strokeWidth={1} size={18} />
              )}
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsEditing((prev) => !prev)}
            className="rounded-md p-2 text-text-900/50 transition hover:text-text-900 cursor-pointer"
            title={isEditing ? "Save" : "Edit"}
          >
            <Pencil size={18} />
          </button>
        </div>
      </div>

      <div
        className={`mt-4 h-px transition-colors duration-300 ${
          isEditing ? "bg-primary-500" : "bg-background-900/20"
        }`}
      />
    </div>
  );
}

export default function ProfileSettings() {
  const [name, setName] = useState("User");
  const [email, setEmail] = useState("user@email.com");
  const [phone, setPhone] = useState("+92-XXXXXXXXX");

  const handleSave = () => {
    // TODO: Implement your save logic here (e.g., API call)
    console.log("Saving profile:", { name, email, phone });
  };

  return (
    <div className="text-sm">
      <div className="flex flex-col justify-center">
        <div className="relative bg-background-300 rounded-full p-1 flex items-center justify-center mx-auto w-fit">
          <UserRound strokeWidth={0.5} size={100} />
          <button 
            type="button"
            className="absolute -bottom-2 text-green-600 flex items-center gap-x-2 bg-slate-900 p-1 rounded-lg scale-90 hover:bg-slate-800 cursor-pointer transition-colors"
          >
            <Camera strokeWidth={1.5} size={16} />
            <span className="text-xs">Edit Photo</span>
          </button>
        </div>
        
        <div className="mt-8 space-y-6">
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
        
        <button 
          type="button"
          onClick={handleSave}
          className="px-4 py-2 text-white bg-primary-400/90 mt-6 rounded-lg transition duration-100 cursor-pointer hover:bg-primary-400 w-full sm:w-auto mx-auto block"
        >
          Save
        </button>
      </div>
    </div>
  );
}
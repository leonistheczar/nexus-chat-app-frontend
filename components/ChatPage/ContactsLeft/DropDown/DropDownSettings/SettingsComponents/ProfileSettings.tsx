'use client'
import AlertDialog from "@/components/SharedComponents/AlertDialog";
import { Camera, Copy, CopyCheck, Pencil, UserRound } from "lucide-react"
import { useState, useRef, useEffect } from "react";

export default function ProfileSettings() {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [copyClicked, setCopyClicked] = useState(false);
  const userInput = useRef<HTMLInputElement>(null);
  const phoneInput = useRef<HTMLInputElement>(null);
  const nameContainer = useRef<HTMLDivElement>(null);
  const phoneContainer = useRef<HTMLDivElement>(null);
  // Functions
  const handleCopyClick = async () => {
    const phone = phoneInput.current?.value ?? "";
    if (!phone) return;

    try {
      await navigator.clipboard.writeText(phone);
      setCopyClicked(true);
    } catch {
      // Clipboard unavailable — don't show a false success state
    }
  };

  useEffect(() => {
    if (!copyClicked) return;

    const id = window.setTimeout(() => setCopyClicked(false), 4000);
    return () => clearTimeout(id);
  }, [copyClicked]);
  // Handle outside click or ESC
  useEffect(() => {
      function handleInputBorderDisable(e: MouseEvent) {
        const target = e.target as Node;
        if(nameContainer.current && !nameContainer.current.contains(target)){
          setIsEditingName(false);
        }
        if(phoneContainer.current && !phoneContainer.current.contains(target)){
          setIsEditingPhone(false)
        }
      }
      document.addEventListener("mousedown", handleInputBorderDisable);
      return () => document.removeEventListener("mousedown", handleInputBorderDisable);
  }, [])
  useEffect(() => {
    if (isEditingName) {
      userInput.current?.focus();
    }
  }, [isEditingName]);
  
  useEffect(() => {
    if (isEditingPhone) {
      phoneInput.current?.focus();
    }
  }, [isEditingPhone]);
    return (
        <div className="text-sm">
                      <div className="flex justify-center flex-col">
                        <div className="relative bg-background-300 rounded-full p-1 flex items-center justify-center mx-auto">
                          <UserRound strokeWidth={0.5} size={100} />
                          <button className="absolute -bottom-2 text-green-600 flex items-center gap-x-2 bg-slate-900  p-1 rounded-lg scale-90 hover:bg-slate-800 cursor-pointer"><Camera strokeWidth={1.5} /><span>Edit Photo</span></button>
                        </div>
                        <div className="mt-8 space-y-6">
                          {/* Name */}
                          <div ref={nameContainer}>
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex-1">
                                <label
                                  htmlFor="profile-name"
                                  className="text-sm font-medium text-text-900/60"
                                >
                                  Name
                                </label>

                                <input
                                  id="profile-name"
                                  defaultValue="User"
                                  readOnly={!isEditingName}
                                  ref={userInput}
                                  className={`mt-1 w-full bg-transparent outline-none transition-colors ${
                                    isEditingName
                                      ? "text-text-900" 
                                      : ""
                                  }`}
                                />
                              </div>

                              <button
                                onClick={() =>
                                  setIsEditingName((prev) => !prev)
                                }
                                className="rounded-md p-2 text-text-900/50 transition hover:text-text-900 cursor-pointer"
                              >
                                <Pencil size={18} />
                              </button>
                            </div>

                            <div
                              className={`mt-4 h-px transition-colors duration-300 ${
                                isEditingName
                                  ? "bg-primary-500"
                                  : "bg-background-900/20"
                              }`}
                            />
                          </div>
                          {/* Phone */}
                          <div ref={phoneContainer}>
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex-1">
                                <label
                                  htmlFor="profile-phone"
                                  className="text-sm font-medium text-text-900/60"
                                >
                                  Phone
                                </label>

                                <input
                                  id="profile-phone"
                                  ref={phoneInput}
                                  defaultValue="+92-XXXXXXXXX"
                                  readOnly={!isEditingPhone}  
                                  className={`mt-1 w-full bg-transparent outline-none transition-colors ${
                                    isEditingPhone
                                      ? "text-text-900" 
                                      : "cursor-default"
                                  }`}
                                />
                              </div>

                              <button
                                className={`p-2 transition hover:text-text-900 cursor-pointer ${copyClicked ? "text-text-900" : "text-text-900/50" }`}
                                onClick={handleCopyClick}
                              >
                                {copyClicked ? <CopyCheck strokeWidth={1.25} /> : <Copy strokeWidth={1} />}
                              </button>
                              <button
                                onClick={() =>
                                  setIsEditingPhone((prev) => !prev)
                                }
                                className="p-2 text-text-900/50 transition hover:text-text-900 cursor-pointer"
                              >
                                <Pencil size={18} />
                              </button>
                            </div>

                            <div
                              className={`mt-4 h-px transition-colors duration-300 ${
                                isEditingPhone
                                  ? "bg-primary-500"
                                  : "bg-background-900/20"
                              }`}
                            />
                          </div>
                        </div>
                        {/* Save */}
                        <button className="px-4 py-2 text-white bg-primary-400/90 mt-6 rounded-lg transition duration-100 cursor-pointer hover:bg-primary-400">Save</button>
                      </div>
                      <div className="mt-8">
                      {copyClicked ? <AlertDialog title="" message="Phone Number Copied!" /> : ""}
                      </div>
                    </div>
    )
}
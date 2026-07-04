'use client'
import AlertDialog from "@/components/SharedComponents/AlertDialog";
import { Copy, CopyCheck, Pencil, UserRound } from "lucide-react"
import { useState } from "react";

export default function ProfileSettings() {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [copyClicked, setCopyClicked] = useState(false);
  const handleClick = () => {
    setCopyClicked(true);
    setTimeout(() => {
      setCopyClicked(false)
    }, 4000)
  }
    return (
        <div className="text-sm">
                      <div className="flex justify-center flex-col">
                        <div className="bg-background-300 rounded-full p-1 flex items-center justify-center mx-auto">
                          <UserRound strokeWidth={0.5} size={100} />
                        </div>
                        <div className="mt-8 space-y-6">
                          {/* Name */}
                          <div>
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex-1">
                                <label
                                  htmlFor="name"
                                  className="text-sm font-medium text-text-900/60"
                                >
                                  Name
                                </label>

                                <input
                                  id="name"
                                  defaultValue="User"
                                  readOnly={!isEditingName}
                                  className={`mt-1 w-full bg-transparent outline-none transition-colors ${
                                    isEditingName
                                      ? "text-text-900"
                                      : "cursor-default"
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
                          <div>
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex-1">
                                <label
                                  htmlFor="name"
                                  className="text-sm font-medium text-text-900/60"
                                >
                                  Phone
                                </label>

                                <input
                                  id="name"
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
                                onClick={handleClick}
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
                        <button className="px-4 py-2 bg-text-300 mt-6 rounded-lg transition duration-100 cursor-pointer hover:bg-text-400">Save</button>
                      </div>
                      <div className="mt-8">
                      {copyClicked ? <AlertDialog title="" message="Phone Number Copied!" /> : ""}
                      </div>
                    </div>
    )
}
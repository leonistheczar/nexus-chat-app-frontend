"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useChatContacts } from "@/lib/providers/ChatProvider";
import { X, UserPlus, Phone, Search, AtSign } from "lucide-react";

export default function NewUser() {
  const { openNewUser, setOpenNewUser } = useChatContacts();
  const [searchType, setSearchType] = useState<"username" | "phone">(
    "username",
  );
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    username: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement contact addition logic
    setOpenNewUser(false);
  };

  const handleSearch = (query: string) => {
    // TODO: Implement search logic
    console.log("Searching:", query, "by", searchType);
  };

  return (
    <AnimatePresence>
      {openNewUser && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpenNewUser(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-lg max-h-[90vh] flex flex-col rounded-2xl bg-background-100 shadow-2xl border border-background-200 overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-background-200">
              <div className="flex items-center gap-x-4">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <UserPlus className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-text-800 leading-tight">
                    Add New Contact
                  </h2>
                  <p className="text-xs text-text-600 leading-tight">
                    Add by username, phone, or name
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpenNewUser(false)}
                className="p-1.5 hover:bg-background-200 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-text-400" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {/* Search Section */}
              <div className="p-4 border-b border-background-200">
                <div className="flex gap-1 mb-3 bg-background-200 p-1 rounded-lg">
                  {(["username", "phone"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSearchType(type)}
                      className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all cursor-pointer ${
                        searchType === type
                          ? "bg-background-100 text-primary-600 shadow-sm"
                          : "text-text-500 hover:text-text-700"
                      }`}
                    >
                      {type === "username" && (
                        <AtSign className="w-4 h-4 inline mr-1.5" />
                      )}
                      {type === "phone" && (
                        <Phone className="w-4 h-4 inline mr-1.5" />
                      )}
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-500" />
                  <input
                    type={searchType === "phone" ? "tel" : "text"}
                    placeholder={`Search by ${searchType}...`}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-8 py-2 bg-background-50 border border-background-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent text-text-700 placeholder-text-600 text-sm"
                  />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-4 space-y-3">
                <p className="text-sm text-text-500">
                  Or enter contact details manually (at least one field required)
                </p>

                {/* Username Field */}
                <div>
                  <label className="block text-xs font-medium text-text-600 mb-1">
                    Username
                  </label>
                  <div className="relative">
                    <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-400" />
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          username: e.target.value,
                        }))
                      }
                      className="w-full pl-9 pr-4 py-2 bg-background-50 border border-background-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent text-text-700 placeholder-text-400 text-sm"
                      placeholder="johndoe"
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-xs font-medium text-text-600 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      className="w-full pl-9 pr-4 py-2 bg-background-50 border border-background-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent text-text-700 placeholder-text-400 text-sm"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                {/* Name Field */}
                <div>
                  <label className="block text-xs font-medium text-text-600 mb-1">
                    Display Name
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-400 text-sm font-medium">
                      Aa
                    </span>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, name: e.target.value }))
                      }
                      className="w-full pl-9 pr-4 py-2 bg-background-50 border border-background-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent text-text-700 placeholder-text-400 text-sm"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Action Buttons - Fixed at bottom */}
            <div className="flex gap-2.5 p-4 border-t border-background-200">
              <button
                type="button"
                onClick={() => setOpenNewUser(false)}
                className="flex-1 cursor-pointer px-4 py-2 border border-background-200 text-text-600 rounded-lg hover:bg-background-200 transition-colors font-medium text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="flex-1 cursor-pointer px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium text-sm flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Add Contact
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
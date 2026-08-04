"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useChatContacts } from "@/lib/providers/ChatProvider";
import { X, UserPlus, Search, AtSign, User } from "lucide-react";
import { lockBodyScroll } from "@/lib/bodyScrollLock";

// Mock search results for demonstration
interface SearchResult {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
}

export default function NewUser() {
  const { openNewUser, setOpenNewUser } = useChatContacts();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const newUserContainerRef = useRef<HTMLDivElement>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim().length === 0) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // TODO: Implement actual API search logic
    // Simulated search results
    setTimeout(() => {
      const mockResults: SearchResult[] = [
        {
          id: "1",
          username: "johndoe",
          displayName: "John Doe",
        },
        {
          id: "2",
          username: "janedoe",
          displayName: "Jane Doe",
        },
        {
          id: "3",
          username: "mikewilson",
          displayName: "Mike Wilson",
        },
      ].filter(user => 
        user.username.toLowerCase().includes(query.toLowerCase()) ||
        user.displayName.toLowerCase().includes(query.toLowerCase())
      );
      
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 750);
  };

  const handleAddContact = (userId: string) => {
    // TODO: Implement contact addition logic
    console.log("Adding contact:", userId);
    setOpenNewUser(false);
  };
// Handles reset
const handleReset = () => {
  setSearchQuery("");
  setSearchResults([]);
  setOpenNewUser(false);
}
  // Handles accessibility (mouse and keyboard closing)
  useEffect(() => {
    if (!openNewUser) return;

    const unlockScroll = lockBodyScroll();  
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleReset();
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (
        newUserContainerRef.current &&
        !newUserContainerRef.current.contains(e.target as Node)
      ) {
        handleReset();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      unlockScroll();
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, [openNewUser]);  
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
            className="relative z-10 w-full max-w-lg max-h-[90vh] flex flex-col rounded-2xl bg-primary-100 shadow-2xl border border-background-200 overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            ref={newUserContainerRef}
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
                    Search users by username
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

            {/* Search Section */}
            <div className="p-4 border-b border-background-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-500" />
                <input
                  type="text"
                  placeholder="Search by username..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-primary-200/60 border border-background-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent text-text-700 placeholder-text-600 text-sm"
                  autoFocus
                />
                {isSearching && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 border-2 border-primary-300 border-t-primary-600 rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Search Results Section */}
            <div className="flex-1 overflow-y-auto">
              {searchQuery.trim().length > 0 ? (
                <div className="p-2">
                  {isSearching ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="text-sm text-text-500">Searching...</div>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="space-y-1">
                      {searchResults.map((result) => (
                        <div
                          key={result.id}
                          className="flex items-center justify-between p-3 hover:bg-primary-300/20 rounded-lg transition-colors group"
                        >
                          <div className="flex items-center gap-x-3">
                            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                              {result.avatar ? (
                                <img
                                  src={result.avatar}
                                  alt={result.displayName}
                                  className="w-10 h-10 rounded-full object-cover"
                                />
                              ) : (
                                <User className="w-5 h-5 text-primary-600" />
                              )}
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-text-800">
                                {result.displayName}
                              </h3>
                              <p className="text-xs text-text-500 flex items-center gap-1">
                                <AtSign className="w-3 h-3" />
                                {result.username}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleAddContact(result.id)}
                            className="px-3 py-1.5 bg-primary-500 text-white text-xs font-medium rounded-md hover:bg-primary-600 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                          >
                            Add
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-12 h-12 rounded-full bg-background-200 flex items-center justify-center mb-3">
                        <Search className="w-6 h-6 text-text-400" />
                      </div>
                      <h3 className="text-sm font-medium text-text-700 mb-1">
                        No users found
                      </h3>
                      <p className="text-xs text-text-500 max-w-lg">
                        No users match "{searchQuery}". Try a different username.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center px-4">
                  <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mb-4">
                    <AtSign className="w-8 h-8 text-primary-400" />
                  </div>
                  <h3 className="text-base font-medium text-text-700 mb-2">
                    Find users by username
                  </h3>
                  <p className="text-sm text-text-500 max-w-lg">
                    Enter a username in the search field above to find and add new contacts
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-background-200">
              <button
                type="button"
                onClick={() => setOpenNewUser(false)}
                className="w-full cursor-pointer px-4 py-2 bg-primary-400 rounded-lg hover:bg-primary-400/80 transition-colors font-medium text-sm"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
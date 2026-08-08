"use client";

import { Contact, ChatMessage, User } from "@/app/types/types";
import { BookCopy, ChevronDown, PanelLeftOpen, SendHorizontal, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

type MainChatProps = {
  selectedContact: Contact | null;
  showContacts: boolean;
  setShowContacts: React.Dispatch<React.SetStateAction<boolean>>;
};

// Mock current user - in real app, this would come from auth context
const currentUser: User = {
  id: 0,
  firstName: "You",
  lastName: "",
  contact: "",
  profilePic: "",
};

export default function MainChat({
  selectedContact,
  showContacts,
  setShowContacts,
}: MainChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [showMessageMenu, setShowMessageMenu] = useState<number | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Initialize messages when contact changes
  useEffect(() => {
    if (selectedContact) {
      // Convert Contact to User format for the sender
      const contactAsUser: User = {
        id: selectedContact.id,
        firstName: selectedContact.first_name,
        lastName: selectedContact.last_name,
        contact: selectedContact.contact,
        profilePic: selectedContact.profile_pic,
      };

      // Create initial message from contact's default message
      const initialMessages: ChatMessage[] = selectedContact.message
        ? [
            {
              id: Date.now(),
              sender: contactAsUser,
              content: selectedContact.message,
              createdAt: new Date(),
              isRead: true,
            },
          ]
        : [];

      setMessages(initialMessages);
      setNewMessage("");
    } else {
      setMessages([]);
    }
  }, [selectedContact?.id]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [newMessage]);

  // Close message menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showMessageMenu !== null) {
        setShowMessageMenu(null);
      }
    };
    
    if (showMessageMenu !== null) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showMessageMenu]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedContact) return;

    const message: ChatMessage = {
      id: Date.now(),
      sender: currentUser,
      content: newMessage.trim(),
      createdAt: new Date(),
      isRead: false,
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const formatTime = (date?: Date) => {
    if (!date) return "";
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDeleteMessage = (messageId: number) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
    setShowMessageMenu(null);
  };

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    setShowMessageMenu(null);
  };

  // Empty state - No contact selected
  if (!selectedContact) {
    return (
      <div className="relative h-dvh flex flex-col items-center justify-center md:border-r border-background-400 text-text-600 gap-4">
        <button
          onClick={() => setShowContacts(!showContacts)}
          className="absolute top-4 left-4 md:hidden bg-primary-200 p-1.5 rounded-lg"
        >
          <PanelLeftOpen size={22} />
        </button>
        <div className="relative h-32 w-32 opacity-90">
          <Image
            src="/logo/nexus-logo.png"
            alt="Nexus Logo"
            fill
            priority
            sizes="128px"
            className="object-contain"
          />
        </div>
        <div className="text-center space-y-1">
          <h2 className="text-4xl font-semibold text-text-800">
            Welcome to Nexus
          </h2>
          <p className="text-sm text-text-500">
            Select a contact to start a conversation
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-dvh flex flex-col justify-between border-r border-background-400">
      {/* Header */}
      <div
        id="profile-top-bar"
        className="border-b border-background-400 p-4 flex items-center gap-3"
      >
        <button
          onClick={() => setShowContacts(!showContacts)}
          className="md:hidden bg-primary-200 p-1.5 rounded-lg"
        >
          <PanelLeftOpen size={22} />
        </button>
        <div className="relative w-10 h-10 shrink-0 overflow-hidden rounded-full">
          <Image
            src={selectedContact.profile_pic}
            alt={`${selectedContact.first_name} ${selectedContact.last_name}`}
            fill
            className="object-cover"
            sizes="40px"
          />
        </div>
        <div>
          <p className="font-medium">
            {selectedContact.first_name} {selectedContact.last_name}
          </p>
          <p className="text-xs text-text-600">{selectedContact.contact}</p>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div id="chat" className="flex flex-col flex-1 justify-end min-h-0">
        <div
          id="chat-ui"
          className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-background-300 scrollbar-track-transparent"
        >
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full text-text-500 text-sm">
              No messages yet. Start a conversation!
            </div>
          )}

          {messages.map((message) => {
            const isCurrentUser = message.sender.id === currentUser.id;

            return (
              <div
                key={message.id}
                className={`flex ${
                  isCurrentUser ? "justify-end" : "justify-start"
                }`}
              >
                <div className="flex flex-col max-w-[75%]">
                  {/* Show sender name for received messages */}
                  {!isCurrentUser && (
                    <span className="text-xs text-text-500 ml-1 mb-1">
                      {message.sender.firstName} {message.sender.lastName}
                    </span>
                  )}
                  <div
                    className={`relative rounded-2xl px-4 py-2 text-sm wrap-break-word group ${
                      isCurrentUser
                        ? "bg-primary-200 text-text-800 rounded-br-md"
                        : "bg-neutral-900 text-white rounded-bl-md"
                    }`}
                  >
                    {/* Chevron button */}
                    <button
                      className="absolute top-1.25 right-1 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-black/10 cursor-pointer z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowMessageMenu(
                          showMessageMenu === message.id ? null : message.id
                        );
                      }}
                    >
                      <ChevronDown size={16} />
                    </button>

                    {/* Message content */}
                    <p className="pr-4">{message.content}</p>

                    {/* Dropdown menu */}
                    {showMessageMenu === message.id && (
                      <div 
                        className="absolute top-6 right-0 mt-1 bg-primary-100 rounded-lg shadow-lg p-2 z-20 min-w-35"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          className="w-full flex items-center gap-x-2 text-left p-2 rounded-lg text-sm text-text-800 hover:bg-background-100 cursor-pointer"
                          onClick={() => handleCopyMessage(message.content)}
                        >
                          <BookCopy size={16} /><p>Copy Message</p>
                        </button>
                        {isCurrentUser && (
                          <button
                            className="w-full flex items-center gap-x-2 text-left p-2 rounded-lg text-sm text-red-500 hover:bg-red-500/20 cursor-pointer"
                            onClick={() => handleDeleteMessage(message.id)}
                          >
                            <Trash2 size={16} /><p>Delete Message</p>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  <div
                    className={`flex items-center gap-1 mt-1 ${
                      isCurrentUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <span className="text-xs text-text-500">
                      {formatTime(message.createdAt)}
                    </span>
                    {isCurrentUser && message.isRead && (
                      <span className="text-xs text-primary-400">Read</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>

        {/* Message Input */}
        <form
          className="bg-secondary-100 mb-2 mx-2 rounded-2xl flex items-center justify-between gap-x-2"
          onSubmit={handleSendMessage}
        >
          <textarea
            ref={textareaRef}
            name="message"
            id="message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder={`Message ${selectedContact.first_name}...`}
            className="w-full text-sm text-wrap focus:outline-none p-3 resize-none overflow-y-auto bg-transparent"
          />
          <button
            title="Send"
            type="submit"
            disabled={!newMessage.trim()}
            className="relative right-2 bg-primary-200 p-2 rounded-full transition-all duration-100 hover:bg-primary-300/80 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SendHorizontal size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
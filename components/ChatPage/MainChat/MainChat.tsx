"use client";

import { Contact, ChatMessage, User } from "@/app/types/types";
import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import EmptyState from "./EmptyState";
import ConfirmationDialog from "@/components/shared/ConfirmationDialog";

type MainChatProps = {
  selectedContact: Contact | null;
  showContacts: boolean;
  setShowContacts: React.Dispatch<React.SetStateAction<boolean>>;
  onAvatarClick?: () => void;
};

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
  onAvatarClick,
}: MainChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize messages when contact changes
  useEffect(() => {
    if (selectedContact) {
      setIsLoading(true);
      
      // Simulate loading delay for smoother transition
      const timeoutId = setTimeout(() => {
        const contactAsUser: User = {
          id: selectedContact.id,
          firstName: selectedContact.first_name,
          lastName: selectedContact.last_name,
          contact: selectedContact.contact,
          profilePic: selectedContact.profile_pic,
        };

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
        setIsLoading(false);
      }, 200);

      return () => clearTimeout(timeoutId);
    } else {
      setMessages([]);
      setIsLoading(false);
    }
  }, [selectedContact?.id]);

  // Handle send message
  const handleSendMessage = useCallback(
    async (content: string) => {
      if (!selectedContact) return;

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 100));

      const message: ChatMessage = {
        id: Date.now(),
        sender: currentUser,
        content,
        createdAt: new Date(),
        isRead: false,
      };

      setMessages((prev) => [...prev, message]);
    },
    [selectedContact]
  );

  // Handle delete message (shows confirmation)
  const handleDeleteRequest = useCallback((messageId: number) => {
    setSelectedMessage(messageId);
    setShowDeleteDialog(true);
  }, []);

  // Confirm delete
  const handleDeleteConfirm = useCallback(() => {
    if (selectedMessage !== null) {
      setMessages((prev) => prev.filter((msg) => msg.id !== selectedMessage));
      setShowDeleteDialog(false);
      setSelectedMessage(null);
    }
  }, [selectedMessage]);

  // Handle copy message
  const handleCopyMessage = useCallback(async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, []);

  return (
    <>
      <AnimatePresence>
        {!selectedContact ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-dvh"
          >
            <EmptyState
              showContacts={showContacts}
              setShowContacts={setShowContacts}
            />
          </motion.div>
        ) : (
          <motion.div
            key={selectedContact.id}
            initial={{ opacity: 0, x: 5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -5 }}
            transition={{ duration: 0.15, ease: "easeIn" }}
            className="h-dvh flex flex-col justify-between border-r border-background-300"
          >
            <ChatHeader
              selectedContact={selectedContact}
              showContacts={showContacts}
              setShowContacts={setShowContacts}
              onAvatarClick={onAvatarClick}
            />

            <div id="chat" className="flex flex-col flex-1 justify-end min-h-0">
              {isLoading ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-primary-300 border-t-primary-600 rounded-full animate-spin" />
                </div>
              ) : (
                <>
                  <MessageList
                    messages={messages}
                    currentUserId={currentUser.id}
                    onDeleteMessage={handleDeleteRequest}
                    onCopyMessage={handleCopyMessage}
                  />

                  <MessageInput
                    onSendMessage={handleSendMessage}
                    placeholder={`Message ${selectedContact.first_name}...`}
                  />
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ConfirmationDialog
        isOpen={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        title="Delete Message"
        description="Are you sure you want to delete this message? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        onConfirm={handleDeleteConfirm}
        onCancel={() => {
          setShowDeleteDialog(false);
          setSelectedMessage(null);
        }}
      />
    </>
  );
}
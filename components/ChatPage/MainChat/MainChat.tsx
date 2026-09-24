"use client";

import { Contact, ChatMessage, User } from "@/app/types/types";
import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import EmptyState from "./EmptyState";
import ConfirmationDialog from "@/components/shared/ConfirmationDialog";
import Skeleton from "@/components/SharedComponents/Skeleton";

type MainChatProps = {
  selectedContact: Contact | null;
  isContactsPending?: boolean;
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
  isContactsPending = false,
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
        {!selectedContact && isContactsPending ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-dvh flex flex-col gap-6 border-r border-background-300 p-4 sm:p-6"
            role="status"
            aria-label="Loading conversations"
            aria-busy="true"
          >
            <div className="flex items-center gap-3 border-b border-background-200 pb-4">
              <Skeleton variant="circle" width={40} height={40} />
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton width="42%" />
                <Skeleton width="26%" height={12} />
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-end gap-4 py-4">
              <Skeleton variant="rounded" width="66%" height={48} />
              <Skeleton
                variant="rounded"
                width="56%"
                height={48}
                className="self-end"
              />
              <Skeleton variant="rounded" width="62%" height={48} />
            </div>
            <Skeleton variant="rounded" height={48} />
          </motion.div>
        ) : !selectedContact ? (
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
                <div
                  className="flex flex-1 flex-col justify-end gap-4 p-4"
                  role="status"
                  aria-label="Loading messages"
                  aria-busy="true"
                >
                  <Skeleton variant="rounded" width="68%" height={52} />
                  <Skeleton
                    variant="rounded"
                    width="54%"
                    height={48}
                    className="self-end"
                  />
                  <Skeleton variant="rounded" width="60%" height={48} />
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

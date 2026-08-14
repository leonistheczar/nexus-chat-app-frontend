"use client";

import { Contact, ChatMessage, User } from "@/app/types/types";
import { useState, useEffect, useCallback } from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import EmptyState from "./EmptyState";
import ConfirmationDialog from "@/components/shared/ConfirmationDialog";

type MainChatProps = {
  selectedContact: Contact | null;
  showContacts: boolean;
  setShowContacts: React.Dispatch<React.SetStateAction<boolean>>;
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
}: MainChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);

  // Initialize messages when contact changes
  useEffect(() => {
    if (selectedContact) {
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
    } else {
      setMessages([]);
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

  if (!selectedContact) {
    return (
      <EmptyState
        showContacts={showContacts}
        setShowContacts={setShowContacts}
      />
    );
  }

  return (
    <>
      <div className="h-dvh flex flex-col justify-between border-r border-background-300">
        <ChatHeader
          selectedContact={selectedContact}
          showContacts={showContacts}
          setShowContacts={setShowContacts}
        />

        <div id="chat" className="flex flex-col flex-1 justify-end min-h-0">
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
        </div>
      </div>

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
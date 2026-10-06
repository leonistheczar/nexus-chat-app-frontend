import api from "@/lib/baseApi";

export type SelfChatAttachment = {
  id: string;
  messageId: string;
  mediaType: string;
  originalFileName: string;
  sizeBytes: number;
  createdAt: string;
};

export type SelfChatMessage = {
  id: string;
  body: string;
  createdAt: string;
  editedAt: string | null;
  attachments: SelfChatAttachment[];
};

export type SelfChatMessagesPage = {
  data: SelfChatMessage[];
  nextCursor: string | null;
};

export async function fetchSelfChatMessages(
  token: string,
  before?: string,
): Promise<SelfChatMessagesPage> {
  const { data } = await api.get<SelfChatMessagesPage>("/self-chat/messages", {
    params: { limit: 50, ...(before ? { before } : {}) },
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

export async function createSelfChatMessage(token: string, body: string) {
  const { data } = await api.post<{ data: Omit<SelfChatMessage, "editedAt" | "attachments"> }>(
    "/self-chat/messages",
    { body },
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return data.data;
}

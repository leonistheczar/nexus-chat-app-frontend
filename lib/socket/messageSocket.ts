import type { Socket } from "socket.io-client";

export const socketEvents = {
  joinConversation: "conversation:join",
  leaveConversation: "conversation:leave",
  getMessageHistory: "messages:history",
  sendTextMessage: "messages:send",
  messageCreated: "messages:created",
} as const;

export type TextMessageEvent = {
  id: string;
  conversationId: string;
  senderId: string;
  body: string;
  createdAt: string;
  editedAt: string | null;
};

export type MessageHistoryResult = {
  data: TextMessageEvent[];
  nextCursor: string | null;
};

export type SocketAck<T> =
  | { ok: true; data: T }
  | { ok: false; error: { code: string; message: string } };

export class MessageSocketError extends Error {
  constructor(
    readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = "MessageSocketError";
  }
}

export function requestSocketAck<T>(
  socket: Socket,
  event: string,
  payload: unknown,
): Promise<T> {
  return new Promise((resolve, reject) => {
    if (!socket.connected) {
      reject(new MessageSocketError("DISCONNECTED", "Reconnecting to chat… Please try again."));
      return;
    }

    socket.timeout(10_000).emit(
      event,
      payload,
      (timeoutError: Error | null, result: SocketAck<T>) => {
        if (timeoutError) {
          reject(new MessageSocketError("ACK_TIMEOUT", "The server did not confirm this request. Retry it to safely check the result."));
        } else if (!result?.ok) {
          reject(
            new MessageSocketError(
              result?.error.code ?? "UNKNOWN_ERROR",
              result?.error.message ?? "The request could not be completed.",
            ),
          );
        } else {
          resolve(result.data);
        }
      },
    );
  });
}

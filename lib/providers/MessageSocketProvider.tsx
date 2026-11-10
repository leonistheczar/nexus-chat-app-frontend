"use client";

import { useAuth } from "@clerk/nextjs";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { io, type Socket } from "socket.io-client";

type MessageSocketContextValue = {
  socket: Socket | null;
  connected: boolean;
  connectionError: string | null;
};

const MessageSocketContext = createContext<MessageSocketContextValue>({
  socket: null,
  connected: false,
  connectionError: null,
});

function getSocketUrl(): string {
  const configuredUrl = process.env.NEXT_PUBLIC_SOCKET_URL;
  const apiUrl = process.env.NEXT_PUBLIC_DEVELOPMENT_BASE_URL;
  const backendUrl = configuredUrl || apiUrl;
  if (!backendUrl) {
    throw new Error("Set NEXT_PUBLIC_SOCKET_URL to the backend origin.");
  }
  const url = new URL(backendUrl);

  if (process.env.NODE_ENV === "production" && url.protocol !== "https:") {
    throw new Error("NEXT_PUBLIC_SOCKET_URL must use HTTPS in production.");
  }

  return url.origin;
}

export function MessageSocketProvider({ children }: { children: React.ReactNode }) {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    let active = true;
    const client = io(getSocketUrl(), {
      autoConnect: false,
      withCredentials: true,
      auth: async (callback) => {
        try {
          const sessionToken = await getToken();
          callback({ sessionToken });
        } catch {
          callback({ sessionToken: null });
        }
      },
    });

    const onConnect = () => {
      if (!active) return;
      setConnected(true);
      setConnectionError(null);
    };
    const onDisconnect = (reason: string) => {
      if (!active) return;
      setConnected(false);

      // Socket.IO reconnects after transport failures, but not after an
      // explicit server disconnect. The backend uses that disconnect when
      // the authenticated token expires, so reconnect to run the auth callback
      // again and obtain a fresh Clerk session token.
      if (reason === "io server disconnect") {
        client.connect();
      }
    };
    const onConnectError = (error: Error) => {
      if (!active) return;
      setConnected(false);
      setConnectionError(
        error.message === "Unauthorized"
          ? "Your chat session could not be verified. Refresh your session and try again."
          : "Chat connection unavailable. Reconnecting…",
      );
    };

    client.on("connect", onConnect);
    client.on("disconnect", onDisconnect);
    client.on("connect_error", onConnectError);
    setSocket(client);
    client.connect();

    return () => {
      active = false;
      client.off("connect", onConnect);
      client.off("disconnect", onDisconnect);
      client.off("connect_error", onConnectError);
      client.disconnect();
      setSocket(null);
      setConnected(false);
      setConnectionError(null);
    };
  }, [getToken, isLoaded, isSignedIn]);

  const value = useMemo(
    () => ({ socket, connected, connectionError }),
    [socket, connected, connectionError],
  );

  return <MessageSocketContext.Provider value={value}>{children}</MessageSocketContext.Provider>;
}

export function useMessageSocket() {
  return useContext(MessageSocketContext);
}

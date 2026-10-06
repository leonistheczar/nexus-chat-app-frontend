"use client";

import { useAuth } from "@clerk/nextjs";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchSelfChatMessages } from "@/lib/selfChat";

export const selfChatMessagesKey = ["self-chat", "messages"] as const;

export default function useSelfChatMessages(enabled: boolean) {
  const { getToken } = useAuth();

  return useInfiniteQuery({
    queryKey: selfChatMessagesKey,
    queryFn: async ({ pageParam }) => {
      const token = await getToken();
      if (!token) throw new Error("Your session has expired. Please sign in again.");
      return fetchSelfChatMessages(token, pageParam);
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled,
    staleTime: 30_000,
  });
}

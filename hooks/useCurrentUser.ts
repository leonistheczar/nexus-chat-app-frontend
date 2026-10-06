"use client";

import { getCurrentUser } from "@/api/auth";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

export const currentUserQueryKey = (userId: string | null | undefined) => [
  "current-user",
  userId,
] as const;

export default function useCurrentUser() {
  const { getToken, isLoaded, isSignedIn, userId } = useAuth();

  return useQuery({
    queryKey: currentUserQueryKey(userId),
    queryFn: async () => {
      const token = await getToken();
      if (!token) throw new Error("Your session has expired. Please sign in again.");
      return getCurrentUser(token);
    },
    enabled: isLoaded && isSignedIn,
    staleTime: 5 * 60 * 1000,
  });
}

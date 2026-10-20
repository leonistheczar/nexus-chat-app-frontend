"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  LoaderCircle,
  Search,
  Send,
  UserPlus,
  X,
} from "lucide-react";
import axios from "axios";
import { useDebounce } from "use-debounce";
import { useChatContacts } from "@/lib/providers/ChatUIProvider";
import { useClickOutside } from "@/hooks/useClickOutside";
import { lockBodyScroll } from "@/lib/bodyScrollLock";
import {
  cancelContactRequest,
  createContactRequest,
  fetchSentContactRequests,
  searchUsersByUsername,
  type ContactRequestsPage,
  type UserSearchProfile,
} from "@/lib/contactRequests";

const sentContactRequestKeys = ["contact-requests", "sent"] as const;
const userSearchKeys = ["user-search"] as const;
const usernamePattern = /^[a-zA-Z0-9_]{2,20}$/;
type SentContactRequest = ContactRequestsPage["data"][number];

function getRequestErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message.includes("session has expired")) {
    return "Your session may have expired. Please sign in again.";
  }
  if (!axios.isAxiosError(error)) {
    return "We couldn't send the request. Check your connection and try again.";
  }

  const status = error.response?.status;
  const response = error.response?.data as
    | { message?: unknown; data?: { direction?: unknown } | null }
    | undefined;

  if (status === 400) return "This username is not valid.";
  if (status === 401 || status === 403) return "Your session may have expired. Please sign in again.";
  if (status === 404) return "This profile is no longer available.";
  if (status === 409) {
    if (response?.message === "Already a contact") return "You're already connected with this user.";
    if (response?.data?.direction === "received") {
      return "This user already sent you a request. Open Notifications to respond.";
    }
    return "A request to this user is already pending.";
  }
  if (typeof response?.message === "string") return response.message;
  return "We couldn't send the request. Check your connection and try again.";
}

function getSearchErrorMessage(error: unknown): string {
  if (!axios.isAxiosError(error)) {
    return "We couldn't search profiles. Check your connection and try again.";
  }
  if (error.response?.status === 401 || error.response?.status === 403) {
    return "Your session may have expired. Please sign in again.";
  }
  if (error.response?.status === 404) {
    return "Your Nexus profile is not active, so profiles can't be searched.";
  }
  return "We couldn't search profiles. Please try again.";
}

function getCancelErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message.includes("session has expired")) {
    return "Your session may have expired. Please sign in again.";
  }
  if (!axios.isAxiosError(error)) {
    return "We couldn't cancel the request. Check your connection and try again.";
  }
  if (error.response?.status === 401 || error.response?.status === 403) {
    return "Your session may have expired. Please sign in again.";
  }
  if (error.response?.status === 409) {
    return "This request is no longer pending. Search again to refresh its status.";
  }
  return "We couldn't cancel the request. Please try again.";
}

export default function NewUser() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const { openNewUser, setOpenNewUser } = useChatContacts();
  const [username, setUsername] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const normalizedUsername = username.trim().toLowerCase();
  const [debouncedUsername] = useDebounce(normalizedUsername, 150);
  const isValidSearch = usernamePattern.test(normalizedUsername);
  const isSearchReady = isValidSearch && normalizedUsername === debouncedUsername;

  const searchQuery = useQuery({
    queryKey: [...userSearchKeys, debouncedUsername],
    enabled: openNewUser && isSearchReady,
    staleTime: 30_000,
    queryFn: async ({ signal }) => {
      const token = await getToken();
      if (!token) throw new Error("Your session has expired. Please sign in again.");
      return searchUsersByUsername(token, debouncedUsername, signal);
    },
  });

  const sentRequestsQuery = useQuery({
    queryKey: sentContactRequestKeys,
    enabled: openNewUser && isValidSearch,
    staleTime: 30_000,
    queryFn: async ({ signal }) => {
      const token = await getToken();
      if (!token) throw new Error("Your session has expired. Please sign in again.");

      const requests: ContactRequestsPage["data"] = [];
      let before: string | undefined;
      do {
        const page = await fetchSentContactRequests(token, before, signal);
        requests.push(...page.data);
        const nextCursor = page.nextCursor;
        if (!nextCursor || nextCursor === before) break;
        before = nextCursor;
      } while (before);

      return requests;
    },
  });

  const sendRequest = useMutation({
    mutationFn: async (profile: UserSearchProfile) => {
      const token = await getToken();
      if (!token) throw new Error("Your session has expired. Please sign in again.");
      return createContactRequest(token, profile.username);
    },
    onMutate: async (profile) => {
      await queryClient.cancelQueries({ queryKey: sentContactRequestKeys });
      const previous = queryClient.getQueryData<SentContactRequest[]>(sentContactRequestKeys);
      if (previous) {
        queryClient.setQueryData<SentContactRequest[]>(sentContactRequestKeys, [
          {
            id: `optimistic-${profile.id}`,
            status: "pending",
            createdAt: new Date().toISOString(),
            user: {
              id: profile.id,
              username: profile.username,
              displayName: profile.displayName,
              avatarUrl: profile.avatarUrl,
            },
          },
          ...previous,
        ]);
      }
      return { previous };
    },
    onError: (_error, _profile, context) => {
      if (context) {
        queryClient.setQueryData(sentContactRequestKeys, context.previous);
      }
    },
    onSuccess: (createdRequest, profile) => {
      queryClient.setQueryData<SentContactRequest[]>(sentContactRequestKeys, (current) => {
        if (!current) return current;
        return current.map((request) =>
          request.id === `optimistic-${profile.id}`
            ? {
                id: createdRequest.id,
                status: "pending",
                createdAt: createdRequest.createdAt,
                user: {
                  id: profile.id,
                  username: profile.username,
                  displayName: profile.displayName,
                  avatarUrl: profile.avatarUrl,
                },
              }
            : request,
        );
      });
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: sentContactRequestKeys });
    },
  });

  const cancelRequest = useMutation({
    mutationFn: async ({ requestId }: { requestId: string; profileId: string }) => {
      const token = await getToken();
      if (!token) throw new Error("Your session has expired. Please sign in again.");
      return cancelContactRequest(token, requestId);
    },
    onMutate: async ({ requestId }) => {
      await queryClient.cancelQueries({ queryKey: sentContactRequestKeys });
      const previous = queryClient.getQueryData<SentContactRequest[]>(sentContactRequestKeys);
      queryClient.setQueryData<SentContactRequest[]>(sentContactRequestKeys, (current) =>
        current?.filter((request) => request.id !== requestId),
      );
      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context) {
        queryClient.setQueryData(sentContactRequestKeys, context.previous);
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: sentContactRequestKeys });
    },
  });

  const handleReset = () => {
    setUsername("");
    sendRequest.reset();
    cancelRequest.reset();
    setOpenNewUser(false);
  };

  const newUserModalRef = useClickOutside<HTMLDivElement>({
    enabled: openNewUser,
    onOutsideClick: handleReset,
    onEscape: handleReset,
  });

  useEffect(() => {
    if (!openNewUser) return;
    const timeoutId = window.setTimeout(() => searchInputRef.current?.focus(), 100);
    return () => window.clearTimeout(timeoutId);
  }, [openNewUser]);

  useEffect(() => {
    if (!openNewUser) return;
    return lockBodyScroll();
  }, [openNewUser]);

  const requestError = sendRequest.error
    ? getRequestErrorMessage(sendRequest.error)
    : cancelRequest.error
      ? getCancelErrorMessage(cancelRequest.error)
    : null;
  const searchError = searchQuery.error
    ? getSearchErrorMessage(searchQuery.error)
    : null;
  const profiles = searchQuery.data ?? [];
  const sentRequests = sentRequestsQuery.data ?? [];
  const isWaitingForSearch = isValidSearch && !isSearchReady;
  const isSearching = isWaitingForSearch || (isSearchReady && searchQuery.isFetching);

  return (
    <AnimatePresence>
      {openNewUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div
            ref={newUserModalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-contact-title"
            className="relative z-10 flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-background-200 bg-primary-100 shadow-2xl"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <header className="flex shrink-0 items-center justify-between border-b border-background-200 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary-200/50 p-2 text-primary-700">
                  <UserPlus size={20} aria-hidden="true" />
                </div>
                <div>
                  <h2 id="add-contact-title" className="text-lg font-semibold leading-tight text-text-800">
                    Add New Contact
                  </h2>
                  <p className="text-xs leading-tight text-text-600">Search profiles by username</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleReset}
                aria-label="Close add contact"
                className="rounded-lg p-1.5 text-text-600 transition-colors cursor-pointer hover:bg-background-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              >
                <X size={20} />
              </button>
            </header>

            <div className="shrink-0 border-b border-background-200 p-4">
              <label htmlFor="contact-username" className="mb-1.5 block text-sm font-medium text-text-700">
                Nexus username
              </label>
              <div className="flex items-center rounded-lg border border-background-300 bg-primary-200/40 px-3 focus-within:ring-2 focus-within:ring-primary-300">
                <span className="mr-2 text-sm text-text-500" aria-hidden="true">@</span>
                <input
                  ref={searchInputRef}
                  id="contact-username"
                  name="username"
                  type="text"
                  autoComplete="off"
                  maxLength={20}
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value);
                    if (sendRequest.isError) sendRequest.reset();
                    if (cancelRequest.isError) cancelRequest.reset();
                  }}
                  placeholder="Type a username"
                  aria-describedby="contact-username-help"
                  className="w-full bg-transparent py-2.5 text-sm text-text-800 outline-none placeholder:text-text-500"
                />
                {isSearching && <LoaderCircle size={16} className="animate-spin text-text-500" aria-label="Searching profiles" />}
              </div>
              <p id="contact-username-help" className="mt-1.5 text-xs text-text-600">
                Type at least 2 letters, numbers, or underscores to find profiles.
              </p>
            </div>

            <section className="min-h-44 flex-1 overflow-y-auto p-3" aria-label="Matching profiles" aria-live="polite">
              {requestError ? (
                <div className="mb-3 flex items-start gap-2 rounded-lg border border-red-300/70 bg-red-50 p-3 text-sm text-red-700" role="alert">
                  <AlertCircle size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <p>{requestError}</p>
                </div>
              ) : null}

              {searchError ? (
                <div className="flex items-start gap-2 rounded-lg border border-red-300/70 bg-red-50 p-3 text-sm text-red-700" role="alert">
                  <AlertCircle size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <p>{searchError}</p>
                </div>
              ) : !normalizedUsername ? (
                <div className="flex h-full min-h-36 flex-col items-center justify-center text-center">
                  <div className="grid size-12 place-items-center rounded-full bg-primary-200/40 text-primary-700">
                    <Search size={21} aria-hidden="true" />
                  </div>
                  <p className="mt-3 text-sm font-medium text-text-700">Find someone on Nexus</p>
                  <p className="mt-1 text-xs text-text-600">Matching profiles will appear here.</p>
                </div>
              ) : !isValidSearch ? (
                <p className="px-2 py-8 text-center text-sm text-text-600" role="status">
                  Enter at least 2 letters, numbers, or underscores to search.
                </p>
              ) : isSearching ? (
                <p className="px-2 py-8 text-center text-sm text-text-600" role="status">Searching profiles...</p>
              ) : sentRequestsQuery.isError ? (
                <div className="flex items-start gap-2 rounded-lg border border-red-300/70 bg-red-50 p-3 text-sm text-red-700" role="alert">
                  <AlertCircle size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <p>We couldn&apos;t check your pending requests. Please search again.</p>
                </div>
              ) : profiles.length === 0 ? (
                <div className="flex min-h-36 flex-col items-center justify-center text-center">
                  <p className="text-sm font-medium text-text-700">No matching profiles</p>
                  <p className="mt-1 text-xs text-text-600">Try another username.</p>
                </div>
              ) : (
                <ul className="space-y-1">
                  {profiles.map((profile) => {
                    const pendingRequest = sentRequests.find(
                      (request) => request.user?.id === profile.id,
                    );
                    const isCheckingRequest = sentRequestsQuery.isPending && !sentRequestsQuery.data;
                    const isSending = sendRequest.isPending && sendRequest.variables.id === profile.id;
                    const isCanceling = cancelRequest.isPending && cancelRequest.variables.profileId === profile.id;
                    const hasPendingRequest = Boolean(pendingRequest) || isCanceling;
                    const initials = profile.displayName
                      .split(/\s+/)
                      .filter(Boolean)
                      .slice(0, 2)
                      .map((part) => part[0]?.toUpperCase())
                      .join("");

                    return (
                      <li key={profile.id} className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-primary-200/40">
                        <div className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-full bg-primary-200 text-sm font-semibold text-primary-700">
                          {profile.avatarUrl ? (
                            <Image
                              src={profile.avatarUrl}
                              alt=""
                              width={40}
                              height={40}
                              unoptimized
                              className="size-10 object-cover"
                            />
                          ) : initials || <UserPlus size={17} aria-hidden="true" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-text-800">{profile.displayName}</p>
                          <p className="truncate text-xs text-text-600">@{profile.username}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            if (pendingRequest) {
                              cancelRequest.mutate({ requestId: pendingRequest.id, profileId: profile.id });
                            } else {
                              sendRequest.mutate(profile);
                            }
                          }}
                          disabled={sendRequest.isPending || cancelRequest.isPending || isCheckingRequest}
                          aria-label={isCheckingRequest ? `Checking request status for ${profile.displayName}` : hasPendingRequest ? `Cancel contact request to ${profile.displayName}` : `Send contact request to ${profile.displayName}`}
                          className={`inline-flex shrink-0 items-center gap-1.5 cursor-pointer rounded-lg px-3 py-2 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:cursor-not-allowed disabled:opacity-60 ${hasPendingRequest ? "bg-background-200 text-text-700 hover:bg-background-300" : "bg-primary-500 text-white hover:bg-primary-600"}`}
                        >
                          {isCheckingRequest ? (
                            <><LoaderCircle size={14} className="animate-spin" aria-hidden="true" /> Checking</>
                          ) : isSending ? (
                            <><LoaderCircle size={14} className="animate-spin" aria-hidden="true" /> Sending</>
                          ) : isCanceling ? (
                            <><LoaderCircle size={14} className="animate-spin" aria-hidden="true" /> Canceling</>
                          ) : pendingRequest ? (
                            <><X size={14} aria-hidden="true" /> Cancel request</>
                          ) : (
                            <><Send size={13} aria-hidden="true" /> Send request</>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>

            <footer className="flex shrink-0 justify-end border-t border-background-200 p-4">
              <button
                type="button"
                onClick={handleReset}
                className="rounded-lg bg-text-200 px-4 py-2.5 text-sm cursor-pointer font-medium text-text-700 transition-colors hover:bg-background-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              >
                Close
              </button>
            </footer>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

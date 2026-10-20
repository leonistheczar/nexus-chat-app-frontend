"use client";

import { useAuth } from "@clerk/nextjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, X } from "lucide-react";
import axios from "axios";
import { useEffect, useMemo } from "react";
import { lockBodyScroll } from "@/lib/bodyScrollLock";
import {
  fetchIncomingContactRequests,
  respondToContactRequest,
} from "@/lib/contactRequests";
import NotificationSummary from "./NotificationSummary";
import RecentActivity from "./RecentActivity";
import { getActionError } from "./notificationUtils";

const incomingRequestsKey = ["contact-requests", "received"] as const;

type RequestAction = "accept" | "reject";

export default function NotificationsOverview({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const requestsQuery = useQuery({
    queryKey: incomingRequestsKey,
    enabled: open,
    queryFn: async () => {
      const token = await getToken();
      if (!token) throw new Error("Your session has expired. Please sign in again.");
      return fetchIncomingContactRequests(token);
    },
    staleTime: 30_000,
    retry: 1,
  });

  const respondMutation = useMutation({
    mutationFn: async ({ requestId, action }: { requestId: string; action: RequestAction }) => {
      const token = await getToken();
      if (!token) throw new Error("Your session has expired. Please sign in again.");
      await respondToContactRequest(token, requestId, action);
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: incomingRequestsKey }),
        queryClient.invalidateQueries({ queryKey: ["contacts"] }),
      ]);
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        void queryClient.invalidateQueries({ queryKey: incomingRequestsKey });
      }
    },
  });

  useEffect(() => {
    if (!open) return;
    const unlockScroll = lockBodyScroll();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      unlockScroll();
    };
  }, [open, onClose]);

  const requests = useMemo(
    () =>
      [...(requestsQuery.data?.data ?? [])].sort(
        (first, second) =>
          new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime(),
      ),
    [requestsQuery.data?.data],
  );
  const pendingCount = requestsQuery.data?.nextCursor
    ? "50+"
    : String(requests.length);
  const countLabel = requestsQuery.isPending
    ? "Loading"
    : requestsQuery.isError
      ? "-"
      : `${pendingCount} pending`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/45 p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="notifications-title"
            className="my-auto flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-background-200 bg-background-100 shadow-2xl"
            initial={{ opacity: 0, y: 12, scale: 0.7 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.7 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
          >
            <header className="flex shrink-0 items-start justify-between gap-4 border-b border-background-200 px-4 py-4 sm:px-6">
              <div className="flex items-start gap-3">
                <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-200/40 text-primary-700">
                  <Bell size={19} aria-hidden="true" />
                </div>
                <div>
                  <h2 id="notifications-title" className="text-lg font-semibold text-text-800">
                    Notifications
                  </h2>
                  <p className="mt-0.5 text-xs text-text-600">Your activity at a glance</p>
                </div>
              </div>
              <button
                type="button"
                autoFocus
                onClick={onClose}
                aria-label="Close notifications"
                className="rounded-lg p-2 text-text-600 transition-colors cursor-pointer hover:bg-background-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              >
                <X size={18} />
              </button>
            </header>

            <div className="overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
              <NotificationSummary
                pendingCount={pendingCount}
                isLoading={requestsQuery.isPending}
                isError={requestsQuery.isError}
              />
              <RecentActivity
                requests={requests}
                isLoading={requestsQuery.isPending}
                isError={requestsQuery.isError}
                isWorking={respondMutation.isPending}
                errorMessage={
                  respondMutation.error
                    ? getActionError(respondMutation.error)
                    : null
                }
                countLabel={countLabel}
                onRespond={(requestId, action) => {
                  respondMutation.mutate({ requestId, action });
                }}
                onRetry={() => void requestsQuery.refetch()}
              />
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

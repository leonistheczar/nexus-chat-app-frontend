"use client";

import { Clock3, Inbox } from "lucide-react";
import { IncomingContactRequest } from "@/lib/contactRequests";
import { ActivityGroup, groupRequestsByDate } from "./notificationUtils";
import NotificationRequestItem from "./NotificationRequestItem";

function ActivityGroupList({
  group,
  isWorking,
  onRespond,
}: {
  group: ActivityGroup;
  isWorking: boolean;
  onRespond: (requestId: string, action: "accept" | "reject") => void;
}) {
  return (
    <section aria-label={`${group.title} notifications`}>
      <h4 className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-text-600">
        {group.title === "Today" && <Clock3 size={12} aria-hidden="true" />}
        {group.title}
      </h4>
      <ul className="space-y-2">
        {group.requests.map((request) => (
          <NotificationRequestItem
            key={request.id}
            request={request}
            isWorking={isWorking}
            onRespond={onRespond}
          />
        ))}
      </ul>
    </section>
  );
}

export default function RecentActivity({
  requests,
  isLoading,
  isError,
  isWorking,
  errorMessage,
  countLabel,
  onRespond,
  onRetry,
}: {
  requests: IncomingContactRequest[];
  isLoading: boolean;
  isError: boolean;
  isWorking: boolean;
  errorMessage: string | null;
  countLabel: string;
  onRespond: (requestId: string, action: "accept" | "reject") => void;
  onRetry: () => void;
}) {
  const groups = groupRequestsByDate(requests);

  return (
    <section className="mt-6" aria-labelledby="recent-activity-title">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <h3 id="recent-activity-title" className="text-sm font-semibold text-text-800">
            Recent activity
          </h3>
          <p className="mt-0.5 text-xs text-text-600">Latest incoming contact requests</p>
        </div>
        <span className="rounded-full bg-primary-200/35 px-2.5 py-1 text-[11px] font-medium text-text-700">
          {countLabel}
        </span>
      </div>

      {errorMessage && (
        <p className="mb-3 rounded-lg border border-red-300/70 bg-red-50 px-3 py-2 text-xs text-red-700" role="alert">
          {errorMessage}
        </p>
      )}

      {isLoading ? (
        <div className="space-y-2" role="status" aria-label="Loading notifications">
          {[0, 1, 2].map((item) => (
            <div key={item} className="flex animate-pulse items-center gap-3 rounded-xl border border-background-200 p-3">
              <div className="size-10 rounded-full bg-background-200" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-2/3 rounded bg-background-200" />
                <div className="h-2.5 w-1/3 rounded bg-background-200" />
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-xl border border-background-200 px-4 py-8 text-center">
          <p className="text-sm font-medium text-text-800">Notifications couldn&apos;t load</p>
          <p className="mt-1 text-xs text-text-600">Check your connection and try again.</p>
          <button
            type="button"
            onClick={onRetry}
            className="mt-3 rounded-lg border border-background-300 px-3 py-1.5 text-xs font-medium text-text-700 hover:bg-background-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          >
            Try again
          </button>
        </div>
      ) : requests.length === 0 ? (
        <div className="rounded-xl border border-dashed border-background-300 px-4 py-8 text-center">
          <div className="mx-auto grid size-10 place-items-center rounded-full bg-primary-200/30 text-primary-700">
            <Inbox size={19} aria-hidden="true" />
          </div>
          <p className="mt-3 text-sm font-medium text-text-800">You&apos;re all caught up</p>
          <p className="mt-1 text-xs text-text-600">New contact requests will show up here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {groups.map((group) => (
            <ActivityGroupList
              key={group.title}
              group={group}
              isWorking={isWorking}
              onRespond={onRespond}
            />
          ))}
        </div>
      )}
    </section>
  );
}

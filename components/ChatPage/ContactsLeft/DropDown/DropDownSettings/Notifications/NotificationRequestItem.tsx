"use client";

import Image from "next/image";
import { Check, ContactRound, LoaderCircle, X } from "lucide-react";
import { IncomingContactRequest } from "@/lib/contactRequests";
import { formatRelativeTime } from "./notificationUtils";

export default function NotificationRequestItem({
  request,
  isWorking,
  onRespond,
}: {
  request: IncomingContactRequest;
  isWorking: boolean;
  onRespond: (requestId: string, action: "accept" | "reject") => void;
}) {
  const displayName = request.user?.displayName || "A Nexus user";
  const initials = displayName
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <li className="flex gap-3 rounded-xl border border-background-200/80 p-3">
      <div className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-full bg-primary-200/50 text-xs font-semibold text-primary-700">
        {request.user?.avatarUrl ? (
          <Image
            src={request.user.avatarUrl}
            alt=""
            fill
            sizes="40px"
            className="object-cover"
            unoptimized
          />
        ) : (
          initials || <ContactRound size={17} aria-hidden="true" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-1">
          <p className="text-sm leading-5 text-text-800">
            <span className="font-semibold">{displayName}</span> sent you a contact request
          </p>
          <time dateTime={request.createdAt} className="shrink-0 text-[11px] text-text-600">
            {formatRelativeTime(request.createdAt)}
          </time>
        </div>
        {request.user?.username && (
          <p className="mt-0.5 text-xs text-text-600">@{request.user.username}</p>
        )}
        <div className="mt-2.5 flex items-center gap-2">
          <button
            type="button"
            disabled={isWorking}
            onClick={() => onRespond(request.id, "accept")}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary-500 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isWorking ? <LoaderCircle size={13} className="animate-spin" /> : <Check size={13} />}
            Accept
          </button>
          <button
            type="button"
            disabled={isWorking}
            onClick={() => onRespond(request.id, "reject")}
            className="inline-flex items-center gap-1.5 rounded-lg border border-background-300 px-3 py-1.5 text-xs font-medium text-text-700 transition-colors hover:bg-background-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <X size={13} />
            Decline
          </button>
        </div>
      </div>
    </li>
  );
}

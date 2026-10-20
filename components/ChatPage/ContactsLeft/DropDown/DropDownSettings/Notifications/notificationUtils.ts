import axios from "axios";
import { IncomingContactRequest } from "@/lib/contactRequests";

export type ActivityGroupName = "Today" | "Yesterday" | "Earlier";

export type ActivityGroup = {
  title: ActivityGroupName;
  requests: IncomingContactRequest[];
};

export function formatRelativeTime(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently";

  const elapsedSeconds = Math.round((date.getTime() - Date.now()) / 1000);
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 60 * 60 * 24 * 365],
    ["month", 60 * 60 * 24 * 30],
    ["day", 60 * 60 * 24],
    ["hour", 60 * 60],
    ["minute", 60],
  ];
  const formatter = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });

  for (const [unit, seconds] of units) {
    if (Math.abs(elapsedSeconds) >= seconds) {
      return formatter.format(Math.round(elapsedSeconds / seconds), unit);
    }
  }
  return "Just now";
}

function getActivityGroup(value: string): ActivityGroupName {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Earlier";

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const dateKey = (candidate: Date) =>
    `${candidate.getFullYear()}-${candidate.getMonth()}-${candidate.getDate()}`;

  if (dateKey(date) === dateKey(today)) return "Today";
  if (dateKey(date) === dateKey(yesterday)) return "Yesterday";
  return "Earlier";
}

export function groupRequestsByDate(
  requests: IncomingContactRequest[],
): ActivityGroup[] {
  const groups: ActivityGroup[] = [];

  for (const request of requests) {
    const title = getActivityGroup(request.createdAt);
    const group = groups.find((item) => item.title === title);
    if (group) group.requests.push(request);
    else groups.push({ title, requests: [request] });
  }

  return groups;
}

export function getActionError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const status: number | undefined = error.response?.status;
    const message = (error.response?.data as { message?: unknown } | undefined)?.message;
    if (status === 409) return "This request is no longer pending. The list has been refreshed.";
    if (status === 401 || status === 403) return "Your session may have expired. Please sign in again.";
    if (typeof message === "string") return message;
  }
  return "We couldn't update this request. Check your connection and try again.";
}

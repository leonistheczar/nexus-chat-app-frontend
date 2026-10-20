import {
  ContactRound,
  ShieldAlert,
  UserRoundCheck,
  UsersRound,
} from "lucide-react";
import NotificationCategoryCard from "./NotificationCategoryCard";

export default function NotificationSummary({
  pendingCount,
  isLoading,
  isError,
}: {
  pendingCount: string;
  isLoading: boolean;
  isError: boolean;
}) {
  return (
    <section aria-label="Notification categories">
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        <NotificationCategoryCard
          title="Contact requests"
          count={isLoading ? "..." : isError ? "-" : pendingCount}
          detail={isLoading ? "Loading" : isError ? "Couldn't load" : "Pending incoming"}
          icon={ContactRound}
          available
        />
        <NotificationCategoryCard
          title="Group invitations"
          count="-"
          detail="Not available yet"
          icon={UsersRound}
          available={false}
        />
        <NotificationCategoryCard
          title="Connections"
          count="-"
          detail="History not available"
          icon={UserRoundCheck}
          available={false}
        />
        <NotificationCategoryCard
          title="Security alerts"
          count="-"
          detail="Not available yet"
          icon={ShieldAlert}
          available={false}
        />
      </div>
      <p className="mt-2 text-[11px] text-text-600">
        Counts show pending requests. Unread status isn&apos;t available yet.
      </p>
    </section>
  );
}

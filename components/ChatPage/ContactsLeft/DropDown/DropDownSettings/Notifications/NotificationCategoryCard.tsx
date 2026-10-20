import type { LucideIcon } from "lucide-react";

type NotificationCategoryCardProps = {
  title: string;
  count: string;
  detail: string;
  icon: LucideIcon;
  available: boolean;
};

export default function NotificationCategoryCard({
  title,
  count,
  detail,
  icon: Icon,
  available,
}: NotificationCategoryCardProps) {
  return (
    <article
      className={`min-w-0 rounded-xl border p-3 ${
        available
          ? "border-primary-300/50 bg-primary-200/20"
          : "border-background-200 bg-background-100/50"
      }`}
    >
      <div className="flex items-center gap-2 text-text-600">
        <Icon size={16} aria-hidden="true" />
        <h3 className="truncate text-xs font-medium">{title}</h3>
      </div>
      <p className="mt-2 text-xl font-semibold leading-none text-text-800">{count}</p>
      <p className="mt-1.5 truncate text-[11px] text-text-600">{detail}</p>
    </article>
  );
}

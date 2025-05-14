import { format } from "date-fns";

export function getRelativeOrFormattedDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  if (diffMins < 30) return "just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays < 3) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

  // Format as full date if older than a week
  return format(date, "MMM d, yyyy, HH:mm");
}

export function formatedTimestampByDetail(dateString: string): string {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("id-ID", {
    month: "short",
    day: "numeric",
  }).format(date);
}

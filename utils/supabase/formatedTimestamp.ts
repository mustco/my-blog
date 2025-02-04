export function formatedTimestamp(dateString: string): string {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(date);
}

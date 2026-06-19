// Helper functions for formatting and display.

/** Formats an ISO timestamp as a human-readable date, e.g. "Jun 19, 2026". */
export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** Capitalizes the first letter of a string (e.g. "admin" -> "Admin"). */
export function capitalize(value: string): string {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

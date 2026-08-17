const NOT_AVAILABLE = "Not available from this source";

/**
 * The single place that decides how missing fields render. Never shows
 * null/undefined/"N/A" — always the friendly explanation.
 */
export function field(value: string | null | undefined): string {
  if (value == null || String(value).trim() === "") return NOT_AVAILABLE;
  return String(value);
}

export function isAvailable(value: string | null | undefined): boolean {
  return value != null && String(value).trim() !== "";
}

export { NOT_AVAILABLE };

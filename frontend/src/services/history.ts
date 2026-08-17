import { GUEST_HISTORY_KEY, GUEST_HISTORY_LIMIT } from "@/lib/constants";
import type { GuestHistoryEntry, LookupType } from "@/lib/types";

function read(): GuestHistoryEntry[] {
  try {
    const raw = localStorage.getItem(GUEST_HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(entries: GuestHistoryEntry[]): void {
  try {
    localStorage.setItem(GUEST_HISTORY_KEY, JSON.stringify(entries.slice(0, GUEST_HISTORY_LIMIT)));
  } catch {
    // storage full or unavailable — ignore
  }
}

export function getGuestHistory(): GuestHistoryEntry[] {
  return read();
}

export function addGuestHistory(
  query: string,
  lookupType: LookupType,
  label: string | null
): GuestHistoryEntry[] {
  const normalized = query.toUpperCase();
  const entries = read().filter((e) => e.query !== normalized);
  entries.unshift({
    query: normalized,
    lookupType,
    label,
    checkedAt: new Date().toISOString(),
  });
  write(entries);
  return entries;
}

export function clearGuestHistory(): void {
  write([]);
}

export function removeGuestHistory(query: string): void {
  write(read().filter((e) => e.query !== query.toUpperCase()));
}

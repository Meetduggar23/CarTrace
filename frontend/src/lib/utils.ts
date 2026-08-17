import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Format an ISO timestamp as a readable date, e.g. "Aug 17, 2026". */
export function formatDate(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** "MH12AB1234" -> "MH 12 AB 1234" */
export function formatRegistration(reg: string | null | undefined): string | null {
  if (!reg) return null;
  const r = reg.replace(/[\s-]/g, "").toUpperCase();
  if (r.length === 10 && /^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/.test(r)) {
    return `${r.slice(0, 2)} ${r.slice(2, 4)} ${r.slice(4, 6)} ${r.slice(6)}`;
  }
  if (r.length === 9 && /^[A-Z]{2}\d{2}[A-Z]\d{4}$/.test(r)) {
    return `${r.slice(0, 2)} ${r.slice(2, 4)} ${r.slice(4, 5)} ${r.slice(5)}`;
  }
  if (r.length === 8 && /^\d+$/.test(r.slice(4))) {
    return `${r.slice(0, 2)} ${r.slice(2, 4)} ${r.slice(4)}`;
  }
  return r;
}

/** Relative time like "10 min ago". */
export function timeAgo(iso: string | null | undefined): string {
  if (!iso) return "";
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const seconds = Math.max(0, Math.floor((Date.now() - then) / 1000));
  const table: [number, string][] = [
    [60, "sec"],
    [60, "min"],
    [24, "hour"],
    [30, "day"],
    [12, "month"],
  ];
  let value = seconds;
  let unit = "year";
  for (const [size, label] of table) {
    if (value < size) {
      unit = label;
      break;
    }
    value = Math.floor(value / size);
  }
  return `${value} ${unit}${value === 1 ? "" : "s"} ago`;
}

/** Uppercase and strip spaces/dashes (mirrors backend normalization). */
export function normalizeQuery(input: string): string {
  return input.replace(/[\s-]/g, "").toUpperCase();
}

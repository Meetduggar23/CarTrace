const ACRONYMS = new Set([
  "SUV",
  "EV",
  "HEV",
  "PHEV",
  "AWD",
  "4WD",
  "RWD",
  "FWD",
  "CVT",
  "V6",
  "V8",
  "V12",
  "I3",
  "I4",
  "I6",
  "LPG",
  "CNG",
  "HP",
  "ID",
  "EU",
  "US",
  "4X4",
  "2WD",
]);

/** Title-case provider strings like "HYUNDAI" -> "Hyundai". */
export function humanize(value: string | null | undefined): string | null {
  if (value == null) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed
    .split(/\s+/)
    .map((word) => {
      const upper = word.toUpperCase();
      if (ACRONYMS.has(upper)) return upper;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

/** Trimmed string or null. */
export function clean(value: string | null | undefined): string | null {
  if (value == null) return null;
  const trimmed = String(value).trim();
  return trimmed || null;
}

/** Convert a value to a stable string, or null when empty. */
export function stringOrNull(value: unknown): string | null {
  if (value == null) return null;
  const str = String(value).trim();
  return str || null;
}

/** "1497" / "2998.832712" -> "1497 cc" / "2999 cc" (when a value exists). */
export function displacementWithUnit(
  cc: string | number | null | undefined
): string | null {
  if (cc == null) return null;
  const num = Number(cc);
  if (!Number.isFinite(num) || num <= 0) return null;
  return `${Math.round(num)} cc`;
}

/** "184" -> "184 hp" (when a value exists). */
export function powerWithUnit(hp: string | number | null | undefined): string | null {
  if (hp == null) return null;
  const str = String(hp).trim();
  if (!str || str === "0") return null;
  return `${str} hp`;
}

/** Deterministic pseudo-id from a query string. */
export function idFromQuery(kind: string, query: string): string {
  let hash = 0;
  for (let i = 0; i < query.length; i += 1) {
    hash = (hash * 31 + query.charCodeAt(i)) >>> 0;
  }
  return `${kind}-${hash.toString(36)}`;
}

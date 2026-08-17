export const SITE = {
  /** Change the product name here — it propagates across the app. */
  name: "AutoCheck",
  tagline: "Vehicle Information & Registration Checker",
  description:
    "Check vehicle specifications, registration information and available vehicle records in one place.",
} as const;

export const API_URL =
  (import.meta.env.VITE_API_URL as string | undefined) ??
  (import.meta.env.DEV ? "http://localhost:4000" : "/api");

export const EXAMPLE_REGISTRATIONS = [
  "MH12AB1234",
  "DL01AB1234",
  "RJ14AB1234",
  "KA01AB1234",
] as const;

export const EXAMPLE_VINS = [
  "1HGCM82633A123456",
  "5N1AT2MV7JC123456",
  "MA3EYD31S00557242",
] as const;

export const GUEST_HISTORY_KEY = "autocheck-guest-history";
export const AUTH_TOKEN_KEY = "autocheck-token";
export const THEME_KEY = "autocheck-theme";
export const COMPARE_KEY = "autocheck-compare";

export const GUEST_HISTORY_LIMIT = 10;

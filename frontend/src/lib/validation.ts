import type { LookupType } from "./types";
import { normalizeQuery } from "./utils";

const REGISTRATION_PATTERN = /^[A-Z]{2}\d{2}[A-Z]{1,2}\d{3,4}$/;

export function isValidRegistration(input: string): boolean {
  return REGISTRATION_PATTERN.test(normalizeQuery(input));
}

export function isValidVin(input: string): boolean {
  const vin = normalizeQuery(input);
  return vin.length === 17 && /^[A-HJ-NPR-Z0-9]+$/.test(vin);
}

export function detectLookupType(input: string): LookupType | null {
  const query = normalizeQuery(input);
  if (isValidVin(query)) return "vin";
  if (isValidRegistration(query)) return "registration";
  return null;
}

export function registrationErrorMessage(input: string): string | null {
  if (!input.trim()) return "Enter a registration number or VIN to continue.";
  return null;
}

export function lookupErrorMessage(
  input: string,
  type: LookupType | null
): string | null {
  const query = normalizeQuery(input);
  if (!query) return "Please enter a value to search.";
  if (type === "registration") {
    return "That doesn't look like a valid registration number. Try a format like MH12AB1234.";
  }
  if (type === "vin") {
    return "A VIN must be exactly 17 characters (letters and digits, excluding I, O and Q).";
  }
  return "We couldn't recognize that as a registration number or VIN. Please check the format.";
}

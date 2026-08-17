import { ValidationError } from "../types/errors";
import type { LookupType } from "../types/vehicle";

/** Strip whitespace/dashes, uppercase. */
export function normalizeQuery(input: string): string {
  return input
    .replace(/[\s-]/g, "")
    .toUpperCase();
}

// Accepts: AA11AA1111 (10), AA11A1111 (9, single-letter series) and the
// older AA111111 (8) format. Rejects everything else.
const REGISTRATION_PATTERN = /^[A-Z]{2}\d{2}(?:[A-Z]{1,2}\d{4}|\d{4})$/;

/**
 * Indian registration numbers are state-coded and vary by RTO:
 *   MH12AB1234, DL01AB1234, RJ14AB1234, KA01AB1234 (2+2+2+4)
 *   BH01AB1234 (Bharat series), plus older 2+2+4 formats.
 * Validation is tolerant but rejects clearly invalid values.
 */
export function isValidRegistration(input: string): boolean {
  return REGISTRATION_PATTERN.test(normalizeQuery(input));
}

/** VINs are exactly 17 characters using A-Z0-9, excluding I, O and Q. */
export function isValidVin(input: string): boolean {
  const vin = normalizeQuery(input);
  return vin.length === 17 && /^[A-HJ-NPR-Z0-9]+$/.test(vin);
}

/** Determine what kind of lookup a user query is. */
export function detectLookupType(input: string): LookupType | null {
  const query = normalizeQuery(input);
  if (isValidVin(query)) return "vin";
  if (isValidRegistration(query)) return "registration";
  return null;
}

/** Validate and normalize a registration number, throwing on invalid input. */
export function requireValidRegistration(input: string): string {
  const reg = normalizeQuery(input);
  if (!isValidRegistration(reg)) {
    throw new ValidationError(
      "Invalid registration number. Expected a format like MH12AB1234.",
      { field: "registrationNumber" }
    );
  }
  return reg;
}

/** Validate and normalize a VIN, throwing on invalid input. */
export function requireValidVin(input: string): string {
  const vin = normalizeQuery(input);
  if (!isValidVin(vin)) {
    throw new ValidationError(
      "Invalid VIN. A VIN is exactly 17 characters (letters and digits, excluding I, O and Q).",
      { field: "vin" }
    );
  }
  return vin;
}

/** "MH12AB1234" -> "MH 12 AB 1234" */
export function formatRegistration(reg: string): string {
  const r = normalizeQuery(reg);
  if (r.length === 10 && /^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/.test(r)) {
    return `${r.slice(0, 2)} ${r.slice(2, 4)} ${r.slice(4, 6)} ${r.slice(6)}`;
  }
  if (r.length === 9 && /^[A-Z]{2}\d{2}[A-Z]\d{4}$/.test(r)) {
    return `${r.slice(0, 2)} ${r.slice(2, 4)} ${r.slice(4, 5)} ${r.slice(5)}`;
  }
  if (r.length === 8 && /^[A-Z]{2}\d{2}\d{4}$/.test(r)) {
    return `${r.slice(0, 2)} ${r.slice(2, 4)} ${r.slice(4)}`;
  }
  return r;
}

/** "MH12AB1234" -> { stateCode: "MH", rtoCode: "MH-12" } */
export function extractRtoCode(reg: string): { stateCode: string; rtoCode: string } {
  const r = normalizeQuery(reg);
  const stateCode = r.slice(0, 2);
  const rtoDigits = r.slice(2, 4);
  return { stateCode, rtoCode: `${stateCode}-${rtoDigits}` };
}

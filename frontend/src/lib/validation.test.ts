import { describe, expect, it } from "vitest";
import {
  detectLookupType,
  isValidRegistration,
  isValidVin,
  lookupErrorMessage,
} from "./validation";

describe("isValidRegistration", () => {
  it("accepts common Indian formats", () => {
    for (const reg of [
      "MH12AB1234",
      "DL01AB1234",
      "RJ14AB1234",
      "KA01AB1234",
      "BH01AB1234",
      "UP32AB4321",
    ]) {
      expect(isValidRegistration(reg), reg).toBe(true);
    }
  });

  it("is case-insensitive and tolerant of spaces", () => {
    expect(isValidRegistration("mh 12 ab 1234")).toBe(true);
    expect(isValidRegistration("MH-12-AB-1234")).toBe(true);
  });

  it("rejects clearly invalid values", () => {
    for (const bad of ["", "1234", "MH12", "ABCDEFGHIJ", "MH12AB12345", "1234567890"]) {
      expect(isValidRegistration(bad), JSON.stringify(bad)).toBe(false);
    }
  });
});

describe("isValidVin", () => {
  it("accepts 17-char VINs", () => {
    expect(isValidVin("1HGCM82633A123456")).toBe(true);
  });
  it("rejects invalid VINs", () => {
    expect(isValidVin("1HGCM82633A12345")).toBe(false);
    expect(isValidVin("1HGCM82633O123456")).toBe(false);
    expect(isValidVin("1HGCM82633I123456")).toBe(false);
    expect(isValidVin("1HGCM82633Q123456")).toBe(false);
  });
});

describe("detectLookupType", () => {
  it("detects registration and VIN inputs", () => {
    expect(detectLookupType("MH12AB1234")).toBe("registration");
    expect(detectLookupType("1HGCM82633A123456")).toBe("vin");
    expect(detectLookupType("gibberish")).toBeNull();
  });
});

describe("lookupErrorMessage", () => {
  it("explains invalid formats without revealing internal state", () => {
    expect(lookupErrorMessage("", "registration")).toContain("Please enter");
    expect(lookupErrorMessage("ABC", "registration")).toContain("MH12AB1234");
    expect(lookupErrorMessage("ABC", "vin")).toContain("17 characters");
    expect(lookupErrorMessage("ABC", null)).toContain("recognize");
  });
});

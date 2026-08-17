import { describe, expect, it } from "vitest";
import {
  detectLookupType,
  extractRtoCode,
  formatRegistration,
  isValidRegistration,
  isValidVin,
  normalizeQuery,
  requireValidRegistration,
  requireValidVin,
} from "../src/utils/validation";
import { ValidationError } from "../src/types/errors";

describe("normalizeQuery", () => {
  it("uppercases and strips spaces/dashes", () => {
    expect(normalizeQuery(" mh 12 ab 1234 ")).toBe("MH12AB1234");
    expect(normalizeQuery("mh-12-ab-1234")).toBe("MH12AB1234");
  });
});

describe("isValidRegistration", () => {
  it("accepts common Indian formats", () => {
    for (const reg of [
      "MH12AB1234",
      "DL01AB1234",
      "RJ14AB1234",
      "KA01AB1234",
      "UP32AB4321",
      "BH01AB1234",
    ]) {
      expect(isValidRegistration(reg), reg).toBe(true);
    }
  });

  it("rejects clearly invalid values", () => {
    for (const bad of [
      "",
      "1234",
      "MH12",
      "MH12AB",
      "MH12AB123",
      "MH12AB12345",
      "M1H2A3B1234",
      "MH1AB1234",
      "ABCDEFGHIJ",
      "1234567890",
      "MH 12 AB 1234 extra",
    ]) {
      expect(isValidRegistration(bad), JSON.stringify(bad)).toBe(false);
    }
  });
});

describe("isValidVin", () => {
  it("accepts 17-char VINs", () => {
    expect(isValidVin("1HGCM82633A123456")).toBe(true);
    expect(isValidVin("5N1AT2MV7JC123456")).toBe(true);
  });

  it("rejects VINs with invalid characters or length", () => {
    expect(isValidVin("1HGCM82633A12345")).toBe(false);
    expect(isValidVin("1HGCM82633A1234567")).toBe(false);
    expect(isValidVin("1HGCM82633O123456")).toBe(false); // O not allowed
    expect(isValidVin("1HGCM82633I123456")).toBe(false); // I not allowed
    expect(isValidVin("1HGCM82633Q123456")).toBe(false); // Q not allowed
    expect(isValidVin("")).toBe(false);
  });
});

describe("detectLookupType", () => {
  it("detects registration numbers and VINs", () => {
    expect(detectLookupType("MH12AB1234")).toBe("registration");
    expect(detectLookupType("1HGCM82633A123456")).toBe("vin");
    expect(detectLookupType("not-a-vehicle")).toBeNull();
  });
});

describe("formatRegistration", () => {
  it("formats 2+2+2+4 numbers", () => {
    expect(formatRegistration("MH12AB1234")).toBe("MH 12 AB 1234");
  });
  it("handles other lengths gracefully", () => {
    expect(formatRegistration("MH121234")).toBe("MH 12 1234");
    expect(formatRegistration("GARBAGE")).toBe("GARBAGE");
  });
});

describe("extractRtoCode", () => {
  it("extracts state and RTO code", () => {
    expect(extractRtoCode("MH12AB1234")).toEqual({
      stateCode: "MH",
      rtoCode: "MH-12",
    });
  });
});

describe("requireValid*", () => {
  it("throws ValidationError for invalid input", () => {
    expect(() => requireValidRegistration("nope")).toThrow(ValidationError);
    expect(() => requireValidVin("short")).toThrow(ValidationError);
  });
  it("returns normalized values for valid input", () => {
    expect(requireValidRegistration(" mh 12 ab 1234 ")).toBe("MH12AB1234");
    expect(requireValidVin("1hgcm82633a123456")).toBe("1HGCM82633A123456");
  });
});

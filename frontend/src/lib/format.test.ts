import { describe, expect, it } from "vitest";
import { field, isAvailable, NOT_AVAILABLE } from "./format";

describe("field", () => {
  it("never renders null/undefined/empty as-is", () => {
    expect(field(null)).toBe(NOT_AVAILABLE);
    expect(field(undefined)).toBe(NOT_AVAILABLE);
    expect(field("")).toBe(NOT_AVAILABLE);
    expect(field("   ")).toBe(NOT_AVAILABLE);
  });
  it("renders real values", () => {
    expect(field("Petrol")).toBe("Petrol");
    expect(field(" 1497 cc ")).toBe(" 1497 cc ");
  });
});

describe("isAvailable", () => {
  it("distinguishes available from missing values", () => {
    expect(isAvailable("x")).toBe(true);
    expect(isAvailable("")).toBe(false);
    expect(isAvailable(null)).toBe(false);
    expect(isAvailable(undefined)).toBe(false);
  });
});

import { describe, expect, it } from "vitest";
import {
  clean,
  displacementWithUnit,
  humanize,
  powerWithUnit,
  stringOrNull,
} from "../src/utils/normalize";

describe("humanize", () => {
  it("title-cases provider strings", () => {
    expect(humanize("HYUNDAI")).toBe("Hyundai");
    expect(humanize("MARUTI SUZUKI")).toBe("Maruti Suzuki");
  });
  it("preserves acronyms", () => {
    expect(humanize("SUV")).toBe("SUV");
    expect(humanize("AWD")).toBe("AWD");
    expect(humanize("I4")).toBe("I4");
  });
  it("returns null for empty values", () => {
    expect(humanize(null)).toBeNull();
    expect(humanize("   ")).toBeNull();
    expect(humanize(undefined)).toBeNull();
  });
});

describe("clean / stringOrNull", () => {
  it("trims and returns null for empty strings", () => {
    expect(clean("  x  ")).toBe("x");
    expect(clean("")).toBeNull();
    expect(clean(null)).toBeNull();
    expect(stringOrNull(0)).toBe("0");
    expect(stringOrNull(undefined)).toBeNull();
  });
});

describe("displacementWithUnit / powerWithUnit", () => {
  it("appends units only when a value exists", () => {
    expect(displacementWithUnit("1497")).toBe("1497 cc");
    expect(displacementWithUnit("0")).toBeNull();
    expect(displacementWithUnit(null)).toBeNull();
    expect(powerWithUnit("184")).toBe("184 hp");
    expect(powerWithUnit("")).toBeNull();
  });
});

import { describe, expect, it } from "vitest";
import { formatDate, formatRegistration, normalizeQuery, timeAgo } from "./utils";

describe("formatRegistration", () => {
  it("formats 2+2+2+4 registration numbers", () => {
    expect(formatRegistration("MH12AB1234")).toBe("MH 12 AB 1234");
    expect(formatRegistration(" mh 12 ab 1234 ")).toBe("MH 12 AB 1234");
  });
  it("handles odd input gracefully", () => {
    expect(formatRegistration(null)).toBeNull();
    expect(formatRegistration("")).toBeNull();
    expect(formatRegistration("1234")).toBe("1234");
  });
});

describe("normalizeQuery", () => {
  it("uppercases and strips separators", () => {
    expect(normalizeQuery(" mh-12 ab 1234 ")).toBe("MH12AB1234");
  });
});

describe("timeAgo", () => {
  it("produces relative labels", () => {
    expect(timeAgo(new Date().toISOString())).toBe("0 secs ago");
    expect(timeAgo(null)).toBe("");
    const tenMin = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    expect(timeAgo(tenMin)).toBe("10 mins ago");
  });
});

describe("formatDate", () => {
  it("formats ISO timestamps", () => {
    const out = formatDate("2026-08-17T10:00:00.000Z");
    expect(out).toContain("2026");
    expect(formatDate(null)).toBeNull();
    expect(formatDate("not-a-date")).toBeNull();
  });
});

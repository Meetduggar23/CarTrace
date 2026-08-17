import { describe, expect, it } from "vitest";
import { rtoByCode, rtoByCity, rtoByState, searchRto } from "../src/data/rto";
import { RtoService } from "../src/services/rto.service";
import { NotFoundError } from "../src/types/errors";

describe("RTO dataset", () => {
  it("contains expected well-known codes", () => {
    const pune = rtoByCode("MH-12");
    expect(pune?.city).toBe("Pune");
    expect(pune?.officeName).toBe("Pune City RTO");
    expect(pune?.state).toBe("Maharashtra");

    expect(rtoByCode("KA-01")?.city).toBe("Bengaluru");
    expect(rtoByCode("DL-01")?.state).toBe("Delhi");
    expect(rtoByCode("CH-01")?.state).toBe("Chandigarh");
  });

  it("is case-insensitive", () => {
    expect(rtoByCode("mh-12")?.code).toBe("MH-12");
  });

  it("has no fabricated contact details", () => {
    for (const item of searchRto("")) {
      expect(item.contact).toBeNull();
      expect(item.officeName.length).toBeGreaterThan(0);
    }
  });

  it("searches by state and city", () => {
    expect(rtoByState("Maharashtra").length).toBeGreaterThan(10);
    expect(rtoByCity("pune").length).toBeGreaterThan(0);
    expect(rtoByCity("pune")[0].code).toBe("MH-12");
  });

  it("returns empty for unknown states/cities", () => {
    expect(rtoByState("Nowhere").length).toBe(0);
    expect(rtoByCity("Atlantis").length).toBe(0);
  });
});

describe("RtoService", () => {
  const service = new RtoService();

  it("searches by query", () => {
    const { results } = service.search({ q: "pune" });
    expect(results.length).toBeGreaterThan(0);
  });

  it("returns the full directory when no filters are applied", () => {
    const { results, total } = service.search({});
    expect(total).toBeGreaterThan(100);
    expect(results.length).toBe(total);
  });

  it("throws NotFoundError for unknown codes", () => {
    expect(() => service.byCode("XX-99")).toThrow(NotFoundError);
  });

  it("returns stats", () => {
    expect(service.stats().total).toBeGreaterThan(100);
  });
});

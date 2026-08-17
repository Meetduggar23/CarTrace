import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Deterministic network layer: real provider selection + real normalization,
// with the NHTSA HTTP response simulated so tests never depend on the network.
vi.mock("../src/utils/http", () => ({
  fetchJson: vi.fn(async (url: string) => {
    if (url.includes("DecodeVinValues")) {
      return {
        status: 200,
        body: {
          Count: 1,
          Message: "Results returned successfully",
          Results: [
            {
              Make: "HONDA",
              Model: "CIVIC",
              ModelYear: "2020",
              Trim: "EX",
              VehicleType: "PASSENGER CAR",
              BodyClass: "Sedan/Saloon",
              FuelTypePrimary: "Gasoline",
              DisplacementCC: "1498",
              EngineHP: "158",
              ErrorCode: "0",
              ErrorText: "",
            },
          ],
        },
      };
    }
    if (url.includes("GetVehicleTypesForMake")) {
      return { status: 200, body: { Results: [] } };
    }
    throw new Error(`Unexpected URL in mock: ${url}`);
  }),
}));

import { createApp } from "../src/app";
import { RateLimitError } from "../src/types/errors";

const app = createApp();

describe("GET /api/health", () => {
  it("returns ok with provider and db info", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body.database).toBeDefined();
    expect(Array.isArray(res.body.providers)).toBe(true);
  });
});

describe("POST /api/vehicle/search", () => {
  it("returns a normalized vehicle record (mock provider)", async () => {
    const res = await request(app)
      .post("/api/vehicle/search")
      .send({ registrationNumber: "MH12AB1234" });
    expect(res.status).toBe(200);
    expect(res.body.data.record.registrationNumber).toBe("MH12AB1234");
    expect(res.body.data.record.manufacturer).toBe("Hyundai");
    expect(res.body.data.record.model).toBe("Creta");
    expect(res.body.data.record.isMock).toBe(true);
    expect(res.body.data.cached).toBe(false);
    expect(res.body.data.providerId).toBe("mock");
  });

  it("is tolerant of spaces and lowercase", async () => {
    const res = await request(app)
      .post("/api/vehicle/search")
      .send({ registrationNumber: "  mh 12 ab 1234 " });
    expect(res.status).toBe(200);
    expect(res.body.data.record.registrationNumber).toBe("MH12AB1234");
  });

  it("rejects invalid registration numbers with 400", async () => {
    const res = await request(app)
      .post("/api/vehicle/search")
      .send({ registrationNumber: "nonsense" });
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("rejects missing body fields", async () => {
    const res = await request(app).post("/api/vehicle/search").send({});
    expect(res.status).toBe(400);
  });
});

describe("POST /api/vehicle/vin", () => {
  it("decodes a VIN through the NHTSA provider", async () => {
    const res = await request(app)
      .post("/api/vehicle/vin")
      .send({ vin: "1HGCM82633A123456" });
    expect(res.status).toBe(200);
    expect(res.body.data.record.vin).toBe("1HGCM82633A123456");
    expect(res.body.data.record.manufacturer).toBe("Honda");
    expect(res.body.data.record.model).toBe("Civic");
    expect(res.body.data.record.engineDisplacement).toBe("1498 cc");
    expect(res.body.data.record.isMock).toBe(false);
    expect(res.body.data.providerId).toBe("nhtsa");
  });

  it("rejects invalid VINs", async () => {
    const res = await request(app)
      .post("/api/vehicle/vin")
      .send({ vin: "123" });
    expect(res.status).toBe(400);
  });
});

describe("GET /api/vehicle/:registration", () => {
  it("supports path-based lookups", async () => {
    const res = await request(app).get("/api/vehicle/DL01AB1234");
    expect(res.status).toBe(200);
    expect(res.body.data.record.manufacturer).toBe("Maruti Suzuki");
  });
});

describe("GET /api/rto", () => {
  it("lists search results", async () => {
    const res = await request(app).get("/api/rto").query({ q: "pune" });
    expect(res.status).toBe(200);
    expect(res.body.data.results.length).toBeGreaterThan(0);
    expect(res.body.data.stats.total).toBeGreaterThan(100);
  });

  it("filters by state", async () => {
    const res = await request(app).get("/api/rto").query({ state: "MH" });
    expect(res.status).toBe(200);
    expect(res.body.data.results.length).toBeGreaterThan(10);
  });

  it("returns 404 for unknown codes", async () => {
    const res = await request(app).get("/api/rto/XX-99");
    expect(res.status).toBe(404);
  });
});

describe("GET /api/providers", () => {
  it("lists provider status and capabilities", async () => {
    const res = await request(app).get("/api/providers");
    expect(res.status).toBe(200);
    const providers = res.body.data;
    expect(providers.length).toBeGreaterThan(0);
    const nhtsa = providers.find((p: { id: string }) => p.id === "nhtsa");
    expect(nhtsa.enabled).toBe(true);
    expect(nhtsa.capabilities).toContain("vin");
    expect(nhtsa.isMock).toBe(false);
  });
});

describe("error handling", () => {
  it("maps 404 routes and structured errors consistently", async () => {
    const missing = await request(app).get("/api/does-not-exist");
    expect(missing.status).toBe(404);
    expect(missing.body.error.code).toBe("NOT_FOUND");

    const { errorHandler } = await import("../src/middleware/error-handler");
    const express = (await import("express")).default;
    const mini = express();
    mini.get("/boom", () => {
      throw new RateLimitError();
    });
    mini.use(errorHandler);
    const res = await request(mini).get("/boom");
    expect(res.status).toBe(429);
    expect(res.body.error.code).toBe("RATE_LIMITED");
  });
});

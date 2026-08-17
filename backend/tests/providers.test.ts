import { describe, expect, it } from "vitest";
import { config } from "../src/config/env";
import { CarApiProvider } from "../src/providers/car-api.provider";
import { MockProvider } from "../src/providers/mock.provider";
import { NhtsaProvider } from "../src/providers/nhtsa.provider";
import { ProviderManager } from "../src/providers/provider-manager";
import {
  ProviderUnavailableError,
  UnsupportedLookupError,
} from "../src/types/errors";

describe("MockProvider", () => {
  const mock = new MockProvider();

  it("is enabled when mock mode is on", () => {
    expect(mock.isEnabled()).toBe(config.mockProviderEnabled);
  });

  it("decodes a known sample VIN into a labeled mock record", async () => {
    const record = await mock.decodeVin("1HGCM82633A123456");
    expect(record.vin).toBe("1HGCM82633A123456");
    expect(record.manufacturer).toBe("Honda");
    expect(record.isMock).toBe(true);
    expect(record.sourceTimestamp).toBeTruthy();
  });

  it("looks up a known registration sample", async () => {
    const record = await mock.lookupRegistration("MH12AB1234");
    expect(record.registrationNumber).toBe("MH12AB1234");
    expect(record.manufacturer).toBe("Hyundai");
    expect(record.model).toBe("Creta");
    expect(record.modelYear).toBe("2024");
    expect(record.fuelType).toBe("Petrol");
    expect(record.rtoCode).toBe("MH-12");
    expect(record.rtoName).toBe("Pune City RTO");
    expect(record.state).toBe("Maharashtra");
    expect(record.isMock).toBe(true);
  });

  it("derives RTO metadata from the plate prefix", async () => {
    const record = await mock.lookupRegistration("RJ14AB1234");
    expect(record.rtoCode).toBe("RJ-14");
    expect(record.state).toBe("Rajasthan");
  });

  it("rejects invalid input", async () => {
    await expect(mock.decodeVin("bad")).rejects.toThrow();
    await expect(mock.lookupRegistration("bad")).rejects.toThrow();
  });
});

describe("NhtsaProvider", () => {
  const nhtsa = new NhtsaProvider();

  it("is always enabled and does not require auth", () => {
    expect(nhtsa.isEnabled()).toBe(true);
    expect(nhtsa.requiresAuth).toBe(false);
  });

  it("reports registration lookup as unsupported (honest capability)", async () => {
    await expect(nhtsa.lookupRegistration("MH12AB1234")).rejects.toThrow(
      UnsupportedLookupError
    );
  });
});

describe("CarApiProvider", () => {
  const carApi = new CarApiProvider();

  it("is disabled when no API key is configured", () => {
    expect(carApi.authConfigured).toBe(false);
    expect(carApi.isEnabled()).toBe(false);
  });
});

describe("ProviderManager", () => {
  it("prefers real providers over the mock for VIN lookups", () => {
    const manager = new ProviderManager([
      new MockProvider(),
      new NhtsaProvider(),
    ]);
    const selected = manager.selectFor("vin");
    expect(selected.id).toBe("nhtsa");
  });

  it("falls back to the mock provider for registration lookups", () => {
    const manager = new ProviderManager([new MockProvider()]);
    const selected = manager.selectFor("registration");
    expect(selected.isMock).toBe(true);
  });

  it("throws UnsupportedLookupError when nothing supports the lookup", () => {
    const manager = new ProviderManager([new NhtsaProvider()]);
    expect(() => manager.selectFor("registration")).toThrow(
      UnsupportedLookupError
    );
  });

  it("reports provider info with capabilities", async () => {
    const manager = new ProviderManager([new MockProvider(), new NhtsaProvider()]);
    const info = await manager.getProviderInfo();
    expect(info.length).toBe(2);
    const nhtsa = info.find((p) => p.id === "nhtsa")!;
    expect(nhtsa.capabilities).toContain("vin");
    expect(nhtsa.capabilities).not.toContain("registration");
  });
});

describe("http timeout handling", () => {
  it("throws ProviderUnavailableError when the provider times out", async () => {
    // A local, unroutable port fails fast (connection refused) — mapping to
    // ProviderUnavailableError without hanging.
    const { fetchJson } = await import("../src/utils/http");
    await expect(
      fetchJson("http://127.0.0.1:9/nope", { timeoutMs: 500, retries: 0 })
    ).rejects.toThrow(ProviderUnavailableError);
  });
});

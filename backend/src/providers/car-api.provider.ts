import { config } from "../config/env";
import {
  ProviderUnavailableError,
  UnsupportedLookupError,
  VehicleNotFoundError,
} from "../types/errors";
import type { VehicleRecord } from "../types/vehicle";
import { fetchJson } from "../utils/http";
import {
  displacementWithUnit,
  humanize,
  idFromQuery,
  powerWithUnit,
  stringOrNull,
} from "../utils/normalize";
import { requireValidRegistration, requireValidVin } from "../utils/validation";
import type {
  ProviderHealthResult,
  VehicleProvider,
} from "./vehicle-provider.interface";

/**
 * CarAPI (https://www.carapi.app) — freemium vehicle specification API.
 *
 * - Requires an account/API key; free tier exists with daily request caps.
 * - Enables make/model/trim/specs data and VIN decoding.
 *
 * IMPORTANT: This provider is DISABLED by default. It activates only when
 * CARAPI_API_KEY is set. The response mapping below follows CarAPI's
 * public v4 API shape and is written defensively (it reads candidate field
 * names case-insensitively); verify the exact fields against your account's
 * live responses after configuring the key.
 */
export class CarApiProvider implements VehicleProvider {
  readonly id = "carapi";
  readonly name = "CarAPI";
  readonly description =
    "Freemium vehicle specification and VIN decoding API (requires an API key).";
  readonly capabilities = ["vin", "specs"] as const;
  readonly requiresAuth = true;
  readonly countries = ["United States", "Canada", "Europe"];
  readonly isMock = false;

  get authConfigured(): boolean {
    return Boolean(config.carApiKey);
  }

  isEnabled(): boolean {
    return this.authConfigured;
  }

  async decodeVin(vin: string): Promise<VehicleRecord> {
    const cleanVin = requireValidVin(vin);
    const url = `${config.carApiBaseUrl}/v4/vin/${cleanVin}`;
    const res = await fetchJson(url, {
      timeoutMs: 10_000,
      retries: 1,
      headers: {
        Authorization: `Bearer ${config.carApiKey}`,
        Accept: "application/json",
      },
    });

    if (res.status === 401 || res.status === 403) {
      throw new ProviderUnavailableError(
        "CarAPI rejected the configured API key. Check CARAPI_API_KEY."
      );
    }
    if (res.status === 404) {
      throw new VehicleNotFoundError(
        "We couldn't find a record for this VIN in the CarAPI database."
      );
    }
    if (res.status === 429) {
      throw new ProviderUnavailableError(
        "CarAPI rate limit reached. Please try again later."
      );
    }
    if (res.status !== 200) {
      throw new ProviderUnavailableError(
        `CarAPI returned HTTP ${res.status}.`
      );
    }

    return this.normalize(res.body as Record<string, unknown>, cleanVin);
  }

  async lookupRegistration(_reg: string): Promise<VehicleRecord> {
    requireValidRegistration(_reg);
    throw new UnsupportedLookupError(
      "Registration-number lookup is not supported by the CarAPI provider."
    );
  }

  async getVehicleSpecs(_query: string): Promise<VehicleRecord | null> {
    return null;
  }

  async checkHealth(): Promise<ProviderHealthResult> {
    try {
      const res = await fetchJson(`${config.carApiBaseUrl}/v4/makes`, {
        timeoutMs: 8_000,
        retries: 0,
        headers: {
          Authorization: `Bearer ${config.carApiKey}`,
          Accept: "application/json",
        },
      });
      return {
        ok: res.status === 200,
        checkedAt: new Date().toISOString(),
        message: res.status === 200 ? undefined : `HTTP ${res.status}`,
      };
    } catch (err) {
      return {
        ok: false,
        checkedAt: new Date().toISOString(),
        message: err instanceof Error ? err.message : "Unreachable",
      };
    }
  }

  private normalize(body: Record<string, unknown>, vin: string): VehicleRecord {
    const now = new Date().toISOString();
    const get = (...keys: string[]): string | null => {
      for (const key of keys) {
        const found = Object.entries(body).find(
          ([k]) => k.toLowerCase() === key.toLowerCase()
        );
        if (found) return stringOrNull(found[1]);
      }
      return null;
    };

    const make = humanize(get("make", "make_name", "manufacturer"));
    const displacement = displacementWithUnit(
      get("engine_displacement_cc", "displacement_cc", "engine_cc")
    );
    const power = powerWithUnit(get("engine_power_hp", "horsepower", "hp"));

    return {
      id: idFromQuery("vin", vin),
      lookupType: "vin",
      registrationNumber: null,
      vin,
      manufacturer: make,
      make,
      model: humanize(get("model", "model_name")),
      variant: humanize(get("trim", "trim_name")),
      modelYear: get("year", "model_year", "modelYear"),
      vehicleType: humanize(get("vehicle_type", "vehicleType")),
      bodyType: humanize(get("body_type", "bodyType", "body_style")),
      fuelType: humanize(get("fuel_type", "fuelType")),
      transmission: humanize(get("transmission", "transmission_type")),
      driveType: humanize(get("drive_type", "driveType")),
      color: null,

      engine: displacement,
      engineDisplacement: displacement,
      engineCylinders: get("engine_cylinders", "cylinders"),
      enginePower: power,
      torque: get("torque"),
      coolingType: null,
      engineCode: get("engine_code", "engineCode"),

      mileage: null,

      registrationDate: null,
      registrationExpiry: null,
      registrationAuthority: null,
      rtoCode: null,
      rtoName: null,
      state: null,
      city: null,

      insuranceStatus: null,
      insuranceExpiry: null,
      pucStatus: null,
      pucExpiry: null,
      fitnessStatus: null,

      ownerInfo: null,
      hypothecation: null,

      plantCity: humanize(get("plant_city", "plantCity")),
      plantCountry: humanize(get("plant_country", "plantCountry")),

      source: this.name,
      sourceTimestamp: now,
      isMock: false,
    };
  }
}

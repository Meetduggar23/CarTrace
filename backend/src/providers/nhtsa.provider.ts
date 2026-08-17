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

interface NhtsaDecodeResult {
  Make?: string;
  Model?: string;
  ModelYear?: string;
  Trim?: string;
  VehicleType?: string;
  BodyClass?: string;
  FuelTypePrimary?: string;
  TransmissionStyle?: string;
  DriveType?: string;
  DisplacementCC?: string;
  DisplacementL?: string;
  EngineCylinders?: string;
  EngineHP?: string;
  PlantCity?: string;
  PlantCountry?: string;
  SuggestedVIN?: string;
  ErrorCode?: string;
  ErrorText?: string;
}

interface NhtsaResponse {
  Count?: number;
  Message?: string;
  Results?: NhtsaDecodeResult[];
}

/**
 * NHTSA vPIC (https://vpic.nhtsa.dot.gov/api/) — the official US National
 * Highway Traffic Safety Administration vehicle product information catalog.
 *
 * - Free, no API key, no signup, HTTPS.
 * - Decodes VINs for US/Canada market vehicles into standardized attributes.
 * - Does NOT provide registration/RTO/insurance data for any country.
 *
 * Verified against the Public APIs Vehicle category (NHTSA entry).
 */
export class NhtsaProvider implements VehicleProvider {
  readonly id = "nhtsa";
  readonly name = "NHTSA vPIC";
  readonly description =
    "Official US DOT vehicle product information catalog. Free VIN decode for US/Canada market vehicles.";
  readonly capabilities = ["vin", "specs"] as const;
  readonly requiresAuth = false;
  readonly authConfigured = true;
  readonly countries = ["United States", "Canada"];
  readonly isMock = false;

  isEnabled(): boolean {
    return true;
  }

  async decodeVin(vin: string): Promise<VehicleRecord> {
    const cleanVin = requireValidVin(vin);
    const url = `${config.nhtsaApiBaseUrl}/DecodeVinValues/${cleanVin}?format=json`;
    const res = await fetchJson(url, { timeoutMs: 12_000, retries: 2 });

    if (res.status !== 200) {
      throw new ProviderUnavailableError(
        `NHTSA vPIC returned HTTP ${res.status}.`
      );
    }

    const data = res.body as NhtsaResponse;
    const row = Array.isArray(data?.Results) ? data.Results[0] : undefined;
    if (!row) {
      throw new ProviderUnavailableError(
        "NHTSA vPIC returned an unexpected response shape."
      );
    }

    if (row.ErrorCode && row.ErrorCode !== "0") {
      const detail = stringOrNull(row.ErrorText) ?? "Unknown error";
      if (/invalid|not.*found|0 characters/i.test(detail)) {
        throw new VehicleNotFoundError(
          "We couldn't decode this VIN in the NHTSA vPIC database. The VIN may be invalid or belong to a market NHTSA does not cover."
        );
      }
      throw new VehicleNotFoundError(detail);
    }

    return this.normalize(row, cleanVin);
  }

  /**
   * NHTSA does not provide registration-number lookups for any region.
   * Reported honestly as unsupported rather than fabricating data.
   */
  async lookupRegistration(_reg: string): Promise<VehicleRecord> {
    requireValidRegistration(_reg);
    throw new UnsupportedLookupError(
      "Registration-number lookup is not supported by the NHTSA vPIC provider. Configure a provider with registration capabilities to enable this lookup."
    );
  }

  /** vPIC does not offer free-form specs search; specs come from VIN decode. */
  async getVehicleSpecs(_query: string): Promise<VehicleRecord | null> {
    return null;
  }

  async checkHealth(): Promise<ProviderHealthResult> {
    try {
      const url = `${config.nhtsaApiBaseUrl}/GetVehicleTypesForMake/honda?format=json`;
      const res = await fetchJson(url, { timeoutMs: 8_000, retries: 1 });
      const ok = res.status === 200;
      return {
        ok,
        checkedAt: new Date().toISOString(),
        message: ok ? undefined : `HTTP ${res.status}`,
      };
    } catch (err) {
      return {
        ok: false,
        checkedAt: new Date().toISOString(),
        message: err instanceof Error ? err.message : "Unreachable",
      };
    }
  }

  private normalize(row: NhtsaDecodeResult, vin: string): VehicleRecord {
    const now = new Date().toISOString();
    const make = humanize(row.Make);
    const displacement = displacementWithUnit(row.DisplacementCC);
    const power = powerWithUnit(row.EngineHP);

    return {
      id: idFromQuery("vin", vin),
      lookupType: "vin",
      registrationNumber: null,
      vin,
      manufacturer: make,
      make,
      model: humanize(row.Model),
      variant: humanize(row.Trim),
      modelYear: stringOrNull(row.ModelYear),
      vehicleType: humanize(row.VehicleType),
      bodyType: humanize(row.BodyClass),
      fuelType: humanize(row.FuelTypePrimary),
      transmission: humanize(row.TransmissionStyle),
      driveType: humanize(row.DriveType),
      color: null,

      engine: displacement,
      engineDisplacement: displacement,
      engineCylinders: stringOrNull(row.EngineCylinders),
      enginePower: power,
      torque: null,
      coolingType: null,
      engineCode: null,

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

      plantCity: humanize(row.PlantCity),
      plantCountry: humanize(row.PlantCountry),

      source: this.name,
      sourceTimestamp: now,
      isMock: false,
    };
  }
}

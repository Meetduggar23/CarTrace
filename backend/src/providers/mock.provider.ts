import { config } from "../config/env";
import type { VehicleRecord } from "../types/vehicle";
import { idFromQuery, stringOrNull } from "../utils/normalize";
import {
  extractRtoCode,
  requireValidRegistration,
  requireValidVin,
} from "../utils/validation";
import { rtoByCode, STATE_NAMES } from "../data/rto";
import type {
  ProviderHealthResult,
  VehicleProvider,
} from "./vehicle-provider.interface";

interface MockVehicleSpec {
  manufacturer: string;
  model: string;
  modelYear: string;
  fuelType: string;
  engineDisplacement: string;
  vehicleType: string;
  bodyType: string;
  transmission: string;
  color: string;
  variant?: string;
  enginePower?: string;
}

const MOCK_CATALOG: MockVehicleSpec[] = [
  {
    manufacturer: "Hyundai",
    model: "Creta",
    modelYear: "2024",
    fuelType: "Petrol",
    engineDisplacement: "1497 cc",
    enginePower: "113 hp",
    vehicleType: "SUV",
    bodyType: "SUV",
    transmission: "Manual",
    color: "Abyss Black",
    variant: "SX(O) 1.5",
  },
  {
    manufacturer: "Maruti Suzuki",
    model: "Swift",
    modelYear: "2023",
    fuelType: "Petrol",
    engineDisplacement: "1197 cc",
    enginePower: "88 hp",
    vehicleType: "Hatchback",
    bodyType: "Hatchback",
    transmission: "Automatic",
    color: "Pearl Arctic White",
    variant: "ZXI AMT",
  },
  {
    manufacturer: "Tata",
    model: "Nexon",
    modelYear: "2024",
    fuelType: "Petrol",
    engineDisplacement: "1199 cc",
    enginePower: "118 hp",
    vehicleType: "SUV",
    bodyType: "SUV",
    transmission: "Manual",
    color: "Flame Red",
    variant: "Fearless 1.2",
  },
  {
    manufacturer: "Mahindra",
    model: "Scorpio-N",
    modelYear: "2024",
    fuelType: "Diesel",
    engineDisplacement: "2198 cc",
    enginePower: "172 hp",
    vehicleType: "SUV",
    bodyType: "SUV",
    transmission: "Manual",
    color: "Napoli Black",
    variant: "Z8 2.2",
  },
  {
    manufacturer: "Honda",
    model: "City",
    modelYear: "2023",
    fuelType: "Petrol",
    engineDisplacement: "1498 cc",
    enginePower: "119 hp",
    vehicleType: "Sedan",
    bodyType: "Sedan",
    transmission: "Automatic",
    color: "Platinum White Pearl",
    variant: "ZX CVT",
  },
  {
    manufacturer: "Hyundai",
    model: "i20",
    modelYear: "2022",
    fuelType: "Petrol",
    engineDisplacement: "1197 cc",
    enginePower: "87 hp",
    vehicleType: "Hatchback",
    bodyType: "Hatchback",
    transmission: "Manual",
    color: "Polar White",
    variant: "Sportz 1.2",
  },
];

const KNOWN_SAMPLES: Record<string, number> = {
  MH12AB1234: 0, // Hyundai Creta
  DL01AB1234: 1, // Maruti Suzuki Swift
  RJ14AB1234: 2, // Tata Nexon
  KA01AB1234: 5, // Hyundai i20
  MH12CD5678: 3, // Mahindra Scorpio-N
  UP32AB4321: 4, // Honda City
};

const VIN_SAMPLES: Record<string, number> = {
  "1HGCM82633A123456": 4, // Honda (plausible VIN prefix)
  "5N1AT2MV7JC123456": 0, // Nissan/SUV-shaped
  "MA3EYD31S00557242": 2, // Maruti-shaped
};

/**
 * Development-only mock provider. Serves realistic sample data so the
 * whole product can be explored without API credentials. Every record is
 * flagged isMock=true and the frontend labels it as mock/development data.
 * Never enabled in production.
 */
export class MockProvider implements VehicleProvider {
  readonly id = "mock";
  readonly name = "Mock Provider (development)";
  readonly description =
    "Development-only sample data provider. Never available in production.";
  readonly capabilities = ["vin", "registration", "specs"] as const;
  readonly requiresAuth = false;
  readonly authConfigured = true;
  readonly countries = ["India", "United States", "Canada"];
  readonly isMock = true;

  isEnabled(): boolean {
    return config.mockProviderEnabled;
  }

  async decodeVin(vin: string): Promise<VehicleRecord> {
    const cleanVin = requireValidVin(vin);
    const index = VIN_SAMPLES[cleanVin] ?? this.pickIndex(cleanVin);
    const spec = MOCK_CATALOG[index];
    return this.buildRecord(cleanVin, spec, {
      lookupType: "vin",
      vin: cleanVin,
      registrationNumber: null,
    });
  }

  async lookupRegistration(reg: string): Promise<VehicleRecord> {
    const cleanReg = requireValidRegistration(reg);
    const index =
      KNOWN_SAMPLES[cleanReg] ?? this.pickIndex(cleanReg + "REG");
    const spec = MOCK_CATALOG[index];

    const { stateCode, rtoCode } = extractRtoCode(cleanReg);
    const rto = rtoByCode(rtoCode);
    const stateName = STATE_NAMES[stateCode] ?? null;

    return this.buildRecord(cleanReg, spec, {
      lookupType: "registration",
      registrationNumber: cleanReg,
      vin: null,
      rtoCode,
      rtoName: rto?.officeName ?? null,
      state: rto?.state ?? stateName,
      city: rto?.city ?? null,
      registrationDate: "2023-08-15",
      registrationExpiry: "2038-08-14",
      registrationAuthority: rto?.officeName ?? null,
      insuranceStatus: "Active",
      insuranceExpiry: "2026-08-14",
      pucStatus: "Valid",
      pucExpiry: "2026-02-14",
      fitnessStatus: "Valid",
      ownerInfo: "Registered owner (mock)",
      hypothecation: "None",
    });
  }

  async getVehicleSpecs(query: string): Promise<VehicleRecord | null> {
    const index = this.pickIndex(query + "SPECS");
    const spec = MOCK_CATALOG[index];
    return this.buildRecord(query, spec, {
      lookupType: "registration",
      registrationNumber: query,
      vin: null,
    });
  }

  async checkHealth(): Promise<ProviderHealthResult> {
    return {
      ok: this.isEnabled(),
      checkedAt: new Date().toISOString(),
      message: this.isEnabled() ? undefined : "Mock provider is disabled",
    };
  }

  private pickIndex(key: string): number {
    let hash = 0;
    for (let i = 0; i < key.length; i += 1) {
      hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
    }
    return hash % MOCK_CATALOG.length;
  }

  private buildRecord(
    query: string,
    spec: MockVehicleSpec,
    extra: Partial<VehicleRecord>
  ): VehicleRecord {
    const now = new Date().toISOString();
    const kind = extra.lookupType === "vin" ? "vin" : "reg";
    return {
      id: idFromQuery(`mock-${kind}`, query),
      lookupType: extra.lookupType ?? "registration",
      registrationNumber: extra.registrationNumber ?? null,
      vin: extra.vin ?? null,
      manufacturer: spec.manufacturer,
      make: spec.manufacturer,
      model: spec.model,
      variant: spec.variant ?? null,
      modelYear: spec.modelYear,
      vehicleType: spec.vehicleType,
      bodyType: spec.bodyType,
      fuelType: spec.fuelType,
      transmission: spec.transmission,
      driveType: null,
      color: spec.color,

      engine: spec.engineDisplacement,
      engineDisplacement: spec.engineDisplacement,
      engineCylinders: null,
      enginePower: spec.enginePower ?? null,
      torque: null,
      coolingType: null,
      engineCode: null,

      mileage: null,

      registrationDate: stringOrNull(extra.registrationDate),
      registrationExpiry: stringOrNull(extra.registrationExpiry),
      registrationAuthority: stringOrNull(extra.registrationAuthority),
      rtoCode: stringOrNull(extra.rtoCode),
      rtoName: stringOrNull(extra.rtoName),
      state: stringOrNull(extra.state),
      city: stringOrNull(extra.city),

      insuranceStatus: stringOrNull(extra.insuranceStatus),
      insuranceExpiry: stringOrNull(extra.insuranceExpiry),
      pucStatus: stringOrNull(extra.pucStatus),
      pucExpiry: stringOrNull(extra.pucExpiry),
      fitnessStatus: stringOrNull(extra.fitnessStatus),

      ownerInfo: stringOrNull(extra.ownerInfo),
      hypothecation: stringOrNull(extra.hypothecation),

      plantCity: null,
      plantCountry: null,

      source: this.name,
      sourceTimestamp: now,
      isMock: true,
      ...extra,
    };
  }
}

export const mockProvider = new MockProvider();

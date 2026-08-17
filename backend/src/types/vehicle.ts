/**
 * Internal, provider-agnostic vehicle record.
 *
 * Every provider response is normalized into this shape. All optional
 * fields are `null` when the provider does not return them — AutoCheck
 * never fabricates values.
 */
export interface VehicleRecord {
  id: string;
  lookupType: "registration" | "vin";
  registrationNumber: string | null;
  vin: string | null;

  manufacturer: string | null;
  make: string | null;
  model: string | null;
  variant: string | null;
  modelYear: string | null;
  vehicleType: string | null;
  bodyType: string | null;
  fuelType: string | null;
  transmission: string | null;
  driveType: string | null;
  color: string | null;

  engine: string | null;
  engineDisplacement: string | null;
  engineCylinders: string | null;
  enginePower: string | null;
  torque: string | null;
  coolingType: string | null;
  engineCode: string | null;

  mileage: string | null;

  registrationDate: string | null;
  registrationExpiry: string | null;
  registrationAuthority: string | null;
  rtoCode: string | null;
  rtoName: string | null;
  state: string | null;
  city: string | null;

  insuranceStatus: string | null;
  insuranceExpiry: string | null;
  pucStatus: string | null;
  pucExpiry: string | null;
  fitnessStatus: string | null;

  ownerInfo: string | null;
  hypothecation: string | null;

  plantCity: string | null;
  plantCountry: string | null;

  /** Human-readable provider name (e.g. "NHTSA vPIC"). */
  source: string;
  /** ISO timestamp of when the record was retrieved. */
  sourceTimestamp: string;
  /** True only for the development mock provider. */
  isMock: boolean;
}

export type LookupType = VehicleRecord["lookupType"];

export interface LookupRequest {
  type: LookupType;
  /** Normalized query (registration number without spaces or VIN). */
  query: string;
}

/** Result of a provider lookup, with cache metadata. */
export interface LookupResult {
  record: VehicleRecord;
  cached: boolean;
  providerId: string;
  providerName: string;
}

export interface ProviderHealth {
  id: string;
  name: string;
  ok: boolean;
  checkedAt: string;
  message?: string;
}

/** What a provider can do. */
export type ProviderCapability = "vin" | "registration" | "specs";

export interface ProviderInfo {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  requiresAuth: boolean;
  authConfigured: boolean;
  capabilities: ProviderCapability[];
  countries: string[];
  isMock: boolean;
  lastChecked: string | null;
  status: "connected" | "unavailable" | "disabled" | "unknown";
  message?: string;
}

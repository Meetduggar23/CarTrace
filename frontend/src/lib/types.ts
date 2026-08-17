export type LookupType = "registration" | "vin";

export interface VehicleRecord {
  id: string;
  lookupType: LookupType;
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

  source: string;
  sourceTimestamp: string;
  isMock: boolean;
}

export interface LookupResult {
  record: VehicleRecord;
  cached: boolean;
  providerId: string;
  providerName: string;
}

export type ErrorCode =
  | "VALIDATION_ERROR"
  | "VEHICLE_NOT_FOUND"
  | "UNSUPPORTED_LOOKUP"
  | "PROVIDER_UNAVAILABLE"
  | "RATE_LIMITED"
  | "UNAUTHORIZED"
  | "CONFLICT"
  | "DATABASE_REQUIRED"
  | "INTERNAL_ERROR"
  | "NOT_FOUND"
  | "NETWORK_ERROR";

export class ApiError extends Error {
  code: ErrorCode;
  status: number;
  details?: unknown;

  constructor(code: ErrorCode, message: string, status = 0, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

export interface RtoEntry {
  code: string;
  stateCode: string;
  state: string;
  city: string;
  officeName: string;
  location: string;
  services: string[];
  contact: null;
}

export interface ProviderInfo {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  requiresAuth: boolean;
  authConfigured: boolean;
  capabilities: ("vin" | "registration" | "specs")[];
  countries: string[];
  isMock: boolean;
  lastChecked: string | null;
  status: "connected" | "unavailable" | "disabled" | "unknown";
  message?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
}

export interface SavedVehicle {
  id: string;
  userId: string;
  registrationNumber: string | null;
  vin: string | null;
  manufacturer: string | null;
  model: string | null;
  modelYear: string | null;
  fuelType: string | null;
  customName: string | null;
  vehicleData: VehicleRecord | null;
  createdAt: string;
  updatedAt: string;
}

export interface HistoryEntry {
  id: string;
  lookupType: LookupType;
  query: string;
  result: VehicleRecord | null;
  createdAt: string;
}

export interface GuestHistoryEntry {
  query: string;
  lookupType: LookupType;
  label: string | null;
  checkedAt: string;
}

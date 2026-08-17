import type {
  ProviderCapability,
  VehicleRecord,
} from "../types/vehicle";

export interface ProviderHealthResult {
  ok: boolean;
  checkedAt: string;
  message?: string;
}

/**
 * A vehicle data provider. Implementations normalize every response into
 * the application's VehicleRecord model (see types/vehicle.ts).
 *
 * Providers may throw:
 *  - VehicleNotFoundError  when the query is well-formed but has no record
 *  - UnsupportedLookupError when the provider does not support the lookup
 *  - RateLimitError        when the provider rate-limits the request
 *  - ProviderUnavailableError when the provider is unreachable/misconfigured
 */
export interface VehicleProvider {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly capabilities: readonly ProviderCapability[];
  /** True when the provider requires an API key/account. */
  readonly requiresAuth: boolean;
  /** True when required credentials are present in the environment. */
  readonly authConfigured: boolean;
  /** Countries/regions the provider covers. */
  readonly countries: string[];
  /** True only for the development mock provider. */
  readonly isMock: boolean;

  isEnabled(): boolean;

  decodeVin(vin: string): Promise<VehicleRecord>;
  lookupRegistration(reg: string): Promise<VehicleRecord>;
  getVehicleSpecs(query: string): Promise<VehicleRecord | null>;

  checkHealth(): Promise<ProviderHealthResult>;
}

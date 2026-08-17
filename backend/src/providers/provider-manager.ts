import { UnsupportedLookupError } from "../types/errors";
import type {
  LookupType,
  ProviderCapability,
  ProviderHealth,
  ProviderInfo,
  VehicleRecord,
} from "../types/vehicle";
import { CarApiProvider } from "./car-api.provider";
import { MockProvider } from "./mock.provider";
import { NhtsaProvider } from "./nhtsa.provider";
import type { VehicleProvider } from "./vehicle-provider.interface";

export class ProviderManager {
  private readonly providers: VehicleProvider[] = [];
  private healthCache = new Map<string, ProviderHealth>();

  constructor(providers: VehicleProvider[]) {
    this.providers = providers;
  }

  /** Providers that are enabled (available) right now. */
  getEnabledProviders(): VehicleProvider[] {
    return this.providers.filter((p) => p.isEnabled());
  }

  /**
   * Choose a provider for a lookup type. Real providers are preferred over
   * the mock provider. Throws UnsupportedLookupError when nothing can
   * serve the lookup.
   */
  selectFor(type: LookupType): VehicleProvider {
    const capability: ProviderCapability =
      type === "vin" ? "vin" : "registration";
    const candidates = this.getEnabledProviders()
      .filter((p) => p.capabilities.includes(capability))
      .sort((a, b) => Number(a.isMock) - Number(b.isMock));
    if (candidates.length === 0) {
      throw new UnsupportedLookupError(
        type === "registration"
          ? "This lookup type is currently unavailable with the configured provider."
          : "VIN lookup is currently unavailable with the configured provider."
      );
    }
    return candidates[0];
  }

  /** Decode a VIN through the best available provider. */
  async decodeVin(vin: string): Promise<VehicleRecord> {
    const provider = this.selectFor("vin");
    return provider.decodeVin(vin);
  }

  /** Registration lookup through the best available provider. */
  async lookupRegistration(reg: string): Promise<VehicleRecord> {
    const provider = this.selectFor("registration");
    return provider.lookupRegistration(reg);
  }

  /** Which provider would serve a lookup (used for transparency). */
  providerFor(type: LookupType): VehicleProvider | null {
    try {
      return this.selectFor(type);
    } catch {
      return null;
    }
  }

  async refreshHealth(): Promise<ProviderHealth[]> {
    const results: ProviderHealth[] = [];
    for (const provider of this.providers) {
      const health = await this.check(provider);
      this.healthCache.set(provider.id, health);
      results.push(health);
    }
    return results;
  }

  /** Provider info snapshot for the /api/providers endpoint. */
  async getProviderInfo(): Promise<ProviderInfo[]> {
    const info: ProviderInfo[] = [];
    for (const provider of this.providers) {
      const cached = this.healthCache.get(provider.id);
      const fresh =
        cached && Date.now() - new Date(cached.checkedAt).getTime() < 60_000;
      const health = fresh ? cached : await this.check(provider);
      this.healthCache.set(provider.id, health);
      info.push({
        id: provider.id,
        name: provider.name,
        description: provider.description,
        enabled: provider.isEnabled(),
        requiresAuth: provider.requiresAuth,
        authConfigured: provider.authConfigured,
        capabilities: [...provider.capabilities],
        countries: [...provider.countries],
        isMock: provider.isMock,
        lastChecked: health.checkedAt,
        status: !provider.isEnabled()
          ? "disabled"
          : health.ok
            ? "connected"
            : "unavailable",
        message: health.message,
      });
    }
    return info;
  }

  private async check(
    provider: VehicleProvider
  ): Promise<ProviderHealth> {
    if (!provider.isEnabled()) {
      return {
        id: provider.id,
        name: provider.name,
        ok: false,
        checkedAt: new Date().toISOString(),
        message: "Disabled",
      };
    }
    const res = await provider.checkHealth();
    return {
      id: provider.id,
      name: provider.name,
      ok: res.ok,
      checkedAt: res.checkedAt,
      message: res.message,
    };
  }
}

/**
 * Singleton manager with every registered provider.
 * To add a provider later: implement VehicleProvider and register it here.
 */
export const providerManager = new ProviderManager([
  new NhtsaProvider(), // free, no key — always enabled
  new CarApiProvider(), // enabled only when CARAPI_API_KEY is set
  new MockProvider(), // development-only sample data
]);

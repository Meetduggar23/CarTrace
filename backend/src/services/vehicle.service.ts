import { getCache } from "../cache";
import { config } from "../config/env";
import { providerManager } from "../providers/provider-manager";
import { VehicleNotFoundError } from "../types/errors";
import type { LookupResult, LookupType, VehicleRecord } from "../types/vehicle";
import { requireValidRegistration, requireValidVin } from "../utils/validation";
import type { Prisma } from "../generated/prisma";

export interface LookupOptions {
  /** When provided, the lookup is recorded in the user's search history. */
  userId?: string;
  /** Skip caching (used by tests and health checks). */
  noCache?: boolean;
}

function cacheKey(providerId: string, type: LookupType, query: string): string {
  return `vehicle:${providerId}:${type}:${query}`;
}

export class VehicleService {
  /** Normalize + cache a provider result. */
  async searchRegistration(
    rawRegistration: string,
    options: LookupOptions = {}
  ): Promise<LookupResult> {
    const reg = requireValidRegistration(rawRegistration);
    return this.lookup("registration", reg, options);
  }

  async decodeVin(rawVin: string, options: LookupOptions = {}): Promise<LookupResult> {
    const vin = requireValidVin(rawVin);
    return this.lookup("vin", vin, options);
  }

  private async lookup(
    type: LookupType,
    query: string,
    options: LookupOptions
  ): Promise<LookupResult> {
    const provider = providerManager.selectFor(type);
    const key = cacheKey(provider.id, type, query);
    const cache = getCache();

    if (!options.noCache) {
      const cached = await cache.get<VehicleRecord>(key);
      if (cached) {
        return {
          record: cached,
          cached: true,
          providerId: provider.id,
          providerName: provider.name,
        };
      }
    }

    const record =
      type === "vin"
        ? await provider.decodeVin(query)
        : await provider.lookupRegistration(query);

    if (!record || (type === "vin" && !record.vin && !record.manufacturer)) {
      throw new VehicleNotFoundError();
    }

    if (!options.noCache) {
      await cache.set(key, record, config.vehicleCacheTtlSeconds);
    }

    if (options.userId) {
      await this.recordHistory(options.userId, type, query, record).catch(
        () => undefined
      );
    }

    return {
      record,
      cached: false,
      providerId: provider.id,
      providerName: provider.name,
    };
  }

  private async recordHistory(
    userId: string,
    lookupType: LookupType,
    query: string,
    result: VehicleRecord
  ): Promise<void> {
    const { getPrisma } = await import("../db/prisma");
    const prisma = getPrisma();
    if (!prisma) return;      await prisma.searchHistory.create({
        data: {
          userId,
          lookupType,
          query,
          result: result as unknown as Prisma.InputJsonValue,
        },
      });
  }
}

export const vehicleService = new VehicleService();

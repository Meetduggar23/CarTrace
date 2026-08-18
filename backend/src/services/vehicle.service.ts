import { getCache } from "../cache";
import { config } from "../config/env";
import { providerManager } from "../providers/provider-manager";
import {
  ProviderUnavailableError,
  VehicleNotFoundError,
} from "../types/errors";
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
    const candidates = providerManager.getCandidatesFor(type);
    if (candidates.length === 0) {
      throw new ProviderUnavailableError(
        type === "registration"
          ? "This lookup type is currently unavailable with the configured provider."
          : "VIN lookup is currently unavailable with the configured provider."
      );
    }

    const cache = getCache();
    if (!options.noCache) {
      // Try every provider's cache entry before hitting the network.
      for (const provider of candidates) {
        const cached = await cache.get<VehicleRecord>(
          cacheKey(provider.id, type, query)
        );
        if (cached) {
          if (options.userId) {
            await this.recordHistory(options.userId, type, query, cached).catch(
              () => undefined
            );
          }
          return {
            record: cached,
            cached: true,
            providerId: provider.id,
            providerName: provider.name,
          };
        }
      }
    }

    // Try providers in order, falling back to the next one on any failure.
    let lastError: unknown;
    for (const provider of candidates) {
      try {
        const record =
          type === "vin"
            ? await provider.decodeVin(query)
            : await provider.lookupRegistration(query);

        if (!record || (type === "vin" && !record.vin && !record.manufacturer)) {
          throw new VehicleNotFoundError();
        }

        if (!options.noCache) {
          await cache.set(
            cacheKey(provider.id, type, query),
            record,
            config.vehicleCacheTtlSeconds
          );
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
      } catch (err) {
        lastError = err;
      }
    }

    // Every provider failed. Prefer the most specific error we saw: if none
    // found the vehicle, report that; otherwise report the provider failure.
    if (lastError instanceof VehicleNotFoundError) {
      throw lastError;
    }
    if (lastError instanceof Error) {
      throw new ProviderUnavailableError(lastError.message);
    }
    throw new ProviderUnavailableError(
      "The vehicle data provider could not be reached. Please try again later."
    );
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

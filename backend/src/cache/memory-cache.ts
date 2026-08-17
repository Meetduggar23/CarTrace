import type { Cache } from "./cache.interface";

interface CacheEntry {
  value: unknown;
  expiresAt: number;
}

/**
 * Simple in-process TTL cache. Suitable for single-instance deployments;
 * swap in Redis (see redis-cache.ts) for multi-instance setups.
 */
export class MemoryCache implements Cache {
  readonly enabled = true;
  private store = new Map<string, CacheEntry>();

  async get<T>(key: string): Promise<T | null> {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }
    return entry.value as T;
  }

  async set<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
    this.store.set(key, {
      value,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
    this.prune();
  }

  async del(key: string): Promise<void> {
    this.store.delete(key);
  }

  private prune(): void {
    if (this.store.size < 10_000) return;
    const now = Date.now();
    for (const [key, entry] of this.store) {
      if (now > entry.expiresAt) this.store.delete(key);
    }
  }
}

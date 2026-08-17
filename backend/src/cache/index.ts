import { config } from "../config/env";
import type { Cache } from "./cache.interface";
import { MemoryCache } from "./memory-cache";
import { RedisCache } from "./redis-cache";

let cacheInstance: Cache | null = null;

export function getCache(): Cache {
  if (!cacheInstance) {
    cacheInstance = config.redisUrl ? new RedisCache() : new MemoryCache();
  }
  return cacheInstance;
}

/** For tests: reset the singleton. */
export function resetCacheForTest(): void {
  cacheInstance = null;
}

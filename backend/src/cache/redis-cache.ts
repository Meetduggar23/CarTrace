import Redis from "ioredis";
import { config } from "../config/env";
import { logger } from "../utils/logger";
import type { Cache } from "./cache.interface";

/**
 * Redis-backed cache, used when REDIS_URL is configured. Falls back to a
 * no-op cache when Redis is unreachable so lookups still work.
 */
export class RedisCache implements Cache {
  readonly enabled = true;
  private client: Redis | null = null;
  private failed = false;

  constructor() {
    if (!config.redisUrl) return;
    this.client = new Redis(config.redisUrl, {
      lazyConnect: true,
      maxRetriesPerRequest: 1,
      connectTimeout: 3_000,
      // Keep retrying with capped exponential backoff so the cache can
      // recover if Redis comes back instead of degrading permanently.
      retryStrategy: (times: number) =>
        Math.min(500 * 2 ** Math.min(times, 6), 30_000),
    });
    this.client.on("ready", () => {
      if (this.failed) {
        this.failed = false;
        logger.info("[cache] Redis connection restored");
      }
    });
    this.client.on("error", (err: Error) => {
      if (!this.failed) {
        this.failed = true;
        logger.warn("[cache] Redis unavailable; using no-op cache", {
          error: err.message,
        });
      }
    });
    this.client.connect().catch(() => {
      this.failed = true;
    });
  }

  private available(): boolean {
    return Boolean(this.client && !this.failed);
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this.available()) return null;
    try {
      const raw = await this.client!.get(key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  }

  async set<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
    if (!this.available()) return;
    try {
      await this.client!.set(key, JSON.stringify(value), "EX", ttlSeconds);
    } catch {
      // ignore — cache is best-effort
    }
  }

  async del(key: string): Promise<void> {
    if (!this.available()) return;
    try {
      await this.client!.del(key);
    } catch {
      // ignore
    }
  }
}

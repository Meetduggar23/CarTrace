import { ProviderUnavailableError } from "../types/errors";
import { logger } from "./logger";

export interface HttpOptions {
  timeoutMs?: number;
  retries?: number;
  headers?: Record<string, string>;
}

export interface HttpResponse {
  status: number;
  body: unknown;
  headers: Headers;
}

const DEFAULT_TIMEOUT_MS = 10_000;
const DEFAULT_RETRIES = 2;

async function fetchOnce(
  url: string,
  options: HttpOptions
): Promise<HttpResponse> {
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "CarTraceAPI/1.0",
        ...options.headers,
      },
      signal: controller.signal,
    });
    const text = await res.text();
    let body: unknown = text;
    if (text) {
      try {
        body = JSON.parse(text);
      } catch {
        body = text;
      }
    }
    return { status: res.status, body, headers: res.headers };
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new ProviderUnavailableError(
        `The vehicle data provider timed out after ${timeoutMs}ms.`
      );
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * GET a JSON resource with timeout and retry-on-transient-failure.
 * Throws ProviderUnavailableError when the provider cannot be reached.
 */
export async function fetchJson(
  url: string,
  options: HttpOptions = {}
): Promise<HttpResponse> {
  const retries = options.retries ?? DEFAULT_RETRIES;
  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    if (attempt > 0) {
      await new Promise((r) => setTimeout(r, 300 * attempt));
    }
    try {
      const response = await fetchOnce(url, options);
      if (response.status >= 500 && attempt < retries) {
        lastError = new Error(`Provider returned HTTP ${response.status}`);
        continue;
      }
      return response;
    } catch (err) {
      lastError = err;
      // Timeouts (ProviderUnavailableError) are transient; retry until the
      // last attempt, then surface the provider-unavailable error directly.
      if (attempt >= retries) {
        if (err instanceof ProviderUnavailableError) throw err;
        break;
      }
    }
  }

  logger.warn(`[http] request failed after ${retries + 1} attempts: ${url}`, {
    error: String(lastError),
  });
  throw new ProviderUnavailableError(
    lastError instanceof Error
      ? `The vehicle data provider could not be reached (${lastError.message}). Please try again later.`
      : "The vehicle data provider could not be reached. Please try again later."
  );
}

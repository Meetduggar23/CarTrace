import { API_URL, AUTH_TOKEN_KEY } from "@/lib/constants";
import {
  ApiError,
  type ErrorCode,
  type HistoryEntry,
  type LookupResult,
  type ProviderInfo,
  type RtoEntry,
  type SavedVehicle,
  type User,
} from "@/lib/types";

function getToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

async function request<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init.headers as Record<string, string> | undefined),
  };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...init,
      headers,
      signal: AbortSignal.timeout(20_000),
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === "TimeoutError") {
      throw new ApiError(
        "PROVIDER_UNAVAILABLE",
        "The request timed out. Please try again.",
        0
      );
    }
    throw new ApiError(
      "NETWORK_ERROR",
      "We couldn't reach the AutoCheck service. Check your connection and try again.",
      0
    );
  }

  if (res.status === 204) {
    return undefined as T;
  }

  const body = (await res.json().catch(() => null)) as
    | { data?: T; error?: { code: string; message: string; details?: unknown } }
    | null;

  if (!res.ok) {
    const code = (body?.error?.code ?? "INTERNAL_ERROR") as ErrorCode;
    const message =
      body?.error?.message ??
      "Something went wrong on our side. Please try again later.";
    throw new ApiError(code, message, res.status, body?.error?.details);
  }

  if (body && "data" in body) return body.data as T;
  return body as T;
}

export const api = {
  // --- Vehicle ---
  searchRegistration(registrationNumber: string): Promise<LookupResult> {
    return request<LookupResult>("/api/vehicle/search", {
      method: "POST",
      body: JSON.stringify({ registrationNumber }),
    });
  },
  decodeVin(vin: string): Promise<LookupResult> {
    return request<LookupResult>("/api/vehicle/vin", {
      method: "POST",
      body: JSON.stringify({ vin }),
    });
  },
  vehicleByRegistration(registrationNumber: string): Promise<LookupResult> {
    return request<LookupResult>(`/api/vehicle/${encodeURIComponent(registrationNumber)}`);
  },
  vehicleByVin(vin: string): Promise<LookupResult> {
    return request<LookupResult>(`/api/vehicle/vin/${encodeURIComponent(vin)}`);
  },

  // --- RTO ---
  listRto(params: { q?: string; state?: string; city?: string }): Promise<{
    results: RtoEntry[];
    total: number;
    stats: { total: number; states: number };
  }> {
    const search = new URLSearchParams();
    if (params.q) search.set("q", params.q);
    if (params.state) search.set("state", params.state);
    if (params.city) search.set("city", params.city);
    const qs = search.toString();
    return request(`/api/rto${qs ? `?${qs}` : ""}`);
  },
  rtoByCode(code: string): Promise<RtoEntry> {
    return request(`/api/rto/${encodeURIComponent(code)}`);
  },

  // --- Providers ---
  providers(): Promise<ProviderInfo[]> {
    return request("/api/providers");
  },

  // --- Auth ---
  register(input: {
    name: string;
    email: string;
    password: string;
  }): Promise<{ user: User; token: string }> {
    return request("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },
  login(input: { email: string; password: string }): Promise<{ user: User; token: string }> {
    return request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },
  me(): Promise<{ user: User }> {
    return request("/api/auth/me");
  },

  // --- Saved vehicles ---
  listVehicles(): Promise<{ vehicles: SavedVehicle[] }> {
    return request("/api/user/vehicles");
  },
  saveVehicle(record: unknown, customName?: string): Promise<{ vehicle: SavedVehicle }> {
    return request("/api/user/vehicles", {
      method: "POST",
      body: JSON.stringify({ record, customName }),
    });
  },
  renameVehicle(id: string, customName: string): Promise<{ vehicle: SavedVehicle }> {
    return request(`/api/user/vehicles/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ customName }),
    });
  },
  deleteVehicle(id: string): Promise<{ deleted: boolean }> {
    return request(`/api/user/vehicles/${id}`, { method: "DELETE" });
  },

  // --- History ---
  listHistory(): Promise<{ history: HistoryEntry[] }> {
    return request("/api/user/history");
  },
  clearHistory(): Promise<{ deleted: boolean }> {
    return request("/api/user/history", { method: "DELETE" });
  },
};

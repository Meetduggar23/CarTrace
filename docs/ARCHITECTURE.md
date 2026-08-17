# Architecture

AutoCheck is a full-stack vehicle-information platform with a provider
abstraction at its core. Third-party vehicle APIs are never called directly
from the browser — all lookups go through the backend, which normalizes
provider responses into a single internal model.

```text
┌──────────────────────┐     ┌──────────────────────┐     ┌──────────────────────┐
│   React frontend     │     │   Express backend    │     │  Vehicle providers   │
│  (Vite + TS + TW)    │ ──► │  (TS, provider       │ ──► │  NHTSA vPIC, CarAPI,  │
│  Dashboard/UX        │ ◄── │   manager, cache)    │ ◄── │  Mock (dev only)     │
└──────────────────────┘     └──────────────────────┘     └──────────────────────┘
                                   │           │
                                   ▼           ▼
                          ┌────────────┐  ┌────────────┐
                          │ PostgreSQL │  │ Cache      │
                          │ (Prisma)   │  │ (Redis or  │
                          │ optional   │  │  memory)   │
                          └────────────┘  └────────────┘
```

## Directory layout

```text
backend/src/
├── app.ts                 Express app factory (helmet, CORS, JSON, routes)
├── index.ts               Bootstrap + graceful shutdown
├── config/env.ts          Zod-validated environment configuration
├── providers/
│   ├── vehicle-provider.interface.ts   The VehicleProvider contract
│   ├── nhtsa.provider.ts               Free, key-less VIN decode (real)
│   ├── car-api.provider.ts             Freemium plug-in (key required)
│   ├── mock.provider.ts                Development-only sample data
│   └── provider-manager.ts             Selects the best provider per lookup
├── services/              vehicle, rto, user (auth/saved/history)
├── controllers/           Thin HTTP layer over services
├── routes/                Express routers
├── middleware/            auth, rate limiting, errors, logging
├── cache/                 MemoryCache / RedisCache behind a Cache interface
├── auth/                  bcrypt hashing + JWT
├── db/                    Lazy Prisma client (degrades when no DB)
├── data/rto.ts            Curated public RTO directory dataset
└── utils/                 validation, normalization, http, logging

frontend/src/
├── services/              api client, auth, theme, guest history, compare
├── components/            ui primitives, layout, search, vehicle, rto, common
├── pages/                 One file per route (lazy-loaded)
├── lib/                   constants, types, utils, validation, format
└── main.tsx / App.tsx     Providers + router

prisma/schema.prisma       User, Vehicle, SearchHistory, Rto
docs/                      Architecture, providers, API, RTO data
```

## Provider abstraction

Every provider implements `VehicleProvider`:

```ts
interface VehicleProvider {
  id, name, description, capabilities, requiresAuth, authConfigured,
  countries, isMock,
  isEnabled(): boolean;
  decodeVin(vin): Promise<VehicleRecord>;
  lookupRegistration(reg): Promise<VehicleRecord>;
  getVehicleSpecs(query): Promise<VehicleRecord | null>;
  checkHealth(): Promise<ProviderHealthResult>;
}
```

The `ProviderManager`:

1. filters enabled providers,
2. keeps only providers whose `capabilities` include the requested lookup,
3. prefers real providers over the mock provider,
4. throws `UnsupportedLookupError` when nothing can serve the lookup —
   surfaced to the UI as “This lookup type is currently unavailable with the
   configured provider.”

**Adding a provider later**: implement the interface, register it in
`provider-manager.ts`, set its env vars. No other code changes are needed.

## Data normalization

Provider responses are normalized into `VehicleRecord` (see
`backend/src/types/vehicle.ts`). Every optional field is `null` when the
provider does not return it — the UI renders “Not available from this source”
instead of fabricating values. Provider-specific field mapping lives inside
each provider's `normalize()` method.

## Caching

Lookups flow through a `Cache` interface:

```text
registration number → validate → cache lookup → cached? → return
                                                no → provider API → normalize → cache → return
```

- Default: in-memory TTL cache (MemoryCache).
- With `REDIS_URL`: RedisCache.
- Cache keys include the provider id so switching providers never serves
  stale cross-provider data.
- TTL is configurable via `VEHICLE_CACHE_TTL` (default 1 hour) and never
  exceeds what the provider permits.

## Database behavior

`DATABASE_URL` is optional. When unset:

- `/api/health` reports `database.configured: false`,
- auth / saved-vehicles / history endpoints return
  `{ error: { code: "DATABASE_REQUIRED" } }`,
- everything else (vehicle search, RTO, providers) keeps working.

When set, Prisma provides users, saved vehicles and per-user search history.

## Security

- Helmet security headers, strict CORS allow-list
- Rate limiting on the API, with a stricter limit for auth and search routes
- Zod request validation; no raw input reaches providers
- Server-side API keys only — never in frontend JavaScript
- bcrypt password hashing, signed JWTs, no passwords in responses
- Structured errors; unknown errors return a generic 500 without leaking details

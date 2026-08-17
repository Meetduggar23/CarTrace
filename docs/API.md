# Backend API

Base URL: `http://localhost:4000` (dev). All responses are JSON.

## Success shape

```json
{ "data": { ... } }
```

## Error shape

```json
{ "error": { "code": "VEHICLE_NOT_FOUND", "message": "...", "details": {} } }
```

| Code | HTTP | Meaning |
| --- | --- | --- |
| `VALIDATION_ERROR` | 400 | Invalid/missing input |
| `UNAUTHORIZED` | 401 | Missing/invalid token |
| `FORBIDDEN` | 403 | No permission |
| `NOT_FOUND` | 404 | Route or resource not found |
| `VEHICLE_NOT_FOUND` | 404 | Well-formed query, no record |
| `CONFLICT` | 409 | Duplicate resource (e.g. saved vehicle) |
| `UNSUPPORTED_LOOKUP` | 422 | Provider cannot serve this lookup |
| `RATE_LIMITED` | 429 | Rate limit exceeded |
| `PROVIDER_UNAVAILABLE` | 503 | Provider down/misconfigured |
| `DATABASE_REQUIRED` | 503 | Feature needs DATABASE_URL |

## Endpoints

### Health

`GET /api/health` — status, database config/connectivity, enabled providers.

### Vehicle

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| POST | `/api/vehicle/search` | optional | `{ "registrationNumber": "MH12AB1234" }` |
| POST | `/api/vehicle/vin` | optional | `{ "vin": "1HGCM82633A123456" }` |
| GET | `/api/vehicle/:registration` | optional | Path-based registration lookup |
| GET | `/api/vehicle/vin/:vin` | optional | Path-based VIN decode |

Response `data`:

```json
{
  "record": { "...": "normalized VehicleRecord" },
  "cached": false,
  "providerId": "nhtsa",
  "providerName": "NHTSA vPIC"
}
```

Vehicle lookups are cached (in-memory or Redis) for `VEHICLE_CACHE_TTL`.

### RTO

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/rto` | `?q=`, `?state=MH`, `?city=pune` — search directory |
| GET | `/api/rto/:code` | e.g. `/api/rto/MH-12` |

### Providers

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/providers` | Status, auth state, capabilities of each provider |

### Auth

| Method | Path | Description |
| --- | --- | --- |
| POST | `/api/auth/register` | `{ name, email, password }` → `{ user, token }` |
| POST | `/api/auth/login` | `{ email, password }` → `{ user, token }` |
| GET | `/api/auth/me` | Current user (Bearer token) |

### Saved vehicles (Bearer token required)

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/user/vehicles` | List saved vehicles |
| POST | `/api/user/vehicles` | `{ record, customName? }` — save a vehicle |
| PATCH | `/api/user/vehicles/:id` | `{ customName }` — rename |
| DELETE | `/api/user/vehicles/:id` | Remove |

### Search history (Bearer token required)

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/user/history` | Recent lookups (max 50) |
| DELETE | `/api/user/history` | Clear history |

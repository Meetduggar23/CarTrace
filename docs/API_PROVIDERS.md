# Vehicle Data Providers

CarTrace verifies providers against the Public APIs community collection
(https://github.com/public-apis/public-apis, Vehicle category) before wiring
them in. The table below reflects what was verified at implementation time.

## Verified providers

### 1. NHTSA vPIC — the primary real provider (default, no key)

| | |
| --- | --- |
| URL | https://vpic.nhtsa.dot.gov/api/ |
| Auth | None — free, no signup |
| HTTPS | Yes |
| CORS | Yes (we also route through the backend) |
| Rate limits | None published (“within reason”) |
| Countries | United States, Canada (market vehicles) |
| VIN support | ✅ DecodeVinValues — full 17-char VIN decode |
| Registration support | ❌ Not provided for any country |
| Specs support | ✅ via VIN decode (make, model, year, engine, fuel, body) |

NHTSA vPIC is the official US Department of Transportation vehicle product
information catalog. Responses are normalized from its `DecodeVinValues`
endpoint. `ErrorCode !== "0"` maps to `VEHICLE_NOT_FOUND` with the provider's
own error text.

### 2. Mock Provider (development only)

| | |
| --- | --- |
| Env | `MOCK_VEHICLE_PROVIDER=true` (default in development) |
| Auth | None |
| VIN support | ✅ (sample data) |
| Registration support | ✅ (sample data, incl. RTO metadata from the RTO dataset) |
| Specs support | ✅ (sample data) |

Every mock record is flagged `isMock: true` and labeled in the UI. Mock mode
is **never** available when `NODE_ENV=production` — production responses
cannot contain mock data.

### 3. CarAPI (optional plug-in, disabled by default)

| | |
| --- | --- |
| Env | `CARAPI_API_KEY` (activates the provider), `CARAPI_API_BASE_URL` |
| Auth | Bearer API key (freemium; free tier has daily caps) |
| VIN support | ✅ |
| Registration support | ❌ |
| Specs support | ✅ |

The provider is written defensively against CarAPI's public v4 shape
(case-insensitive candidate-key mapping). Because CarAPI requires an account,
**verify the response fields against your account's live API docs** after
configuring the key, and adjust the `normalize()` mapping if needed.

## What is honestly not available

- **Indian RTO registration lookup (RC details, owner info, insurance/PUC/
  fitness status)** is NOT available through any free/public API. CarTrace
  does not claim otherwise: with real providers configured, registration
  lookups return “This lookup type is currently unavailable with the
  configured provider.”
- Registration/RTO/insurance/PUC/fitness sections only render when the active
  provider actually returns that data.
- Vehicle photos are never fabricated: when a provider returns no image,
  CarTrace shows a generic illustration.

## Enabling / disabling

| Scenario | Config |
| --- | --- |
| Full mock mode (no credentials) | `MOCK_VEHICLE_PROVIDER=true` (dev default) |
| Real VIN decoding only | `MOCK_VEHICLE_PROVIDER=false` (NHTSA works key-less) |
| Add CarAPI | set `CARAPI_API_KEY` |
| Production | mock is force-disabled |

Provider status, authentication state and capabilities are visible at
`GET /api/providers` and on the frontend `/providers` page.

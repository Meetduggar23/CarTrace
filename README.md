<p align="center">
  <img src="logo/logo.png" alt="AutoCheck logo" width="360" />
</p>

**Vehicle Information & Registration Checker**

AutoCheck is a modern vehicle-information platform. Enter a vehicle registration
number or a VIN and view publicly available vehicle information — specifications,
registration details where supported, and data-source transparency — in a premium,
responsive dashboard.

> **Important:** AutoCheck is an independent product. It is not affiliated with
> CarInfo or any RTO/government authority, and it only displays information made
> available through supported public/API sources. It does not guarantee the
> completeness, accuracy, or official status of any record.

---

## Features

- **Vehicle search** — registration-number and VIN lookup with validation, format
  detection, recent searches and a polished search experience
- **VIN decoding** — powered by the free, key-less [NHTSA vPIC API](https://vpic.nhtsa.dot.gov/api/)
  (official US Department of Transportation data; US/Canada market vehicles)
- **RTO directory** — RTO codes, offices and cities from standardized public RTO
  code listings
- **Vehicle comparison** — side-by-side comparison of two vehicles
- **Saved vehicles & search history** — persistent for logged-in users, local
  history for guests
- **Single premium theme** — black & gold automotive palette (black `#0A0A0A`, gold `#D4AF37`, deep burgundy `#5A0F1B`, warm ivory `#F5F0E6`) with no theme toggle
- **Provider abstraction** — swap in additional vehicle-data providers without
  rewriting the application
- **Mock mode** — run the entire app without any API credentials (development only,
  clearly labeled)

## Honest data-availability note

- NHTSA vPIC provides **VIN decoding for US/Canada market vehicles** — free, no key.
- **No free/public API provides Indian RTO registration lookups** (RC details,
  owner info, insurance/PUC/fitness status). When a lookup type is unsupported by
  the configured provider, AutoCheck clearly reports
  *"This lookup type is currently unavailable with the configured provider"* instead
  of fabricating data.
- Registration/RTO/insurance/PUC/fitness sections only render when the active
  provider actually returns that data. AutoCheck never invents vehicle information.

## Branding

The site logo lives in `logo/logo.png` (project root). The frontend serves a copy
from `frontend/public/logo.png` and renders it across the navbar, footer, auth
pages, hero and loading screens via the `Logo` component. To change the brand
image, replace `logo/logo.png` and re-copy it to `frontend/public/logo.png`
(favicon assets in `frontend/public/favicon.png` / `apple-touch-icon.png` are
generated from it). The product name itself is configured in one place:
`frontend/src/lib/constants.ts` (`SITE.name`).

## Project structure

```text
vehicle-information-checker/
├── frontend/     React + TypeScript + Vite + Tailwind CSS
├── backend/      Node.js + TypeScript + Express + Prisma
├── prisma/       Prisma schema and seed
├── docs/         Architecture, providers and API documentation
├── .env.example  Environment template
└── package.json  npm workspaces root
```

## Getting started

Requirements: Node.js 20+ and npm 11+.

```bash
npm install

# 1. Configure environment
cp .env.example .env

# 2. Generate Prisma client (works without a live database)
npm run db:generate

# 3. Start backend and frontend in development
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:4000 (health check: `GET /api/health`)

With the default `.env` (`MOCK_VEHICLE_PROVIDER=true` and no database URL), the app
runs fully in **mock mode**: every lookup returns realistic sample data clearly
labeled as mock/development data. Set `MOCK_VEHICLE_PROVIDER=false` to use only
real providers (NHTSA VIN decode works without any key).

### Database (optional)

Auth, saved vehicles and per-user search history require PostgreSQL:

```bash
# Set DATABASE_URL in .env, then:
npm run db:migrate   # create schema
npm run db:seed      # optional RTO seed data
```

### Tests

```bash
npm test             # backend + frontend
npm run typecheck    # TypeScript across both packages
```

## Environment variables

See `.env.example` for the full list with comments. Key ones:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string (optional at runtime) |
| `REDIS_URL` | Redis connection string (optional; in-memory cache used otherwise) |
| `MOCK_VEHICLE_PROVIDER` | Enable the development-only mock provider |
| `NHTSA_API_BASE_URL` | NHTSA vPIC base URL (free, no key) |
| `CARAPI_API_KEY` | Enables the CarAPI provider (freemium) |
| `JWT_SECRET` | Secret for signing auth tokens |
| `VITE_API_URL` | Backend base URL used by the frontend |

Never commit `.env`.

## API overview

```
GET  /api/health
POST /api/vehicle/search          { registrationNumber }
POST /api/vehicle/vin             { vin }
GET  /api/vehicle/:registration
GET  /api/vehicle/vin/:vin
GET  /api/rto?state=&city=&q=
GET  /api/rto/:code
GET  /api/providers
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
GET  /api/user/vehicles           (auth)
POST /api/user/vehicles           (auth)
PATCH /api/user/vehicles/:id      (auth)
DELETE /api/user/vehicles/:id     (auth)
GET  /api/user/history            (auth)
DELETE /api/user/history          (auth)
```

See `docs/API.md` for details.

## Documentation

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — system design and data flow
- [`docs/API_PROVIDERS.md`](docs/API_PROVIDERS.md) — provider research and capabilities
- [`docs/API.md`](docs/API.md) — backend API reference
- [`docs/RTO_DATA.md`](docs/RTO_DATA.md) — RTO dataset provenance

## Disclaimer

Vehicle information depends on the selected data provider and regional availability.
This platform only displays information made available through supported public/API
sources and does not guarantee the completeness, accuracy, or official status of
every record. AutoCheck is not an RTO authority and does not provide ownership or
legal verification. Information should be independently verified before making
financial or legal decisions.

<p align="center">
  <img src="frontend/public/logo.png" alt="CarTrace logo" width="300" />
</p>

<h1 align="center">Every Vehicle Has a Story</h1>

CarTrace is a premium vehicle-information platform. Enter a vehicle
registration number or a VIN and view publicly available vehicle information —
specifications, registration details where supported, RTO information and
more — in a clean, responsive dashboard.

Add your API keys to the environment configuration and everything will work
freely.

---

## How to run

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

<p align="center">
  Made by Meet Duggar
</p>

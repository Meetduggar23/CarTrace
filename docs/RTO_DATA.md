# RTO Directory Data

## What it is

`backend/src/data/rto.ts` is a curated dataset of **standardized public RTO
codes** (e.g. `MH-12` = Pune City, `KA-01` = Bengaluru). RTO codes, their
state codes and office names are public facts published by state transport
departments under the Motor Vehicles Act framework and referenced by the
Ministry of Road Transport & Highways (Parivahan).

## Provenance & policy

- Codes and office names come from standard public RTO-code listings
  (state transport department publications).
- **Contact details are intentionally omitted** (`contact: null`) — we never
  publish phone numbers or addresses we cannot verify from a trusted source.
- Services are generic official service categories (registration, licenses,
  permits, tax collection) — not per-office specifics.
- This is a **curated subset** covering the major states/UTs. The complete,
  authoritative list lives with each state transport department and Parivahan
  (https://parivahan.gov.in/).
- The UI states that CarTrace is not an RTO authority and that details should
  be verified with the state transport department.

## Model

| Field | Type | Notes |
| --- | --- | --- |
| `code` | string | e.g. `MH-12` (unique) |
| `stateCode` | string | e.g. `MH` |
| `state` | string | Full state name |
| `city` | string | District/city |
| `officeName` | string | Office name |
| `location` | string | `"{city}, {state}"` |
| `services` | string[] | Generic official services |
| `contact` | null | Never fabricated |

## Keeping it accurate

- New entries should be added only from an official public source.
- The dataset is versioned in git; a `prisma/seed.ts` script can mirror it
  into the `Rto` table when a database is configured.

## Coverage

The dataset includes (non-exhaustive): Maharashtra (MH), Delhi (DL),
Karnataka (KA), Rajasthan (RJ), Tamil Nadu (TN), Gujarat (GJ), Haryana (HR),
Punjab (PB), Madhya Pradesh (MP), Uttar Pradesh (UP), West Bengal (WB),
Telangana (TS), Kerala (KL), Bihar (BR), Odisha (OD), Chhattisgarh (CG),
Jharkhand (JH), Uttarakhand (UK), Himachal Pradesh (HP), Chandigarh (CH),
Puducherry (PY), Goa (GA), DNH&DD (DN/DD), Andaman & Nicobar (AN),
Lakshadweep (LD), and Jammu & Kashmir (JK).

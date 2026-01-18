# malAI Web Experience

Premium Next.js experience for the malAI platform combining a marketing site, curated vendor marketplace, and AI-assisted planning studio.

## Feature Highlights
- **Magic UI landing** with aurora hero, concierge CTA, and brand storytelling tied to the docs in D:\Malai\docs.
- **Vendor marketplace** (/vendors, /vendors/[slug]) powered by the public API (GET /vendors, GET /vendors/:id, etc.) with filters, pagination, and graceful fallbacks.
- **Planning studio** (/plan) offering auspicious date finder, budget estimator, and concierge checklist via server actions backed by the planning endpoints.
- **Consultation intake** modal wired to /api/consultations with configurable webhook target and notifications for the concierge team.

## Getting Started
```bash
yarn install
yarn workspace @malai/web-app dev
```
The dev server runs on http://localhost:3100.

## Environment Variables
| Variable | Purpose | Default |
| --- | --- | --- |
| `MALAI_API_URL` | Server-side base URL for platform API calls (`https://api.malai.app/api`). | `http://localhost:3000` |
| `NEXT_PUBLIC_MALAI_API_URL` | Optional client-side override if exposing public API URL. | – |
| `CONSULTATION_ENDPOINT` | Concierge webhook for `/api/consultations`. | `http://localhost:3014/consultations` |
| `NEXT_PUBLIC_LOOKBOOK_URL` | Optional link for the signature lookbook download. | – |

Create an `.env.local` alongside `.env.example` with the variables you need.

## Architecture Notes
- **App Router** + TypeScript + Tailwind. Fonts (Inter, Sarabun, Charm, Playfair) registered in `app/layout.tsx`.
- **Design tokens** refreshed in `tailwind.config.ts` to match the brand palette (`brand`, `emerald`, `lotus`, `ivory`). Global styling lives in `styles/globals.css`.
- **API layer** in `lib/api/` centralises fetch logic, validation (zod), and graceful fallbacks for offline demos.
- **UI & Sections** live under `components/` with Magic UI helpers (`components/magic/`) and domain modules (`components/modules/vendors|planning`).
- **Server actions** in `app/actions/planning.ts` wrap planning endpoints and surface consistent results for client components.

## Consultation Flow
- `components/sections/cta.tsx` triggers the modal; `components/sections/consultation-form.tsx` posts to `/api/consultations`.
- `app/api/consultations/route.ts` validates requests using zod and forwards to `CONSULTATION_ENDPOINT` (or logs locally in development).
- Success messages promise concierge follow-up within 90 minutes (09:00-21:00 ICT).

## Next Steps
1. Swap fallback data in `lib/api/fallbacks.ts` for live API responses once the services are reachable.
2. Hook authentication and personalised dashboards (Pack 0) into the planner flows.
3. Expand vendor content cards with video galleries and WebSocket status once the realtime services go live.

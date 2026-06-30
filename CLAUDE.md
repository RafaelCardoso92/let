# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> Server-wide ops (deploy, cluster, DBs, DR) live in `~/CLAUDE.md`. This file = the `let` project only.

## What this is

**Let'Rent** (`let-rent`) — pt-PT **event-rental** business site (decor / tableware / furniture hire for weddings, parties, corporate). Quote-driven: **no Stripe checkout** — customers build a cart of rental items and submit a quote request; the team prices it via the admin dashboard.

Live: `let-rent.pt` (+ `www`) and `let.rafaelcardoso.co.uk` fallback. K8s deploy name `let`, DB `let` on the **shared UK control-plane postgres** (`postgres.database.svc.cluster.local`).

## Commands

```bash
npm run dev        # Next 16 dev server, turbopack (localhost:3000)
npm run build      # prisma generate && next build  — generate runs first, don't skip
npm run lint       # eslint (next lint)
npm run db:push    # prisma db push (no migrations dir — schema pushed directly)
npm run db:studio  # prisma studio
ops deploy let     # build + push + deploy to prod (from ~/)
```

No test suite. `prisma generate` is part of `build` — a bare `next build` fails on a stale client.

## Architecture — the thing to understand first

**Two independent data layers, split by purpose:**

1. **Sanity CMS** (`lib/sanity.ts`, `sanity/schemas/`) — the **product catalogue**: `product`, `service`, `siteSettings`. Read-only marketing/catalogue content, edited via the **embedded Sanity Studio at `/studio`** (`app/studio/[[...tool]]`). Client is null-safe: returns `null` when `NEXT_PUBLIC_SANITY_PROJECT_ID` is unset, so pages must guard. Product IDs from Sanity are referenced as plain strings in Postgres rows (`ProductStock.productId`, `QuoteItem.productId`) — **the two stores are joined by Sanity `_id`, not by a FK.**

2. **Prisma / Postgres** (`prisma/schema.prisma`, `lib/prisma.ts`) — all **transactional** state:
   - `QuoteRequest` + `QuoteItem` — the quote lifecycle (`pending → quoted → approved → confirmed → completed → cancelled`), pricing + deposit fields set by staff.
   - `InspirationPost` / `InspirationImage` / `InspirationProduct` — the inspiration gallery (links back to Sanity products by id).
   - `ProductStock` + `StockReservation` — inventory & date-range reservations (rental = same item booked for a date window).
   - `Admin` — staff login.

When adding a feature, decide which store owns the data: **catalogue/content → Sanity; bookings/stock/quotes → Postgres.**

**Auth** (`lib/auth.ts`): custom JWT, **not NextAuth**. `jose` HS256 token in the `admin_token` cookie, bcrypt password hash. `getSession()` / `requireAdmin()` guard the `/api/admin/*` routes and `/admin`. `JWT_SECRET` comes from env (falls back to a hardcoded dev string — must be set in prod via `let-secrets`).

**Route map:**
- Public: `/` `/servicos` `/contactos` `/inspiracao` (+ `/[id]`) `/disponibilidade` (availability calendar) `/orcamento` (quote builder) (+ `/[id]`) `/visualizador` (event layout planner, html2canvas export).
- Admin: `/admin` dashboard, `/admin/login`.
- API: `/api/products` `/api/quotes` `/api/availability` `/api/inspiration` (public-ish) and `/api/admin/*` (quotes / inspiration / stock / stock/reserve — `requireAdmin`).

## Deploy gotchas

- **`k8s.yaml` nodeSelector is `environment: production` — NON-STANDARD.** The documented cluster labels are `role: demo|production|production-eu`. Verify this still schedules (`ops status let`) before trusting a deploy; if it's pending-unschedulable, the selector is the cause.
- Secrets come from `let-secrets` (`envFrom`): `DATABASE_URL`, `JWT_SECRET`, `NEXT_PUBLIC_SANITY_*`.
- Dockerfile is plain `node:20-alpine` multi-stage (no standalone output) — `prisma generate` runs in the build stage.
- `docker-compose.yml` exists but is the **old** Traefik-label deploy path — prod is K8s via `ops deploy`. Ignore compose unless explicitly doing local Docker.

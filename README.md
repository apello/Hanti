# Hanti
Rental listing MVP for East Africa (Kenya)

## Related Repositories
- [hanti-frontend](https://github.com/apello/hanti-frontend)
- [hanti-frontend-tests](https://github.com/apello/hanti-frontend-tests)
- [hanti-backend](https://github.com/apello/hanti-backend)
- [hanti-backend-tests](https://github.com/apello/hanti-backend-tests)
- [hanti-database](https://github.com/apello/hanti-database)
- [hanti-devops](https://github.com/apello/hanti-devops)

# Hanti Database (Supabase + PostGIS)

Minimal, production-sane database setup for the MVP login-only phase, designed to scale to listings, KYC, and escrow. Uses Supabase (PostgreSQL + PostGIS) with RLS.

## What’s included
- Supabase project guide: `SUPABASE_SETUP.md`
- Team access guide: `TEAM_ACCESS_GUIDE.md`
- Auth login-only DB setup: `database/auth-login-setup.sql`
- Versioned migrations: `database/migrations/001..005_*.sql`
- Connection helper for Node/Next.js: `config/database.js` (supports `DATABASE_URL` with SSL)

## Tech
- PostgreSQL 15+/17+ on Supabase
- PostGIS (WGS84 / SRID 4326)
- pgcrypto, uuid-ossp, pg_stat_statements

## Quick start (Supabase)
1. Create a Supabase project (closest region to Kenya). See `SUPABASE_SETUP.md`.
2. In Supabase SQL editor (or pgAdmin), run the migrations in order:
   - `database/migrations/001_init.sql`
   - `database/migrations/002_core_mvp.sql`
   - `database/migrations/003_geo_indexes.sql`
   - `database/migrations/004_rls_policies.sql`
   - `database/migrations/005_seed_data.sql` (edit test UUIDs first)
3. Optional: run `database/auth-login-setup.sql` if you want a single-file login-only setup.
4. Verify tables and policies in pgAdmin (see steps below).

### pgAdmin quick load
1) Register server → host: `db.<your-ref>.supabase.co`, port: `5432`, db: `postgres`, SSL: require.
2) Right-click database → Query Tool → Open File → pick a migration → Execute (F5).
3) Expand `Schemas/public/Tables` and verify `profiles` exists.

## Environment
Copy `env.example` to `.env.local` and fill in your Supabase details.

```env
DATABASE_URL=postgres://hanti_app:YOUR_APP_PASSWORD@YOUR_HOST:5432/postgres?sslmode=require
# Or individual vars: DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD, DB_SSL=true
```

`config/database.js` automatically uses `DATABASE_URL` and enables SSL for Supabase.

## Migrations overview
- `001_init.sql`: enable extensions; create minimal `public.profiles` with timestamps.
- `002_core_mvp.sql`: add `full_name`, `phone` (E.164), `country_code` default `KE`, `is_admin`; partial-unique on phone; indexes; `updated_at` trigger.
- `003_geo_indexes.sql`: ensure `postgis_topology`; document future `properties.location geography(Point, 4326)` and planned GIST index.
- `004_rls_policies.sql`: trigger to auto-create a `profiles` row for new `auth.users`; RLS policies (owner select/update; admin select/update-any; deletes via service role).
- `005_seed_data.sql`: idempotent upserts for one admin and one normal profile (replace example UUIDs with real `auth.users.id`).

## RLS summary
- Owner can select/update their own `profiles` row.
- Admins (profiles.is_admin = true) can select/update any row.
- Inserts are created by signup trigger; clients don’t insert directly.
- Deletes reserved for service role/admin maintenance.

## Storage buckets (planned)
- `kyc-docs`: private, signed URLs only, long retention.
- `property-photos`: public via signed URLs, controlled writes.
- `temp-uploads`: private with auto-expiry.

## Seeding
- Create two users in Supabase Auth (one admin, one normal).
- Edit `database/migrations/005_seed_data.sql` to use those UIDs and run it.
- Idempotent upserts allow safe re-runs. For dev, `truncate public.profiles cascade` before reseeding (never in prod).

## CI / releases (DB ↔ backend)
- Tag DB releases as `db-vX.Y.Z` and keep a CHANGELOG entry.
- After DB merges, apply migrations to staging; run a backend smoke test (`/auth/me`).
- Share a schema artifact (concise table/column summary) and maintain `env.example` (no secrets).

## 📁 Project Structure
```
Hanti/
├── config/
│   └── database.js               # Node pg pool; supports Supabase DATABASE_URL + SSL
├── database/
│   ├── migrations/               # Versioned DB migrations (001..005)
│   ├── auth-login-setup.sql      # One-shot login-only DB setup
│   ├── schema.sql                # Legacy/local schema (optional)
│   └── supabase-setup.sql        # Supabase bootstrap script
├── pages/
│   └── api/                      # API routes (dev helpers)
│       ├── test.js               # DB connection test
│       ├── users/                # User management
│       └── auth/                 # Authentication
├── SUPABASE_SETUP.md             # Supabase project setup guide
├── TEAM_ACCESS_GUIDE.md          # Team roles, pgAdmin access, security tips
└── package.json
```

## Verify
- Connect via pgAdmin; open `profiles` → View/Edit Data → confirm seed rows (if seeded).
- Test RLS by querying as owner vs non-owner; admins should see all.

-- 005_seed_data.sql
-- Idempotent dev/staging seed for profiles. Requires known Auth UIDs.

-- Replace with actual UUIDs from Supabase Auth Users page before running.
-- Example placeholders:
--   :ADMIN_UID    -- admin user's auth.users.id
--   :USER_UID     -- normal user's auth.users.id

-- Upserts (safe to re-run)
insert into public.profiles (id, full_name, phone, country_code, is_admin)
values
  ('00000000-0000-0000-0000-000000000001', 'Admin User', '+254700000001', 'KE', true),
  ('00000000-0000-0000-0000-000000000002', 'Normal User', '+254700000002', 'KE', false)
on conflict (id) do update set
  full_name = excluded.full_name,
  phone = excluded.phone,
  country_code = excluded.country_code,
  is_admin = excluded.is_admin;

-- Reseed guidance (do not run destructive ops in prod)
-- Dev: truncate table public.profiles cascade; then re-run this file.
-- Staging: run upserts only (no truncation).
-- Prod: never seed test data.



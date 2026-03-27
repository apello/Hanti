-- Login-only Database Setup (Supabase)
-- Run in Supabase SQL editor or pgAdmin against your Supabase DB.
-- This sets up: minimal profiles table, trigger to auto-create profile on signup,
-- RLS so users can only read/update their profile, and simple admin flag.

-- 1) Minimal profiles table linked to auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role text default 'user',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_profiles_role on public.profiles(role);

-- Keep updated_at current
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;$$;

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute procedure public.set_updated_at();

-- 2) Auto-create profile on new auth user (Option A)
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id)
  values (new.id)
  on conflict do nothing;
  return new;
end;$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- 3) RLS policies for login-only
alter table public.profiles enable row level security;

-- Allow authenticated users to read their own row
drop policy if exists "profiles read own" on public.profiles;
create policy "profiles read own"
on public.profiles for select
to authenticated
using (id = auth.uid());

-- Allow authenticated users to update their own row
drop policy if exists "profiles update own" on public.profiles;
create policy "profiles update own"
on public.profiles for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

-- Optional: allow authenticated users to insert their own row (if you disable the trigger)
-- drop policy if exists "profiles insert self" on public.profiles;
-- create policy "profiles insert self"
-- on public.profiles for insert
-- to authenticated
-- with check (id = auth.uid());

-- 4) Admin helper: mark an account as admin (fill in UUID after creating users)
-- update public.profiles set role = 'admin' where id = '<ADMIN_USER_UUID>';

-- 5) Verification queries
select 'profiles table exists' as info, count(*) as n
from information_schema.tables
where table_schema = 'public' and table_name = 'profiles';

select 'RLS enabled on profiles' as info,
       relrowsecurity as rls_enabled
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public' and c.relname = 'profiles';



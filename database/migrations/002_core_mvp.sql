-- 002_core_mvp.sql
-- Add core columns, constraints, indexes, and updated_at trigger

-- Columns
alter table public.profiles
  add column if not exists full_name text,
  add column if not exists phone text,
  add column if not exists country_code text not null default 'KE',
  add column if not exists is_admin boolean not null default false;

-- Constraints & checks (lightweight; enforce stricter formats in app or later migration)
-- Unique phone when present (partial unique index)
create unique index if not exists idx_profiles_phone_unique_partial
  on public.profiles (phone)
  where phone is not null;

-- Country code format (two uppercase letters)
do $$ begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'profiles_country_code_format_check'
  ) then
    alter table public.profiles
      add constraint profiles_country_code_format_check
      check (country_code ~ '^[A-Z]{2}$');
  end if;
end $$;

-- Indexes for common lookups
create index if not exists idx_profiles_updated_at on public.profiles (updated_at desc);
create index if not exists idx_profiles_is_admin on public.profiles (is_admin);
create index if not exists idx_profiles_country_code on public.profiles (country_code);

-- updated_at trigger
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



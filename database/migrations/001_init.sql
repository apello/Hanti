-- 001_init.sql
-- Enable core extensions and create minimal base structures for MVP

-- Extensions (safe to run multiple times in Supabase)
create extension if not exists postgis;
create extension if not exists pgcrypto;
create extension if not exists "uuid-ossp";
create extension if not exists pg_stat_statements;

-- Global defaults
-- Note: timezone is managed at the connection level in Supabase; document UTC usage.

-- Minimal profiles table (auth-backed)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);



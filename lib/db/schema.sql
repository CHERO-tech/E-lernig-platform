-- Forge auth schema (Postgres / Neon).
-- Applied by `npm run db:migrate` (scripts/migrate.mjs). Kept here as the
-- readable reference — paste it into Neon's SQL editor directly if you'd
-- rather not run the script.

create extension if not exists pgcrypto;

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,
  name text not null,
  role text not null check (role in ('student', 'trainer', 'school', 'guardian', 'company', 'admin')),
  avatar text,
  phone text,
  location text,
  bio text,
  email_verified boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists password_reset_tokens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  token_hash text not null,
  expires_at timestamptz not null,
  used_at timestamptz
);

create index if not exists password_reset_tokens_user_id_idx on password_reset_tokens(user_id);

create table if not exists email_verification_codes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  code_hash text not null,
  expires_at timestamptz not null,
  used_at timestamptz
);

create index if not exists email_verification_codes_user_id_idx on email_verification_codes(user_id);

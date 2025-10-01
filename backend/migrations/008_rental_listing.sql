-- rental_listing.sql
-- SQL migration for creating the rental_listing table in Supabase

CREATE TABLE rental_listing (
  id bigint PRIMARY KEY,
  title text,
  price text,
  location text,
  bedrooms text,
  bathrooms text,
  area text,
  property_type text,
  transaction_type text,
  images jsonb
);

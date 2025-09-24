-- Supabase Setup Script for Hanti Project
-- Run this in Supabase SQL Editor after creating your project

-- Step 1: Enable PostGIS extensions
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgis_topology;

-- Step 2: Create application roles with least privilege principle
-- IMPORTANT: Replace the passwords with strong, unique passwords!
-- These passwords will be shared with your team
CREATE ROLE hanti_app LOGIN PASSWORD 'HantiTeam2024!App';
CREATE ROLE hanti_readonly LOGIN PASSWORD 'HantiTeam2024!ReadOnly';
CREATE ROLE hanti_team LOGIN PASSWORD 'HantiTeam2024!FullAccess';

-- Step 3: Grant schema usage permissions
GRANT USAGE ON SCHEMA public TO hanti_app, hanti_readonly, hanti_team;

-- Step 4: Grant table permissions to hanti_app (read/write)
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO hanti_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO hanti_app;

-- Step 5: Grant read-only permissions to hanti_readonly
GRANT SELECT ON ALL TABLES IN SCHEMA public TO hanti_readonly;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT ON TABLES TO hanti_readonly;

-- Step 6: Grant full team permissions to hanti_team (can read, write, and manage data)
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO hanti_team;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO hanti_team;

-- Step 7: Grant sequence permissions for auto-incrementing IDs
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO hanti_app, hanti_team;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT USAGE, SELECT ON SEQUENCES TO hanti_app, hanti_team;

-- Step 8: Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(32) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 9: Create helpful indexes
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

-- Step 10: Insert sample data (replace with your actual hashed passwords)
INSERT INTO users (username, email, password_hash) VALUES
('abdi', 'abdi@gmail.com', '$2b$15$rQZ8K9vL8K9vL8K9vL8K9O'),
('yahya', 'yahya@gmail.com', '$2b$15$rQZ8K9vL8K9vL8K9vL8K9O'),
('admin', 'admin@hanti.com', '$2b$15$rQZ8K9vL8K9vL8K9vL8K9O')
ON CONFLICT (username) DO NOTHING;

-- Step 11: Create team access table for tracking who can access what
CREATE TABLE IF NOT EXISTS team_members (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  role VARCHAR(50) DEFAULT 'team_member',
  access_level VARCHAR(20) DEFAULT 'full', -- 'readonly', 'full', 'admin'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- Step 12: Insert team members
INSERT INTO team_members (name, email, role, access_level) VALUES
('Abdi', 'abdi@gmail.com', 'admin', 'admin'),
('Yahya', 'yahya@gmail.com', 'developer', 'full'),
('Team Member 1', 'member1@hanti.com', 'analyst', 'readonly'),
('Team Member 2', 'member2@hanti.com', 'developer', 'full')
ON CONFLICT (email) DO NOTHING;

-- Step 13: Verify setup
SELECT 'Setup complete! PostGIS version:' as status, PostGIS_version() as version;
SELECT 'Current user:' as info, current_user as user;
SELECT 'Tables created:' as info, count(*) as table_count FROM information_schema.tables WHERE table_schema = 'public';
SELECT 'Team members added:' as info, count(*) as member_count FROM team_members;

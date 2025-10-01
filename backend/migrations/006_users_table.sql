-- 006_users_table.sql
-- Create legacy users table for backward compatibility

-- Create users table (legacy)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(32) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  role VARCHAR(50) DEFAULT 'team_member',
  access_level VARCHAR(20) DEFAULT 'full',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- Create indexes for users table
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

-- Insert sample users data
INSERT INTO users (username, email, password_hash) VALUES
('abdi', 'abdi@gmail.com', '$2b$15$rQZ8K9vL8K9vL8K9vL8K9O'),
('yahya', 'yahya@gmail.com', '$2b$15$rQZ8K9vL8K9vL8K9vL8K9O'),
('admin', 'admin@hanti.com', '$2b$15$rQZ8K9vL8K9vL8K9vL8K9O')
ON CONFLICT (username) DO NOTHING;

-- Insert team members
INSERT INTO team_members (name, email, role, access_level) VALUES
('Abdi', 'abdi@gmail.com', 'admin', 'admin'),
('Yahya', 'yahya@gmail.com', 'developer', 'full'),
('Team Member 1', 'member1@hanti.com', 'analyst', 'readonly'),
('Team Member 2', 'member2@hanti.com', 'developer', 'full')
ON CONFLICT (email) DO NOTHING;

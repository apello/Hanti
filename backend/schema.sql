-- Create database (run this first)
-- CREATE DATABASE hanti_db;

-- Connect to the database
-- \c hanti_db;

-- Enable PostGIS extension (optional for now)
-- CREATE EXTENSION IF NOT EXISTS postgis;

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);
-- Create index for faster lookups
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
-- Insert some test data
INSERT INTO users (username, email, password_hash) VALUES 
('abdi', 'abdi@gmail.com', '$2b$10$rQZ8K9vL8K9vL8K9vL8K9O'),
('yahya', 'yahya@gmail.com', '$2b$10$rQZ8K9vL8K9vL8K9vL8K9O'),
('admin', 'admin@hanti.com', '$2b$10$rQZ8K9vL8K9vL8K9vL8K9O');

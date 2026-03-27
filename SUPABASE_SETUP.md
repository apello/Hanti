# Supabase Setup Guide for Hanti Project

This guide will walk you through setting up Supabase for your Hanti database project, including PostGIS support and proper role management.

## Prerequisites

- Supabase account (sign up at [supabase.com](https://supabase.com))
- pgAdmin installed locally (for team database access)
- Node.js project with PostgreSQL dependencies

## Step 1: Create the Supabase Project

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click **"New project"**
3. Fill in project details:
   - **Name**: `hanti-database`
   - **Database Password**: Use a strong password (save this securely!)
   - **Region**: Choose the nearest region to Kenya (e.g., `ap-southeast-1` for Asia Pacific)
4. Click **"Create project"** and wait for provisioning (2-3 minutes)

## Step 2: Get Database Connection Details

1. In your Supabase project dashboard, go to **Settings** → **Database**
2. Scroll down to **Connection string** section
3. Copy the **URI** connection string (it looks like):
   ```
   postgres://postgres:<PASSWORD>@<HOSTNAME>:5432/postgres
   ```
4. Save the `<HOSTNAME>` and `<PASSWORD>` for later use

## Step 3: Enable PostGIS and Create Roles

1. In Supabase dashboard, go to **SQL Editor**
2. Click **"New query"**
3. Copy and paste the following SQL script:

```sql
-- Enable PostGIS extensions
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgis_topology;

-- Create application roles with least privilege principle
CREATE ROLE hanti_app LOGIN PASSWORD 'REALLY_STRONG_APP_PASSWORD_CHANGE_THIS';
CREATE ROLE hanti_readonly LOGIN PASSWORD 'REALLY_STRONG_RO_PASSWORD_CHANGE_THIS';

-- Grant schema usage permissions
GRANT USAGE ON SCHEMA public TO hanti_app, hanti_readonly;

-- Grant table permissions to hanti_app (read/write)
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO hanti_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO hanti_app;

-- Grant read-only permissions to hanti_readonly
GRANT SELECT ON ALL TABLES IN SCHEMA public TO hanti_readonly;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT ON TABLES TO hanti_readonly;

-- Grant sequence permissions for auto-incrementing IDs
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO hanti_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT USAGE, SELECT ON SEQUENCES TO hanti_app;
```

4. **IMPORTANT**: Replace `REALLY_STRONG_APP_PASSWORD_CHANGE_THIS` and `REALLY_STRONG_RO_PASSWORD_CHANGE_THIS` with actual strong passwords
5. Click **"Run"** to execute the script

## Step 4: Load Your Database Schema

1. In the same SQL Editor, create a new query
2. Copy and paste the following schema:

```sql
-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(32) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create helpful indexes
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

-- Insert sample data (replace with your actual hashed passwords)
INSERT INTO users (username, email, password_hash) VALUES
('abdi', 'abdi@gmail.com', '$2b$15$rQZ8K9vL8K9vL8K9vL8K9O'),
('yahya', 'yahya@gmail.com', '$2b$15$rQZ8K9vL8K9vL8K9vL8K9O'),
('admin', 'admin@hanti.com', '$2b$15$rQZ8K9vL8K9vL8K9vL8K9O')
ON CONFLICT (username) DO NOTHING;
```

3. Click **"Run"** to create the table and insert sample data

## Step 5: Configure Your Application

### Update Environment Variables

Create a `.env.local` file in your project root:

```env
# Supabase Database Configuration
DATABASE_URL=postgres://hanti_app:YOUR_APP_PASSWORD@YOUR_HOSTNAME:5432/postgres?sslmode=require

# Alternative individual settings (if you prefer)
DB_HOST=YOUR_HOSTNAME
DB_PORT=5432
DB_NAME=postgres
DB_USER=hanti_app
DB_PASSWORD=YOUR_APP_PASSWORD
DB_SSL=true
```

Replace:
- `YOUR_HOSTNAME` with your Supabase hostname
- `YOUR_APP_PASSWORD` with the password you set for `hanti_app` role

### Update Database Configuration

Your `config/database.js` has been updated to work with Supabase. The configuration now supports:
- SSL connections (required for Supabase)
- Connection pooling
- Environment variable configuration

## Step 6: Team Access with pgAdmin

Each team member can connect using pgAdmin:

1. Open pgAdmin
2. Right-click **"Servers"** → **"Register"** → **"Server"**
3. Fill in connection details:
   - **Name**: `Hanti-Supabase`
   - **Host**: Your Supabase hostname
   - **Port**: `5432`
   - **Database**: `postgres`
   - **Username**: `hanti_readonly` (for analysts) or `hanti_app` (for developers)
   - **Password**: The password you set for the respective role
4. Go to **SSL** tab:
   - **SSL mode**: `Require`
5. Click **"Save"** and connect

## Step 7: Team Management

### Invite Team Members

1. In Supabase dashboard, go to **Settings** → **Team**
2. Click **"Invite members"**
3. Add team members by email
4. Assign appropriate roles (Developer, Admin, etc.)

### Security Best Practices

- **Never** use the `postgres` superuser for application connections
- Use `hanti_app` for your application
- Use `hanti_readonly` for analytics and reporting
- Always use SSL connections
- Rotate passwords regularly
- Monitor database usage in Supabase dashboard

## Step 8: Testing the Connection

Run your application to test the connection:

```bash
npm run dev
```

Check the console for "Connected to PostgreSQL database" message.

## Troubleshooting

### Common Issues

1. **SSL Connection Error**: Make sure `sslmode=require` is in your connection string
2. **Authentication Failed**: Verify username/password and role permissions
3. **Connection Timeout**: Check if your IP is blocked (rare with Supabase free tier)

### Useful Commands

```sql
-- Check current user
SELECT current_user;

-- List all tables
\dt

-- Check PostGIS version
SELECT PostGIS_version();

-- Test role permissions
SELECT * FROM users LIMIT 1;
```

## Next Steps

1. Set up database backups (Supabase handles this automatically)
2. Consider implementing Row Level Security (RLS) if needed
3. Add more tables as your application grows
4. Set up monitoring and alerts

## Support

- [Supabase Documentation](https://supabase.com/docs)
- [PostGIS Documentation](https://postgis.net/documentation/)
- [pgAdmin Documentation](https://www.pgadmin.org/docs/)

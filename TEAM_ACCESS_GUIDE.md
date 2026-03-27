# Team Access Guide for Hanti Database

This guide explains how to give your team access to the Hanti database so everyone can see and contribute to the data.

## 🔐 Database Access Levels

I've created 3 different access levels for your team:

### 1. **hanti_team** (Full Access)
- **Password**: `HantiTeam2024!FullAccess`
- **Can do**: Read, write, insert, update, delete data
- **Best for**: Developers, data managers, team leads
- **Use case**: Full database management and data manipulation

### 2. **hanti_app** (Application Access)
- **Password**: `HantiTeam2024!App`
- **Can do**: Read, write, insert, update, delete data
- **Best for**: Your application/backend code
- **Use case**: Automated processes and API connections

### 3. **hanti_readonly** (Read-Only Access)
- **Password**: `HantiTeam2024!ReadOnly`
- **Can do**: Only read data (SELECT queries)
- **Best for**: Analysts, reporting, data visualization
- **Use case**: Creating reports without accidentally modifying data

## 👥 How to Give Team Members Access

### Option 1: Share pgAdmin Connection Details

Send your team members these connection details:

**For Full Access (Developers):**
```
Host: db.<your-ref>.supabase.co
Port: 5432
Database: postgres
Username: hanti_team
Password: HantiTeam2024!FullAccess
SSL: Required
```

**For Read-Only Access (Analysts):**
```
Host: db.<your-ref>.supabase.co
Port: 5432
Database: postgres
Username: hanti_readonly
Password: HantiTeam2024!ReadOnly
SSL: Required
```

### Option 2: Invite to Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **Team**
3. Click **"Invite members"**
4. Add team members by email
5. Assign roles (Developer, Admin, etc.)

## 📊 What Your Team Can See

After running the updated SQL script, your team will have access to:

### **users** table
- User accounts and login information
- Sample data: abdi, yahya, admin

### **team_members** table (NEW!)
- Team member information
- Access levels and roles
- Track who has access to what

## 🚀 Steps to Set Up Team Access

### 1. Run the Updated SQL Script

1. **In pgAdmin**, open Query Tool
2. **Load the updated `supabase-setup.sql`** file
3. **Execute the script** (F5)
4. **Verify** you see both `users` and `team_members` tables

### 2. Test Team Access

**Test Full Access:**
1. Create a new connection in pgAdmin
2. Use `hanti_team` credentials
3. Try to insert/update data

**Test Read-Only Access:**
1. Create another connection
2. Use `hanti_readonly` credentials
3. Try to read data (should work)
4. Try to insert data (should fail)

### 3. Share Access with Team

Send your team members:
- Connection details (above)
- This guide
- Instructions on how to connect

## 🔒 Security Best Practices

1. **Change passwords regularly** (every 3-6 months)
2. **Use strong passwords** (the ones provided are examples)
3. **Monitor access** through Supabase dashboard
4. **Revoke access** for team members who leave
5. **Use read-only access** for non-developers

## 📝 Adding New Team Members

To add a new team member to the database:

```sql
INSERT INTO team_members (name, email, role, access_level) 
VALUES ('New Member', 'newmember@hanti.com', 'developer', 'full');
```

## 🛠️ Troubleshooting

**Can't connect?**
- Check SSL is set to "Required"
- Verify the hostname is correct
- Make sure you're using the right username/password

**Can't see data?**
- Check if you're connected to the right database (postgres)
- Verify the table exists in the public schema
- Make sure you have the right permissions

**Permission denied?**
- Check your access level
- Make sure you're using the right role
- Contact admin to verify permissions

## 📞 Support

If you need help:
1. Check the Supabase dashboard for connection issues
2. Verify your team member is in the `team_members` table
3. Test with different access levels
4. Contact the database admin (Abdi/Yahya)

---

**Remember**: Always use SSL connections and keep passwords secure! 🔐

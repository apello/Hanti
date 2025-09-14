# Hanti
Rental listing site for East Africa (Kenya)

## Related Repositories
- [hanti-frontend](https://github.com/apello/hanti-frontend)
- [hanti-frontend-tests](https://github.com/apello/hanti-frontend-tests)
- [hanti-backend](https://github.com/apello/hanti-backend)
- [hanti-backend-tests](https://github.com/apello/hanti-backend-tests)
- [hanti-database](https://github.com/apello/hanti-database)
- [hanti-devops](https://github.com/apello/hanti-devops)
# Hanti PostgreSQL Database API

A simple PostgreSQL database with Next.js API for user authentication and management.

## database contents
- **PostgreSQL 17.6** with user authentication
- **Users table:** id, username, email, password_hash
- **Password hashing** with bcryptjs


### Database Connection
- `GET /api/test` - Test database connection

### User Management
- `GET api/users` - Get all users
- `POST api/auth/signup` - Create new user
- `POST api/auth/login` - User authentication

## 🛠️ Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start PostgreSQL:**
   ```bash
   brew services start postgresql@17
   ```

3. **Create database:**
   ```bash
   createdb hanti_db
   psql -d hanti_db -f database/schema.sql
   ```

4. **Start API server:**
   ```bash
   npm run dev
   ```

## 📁 Project Structure
```
Hanti/
├── config/
│   └── database.js          # Database connection
├── database/
│   └── schema.sql           # Database schema
├── pages/
│   └── api/                 # API routes
│       ├── test.js          # Database test
│       ├── users/           # User management
│       └── auth/            # Authentication
└── package.json
```
```


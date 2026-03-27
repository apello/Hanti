#Hanti Database API Demo Guide

##  **Pre-Demo Checklist**

### 1. **Start Services**
```bash
# Terminal 1: Start PostgreSQL
brew services start postgresql@17

# Terminal 2: Start API Server
cd /Users/yahyaelmi/Desktop/Hanti
npm run dev
```

### 2. **Verify Database**
```bash
# Check database exists and has data
export PATH="/opt/homebrew/opt/postgresql@17/bin:$PATH"
psql -d hanti_db -c "SELECT COUNT(*) FROM users;"
```

---

## **Live Demo Script**

### **Step 1: Show Database Connection**
```bash
curl -X GET http://localhost:3000/api/test
```
**Expected:** Database connection successful with PostgreSQL version

### **Step 2: Show All Users**
```bash
curl -X GET http://localhost:3000/api/users
```
**Expected:** List of all users in database

### **Step 3: Create New User**
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username": "demouser", "email": "demo@example.com", "password": "demo123"}'
```
**Expected:** User created successfully

### **Step 4: Test Login (Success)**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "demouser", "password": "demo123"}'
```
**Expected:** Login successful with user data

### **Step 5: Test Login (Failure)**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "demouser", "password": "wrongpassword"}'
```
**Expected:** Invalid credentials

### **Step 6: Show Updated User List**
```bash
curl -X GET http://localhost:3000/api/users
```
**Expected:** New user appears in list

---

## 🛠️ **Alternative: Postman Demo**

### **Import Collection**
1. Open Postman
2. Import the collection (if you have it)
3. Run each request in sequence

### **Manual Postman Setup**
Create these requests:

1. **GET** `http://localhost:3000/api/test`
2. **GET** `http://localhost:3000/api/users`
3. **POST** `http://localhost:3000/api/auth/signup`
   - Body: `{"username": "testuser", "email": "test@example.com", "password": "password123"}`
4. **POST** `http://localhost:3000/api/auth/login`
   - Body: `{"username": "testuser", "password": "password123"}`

---

## **What to Highlight**

### **Technical Features**
- **PostgreSQL 17.6** database
- **Password hashing** with bcryptjs
- **Input validation** (email format, required fields)
- **Error handling** (duplicate users, wrong passwords)
- **RESTful API** design
- **Database connection pooling**

### **Security Features**
- **Password hashing** (never store plain text)
- **Input sanitization**
- **SQL injection protection** (parameterized queries)
- **Duplicate prevention**

### **API Design**
- **Consistent response format**
- **Proper HTTP status codes**
- **Clear error messages**
- **JSON responses**

---

##  **Demo Flow (5 minutes)**

1. **"Let me show you my PostgreSQL database API"** 
   - Show project structure
   - Explain what it does

2. **"First, let's test the database connection"** 
   - Run `/api/test`
   - Show successful connection

3. **"Here are the current users"**
   - Run `/api/users`
   - Show user list

4. **"Let's create a new user"** 
   - Run signup with demo data
   - Show successful creation
   - Explain password hashing

5. **"Now let's test authentication"**
   - Test correct login
   - Test wrong password
   - Show security features

6. **"Let's see the updated user list"**
   - Run `/api/users` again
   - Show new user added

7. **"This is a complete user authentication system"** 
   - Summarize features
   - Show code structure
   - Explain scalability

---


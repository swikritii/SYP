# FutsalFlow Backend

A Node.js/Express backend API for the FutsalFlow application with MySQL database, JWT authentication, and RESTful endpoints.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database

**Create `.env` file** in the Backend folder:
```env
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=test
JWT_SECRET=your_secret_key_here
```

### 3. Initialize Database
```bash
npm run init-db
```

This creates the database and tables automatically.

### 4. Start Server
```bash
npm start
```

Server runs on `http://localhost:3000`

---

## 📁 Project Structure

```
Backend/
├── db/
│   ├── connection.js      # Database connection pool
│   ├── init.js            # Database initialization logic
│   └── schema.sql         # Database schema
├── controllers/           # Route controllers
├── models/               # Data models
├── routes/               # API routes
├── middleware/           # Custom middleware
├── server.js            # Main server file
├── init-db.js          # Database setup script
└── .env                 # Environment variables (create this)
```

---

## 🔧 Available Scripts

- `npm start` - Start the server with nodemon
- `npm run init-db` - Initialize database and create tables

---

## 📡 API Endpoints

### Authentication
- `POST /signup` - Create new user account
- `POST /login` - Login user
- `GET /me` - Get current user (requires token)

### Users
- `GET /users` - Get all users

### Test
- `GET /` - Hello World test endpoint

---

## 🔐 Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## 📚 Documentation

- `QUICK_FIX.md` - Quick troubleshooting guide
- `SETUP.md` - Detailed setup instructions
- `POSTMAN_GUIDE.md` - Complete Postman testing guide
- `DATABASE_SETUP.md` - Database configuration guide

---

## 🐛 Troubleshooting

**Database connection issues?**
- See `QUICK_FIX.md` for immediate solutions

**Table doesn't exist?**
- Run: `npm run init-db`

**Still having problems?**
- Check `SETUP.md` for detailed troubleshooting

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MySQL2
- JWT (JSON Web Tokens)
- bcryptjs (Password hashing)
- CORS
- dotenv (Environment variables)

---

## 📝 Environment Variables

Required in `.env` file:
- `DB_HOST` - MySQL host (default: localhost)
- `DB_USER` - MySQL user (default: root)
- `DB_PASS` - MySQL password (default: empty)
- `DB_NAME` - Database name (default: test)
- `JWT_SECRET` - Secret key for JWT tokens

---

## ✅ Development Status

- ✅ User authentication (signup/login)
- ✅ JWT token generation
- ✅ Protected routes
- ✅ Password hashing
- ✅ Database connection pooling
- ✅ Error handling

---

Made with ❤️ for FutsalFlow

# Postman Testing Guide for FutsalFlow Backend

## 🚀 Quick Start

1. **Start your backend server:**
   ```bash
   cd Backend
   npm start
   ```
   You should see: "Connected to MySQL database!" and "Server is running on port 3000"

2. **Open Postman** and create a new collection called "FutsalFlow API"

---

## 📍 Base URL
```
http://localhost:3000
```

---

## 🔐 Authentication Endpoints

### 1. **Sign Up (Create Account)**
- **Method:** `POST`
- **URL:** `http://localhost:3000/signup`
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Body (raw JSON):**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Expected Response (201):**
  ```json
  {
    "message": "User created successfully",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **Error Responses:**
  - `400`: User already exists or missing fields
  - `500`: Server/database error

---

### 2. **Login**
- **Method:** `POST`
- **URL:** `http://localhost:3000/login`
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Body (raw JSON):**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Expected Response (200):**
  ```json
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **Error Responses:**
  - `400`: Invalid credentials or missing fields
  - `500`: Server/database error

**💡 Tip:** Copy the `token` from the response - you'll need it for protected routes!

---

### 3. **Get Current User (Protected Route)**
- **Method:** `GET`
- **URL:** `http://localhost:3000/me`
- **Headers:**
  ```
  Authorization: Bearer YOUR_TOKEN_HERE
  ```
  Replace `YOUR_TOKEN_HERE` with the token from login/signup.
  
- **Expected Response (200):**
  ```json
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```
- **Error Responses:**
  - `401`: Missing token
  - `403`: Invalid or expired token

**🔒 This is a protected route - you must include the token!**

---

## 📊 Other Endpoints

### 4. **Get All Users**
- **Method:** `GET`
- **URL:** `http://localhost:3000/users`
- **Headers:** None required
- **Expected Response (200):**
  ```json
  [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "password": "$2a$10$..." // Hashed password
    }
  ]
  ```

### 5. **Test Endpoint (Hello World)**
- **Method:** `GET`
- **URL:** `http://localhost:3000/`
- **Expected Response (200):**
  ```json
  {
    "message": "Hello World"
  }
  ```

---

## 🧪 Testing Workflow

### Complete Test Flow:

1. **Test Sign Up:**
   - Create a new user with POST `/signup`
   - Save the `token` from the response

2. **Test Login:**
   - Login with the same credentials using POST `/login`
   - Save the `token` from the response

3. **Test Protected Route:**
   - Use GET `/me` with the token in Authorization header
   - Should return your user info

4. **Test Error Cases:**
   - Try signing up with the same email again (should fail)
   - Try logging in with wrong password (should fail)
   - Try accessing `/me` without a token (should fail)

---

## 📝 Postman Collection Setup

### Environment Variables (Optional but Recommended):

Create a Postman environment with:
- `base_url`: `http://localhost:3000`
- `token`: (Leave empty, will be set automatically)

### Pre-request Script (Auto-save token):

For Login/Signup requests, add this script to automatically save the token:
```javascript
if (pm.response.code === 200 || pm.response.code === 201) {
    var jsonData = pm.response.json();
    if (jsonData.token) {
        pm.environment.set("token", jsonData.token);
    }
}
```

Then use `{{token}}` in your Authorization header for `/me` endpoint.

---

## 🔧 Troubleshooting

**"Cannot GET /login"** or connection refused
- Make sure your backend server is running
- Check that it's running on port 3000

**"Database error"**
- Make sure MySQL is running
- Check that the `test` database exists
- Verify database credentials in `.env` or server.js

**"Invalid credentials"**
- Check that the user exists in the database
- Verify the password is correct
- Make sure you're using the same email you signed up with

**"Missing token" or "Invalid token"**
- Make sure you copied the entire token (it's long!)
- Check that you're using `Bearer ` prefix (with space after Bearer)
- Token expires after 2 hours - login again to get a new one

---

## ✅ Success Checklist

- [ ] Sign up creates a new user
- [ ] Login returns a token
- [ ] `/me` endpoint works with token
- [ ] Wrong credentials are rejected
- [ ] Duplicate email signup is rejected
- [ ] Protected routes without token return 401

---

Happy Testing! 🎉


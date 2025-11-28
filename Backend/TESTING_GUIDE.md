# Backend Testing Guide

## 📍 Where Your Data Is Going

Your backend data is stored in a **MySQL database**:
- **Server**: localhost
- **Database name**: `test`
- **Table name**: `users`
- **Port**: 3000 (for the Express server)

## 🧪 Testing with Postman

### Step 1: Make sure your server is running
```bash
cd Backend
npm start
```
You should see: "Server is running on port 3000" and "Connected to MySQL database!"

### Step 2: Test the Endpoints in Postman

#### Test Endpoint 1: Hello World
- **Method**: GET
- **URL**: `http://localhost:3000/`
- **Expected Response**: 
  ```json
  {
    "message": "Hello World"
  }
  ```

#### Test Endpoint 2: Get Users
- **Method**: GET
- **URL**: `http://localhost:3000/users`
- **Expected Response**: An array of users from your database
  ```json
  [
    {
      "id": 1,
      "name": "John",
      "email": "john@example.com"
    }
  ]
  ```

### Step 3: View Your Database Data

You can also view your data directly in MySQL:

**Using MySQL Command Line:**
```bash
mysql -u root
USE test;
SELECT * FROM users;
```

**Using MySQL Workbench or phpMyAdmin:**
- Connect to localhost
- Select the `test` database
- View the `users` table

## 📝 Notes

- If you get an error, make sure:
  1. MySQL is running on your computer
  2. The `test` database exists
  3. The `users` table exists in that database
  4. Your server is running (npm start)

## 🔧 Common Issues

### Getting `{"message": "Error"}` response?

This means your database query failed. Here's how to fix it:

**1. Set up your database:**
   - Open MySQL Workbench or phpMyAdmin
   - Run the `setup_database.sql` file (located in the Backend folder)
   - OR manually create:
     - Database: `test`
     - Table: `users` with columns: `id`, `name`, `email`

**2. Check your server console:**
   - Look at the terminal where your server is running
   - You should see either:
     - ✅ "Connected to MySQL database!" (good!)
     - ❌ "Error connecting to database: [error message]" (problem!)

**3. Verify the error message:**
   - Now when you test in Postman, the error response will show the actual error
   - Look for something like: `{"message": "Error", "error": "Table 'test.users' doesn't exist"}`
   - This tells you exactly what's wrong!

**"Error connecting to database"**
- Make sure MySQL is installed and running
- Check if the `test` database exists (run `setup_database.sql`)
- Verify your MySQL username/password in `server.js`

**"Cannot GET /users"**
- Make sure your server is running on port 3000
- Check that you're using the correct URL in Postman

## 🗄️ Setting Up the Database

**Quick Setup:**
1. Open MySQL Workbench (or phpMyAdmin)
2. Open and run the `setup_database.sql` file
3. Restart your server
4. Test again in Postman!

**Manual Setup:**
If you prefer to set it up manually, you need:
- Database named `test`
- Table named `users` with columns: `id` (INT, AUTO_INCREMENT, PRIMARY KEY), `name` (VARCHAR), `email` (VARCHAR)


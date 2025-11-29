# Backend

This folder contains the backend server for the SYP project (Express + MySQL).

Setup & run
1. Install dependencies:
```powershell
cd Backend
npm install
```

2. Create a `.env` file in `Backend/` (copy from `.env.example`) and set DB credentials:
```
DB_HOST=localhost
DB_USER=appuser
DB_PASS=AppStrongPass123!
DB_NAME=test
PORT=3000
```

3. Initialize database and tables (requires DB user with privileges):
```powershell
# Creates database and users table. Uses credentials from your .env
node init-db.js
```

4. Start dev server:
```powershell
npm start
```

Troubleshooting
- If the server prints "Access denied for user" or authentication errors, check `.env` values and verify you can log in using a DB client (MySQL Workbench).
- If you use MySQL 8+ and the client reports "ER_NOT_SUPPORTED_AUTH_MODE" ensure you use `mysql2` as the client and/or update the user's auth plugin with `ALTER USER`.

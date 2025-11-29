/* init-db.js
   Usage: node init-db.js
   This script reads DB_* environment variables (dotEnv) and ensures database and users table exist.
   It must be run with a DB user with privileges to create databases/tables (root or admin).
*/
require('dotenv').config();
const mysql = require('mysql2/promise');

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || '';
const DB_NAME = process.env.DB_NAME || 'test';

async function main(){
  try {
    console.log(`Connecting to MySQL at ${DB_HOST} as ${DB_USER}...`);
    // Connect without specifying DB to create DB
    const conn = await mysql.createConnection({ host: DB_HOST, user: DB_USER, password: DB_PASS });
    console.log('Connected. Creating database and table if they do not exist...');

    await conn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`); // escape DB name
    await conn.query(`USE \`${DB_NAME}\`;`);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log(`Database (${DB_NAME}) and table (users) are ready.`);
    await conn.end();
  } catch (err) {
    console.error('Failed to initialize DB:', err.message);
    console.error('If you see an access denied error, check DB credentials in your .env and ensure the user has privileges to create databases and tables.');
    process.exit(1);
  }
}

main();

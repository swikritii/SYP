// Load environment variables first
require('dotenv').config();

const mysql = require('mysql2');

// Get password from .env - if empty, use undefined (not empty string)
const dbPassword = process.env.DB_PASS && process.env.DB_PASS.trim() !== '' 
    ? process.env.DB_PASS 
    : undefined;

// Database configuration from .env file
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    database: process.env.DB_NAME || 'test'
};

// Create connection pool - only include password if it exists
const pool = mysql.createPool({
    host: dbConfig.host,
    user: dbConfig.user,
    database: dbConfig.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ...(dbPassword !== undefined && { password: dbPassword })
});

// Convert to promise-based
const promisePool = pool.promise();

// Test connection
async function testConnection() {
    try {
        await promisePool.query('SELECT 1');
        console.log('✅ Database connected successfully!');
        return true;
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        return false;
    }
}

// Export connection pool and test function
module.exports = {
    pool: promisePool,
    testConnection
};

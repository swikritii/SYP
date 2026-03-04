// Load environment variables first
require('dotenv').config();

const mysql = require('mysql2');

/**
 * Database configuration from .env file.
 * This file handles the connection to the MySQL database.
 */
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    database: process.env.DB_NAME || 'test',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Only add password if it's provided and not empty
if (process.env.DB_PASS && process.env.DB_PASS.trim() !== '') {
    dbConfig.password = process.env.DB_PASS;
}

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Convert to promise-based for easier async/await usage
const promisePool = pool.promise();

// Test connection function to verify the DB is reachable
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

// Load environment variables first
require('dotenv').config();

const mysql = require('mysql2');

// Database configuration
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    multipleStatements: true
};

// Only add password if it's provided and not empty
if (process.env.DB_PASS && process.env.DB_PASS.trim() !== '') {
    dbConfig.password = process.env.DB_PASS;
}

const dbName = process.env.DB_NAME || 'test';

console.log('🔧 Initializing database...');
console.log(`   Host: ${dbConfig.host}`);
console.log(`   User: ${dbConfig.user}`);
console.log(`   Password: ${dbConfig.password ? '***set***' : '(none)'}`);
console.log(`   Database: ${dbName}\n`);

// Create connection
const connection = mysql.createConnection(dbConfig);

// Connect and initialize
connection.connect((err) => {
    if (err) {
        console.error('❌ Failed to connect to MySQL:', err.message);
        console.log('\n💡 Check:');
        console.log('   1. MySQL is running');
        console.log('   2. Your .env file has correct credentials');
        console.log('   3. If root has a password, add it to DB_PASS in .env');
        process.exit(1);
    }

    console.log('✅ Connected to MySQL server\n');

    // Create database
    connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`, (err) => {
        if (err) {
            console.error('❌ Error creating database:', err.message);
            connection.end();
            process.exit(1);
        }

        console.log(`✅ Database '${dbName}' created/verified`);

        // Use the database
        connection.query(`USE ${dbName}`, (err) => {
            if (err) {
                console.error('❌ Error selecting database:', err.message);
                connection.end();
                process.exit(1);
            }

            // Create users table
            const createTableSQL = `
                CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    email VARCHAR(100) NOT NULL UNIQUE,
                    password VARCHAR(255) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                );
            `;

            connection.query(createTableSQL, (err) => {
                if (err) {
                    console.error('❌ Error creating table:', err.message);
                    connection.end();
                    process.exit(1);
                }

                console.log('✅ Table "users" created/verified');
                console.log('\n✨ Database initialization complete!');
                console.log('   You can now start your server with: npm start\n');

                connection.end();
                process.exit(0);
            });
        });
    });
});

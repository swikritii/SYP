// Load environment variables FIRST
require('dotenv').config();

const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

// Connection config without database (to create it first)
// Using root user by default
const rootConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',  // Empty string for no password
    multipleStatements: true
};

async function initializeDatabase() {
    const connection = mysql.createConnection(rootConfig);
    
    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                console.error('❌ Failed to connect to MySQL:', err.message);
                console.log('\n💡 Make sure:');
                console.log('   1. MySQL is running');
                console.log('   2. Your .env file has correct credentials');
                console.log('   3. You are using root user (or have proper permissions)\n');
                reject(err);
                return;
            }

            console.log('✅ Connected to MySQL server');

            // Read schema file from same directory
            const schemaPath = path.join(__dirname, 'schema.sql');
            
            if (!fs.existsSync(schemaPath)) {
                console.error('❌ schema.sql file not found at:', schemaPath);
                connection.end();
                reject(new Error('schema.sql not found'));
                return;
            }

            const schema = fs.readFileSync(schemaPath, 'utf8');

            connection.query(schema, (err, results) => {
                if (err) {
                    console.error('❌ Error creating database/tables:', err.message);
                    connection.end();
                    reject(err);
                    return;
                }

                console.log('✅ Database initialized successfully!');
                console.log('   - Database: test');
                console.log('   - Table: users (created)');
                connection.end();
                resolve();
            });
        });
    });
}

// Run if called directly
if (require.main === module) {
    initializeDatabase()
        .then(() => {
            console.log('\n✨ Setup complete! You can now start your server.');
            process.exit(0);
        })
        .catch((err) => {
            console.error('\n❌ Setup failed. Please check the error above.');
            process.exit(1);
        });
}

module.exports = { initializeDatabase };

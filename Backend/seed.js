require('dotenv').config();
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'test'
};

async function seed() {
    console.log('🌱 Seeding demo users...');
    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        
        // Ensure role column exists (in case init-db wasn't run)
        try {
            await connection.query('ALTER TABLE users ADD COLUMN role ENUM("player", "owner", "admin") DEFAULT "player" AFTER password');
            console.log('✅ Added role column to users table');
        } catch (e) {
            // Probably already exists
        }

        const password = await bcrypt.hash('password123', 10);
        
        const demoUsers = [
            ['Demo Player', 'player@demo.com', password, 'player'],
            ['Demo Owner', 'owner@demo.com', password, 'owner'],
            ['Demo Admin', 'admin@demo.com', password, 'admin']
        ];

        for (const [name, email, pass, role] of demoUsers) {
            // Check if user exists
            const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
            if (rows.length === 0) {
                await connection.query(
                    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
                    [name, email, pass, role]
                );
                console.log(`✅ Created ${role} user: ${email}`);
            } else {
                // Update role just in case
                await connection.query('UPDATE users SET role = ? WHERE email = ?', [role, email]);
                console.log(`ℹ️ User ${email} already exists, role updated to ${role}`);
            }
        }

        console.log('\n✨ Seeding complete! Credentials:');
        console.log('   - Player: player@demo.com / password123');
        console.log('   - Owner: owner@demo.com / password123');
        console.log('   - Admin: admin@demo.com / password123\n');

    } catch (err) {
        console.error('❌ Seeding failed:', err.message);
    } finally {
        if (connection) await connection.end();
    }
}

seed();

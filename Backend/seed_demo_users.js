const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function seedDemoUsers() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        database: process.env.DB_NAME || 'test'
    });

    try {
        console.log('🌱 Seeding demo users...');

        const demoUsers = [
            { name: 'Demo Admin', email: 'admin@gmail.com', password: 'admin123', role: 'admin' },
            { name: 'Demo Owner', email: 'owner@gmail.com', password: 'owner123', role: 'owner' }
        ];

        for (const user of demoUsers) {
            // Check if user exists
            const [rows] = await connection.execute('SELECT id FROM users WHERE email = ?', [user.email]);
            
            if (rows.length > 0) {
                console.log(`ℹ️ User ${user.email} already exists. Updating password/role.`);
                const hashedPassword = await bcrypt.hash(user.password, 10);
                await connection.execute(
                    'UPDATE users SET password = ?, role = ? WHERE email = ?',
                    [hashedPassword, user.role, user.email]
                );
            } else {
                console.log(`➕ Creating user ${user.email}...`);
                const hashedPassword = await bcrypt.hash(user.password, 10);
                await connection.execute(
                    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
                    [user.name, user.email, hashedPassword, user.role]
                );
            }
        }

        console.log('✅ Demo users seeded successfully!');
    } catch (error) {
        console.error('❌ Error seeding demo users:', error);
    } finally {
        await connection.end();
    }
}

seedDemoUsers();

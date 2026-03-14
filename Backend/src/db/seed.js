// Backend Seed Script - Verified Case Sensitive Path
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
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

        // Add demo courts
        const [ownerRows] = await connection.query('SELECT id FROM users WHERE email = ?', ['owner@demo.com']);
        if (ownerRows.length > 0) {
            const ownerId = ownerRows[0].id;
            
            const courts = [
              {
                name: 'Urban Arena Futsal',
                location: 'Jakarta, Indonesia',
                price: 75,
                description: 'Urban Arena Futsal is a state-of-the-art indoor futsal facility located in the heart of Jakarta.',
                images: JSON.stringify(['https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&q=80']),
              },
              {
                name: 'Elite Futsal Center',
                location: 'Bandung, Indonesia',
                price: 90,
                description: 'Elite Futsal Center offers premium indoor courts with professional-grade facilities.',
                images: JSON.stringify(['https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80']),
              },
              {
                name: 'Greenlight Sports Arena',
                location: 'Surabaya, Indonesia',
                price: 60,
                description: 'Affordable and well-maintained courts for everyone.',
                images: JSON.stringify(['https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80']),
              }
            ];

            for (const court of courts) {
                const [existingCourt] = await connection.query('SELECT id FROM courts WHERE name = ?', [court.name]);
                if (existingCourt.length === 0) {
                    await connection.query(
                        'INSERT INTO courts (owner_id, name, location, price_per_hour, description, images) VALUES (?, ?, ?, ?, ?, ?)',
                        [ownerId, court.name, court.location, court.price, court.description, court.images]
                    );
                    console.log(`✅ Created court: ${court.name}`);
                }
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

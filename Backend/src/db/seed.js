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

        // Ensure video_url column exists
        try {
            await connection.query('ALTER TABLE courts ADD COLUMN video_url VARCHAR(255) AFTER images');
            console.log('✅ Added video_url column to courts table');
        } catch (e) {
            // Already exists
        }

        // DELETE unwanted Indonesian courts
        console.log('🗑️ Removing Indonesian courts...');
        await connection.query('DELETE FROM courts WHERE name IN ("Urban Futsal", "Elite Futsal", "Greenlight Futsal", "Futsal Arena", "Pro Futsal", "Stadium Hub")');

        // Add demo courts
        const [ownerRows] = await connection.query('SELECT id FROM users WHERE email = ?', ['owner@demo.com']);
        if (ownerRows.length > 0) {
            const ownerId = ownerRows[0].id;
            
            const courts = [
              {
                name: 'Kirtipur Futsal Hub',
                location: 'Kirtipur, Kathmandu',
                price: 1500,
                description: 'A premium futsal facility in Kirtipur with excellent amenities and a competitive atmosphere.',
                images: JSON.stringify(['https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80', 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80']),
                video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Rickroll as placeholder OR a real futsal video
              },
              {
                name: 'Pokhara Sports Castle',
                location: 'Pokhara, Kaski',
                price: 1800,
                description: 'Enjoy futsal with a view of the mountains. One of the best courts in Pokhara.',
                images: JSON.stringify(['https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80', 'https://images.unsplash.com/photo-1624880353868-239871bc3a6a?w=800&q=80']),
                video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
              },
              {
                name: 'Biratnagar United Futsal',
                location: 'Biratnagar, Morang',
                price: 1200,
                description: 'Well-maintained indoor court in Biratnagar, perfect for local tournaments and friendly matches.',
                images: JSON.stringify(['https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80']),
                video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
              }
            ];

            for (const court of courts) {
                const [existingCourt] = await connection.query('SELECT id FROM courts WHERE name = ?', [court.name]);
                if (existingCourt.length === 0) {
                    await connection.query(
                        'INSERT INTO courts (owner_id, name, location, price_per_hour, description, images, video_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
                        [ownerId, court.name, court.location, court.price, court.description, court.images, court.video_url]
                    );
                    console.log(`✅ Created court: ${court.name}`);
                } else {
                    // Update images and video_url for existing courts
                    await connection.query(
                        'UPDATE courts SET images = ?, video_url = ?, location = ?, description = ? WHERE id = ?',
                        [court.images, court.video_url, court.location, court.description, existingCourt[0].id]
                    );
                    console.log(`✅ Updated court: ${court.name}`);
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

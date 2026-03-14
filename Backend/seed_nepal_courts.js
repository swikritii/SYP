const { pool } = require('./src/db');
const bcrypt = require('bcryptjs');

const courts = [
  { name: 'Kathmandu Futsal Arena', location: 'Putalisadak, Kathmandu', price: 1500, desc: 'Premium astroturf futsal ground in the heart of Kathmandu.', img: ['https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=400&h=300'] },
  { name: 'Patan Kings Futsal', location: 'Pulchowk, Lalitpur', price: 1200, desc: 'High-quality indoor futsal court with excellent lighting.', img: ['https://images.unsplash.com/photo-1551280857-2b9ebf241ac4?q=80&w=400&h=300'] },
  { name: 'Bhakatpur Sports Hub', location: 'Suryabinayak, Bhaktapur', price: 1000, desc: 'Spacious 5A side futsal ground in Bhaktapur.', img: ['https://plus.unsplash.com/premium_photo-1661962360525-f3c5520c1bfc?q=80&w=400&h=300'] },
  { name: 'Pokhara Futsal Club', location: 'Lakeside, Pokhara', price: 1600, desc: 'Scenic futsal court near Fewa Lake with great ambiance.', img: ['https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=400&h=300'] },
  { name: 'Dharan Khelkud Kendra', location: 'Bhanuchowk, Dharan', price: 1100, desc: 'Well-maintained futsal ground with regular tournaments.', img: ['https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=400&h=300'] },
  { name: 'Biratnagar Sports Arena', location: 'Traffic Chowk, Biratnagar', price: 1300, desc: 'Top-class futsal facilities in the Eastern region.', img: ['https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=400&h=300'] },
  { name: 'Baneshwor Futsal', location: 'New Baneshwor, Kathmandu', price: 1400, desc: 'Standard futsal pitch with ample parking space.', img: ['https://images.unsplash.com/photo-1624880357913-a8539238245b?q=80&w=400&h=300'] },
  { name: 'Butwal United Futsal', location: 'Milanchowk, Butwal', price: 1250, desc: 'Newly renovated 7-a-side futsal ground in Butwal.', img: ['https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=400&h=300'] },
  { name: 'Chitwan Tigers Futsal', location: 'Narayangarh, Chitwan', price: 1150, desc: 'High quality synthetic turf ground in Chitwan.', img: ['https://images.unsplash.com/photo-1551280857-2b9ebf241ac4?q=80&w=400&h=300'] },
  { name: 'Hetauda Futsal Park', location: 'Buddha Chowk, Hetauda', price: 1050, desc: 'Quiet, well-managed futsal ground with coaching available.', img: ['https://plus.unsplash.com/premium_photo-1661962360525-f3c5520c1bfc?q=80&w=400&h=300'] },
  { name: 'Kirtipur Recreation Futsal', location: 'Naya Bazar, Kirtipur', price: 1350, desc: 'Popular among university students, very lively atmosphere.', img: ['https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=400&h=300'] },
  { name: 'Thamel City Futsal', location: 'Z Street, Thamel', price: 1800, desc: 'Premium futsal pitch right in the tourist district of Kathmandu.', img: ['https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=400&h=300'] },
  { name: 'Itahari Futsal Arena', location: 'Bus Park Road, Itahari', price: 1000, desc: 'Great quality artificial grass, suitable for 5v5 matches.', img: ['https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=400&h=300'] },
  { name: 'Bhairahawa Sports Complex', location: 'Devkota Chowk, Bhairahawa', price: 1100, desc: 'Large sports complex featuring an excellent futsal ground.', img: ['https://images.unsplash.com/photo-1551280857-2b9ebf241ac4?q=80&w=400&h=300'] },
  { name: 'Nepalgunj Futsal Club', location: 'Dhamboji, Nepalgunj', price: 900, desc: 'One of the best futsal grounds in the mid-western region.', img: ['https://plus.unsplash.com/premium_photo-1661962360525-f3c5520c1bfc?q=80&w=400&h=300'] }
];

async function seedCourts() {
  try {
    console.log('Starting seed process...');
    
    // Check if an owner exists
    const [owners] = await pool.query('SELECT id FROM users WHERE role = ? LIMIT 1', ['owner']);
    let ownerId;
    
    if (owners.length === 0) {
      console.log('No owner found. Creating default owner...');
      const hashedPassword = await bcrypt.hash('password123', 10);
      const [result] = await pool.query(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        ['Super Owner', 'owner@futsalflow.com', hashedPassword, 'owner']
      );
      ownerId = result.insertId;
      console.log('Created owner with ID:', ownerId);
    } else {
      ownerId = owners[0].id;
      console.log('Using existing owner with ID:', ownerId);
    }

    // Insert courts
    console.log(`Inserting ${courts.length} courts into the database...`);
    let count = 0;
    
    for (const court of courts) {
      // Check if court already exists to avoid duplicates if run multiple times
      const [existing] = await pool.query('SELECT id FROM courts WHERE name = ?', [court.name]);
      if (existing.length === 0) {
        await pool.query(
          'INSERT INTO courts (owner_id, name, location, price_per_hour, description, images) VALUES (?, ?, ?, ?, ?, ?)',
          [ownerId, court.name, court.location, court.price, court.desc, JSON.stringify(court.img)]
        );
        count++;
      }
    }
    
    console.log(`Successfully seeded ${count} new courts!`);
  } catch (err) {
    console.error('Error seeding courts:', err);
  } finally {
    process.exit(0);
  }
}

seedCourts();

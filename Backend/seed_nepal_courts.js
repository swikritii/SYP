const { pool } = require('./src/db');
const bcrypt = require('bcryptjs');

const courts = [
  { name: 'Kathmandu Futsal Arena', location: 'Putalisadak, Kathmandu', lat: 27.705, lng: 85.321, price: 1500, desc: 'Premium astroturf futsal ground in the heart of Kathmandu.', img: ['https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&h=600'] },
  { name: 'Patan Kings Futsal', location: 'Pulchowk, Lalitpur', lat: 27.677, lng: 85.316, price: 1200, desc: 'High-quality indoor futsal court with excellent lighting.', img: ['https://images.unsplash.com/photo-1526232759583-02f4db0a513b?q=80&w=800&h=600'] },
  { name: 'Bhakatpur Sports Hub', location: 'Suryabinayak, Bhaktapur', lat: 27.662, lng: 85.428, price: 1000, desc: 'Spacious 5A side futsal ground in Bhaktapur.', img: ['https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&h=600'] },
  { name: 'Pokhara Futsal Club', location: 'Lakeside, Pokhara', lat: 28.209, lng: 83.959, price: 1600, desc: 'Scenic futsal court near Fewa Lake with great ambiance.', img: ['https://images.unsplash.com/photo-1551280857-2b9ebf241ac4?q=80&w=800&h=600'] },
  { name: 'Dharan Khelkud Kendra', location: 'Bhanuchowk, Dharan', lat: 26.812, lng: 87.283, price: 1100, desc: 'Well-maintained futsal ground with regular tournaments.', img: ['https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=800&h=600'] },
  { name: 'Biratnagar Sports Arena', location: 'Traffic Chowk, Biratnagar', lat: 26.452, lng: 87.271, price: 1300, desc: 'Top-class futsal facilities in the Eastern region.', img: ['https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=800&h=600'] },
  { name: 'Baneshwor Futsal', location: 'New Baneshwor, Kathmandu', lat: 27.691, lng: 85.333, price: 1400, desc: 'Standard futsal pitch with ample parking space.', img: ['https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=800&h=600'] },
  { name: 'Butwal United Futsal', location: 'Milanchowk, Butwal', lat: 27.702, lng: 83.454, price: 1250, desc: 'Newly renovated 7-a-side futsal ground in Butwal.', img: ['https://images.unsplash.com/photo-1624880357913-a8539238245b?q=80&w=800&h=600'] },
  { name: 'Chitwan Tigers Futsal', location: 'Narayangarh, Chitwan', lat: 27.683, lng: 84.428, price: 1150, desc: 'High quality synthetic turf ground in Chitwan.', img: ['https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&h=600'] },
  { name: 'Hetauda Futsal Park', location: 'Buddha Chowk, Hetauda', lat: 27.426, lng: 85.032, price: 1050, desc: 'Quiet, well-managed futsal ground with coaching available.', img: ['https://images.unsplash.com/photo-1518091044133-904000305886?q=80&w=800&h=600'] },
  { name: 'Kirtipur Recreation Futsal', location: 'Naya Bazar, Kirtipur', lat: 27.679, lng: 85.281, price: 1350, desc: 'Popular among university students, very lively atmosphere.', img: ['https://images.unsplash.com/photo-1556056504-5c7696c4028d?q=80&w=800&h=600'] },
  { name: 'Thamel City Futsal', location: 'Z Street, Thamel', lat: 27.714, lng: 85.311, price: 1800, desc: 'Premium futsal pitch right in the tourist district of Kathmandu.', img: ['https://images.unsplash.com/photo-1510566337590-2fc1f21d0faa?q=80&w=800&h=600'] },
  { name: 'Itahari Futsal Arena', location: 'Bus Park Road, Itahari', lat: 26.666, lng: 87.272, price: 1000, desc: 'Great quality artificial grass, suitable for 5v5 matches.', img: ['https://images.unsplash.com/photo-1431324155629-1a6eda1eedfa?q=80&w=800&h=600'] },
  { name: 'Bhairahawa Sports Complex', location: 'Devkota Chowk, Bhairahawa', lat: 27.505, lng: 83.450, price: 1100, desc: 'Large sports complex featuring an excellent futsal ground.', img: ['https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=800&h=600'] },
  { name: 'Nepalgunj Futsal Club', location: 'Dhamboji, Nepalgunj', lat: 28.062, lng: 81.616, price: 900, desc: 'One of the best futsal grounds in the mid-western region.', img: ['https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=800&h=600'] }
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
          'INSERT INTO courts (owner_id, name, location, latitude, longitude, price_per_hour, description, images) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [ownerId, court.name, court.location, court.lat, court.lng, court.price, court.desc, JSON.stringify(court.img)]
        );
        count++;
      } else {
        await pool.query(
          'UPDATE courts SET latitude = ?, longitude = ? WHERE id = ?',
          [court.lat, court.lng, existing[0].id]
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

require('dotenv').config();
const { pool } = require('./src/db');

async function run() {
    try {
        console.log('Altering notifications table...');
        await pool.query("ALTER TABLE notifications MODIFY COLUMN type ENUM('booking_cancelled', 'court_added', 'court_updated', 'system_alert', 'payment_success', 'new_review') NOT NULL");
        
        console.log('Creating reviews table...');
        await pool.query(`
            CREATE TABLE IF NOT EXISTS reviews (
                id INT AUTO_INCREMENT PRIMARY KEY,
                court_id INT NOT NULL,
                user_id INT NOT NULL,
                rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
                comment TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (court_id) REFERENCES courts(id) ON DELETE CASCADE,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                UNIQUE KEY idx_court_user (court_id, user_id)
            )
        `);
        console.log('Success!');
    } catch(err) {
        console.error('Error:', err);
    } finally {
        process.exit(0);
    }
}
run();

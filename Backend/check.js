const { pool } = require('./src/db');
const fs = require('fs');

async function check() {
    const [users] = await pool.query("SELECT id, email, role FROM users WHERE role = 'owner'");
    const [courts] = await pool.query("SELECT id, name, owner_id FROM courts");
    fs.writeFileSync('output.json', JSON.stringify({users, courts}, null, 2));
    process.exit(0);
}
check();

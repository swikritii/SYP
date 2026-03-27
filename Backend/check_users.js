const { pool } = require('./src/db');

async function checkUsers() {
    try {
        const [users] = await pool.query("SELECT id, name, email, role FROM users WHERE role = 'owner'");
        console.table(users);
        
        const [courts] = await pool.query("SELECT id, name, owner_id FROM courts");
        console.table(courts);
        
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
checkUsers();

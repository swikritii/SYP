const { pool } = require('./src/db');

async function updateLocations() {
    try {
        await pool.query("UPDATE courts SET location = REPLACE(location, 'Jakarta, Indonesia', 'Kathmandu, Nepal')");
        await pool.query("UPDATE courts SET location = REPLACE(location, 'Bandung, Indonesia', 'Lalitpur, Nepal')");
        await pool.query("UPDATE courts SET location = REPLACE(location, 'Surabaya, Indonesia', 'Pokhara, Nepal')");
        await pool.query("UPDATE courts SET location = REPLACE(location, 'Indonesia', 'Nepal')");
        
        const [courts] = await pool.query("SELECT id, name, location FROM courts");
        console.table(courts);
        console.log("Locations updated successfully");
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
updateLocations();

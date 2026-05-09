const { pool } = require('./src/db.js');

async function alterDB() {
  try {
    await pool.query('ALTER TABLE users ADD COLUMN reset_password_token VARCHAR(255)');
    console.log("Added reset_password_token");
  } catch(e) {
    if(e.code === 'ER_DUP_FIELDNAME') console.log("reset_password_token already exists");
    else console.error(e);
  }

  try {
    await pool.query('ALTER TABLE users ADD COLUMN reset_password_expires BIGINT');
    console.log("Added reset_password_expires");
  } catch(e) {
    if(e.code === 'ER_DUP_FIELDNAME') console.log("reset_password_expires already exists");
    else console.error(e);
  }

  process.exit();
}

alterDB();

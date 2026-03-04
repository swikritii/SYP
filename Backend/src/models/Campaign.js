const { pool } = require('../db');

/**
 * Campaign Model
 * Handles data access for social or government campaigns.
 */
const Campaign = {
    async getAll() {
        const [rows] = await pool.query('SELECT * FROM campaigns');
        return rows;
    },
};

module.exports = Campaign;

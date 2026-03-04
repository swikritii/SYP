const { pool } = require('../db');

/**
 * Issue Model
 * Handles data access for community issues reported by users.
 */
const Issue = {
    async getAll() {
        const [rows] = await pool.query('SELECT * FROM issues');
        return rows;
    },
    // Add more methods as needed...
};

module.exports = Issue;

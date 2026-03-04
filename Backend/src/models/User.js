const { pool } = require('../db');

/**
 * User Model
 * This file handles database queries related to the 'users' table.
 */
const User = {
    async findByEmail(email) {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    },

    async findById(id) {
        const [rows] = await pool.query('SELECT id, name, email, role FROM users WHERE id = ?', [id]);
        return rows[0];
    },

    async create(userData) {
        const { name, email, password, role } = userData;
        const [result] = await pool.query(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, password, role]
        );
        return result.insertId;
    }
};

module.exports = User;

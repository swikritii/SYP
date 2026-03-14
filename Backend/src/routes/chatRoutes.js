const express = require('express');
const router = express.Router();
const { pool } = require('../db');
const authenticateToken = require('../middleware/auth');

router.use(authenticateToken);

router.get('/history', async (req, res) => {
    try {
        const [messages] = await pool.query(`
            SELECT m.id, m.message, m.created_at, u.name as user_name, u.id as user_id
            FROM chat_messages m
            JOIN users u ON m.user_id = u.id
            ORDER BY m.created_at DESC
            LIMIT 50
        `);
        // Reverse array so oldest is first, newest is last, as needed for UI
        res.json(messages.reverse());
    } catch (err) {
        console.error('Error fetching chat history:', err);
        res.status(500).json({ message: 'Error fetching chat history', error: err.message });
    }
});

module.exports = router;

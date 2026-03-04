const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');

/**
 * Admin Routes
 * Protected routes for administrative tasks.
 */

router.use(authenticateToken); // Protect all admin routes

router.get('/dashboard', (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied: Admins only' });
    }
    res.json({ message: 'Welcome to the Admin Dashboard' });
});

module.exports = router;

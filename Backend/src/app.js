const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoute');

/**
 * Express Application Configuration
 * This file initializes the Express app, sets up global middleware,
 * and attaches all the routes.
 */

const app = express();

// Global Middleware
app.use(cors());           // Enables Cross-Origin Resource Sharing
app.use(express.json());   // Parses incoming JSON requests

// Root Health Check Route
app.get('/', (req, res) => {
    res.json({ 
        message: 'NagarSewa Backend API is running!',
        status: 'OK',
        timestamp: new Date().toISOString()
    });
});

// API Routes
app.use('/api', userRoutes);

const courtRoutes = require('./routes/courtRoutes');
app.use('/api/courts', courtRoutes);

const bookingRoutes = require('./routes/bookingRoutes');
app.use('/api/bookings', bookingRoutes);

const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);

const chatRoutes = require('./routes/chatRoutes');
app.use('/api/chat', chatRoutes);

const notificationRoutes = require('./routes/notificationRoutes');
app.use('/api/notifications', notificationRoutes);

const paymentRoutes = require('./routes/paymentRoutes');
app.use('/api/payments', paymentRoutes);

// Demo /users route (if still needed)
const { pool } = require('./db');
app.get('/api/users', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id, name, email, created_at FROM users');
        res.json(rows);
    } catch (err) {
        console.error('Database error in /users:', err);
        res.status(500).json({ message: 'Database error', error: err.message });
    }
});

module.exports = app;

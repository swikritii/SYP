const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../db');

const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';

/**
 * Authorization Controller
 * Handles user signup, login, and fetching current user info.
 */
const AuthorizationController = {
    // Signup: Create a new user
    async signup(req, res) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please provide name, email, and password' });
        }

        try {
            // Check if user exists
            const [existing] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
            
            if (existing.length > 0) {
                return res.status(400).json({ message: 'User with this email already exists' });
            }

            // Hash password and create user
            const hashedPassword = await bcrypt.hash(password, 10);
            const userRole = req.body.role || 'player';
            const [result] = await pool.query(
                'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
                [name, email, hashedPassword, userRole]
            );

            const user = { id: result.insertId, name, email, role: userRole };
            const token = jwt.sign({ id: user.id, email: user.email, name: user.name, role: user.role }, JWT_SECRET, { expiresIn: '2h' });

            res.status(201).json({
                message: 'User created successfully',
                user,
                token
            });
        } catch (err) {
            console.error('Database error during signup:', err);
            res.status(500).json({ message: 'Database error', error: err.message });
        }
    },

    // Login: Authenticate existing user
    async login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        try {
            const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

            if (users.length === 0) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const user = users[0];
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ id: user.id, email: user.email, name: user.name, role: user.role }, JWT_SECRET, { expiresIn: '2h' });

            res.json({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token
            });
        } catch (err) {
            console.error('Database error during login:', err);
            res.status(500).json({ message: 'Database error', error: err.message });
        }
    },

    // Me: Get current user profile (requires authentication middleware)
    async me(req, res) {
        try {
            const [users] = await pool.query('SELECT id, name, email, role FROM users WHERE id = ?', [req.user.id]);

            if (users.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json(users[0]);
        } catch (err) {
            console.error('Database error in /me:', err);
            res.status(500).json({ message: 'Database error', error: err.message });
        }
    }
};

module.exports = AuthorizationController;

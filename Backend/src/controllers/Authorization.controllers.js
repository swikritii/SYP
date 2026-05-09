const bcrypt = require('bcryptjs');
const crypto = require('crypto');
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
            
            // Validate and assign user role
            const validRoles = ['player', 'owner', 'admin'];
            const requestedRole = req.body.role ? req.body.role.toLowerCase() : 'player';
            const userRole = validRoles.includes(requestedRole) ? requestedRole : 'player';

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
    },

    // Forgot Password
    async forgotPassword(req, res) {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: 'Email is required' });
        try {
            const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
            if (users.length === 0) return res.status(404).json({ message: 'User not found' });
            
            const token = crypto.randomBytes(20).toString('hex');
            const expires = Date.now() + 3600000; // 1 hour
            
            await pool.query('UPDATE users SET reset_password_token = ?, reset_password_expires = ? WHERE email = ?', [token, expires, email]);
            
            console.log(`\n\n=== PASSWORD RESET LINK ===\nhttp://localhost:5173/reset-password/${token}\n===========================\n\n`);
            
            res.json({ message: 'Password reset link generated. Check the server console or your email!' });
        } catch (err) {
            console.error('Database error in /forgotPassword:', err);
            res.status(500).json({ message: 'Database error', error: err.message });
        }
    },

    // Reset Password
    async resetPassword(req, res) {
        const { token, newPassword } = req.body;
        if (!token || !newPassword) return res.status(400).json({ message: 'Token and new password are required' });
        
        try {
            const [users] = await pool.query('SELECT * FROM users WHERE reset_password_token = ? AND reset_password_expires > ?', [token, Date.now()]);
            if (users.length === 0) return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
            
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await pool.query('UPDATE users SET password = ?, reset_password_token = NULL, reset_password_expires = NULL WHERE id = ?', [hashedPassword, users[0].id]);
            
            res.json({ message: 'Password has been successfully updated' });
        } catch (err) {
            console.error('Database error in /resetPassword:', err);
            res.status(500).json({ message: 'Database error', error: err.message });
        }
    }
};

module.exports = AuthorizationController;

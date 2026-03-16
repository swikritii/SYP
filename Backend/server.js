// Load environment variables first
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool, testConnection } = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';

// Start server after database connection
async function startServer() {
    console.log('\n🔌 Connecting to database...');
    
    const connected = await testConnection();
    
    if (!connected) {
        console.log('\n❌ Cannot start server without database connection');
        console.log('\n💡 Make sure:');
        console.log('   1. Your .env file has correct credentials');
        console.log('   2. MySQL is running');
        console.log('   3. Run "npm run init-db" first\n');
        process.exit(1);
    }

    // Start Express server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
        console.log(`📍 API: http://localhost:${PORT}\n`);
    });
}

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});

app.get('/users', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id, name, email, created_at FROM users');
        res.json(rows);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ message: 'Database error', error: err.message });
    }
});

app.post('/signup', async (req, res) => {
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
        const [result] = await pool.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );

        const user = { id: result.insertId, name, email };
        const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '2h' });

        res.status(201).json({
            message: 'User created successfully',
            user,
            token
        });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ message: 'Database error', error: err.message });
    }
});

app.post('/login', async (req, res) => {
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

        const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '2h' });

        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            token
        });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ message: 'Database error', error: err.message });
    }
});

app.get('/me', authenticateToken, async (req, res) => {
    try {
        const [users] = await pool.query('SELECT id, name, email FROM users WHERE id = ?', [req.user.id]);

        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(users[0]);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ message: 'Database error', error: err.message });
    }
});

// JWT middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Missing token' });
    }

    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = payload;
        next();
    });
}

// Start the server
startServer().catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
});

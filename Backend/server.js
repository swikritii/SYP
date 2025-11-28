const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // This allows the server to parse JSON data from requests

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});

// Connect to database
db.connect((err) => {
    if (err) {
        console.log('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database!');
});

app.get('/', (req, res) => {
    return res.json({message: 'Hello World'});
});

app.get('/users', (req, res) => {
const sql="SELECT * FROM users";
db.query(sql, (err, data) => {
    if (err) return res.json({message: 'Error'});
    return res.json(data);
});
});

// Signup endpoint
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    
    // Validate input
    if (!name || !email || !password) {
        return res.status(400).json({message: 'Please provide name, email, and password'});
    }

    // Check if user already exists
    const checkSql = "SELECT * FROM users WHERE email = ?";
    db.query(checkSql, [email], (err, data) => {
        if (err) {
            console.log('Database error:', err);
            return res.status(500).json({message: 'Database error', error: err.message});
        }
        
        if (data.length > 0) {
            return res.status(400).json({message: 'User with this email already exists'});
        }

        // Insert new user
        const insertSql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        db.query(insertSql, [name, email, password], (err, result) => {
            if (err) {
                console.log('Database error:', err);
                return res.status(500).json({message: 'Error creating user', error: err.message});
            }
            return res.status(201).json({
                message: 'User created successfully',
                userId: result.insertId
            });
        });
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
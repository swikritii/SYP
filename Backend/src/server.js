/**
 * Application Entry Point
 * This is the file you run to start the server.
 * It ensures the database is connected before starting the Express app.
 */
require('dotenv').config();
const app = require('./app');
const { testConnection } = require('./db');

// Main function to initialize and start the server
async function startServer() {
    console.log('\n🔌 Connecting to database...');
    
    // First, verify we can talk to the DB
    const connected = await testConnection();
    
    if (!connected) {
        console.log('\n❌ Cannot start server without database connection');
        console.log('\n💡 Troubleshooting steps:');
        console.log('   1. Check your .env for DB credentials');
        console.log('   2. Ensure your MySQL server is running');
        console.log('   3. Run "npm run init-db" if this is a fresh setup\n');
        process.exit(1);
    }

    // If connected, start the server on the configured port
    const PORT = process.env.PORT || 3000;
    
    // Create HTTP server instead of using app.listen directly
    const http = require('http');
    const server = http.createServer(app);
    
    // Initialize Socket.io
    const { Server } = require('socket.io');
    const io = new Server(server, {
        cors: {
            origin: "*", // allow all in dev
            methods: ["GET", "POST"]
        }
    });

    const { pool } = require('./db');

    // Socket.io logic
    io.on('connection', (socket) => {
        console.log('⚡ A user connected to chat:', socket.id);

        // When a user sends a message
        socket.on('send_message', async (data) => {
            // data should contain { userId, userName, message }
            try {
                // Save to DB
                const [result] = await pool.query(
                    'INSERT INTO chat_messages (user_id, message) VALUES (?, ?)',
                    [data.userId, data.message]
                );

                const messageObj = {
                    id: result.insertId,
                    user_id: data.userId,
                    user_name: data.userName,
                    message: data.message,
                    created_at: new Date().toISOString()
                };

                // Broadcast to everyone
                io.emit('receive_message', messageObj);
            } catch (err) {
                console.error('Socket error saving message:', err);
            }
        });

        socket.on('disconnect', () => {
            console.log('🔴 User disconnected:', socket.id);
        });
    });

    server.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
        console.log(`📍 API Base: http://localhost:${PORT}`);
        console.log(`📍 Test Health: http://localhost:${PORT}/\n`);
    });
}

// Start the server process
startServer().catch(err => {
    console.error('Critical failure during startup:', err);
    process.exit(1);
});

const { pool } = require('../db');

let io = null;

/**
 * Notification Service
 * Handles creation of in-app notifications
 */
const NotificationService = {
    setIo(ioInstance) {
        io = ioInstance;
    },
    /**
     * Create a notification record in the database
     * @param {number} userId - The recipient of the notification
     * @param {string} type - Enum: 'booking_cancelled', 'court_added', 'court_updated', 'system_alert'
     * @param {string} message - The content of the notification
     */
    async createNotification(userId, type, message) {
        try {
            const [result] = await pool.query(
                'INSERT INTO notifications (user_id, type, message) VALUES (?, ?, ?)',
                [userId, type, message]
            );

            // Broadcast real-time notification if socket is available
            if (io) {
                io.to(`user_${userId}`).emit('new_notification', {
                    id: result.insertId,
                    user_id: userId,
                    type,
                    message,
                    created_at: new Date().toISOString()
                });
            }

            return true;
        } catch (err) {
            console.error('Error in NotificationService.createNotification:', err);
            return false;
        }
    }
};

module.exports = NotificationService;

const { pool } = require('../db');

/**
 * Notification Service
 * Handles creation of in-app notifications
 */
const NotificationService = {
    /**
     * Create a notification record in the database
     * @param {number} userId - The recipient of the notification
     * @param {string} type - Enum: 'booking_cancelled', 'court_added', 'court_updated', 'system_alert'
     * @param {string} message - The content of the notification
     */
    async createNotification(userId, type, message) {
        try {
            await pool.query(
                'INSERT INTO notifications (user_id, type, message) VALUES (?, ?, ?)',
                [userId, type, message]
            );
            return true;
        } catch (err) {
            console.error('Error in NotificationService.createNotification:', err);
            return false;
        }
    }
};

module.exports = NotificationService;

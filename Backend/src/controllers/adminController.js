const { pool } = require('../db');

const AdminController = {
    // Dashboard Stats
    async getDashboardStats(req, res) {
        try {
            const [userCountRows] = await pool.query('SELECT COUNT(*) as count FROM users');
            const [courtCountRows] = await pool.query('SELECT COUNT(*) as count FROM courts');
            const [bookingCountRows] = await pool.query('SELECT COUNT(*) as count FROM bookings');
            const [revenueRows] = await pool.query('SELECT SUM(amount) as total FROM payments WHERE status = "completed"');

            res.json({
                totalUsers: userCountRows[0].count,
                totalCourts: courtCountRows[0].count,
                totalBookings: bookingCountRows[0].count,
                totalRevenue: revenueRows[0].total || 0
            });
        } catch (err) {
            console.error('Error fetching admin stats:', err);
            res.status(500).json({ message: 'Error fetching stats', error: err.message });
        }
    },

    // Get all users
    async getAllUsers(req, res) {
        try {
            const [users] = await pool.query('SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC');
            res.json(users);
        } catch (err) {
            console.error('Error fetching users:', err);
            res.status(500).json({ message: 'Error fetching users', error: err.message });
        }
    },

    // Update user role
    async updateUserRole(req, res) {
        try {
            const { role } = req.body;
            const userId = req.params.id;
            
            if (!['player', 'owner', 'admin'].includes(role)) {
                return res.status(400).json({ message: 'Invalid role' });
            }

            await pool.query('UPDATE users SET role = ? WHERE id = ?', [role, userId]);
            res.json({ message: 'User role updated successfully' });
        } catch (err) {
            console.error('Error updating user role:', err);
            res.status(500).json({ message: 'Error updating user role', error: err.message });
        }
    },

    // Delete a user
    async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            
            // Prevent deleting yourself
            if (parseInt(userId) === req.user.id) {
                return res.status(400).json({ message: 'Cannot delete your own admin account' });
            }

            await pool.query('DELETE FROM users WHERE id = ?', [userId]);
            res.json({ message: 'User deleted successfully' });
        } catch (err) {
            console.error('Error deleting user:', err);
            res.status(500).json({ message: 'Error deleting user', error: err.message });
        }
    },

    // Get all bookings across the platform
    async getAllBookings(req, res) {
        try {
            const [bookings] = await pool.query(`
                SELECT b.*, c.name as court_name, u.name as user_name 
                FROM bookings b
                JOIN courts c ON b.court_id = c.id
                JOIN users u ON b.user_id = u.id
                ORDER BY b.created_at DESC
            `);
            res.json(bookings);
        } catch (err) {
            console.error('Error fetching all bookings:', err);
            res.status(500).json({ message: 'Error fetching all bookings', error: err.message });
        }
    }
};

module.exports = AdminController;

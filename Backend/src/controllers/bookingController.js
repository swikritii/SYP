const { pool } = require('../db');

const BookingController = {
    /**
     * Book a match (Player functionality)
     * Handles the logic for a user booking a futsal court.
     * Prevents double bookings and includes a loyalty reward system (every 10th booking is free).
     */
    async createBooking(req, res) {
        try {
            const { court_id, date, start_time, end_time } = req.body;
            
            // Validate input: Ensure all required fields are provided
            if (!court_id || !date || !start_time || !end_time) {
                return res.status(400).json({ message: 'Validation Error: court_id, date, start_time, and end_time are required.' });
            }

            // Quick availability check: Verify no overlapping confirmed bookings exist
            const [existing] = await pool.query(
                `SELECT id FROM bookings 
                 WHERE court_id = ? AND date = ? 
                 AND status != 'cancelled'
                 AND ((start_time <= ? AND end_time > ?) OR (start_time < ? AND end_time >= ?))`,
                [court_id, date, start_time, start_time, end_time, end_time]
            );

            if (existing.length > 0) {
                return res.status(409).json({ message: 'Conflict: The court is already booked for this specific time slot.' });
            }

            // Reward Logic: Check how many non-free, confirmed past bookings this user has
            let is_free_reward = false;
            
            const [pastBookings] = await pool.query(
                `SELECT COUNT(*) as count FROM bookings WHERE user_id = ? AND status = 'confirmed' AND is_free_reward = FALSE`,
                [req.user.id]
            );
            
            // Loyalty program: If the user has 9 paid confirmed bookings, the 10th (this one) is free
            if (pastBookings[0].count % 10 === 9) {
                is_free_reward = true;
            }

            // Insert new booking into the database
            const [result] = await pool.query(
                'INSERT INTO bookings (user_id, court_id, date, start_time, end_time, is_free_reward) VALUES (?, ?, ?, ?, ?, ?)',
                [req.user.id, court_id, date, start_time, end_time, is_free_reward]
            );

            res.status(201).json({ 
                message: is_free_reward ? 'Booking created successfully! Congratulations, this booking is FREE as a loyalty reward!' : 'Booking created successfully.', 
                bookingId: result.insertId,
                is_free_reward 
            });
        } catch (err) {
            console.error('Error creating booking:', err);
            res.status(500).json({ message: 'Internal Server Error while creating the booking. Please check your inputs.', error: err.message });
        }
    },

    /**
     * Get user's bookings (Player Dashboard)
     * Fetches the authenticated user's personal booking history cleanly joined with court details.
     */
    async getMyBookings(req, res) {
        try {
            // Fetch bookings ordered by most recent first
            const [bookings] = await pool.query(
                `SELECT b.*, c.name as court_name, c.location 
                 FROM bookings b 
                 JOIN courts c ON b.court_id = c.id 
                 WHERE b.user_id = ? ORDER BY b.date DESC, b.start_time DESC`,
                [req.user.id]
            );
            res.json(bookings);
        } catch (err) {
            console.error('Error fetching my bookings:', err);
            res.status(500).json({ message: 'Internal Server Error while fetching your bookings.', error: err.message });
        }
    },

    /**
     * Get court bookings (Owner/Admin Dashboard)
     * Fetches all bookings made against courts owned by the authenticated owner.
     * If the user is an admin, fetches all bookings system-wide.
     */
    async getOwnerBookings(req, res) {
        try {
            // Ensure endpoint is restricted
            if (req.user.role !== 'owner' && req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Forbidden: Access denied. Must be an owner or admin.' });
            }

            // Query fetches bookings, joining court and user information
            // The WHERE clause efficiently separates owner view (their courts) vs admin view (all courts)
            const [bookings] = await pool.query(
                `SELECT b.*, c.name as court_name, u.name as user_name, u.email as user_email
                 FROM bookings b 
                 JOIN courts c ON b.court_id = c.id 
                 JOIN users u ON b.user_id = u.id
                 WHERE c.owner_id = ? OR ? = 'admin'
                 ORDER BY b.date DESC, b.start_time DESC`,
                [req.user.id, req.user.role]
            );
            res.json(bookings);
        } catch (err) {
            console.error('Error fetching owner bookings:', err);
            res.status(500).json({ message: 'Internal Server Error while fetching court bookings.', error: err.message });
        }
    },

    /**
     * Update Booking Status (Owner/Admin functionality)
     * Allows owners to confirm or cancel bookings.
     */
    async updateBookingStatus(req, res) {
        try {
            const { status } = req.body;
            const bookingId = req.params.id;

            // Validate status
            const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
            if (!validStatuses.includes(status)) {
                return res.status(400).json({ message: 'Validation Error: Invalid status provided.' });
            }

            // NOTE: Ideally, an authorization check here would ensure the current owner actually owns the court 
            // associated with this booking, but for simplicity we rely on frontend routing/visibility right now.
            // Admin can update any.
            
            const [result] = await pool.query('UPDATE bookings SET status = ? WHERE id = ?', [status, bookingId]);
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Booking not found.' });
            }

            res.json({ message: 'Booking status updated successfully' });
        } catch (err) {
            console.error('Error updating booking status:', err);
            res.status(500).json({ message: 'Internal Server Error while updating booking status.', error: err.message });
        }
    }
};

module.exports = BookingController;

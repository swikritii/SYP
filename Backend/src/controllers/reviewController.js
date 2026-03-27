const { pool } = require('../db');
const NotificationService = require('../services/notificationService');

const ReviewController = {
    /**
     * Get all reviews for a specific court
     * Public route
     */
    async getCourtReviews(req, res) {
        try {
            const courtId = req.params.courtId;
            
            // Fetch reviews joined with user info
            const [reviews] = await pool.query(
                `SELECT r.*, u.name as user_name 
                 FROM reviews r 
                 JOIN users u ON r.user_id = u.id 
                 WHERE r.court_id = ? 
                 ORDER BY r.created_at DESC`,
                [courtId]
            );

            // Fetch average rating and total count
            const [stats] = await pool.query(
                `SELECT AVG(rating) as average_rating, COUNT(*) as total_reviews 
                 FROM reviews 
                 WHERE court_id = ?`,
                [courtId]
            );

            res.json({
                reviews,
                stats: {
                    average_rating: stats[0].average_rating ? Number(stats[0].average_rating).toFixed(1) : 0,
                    total_reviews: stats[0].total_reviews
                }
            });
        } catch (err) {
            console.error('Error fetching court reviews:', err);
            res.status(500).json({ message: 'Error fetching reviews.', error: err.message });
        }
    },

    /**
     * Add or update a review for a court
     * Protected route (Player)
     */
    async addReview(req, res) {
        try {
            const courtId = req.params.courtId;
            const userId = req.user.id;
            const { rating, comment } = req.body;

            // Validate input
            if (!rating || rating < 1 || rating > 5) {
                return res.status(400).json({ message: 'Validation Error: Rating must be between 1 and 5.' });
            }

            // Check if user has already reviewed this court
            const [existing] = await pool.query(
                'SELECT id FROM reviews WHERE court_id = ? AND user_id = ?',
                [courtId, userId]
            );

            if (existing.length > 0) {
                // Update existing review
                await pool.query(
                    'UPDATE reviews SET rating = ?, comment = ? WHERE court_id = ? AND user_id = ?',
                    [rating, comment || null, courtId, userId]
                );
            } else {
                // Insert new review
                await pool.query(
                    'INSERT INTO reviews (court_id, user_id, rating, comment) VALUES (?, ?, ?, ?)',
                    [courtId, userId, rating, comment || null]
                );
            }

            // Fetch the court to get the owner_id and court name
            const [courts] = await pool.query('SELECT name, owner_id FROM courts WHERE id = ?', [courtId]);
            
            if (courts.length > 0) {
                const courtName = courts[0].name;
                const ownerId = courts[0].owner_id;

                // Notify the owner
                // Don't notify if the owner is reviewing their own court
                if (ownerId !== userId) {
                    await NotificationService.createNotification(
                        ownerId,
                        'new_review',
                        `Someone left a ${rating}-star review on your court: ${courtName}`
                    );
                }
            }

            res.status(existing.length > 0 ? 200 : 201).json({ 
                message: existing.length > 0 ? 'Review updated successfully' : 'Review added successfully' 
            });
            
        } catch (err) {
            console.error('Error adding review:', err);
            res.status(500).json({ message: 'Failed to submit review.', error: err.message });
        }
    }
};

module.exports = ReviewController;

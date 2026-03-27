const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/reviewController');
const authenticateToken = require('../middleware/auth');

// Public route to get reviews for a specific court
router.get('/courts/:courtId', ReviewController.getCourtReviews);

// Protected route to add or update a review
router.post('/courts/:courtId', authenticateToken, ReviewController.addReview);

module.exports = router;

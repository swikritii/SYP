const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authenticateToken = require('../middleware/auth');

/**
 * eSewa Payment Routes
 */

// Route to initiate payment (protected)
router.post('/initiate', authenticateToken, paymentController.initiatePayment);

// Route to verify payment callback from eSewa (public or specific to eSewa IP)
router.get('/verify', paymentController.verifyPayment);

module.exports = router;

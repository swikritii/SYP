const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/bookingController');
const authenticateToken = require('../middleware/auth');

// All booking routes require authentication
router.use(authenticateToken);

// Player routes
router.post('/', BookingController.createBooking);
router.get('/me', BookingController.getMyBookings);

// Owner/Admin routes
router.get('/owner', BookingController.getOwnerBookings);
router.put('/:id/status', BookingController.updateBookingStatus);

module.exports = router;

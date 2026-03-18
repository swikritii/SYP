const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/bookingController');
const authenticateToken = require('../middleware/auth');

// All booking routes require authentication
router.use(authenticateToken);

// Player routes
router.post('/', BookingController.createBooking);
router.get('/me', BookingController.getMyBookings);
router.patch('/:id/cancel', BookingController.cancelBooking);

// Owner/Admin routes
router.get('/owner', BookingController.getOwnerBookings);
router.put('/:id/status', BookingController.updateBookingStatus);

module.exports = router;

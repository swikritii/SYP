const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');
const authenticateToken = require('../middleware/auth');

// Middleware to ensure admin only
const requireAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied: Admins only' });
    }
    next();
};

router.use(authenticateToken);
router.use(requireAdmin);

// Admin Routes
router.get('/dashboard', AdminController.getDashboardStats);

router.get('/users', AdminController.getAllUsers);
router.put('/users/:id/role', AdminController.updateUserRole);
router.delete('/users/:id', AdminController.deleteUser);

router.get('/bookings', AdminController.getAllBookings);

module.exports = router;

const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/register', auth.register);
router.post('/login', auth.login);
router.post('/logout', auth.logout);

router.post('/forgot-password', auth.forgotPassword);
router.post('/reset-password', auth.resetPassword);

// Protected test route
router.get('/me', protect, auth.getMe);

// Example admin-only route
router.get('/admin-only', protect, authorizeRoles('Admin'), (req,res) => {
  res.json({ message: 'Welcome Admin' });
});

module.exports = router;

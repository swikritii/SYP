const express = require('express');
const router = express.Router();
const AuthorizationController = require('../controllers/Authorization.controllers');
const authenticateToken = require('../middleware/auth');

/**
 * User Routes
 * Defines endpoints for user authentication and profile management.
 */

// Public routes
router.post('/signup', AuthorizationController.signup);
router.post('/login', AuthorizationController.login);

// Protected routes (require JWT)
router.get('/me', authenticateToken, AuthorizationController.me);

module.exports = router;

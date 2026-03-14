const express = require('express');
const router = express.Router();
const CourtController = require('../controllers/courtController');
const authenticateToken = require('../middleware/auth');

// Public routes
router.get('/', CourtController.getAllCourts);
router.get('/:id', CourtController.getCourtById);

// Protected routes (Owner / Admin)
router.post('/', authenticateToken, CourtController.addCourt);
router.put('/:id', authenticateToken, CourtController.updateCourt);
router.delete('/:id', authenticateToken, CourtController.deleteCourt);

module.exports = router;

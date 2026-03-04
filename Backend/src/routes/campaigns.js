const express = require('express');
const router = express.Router();

/**
 * Campaign Routes
 * Handles endpoints for viewing and participating in campaigns.
 */

router.get('/', (req, res) => {
    res.json({ message: 'List of all active campaigns' });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Details for campaign ${id}` });
});

module.exports = router;

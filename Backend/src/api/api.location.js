const express = require('express');
const router = express.Router();

/**
 * Location API
 * This file will handle logic related to Nepal geographical data 
 * (Districts, Municipalities, Wards).
 */

router.get('/districts', (req, res) => {
    res.json({ message: 'List of districts in Nepal' });
});

router.get('/municipalities/:district', (req, res) => {
    const { district } = req.params;
    res.json({ message: `List of municipalities in ${district}` });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { calculateDistances } = require('../controllers/locationcontroller');

// POST endpoint to calculate distances
router.post('/distance', calculateDistances);



module.exports = router;



const express = require('express');
const { getTopSalonsNearby } = require('../controllers/topsaloncontroller');

const router = express.Router();

// Route to get top salons within a 10 km radius
router.get('/topsalons', getTopSalonsNearby);

module.exports = router;

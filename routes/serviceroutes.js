const express = require('express');
const { addService, getServices } = require('../controllers/servicecontroller');

const router = express.Router();

// Route to add a new service
router.post('/add', addService);

// Route to retrieve all services
router.get('/', getServices);

module.exports = router;

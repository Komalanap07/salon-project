const express = require('express');
const { signup } = require('../controllers/signupcontroller');

const router = express.Router();

// Route for signup
router.post('/', signup);

module.exports = router;

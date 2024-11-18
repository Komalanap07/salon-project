const express = require('express');
const { registerUser, getUsers, loginUser } = require('../controllers/usercontroller');

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Get all users
router.get('/', getUsers);

// Login user
router.post('/login', loginUser);

module.exports = router;

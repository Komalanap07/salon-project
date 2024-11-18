const express = require('express');
const { addOwner, getOwners, verifyToken } = require('../controllers/ownercontroller');


const router = express.Router();

// Public route to add an owner and get a token
router.post('/add', addOwner);

// Protected route to get all owners (only accessible with a valid token)
router.get('/', verifyToken, getOwners);

module.exports = router;




// const express = require('express');
// const { addOwner } = require('../controllers/ownercontroller');
// const { verifyToken } = require('../controllers/ownercontroller');

// const router = express.Router();

// // Route to add an owner and return a token
// router.post('/add', addOwner);

// // Protected route to get all owners (requires token)
// router.get('/', verifyToken);

// module.exports = router;

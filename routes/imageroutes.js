const express = require('express');
const multer = require('multer');
const { uploadImage, getImages } = require('../controllers/imagecontroller');

const router = express.Router();

// Configure multer to store images in a temporary folder (e.g., "uploads/")
const upload = multer({ dest: 'uploads/' });
router.post('/upload', upload.single('image'), uploadImage);
router.get('/', getImages);

module.exports = router;


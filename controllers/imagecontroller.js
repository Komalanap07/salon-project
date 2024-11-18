

const cloudinary = require('../config/cloudinary');
const db = require('../config/db');
const fs = require('fs'); // File system module to delete file after upload

// Upload and save image URL to the database
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    const filePath = req.file.path; // Path from multer's temporary file
    const result = await cloudinary.uploader.upload("img.jpg"); // Upload to Cloudinary

    // Insert the secure URL from Cloudinary into the database
    const query = "INSERT INTO img (image_url) VALUES (?)";
    db.query(query, [result.secure_url], (err) => {
      if (err) {
        return res.status(500).send("Error storing image URL in database");
      }

      // Delete the temporary file after upload
      fs.unlinkSync(filePath);

      res.send("Image URL stored successfully");
    });
  } catch (error) {
    res.status(500).send(`Cloudinary upload failed: ${error.message}`);
  }
};

// Retrieve all images from the database
const getImages = (req, res) => {
  const query = "SELECT * FROM img";
  db.query(query, (err, results) => {
    if (err) return res.status(500).send("Error retrieving images");
    res.json(results);
  });
};

module.exports = { uploadImage, getImages };

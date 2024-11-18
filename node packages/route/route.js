// app.get('/images', async (req, res) => {
//     try {
//         const [images] = await db.query('SELECT * FROM images');
//         res.json(images);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching images', error });
//     }
// });
import express from 'express';
const router = express.Router(); // Use Router to handle routing

// Define your routes here
router.get('/images', async (req, res) => {
    try {
        // Logic to fetch images
        res.json({ message: 'Images fetched' });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching images', error });
    }
});

// router.delete('/image/:id', async (req, res) => {
//     try {
//         // Logic to delete an image
//         res.json({ message: 'Image deleted' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error deleting image', error });
//     }
// });

 // Export the router to use in index.js

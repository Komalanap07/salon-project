// const db = require('../config/db');

// // Haversine formula to calculate distance
// const haversineDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371; // Earth's radius in kilometers
//     const dLat = (lat2 - lat1) * (Math.PI / 180);
//     const dLon = (lon2 - lon1) * (Math.PI / 180);
//     const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//               Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
//               Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c; // Distance in kilometers
// };

// // Controller function to calculate distances
// const calculateDistances = (req, res) => {
//     const { userLat, userLng } = req.body;

//     // Validate input
//     if (typeof userLat !== 'number' || typeof userLng !== 'number') {
//         return res.status(400).json({ error: 'Invalid user coordinates' });
//     }

//     // Retrieve salon locations from the database
//     const query = 'SELECT salon_id, salon_name, latitude, longitude FROM salons';
//     db.query(query, (err, salons) => {
//         if (err) {
//             return res.status(500).json({ error: 'Error retrieving salon data' });
//         }

//         // Calculate distances for each salon
//         const results = salons.map(salon => {
//             const distance = haversineDistance(userLat, userLng, salon.latitude, salon.longitude);
//             return { id: salon.id, name: salon.name, distance: distance.toFixed(2) };
//         });

//         // Return sorted results by distance
//         res.json(results.sort((a, b) => a.distance - b.distance));
//     });
// };

// module.exports = { calculateDistances };











const db = require('../config/db');

// Haversine formula to calculate distance
const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
};

// Controller function to calculate distances
const calculateDistances = (req, res) => {
    const { userLat, userLng } = req.body;

    // Validate input
    if (typeof userLat !== 'number' || typeof userLng !== 'number') {
        return res.status(400).json({ error: 'Invalid user coordinates. Ensure they are numbers.' });
    }

    if (userLat < -90 || userLat > 90 || userLng < -180 || userLng > 180) {
        return res.status(400).json({ error: 'Coordinates are out of range.' });
    }

    // Query to fetch salon data
    const query = 'SELECT salon_id, salon_name, latitude, longitude FROM salons';
    db.query(query, (err, salons) => {
        if (err) {
            console.error('Error executing query:', err.message);
            return res.status(500).json({ error: 'Error retrieving salon data' });
        }

        if (salons.length === 0) {
            return res.status(404).json({ message: 'No salons found in the database.' });
        }

        console.log('Fetched salons:', salons); // Debugging

        // Calculate distances
        // const results = salons.map(salon => {
        //     const distance = haversineDistance(userLat, userLng, salon.latitude, salon.longitude);
        //     return { id: salon.salon_id, name: salon.salon_name, distance: distance.toFixed(2) };
        // });


        const results = salons.map(salon => {
            const distance = haversineDistance(userLat, userLng, salon.latitude, salon.longitude);
            return {
                salon_id: salon.salon_id, // Include salon ID
                salon_name: salon.salon_name, // Include salon name
                latitude: salon.latitude, // Include latitude
                longitude: salon.longitude, // Include longitude
                distance: parseFloat(distance.toFixed(2)) // Include distance
            };
        });
        












        // Return sorted results by distance
        res.json(results.sort((a, b) => a.distance - b.distance));
    });
};

module.exports = { calculateDistances };

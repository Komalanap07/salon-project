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
//         return res.status(400).json({ error: 'Invalid user coordinates. Ensure they are numbers.' });
//     }

//     if (userLat < -90 || userLat > 90 || userLng < -180 || userLng > 180) {
//         return res.status(400).json({ error: 'Coordinates are out of range.' });
//     }

//     // Query to fetch salon data
//     const query = 'SELECT salon_id, salon_name, latitude, longitude FROM salons';
//     db.query(query, (err, salons) => {
//         if (err) {
//             console.error('Error executing query:', err.message);
//             return res.status(500).json({ error: 'Error retrieving salon data' });
//         }

//         if (salons.length === 0) {
//             return res.status(404).json({ message: 'No salons found in the database.' });
//         }

//         // Calculate distances and filter results within 10km
//         const results = salons
//             .map(salon => {
//                 const distance = haversineDistance(userLat, userLng, salon.latitude, salon.longitude);
//                 return {
//                     salon_id: salon.salon_id,
//                     salon_name: salon.salon_name,
//                     latitude: salon.latitude,
//                     longitude: salon.longitude,
//                     distance: parseFloat(distance.toFixed(2))
//                 };
//             })
//             .filter(salon => salon.distance <= 10) // Filter salons within 10km
//             .sort((a, b) => a.distance - b.distance); // Sort by distance

//         // Return the filtered and sorted results
//         res.json(results);
//     });
// };

// module.exports = { calculateDistances };




















const db = require('../config/db');

// Haversine formula to calculate distance
const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
              Math.sin(dLon / 2) ** 2;
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

    // Query to fetch salon data along with services
    const query = `
        SELECT 
            salons.salon_id,
            salons.salon_name,
            salons.latitude,
            salons.longitude,
            services.service_id,
            services.service_name
        FROM salons
        LEFT JOIN services ON salons.salon_id = services.service_id
    `;

    db.query(query, (err, rows) => {
        if (err) {
            console.error('Error executing query:', err.message);
            return res.status(500).json({ error: 'Error retrieving salon data' });
        }

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No salons found in the database.' });
        }

        // Group salons and their services
        const salons = {};
        rows.forEach(row => {
            if (!salons[row.salon_id]) {
                salons[row.salon_id] = {
                    salon_id: row.salon_id,
                    salon_name: row.salon_name,
                    latitude: row.latitude,
                    longitude: row.longitude,
                    services: [],
                };
            }
            if (row.service_id) {
                salons[row.salon_id].services.push({
                    service_id: row.service_id,
                    service_name: row.service_name,
                });
            }
        });

        // Calculate distances and filter results within 10km
        const results = Object.values(salons)
            .map(salon => {
                const distance = haversineDistance(userLat, userLng, salon.latitude, salon.longitude);
                return {
                    ...salon,
                    distance: parseFloat(distance.toFixed(2))
                };
            })
            .filter(salon => salon.distance <= 10) // Filter salons within 10km
            .sort((a, b) => a.distance - b.distance); // Sort by distance

        // Return the filtered and sorted results
        res.json(results);
    });
};

module.exports = { calculateDistances };

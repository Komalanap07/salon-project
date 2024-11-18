const db = require('../config/db');

// Get top salons within 10 km radius of user's location
const getTopSalonsNearby = (req, res) => {
  const { user_latitude, user_longitude } = req.query;
  const radius = 10; // 10 km

  // Haversine formula for distance in MySQL
  const query = `
    SELECT salon_id, name, city, latitude, longitude, rating,
    (6371 * acos(
      cos(radians(?)) * cos(radians(latitude)) *
      cos(radians(longitude) - radians(?)) +
      sin(radians(?)) * sin(radians(latitude))
    )) AS distance
    FROM topsalons
    HAVING distance <= ?
    ORDER BY rating DESC
    LIMIT 10;
  `;

  db.query(query, [user_latitude, user_longitude, user_latitude, radius], (err, results) => {
    if (err) {
      return res.status(500).send("Error retrieving salons");
    }
    res.json(results);
  });
};

module.exports = { getTopSalonsNearby };

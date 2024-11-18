const db = require('../config/db');
const jwt = require('jsonwebtoken');

// Secret key for JWT
const JWT_SECRET = '07'; // Replace with an environment variable in production

// Add a new owner and generate a token
const addOwner = (req, res) => {
  const { owner_id,name, email, phone } = req.query;

  const query = "INSERT INTO owners (owner_id,name, email, phone) VALUES (?,?, ?, ?)";
  db.query(query, [owner_id,name, email, phone], (err, result) => {
    if (err) {
      return res.status(500).send("Error adding owner");
    }

    // Generate JWT for the new owner
    const token = jwt.sign({ id: result.insertId, name, email }, JWT_SECRET, { expiresIn: '1h' });
    
    res.status(201).json({ message: "Owner added successfully", token });
  });
};

// Retrieve all owners (Protected route)
const getOwners = (req, res) => {
  const query = "SELECT * FROM owners";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send("Error retrieving owners");
    }
    res.json(results);
  });
};

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Store decoded token data in request object
    next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};

module.exports = { addOwner, getOwners, verifyToken };
































// const db = require('../config/db');
// const jwt = require('jsonwebtoken');

// // Secret key for JWT
// const JWT_SECRET = process.env.JWT_SECRET; // Replace with an environment variable in production

// // Add a new owner and generate a token
// const addOwner = (req, res) => {
//   const { owner_id,owner_name, email, phone, city, latitude, longitude, distance } = req.body;

//   const query = `
//       INSERT INTO owner (owner_id,owner_name, email, phone, city, latitude, longitude, distance) 
//       VALUES (?, ?, ?, ?, ?, ?, ?,?)
//   `;
  
//   db.query(query, [owner_id,owner_name, email, phone, city, latitude, longitude, distance], (err, result) => {
//     if (err) {
//       return res.status(500).send("Error adding owner");
//     }

//     // Generate JWT for the new owner
//     const token = jwt.sign({ id: result.insertId, owner_name, email }, JWT_SECRET, { expiresIn: '1h' });
    
//     res.status(201).json({ message: "Owner added successfully", token });
//   });
// };

// // Retrieve all owners (Protected route)
// const getOwners = (req, res) => {
//   const query = "SELECT owner_id, owner_name, email, phone, city, latitude, longitude, distance FROM owners";
  
//   db.query(query, (err, results) => {
//     if (err) {
//       return res.status(500).send("Error retrieving owners");
//     }
//     res.json(results);
//   });
// };

// // Middleware to verify JWT
// const verifyToken = (req, res, next) => {
//   const token = req.headers['authorization'];

//   if (!token) {
//     return res.status(403).send("A token is required for authentication");
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded; // Store decoded token data in request object
//     next();
//   } catch (err) {
//     return res.status(401).send("Invalid Token");
//   }
// };

// module.exports = { addOwner, getOwners, verifyToken };

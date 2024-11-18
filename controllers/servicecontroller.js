// const db = require('../config/db');

// // Add a new service
// const addService = (req, res) => {
//   const { service_name, description, price, location, phone_no, gender, image } = req.body;

//   const query = `
//     INSERT INTO services (service_name, description, price, phone_no, gender, image)
//     VALUES (?, ?, ?, ?, ?, ?)
//   `;
//   db.query(query, [service_name, description, price, phone_no, gender, image], (err, result) => {
//     if (err) {
//       return res.status(500).send("Error adding service");
//     }
//     res.status(201).send("Service added successfully");
//   });
// };

// // Retrieve all services
// const getServices = (req, res) => {
//   const query = "SELECT * FROM services";
//   db.query(query, (err, results) => {
//     if (err) {
//       return res.status(500).send("Error retrieving services");
//     }
//     res.json(results);
//   });
// };

// module.exports = { addService, getServices };



const db = require('../config/db');

// Add a new service
const addService = (req, res) => {
  const { service_name, service_icon, service_type, massage, description, price} = req.body;

  const query = `
    INSERT INTO services (service_id,service_name, service_icon, service_type, massage, description, price)
    VALUES (?, ?, ?, ?, ?, ?,?)
  `;
  
  db.query(query, [service_id,service_name, service_icon, service_type, massage, description, price], (err, result) => {
    if (err) {
      return res.status(500).send("Error adding service");
    }
    res.status(201).send("Service added successfully");
  });
};

// Retrieve all services
const getServices = (req, res) => {
  const query = `
    SELECT service_id, service_name, service_icon, service_type, massage, description, price 
    FROM services
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send("Error retrieving services");
    }
    res.json(results);
  });
};

module.exports = { addService, getServices };

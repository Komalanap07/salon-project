// const db = require('../config/db');
// const bcrypt = require('bcrypt');

// // Add a new user (register)
// const registerUser = async (req, res) => {
//   const { username, email, password, phone_no, role } = req.body;

//   try {
//     // Hash the password before storing it
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const query = `
//       INSERT INTO users (username, email, password, phone_no, role)
//       VALUES (?, ?, ?, ?, ?)
//     `;
//     db.query(query, [username, email, hashedPassword, phone_no, role], (err, result) => {
//       if (err) {
//         return res.status(500).send("Error registering user");
//       }
//       res.status(201).send("User registered successfully");
//     });
//   } catch (error) {
//     res.status(500).send("Error registering user");
//   }
// };

// // Get all users
// const getUsers = (req, res) => {
//   const query = "SELECT user_id, username, email, phone_no, role FROM users";
//   db.query(query, (err, results) => {
//     if (err) {
//       return res.status(500).send("Error retrieving users");
//     }
//     res.json(results);
//   });
// };

// // Login user
// const loginUser = (req, res) => {
//   const { email, password } = req.body;

//   const query = "SELECT * FROM users WHERE email = ?";
//   db.query(query, [email], async (err, results) => {
//     if (err || results.length === 0) {
//       return res.status(400).send("User not found");
//     }

//     const user = results[0];
//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (isPasswordValid) {
//       res.send("Login successful");
//     } else {
//       res.status(401).send("Invalid credentials");
//     }
//   });
// };

// module.exports = { registerUser, getUsers, loginUser };















const db = require('../config/db');
const bcrypt = require('bcrypt');

// Add a new user (register)
const registerUser = async (req, res) => {
  const { username, email, password, phone_no, role } = req.body;

  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (username, email, password, phone_no, role)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(query, [username, email, hashedPassword, phone_no, role], (err, result) => {
      if (err) {
        return res.status(500).send("Error registering user");
      }
      res.status(201).send("User registered successfully");
    });
  } catch (error) {
    res.status(500).send("Error registering user");
  }
};

// Get all users
const getUsers = (req, res) => {
  const query = "SELECT user_id, username, email, phone_no, role FROM users";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send("Error retrieving users");
    }
    res.json(results);
  });
};

// Login user
const loginUser = (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).send("User not found");
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      res.send("Login successful");
    } else {
      res.status(401).send("Invalid credentials");
    }
  });
};

module.exports = { registerUser, getUsers, loginUser };

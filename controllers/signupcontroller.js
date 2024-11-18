const bcrypt = require('bcrypt');
const db = require('../config/db');

// Signup Function
const signup = async (req, res) => {
  const { user_name, password, confirm_password, email } = req.body;

  // Validate input
  if (!user_name || !password || !confirm_password || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (password !== confirm_password) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Hash the passwords
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedConfirmPassword = await bcrypt.hash(confirm_password, 10);

    // Insert user into the database
    const query = "INSERT INTO signup (user_name, password, confirm_password, email) VALUES (?, ?, ?, ?)";
    db.query(query, [user_name, hashedPassword, hashedConfirmPassword, email], (err, result) => {
      if (err) {
        console.error("Database Error:", err);
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ message: "Email already exists" });
        }
        return res.status(500).json({ message: "Error signing up" });
      }
      res.status(201).json({ message: "User signed up successfully" });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signup };

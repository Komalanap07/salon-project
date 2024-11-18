
const db = require('../config/db');
const img = (req, res) => {
    db.query('SELECT * FROM img', (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }
        return res.json(result);
    });
};

module.exports = { img};
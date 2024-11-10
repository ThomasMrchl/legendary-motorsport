const pool = require('../databases/database');

exports.getAllCars = async (req, res) => {
    try {
        // Query example:
        pool.query('SELECT * FROM car', (err, results) => {
            if (err) return res.status(500).json({ message: 'Database error' });
            return res.status(200).json(results);
        });
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};
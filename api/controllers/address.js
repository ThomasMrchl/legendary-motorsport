const pool = require('../databases/db');

exports.getAllAddresses = async (req, res) => {
    try {
        const [AllAddresses] = await pool.query('SELECT * FROM address');

        if (AllAddresses.length === 0) {
            return res.status(404).send({'message': 'No address found.'});
        }

        return res.status(200).send({AllAddresses});

    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAddressById = async (req, res) => {

    if (!req?.params?.id) {
        return res.status(400).json({ message: 'Address ID is required.' });
    }

    try {
        const [result] = await pool.query('SELECT * FROM address WHERE address_id = ?', [req.params.id]);
        
        if (result.length === 0) {
            return res.status(404).json({ message: 'Address with the specified ID not found.' });
        }

        return res.status(200).json({ address: result[0] });

    } catch (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};


exports.createAddress = async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const username = req.user.user_name;

    try {
        const {
            address_country,
            address_street,
            address_number,
            address_postalcode,
            address_city
        } = req.body;

        const requiredFields = ['address_country', 'address_street', 'address_number', 'address_postalcode', 'address_city'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        const insertAddressSQL = `
            INSERT INTO address (address_country, address_street, address_number, address_postalcode, address_city)
            VALUES (?, ?, ?, ?, ?)
        `;
        const [addressResult] = await pool.query(insertAddressSQL, [
            address_country,
            address_street,
            address_number,
            address_postalcode,
            address_city
        ]);

        const updateUserSQL = `
            UPDATE user
            SET user_address = ?
            WHERE user_name = ?;
        `;
        const [updateResult] = await pool.query(updateUserSQL, [addressResult.insertId, username]);

        if (updateResult.affectedRows === 1) {
            return res.status(201).json({
                message: 'Address created and user updated successfully!',
                addressId: addressResult.insertId
            });
        } else {
            return res.status(500).json({ message: 'Failed to update user information.' });
        }

    } catch (error) {
        console.error('Error creating address:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

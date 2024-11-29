const pool = require('../databases/db');

exports.getAllUsers = async (req, res) => {
    try {
        const [allUsers] = await pool.query('SELECT * FROM user');

        if (allUsers.length === 0) {
            return res.status(404).send({'message': 'No user found.'});
        }

        return res.status(200).send({allUsers});

    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.createUser = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            birth_date,
            email,
            password,
            is_employee,
            role,
            yearly_salary
        } = req.body;

        const requiredFields = [
            'first_name', 'last_name', 'birth_date', 'email', 'password', 'is_employee', 'role', 'yearly_salary'
        ];

        const missingFields = requiredFields.filter(field => req.body[field] === undefined);
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        const emailCheckQuery = `SELECT id_user FROM user WHERE email = ? LIMIT 1`;
        const [existingUser] = await pool.query(emailCheckQuery, [email]);

        if (existingUser.length > 0) {
            return res.status(400).json({
                message: 'Email is already in use. Please use a different email.'
            });
        }

        const querySQL = `
            INSERT INTO user 
            (first_name, last_name, birth_date, address, email, password, is_employee, role, yearly_salary)
            VALUES (?, ?, ?, 1, ?, ?, ?, ?, ?)
        `;

        const [result] = await pool.query(querySQL, [
            first_name,
            last_name,
            birth_date,
            email,
            password,
            is_employee,
            role,
            yearly_salary
        ]);

        res.status(201).json({
            message: 'User created successfully!',
            userId: result.insertId
        });

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};


exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const querySQL = `DELETE FROM user WHERE id_user = ?`;

        const [result] = await pool.query(querySQL, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
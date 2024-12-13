const pool = require('../databases/db');

exports.getAllUsers = async (req, res) => {

    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const role = req.user.user_role;

    if (role != 'ADMIN') {
        return res.status(401).json({ message: "Unauthorized" });
    }

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

exports.getUserbyName = async (req, res) => {

    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const name = req.user.user_name;

    try {
        const [user] = await pool.query('SELECT * FROM user WHERE user_name = ?', [name]);

        if (user.length === 0) {
            return res.status(404).send({ 'message': 'User not found.' });
        }

        return res.status(200).send({user});

    } catch (err) {
        console.error('Erreur lors de la requête :', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateUser = async (req, res) => {

    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const name = req.user.user_name;

    try {
        const { user_firstname, user_lastname, user_birthdate } = req.body;

        if (!user_firstname || !user_lastname || !user_birthdate) {
            return res.status(400).json({ message: "Firstname, lastname, and birthdate are required" });
        }

        const querySQL = `
            UPDATE user
            SET user_firstname = ?, user_lastname = ?, user_birthdate = ?
            WHERE user_name = ?
        `;

        const [result] = await pool.query(querySQL, [user_firstname, user_lastname, user_birthdate, name]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};


exports.deleteUser = async (req, res) => {

    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const role = req.user.user_role;

    if (role != 'ADMIN') {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const { name } = req.params;

        if (!name) {
            return res.status(400).json({ message: "User name is required" });
        }

        const querySQL = `DELETE FROM user WHERE user_name = ?`;

        const [result] = await pool.query(querySQL, [name]);

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
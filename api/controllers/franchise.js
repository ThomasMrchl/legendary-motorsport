const pool = require('../databases/db');

exports.getAllFranchises = async (req, res) => {
    try {
        const [allFranchises] = await pool.query('SELECT * FROM franchise');

        if (allFranchises.length === 0) {
            return res.status(404).send({'message': 'No franchise found.'});
        }

        return res.status(200).send({allFranchises});

    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getFranchiseName = async (req, res) => {
    try {
        const { id } = req.params;  // Get the franchise ID from the request parameters
        const [franchise] = await pool.query('SELECT franchise_name FROM franchise WHERE id_franchise = ?', [id]);

        if (franchise.length === 0) {
            return res.status(404).send({ 'message': 'Franchise not found.' });
        }

        return res.status(200).send({ franchiseName: franchise[0].franchise_name });

    } catch (err) {
        console.error('Erreur lors de la requête :', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


exports.getFranchiseList = async (req, res) => {
    try {
        const [allFranchises] = await pool.query('SELECT id_franchise, franchise_name FROM franchise');

        if (allFranchises.length === 0) {
            return res.status(404).send({ 'message': 'No franchise found.' });
        }

        return res.status(200).send({ allFranchises });

    } catch (err) {
        console.error('Erreur lors de la requête :', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


exports.deleteFranchise = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Franchise ID is required" });
        }

        const querySQL = `DELETE FROM franchise WHERE id_franchise = ?`;

        const [result] = await pool.query(querySQL, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Franchise not found" });
        }

        res.status(200).json({ message: "Franchise deleted successfully" });
    } catch (error) {
        console.error("Error deleting Franchise:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

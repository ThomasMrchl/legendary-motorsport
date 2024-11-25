const pool = require('../databases/db');

exports.getAllCars = async (req, res) => {
    try {
        const [allCars] = await pool.query('SELECT * FROM car');

        if (allCars.length === 0) {
            return res.status(404).send({'message': 'No cars found.'});
        }

        return res.status(200).send({allCars});

    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getCarById = async (req, res) => {

    if (!req?.params?.id) return res.status(400).json({ 'message': 'Car id required.' });

    try {

        const [carById] = await pool.query('SELECT * FROM car WHERE id_car = ?', [req.params.id]);

        if (carById.length !== 1) {
            return res.status(404).send({'message': 'Car with id not found.'});
        }

        return res.status(200).send({carById});

    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};
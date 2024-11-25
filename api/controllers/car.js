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

exports.createCar = async (req, res) => {
    try {
        const {
            franchise_id,
            status,
            color,
            mileage,
            conditions,
            buyout_price,
            first_price,
            latest_price,
            model,
            brand,
            engine_type,
            horse_power
        } = req.body;

        const requiredFields = [
            'franchise_id', 'status', 'color', 'mileage', 'conditions',
            'buyout_price', 'first_price', 'latest_price', 'model', 'brand',
            'engine_type', 'horse_power'
        ];

        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        const querySQL = `
            INSERT INTO car 
            (franchise, status, color, mileage, conditions, buyout_price, first_price, latest_price, buyer, model, brand, engine, horsepower, final_owner)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?, ?, 0)
        `;

        const [result] = await pool.query(querySQL, [
            franchise_id,
            status,
            color,
            mileage,
            conditions,
            buyout_price,
            first_price,
            latest_price,
            model,
            brand,
            engine_type,
            horse_power
        ]);


        res.status(201).json({
            message: 'Car created successfully!',
            carId: result.insertId
        });

    } catch (error) {
        console.error('Error creating car:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

exports.deleteCar = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Car ID is required" });
        }

        const querySQL = `DELETE FROM car WHERE id_car = ?`;

        const [result] = await pool.query(querySQL, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Car not found" });
        }

        res.status(200).json({ message: "Car deleted successfully" });
    } catch (error) {
        console.error("Error deleting car:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
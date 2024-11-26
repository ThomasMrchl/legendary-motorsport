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

        return res.status(200).json({carById});

    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};





exports.updateCar = async (req, res) => {
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
            horse_power,
            buyer_id, // Added for handling the buyer if sold
            id_car,
        } = req.body;
        console.log(req.body);
        // List of required fields for validation
        const requiredFields = [
            'franchise_id', 'status', 'color', 'mileage', 'conditions',
            'buyout_price', 'first_price', 'latest_price', 'model', 'brand',
            'engine_type', 'horse_power','id_car'
        ];

        // Check for any missing fields
        const missingFields = requiredFields.filter(field => req.body[field] === undefined || req.body[field] === null || req.body[field] === '');
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        // Add buyer_id in case of sold status
        const queryParams = [
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
            horse_power,
            id_car, 
        ];

        let querySQL = '';

        // If car is sold, include buyer_id
        if (status === 'sold' && buyer_id) {
            querySQL = `
                UPDATE car
                SET
                    franchise = ?, 
                    status = ?, 
                    color = ?, 
                    mileage = ?, 
                    conditions = ?, 
                    buyout_price = ?, 
                    first_price = ?, 
                    latest_price = ?, 
                    model = ?, 
                    brand = ?, 
                    engine = ?, 
                    horsepower = ?,
                    buyer_id = ?
                WHERE id_car = ?;
            `;

            queryParams.push(buyer_id);
            queryParams.push(id_car); // ID is always the last parameter
        } else {
            querySQL = `
                UPDATE car
                SET
                    franchise = ?, 
                    status = ?, 
                    color = ?, 
                    mileage = ?, 
                    conditions = ?, 
                    buyout_price = ?, 
                    first_price = ?, 
                    latest_price = ?, 
                    model = ?, 
                    brand = ?, 
                    engine = ?, 
                    horsepower = ?
                WHERE id_car = ?;
            `;

            queryParams.push(id_car);
        }

        // Execute the query with the provided data
        const [result] = await pool.query(querySQL, queryParams);

        // Check if any rows were affected (i.e., if the car exists and was updated)
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: `Car with ID ${id_car} not found`
            });
        }

        // Send a success response
        res.status(200).json({
            message: 'Car updated successfully!',
            carId: id_car
        });

    } catch (error) {
        console.error('Error updating car:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

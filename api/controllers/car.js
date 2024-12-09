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

        const [carById] = await pool.query('SELECT * FROM car WHERE car_id = ?', [req.params.id]);
        if (carById.length !== 1) {
            
            return res.status(404).send({'message': 'Car with id not found.'});
        }

        return res.status(200).json({carById});

    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getCarsByOwner = async (req, res) => {

    if (!req?.params?.owner) return res.status(400).json({ 'message': 'Owner required.' });

    try {
        const [carsByOwner] = await pool.query('SELECT * FROM car WHERE car_owner = ?', [req.params.owner]);
        if (carsByOwner.length == 0) {  
            return res.status(200).send({'message': 'No car for this user.'});
        }

        return res.status(200).json({carsByOwner});

    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.createCar = async (req, res) => {

    try {
        const {
            car_brand,
            car_model,
            car_horsepower,
            car_mileage,
            car_initial_price,
            car_selling_price,
            car_condition,
            car_engine,
            car_franchise,
            car_color
        } = req.body;

        const requiredFields = [
            'car_brand', 'car_model', 'car_horsepower', 'car_mileage', 'car_initial_price',
            'car_selling_price', 'car_condition', 'car_engine', 'car_franchise', 'car_color'];

        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        const querySQL = `
            INSERT INTO car
            (car_brand, car_model, car_horsepower, car_mileage, car_initial_price, car_selling_price, car_owner, car_status, car_condition, car_engine, car_franchise, car_color)
            VALUES (?, ?, ?, ?, ?, ?, NULL, 'Available', ?, ?, ?, ?)
        `;

        const [result] = await pool.query(querySQL, [
            car_brand,
            car_model,
            car_horsepower,
            car_mileage,
            car_initial_price,
            car_selling_price,
            car_condition,
            car_engine,
            car_franchise,
            car_color
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

        const querySQL = `DELETE FROM car WHERE car_id = ?`;

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

exports.updateCar = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            car_brand,
            car_model,
            car_horsepower,
            car_mileage,
            car_initial_price,
            car_selling_price,
            car_owner,
            car_status,
            car_condition,
            car_engine,
            car_franchise,
            car_color
        } = req.body;

        const requiredFields = [
            'car_brand', 'car_model', 'car_horsepower', 'car_mileage', 'car_initial_price', 'car_selling_price',
            'car_condition', 'car_engine', 'car_franchise', 'car_color'];

        // Check for missing fields
        const missingFields = requiredFields.filter(field => req.body[field] === undefined);
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        const queryParams = [
            car_brand,
            car_model,
            car_horsepower,
            car_mileage,
            car_initial_price,
            car_selling_price,
            car_status,
            car_condition,
            car_engine,
            car_franchise,
            car_color 
        ];

        let querySQL = '';

        if (car_status === 'Sold' && car_owner) {
            querySQL = `
                UPDATE car
                SET
                    car_brand = ?, 
                    car_model = ?, 
                    car_horsepower = ?, 
                    car_mileage = ?, 
                    car_initial_price = ?, 
                    car_selling_price = ?, 
                    car_status = ?, 
                    car_condition = ?, 
                    car_engine = ?, 
                    car_franchise = ?, 
                    car_color = ?,
                    car_owner = ?
                WHERE car_id = ?;
            `;

            queryParams.push(car_owner);
            queryParams.push(id); 
        } else {
            querySQL = `
                UPDATE car
                SET
                    car_brand = ?, 
                    car_model = ?, 
                    car_horsepower = ?, 
                    car_mileage = ?, 
                    car_initial_price = ?, 
                    car_selling_price = ?,
                    car_owner = null,
                    car_status = ?,
                    car_condition = ?, 
                    car_engine = ?, 
                    car_franchise = ?, 
                    car_color = ?
                WHERE car_id = ?;
            `;

            queryParams.push(id);
        }

        const [result] = await pool.query(querySQL, queryParams);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: `Car with ID ${id} not found`
            });
        }

        res.status(200).json({
            message: 'Car updated successfully!',
            carId: id
        });

    } catch (error) {
        console.error('Error updating car:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

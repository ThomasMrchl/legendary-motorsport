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
    console.log("ccici");
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
            buyer_id, 
            id_car,
        } = req.body;
        console.log(req.body);
        // List of required fields
        const requiredFields = [
            'id_car', 'franchise_id', 'status', 'color', 'mileage', 'conditions',
            'buyout_price', 'first_price', 'latest_price', 'model', 'brand',
            'engine_type', 'horse_power'
        ];

        // Check for missing fields
        const missingFields = requiredFields.filter(field => req.body[field] === undefined || req.body[field] === null || req.body[field] === '');
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

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

        // If car  sold, include buyer_id
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
            queryParams.push(id_car); 
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

        const [result] = await pool.query(querySQL, queryParams);

        // Check if car was updated
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: `Car with ID ${id_car} not found`
            });
        }

        // Send success response
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

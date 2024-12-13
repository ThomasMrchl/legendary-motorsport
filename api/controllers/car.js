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

exports.buyCar = async (req, res) => {

    if (!req?.params?.id) {
        return res.status(400).json({ message: 'Car ID is required.' });
    }

    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const username = req.user.user_name;
    const carId = req.params.id;

    try {

        const [targetCar] = await pool.query('SELECT * FROM car WHERE car_id = ?', [carId]);
        if (targetCar.length !== 1) {
            return res.status(404).json({ message: 'Car with the specified ID not found.' });
        }

        if (targetCar[0].car_status === 'Sold') {
            return res.status(400).json({ message: 'Car is already sold.' });
        }

        const [targetUser] = await pool.query('SELECT user_name FROM user WHERE user_name = ?', [username]);
        if (targetUser.length !== 1) {
            return res.status(404).json({ message: 'No user with this name.' });
        }

        const queryOwner = `
            UPDATE car
            SET car_owner = ?, car_status = 'Sold'
            WHERE car_id = ?;`;
        const [carBuy] = await pool.query(queryOwner, [username, carId]);

        if (carBuy.affectedRows === 1) {
            return res.status(201).json({ message: 'Car bought successfully.' });
        } else {
            return res.status(500).json({ message: 'Failed to update car information.' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};


exports.getCarsByOwner = async (req, res) => {

    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const owner = req.user.user_name;

    try {
        const [carsByOwner] = await pool.query('SELECT * FROM car WHERE car_owner = ?', [owner]);
        if (carsByOwner.length == 0) {  
            return res.status(200).send({'message': 'No car for this user.'});
        }

        return res.status(200).json({carsByOwner});

    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.createCar = async (req, res) => {

    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const role = req.user.user_role;

    if (role != 'ADMIN') {
        return res.status(401).json({ message: "Unauthorized" });
    }

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
            car_color,
            car_image
        } = req.body;

        const requiredFields = [
            'car_brand', 'car_model', 'car_horsepower', 'car_mileage', 'car_initial_price',
            'car_selling_price', 'car_condition', 'car_engine', 'car_franchise', 'car_color', 'car_image'];

        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        const querySQL = `
            INSERT INTO car
            (car_brand, car_model, car_horsepower, car_mileage, car_initial_price, car_selling_price, car_owner, car_status, car_condition, car_engine, car_franchise, car_color, car_image)
            VALUES (?, ?, ?, ?, ?, ?, NULL, 'Available', ?, ?, ?, ?, ?)
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
            car_color,
            car_image
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

    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const role = req.user.user_role;

    if (role != 'ADMIN') {
        return res.status(401).json({ message: "Unauthorized" });
    }

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

    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const role = req.user.user_role;

    if (role != 'ADMIN') {
        return res.status(401).json({ message: "Unauthorized" });
    }

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
            car_color,
            car_image
        } = req.body;

        const requiredFields = [
            'car_brand', 'car_model', 'car_horsepower', 'car_mileage', 'car_initial_price', 'car_selling_price',
            'car_condition', 'car_engine', 'car_franchise', 'car_color', 'car_image'];

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
            car_color,
            car_image
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
                    car_image = ?,
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
                    car_color = ?,
                    car_image = ?
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

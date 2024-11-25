const express = require('express');
const router = express.Router();

const carController = require('../controllers/car');

router.get('/getAllCars', carController.getAllCars);
    router.get('/getAllCars', carController.getAllCars);
router.get('/getCarById/:id', carController.getCarById);
router.post('/create', carController.createCar);
router.post('deleteCar', carController.deleteCar);

module.exports = router;
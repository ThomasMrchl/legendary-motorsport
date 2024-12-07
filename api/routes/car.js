const express = require('express');
const router = express.Router();

const carController = require('../controllers/car');

router.get('/getAllCars', carController.getAllCars);
router.get('/getCarById/:id', carController.getCarById);
router.post('/create', carController.createCar);
router.post('/deleteCar/:id', carController.deleteCar);
router.post('/updateCar/:id', carController.updateCar);

module.exports = router;
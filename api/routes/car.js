const express = require('express');
const router = express.Router();

const carController = require('../controllers/car');

router.get('/getAllCars', carController.getAllCars);
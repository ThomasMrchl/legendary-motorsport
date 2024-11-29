const express = require('express');
const router = express.Router();

const franchiseController = require('../controllers/franchise');

router.get('/getAllFranchises', franchiseController.getAllFranchises);
//router.get('/getCarById/:id', franchiseController.getCarById);
router.get('/getFranchiseList', franchiseController.getFranchiseList);
router.get('/getFranchiseName/:id', franchiseController.getFranchiseName);
router.post('/deleteFranchise/:id', franchiseController.deleteFranchise);
//router.post('/updateCar/:id', franchiseController.updateCar);

module.exports = router;
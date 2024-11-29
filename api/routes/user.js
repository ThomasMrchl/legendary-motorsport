const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.get('/getAllUsers', userController.getAllUsers);
//router.get('/getCarById/:id', userController.getCarById);
router.post('/createUser', userController.createUser);
router.delete('/deleteUser/:id', userController.deleteUser);
//router.post('/updateCar/:id', userController.updateCar);

module.exports = router;
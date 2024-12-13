const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.get('/getAllUsers', userController.getAllUsers);
router.get('/getUserbyName', userController.getUserbyName);
router.post('/updateUser', userController.updateUser);
router.delete('/deleteUser/:name', userController.deleteUser);
//router.post('/updateCar/:id', userController.updateCar);

module.exports = router;
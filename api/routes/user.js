const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.get('/getAllUsers', userController.getAllUsers);
router.get('/getUserbyName/:name', userController.getUserbyName);
router.post('/updateUser/:name', userController.updateUser);
router.delete('/deleteUser/:id', userController.deleteUser);
//router.post('/updateCar/:id', userController.updateCar);

module.exports = router;
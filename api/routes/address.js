const express = require('express');
const router = express.Router();

const addressController = require('../controllers/address');

router.get('/getAllAddresses', addressController.getAllAddresses);
router.get('/getAddressById/:id', addressController.getAddressById);
router.post('/create', addressController.createAddress);

module.exports = router;
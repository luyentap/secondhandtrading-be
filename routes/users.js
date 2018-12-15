const userController = require('../controllers/user');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', userController.create);
router.get('/getFullName', auth, userController.getFullName);
router.get('/getInfo', auth, userController.getInfo);
router.get('/getProducts', auth, userController.getProducts);

module.exports = router;
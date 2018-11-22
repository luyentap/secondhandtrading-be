const userController = require('../controllers/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', userController.create);
router.post('/getFullName', userController.getFullName);

module.exports = router;
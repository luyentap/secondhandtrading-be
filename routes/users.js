const userController = require('../controllers/user');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', userController.create);
router.get('/getFullName', auth, userController.getFullName);
router.get('/:id', auth, userController.getInfo);

module.exports = router;
const productController = require('../controllers/product');
const express = require('express');
const router = express.Router();

router.get('/', productController.getAll);
router.post('/', productController.create);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);
router.get('/:id', productController.getOne);

module.exports = router;

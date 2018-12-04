const productController = require('../controllers/product');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.get('/', productController.getAll);
router.post('/', productController.create);
router.put('/:id', auth, productController.update);
router.delete('/:id', productController.delete);
router.get('/:id', auth, productController.getOne);

module.exports = router;

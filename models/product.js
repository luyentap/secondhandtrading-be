const Joi = require('joi');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img_Link: String,
    status: {
        type: String,
        required: true
    }
});

const Product = mongoose.model('Products', productSchema);

function validateProduct(product){
    const schema = {
        name: Joi.string().required(),
        price: Joi.number().required(),
        img_Link: Joi.string(),
        status: Joi.string().required()
    } 
    return Joi.validate(product,schema);
};

module.exports.productSchema = productSchema;
module.exports.Product = Product;
module.exports.validateProduct = validateProduct;

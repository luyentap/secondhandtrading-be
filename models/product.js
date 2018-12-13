const { userSchema } = require('../models/user')
const Joi = require('joi');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img_link: String,
    status: {
        type: String,
        required: true
    },
    user: {
        type: userSchema,
        required: true
    }
});

const Product = mongoose.model('Products', productSchema);

function validateProduct(product){
    const schema = {
        name:Joi.string().required(),
        type: Joi.string().required(),
        price: Joi.number().required(),
        img_link: Joi.string(),
        status: Joi.string().required(),
        userId: Joi.string().required()
    } 
    return Joi.validate(product,schema);
};

module.exports.productSchema = productSchema;
module.exports.Product = Product;
module.exports.validateProduct = validateProduct;

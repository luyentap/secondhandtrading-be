const Joi = require('joi');
function validate(req){
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
    } 
    return Joi.validate(req,schema);
};

exports.validate = validate;
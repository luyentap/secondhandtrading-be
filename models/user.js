const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema =  new  mongoose.Schema({
    method:{
        type: String,
        enum: ['local', 'google', 'facebook'],
        required: true
    },
    local:{
        name: {
            type: String,
            minlength: 5,
            maxlength: 50
        },
        email: {
            type: String,
            minlength: 5,
            maxlength: 255
        },
        password:{
            type: String,
            minlength: 8,
            maxlength: 1024
        }
    },
    google:{
        googleId: String,
        email: String,
        name: String,
        avatar: String
    },
    facebook:{
        facebookId: String,
        email: String,
        name: String
    },
    create_Date:{
        type: Date,
        default: Date.now()
    },
    story: String
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id}, config.get('jwtPrivateKey'));  
    return token;
}

const User = mongoose.model('Users', userSchema);
 
function validateUser(user){
    const schema = {
        name: Joi.string().min(5).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(1024).required(),
        story: Joi.string(),
        avatar: Joi.string()
    } 
    return Joi.validate(user,schema);
};

exports.User = User;
exports.userSchema = userSchema;
exports.validateUser = validateUser;
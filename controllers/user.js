const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User, validateUser } = require('../models/user');
const _ = require('lodash');

var users = {
    create: async (req, res) => {
        const { error } = validateUser(req.body);
        if(error) {
            res.status(400).send(error.details[0].message);
        }
    
        let user = await User.findOne({"local.email": req.body.email});
        if(user) return res.status(400).send('User already registered.');
    
        user = new User({
            method: "local",
            local:{
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                story: req.body.story
            }
        })
        // user = new User(_.pick(req.body, ['name', 'email','password', 'story', 'create_Date']));
        const salt = await bcrypt.genSalt(10);
        user.local.password = await bcrypt.hash(user.local.password, salt);
    
        await user.save();
    
        const token = user.generateAuthToken();
        res.header('x-auth-token', token).send(_.pick(user, ['_id', 'local.name', 'local.email', 'story', 'create_Date']));
    },
    getFullName: async (req, res) =>{
        const token = req.body.token;
        if(!token) return res.status(401).send('No token provided.');

        try {
            const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
            req.user = decoded;
            // console.log(req.user._id);

            const user = await User.findById(req.user._id);
            if(!user) return res.status(404).send('The user with given ID was not found.');

            if(user.method == 'google') res.send({name: user.google.name});
            if(user.method == 'facebook') res.send({name: user.facebook.name});
            if(user.method == 'local') res.send({name: user.local.name});
        } catch (ex) {
            res.status(400).sen('Invalid token.')
        }
    }
};

module.exports = users;
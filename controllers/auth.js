const { User } = require('../models/user');
const { validate } = require('../models/auth');
const bcrypt = require('bcrypt');

var auth = {
    localAuth: async (req, res) => {
        const { error } = validate(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
        }

        let user = await User.findOne({ "local.email": req.body.email });
        if (!user) return res.status(400).send('Invalid email.');

        const validPassword = await bcrypt.compare(req.body.password, user.local.password);
        if (!validPassword) return res.status(400).send('Invalid email or password.');

        const token = user.generateAuthToken();

        res.header('x-auth-token', token).send('Login successfully!');
    },
<<<<<<< HEAD
    googleOAuth: async (req, res) => {
        const token = req.user.generateAuthToken();
        console.log(token);
        res.status(200).send(token);
    },
    googleCallback: (req, res) => {
        res.redirect('/');
    },
    facebookAuth: async (req, res) => {
        const token = User.generateAuthToken();
        res.status(200).send(token);
=======
    googleCallback: (req, res) => {
        const token = req.user.generateAuthToken();
        console.log("token: "+ token);
        res.header('x-auth-token', token).status(200).redirect("/");
>>>>>>> 35e21c745e7a29696eb75dc251443b9f05ce748a
    },
    facebookCallback: (req, res) => {
        const token = req.user.generateAuthToken();
        console.log("token: "+ token);
        res.header('x-auth-token', token).status(200).redirect("/");
    }
};

module.exports = auth;
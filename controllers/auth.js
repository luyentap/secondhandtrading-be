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
    googleCallback: (req, res) => {
        const user = req.user;
        const token = user.generateAuthToken();
        // console.log("token: "+ token);
        // res.send({user, token});
        // res.redirect('/login?token='+ token);
        res.writeHead(301, {
            location: "http://secondhandtrading-fe.herokuapp.com/" + "success_login?token=" + token
        });
        res.end();
    },
    facebookCallback: (req, res) => {
        const token = req.user.generateAuthToken();
        console.log("token: "+ token);
        res.header('x-auth-token', token).send(req.user);
    }
};

module.exports = auth;
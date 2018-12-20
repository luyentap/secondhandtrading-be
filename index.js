const passport = require('passport');
const config = require('config');
const express = require('express');
const users = require('./routes/users');
const auth = require('./routes/auth');
const products = require('./routes/products');
const app = express();
const cors = require("cors");


if (!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

const mongoose = require('mongoose');
mongoose.connect('mongodb://admin:112233a@ds045507.mlab.com:45507/secondhand-trading-app')
    .then(()=>{console.log('Connected to MongoDB...')})
    .catch(error=>{console.error('Could not connect to MongoDB.')})

app.all('/', function (req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Request-With");
    next();
});

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/products', products);


const port = process.env.PORT || 3000;
app.listen(port, ()=>{console.log(`Listenng port ${port}...`)});



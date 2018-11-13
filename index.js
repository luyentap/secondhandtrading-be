const passport = require('passport');
const config = require('config');
const express = require('express');
const users = require('./routes/users');
const auth = require('./routes/auth');
const app = express();

if (!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bacon-rater-app')
    .then(()=>{console.log('Connected to MongoDB...')})
    .catch(error=>{console.error('Could not connect to MongoDB.')})

app.use(express.json());
app.use(passport.initialize());
app.use('/api/users', users);
app.use('/api/auth', auth);


const port = process.env.PORT || 3000;
app.listen(port, ()=>{console.log(`Listenng port ${port}...`)});
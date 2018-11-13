const passport = require("passport");
const passportConf = require("../passport");
const auth = require('../controllers/auth');
const express = require('express');
const router = express.Router();

router.post('/login', auth.localAuth);
<<<<<<< HEAD
router.get('/google',passport.authenticate('google', {session: false, scope: ['profile', 'email']}), auth.googleOAuth);
router.get('/google/callback', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/google', }), auth.googleCallback);
router.get('/facebook', passport.authenticate('facebook',{scope: ['email']}), auth.facebookAuth);
router.get('/facebook/callback', passport.authenticate('facebook',{ successRedirect: '/', failureRedirect: '/facebook' }));
=======
router.get('/google',passport.authenticate('google', {session: false, scope: ['profile', 'email']}));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/google' }), auth.googleCallback);
router.get('/facebook', passport.authenticate('facebook',{scope: ['email']}));
router.get('/facebook/callback', passport.authenticate('facebook',{ failureRedirect: '/facebook' }), auth.facebookCallback);
>>>>>>> 35e21c745e7a29696eb75dc251443b9f05ce748a

module.exports = router;
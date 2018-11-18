const passport = require("passport");
const passportConf = require("../passport");
const auth = require('../controllers/auth');
const express = require('express');
const router = express.Router();

router.post('/login', auth.localAuth);
router.get('/google',passport.authenticate('google', {session: false, scope: ['profile', 'email']}));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/google' }), auth.googleCallback);
router.get('/facebook', passport.authenticate('facebook',{scope: ['email']}));
router.get('/facebook/callback', passport.authenticate('facebook',{ failureRedirect: '/facebook' }), auth.facebookCallback);

module.exports = router;
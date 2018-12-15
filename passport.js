const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const config = require("config");
const User = require('./models/user').User;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
});

passport.use('google', new GoogleStrategy({
    clientID: config.get("googleClientId"),
    clientSecret: config.get("googleClientSecret"),
    callbackURL: '/api/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // console.log(profile);
        const existingUser = await User.findOne({ "google.googleId": profile.id });
        if (existingUser) {
            return done(null, existingUser);
        }
        const user = await new User({
            method: "google",
            google: {
                googleId: profile.id,
                email: profile.emails[0].value,
                name: profile.displayName,
                avatar: profile.photos[0].value
            }
        });
        await user.save();
        done(null, user);
        return;
    } catch (error) {
        done(error, false, error.meassage);
    }
})
);

passport.use('facebook', new FacebookStrategy({
    clientID: config.get('facebookClientId'),
    clientSecret: config.get('facebookClientSecret'),
    callbackURL: '/api/auth/facebook/callback',
    profileFields: ['id', 'emails', 'name'] 
}, async (accessToken, refreshToken, profile, done) => {
    try {
        /* console.log('profile', profile);
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken); */

        const existingUser = await User.findOne({ "facebook.facebookId": profile.id });
        if (existingUser) {
            return done(null, existingUser);
        }

        const user = new User({
            method: 'facebook',
            facebook: {
                facebookId: profile.id,
                email: profile.emails[0].value,
                name: profile.displayName
            }
        });

        await user.save();
        done(null, user);
    } catch (error) {
        done(error, false, error.message);
    }
}));


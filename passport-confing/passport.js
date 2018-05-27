var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var mongoose = require('mongoose');
var mongooseConnect = require('./../db/connect');
var { User } = require('../models/user-model');
var keys = require('./keys');

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.GOOGLE_CLIENT_ID,
      clientSecret: keys.GOOGLE_CLIENT_SECRET,
      callbackURL: keys.CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
      // check if the user already exists
      User.findOne({ googleId: profile.id }).then(userExists => {
        if (userExists) {
          return done(null, userExists);
        } else {
          new User({
            username: profile.displayName,
            googleId: profile.id
          })
            .save()
            .then(user => {
              user.generateAuthToken();
              return done(null, user);
            });
        }
      });
    }
  )
);

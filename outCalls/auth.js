import {CLIENT_ID, CLIENT_SECRET} from './config';

const passport = require('passport'),
  GithubStrategy = require('passport-github').Strategy;

passport.use(new GithubStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: "http://0.0.0.0:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    //Based on profile return from Github, find existing user
    let user = profile;

    user['accessToken'] = accessToken;

    //Return user model
    return done(null, user);
  })
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;

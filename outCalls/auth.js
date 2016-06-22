import { CLIENT_ID, CLIENT_SECRET, CLIENT_IP } from './config';

const passport = require('passport'),
  GithubStrategy = require('passport-github').Strategy;

passport.use(new GithubStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: `http://${CLIENT_IP || '0.0.0.0'}:3000/auth/github/callback`
  },
  function(accessToken, refreshToken, profile, done) {
    let user = profile;
    user['accessToken'] = accessToken;
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

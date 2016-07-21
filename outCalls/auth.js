const appConfig  = require('./config');

const passport = require('passport'),
  GithubStrategy = require('passport-github').Strategy;

passport.use(new GithubStrategy({
    clientID: appConfig.CLIENT_ID,
    clientSecret: appConfig.CLIENT_SECRET,
    callbackURL: `http://${appConfig.CLIENT_IP || '0.0.0.0'}:${appConfig.CLIENT_PORT}/auth/github/callback`
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

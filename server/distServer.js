import express from 'express';
import expresssession from 'express-session';
import path from 'path';
import colors from 'colors';
import compression from 'compression';
import request from 'superagent';
import bodyParser from 'body-parser';
import {APP_SECRET} from '../outCalls/config';
const passport = require('../outCalls/auth');

/* eslint-disable no-console */

const port = 3000;
const app = express();

app.use(compression());
app.use(express.static('dist'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(expresssession({ secret: APP_SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/github', passport.authenticate('github',
  {scope: ['user', 'repo']}
));

app.get('/auth/github/callback', passport.authenticate('github',
  {failureRedirect: '/login?status=failed' }), function(req, res) {
  res.redirect('/login?status=passed&token='+req.user.accessToken);
});

app.get('/logout', function(req, res){
  req.session.destroy(function (err) {
    res.redirect('/');
  });
});

app.get('/user', function(req, res) {
  res.redirect('/');
});

function authed(req, res, next){
  if (req.user){
    next();
  } else {
    res.redirect('/auth/github');
  }
}

app.get('/repo/tocttou/:repo', authed, function(req, res) {
  request
    .get('https://api.github.com/repos/tocttou/' + req.params.repo)
    .set('Authorization', 'token ' + req.user.accessToken)
    .end(function(err, res) {
      console.log(err || res);
    });
});

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../dist/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`visit http://localhost:${port}`.yellow);
  }
});

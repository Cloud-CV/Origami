/* eslint-disable no-console */

import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import * as portfinder from 'portfinder';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const appConfig  = require('../outCalls/config');
const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
import colors from 'colors';

import Rootsettingsmodel from './data/rootsettingsmodel';

import githubDemoModelController from './controlller/githubdemomodelController';
import nonghDemoModelController from './controlller/nonghdemomodelController';
import inputComponentModelController from './controlller/inputcomponentModelController';
import outputComponentModelController  from './controlller/outputcomponentController';

const port = appConfig.CLIENT_PORT;
const app = express();

let http = require('http').Server(app);
let io = require('socket.io')(http);

const externalip = require('external-ip');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const process = require('process');
const spawn = require('child_process').spawn;
const fs = require('fs');

const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

//authentication

let session = require('express-session')({
  secret: Math.random().toString(20),
  resave: true,
  cookie: { path: '/', httpOnly: true, maxAge: 36000000 },
  saveUninitialized: true
});
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

function checkRootSettingStatus(req, res, next) {
  Rootsettingsmodel.find((err, model) => {
    if (err) {
      res.redirect('/error');
    } else {
      if (Object.keys(model).length > 0) {

        passport.use(new GithubStrategy({
          clientID: model[0].clientid,
          clientSecret: model[0].clientsecret,
          callbackURL: `http://${model[0].appip || '0.0.0.0'}:${model[0].port}/auth/github/callback`
        },
          (accessToken, refreshToken, profile, done) => {
            let user = profile;
            user.accessToken = accessToken;
            return done(null, user);
          })
        );

        passport.serializeUser((user, done) => {
          done(null, user);
        });

        passport.deserializeUser((user, done) => {
          done(null, user);
        });
        next();

      } else {
        res.redirect('/initialsetup');
      }
    }
  });
}

// routes

app.get('/alive', (req, res) => {
  res.sendStatus(200);
});

app.get('/auth/github', checkRootSettingStatus, passport.authenticate('github',
  { scope: ['user', 'repo'] }
));

app.get('/auth/github/callback', checkRootSettingStatus, passport.authenticate('github',
  { failureRedirect: '/login?status=failed' }), (req, res) => {
    Rootsettingsmodel.find((err, model) => {
      if (err) {
        res.send(err);
      } else {
        if ((model[0].rootUserGithubLoginId === parseInt(req.user.id, 10)) || (model[0].allowNewLogins)) {
          res.redirect(`/login?status=passed&token=${req.user.accessToken}&username=${req.user.username}&userid=${req.user.id}`);
        } else {
          req.session.destroy((err) => {
            res.send('New users are not allowed. Contact admin.');
          });
        }
      }
    });
  });

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/');
  });
});

app.get('/user*', checkRootSettingStatus, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../src/index.html'));
});

app.get('/ngh*', checkRootSettingStatus, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../src/index.html'));
});

// API routes

app.get('/api/rootsettings', (req, res) => {
  Rootsettingsmodel.find((err, model) => {
    if (err) {
      res.send(err);
    } else {
      res.json([{
        username: model[0].rootUserGithubLoginName,
        appip: model[0].appip,
        port: model[0].port
      }]);
    }
  });
});

app.post('/api/rootsettings', (req, res) => {
  Rootsettingsmodel.find((err, model) => {
    if (err) {
      res.send(err);
    } else if (Object.keys(model).length > 0) {
      res.status(400).send('Root user already exists');
    } else {
      const newModel = new Rootsettingsmodel(Object.assign({}, req.body));
      newModel.save((err) => {
        if (err) {
          res.send(err);
        } else {

          passport.use(new GithubStrategy({
            clientID: req.body.clientid,
            clientSecret: req.body.clientsecret,
            callbackURL: `http://${req.body.appip || '0.0.0.0'}:${req.body.port}/auth/github/callback`
          },
            (accessToken, refreshToken, profile, done) => {
              let user = profile;
              user.accessToken = accessToken;
              return done(null, user);
            })
          );

          passport.serializeUser((user, done) => {
            done(null, user);
          });

          passport.deserializeUser((user, done) => {
            done(null, user);
          });

          res.json(newModel);
        }
      });
    }
  });
});

app.get('/api/areusersallowed', (req, res) => {
  Rootsettingsmodel.find((err, model) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const toSend = {
        allowNewLogins: model[0].allowNewLogins
      };
      res.json(toSend);
    }
  });
});

app.use('/api/githubdemomodel', githubDemoModelController);
app.use('/api/nonghdemomodel', nonghDemoModelController);
app.use('/api/inputmodel', inputComponentModelController);
app.use('/api/outputmodel', outputComponentModelController);


// Catch all route

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../src/index.html'));
});

//Socket

app.post('/inject', (req, res) => {
  io.sockets.in(req.body.socketId).emit('injectoutputdata', req.body);
  res.sendStatus(200);
});

io.on('connection', (socket) => {

  socket.on('savesessiontoken', (sessiontoken) => {
    socket.join(sessiontoken);

    socket.on('fetchfreeport', () => {
      portfinder.getPort((err, port) => {
        socket.emit('fetchedport', port);
      });
    });

    socket.on('fetchcurrentport', () => {
      socket.emit('fetchedcurrentport', port);
    });

    socket.on('getpublicipaddress', () => {
      const getIP = externalip();
      getIP((err, ip) => {
        if (!err) {
          socket.emit('gotpublicip', ip);
        } else {
          socket.emit('erroringettingpublicip', err);
        }
      });
    });


    // Deployment procedure

    socket.on('startdeployment', (clone_data) => {

      const clone_url = clone_data.split(',')[0];
      const username = clone_data.split(',')[1];
      const reponame = clone_data.split(',')[2];
      const repoid = clone_data.split(',')[4];
      const clone_dir = `/tmp/${username}/${repoid}/`;

      rimraf(clone_dir, (err) => {
        if (err) {
          console.log(err);
        }

        const clone = spawn('git', ['clone', clone_url, clone_dir]);

        clone.stdout.on('data', (data) => {
          socket.emit('datafromterminal', filterColors(data));
        });

        clone.stderr.on('data', (data) => {
          socket.emit('errorfromterminal', filterColors(data));
        });

        clone.on('close', (code) => {
          socket.emit('cloningcomplete', code);

          if (code === 0) {
            const docker = spawn('docker-compose', ['-f', `${clone_dir}/docker-compose.yml`, 'up', '-d']);

            docker.stdout.on('data', (data) => {
              socket.emit('datafromterminal', filterColors(data));
            });

            docker.stderr.on('data', (data) => {
              socket.emit('errorfromterminal', filterColors(data));
            });

            docker.on('close', (code) => {
              socket.emit('deploymentcomplete', code);
            });
          }
        });

      });

    });

    // Kill procedure

    socket.on('startkillprocedure', (username, repoId, dockercomposefile) => {
      mkdirp(`/tmp/${username}/${repoId}/`, (err) => {
        if (err) {
          console.error(err);
        } else {
          fs.writeFile(`/tmp/${username}/${repoId}/docker-compose.yml`, dockercomposefile, (err) => {
            if (err) {
              console.log(err);
            } else {
              const shutdown = spawn('docker-compose', ['-f', `/tmp/${username}/${repoId}/docker-compose.yml`,
                'down', '--rmi', 'all', '-v', '--remove-orphan']);
              shutdown.on('close', (code) => {
                socket.emit('killstatus', code);
              });
            }
          });
        }
      });
    });


  });
});

function filterColors(data) {
  const ascii = String.fromCharCode.apply(null, new Uint8Array(data));
  return ascii.replace(
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
}

http.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`visit http://${appConfig.CLIENT_IP}:${port}`.yellow);
  }
});

mongoose.connect(`mongodb://${process.env.INDOCKER ? 'db' : '0.0.0.0'}:27017/demo`);


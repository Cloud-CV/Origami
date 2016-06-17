import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import * as portfinder from 'portfinder';
import bodyParser from 'body-parser';
import { APP_SECRET } from '../outCalls/config';
const passport = require('../outCalls/auth');
import colors from 'colors';

/* eslint-disable no-console */

const port = 3000;
const app = express();

let http = require('http').Server(app);
let io = require('socket.io')(http);

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

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//authentication

let session = require("express-session")({
  secret: APP_SECRET,
  resave: true,
  saveUninitialized: true
});
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/github', passport.authenticate('github',
  {scope: ['user', 'repo']}
));

app.get('/auth/github/callback', passport.authenticate('github',
  {failureRedirect: '/login?status=failed' }), function(req, res) {
  res.redirect('/login?status=passed&token='+req.user.accessToken+'&username='+req.user.username);
});

app.get('/logout', function(req, res){
  req.session.destroy(function (err) {
    res.redirect('/');
  });
});

app.get('/user', function(req, res) {
  res.redirect('/');
});

app.get('*', function(req, res) {
  res.sendFile(path.resolve( __dirname, '../src/index.html'));
});

//Socket

io.on('connection', function(socket){

  socket.on('savesessiontoken', sessiontoken => {
    socket.join(sessiontoken);

    app.post('/inject', function(req, res) {
      io.sockets.in(req.body.socketId).emit('injectoutputdata', req.body);
      res.sendStatus(200);
    });

    socket.on('fetchfreeport', () => {
      portfinder.getPort((err, port) => {
        socket.emit('fetchedport', port);
      });
    });

    socket.on('fetchcurrentport', () => {
      socket.emit('fetchedcurrentport', port);
    });


    // Deployment procedure

    socket.on('startdeployment', clone_data => {

      const clone_url = clone_data.split(',')[0];
      const username = clone_data.split(',')[1];
      const reponame = clone_data.split(',')[2];
      const repoid = clone_data.split(',')[4];
      const clone_dir = '/tmp/'+username+'/'+repoid+'/';

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

          if (code == '0') {
            const docker = spawn('docker-compose', ['-f', clone_dir + '/docker-compose.yml','up', '-d']);

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
      mkdirp(`/tmp/${username}/${repoId}/`, function (err) {
        if (err) {
          console.error(err);
        } else {
          fs.writeFile(`/tmp/${username}/${repoId}/docker-compose.yml`, dockercomposefile, err => {
            if (err) {
              console.log(err);
            } else {
              const shutdown = spawn('docker-compose', ['-f', `/tmp/${username}/${repoId}/docker-compose.yml`,
              'down', '--rmi', 'all', '-v', '--remove-orphan']);
              shutdown.on('close', code => {
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

http.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`visit http://0.0.0.0:${port}`.yellow);
  }
});


# CloudCVfy Webapp

[![Build Status](https://travis-ci.org/Cloud-CV/Origami.svg?branch=master)](https://travis-ci.org/Cloud-CV/cvfy-frontend.svg?branch=master)
[![Dependency Status](https://david-dm.org/Cloud-CV/Origami.svg)](https://david-dm.org/Cloud-CV/cvfy-frontend)
[![devDependency Status](https://david-dm.org/Cloud-CV/Origami/dev-status.svg)](https://david-dm.org/Cloud-CV/cvfy-frontend#info=devDependencies)

Follow issues template to file an issue unless it is a feature request.

## Build instructions

**This application requires node v5+**

### Using Docker:

1. Install [docker](https://docs.docker.com/engine/installation/)
2. Install [docker-compose](https://docs.docker.com/compose/install/)
3. Clone this repository

**Note: Make sure the user deploying this application is in the "docker" group. That is, the user can use docker without sudo access.**

> sudo groupadd docker

> sudo usermod -aG docker $USER

Then logout and log back in.

#### A.) docker compose (recommended)

1. `docker-compose up -d`
2. Wait for the build to finish. Visit `0.0.0.0:5001`. Follow on-screen instructions to add a root user.
3. If you want to change the port from `5001` to something else, edit `docker-compose.yml` file, line `- "5001:5001"` to `- "<REQUIRED_PORT>:5001"`

#### B.) Using docker directly

We need to setup mongodb manually in this case.
You can use the provided Dockerfile in DBSetup/MongoDB for it or use your own mongodb instace running at port `27017` (default). 
If you are using your own mongodb instance, skip to step 5.

1. `cd` to DBSetup/MongoDB
2. `docker build -t mongodb .` Wait for the build to finish.
3. `docker run -d -p 27017:27017 --restart=always mongodb`
4. `cd` back to the root directory
5. `docker build -t cvfy .` Wait for the build to finish.
6. `docker run -d -p 5001:5001 --restart=always cvfy`
7. Visit `0.0.0.0:5001` and follow the on-screen instructions to add a root user.
8. If you want to change the port from `5001`, run `docker run -d -p <REQUIRED_PORT>:5001 --restart=always cvfy` instead of command number `6` above.

### Without docker (only OSX and Linux are supported as of now)

1. Setup mongodb as described above (your own or from DBSetup/MongoDB).
2. To change the application port, edit `outCalls/config.js`
3. `npm i`
4. `npm run build -s`
5. `npm start -s`

## Developement

### Dev server (unsuitable for deployment)

1. Setup mongodb as described above (your own or from DBSetup/MongoDB).
2. To change the application port, edit `outCalls/config.js`
3. `npm i`
4. `npm run dev -s`

### Production server

(Same as `Without Docker` section above under `Build instructions`).

(building for production will take some time and require > 1GB ram - use swap if your machine doesn't have meet the requirements)

## License

This software is licensed under GNU AGPLv3. Please see the included `License` file. All external libraries, if modified, will be mentioned below explicitly.

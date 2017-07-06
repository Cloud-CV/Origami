# Origami

[![Build Status](https://travis-ci.org/Cloud-CV/Origami.svg?branch=master)](https://travis-ci.org/Cloud-CV/cvfy-frontend.svg?branch=master)
[![Dependency Status](https://david-dm.org/Cloud-CV/Origami.svg)](https://david-dm.org/Cloud-CV/cvfy-frontend)
[![devDependency Status](https://david-dm.org/Cloud-CV/Origami/dev-status.svg)](https://david-dm.org/Cloud-CV/cvfy-frontend#info=devDependencies)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)


## Development setup instructions

**This application requires node v5+ and Python 2.7/3.4+**

### Create a Virtual Environment

1. `pip install virtualenv`
2. `virtualenv venv` venv = Name of virtualenv
3. `source venv/bin/activate`

**Note: Step 2 will create a folder named venv in your working directory**

### Getting the code and dependencies

1. Clone this repository
2. Navigate to the repo. Usually `cd Origami/`
3. Add all the python dependencies.
   `pip install -r requirements.txt` 
4. Add all the javascript dependencies
   `yarn` (preferably) or `npm install`
5. Setup redis 
 `docker run -d -p 6379:6379 --name origami-redis redis:alpine`

### Setting up the database


#### Create all the tables

```
python manage.py makemigrations
python manage.py migrate
```

### Start the server

1. Start the server by `python manage.py runserver --noworker`
2. Start the worker by `python manage.py runworker`
3. `node server.js`
4. Go to [localhost:8000](http://localhost:8000/)
Visit [Read the docs](http://cloudcv-origami.readthedocs.io/en/latest/) for further instructions on Getting started

## License

This software is licensed under GNU AGPLv3. Please see the included `License` file. All external libraries, if modified, will be mentioned below explicitly.

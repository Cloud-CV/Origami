# Getting started with Origami

## Prerequisites

In order to get up and running with Origami, you will need to install [Docker](https://www.docker.com), [PostegreSQL](https://www.postgresql.org) and [Redis](https://redis.io), as well as [Python](https://www.python.org) (v2.7/3.4+) and [Node.js](https://nodejs.org) (v5+).

## Creating a Virtual Environment

1. Install the `virtualenv` package: `pip install virtualenv`.
2. Create a virtual environment: `virtualenv origami` (in this case, `origami` is the name of the virtual environment).
3. Activate the virtual environment: `source origami/bin/activate`.

**Note: step 2 will create a folder named origami in your working directory.**

In order to exit from the virtual environment, run `deactivate`.

## Getting the code and dependencies

**Note: this assumes you have already setup `origami.env`. For more info see [`readme.md`](README.md#setting-the-environment-variables).**

1. Clone this repository

2. Navigate to the repo (usually `cd Origami`).

3. Install all of the Python dependencies:

```bash
pip install -r requirements.txt`
```

If the command above returns an error similar to

```
error: command 'clang' failed with exit status 1
```

try running:

```bash
$ python -m pip install -r requirements.txt
```

4. Install all of the Node.js dependencies: `yarn` (preferably, in case you have [Yarn](https://yarnpkg.com) installed) or `npm install`.

5. Start the Redis Docker contaienr:

```bash
docker run -d -p 6379:6379 --name origami-redis redis:alpine
```

6. Setup the environment variables: `source origami.env`.

## Setting up Postgres

### Create all tables used by Origami

Run the following commands from the project root:

```bash
python manage.py makemigrations
python manage.py migrate
```

The commands above will automagically setup Postgres.

In case you run into an issue with the database, you can remove all existing migrations by running the following:

```bash
find api/migrations/ -type f ! -name "__init__.py" -delete
```

and then run the commands above.

### Create an admin account

Run the following command:

```bash
python manage.py initadmin
```

## Starting the server

1. Start the server by running: `python manage.py runserver --noworker`.
2. Start the worker by running: `python manage.py runworker`.
3. Start the Webpack hot-reload server by running: `yarn run dev`.
4. Navigate to [localhost:8000](http://localhost:8000) in your browser to start using Origami.
Visit [Origami's docs](http://cloudcv-origami.readthedocs.io/en/latest/) for further instructions on getting started.

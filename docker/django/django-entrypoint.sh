#!/usr/bin/env bash
env NODE_ENV="production" node_modules/.bin/webpack --config /app/webpack.prod.config.js
python manage.py makemigrations
until python manage.py migrate --noinput 
do
	echo "Waiting for postgres ready..."
	sleep 2
done
python manage.py initadmin
python manage.py collectstatic --noinput
daphne -b django_app -p 8001 django_server.asgi:channel_layer & python manage.py runworker & python manage.py runworker & uwsgi --socket :8000 --module django_server.wsgi --processes 4 --threads 2

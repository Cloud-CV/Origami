export HOST="ENTER HOSTNAME"
export PORT="80"
cd ~/Origami/
sudo apt-get update
sudo apt-get install redis-server
sudo apt-get install python-dev
sudo apt-get install nginx
sudo /etc/init.d/nginx start
sudo ln -s ~/Origami/deployment/origami_nginx.conf /etc/nginx/sites-enabled/
sudo pip install -r requirements.txt
yarn
python manage.py makemigrations
python manage.py migrate --noinput
mkdir static/
mkdir media/
python manage.py collectstatic --noinput
sudo /etc/init.d/nginx restart
env NODE_ENV="production" node_modules/.bin/webpack --config webpack.prod.config.js
daphne -b 0.0.0.0 -p 8001 django_server.asgi:channel_layer & python manage.py runworker & python manage.py runworker & uwsgi --socket :8000 --module django_server.wsgi --processes 4 --threads 2

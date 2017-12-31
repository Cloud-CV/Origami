sudo docker run -d -p 6379:6379 --name origami-redis redis:alpine
sudo docker start origami-redis
tmux new -s server -d
tmux send-keys -t server 'source ~/venv/bin/activate && source origami.env && python manage.py runserver --noworker' C-m &
tmux new -s worker -d
tmux send-keys -t worker 'source ~/venv/bin/activate && source origami.env && python manage.py runworker &' C-m &
tmux new -s node -d
tmux send-keys -t node 'node server.js' C-m

sudo docker run -d -p 6379:6379 --name origami-redis redis:alpine
sudo docker start origami-redis
tmux new -s server -d
VENV="~/venv/bin/activate"
tmux send-keys -t server 'source '"$VENV"' && source origami.env && python manage.py runserver --noworker' C-m &
mkfifo /tmp/tmuxpipeserver
tmux pipe-pane -o -t server 'cat >> /tmp/tmuxpipeserver'
cat /tmp/tmuxpipeserver & 
tmux new -s worker -d
tmux send-keys -t worker 'source '"$VENV"' && source origami.env && python manage.py runworker &' C-m &
mkfifo /tmp/tmuxpipeworker
tmux pipe-pane -o -t worker 'cat >> /tmp/tmuxpipeworker'
cat /tmp/tmuxpipeworker & 
tmux new -s node -d
tmux send-keys -t node 'node server.js' C-m &
mkfifo /tmp/tmuxpipenode
tmux pipe-pane -o -t node 'cat >> /tmp/tmuxpipenode'
cat /tmp/tmuxpipenode & 
function finish {
	tmux kill-session -t server
	tmux kill-session -t worker
	tmux kill-session -t node
}
trap finish EXIT
sleep infinity


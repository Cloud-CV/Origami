#!/bin/bash

npm install nvm
npm install yarn

echo "export NVM_DIR=\"$HOME/.nvm\"\n[ -s \"$NVM_DIR/nvm.sh\" ] && \. \"$NVM_DIR/nvm.sh\"" > ~/.bashrc
source .bashrc

export HOST=localhost \
	   PORT=8000 DB_NAME="origami" \
	   DB_USER="origamiuser" \
	   DB_PASS="password" \
	   DB_USER_EMAIL="test@test.com" \
	   DB_HOST="localhost" \
	   REDIS_HOST="redis"

nvm install 8.11.9
nvm use 8.11.9

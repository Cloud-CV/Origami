#!/bin/bash

# if file already exists,
# confirm before overwrite
if [ -f origami.env ]; then
	read -p "origami.env already exists. Continue? (y/N): " -n 1 -r CONT
	echo 
	if [[ ! $CONT =~ ^[Yy]$ ]]; then
		exit 0
	fi
fi

echo "set -a" > origami.env

# takes two arguments $1 and $2
# first argument is env variable
# second is its default value
# function takes input and adds it
# to end of generated file
addline () {
	read -p "Enter $1 (default '$2'): " INPUT
	INPUT=${INPUT:-$2}
	echo "export $1=$INPUT" >> origami.env
}

addline HOST localhost
addline PORT 8000
addline DB_NAME origami
addline DB_USER postgres
addline DB_PASS postgres
addline DB_USER_EMAIL $(git config user.email)
addline DB_HOST localhost
addline REDIS_HOST localhost

echo "set +a" >> origami.env

echo -e "\nRun this command every time after entering your virtualenv: "
echo -e "\tsource origami.env"
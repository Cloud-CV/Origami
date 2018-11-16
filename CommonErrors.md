### Common Errors during installation

#### 1. Error
```
You are trying to add a non-nullable field 'cuda' to demo without a default; we can't do that (the database needs something to populate existing rows).
Please select a fix:
1) Provide a one-off default now (will be set on all existing rows with a null value for this column)
2) Quit, and let me add a default in models.py
Select an option: 
```

#### Solution
Select option 1 and offer an empty string for more than a few fields.

#### 2. Error
```
Unable to locate package npm.
```

#### Solution
Try to install Origami manually rather than using docker. Instructions are given in the Development setup instructions section of the Readme.

#### 3. After executing
```
 python manage.py runserver --noworker
```

Error :
``` 
Error trying to receive messages: Error 61 connecting to localhost:6379. Connection refused.
```

#### Solution

Connection refused error is because the ```origami-reds``` container is not running (chech it thorugh ```docker ps``` ) and try to run docker start ```origami-redis```.

#### 4. Error
```
Unable to find image 'redis:alpine' locally
docker: Error response from daemon: Get https://registry-1.docker.io/v2/: dial tcp 52.5.185.86:443: getsockopt: connection refused."
for 6th step "-bash: origami.env: line 1: syntax error near unexpected token newline' -bash: origami.env: line 1:HOST=<HOSTNAME>'
```

#### Solution
Origami.env is not setup properly, please refer to ReadME.

#### 5. Error
```
OSError: Command /home/USER/Origami/venv/bin/python - setuptools pip wheel failed with error code 2
```

#### Solution
Refer to [Solution](https://askubuntu.com/questions/400343/trying-to-create-a-python-virtual-environment-but-getting-oserror).

#### 6.Error
```
error: 2017-12-14 17:34:05,313 - ERROR - server - Error trying to receive messages: Error 111 connecting to localhost:6379. Connection refused.
while running python manage.py runserver --noworker
```

#### Solution
Run ```docker rm origami-redis``` and then run the docker setup command from the GitHub page again.

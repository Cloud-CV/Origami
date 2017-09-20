FROM python:2.7
MAINTAINER CloudCV Team <team@cloudcv.org>

WORKDIR /app
ENV PYTHONUNBUFFERED 1
COPY . /app
RUN mkdir -p static/
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update 
RUN apt-get install -y apt-utils \
    nodejs-legacy \
    npm

RUN pip install uwsgi channels

RUN npm install -g n 
RUN npm install -g npm@latest
RUN n lts

RUN pip install -r requirements.txt

CMD ["/bin/bash", "/app/docker/django/django-entrypoint.sh"]

FROM ubuntu:16.04
MAINTAINER Ashish Chaudhary <me@ashishchaudhary.in>

RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN apt update && \
    apt install -y wget

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 6.3.1
RUN wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.31.4/install.sh | bash \
    && source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/v$NODE_VERSION/bin:$PATH
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

ADD . /usr/local
WORKDIR /usr/local
EXPOSE 3000
RUN npm install && \
     npm run build -s
ENTRYPOINT npm start -s

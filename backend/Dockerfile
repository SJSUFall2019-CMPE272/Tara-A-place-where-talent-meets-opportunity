FROM node:8.16

RUN apt-get update && \
    apt-get install -y \
        python3 \
        python3-pip \
        python3-setuptools \
        groff \
        less \
    && pip3 install --upgrade pip \
    && apt-get clean

RUN pip3 --no-cache-dir install --upgrade awscli

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY src/ src/
COPY index.js index.js

CMD ["node", "index.js"]
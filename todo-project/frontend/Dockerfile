FROM node:17.1.0-alpine3.14 as build-stage

MAINTAINER "Sasha Klepikov <kai@list.ru>"

WORKDIR /opt

COPY package* ./

RUN npm install

COPY . .

CMD ["npm", "run","serve"]

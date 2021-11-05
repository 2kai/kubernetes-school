FROM node:17.0.1-alpine3.14

MAINTAINER "Sasha Klepikov <kai@list.ru>"

WORKDIR /opt

COPY package* ./

RUN npm install

COPY . .

CMD ["node", "src/server.js"]

FROM node:17.1.0-alpine3.14

MAINTAINER "Sasha Klepikov <kai@list.ru>"

WORKDIR /opt

COPY package* ./

RUN npm install

COPY . .

RUN ./node_modules/typescript/bin/tsc src/api.ts

CMD ["node", "src/api.js"]

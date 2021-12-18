FROM node:17.1.0-alpine3.14

LABEL org.opencontainers.image.authors="Sasha Klepikov <kai@list.ru>"

WORKDIR /opt

COPY package* ./

RUN npm install

COPY . .

CMD ["npm", "start"]

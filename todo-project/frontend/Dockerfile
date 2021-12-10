FROM node:17.1.0-alpine3.14 as build-stage

MAINTAINER "Sasha Klepikov <kai@list.ru>"

WORKDIR /opt

COPY package* ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.21.4-alpine

COPY --from=build-stage /opt/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

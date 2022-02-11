FROM golang:1.17.7-alpine3.14 as base

MAINTAINER "Sasha Klepikov <kai@list.ru>"

WORKDIR /opt/src

COPY ./src .

# Exercise 1.07
FROM base as e107

CMD ["go", "run", "1.07.go"]

# Exercise 1.10
FROM base as writer

CMD ["go", "run", "writer.go"]

FROM base as reader

CMD ["go", "run", "reader.go"]

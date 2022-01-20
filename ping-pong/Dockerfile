FROM python:3.10.2-alpine3.14

MAINTAINER "Sasha Klepikov <kai@list.ru>"

WORKDIR /opt

COPY src/requirements.txt ./

RUN apk add --no-cache --virtual .build-deps cargo make g++ postgresql-dev \
    && pip install --no-cache-dir --upgrade -r requirements.txt \
    && apk --purge del .build-deps \
    && apk add --no-cache libpq

COPY . .

CMD uvicorn src.app:app --host 0.0.0.0 --port "$PORT"

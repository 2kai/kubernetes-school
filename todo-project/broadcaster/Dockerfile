FROM ruby:3.0.3-alpine3.15

MAINTAINER "Sasha Klepikov <kai@list.ru>"

WORKDIR /opt

COPY Gemfile* ./

RUN bundle install

COPY . .

CMD ["ruby", "worker.rb"]

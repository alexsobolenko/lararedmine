FROM php:8.5-fpm-alpine

ARG COMPOSER_VERSION=2.10.0

RUN apk add --no-cache autoconf g++ make linux-headers postgresql-dev

RUN docker-php-ext-install pdo_pgsql \
    && pecl install redis \
    && docker-php-ext-enable redis

RUN curl -sS https://getcomposer.org/installer \
    | php -- --install-dir=/usr/local/bin --version=$COMPOSER_VERSION --filename=composer

WORKDIR /var/www/html

EXPOSE 9000

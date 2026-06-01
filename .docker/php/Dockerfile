FROM php:8.5-fpm

ARG UNAME=www-data
ARG UGROUP=www-data
ARG USER_ID=1000
ARG GROUP_ID=1000
ARG COMPOSER_VERSION=2.10.0

RUN groupmod -o -g "${GROUP_ID}" $UGROUP \
    && usermod -o -u "${USER_ID}" -g $UGROUP $UNAME

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        $PHPIZE_DEPS \
        curl \
        git \
        unzip \
        libicu-dev \
        libpq-dev \
        libzip-dev \
    && docker-php-ext-install \
        intl \
        pdo_pgsql \
        zip \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && rm -rf /var/lib/apt/lists/*

RUN git config --system --add safe.directory /var/www/html

RUN curl -sS https://getcomposer.org/installer \
    | php -- --install-dir=/usr/local/bin --version=$COMPOSER_VERSION --filename=composer

WORKDIR /var/www/html

USER www-data

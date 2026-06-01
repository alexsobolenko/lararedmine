FROM node:22-alpine

ARG USER_ID=1000
ARG GROUP_ID=1000

RUN apk add --no-cache shadow \
    && groupmod -o -g "${GROUP_ID}" node \
    && usermod -o -u "${USER_ID}" -g node node \
    && apk del shadow

WORKDIR /var/www/html

USER node

CMD ["tail", "-f", "/dev/null"]

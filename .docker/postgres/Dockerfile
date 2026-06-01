FROM postgres:13

ARG UNAME=postgres
ARG UGROUP=postgres
ARG USER_ID=1000
ARG GROUP_ID=1000

RUN groupmod -o -g "${GROUP_ID}" $UGROUP \
    && usermod -o -u "${USER_ID}" -g $UGROUP $UNAME

ENV PGDATA=/var/lib/postgresql/data/pgdata

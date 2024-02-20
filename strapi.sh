#!/bin/sh

export DB_USER='${PG_USER}'
export DB_PASS='${PG_PASS}'

echo "${DB_PASS}"
echo '{$DB_USER}'
echo '$PG_USER'
echo '${PG_PASS}'


cd ~/gettem

git fetch origin prod

git reset --hard FETCH_HEAD

git clean -df

DB_USER='${PG_USER}' DB_PASS='${PG_PASS}' docker compose -f docker-compose-prod.yml up -d strapi

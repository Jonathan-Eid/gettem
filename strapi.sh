#!/bin/sh

export DB_USER=${DB_USER}
export DB_PASS=${DB_PASS}

cd ~/gettem

git fetch origin prod

git reset --hard FETCH_HEAD

git clean -df

docker compose -f docker-compose-prod.yml up -d strapi
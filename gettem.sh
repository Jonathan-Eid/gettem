#!/bin/sh

export STRAPI_URL=${STRAPI_URL}
export STRAPI_AUTH_TOKEN=${STRAPI_AUTH}


cd ~/gettem

git fetch origin prod

git reset --hard FETCH_HEAD

git clean -df

docker compose -f docker-compose-prod.yml up -d traefik
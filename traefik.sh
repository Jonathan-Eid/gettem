#!/bin/sh


cd ~/gettem

git fetch origin prod

git reset --hard FETCH_HEAD

git clean -df

docker compose -f docker-compose-prod.yml up -d traefik
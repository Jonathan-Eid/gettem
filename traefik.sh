#!/bin/sh
cd ~/gettem
git fetch origin prod
git reset --hard FETCH_HEAD
git clean -df

docker compose up -f docker-compose-prod.yml -d traefik
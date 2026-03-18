#!/usr/bin/env bash
set -euo pipefail

# Build the React frontend (gettem portfolio site)
# Output: frontend/build/

cd "$(realpath "$(dirname "$0")/../frontend")"

echo "==> Switching to Node 16..."
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"
export REACT_APP_STRAPI_AUTH_TOKEN=2a12231f7df07dc49887315413d4c0d992463e91ecee46930ab1f347694c93cc11796c6abab8847627017cef4ec46629d6a44f0b9ea33f33285559368b45df553d51b06b2d8f09aba2a82e3a005dca08736a1887814fbbdc78c275c58a9f6daf9edb190f32aebaeb887a2acd8c70f172e6c207a91ca12fb056bf8272a80cde99
export REACT_APP_STRAPI_URL=https://dashboard.joneid.dev
export REACT_APP_ANALYTICS_URL=http://joneid.dev/api/ingest
nvm use 16
yarn install --frozen-lockfile

echo "==> Building frontend..."
yarn build

echo "==> Frontend built → frontend/build/"

echo "==> Building Docker image (Dockerfile.prod)..."
docker build -t otacon900/gettem:latest -f Dockerfile.prod .

echo "==> Docker image built → otacon900/gettem:latest"

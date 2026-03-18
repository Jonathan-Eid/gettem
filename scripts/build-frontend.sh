#!/usr/bin/env bash
set -euo pipefail

# Build the React frontend (gettem portfolio site)
# Output: frontend/build/

cd "$(realpath "$(dirname "$0")/../frontend")"

echo "==> Switching to Node 16..."
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"
nvm use 16
yarn install --frozen-lockfile

echo "==> Building frontend..."
yarn build

echo "==> Frontend built → frontend/build/"

echo "==> Building Docker image (Dockerfile.prod)..."
docker build -t otacon900/gettem:latest -f Dockerfile.prod .

echo "==> Docker image built → otacon900/gettem:latest"

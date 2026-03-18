#!/usr/bin/env bash
set -euo pipefail

# Build the Strapi backend
# Output: backend/build/

cd "$(realpath "$(dirname "$0")/../backend")"

echo "==> Installing Strapi dependencies..."
yarn install --frozen-lockfile

echo "==> Building Strapi..."
yarn build

echo "==> Strapi built → backend/build/"

#!/usr/bin/env bash
set -euo pipefail

# Build the cache_keeper service
# Note: This is a simple Node.js service — just install deps.
# The prod Dockerfile copies source and runs `yarn && node index.js`.

cd "$(realpath "$(dirname "$0")/../cache_keeper")"

echo "==> Installing cache_keeper dependencies..."
yarn install --frozen-lockfile

echo "==> cache_keeper ready (no build step needed)"

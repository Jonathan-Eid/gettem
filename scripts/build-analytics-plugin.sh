#!/usr/bin/env bash
set -euo pipefail

# Build the Grafana analytics plugin (frontend + Go backend)
# Output: analytics/plugin/dist/

ANALYTICS_DIR="$(realpath "$(dirname "$0")/../analytics")"

# Frontend
echo "==> Building plugin frontend..."
cd "$ANALYTICS_DIR/plugin"
yarn install --frozen-lockfile
yarn build

# Backend (Go binary for linux/amd64)
echo "==> Building plugin backend..."
cd "$ANALYTICS_DIR"
mkdir -p plugin/dist
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o plugin/dist/gpx_gettem-analytics-app_linux_amd64 ./cmd/plugin

echo "==> Analytics plugin built → analytics/plugin/dist/"

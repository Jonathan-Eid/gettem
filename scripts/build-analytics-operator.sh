#!/usr/bin/env bash
set -euo pipefail

# Build the analytics-operator Docker image and push to DockerHub
# Image: otacon900/gettem-analytics-operator:latest

ANALYTICS_DIR="$(realpath "$(dirname "$0")/../analytics")"
IMAGE="otacon900/gettem-analytics-operator:latest"

echo "==> Building analytics-operator Docker image..."
docker build -t "$IMAGE" -f "$ANALYTICS_DIR/cmd/operator/Dockerfile" "$ANALYTICS_DIR"

echo "==> Pushing $IMAGE to DockerHub..."
docker push "$IMAGE"

echo "==> Done → $IMAGE"

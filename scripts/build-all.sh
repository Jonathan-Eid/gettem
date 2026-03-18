#!/usr/bin/env bash
set -euo pipefail

# Build all components locally so they can be synced to prod

SCRIPTS_DIR="$(dirname "$0")"

echo "========================================="
echo "  Building all components"
echo "========================================="

"$SCRIPTS_DIR/build-frontend.sh"
echo ""
"$SCRIPTS_DIR/build-strapi.sh"
echo ""
"$SCRIPTS_DIR/build-analytics-plugin.sh"
echo ""
"$SCRIPTS_DIR/build-cache-keeper.sh"
echo ""
"$SCRIPTS_DIR/build-analytics-operator.sh"

echo ""
echo "========================================="
echo "  All builds complete!"
echo "========================================="
echo ""
echo "Sync to prod with:"
echo "  rsync -avz --exclude node_modules --exclude .git . prod-host:~/gettem/"

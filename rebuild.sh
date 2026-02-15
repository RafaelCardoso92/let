#!/bin/bash
# Rebuild and deploy let project
# Always uses --no-cache to ensure fresh build

set -e

cd ~/let

echo "[1/4] Building Docker image with --no-cache..."
sudo docker build --no-cache -t let:latest .

echo "[2/4] Tagging image..."
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
sudo docker tag let:latest 100.113.17.63:30500/let:latest
sudo docker tag let:latest 100.113.17.63:30500/let:$TIMESTAMP

echo "[3/4] Pushing to registry..."
sudo docker push 100.113.17.63:30500/let:latest
sudo docker push 100.113.17.63:30500/let:$TIMESTAMP

echo "[4/4] Restarting deployment..."
sudo kubectl rollout restart deployment/let -n apps
sudo kubectl rollout status deployment/let -n apps --timeout=120s

echo ""
echo "Done! Deployed let:$TIMESTAMP"

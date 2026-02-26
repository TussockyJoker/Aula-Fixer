!/usr/bin/env bash

source .env

echo "Building/signing listed firefox extension"
mv src/manifest.json src/manifest_temp.json
mv src/manifest_ff.json src/manifest.json
echo "manifest_ff > manifest"
web-ext sign --channel=unlisted --api-key=user:$API_KEY --api-secret=$API_SECRET --source-dir=./src --artifacts-dir=./builds
mv src/manifest.json src/manifest_ff.json
mv src/manifest_temp.json src/manifest.json
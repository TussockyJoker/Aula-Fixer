#!/usr/bin/env bash

source .env

cd src
mv manifest.json manifest_temp.json
mv manifest_ff.json manifest.json
web-ext sign --channel=listed --api-key=user:$API_KEY --api-secret=$API_SECRET
mv manifest.json manifest_ff.json
mv manifest_temp.json manifest.json
cd ..
mv manifest.json manifest_temp.json
mv manifest_ff.json manifest.json
web-ext sign --channel=listed --api-key=user: --api-secret=
mv manifest.json manifest_ff.json
mv manifest_temp.json manifest.json
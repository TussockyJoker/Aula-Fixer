# Aula-Fixer

This is a browser extension that removes all the notifications about rooms for rent and tenancy takeovers etc. from Aula and changes the styling of the pages to stop wasting so much space.

Will remove any notifications containing the any of the ~keywords~ keyphrases in the keywords.txt file stored in this repo, it can also fall back on a local keywords.txt if the server cannot be reached.

I've only tested with Chrome, Brave and Firefox. The easiest way to install this on chromium or similar is to use the prepackaged .crx. You can also install it by cloning this repo to a folder on your computer, turning on dev mode in chrome://extensions (or equivalent), clicking on 'Load unpacked' and selecting the src folder within the Aula-Extension folder, if you update/customize the extension, reload it to apply any changes.

For Firefox, I've made a signed .xpi which can be found in builds. To install from here, just open a new firefox tab and drag it into the window.

The Firefox version will often be slightly more up-to-date compared to the chrome version as building for chrome cannot be done from the CLI (afaik).

I'm working on getting the extension published on both the Chrome and Firefox stores.

https://addons.mozilla.org/en-GB/firefox/addon/aula-ad-filter/

https://chromewebstore.google.com/detail/aula-ad-filter/ooghijbicaoiccbkjplnellggncbcgbl?authuser=0&hl=en-GB

If you just want the 'ad-blocker' function, I've kept a separate branch in this repo.
If you have customised keywords.txt, you will have to break the url in 'background.js' so that it falls back on the local keywords.txt file. This only works if you are NOT using the prepackaged extensions or extensions from the chrome/firefox stores, these will only pull from the file in this repo or fall back on the included version if the server cannot be reached. If you think a word or phrase should be added to keywords.txt, either submit a pull request or raise an issue.

If you would like to build the extension for yourself run /build_scripts/build.sh, which will give you a .zip compatible with most browsers, if you wish to build a Firefox .xpi you will need to get a developer api key and change the id in the manifest.
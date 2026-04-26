# Aula-Fixer

Browser extension to improve the UX of the Aula platform (aula.education) by removing notifications about rooms for rent, tenancy takeovers etc. Also alters the styling of certain pages to reduce wasted space on your screen.

Chrome Store:   https://chromewebstore.google.com/detail/aula-fixer/ooghijbicaoiccbkjplnellggncbcgbl?hl=en-GB
Firefox Addons: https://addons.mozilla.org/en-GB/firefox/addon/aula-fixer/

The extension will remove any notifications containing the any of the keyphrases in the keywords.txt file stored in ~this~ the github mirror of this repo, it will fall back on an included list of keywords if the server cannot be reached.

This extension has only been tested with Chrome, Brave, Firefox and Edge. The easiest way to install this on a chromium based browser is to get it from the Chrome Web Store. Alternatively, you can download and extract the .zip file (or clone the repo) load into Chrome as an unpacked extension. I did pack a .crx for this purpose but Chrome has removed the ability to load .crx files 😐

For Firefox, again, the easiest way is to follow the link to Firefox Addons and install it from there, however I've made an xpi file which can be found in builds. To install this .xpi, just open a new firefox tab and drag it into the window.

The Firefox version will often be slightly more up-to-date compared to the chrome version as building/publishing for firefox is easier and faster.

If you have customised keywords.txt, you will have to break or remove the url in 'background.js' so that it falls back on the local keywords.txt file. This only works if you are NOT using the prepackaged extensions or extensions from the chrome/firefox stores, these will only pull from the file in this repo or fall back on the included version if the server cannot be reached. If you think a word or phrase should be added to keywords.txt, either submit a pull request or raise an issue.

If you would like to build the extension for yourself you can do so by running the relevant script in /build_scripts/build.sh, which will give you a .zip compatible with most browsers, if you wish to build a Firefox .xpi you will need to get a developer api key and change the id in the manifest.
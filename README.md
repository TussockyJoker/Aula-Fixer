# Aula-Fixer

This is a browser extension that removes all the notifications about rooms for rent and tenancy takeovers etc. from Aula (aula.education) and changes the styling of the pages to stop wasting so much space.

Will remove any notifications containing the any of the ~keywords~ keyphrases in the keywords.txt file stored in this repo, it can also fall back on a local keywords.txt if the server cannot be reached.

This extension has only been tested with Chrome, Brave, Firefox and Edge. The easiest way to install this on a chromium based browser is to get it from the Chrome Web Store. Alternatively you can either download the .zip file extract it somewhere or clone this repo and load into Chrome (or similar) as an unpacked extension. I did pack a .crx for this purpose but Chrome has removed the ability to load .crx files 😐

For Firefox, again, the easiest way is to follow the link to Firefox Addons and install it from there, however I've made a signed .xpi which can be found in builds. To install this .xpi, just open a new firefox tab and drag it into the window.

The Firefox version will often be slightly more up-to-date compared to the chrome version as building for chrome cannot be done from the CLI (afaik) and the approval process takes longer.

You can get this extension on both the Chrome and Firefox stores now!

https://addons.mozilla.org/en-GB/firefox/addon/aula-fixer/

https://chromewebstore.google.com/detail/aula-fixer/ooghijbicaoiccbkjplnellggncbcgbl?hl=en-GB

If you just want the 'ad-blocker' function, I've kept a separate branch in this repo.
If you have customised keywords.txt, you will have to break or remove the url in 'background.js' so that it falls back on the local keywords.txt file. This only works if you are NOT using the prepackaged extensions or extensions from the chrome/firefox stores, these will only pull from the file in this repo or fall back on the included version if the server cannot be reached. If you think a word or phrase should be added to keywords.txt, either submit a pull request or raise an issue.

If you would like to build the extension for yourself you can do so by running the relevant script in /build_scripts/build.sh, which will give you a .zip compatible with most browsers, if you wish to build a Firefox .xpi you will need to get a developer api key and change the id in the manifest.
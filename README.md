# Aula-Fixer

Browser extension to improve the UX of the Aula platform (aula.education) by removing notifications about rooms for rent, tenancy takeovers etc. Also alters the styling of certain pages to reduce wasted space on your screen.

Chrome Store:   https://chromewebstore.google.com/detail/aula-fixer/ooghijbicaoiccbkjplnellggncbcgbl?hl=en-GB
Firefox Addons: https://addons.mozilla.org/en-GB/firefox/addon/aula-fixer/

The extension will remove any notifications containing the any of the keyphrases in the keywords.txt file stored in ~this~ the github mirror of this repo, it will fall back on an included list of keywords if the server cannot be reached.

This extension has only been tested with Chrome, Brave, Firefox and Edge. The easiest way to install this on a chromium based browser is to get it from the Chrome Web Store. Alternatively, you can download and extract the .zip file (or clone the repo) and then [load it into Chrome as an unpacked extension](https://webkul.com/blog/how-to-install-the-unpacked-extension-in-chrome/#:~:text=Open%20Chrome%20Settings%20from%20the%20three%20dots,Unpacked%20and%20select%20the%20unzipped%20extension%20folder.). I did try to pack a .crx for this purpose but Chrome has removed the ability to load .crx files directly 😐.

For Firefox, again, the easiest way is to go to Firefox Addons and install it from there, however I've made an xpi file which can be found in builds or releases. To install this .xpi, just open a new firefox tab and drag it into the window.

The Firefox version may often be slightly more up-to-date compared to the chrome version as building/publishing for firefox is easier and faster.

If you wish to use a customised keywords.txt, you will have to break, remove or change the url in 'background.js' so that it falls back on the local keywords.txt file. This only works if you are NOT using the prepackaged extensions or extensions from the chrome/firefox stores, these will only ever pull from the file in this repo or the included file.

If you have any issues or think a keyword/phrase should be added, please feel free to submit a PR or raise an issue.

If you would like to build the extension for yourself you can do so by running the relevant script in /build_scripts/build.sh, which will give you a .zip compatible with most browsers, if you wish to build a Firefox .xpi you will need to get a developer api key, create a .env file, and change the id in the manifest.
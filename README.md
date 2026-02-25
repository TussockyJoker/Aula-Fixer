# Aula-Fixer

Browser extension that removes all the notifications about rooms for rent and tenancy takeovers from Aula and changes the styling of the pages to stop wasting so much space.

Will remove any notifications containing the any of the ~keywords~ keyphrases in the keywords.txt file stored in this repo, it can also fall back on a local keywords.txt if the server cannot be reached.

I've only tested with Chrome, Brave and Firefox. The easiest way to install this on chromium or similar is to use the prepackaged .crx. You can also install it by cloning this repo to a folder on your computer, turning on dev mode in chrome://extensions (or equivalent), clicking on 'Load unpacked' and selecting the Aula-Extension folder, if you update/customize the extension, reload it to apply any changes.

For firefox I've built an xpi which is signed (surprisingly difficult), just open a new firefox tab and drag it into the window.

I'm working on getting the extension published on the chrome and firefox stores.
https://addons.mozilla.org/en-GB/firefox/addon/aula-ad-filter/
https://chromewebstore.google.com/detail/aula-ad-filter/ooghijbicaoiccbkjplnellggncbcgbl?authuser=0&hl=en-GB

If you just want the 'ad-blocker' function, I've kept a separate branch in this repo.
If you want to use a custom keywords.txt, you can break the url in background.js and it will then fall back on the local keywords.txt file. This only works if you are NOT using the prepackaged extensions or extensions from the chrome/firefox stores, these will only pull from the file in this repo. If you think a word or phrase should be added to keywords.txt, either submit a pull request or raise an issue. 
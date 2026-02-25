# Aula-Fixer

Browser extension that removes all the notifications about rooms for rent and tenancy takeovers from Aula and also changes the styling of the pages to stop wasting so much space.

Will remove any notifications containing the any of the ~keywords~ keyphrases in keywords.txt so you can make it hide other stuff too if you wanted (This file is currently packaged inside the extension and so cannot be updated if you're using a packaged version, I will fix this at some point.).

I've only tested with Chrome, Brave and Firefox. The easiest way to install this on chromium or similar is to use the prepackaged .crx. You can also install it by turning on dev mode in chrome://extensions (or equivalent), clicking on 'Load unpacked' and selecting the Aula-Extension folder, if you update keywords.txt, just reload the extension.

For firefox I've built an xpi which is signed (surprisingly difficult), just open a new firefox tab and drag it into the window.

I'm working on getting the extension published on the chrome and firefox stores.

As mentioned before, the keyphrases cannot be edited if you're using the prepacked .xpi or .crx file.

If you just want the 'ad-blocker' I've kept a separate branch.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "GET_KEYWORDS") {

        const remoteUrl = "https://git.wbell.dev/TussockyJoker/Aula-Fixer/raw/branch/main/src/keywords.txt";
        const localUrl = chrome.runtime.getURL("keywords.txt");

        // remote
        fetch(remoteUrl)
            .then(response => {
                if (!response.ok) throw new Error("Remote fetch failed");
                return response.text();
            })
            .then(text => {
                console.log("Loaded remote keywords");
                sendResponse({ success: true, data: text });
            })
            .catch(() => {
                console.warn("Remote failed, loading local fallback");

                // local
                fetch(localUrl)
                    .then(response => response.text())
                    .then(text => {
                        console.log("Loaded local fallback keywords");
                        sendResponse({ success: true, data: text });
                    })
                    .catch(error => {
                        sendResponse({ success: false, error: error.toString() });
                    });
            });

        return true;
    }
});
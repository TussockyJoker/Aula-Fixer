let keywords = [];

function loadKeywords() {
    chrome.runtime.sendMessage({ type: "GET_KEYWORDS" }, (response) => {
        if (!response || !response.success) {
            console.error("Failed to load remote keywords:", response?.error);
            return;
        }

        keywords = response.data
            .split("\n")
            .map(k => k.trim().toLowerCase())
            .filter(Boolean);

        console.log("Loaded keywords:", keywords);

        injectStyles();
        startFiltering();
    });
}

function filterNotifications() {
    const notifications = document.querySelectorAll('div[role="button"]');

    notifications.forEach(notification => {
        const text = notification.innerText?.toLowerCase() || "";

        const containsKeyword = keywords.some(keyword =>
            text.includes(keyword)
        );

        if (containsKeyword) {
            notification.remove();
        }
    });
}

function injectStyles() {
    // Prevent duplicate injection
    if (document.getElementById("aula-fixer-styles")) return;

    const style = document.createElement("style");
    style.id = "aula-fixer-styles";

    style.textContent = `
        .css-qbgecn {
            max-height: 99% !important;
            padding: 0 !important;
        }
        
        .css-15ampbt {
            overflow: hidden !important;
        }

        .css-1iji2l6 {
            margin: 1px !important;
        }

        #main-content > div > div > div.css-qbgecn.e1f8gytw1 {
            overflow-y: hidden !important;
        }

        .css-1vz9kb2 {
            flex-basis: 85% !important;
            padding: 0px 0px 0px 1% !important;
        }

        .css-nivjaw {
            padding: 12px 12px 12px 12px !important;
        }
    `;

    document.head.appendChild(style);
}

function startFiltering() {
    filterNotifications();

    const observer = new MutationObserver(() => {
        filterNotifications();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

loadKeywords();
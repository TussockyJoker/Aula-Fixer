let keywords = [];

async function loadKeywords() {
    try {
        const response = await fetch(chrome.runtime.getURL("keywords.txt"));
        const text = await response.text();

        keywords = text
            .split("\n")
            .map(k => k.trim().toLowerCase())
            .filter(Boolean);

        console.log("Loaded keywords:", keywords);

        injectStyles();
        startFiltering();

    } catch (error) {
        console.error("Failed to load keywords.txt:", error);
    }
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
    const style = document.createElement("style");

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
            padding: 12px 12px 12px 12px;
        
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
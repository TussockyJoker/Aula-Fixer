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

        startFiltering();

    } catch (error) {
        console.error("Failed to load keywords.txt:", error);
    }
}

function filterNotifications() {
    const notifications = document.querySelectorAll('div[role="button"]');

    notifications.forEach(notification => {
        const text = notification.innerText.toLowerCase();

        const containsKeyword = keywords.some(keyword =>
            text.includes(keyword)
        );

        if (containsKeyword) {
            notification.remove();
        }
    });
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
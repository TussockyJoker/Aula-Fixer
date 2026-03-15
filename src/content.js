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

function removeTrailingEmptyParagraphs() {
    const editors = document.querySelectorAll('[data-slate-editor="true"]');

    editors.forEach(editor => {
        const paragraphs = editor.querySelectorAll('p[data-slate-node="element"]');

        // Walk backwards and remove trailing empty ones
        let i = paragraphs.length - 1;
        while (i >= 0) {
            const p = paragraphs[i];
            const zeroWidthSpan = p.querySelector('[data-slate-zero-width]');
            const hasOnlyZeroWidth = zeroWidthSpan && p.innerText.trim() === "";

            if (hasOnlyZeroWidth) {
                p.style.display = "none";
                i--;
            } else {
                break;
            }
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
            padding: 0 !important;
            max-height: calc(-102px + 100vh) !important;
        }
        
        .css-iex1ax {
            height: 95% !important
        }

        .css-1r0ebcd {
            height: 99% !important
        }

        .css-15ampbt {
            overflow: hidden !important;
        }

        .css-1iji2l6 {
            margin: 1px !important;
        }

        @media screen and (min-width: 900px) {
            .css-1vz9kb2 {
            flex-basis: 100%
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
    removeTrailingEmptyParagraphs();

    const observer = new MutationObserver(() => {
        filterNotifications();
        removeTrailingEmptyParagraphs();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

loadKeywords();
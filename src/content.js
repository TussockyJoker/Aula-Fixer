let keywords = [];

function removeMarkCompleteButton() {
    document
        .querySelectorAll('[data-testid="mark-as-complete-icon"]')
        .forEach(icon => {
            const button = icon.closest("button");
            if (button) {
                button.remove();
            }
        });
}

function removeElementByText(text) {
  const buttons = document.querySelectorAll('button');
  for (const btn of buttons) {
    if (btn.textContent.trim() === text) {
      btn.remove();
      break;
    }
  }
}

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
            padding-bottom: 1px !important;
        }

        /* reduces video player width */
        .plyr video {
            max-width: 75vh !important
        }

        /* removes black bars around video */
        .css-vrzzm8 {
            max-width: 75vh !important;
        }

        .plyr__video-wrapper {
            width: auto; !important;
        }

        /* reduces max height of images from 1200px to 120px, will need to review this or make it adjustable as i can imagine it breaks certain pages*/

        .css-1uv2qow {
            max-height: 240px !important;
        }

        .css-12gi33l {
            padding-top: 0px !important;
            padding-bottom: 0px !important;
            padding-left: 9px !important;
            padding-right: 9px !important;
        }
        
        /* adjusts formatting of pdf previewers in aula */
        .pdfobject {
            height: 60vh !important;
            min-height: 440px !important
        }

        .css-1njvcqf {
            padding: 0px 0px 0px 0px !important;
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
            padding: 9px 12px 6px 12px !important;
        }

        .css-3rnrqu-focusOutline {
            box-sizing: border-box;
            position: relative;
            padding-top: 1px;
            height: 100%;
        }
        
        /* removes padding at bottom of sidebar */
        .css-1x4o4rg {
            padding-bottom: 0px !important;
        }

        .css-48tzk0 {
            margin: 0px !important
        }
    `;

    document.head.appendChild(style);
}

function startFiltering() {
    filterNotifications();
    removeTrailingEmptyParagraphs();
    removeMarkCompleteButton();
    removeElementByText('View progress overview');

    const observer = new MutationObserver(() => {
        filterNotifications();
        removeTrailingEmptyParagraphs();
        removeMarkCompleteButton();
        removeElementByText('View progress overview');
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

loadKeywords();
let keywords = [];

// Load excludes.txt first
async function loadKeywords() {
  try {
    const response = await fetch(chrome.runtime.getURL("excludes.txt"));
    const text = await response.text();

    keywords = text
      .split("\n")
      .map(k => k.trim().toLowerCase())
      .filter(Boolean);

    console.log("Loaded keywords:", keywords);

    startFiltering(); // start only after keywords are ready

  } catch (error) {
    console.error("Failed to load excludes.txt:", error);
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
  // Run once
  filterNotifications();

  // Watch for dynamically loaded notifications
  const observer = new MutationObserver(() => {
    filterNotifications();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Start everything
loadKeywords();
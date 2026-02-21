const keywords = ["tenancy", "bedroom available", "spacious room", "room available cv13GX queens park house unite student"];

// Function to check and remove matching notifications
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

// Run once on load
filterNotifications();

// Watch for dynamically loaded notifications
const observer = new MutationObserver(() => {
  filterNotifications();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
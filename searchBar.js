document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");

  if (!searchInput) {
    return;
  }

  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (query.length > 0) {
        window.location.href = `searchVisitors.html?query=${encodeURIComponent(
          query
        )}`;
      }
    }
  });
});

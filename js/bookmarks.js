export function initializeBookmarks() {
  const bookmarksContainer = document.getElementById('bookmarks');
  const searchInput = document.getElementById('search');
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

  function renderBookmarks(filterTerm = '') {
    bookmarksContainer.innerHTML = '';
    const filteredBookmarks = filterTerm ? 
      bookmarks.filter(bookmark => 
        bookmark.title.toLowerCase().includes(filterTerm.toLowerCase()) ||
        bookmark.url.toLowerCase().includes(filterTerm.toLowerCase())
      ) : bookmarks;

    filteredBookmarks.forEach(bookmark => {
      const card = document.createElement('div');
      card.className = 'bookmark-card';
      card.innerHTML = `
        <h3>${bookmark.title}</h3>
        <p>${new URL(bookmark.url).hostname}</p>
        <button onclick="window.open('${bookmark.url}', '_blank')">Continue</button>
        <button class="remove-bookmark" data-url="${bookmark.url}">Remove</button>
      `;
      bookmarksContainer.appendChild(card);
    });
  }

  // Add event listener for removing bookmarks
  bookmarksContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-bookmark')) {
      const url = e.target.dataset.url;
      bookmarks = bookmarks.filter(b => b.url !== url);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      renderBookmarks(searchInput.value);
    }
  });

  // Add keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'b') {
      const currentUrl = window.location.href;
      const currentTitle = document.title;
      
      if (!bookmarks.some(b => b.url === currentUrl)) {
        bookmarks.push({
          url: currentUrl,
          title: currentTitle
        });
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        renderBookmarks(searchInput.value);
      }
    }
  });

  // Listen to search events
  let searchTimeout;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      renderBookmarks(e.target.value);
    }, 300); // Debounce search for better performance
  });

  renderBookmarks();
}
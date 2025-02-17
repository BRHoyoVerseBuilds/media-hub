export function initializeBookmarks() {
  const bookmarksContainer = document.getElementById('bookmarks');
  if (!bookmarksContainer) {
    console.warn('Bookmarks container not found');
    return;
  }

  let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

  async function getVideoInfo(url) {
    try {
      // Skip CORS for certain platforms that we can parse from the URL
      
      // YouTube
      const youtubeMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
      if (youtubeMatch) {
        const videoId = youtubeMatch[1];
        const apiUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
        
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          return {
            thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
            uploader: data.author_name || 'YouTube Channel',
            title: data.title || 'YouTube Video'
          };
        } catch (error) {
          console.warn('Failed to fetch YouTube data:', error);
          return {
            thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
            uploader: 'YouTube Channel',
            title: 'YouTube Video'
          };
        }
      }
      
      // Twitch
      const twitchMatch = url.match(/(?:twitch\.tv\/videos\/(\d+))|(?:twitch\.tv\/(\w+))/);
      if (twitchMatch) {
        const videoId = twitchMatch[1];
        const channelName = twitchMatch[2];
        
        if (videoId) {
          return {
            thumbnail: `https://static-cdn.jtvnw.net/cf_vods/${videoId}-preview-480x272.jpg`,
            uploader: 'Twitch Channel',
            title: `Twitch VOD ${videoId}`
          };
        } else if (channelName) {
          return {
            thumbnail: `https://static-cdn.jtvnw.net/previews-ttv/live_user_${channelName}-320x180.jpg`,
            uploader: channelName,
            title: `${channelName}'s Channel`
          };
        }
      }

      // Plex
      if (url.includes('plex.tv')) {
        return {
          thumbnail: 'https://github.com/BRHoyoVerseBuilds/media-hub/blob/main/img/plex-default.png?raw=true',
          uploader: 'Plex',
          title: 'Plex Media'
        };
      }

      // For other URLs, try a meta-scraper service
      const apiUrl = `https://api.microlink.io?url=${encodeURIComponent(url)}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      if (data.status === 'success') {
        return {
          thumbnail: data.data.image?.url || null,
          uploader: data.data.author || data.data.publisher || new URL(url).hostname,
          title: data.data.title || 'Untitled'
        };
      }

      // If all else fails, return basic info
      return {
        thumbnail: null,
        uploader: new URL(url).hostname,
        title: 'Untitled'
      };

    } catch (error) {
      console.warn('Error fetching video info:', error);
      return {
        thumbnail: null,
        uploader: new URL(url).hostname,
        title: 'Untitled'
      };
    }
  }

  async function renderBookmarks(filterTerm = '') {
    if (!bookmarksContainer) return;
    
    bookmarksContainer.innerHTML = '';
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    const filteredBookmarks = filterTerm ? 
      bookmarks.filter(bookmark => 
        bookmark.title.toLowerCase().includes(filterTerm.toLowerCase()) ||
        bookmark.url.toLowerCase().includes(filterTerm.toLowerCase())
      ) : bookmarks;

    for (const bookmark of filteredBookmarks) {
      const { thumbnail, uploader, title } = await getVideoInfo(bookmark.url);
      // Update the stored title if we found a better one
      if (title && title !== 'Untitled' && title !== bookmark.title) {
        bookmark.title = title;
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      }
      
      const card = document.createElement('div');
      card.className = 'bookmark-card';
      
      card.innerHTML = `
        <div class="bookmark-thumbnail" style="background-image: url('${thumbnail || 'https://github.com/BRHoyoVerseBuilds/media-hub/blob/main/img/default-thumbnail.png?raw=true'}')">
          ${!thumbnail ? `<div class="bookmark-fallback">${bookmark.title[0].toUpperCase()}</div>` : ''}
        </div>
        <div class="bookmark-info">
          <h3>${bookmark.title}</h3>
          <p class="uploader">${uploader}</p>
          <p class="domain">${new URL(bookmark.url).hostname}</p>
          <div class="bookmark-actions">
            <button onclick="window.open('${bookmark.url}', '_blank')" class="continue-button">Continue</button>
            <button class="remove-bookmark" data-url="${bookmark.url}">Remove</button>
          </div>
        </div>
      `;
      
      bookmarksContainer.appendChild(card);
    }
  }

  // Add event listener for removing bookmarks
  bookmarksContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-bookmark')) {
      const url = e.target.dataset.url;
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
      const updatedBookmarks = bookmarks.filter(b => b.url !== url);
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      renderBookmarks();
    }
  });

  // Initial render
  renderBookmarks();

  // Listen for bookmark updates
  document.addEventListener('bookmarksUpdated', () => {
    renderBookmarks();
  });
}
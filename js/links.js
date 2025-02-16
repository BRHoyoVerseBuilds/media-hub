export function initializeLinks() {
  const defaultLinks = [
    {
      title: 'YouTube',
      url: 'https://youtube.com',
      icon: '▶️'
    },
    {
      title: 'Twitch',
      url: 'https://www.twitch.tv/',
      icon: '🎮'
    },
    {
      title: 'Hi Anime',
      url: 'https://hianime.to/home',
      icon: '🍥'
    },
    {
      title: 'Plex',
      url: 'https://app.plex.tv/',
      icon: '🎬'
    }
  ];

  let links = JSON.parse(localStorage.getItem('links')) || defaultLinks;
  const grid = document.getElementById('links-grid');
  const quickAccessBtn = document.getElementById('add-quick-access');
  const bookmarkBtn = document.getElementById('add-bookmark');
  const quickAccessModal = document.getElementById('quick-access-modal');
  const bookmarkModal = document.getElementById('bookmark-modal');
  const quickAccessForm = document.getElementById('quick-access-form');
  const bookmarkForm = document.getElementById('bookmark-form');

  function handleDragStart(e) {
    e.target.classList.add('dragging');
    e.dataTransfer.setData('text/plain', e.target.dataset.index);
  }

  function handleDragEnd(e) {
    e.target.classList.remove('dragging');
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
    const toIndex = parseInt(e.target.closest('.grid-item').dataset.index);
    
    // Reorder links array
    const item = links.splice(fromIndex, 1)[0];
    links.splice(toIndex, 0, item);
    
    // Save and render
    localStorage.setItem('links', JSON.stringify(links));
    renderLinks();
  }

  function renderLinks() {
    grid.innerHTML = '';
    
    links.forEach((link, index) => {
      const item = document.createElement('div');
      item.className = 'grid-item';
      item.setAttribute('draggable', true);
      item.dataset.index = index;
      
      const iconContent = link.icon.startsWith('http') ? 
        `<img src="${link.icon}" class="icon-image" alt="${link.title} icon">` :
        `<div class="icon">${link.icon}</div>`;
      
      item.innerHTML = `
        ${iconContent}
        <div class="title">${link.title}</div>
        <button class="link-settings" title="Link settings">
          <img src="https://github.com/BRHoyoVerseBuilds/media-hub/blob/main/img/link%20setting.png?raw=true" alt="Settings">
        </button>
      `;
      
      // Add drag and drop handlers
      item.addEventListener('dragstart', handleDragStart);
      item.addEventListener('dragend', handleDragEnd);
      item.addEventListener('dragover', handleDragOver);
      item.addEventListener('drop', handleDrop);
      
      // Open link on click (except for settings button)
      item.addEventListener('click', (e) => {
        if (!e.target.closest('.link-settings')) {
          window.open(link.url, '_blank');
        }
      });

      // Settings handler
      item.querySelector('.link-settings').addEventListener('click', (e) => {
        e.stopPropagation();
        openLinkSettings(link, index);
      });

      grid.appendChild(item);
    });
  }

  function openLinkSettings(link, index) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    
    modal.innerHTML = `
      <div class="modal-content">
        <h2>Link Settings</h2>
        <form id="link-settings-form">
          <div class="settings-section">
            <label for="title">Title</label>
            <input type="text" id="title" name="title" value="${link.title}" required>
          </div>
          
          <div class="settings-section">
            <label for="url">URL</label>
            <input type="url" id="url" name="url" value="${link.url}" required>
          </div>
          
          <div class="settings-section">
            <label for="icon">Icon URL</label>
            <input type="url" id="icon" name="icon" value="${link.icon.startsWith('http') ? link.icon : ''}" placeholder="Leave empty for emoji icon">
            ${!link.icon.startsWith('http') ? `
              <div class="current-emoji">
                <span>Current emoji: ${link.icon}</span>
              </div>
            ` : ''}
          </div>

          <div class="button-group">
            <button type="button" class="delete-link danger">Delete Link</button>
            <div class="right-buttons">
              <button type="button" class="cancel">Cancel</button>
              <button type="submit" class="save">Save Changes</button>
            </div>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(modal);

    const form = modal.querySelector('#link-settings-form');
    const deleteBtn = modal.querySelector('.delete-link');
    const cancelBtn = modal.querySelector('.cancel');

    // Handle form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const updatedLink = {
        title: formData.get('title'),
        url: formData.get('url'),
        icon: formData.get('icon') || '🔗'
      };
      
      links[index] = updatedLink;
      localStorage.setItem('links', JSON.stringify(links));
      renderLinks();
      modal.remove();
    });

    // Handle delete
    deleteBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete this link?')) {
        links = links.filter((_, i) => i !== index);
        localStorage.setItem('links', JSON.stringify(links));
        renderLinks();
        modal.remove();
      }
    });

    // Handle cancel
    cancelBtn.addEventListener('click', () => {
      modal.remove();
    });
  }

  quickAccessBtn.addEventListener('click', () => {
    quickAccessModal.classList.add('active');
  });

  bookmarkBtn.addEventListener('click', () => {
    bookmarkModal.classList.add('active');
  });

  quickAccessForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newLink = {
      title: formData.get('title'),
      url: formData.get('url'),
      icon: formData.get('icon') || '🔗'
    };
    
    links.push(newLink);
    localStorage.setItem('links', JSON.stringify(links));
    renderLinks();
    quickAccessModal.classList.remove('active');
    e.target.reset();
  });

  bookmarkForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    
    try {
      const response = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
      const text = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      
      const title = doc.querySelector('meta[property="og:title"]')?.content ||
                   doc.querySelector('meta[name="twitter:title"]')?.content ||
                   doc.title ||
                   'Untitled';

      let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
      bookmarks.push({
        title: title,
        url: url
      });
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      document.dispatchEvent(new CustomEvent('bookmarksUpdated'));
    } catch (error) {
      console.warn('Error fetching page title:', error);
      let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
      bookmarks.push({
        title: new URL(url).hostname,
        url: url
      });
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      document.dispatchEvent(new CustomEvent('bookmarksUpdated'));
    }
    
    bookmarkModal.classList.remove('active');
    e.target.reset();
  });

  quickAccessModal.querySelector('.cancel').addEventListener('click', () => {
    quickAccessModal.classList.remove('active');
    quickAccessForm.reset();
  });

  bookmarkModal.querySelector('.cancel').addEventListener('click', () => {
    bookmarkModal.classList.remove('active');
    bookmarkForm.reset();
  });

  // Add search functionality
  const searchInput = document.getElementById('search');
  let searchTimeout;

  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const searchTerm = e.target.value.toLowerCase();
      performSearch(searchTerm);
    }, 300); // Debounce search for better performance
  });

  function performSearch(searchTerm) {
    if (!searchTerm) {
      renderLinks();
      return;
    }

    grid.innerHTML = '';
    const filteredLinks = links.filter(link => 
      link.title.toLowerCase().includes(searchTerm) ||
      link.url.toLowerCase().includes(searchTerm)
    );

    filteredLinks.forEach((link, index) => {
      const item = document.createElement('div');
      item.className = 'grid-item';
      item.setAttribute('draggable', true);
      item.dataset.index = index;
      
      const iconContent = link.icon.startsWith('http') ? 
        `<img src="${link.icon}" class="icon-image" alt="${link.title} icon">` :
        `<div class="icon">${link.icon}</div>`;
      
      item.innerHTML = `
        ${iconContent}
        <div class="title">${link.title}</div>
        <button class="link-settings" title="Link settings">
          <img src="https://github.com/BRHoyoVerseBuilds/media-hub/blob/main/img/link%20setting.png?raw=true" alt="Settings">
        </button>
      `;
      
      // Add drag and drop handlers
      item.addEventListener('dragstart', handleDragStart);
      item.addEventListener('dragend', handleDragEnd);
      item.addEventListener('dragover', handleDragOver);
      item.addEventListener('drop', handleDrop);
      
      // Open link on click (except for settings button)
      item.addEventListener('click', (e) => {
        if (!e.target.closest('.link-settings')) {
          window.open(link.url, '_blank');
        }
      });

      // Settings handler
      item.querySelector('.link-settings').addEventListener('click', (e) => {
        e.stopPropagation();
        openLinkSettings(link, index);
      });

      grid.appendChild(item);
    });
  }

  // Initial render
  renderLinks();
}
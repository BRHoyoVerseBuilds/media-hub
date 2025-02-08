export function initializeLinks() {
  const defaultLinks = [
    {
      title: 'YouTube',
      url: 'https://youtube.com',
      icon: '▶️',
      category: 'all'
    },
    {
      title: 'Twitch',
      url: 'https://www.twitch.tv/',
      icon: '🎮',
      category: 'all'
    },
    {
      title: 'Hi Anime',
      url: 'https://hianime.to/home',
      icon: '🍥',
      category: 'anime'
    },
    {
      title: 'Plex',
      url: 'https://app.plex.tv/',
      icon: '🎬',
      category: 'all'
    }
  ];

  let links = JSON.parse(localStorage.getItem('links')) || defaultLinks;
  const grid = document.getElementById('links-grid');
  const addButton = document.getElementById('add-link');
  const modal = document.getElementById('add-link-modal');
  const form = document.getElementById('add-link-form');

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
    renderLinks(document.querySelector('nav button.active').textContent.toLowerCase());
  }

  // Add edit functionality
  function editLink(link, index) {
    const modal = document.getElementById('add-link-modal');
    const form = document.getElementById('add-link-form');
    const title = form.querySelector('[name="title"]');
    const url = form.querySelector('[name="url"]');
    const icon = form.querySelector('[name="icon"]');
    const category = form.querySelector('[name="category"]');
    
    // Populate form with current values
    title.value = link.title;
    url.value = link.url;
    icon.value = link.icon.startsWith('http') ? link.icon : '';
    category.value = link.category;
    
    // Change form submit button text
    const submitBtn = form.querySelector('[type="submit"]');
    submitBtn.textContent = 'Save Changes';
    
    // Show modal
    modal.classList.add('active');
    
    // Update form submit handler
    const handleEdit = (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const updatedLink = {
        title: formData.get('title'),
        url: formData.get('url'),
        icon: formData.get('icon') || '🔗',
        category: formData.get('category')
      };
      
      links[index] = updatedLink;
      localStorage.setItem('links', JSON.stringify(links));
      renderLinks(document.querySelector('nav button.active').textContent.toLowerCase());
      
      modal.classList.remove('active');
      form.reset();
      submitBtn.textContent = 'Add Link';
      
      // Remove this specific event listener
      form.removeEventListener('submit', handleEdit);
      
      // Restore original submit handler
      form.addEventListener('submit', handleAddLink);
    };
    
    // Remove previous submit handlers
    const oldElement = form.cloneNode(true);
    form.parentNode.replaceChild(oldElement, form);
    form = oldElement;
    
    // Add edit submit handler
    form.addEventListener('submit', handleEdit);
  }

  function renderLinks(category = 'all') {
    grid.innerHTML = '';
    const filteredLinks = category === 'all' ? 
      links : links.filter(link => link.category === category);
    
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
        <div class="link-controls">
          <button class="edit-link" title="Edit link"><i class="fas fa-edit"></i></button>
          <button class="remove-link" title="Remove link"><i class="fas fa-times"></i></button>
        </div>
      `;
      
      // Add drag and drop handlers
      item.addEventListener('dragstart', handleDragStart);
      item.addEventListener('dragend', handleDragEnd);
      item.addEventListener('dragover', handleDragOver);
      item.addEventListener('drop', handleDrop);
      
      // Open link on click (except for controls)
      item.addEventListener('click', (e) => {
        if (!e.target.closest('.link-controls')) {
          window.open(link.url, '_blank');
        }
      });

      // Edit handler
      item.querySelector('.edit-link').addEventListener('click', (e) => {
        e.stopPropagation();
        editLink(link, index);
      });

      // Remove handler
      item.querySelector('.remove-link').addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm('Are you sure you want to remove this link?')) {
          links = links.filter((_, i) => i !== index);
          localStorage.setItem('links', JSON.stringify(links));
          renderLinks(document.querySelector('nav button.active').textContent.toLowerCase());
        }
      });

      grid.appendChild(item);
    });
  }

  // Store the original add link handler
  function handleAddLink(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newLink = {
      title: formData.get('title'),
      url: formData.get('url'),
      icon: formData.get('icon') || '🔗',
      category: formData.get('category')
    };
    
    links.push(newLink);
    localStorage.setItem('links', JSON.stringify(links));
    renderLinks();
    modal.classList.remove('active');
    form.reset();
  }

  // Initialize navigation
  document.querySelectorAll('nav button').forEach(button => {
    button.addEventListener('click', (e) => {
      document.querySelector('nav button.active').classList.remove('active');
      e.target.classList.add('active');
      renderLinks(e.target.textContent.toLowerCase());
    });
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
      renderLinks(document.querySelector('nav button.active').textContent.toLowerCase());
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
        <div class="link-controls">
          <button class="edit-link" title="Edit link"><i class="fas fa-edit"></i></button>
          <button class="remove-link" title="Remove link"><i class="fas fa-times"></i></button>
        </div>
      `;
      
      // Add drag and drop handlers
      item.addEventListener('dragstart', handleDragStart);
      item.addEventListener('dragend', handleDragEnd);
      item.addEventListener('dragover', handleDragOver);
      item.addEventListener('drop', handleDrop);
      
      // Open link on click (except for controls)
      item.addEventListener('click', (e) => {
        if (!e.target.closest('.link-controls')) {
          window.open(link.url, '_blank');
        }
      });

      // Edit handler
      item.querySelector('.edit-link').addEventListener('click', (e) => {
        e.stopPropagation();
        editLink(link, index);
      });

      // Remove handler
      item.querySelector('.remove-link').addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm('Are you sure you want to remove this link?')) {
          links = links.filter((_, i) => i !== index);
          localStorage.setItem('links', JSON.stringify(links));
          renderLinks(document.querySelector('nav button.active').textContent.toLowerCase());
        }
      });

      grid.appendChild(item);
    });
  }

  // Handle adding new links
  addButton.addEventListener('click', () => {
    modal.classList.add('active');
  });

  document.querySelector('.modal .cancel').addEventListener('click', () => {
    modal.classList.remove('active');
    form.reset();
  });

  form.addEventListener('submit', handleAddLink);

  // Initial render
  renderLinks();
}
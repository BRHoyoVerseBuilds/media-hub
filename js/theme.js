export function initializeTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Initialize with system preference if no saved theme
  const defaultSettings = {
    mode: prefersDark.matches ? 'dark' : 'light',
    primaryColor: '#6200ee',
    secondaryColor: '#03dac6',
    textColor: prefersDark.matches ? '#ffffff' : '#000000',
    font: 'Poppins',
    wallpaper: null
  };

  // Load saved theme settings with defaults
  const savedTheme = JSON.parse(localStorage.getItem('themeSettings')) || defaultSettings;
  applyTheme(savedTheme);

  // Initialize theme toggle button
  themeToggle.addEventListener('click', openThemeCustomizer);
}

function applyTheme(settings) {
  // Apply theme mode
  document.body.classList.remove('light-theme', 'dark-theme');
  document.body.classList.add(`${settings.mode}-theme`);
  
  // Apply custom colors to the :root element
  const root = document.documentElement;
  
  if (settings.mode === 'light') {
    // Light mode base colors
    root.style.setProperty('--background', '#ffffff');
    root.style.setProperty('--surface', '#f5f5f5');
    root.style.setProperty('--background-overlay', 'rgba(255, 255, 255, 0.85)');
  } else {
    // Dark mode base colors
    root.style.setProperty('--background', '#121212');
    root.style.setProperty('--surface', '#1e1e1e');
    root.style.setProperty('--background-overlay', 'rgba(0, 0, 0, 0.7)');
  }

  // Apply custom colors
  if (settings.primaryColor) {
    root.style.setProperty('--primary-color', settings.primaryColor);
  }
  if (settings.secondaryColor) {
    root.style.setProperty('--secondary-color', settings.secondaryColor);
  }
  if (settings.textColor) {
    root.style.setProperty('--on-background', settings.textColor);
    root.style.setProperty('--on-surface', settings.textColor);
  }

  // Apply font
  if (settings.font) {
    root.style.setProperty('--font-family', `'${settings.font}', sans-serif`);
  }

  // Apply wallpaper
  if (settings.wallpaper) {
    document.body.style.backgroundImage = `url(${settings.wallpaper})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
  } else {
    document.body.style.backgroundImage = 'none';
  }

  // Save settings
  localStorage.setItem('themeSettings', JSON.stringify(settings));
}

function openThemeCustomizer() {
  const currentSettings = JSON.parse(localStorage.getItem('themeSettings'));
  const modal = document.createElement('div');
  modal.className = 'modal active theme-customizer';
  
  modal.innerHTML = `
    <div class="modal-content">
      <h2>Settings</h2>
      
      <div class="settings-tabs">
        <button class="tab-button active" data-tab="theme">Theme & Appearance</button>
        <button class="tab-button" data-tab="data">Data Management</button>
      </div>

      <div class="tab-content" id="theme-tab">
        <form id="theme-form">
          <div class="theme-section">
            <h3>Theme Mode</h3>
            <div class="theme-mode-toggle">
              <button type="button" class="mode-button ${currentSettings.mode === 'light' ? 'active' : ''}" data-mode="light">
                <i class="fas fa-sun"></i> Light Mode
              </button>
              <button type="button" class="mode-button ${currentSettings.mode === 'dark' ? 'active' : ''}" data-mode="dark">
                <i class="fas fa-moon"></i> Dark Mode
              </button>
            </div>
          </div>

          <div class="theme-section">
            <h3>Colors</h3>
            <div class="color-picker-group">
              <div class="color-picker-item">
                <label>Primary Color</label>
                <input type="color" name="primaryColor" value="${currentSettings.primaryColor || '#6200ee'}">
                <span class="color-description">Used for buttons, highlights, and accents</span>
              </div>
              <div class="color-picker-item">
                <label>Secondary Color</label>
                <input type="color" name="secondaryColor" value="${currentSettings.secondaryColor || '#03dac6'}">
                <span class="color-description">Used for secondary elements and gradients</span>
              </div>
              <div class="color-picker-item">
                <label>Text Color</label>
                <input type="color" name="textColor" value="${currentSettings.textColor || '#000000'}">
                <span class="color-description">Used for all text elements</span>
              </div>
            </div>
          </div>

          <div class="theme-section">
            <h3>Font</h3>
            <select name="font" class="font-selector">
              <option value="Poppins" ${currentSettings.font === 'Poppins' ? 'selected' : ''}>Poppins</option>
              <option value="Roboto" ${currentSettings.font === 'Roboto' ? 'selected' : ''}>Roboto</option>
              <option value="Open Sans" ${currentSettings.font === 'Open Sans' ? 'selected' : ''}>Open Sans</option>
              <option value="Montserrat" ${currentSettings.font === 'Montserrat' ? 'selected' : ''}>Montserrat</option>
            </select>
          </div>

          <div class="theme-section">
            <h3>Background</h3>
            <div class="wallpaper-section">
              <div class="wallpaper-actions">
                <div class="wallpaper-upload">
                  <label for="wallpaper-file" class="upload-button">
                    <i class="fas fa-upload"></i> Upload Image
                  </label>
                  <input type="file" id="wallpaper-file" accept="image/*" style="display: none;">
                </div>
                <div class="wallpaper-url">
                  <input type="url" id="wallpaper-url" placeholder="Enter image URL">
                  <button type="button" id="add-wallpaper-url">Add</button>
                </div>
              </div>
              <div class="wallpaper-grid">
                ${getWallpaperOptions(currentSettings.wallpaper)}
              </div>
            </div>
          </div>

          <div class="button-group">
            <button type="button" class="cancel">Cancel</button>
            <button type="button" class="reset">Reset to Default</button>
            <button type="submit" class="save">Save Changes</button>
          </div>
        </form>
      </div>

      <div class="tab-content" id="data-tab" style="display: none;">
        <div class="data-management">
          <div class="data-section">
            <h3>Backup and Restore</h3>
            <p>Export your data to keep a backup of your links, bookmarks, and settings, or import a previous backup.</p>
            <div class="button-group">
              <button type="button" id="export-data" class="primary">
                <i class="fas fa-download"></i> Export to File
              </button>
              <label for="import-data" class="button secondary">
                <i class="fas fa-upload"></i> Import from File
              </label>
              <input type="file" id="import-data" accept=".json" style="display: none;">
            </div>
          </div>
          
          <div class="data-section">
            <h3>Reset Data</h3>
            <p>Clear all your data and start fresh. This action cannot be undone.</p>
            <button type="button" id="reset-data" class="danger">
              <i class="fas fa-trash"></i> Reset All Data
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Handle theme mode selection
  const modeButtons = modal.querySelectorAll('.mode-button');
  modeButtons.forEach(button => {
    button.addEventListener('click', () => {
      modeButtons.forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      
      // Preview theme mode change
      const previewSettings = {...currentSettings, mode: button.dataset.mode};
      applyTheme(previewSettings);
    });
  });

  // Handle wallpaper selection
  const wallpaperItems = modal.querySelectorAll('.wallpaper-item');
  wallpaperItems.forEach(item => {
    item.addEventListener('click', () => {
      wallpaperItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      
      // Preview wallpaper change
      const previewSettings = {...currentSettings, wallpaper: item.dataset.wallpaper};
      applyTheme(previewSettings);
    });
  });

  // Handle real-time color preview
  const colorInputs = modal.querySelectorAll('input[type="color"]');
  colorInputs.forEach(input => {
    // Preview on input (while dragging)
    input.addEventListener('input', () => {
      const formData = new FormData(modal.querySelector('#theme-form'));
      const previewSettings = {
        ...currentSettings,
        primaryColor: formData.get('primaryColor'),
        secondaryColor: formData.get('secondaryColor'),
        textColor: formData.get('textColor')
      };
      applyTheme(previewSettings);
    });

    // Preview on change (after selecting)
    input.addEventListener('change', () => {
      const formData = new FormData(modal.querySelector('#theme-form'));
      const previewSettings = {
        ...currentSettings,
        primaryColor: formData.get('primaryColor'),
        secondaryColor: formData.get('secondaryColor'),
        textColor: formData.get('textColor')
      };
      applyTheme(previewSettings);
    });
  });

  // Handle font change
  const fontSelector = modal.querySelector('select[name="font"]');
  fontSelector.addEventListener('change', () => {
    const formData = new FormData(modal.querySelector('#theme-form'));
    const previewSettings = {
      ...currentSettings,
      font: formData.get('font')
    };
    applyTheme(previewSettings);
  });

  // Handle form submission
  modal.querySelector('#theme-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newSettings = {
      mode: modal.querySelector('.mode-button.active').dataset.mode,
      primaryColor: formData.get('primaryColor'),
      secondaryColor: formData.get('secondaryColor'),
      textColor: formData.get('textColor'),
      font: formData.get('font'),
      wallpaper: modal.querySelector('.wallpaper-item.active').dataset.wallpaper
    };
    
    applyTheme(newSettings);
    modal.remove();
  });

  // Handle cancel
  modal.querySelector('.cancel').addEventListener('click', () => {
    applyTheme(currentSettings); // Revert any previewed changes
    modal.remove();
  });

  // Handle reset to default
  modal.querySelector('.reset').addEventListener('click', () => {
    const defaultSettings = {
      mode: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
      primaryColor: '#6200ee',
      secondaryColor: '#03dac6',
      textColor: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#ffffff' : '#000000',
      font: 'Poppins',
      wallpaper: null
    };
    applyTheme(defaultSettings);
    modal.remove();
  });

  // Add tab switching functionality
  const tabs = modal.querySelectorAll('.tab-button');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const tabContents = modal.querySelectorAll('.tab-content');
      tabContents.forEach(content => content.style.display = 'none');
      modal.querySelector(`#${tab.dataset.tab}-tab`).style.display = 'block';
    });
  });

  // Add export functionality
  modal.querySelector('#export-data').addEventListener('click', exportData);

  // Add import functionality
  const importInput = modal.querySelector('#import-data');
  importInput.addEventListener('change', async (e) => {
    if (e.target.files.length === 0) return;
    
    try {
      await importData(e.target.files[0]);
      alert('Data imported successfully! The page will now reload.');
      window.location.reload();
    } catch (err) {
      alert('Failed to import data: ' + err.message);
    }
  });

  // Add file upload handler
  const fileInput = modal.querySelector('#wallpaper-file');
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        addCustomWallpaper(imageUrl);
        fileInput.value = ''; // Reset file input
      };
      reader.readAsDataURL(file);
    }
  });

  // Add URL input handler
  const urlButton = modal.querySelector('#add-wallpaper-url');
  const urlInput = modal.querySelector('#wallpaper-url');
  urlButton.addEventListener('click', () => {
    const url = urlInput.value.trim();
    if (url) {
      // Validate URL
      try {
        new URL(url);
        addCustomWallpaper(url);
        urlInput.value = ''; // Reset URL input
      } catch (e) {
        alert('Please enter a valid URL');
      }
    }
  });

  // Add remove wallpaper handler
  modal.addEventListener('click', (e) => {
    if (e.target.closest('.remove-wallpaper')) {
      const wallpaper = e.target.closest('.remove-wallpaper').dataset.wallpaper;
      removeCustomWallpaper(wallpaper);
    }
  });
}

function getWallpaperOptions(currentWallpaper) {
  // Define wallpapers array with direct, raw URLs
  const wallpapers = [
    'https://github.com/BRHoyoVerseBuilds/media-hub/blob/main/wallpapers/amara%20wallpaper.png?raw=true',
    'https://raw.githubusercontent.com/BRHoyoVerseBuilds/media-hub/main/wallpapers/Wallpaper%201.png',
    'https://raw.githubusercontent.com/BRHoyoVerseBuilds/media-hub/main/wallpapers/Wallpaper%202.png',
    'https://raw.githubusercontent.com/BRHoyoVerseBuilds/media-hub/main/wallpapers/Wallpaper%203.png',
    'https://raw.githubusercontent.com/BRHoyoVerseBuilds/media-hub/main/wallpapers/Wallpaper%204.png',
    'https://raw.githubusercontent.com/BRHoyoVerseBuilds/media-hub/main/wallpapers/Wallpaper%205.png',
    'https://raw.githubusercontent.com/BRHoyoVerseBuilds/media-hub/main/wallpapers/Wallpaper%206.png',
    'https://raw.githubusercontent.com/BRHoyoVerseBuilds/media-hub/main/wallpapers/Wallpaper%207.png',
    'https://raw.githubusercontent.com/BRHoyoVerseBuilds/media-hub/main/wallpapers/Wallpaper%208.png',
    'https://raw.githubusercontent.com/BRHoyoVerseBuilds/media-hub/main/wallpapers/Wallpaper%209.png',
    'https://raw.githubusercontent.com/BRHoyoVerseBuilds/media-hub/main/wallpapers/Wallpaper%2010.png',
    'https://raw.githubusercontent.com/BRHoyoVerseBuilds/media-hub/main/wallpapers/Wallpaper%2011.png',
    'https://raw.githubusercontent.com/BRHoyoVerseBuilds/media-hub/main/wallpapers/Wallpaper%2012.png',
    'https://raw.githubusercontent.com/BRHoyoVerseBuilds/media-hub/main/wallpapers/Wallpaper%2013.png',
    'https://raw.githubusercontent.com/BRHoyoVerseBuilds/media-hub/main/wallpapers/Wallpaper%2014.png',
    'https://raw.githubusercontent.com/BRHoyoVerseBuilds/media-hub/main/wallpapers/Wallpaper%2015.png'
  ];

  let customWallpapers = JSON.parse(localStorage.getItem('customWallpapers')) || [];
  const allWallpapers = [...wallpapers, ...customWallpapers];

  let wallpaperHtml = `
    <div class="wallpaper-item none ${!currentWallpaper ? 'active' : ''}" data-wallpaper="">
      <span>No Background</span>
    </div>
  `;

  wallpaperHtml += allWallpapers.map((wallpaper, index) => `
    <div class="wallpaper-item ${currentWallpaper === wallpaper ? 'active' : ''}" 
         style="background-image: url('${wallpaper}')"
         data-wallpaper="${wallpaper}">
      <span class="wallpaper-number">${index + 1}</span>
      ${customWallpapers.includes(wallpaper) ? `
        <button class="remove-wallpaper" data-wallpaper="${wallpaper}">
          <i class="fas fa-times"></i>
        </button>
      ` : ''}
    </div>
  `).join('');

  return wallpaperHtml;
}

function addCustomWallpaper(url) {
  let customWallpapers = JSON.parse(localStorage.getItem('customWallpapers')) || [];
  if (!customWallpapers.includes(url)) {
    customWallpapers.push(url);
    localStorage.setItem('customWallpapers', JSON.stringify(customWallpapers));
    
    // Refresh wallpaper grid
    const modal = document.querySelector('.theme-customizer');
    const wallpaperGrid = modal.querySelector('.wallpaper-grid');
    wallpaperGrid.innerHTML = getWallpaperOptions(
      JSON.parse(localStorage.getItem('themeSettings')).wallpaper
    );
  }
}

function removeCustomWallpaper(url) {
  let customWallpapers = JSON.parse(localStorage.getItem('customWallpapers')) || [];
  customWallpapers = customWallpapers.filter(w => w !== url);
  localStorage.setItem('customWallpapers', JSON.stringify(customWallpapers));
  
  // If the removed wallpaper was active, reset to no background
  const currentSettings = JSON.parse(localStorage.getItem('themeSettings'));
  if (currentSettings.wallpaper === url) {
    currentSettings.wallpaper = null;
    localStorage.setItem('themeSettings', JSON.stringify(currentSettings));
    applyTheme(currentSettings);
  }
  
  // Refresh wallpaper grid
  const modal = document.querySelector('.theme-customizer');
  const wallpaperGrid = modal.querySelector('.wallpaper-grid');
  wallpaperGrid.innerHTML = getWallpaperOptions(currentSettings.wallpaper);
}

export function exportData() {
  const data = {
    bookmarks: localStorage.getItem('bookmarks'),
    links: localStorage.getItem('links'),
    themeSettings: localStorage.getItem('themeSettings'),
    lastThemeSettings: localStorage.getItem('lastThemeSettings')
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `mediahub-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function importData(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        // Validate data structure
        if (!data.links && !data.bookmarks && !data.themeSettings) {
          throw new Error('Invalid backup file format');
        }
        
        // Import data
        if (data.bookmarks) localStorage.setItem('bookmarks', data.bookmarks);
        if (data.links) localStorage.setItem('links', data.links);
        if (data.themeSettings) localStorage.setItem('themeSettings', data.themeSettings);
        if (data.lastThemeSettings) localStorage.setItem('lastThemeSettings', data.lastThemeSettings);
        
        resolve();
      } catch (err) {
        reject(err);
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

/* Let's improve the theme settings experience by persisting the last used values */
window.addEventListener('unload', () => {
  const currentSettings = JSON.parse(localStorage.getItem('themeSettings'));
  if (currentSettings) {
    localStorage.setItem('lastThemeSettings', JSON.stringify(currentSettings));
  }
});

/* Restore last used settings on page load */
window.addEventListener('load', () => {
  const lastSettings = localStorage.getItem('lastThemeSettings');
  if (lastSettings) {
    applyTheme(JSON.parse(lastSettings));
  }
});
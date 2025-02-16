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
    wallpaper: null,
    siteName: 'My Media Hub'
  };

  // Load saved theme settings with defaults
  let savedTheme;
  try {
    savedTheme = JSON.parse(localStorage.getItem('themeSettings')) || defaultSettings;
  } catch (error) {
    console.error('Error loading theme settings:', error);
    savedTheme = defaultSettings;
  }
  
  applyTheme(savedTheme);

  // Initialize theme toggle button
  themeToggle.addEventListener('click', openThemeCustomizer);
}

function applyTheme(settings) {
  try {
    // Apply theme mode
    document.body.classList.remove('light-theme', 'dark-theme', 'dracula-theme', 'nord-theme', 'solarized-theme');
    document.body.classList.add(`${settings.mode}-theme`);
    
    // Apply mode-specific colors from themes.css
    const root = document.documentElement;
    
    if (settings.mode === 'light') {
      root.style.setProperty('--background', '#ffffff');
      root.style.setProperty('--surface', '#f5f5f5');
      root.style.setProperty('--background-overlay', 'rgba(255, 255, 255, 0.85)');
    } else if (settings.mode === 'dark') {
      root.style.setProperty('--background', '#121212');
      root.style.setProperty('--surface', '#1e1e1e');
      root.style.setProperty('--background-overlay', 'rgba(0, 0, 0, 0.7)');
    } else if (settings.mode === 'dracula') {
      root.style.setProperty('--background', '#282a36');
      root.style.setProperty('--surface', '#3a3f4e');
      root.style.setProperty('--background-overlay', 'rgba(40, 42, 54, 0.7)');
    } else if (settings.mode === 'nord') {
      root.style.setProperty('--background', '#2e3440');
      root.style.setProperty('--surface', '#3b4252');
      root.style.setProperty('--background-overlay', 'rgba(46, 52, 64, 0.7)');
    } else if (settings.mode === 'solarized') {
      root.style.setProperty('--background', '#fdf6e3');
      root.style.setProperty('--surface', '#eee8d5');
      root.style.setProperty('--background-overlay', 'rgba(253, 246, 227, 0.85)');
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

    // Apply site name
    if (settings.siteName) {
      document.title = settings.siteName;
      const siteTitle = document.querySelector('.logo h1');
      if (siteTitle) {
        siteTitle.textContent = settings.siteName;
      }
    }

    // Save settings with better error handling and cleanup
    try {
      // Clean up wallpaper data before saving
      const settingsToSave = {...settings};
      
      // Only store the wallpaper URL, not the full data URL if it exists
      if (settingsToSave.wallpaper && settingsToSave.wallpaper.startsWith('data:')) {
        delete settingsToSave.wallpaper;
      }
      
      localStorage.setItem('themeSettings', JSON.stringify(settingsToSave));
    } catch (error) {
      console.error('Error saving theme settings:', error);
      // If we hit quota, try removing lastThemeSettings
      try {
        localStorage.removeItem('lastThemeSettings');
        localStorage.setItem('themeSettings', JSON.stringify(settings));
      } catch (retryError) {
        console.error('Failed to save theme settings even after cleanup:', retryError);
        alert('Unable to save theme settings due to storage limitations. Try clearing some browser data.');
      }
    }
  } catch (error) {
    console.error('Error applying theme:', error);
    alert('An error occurred while applying the theme. Some settings may not have been applied.');
  }
}

function openThemeCustomizer() {
  const currentSettings = JSON.parse(localStorage.getItem('themeSettings')) || {
    mode: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    font: 'Poppins',
    wallpaper: null,
    siteName: 'My Media Hub'
  };
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
            <h3>Site Name</h3>
            <input type="text" name="siteName" value="${currentSettings.siteName || 'My Media Hub'}" placeholder="Enter site name">
            <span class="color-description">This will change the site title and tab name (requires reload)</span>
          </div>

          <div class="theme-section">
            <h3>Theme Mode</h3>
            <div class="theme-mode-toggle">
              <button type="button" class="mode-button ${currentSettings.mode === 'light' ? 'active' : ''}" data-mode="light">
                <i class="fas fa-sun"></i> Light
              </button>
              <button type="button" class="mode-button ${currentSettings.mode === 'dark' ? 'active' : ''}" data-mode="dark">
                <i class="fas fa-moon"></i> Dark
              </button>
              <button type="button" class="mode-button ${currentSettings.mode === 'dracula' ? 'active' : ''}" data-mode="dracula">
                <i class="fas fa-ghost"></i> Dracula
              </button>
              <button type="button" class="mode-button ${currentSettings.mode === 'nord' ? 'active' : ''}" data-mode="nord">
                <i class="fas fa-snowflake"></i> Nord
              </button>
              <button type="button" class="mode-button ${currentSettings.mode === 'solarized' ? 'active' : ''}" data-mode="solarized">
                <i class="fas fa-sun"></i> Solarized
              </button>
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
            <h3>Share Data via QR Code</h3>
            <p>Share your setup with others using QR codes or scan someone else's setup.</p>
            <div class="button-group">
              <button type="button" id="generate-qr" class="primary">
                <i class="fas fa-qrcode"></i> Generate QR Code
              </button>
              <button type="button" id="scan-qr" class="secondary">
                <i class="fas fa-camera"></i> Scan QR Code
              </button>
            </div>
            <div id="qr-result" style="display: none; margin-top: 1rem;"></div>
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
      font: formData.get('font'),
      wallpaper: modal.querySelector('.wallpaper-item.active')?.dataset.wallpaper || null,
      siteName: formData.get('siteName')
    };
    
    applyTheme(newSettings);
    window.location.reload();
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
      font: 'Poppins',
      wallpaper: null,
      siteName: 'My Media Hub'
    };
    applyTheme(defaultSettings);
    window.location.reload();
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

  // Add URL input handler
  const urlButton = modal.querySelector('#add-wallpaper-url');
  const urlInput = modal.querySelector('#wallpaper-url');
  urlButton.addEventListener('click', () => {
    const url = urlInput.value.trim();
    if (url) {
      try {
        new URL(url);
        addCustomWallpaper(url);
        urlInput.value = '';
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

  // Add event listeners for QR code generation and scanning
  modal.querySelector('#generate-qr').addEventListener('click', generateQRCode);
  modal.querySelector('#scan-qr').addEventListener('click', scanQRCode);

  // Add share link button
  addShareLinkButton(modal.querySelector('.data-management'));
}

function getWallpaperOptions(currentWallpaper) {
  // Define wallpapers array with direct URLs
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
  try {
    let customWallpapers = JSON.parse(localStorage.getItem('customWallpapers')) || [];
    if (!customWallpapers.includes(url)) {
      customWallpapers.push(url);
      localStorage.setItem('customWallpapers', JSON.stringify(customWallpapers));
      
      // Update current theme settings with the new wallpaper
      const currentSettings = JSON.parse(localStorage.getItem('themeSettings')) || {};
      currentSettings.wallpaper = url;
      localStorage.setItem('themeSettings', JSON.stringify(currentSettings));
      
      // Apply the new wallpaper immediately
      applyTheme(currentSettings);
      
      // Refresh wallpaper grid
      const modal = document.querySelector('.theme-customizer');
      const wallpaperGrid = modal.querySelector('.wallpaper-grid');
      wallpaperGrid.innerHTML = getWallpaperOptions(url);
    }
  } catch (error) {
    console.error('Error adding custom wallpaper:', error);
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
  
  const date = new Date().toISOString().split('T')[0];
  const a = document.createElement('a');
  a.href = url;
  a.download = `BReitan-media-hub-data-${date}.json`;
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

async function generateQRCode() {
  try {
    // Get only essential data
    const data = {
      bookmarks: JSON.parse(localStorage.getItem('bookmarks') || '[]'),
      links: JSON.parse(localStorage.getItem('links') || '[]'),
      themeSettings: JSON.parse(localStorage.getItem('themeSettings') || '{}'),
      creators: JSON.parse(localStorage.getItem('creators') || '[]')
    };
    
    // Convert to string and compress
    const jsonString = JSON.stringify(data);
    
    // Split data into chunks if needed (QR code has size limitations)
    const maxChunkSize = 1000; // Adjust this value based on testing
    const chunks = [];
    
    for (let i = 0; i < jsonString.length; i += maxChunkSize) {
      chunks.push(jsonString.slice(i, i + maxChunkSize));
    }
    
    // Clear previous QR codes
    const qrResult = document.getElementById('qr-result');
    qrResult.innerHTML = '';
    
    // Generate QR code for each chunk
    for (let i = 0; i < chunks.length; i++) {
      const chunkData = {
        part: i + 1,
        total: chunks.length,
        data: chunks[i]
      };
      
      const compressedChunk = btoa(encodeURIComponent(JSON.stringify(chunkData)));
      
      const qrContainer = document.createElement('div');
      qrContainer.className = 'qr-chunk';
      qrContainer.style.marginBottom = '1rem';
      
      if (chunks.length > 1) {
        const label = document.createElement('div');
        label.textContent = `Part ${i + 1} of ${chunks.length}`;
        label.style.marginBottom = '0.5rem';
        label.style.textAlign = 'center';
        qrContainer.appendChild(label);
      }
      
      new QRCode(qrContainer, {
        text: compressedChunk,
        width: 256,
        height: 256,
        colorDark: getComputedStyle(document.documentElement).getPropertyValue('--on-background'),
        colorLight: getComputedStyle(document.documentElement).getPropertyValue('--background'),
        correctLevel: QRCode.CorrectLevel.L  // Using lower error correction to fit more data
      });
      
      qrResult.appendChild(qrContainer);
    }
    
    qrResult.style.display = 'flex';
    qrResult.style.flexDirection = 'column';
    qrResult.style.alignItems = 'center';
    
  } catch (error) {
    console.error('Error generating QR code:', error);
    alert('Error generating QR code: ' + error.message);
  }
}

async function scanQRCode() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
    
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
      <div class="modal-content">
        <h2>Scan QR Code</h2>
        <p style="margin-bottom: 1rem;">If there are multiple QR codes, scan them in order.</p>
        <video id="qr-video" style="width: 100%; max-width: 400px;"></video>
        <div id="scan-status" style="margin-top: 1rem;"></div>
        <div class="button-group">
          <button type="button" class="cancel">Cancel</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    const video = document.getElementById('qr-video');
    const statusDiv = document.getElementById('scan-status');
    video.srcObject = stream;
    video.play();
    
    let chunks = [];
    let totalChunks = 0;
    
    const codeReader = new ZXing.BrowserQRCodeReader();
    codeReader.decodeFromVideoDevice(null, 'qr-video', async (result, err) => {
      if (result) {
        try {
          const decoded = JSON.parse(decodeURIComponent(atob(result.text)));
          
          if (decoded.part && decoded.total) {
            totalChunks = decoded.total;
            chunks[decoded.part - 1] = decoded.data;
            
            statusDiv.textContent = `Scanned part ${decoded.part} of ${decoded.total}`;
            
            // Check if we have all chunks
            if (chunks.filter(Boolean).length === totalChunks) {
              const completeData = JSON.parse(chunks.join(''));
              
              // Import the data
              Object.entries(completeData).forEach(([key, value]) => {
                if (value) localStorage.setItem(key, JSON.stringify(value));
              });
              
              // Clean up and reload
              stream.getTracks().forEach(track => track.stop());
              modal.remove();
              alert('Data imported successfully! The page will now reload.');
              window.location.reload();
            }
          }
        } catch (error) {
          console.error('Error processing QR code data:', error);
          statusDiv.textContent = 'Error processing QR code. Please try again.';
        }
      }
    });
    
    modal.querySelector('.cancel').addEventListener('click', () => {
      stream.getTracks().forEach(track => track.stop());
      modal.remove();
    });
  } catch (error) {
    console.error('Error accessing camera:', error);
    alert('Error accessing camera. Please make sure you have granted camera permissions.');
  }
}

function addShareLinkButton(dataManagementDiv) {
  const shareSection = document.createElement('div');
  shareSection.className = 'data-section';
  shareSection.innerHTML = `
    <h3>Share via Link</h3>
    <p>Generate a shareable link containing your settings, or input received settings</p>
    <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
      <button type="button" id="generate-link" class="primary">
        <i class="fas fa-link"></i> Generate Shareable Link
      </button>
      <button type="button" id="input-share-data" class="secondary">
        <i class="fas fa-paste"></i> Input Share Data
      </button>
    </div>
  `;
  
  dataManagementDiv.appendChild(shareSection);
  
  // Add click handlers
  shareSection.querySelector('#generate-link').addEventListener('click', generateShareableLink);
  shareSection.querySelector('#input-share-data').addEventListener('click', showShareDataInput);
}

function showShareDataInput() {
  const modal = document.createElement('div');
  modal.className = 'modal active';
  modal.innerHTML = `
    <div class="modal-content">
      <h2>Input Share Data</h2>
      <p style="margin-bottom: 1rem;">Paste the shared settings data here:</p>
      <textarea 
        style="width: 100%; min-height: 150px; padding: 0.5rem; border-radius: var(--border-radius); margin-bottom: 1rem;"
        placeholder="Paste the shared data here..."
      ></textarea>
      <div class="button-group">
        <button type="button" class="cancel">Cancel</button>
        <button type="button" class="import">Import Settings</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Handle import button
  modal.querySelector('.import').addEventListener('click', () => {
    const input = modal.querySelector('textarea').value.trim();
    
    try {
      let data;
      
      // Try to parse as URL first
      try {
        const url = new URL(input);
        const shareParam = url.searchParams.get('share');
        if (shareParam) {
          data = JSON.parse(decodeURIComponent(atob(shareParam)));
        } else {
          throw new Error('No share data found in URL');
        }
      } catch (urlError) {
        // If not a URL, try to parse as direct base64
        try {
          data = JSON.parse(decodeURIComponent(atob(input)));
        } catch (base64Error) {
          // If not base64, try to parse as direct JSON
          data = JSON.parse(input);
        }
      }
      
      // Validate data structure
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid data format');
      }
      
      // Show confirmation
      if (confirm('Are you sure you want to import these settings? This will override your current settings.')) {
        // Import the data
        Object.entries(data).forEach(([key, value]) => {
          if (value) localStorage.setItem(key, JSON.stringify(value));
        });
        
        // Reload page
        alert('Settings imported successfully! The page will now reload.');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error importing settings:', error);
      alert('Error importing settings: ' + error.message);
    }
    
    modal.remove();
  });
  
  // Handle cancel button
  modal.querySelector('.cancel').addEventListener('click', () => {
    modal.remove();
  });
}

function generateShareableLink() {
  try {
    // Get only essential data
    const data = {
      bookmarks: JSON.parse(localStorage.getItem('bookmarks') || '[]'),
      links: JSON.parse(localStorage.getItem('links') || '[]'),
      themeSettings: JSON.parse(localStorage.getItem('themeSettings') || '{}'),
      creators: JSON.parse(localStorage.getItem('creators') || '[]')
    };
    
    // Convert to base64
    const encodedData = btoa(encodeURIComponent(JSON.stringify(data)));
    
    // Create URL with data
    const url = new URL(window.location.href);
    url.searchParams.set('share', encodedData);
    
    // Show modal with copyable link
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
      <div class="modal-content">
        <h2>Share Settings</h2>
        <p style="margin-bottom: 1rem;">Copy this link to share your settings:</p>
        <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
          <input type="text" value="${url.href}" readonly style="flex: 1; padding: 0.5rem; border-radius: var(--border-radius);">
          <button class="copy-button" style="padding: 0.5rem 1rem; background: var(--primary-color); color: white; border: none; border-radius: var(--border-radius); cursor: pointer;">Copy</button>
        </div>
        <div class="button-group">
          <button type="button" class="cancel">Close</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Handle copy button
    const input = modal.querySelector('input');
    const copyButton = modal.querySelector('.copy-button');
    copyButton.addEventListener('click', () => {
      input.select();
      document.execCommand('copy');
      copyButton.textContent = 'Copied!';
      setTimeout(() => {
        copyButton.textContent = 'Copy';
      }, 2000);
    });
    
    // Handle close button
    modal.querySelector('.cancel').addEventListener('click', () => {
      modal.remove();
    });
    
  } catch (error) {
    console.error('Error generating shareable link:', error);
    alert('Error generating shareable link: ' + error.message);
  }
}

// Function to handle importing from URL parameters
function handleSharedSettings() {
  const urlParams = new URLSearchParams(window.location.search);
  const sharedData = urlParams.get('share');
  
  if (sharedData) {
    try {
      const data = JSON.parse(decodeURIComponent(atob(sharedData)));
      
      // Show confirmation modal
      const modal = document.createElement('div');
      modal.className = 'modal active';
      modal.innerHTML = `
        <div class="modal-content">
          <h2>Import Shared Settings</h2>
          <p style="margin-bottom: 1rem;">Would you like to import the shared settings? This will override your current settings.</p>
          <div class="button-group">
            <button type="button" class="cancel">Cancel</button>
            <button type="button" class="import">Import Settings</button>
          </div>
        </div>
      `;
      
      document.body.appendChild(modal);
      
      // Handle import button
      modal.querySelector('.import').addEventListener('click', () => {
        // Import the data
        Object.entries(data).forEach(([key, value]) => {
          if (value) localStorage.setItem(key, JSON.stringify(value));
        });
        
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
        
        // Reload page
        window.location.reload();
      });
      
      // Handle cancel button
      modal.querySelector('.cancel').addEventListener('click', () => {
        window.history.replaceState({}, document.title, window.location.pathname);
        modal.remove();
      });
      
    } catch (error) {
      console.error('Error importing shared settings:', error);
      alert('Error importing shared settings: ' + error.message);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }
}

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
  handleSharedSettings();
});
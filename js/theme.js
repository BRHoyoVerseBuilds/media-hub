const themeWallpapers = {
  light: 'https://raw.githubusercontent.com/BRHoyoVerseBuilds/media-hub/refs/heads/main/wallpapers/amara%20light.webp',
  dark: 'https://raw.githubusercontent.com/BRHoyoVerseBuilds/media-hub/refs/heads/main/wallpapers/amara%20dark.webp',
  dracula: 'https://raw.githubusercontent.com/BRHoyoVerseBuilds/media-hub/refs/heads/main/wallpapers/amara%20dracula.webp',
  nord: 'https://raw.githubusercontent.com/BRHoyoVerseBuilds/media-hub/refs/heads/main/wallpapers/amara%20njord.webp',
  solarized: 'https://raw.githubusercontent.com/BRHoyoVerseBuilds/media-hub/refs/heads/main/wallpapers/amara%20solarized.webp',
  cyberpunk: 'https://raw.githubusercontent.com/BRHoyoVerseBuilds/media-hub/refs/heads/main/wallpapers/amara%20cyberpunk.webp',
  retro: 'https://raw.githubusercontent.com/BRHoyoVerseBuilds/media-hub/refs/heads/main/wallpapers/amara%20retro.webp',
  forest: 'https://raw.githubusercontent.com/BRHoyoVerseBuilds/media-hub/refs/heads/main/wallpapers/amara%20forest.webp',
  ocean: 'https://raw.githubusercontent.com/BRHoyoVerseBuilds/media-hub/refs/heads/main/wallpapers/amara%20ocean.webp',
  sunset: 'https://raw.githubusercontent.com/BRHoyoVerseBuilds/media-hub/refs/heads/main/wallpapers/amara%20sunset.webp',
  coffee: 'https://raw.githubusercontent.com/BRHoyoVerseBuilds/media-hub/refs/heads/main/wallpapers/amara%20coffee.webp',
  mint: 'https://raw.githubusercontent.com/BRHoyoVerseBuilds/media-hub/refs/heads/main/wallpapers/amara%20mint.webp',
  cherry: 'https://raw.githubusercontent.com/BRHoyoVerseBuilds/media-hub/refs/heads/main/wallpapers/amara%20cherry.webp'
};

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
    customWallpaper: null,
    siteName: 'My Media Hub',
    shader: 'none',
    shaderIntensity: 0.5
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
    document.body.classList.remove('light-theme', 'dark-theme', 'dracula-theme', 'nord-theme', 'solarized-theme', 'cyberpunk-theme', 'retro-theme', 'forest-theme', 'ocean-theme', 'sunset-theme', 'coffee-theme', 'mint-theme', 'cherry-theme');
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
    } else if (settings.mode === 'cyberpunk') {
      root.style.setProperty('--background', '#171717');
      root.style.setProperty('--surface', '#2c2c2c');
      root.style.setProperty('--background-overlay', 'rgba(0, 0, 0, 0.7)');
    } else if (settings.mode === 'retro') {
      root.style.setProperty('--background', '#800080');
      root.style.setProperty('--surface', '#c0c0c0');
      root.style.setProperty('--background-overlay', 'rgba(128, 0, 128, 0.7)');
    } else if (settings.mode === 'forest') {
      root.style.setProperty('--background', '#228b22');
      root.style.setProperty('--surface', '#3cb371');
      root.style.setProperty('--background-overlay', 'rgba(34, 139, 34, 0.7)');
    } else if (settings.mode === 'ocean') {
      root.style.setProperty('--background', '#0000ff');
      root.style.setProperty('--surface', '#6495ed');
      root.style.setProperty('--background-overlay', 'rgba(0, 0, 255, 0.7)');
    } else if (settings.mode === 'sunset') {
      root.style.setProperty('--background', '#ffa07a');
      root.style.setProperty('--surface', '#ffc107');
      root.style.setProperty('--background-overlay', 'rgba(255, 160, 122, 0.7)');
    } else if (settings.mode === 'coffee') {
      root.style.setProperty('--background', '#964b00');
      root.style.setProperty('--surface', '#a52a2a');
      root.style.setProperty('--background-overlay', 'rgba(150, 75, 0, 0.7)');
    } else if (settings.mode === 'mint') {
      root.style.setProperty('--background', '#acffac');
      root.style.setProperty('--surface', '#c6f4d6');
      root.style.setProperty('--background-overlay', 'rgba(172, 255, 172, 0.7)');
    } else if (settings.mode === 'cherry') {
      root.style.setProperty('--background', '#ff69b4');
      root.style.setProperty('--surface', '#ff99cc');
      root.style.setProperty('--background-overlay', 'rgba(255, 105, 180, 0.7)');
    }
    
    // Apply font
    if (settings.font) {
      root.style.setProperty('--font-family', `'${settings.font}', sans-serif`);
    }

    // Apply wallpaper - use custom wallpaper if set, otherwise use theme wallpaper
    if (settings.customWallpaper) {
      document.body.style.backgroundImage = `url(${settings.customWallpaper})`;
    } else if (themeWallpapers[settings.mode]) {
      document.body.style.backgroundImage = `url(${themeWallpapers[settings.mode]})`;
    } else {
      document.body.style.backgroundImage = 'none';
    }
  
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';

    // Apply site name
    if (settings.siteName) {
      document.title = settings.siteName;
      const siteTitle = document.querySelector('.logo h1');
      if (siteTitle) {
        siteTitle.textContent = settings.siteName;
      }
    }

    // Apply shader if one is selected
    const shader = settings.shader || 'none';
    applyShader(shader, settings.shaderIntensity || 0.5);

    // Save settings with better error handling and cleanup
    try {
      // Clean up wallpaper data before saving
      const settingsToSave = {...settings};
      
      // Only store the wallpaper URL, not the full data URL if it exists
      if (settingsToSave.customWallpaper && settingsToSave.customWallpaper.startsWith('data:')) {
        delete settingsToSave.customWallpaper;
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

function applyShader(shaderType, intensity) {
  const root = document.documentElement;
  
  // Remove any existing shader classes
  document.body.classList.remove(
    'shader-blur', 
    'shader-grain', 
    'shader-crt', 
    'shader-glitch', 
    'shader-vignette',
    'shader-duotone',
    'shader-scanlines',
    'shader-pixelate',
    'shader-rainbow',
    'shader-noise',
    'shader-matrix',
    'shader-ripple',
    'shader-kaleidoscope',
    'shader-neon',
    'shader-retrowave',
    'shader-cyberpunk',
    'shader-hologram',
    'shader-glitchtext',
    'shader-starfield'
  );
  
  if (shaderType === 'none') {
    root.style.setProperty('--shader-intensity', '0');
    return;
  }

  // Add the new shader class
  document.body.classList.add(`shader-${shaderType}`);
  root.style.setProperty('--shader-intensity', intensity);
}

function openThemeCustomizer() {
  const currentSettings = JSON.parse(localStorage.getItem('themeSettings')) || {
    mode: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    font: 'Poppins',
    customWallpaper: null,
    siteName: 'My Media Hub',
    shader: 'none',
    shaderIntensity: 0.5
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
            <h3>Theme</h3>
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
              <button type="button" class="mode-button ${currentSettings.mode === 'cyberpunk' ? 'active' : ''}" data-mode="cyberpunk">
                <i class="fas fa-robot"></i> Cyberpunk
              </button>
              <button type="button" class="mode-button ${currentSettings.mode === 'retro' ? 'active' : ''}" data-mode="retro">
                <i class="fas fa-gamepad"></i> Retro
              </button>
              <button type="button" class="mode-button ${currentSettings.mode === 'forest' ? 'active' : ''}" data-mode="forest">
                <i class="fas fa-tree"></i> Forest
              </button>
              <button type="button" class="mode-button ${currentSettings.mode === 'ocean' ? 'active' : ''}" data-mode="ocean">
                <i class="fas fa-water"></i> Ocean
              </button>
              <button type="button" class="mode-button ${currentSettings.mode === 'sunset' ? 'active' : ''}" data-mode="sunset">
                <i class="fas fa-sun"></i> Sunset
              </button>
              <button type="button" class="mode-button ${currentSettings.mode === 'coffee' ? 'active' : ''}" data-mode="coffee">
                <i class="fas fa-coffee"></i> Coffee
              </button>
              <button type="button" class="mode-button ${currentSettings.mode === 'mint' ? 'active' : ''}" data-mode="mint">
                <i class="fas fa-leaf"></i> Mint
              </button>
              <button type="button" class="mode-button ${currentSettings.mode === 'cherry' ? 'active' : ''}" data-mode="cherry">
                <i class="fas fa-heart"></i> Cherry
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
              <option value="Lato" ${currentSettings.font === 'Lato' ? 'selected' : ''}>Lato</option>
              <option value="Raleway" ${currentSettings.font === 'Raleway' ? 'selected' : ''}>Raleway</option>
              <option value="Ubuntu" ${currentSettings.font === 'Ubuntu' ? 'selected' : ''}>Ubuntu</option>
              <option value="Playfair Display" ${currentSettings.font === 'Playfair Display' ? 'selected' : ''}>Playfair Display</option>
              <option value="Source Sans Pro" ${currentSettings.font === 'Source Sans Pro' ? 'selected' : ''}>Source Sans Pro</option>
              <option value="Merriweather" ${currentSettings.font === 'Merriweather' ? 'selected' : ''}>Merriweather</option>
              <option value="Nunito" ${currentSettings.font === 'Nunito' ? 'selected' : ''}>Nunito</option>
              <option value="Quicksand" ${currentSettings.font === 'Quicksand' ? 'selected' : ''}>Quicksand</option>
              <option value="Cabin" ${currentSettings.font === 'Cabin' ? 'selected' : ''}>Cabin</option>
              <option value="Josefin Sans" ${currentSettings.font === 'Josefin Sans' ? 'selected' : ''}>Josefin Sans</option>
              <option value="Fira Sans" ${currentSettings.font === 'Fira Sans' ? 'selected' : ''}>Fira Sans</option>
              <option value="Crimson Text" ${currentSettings.font === 'Crimson Text' ? 'selected' : ''}>Crimson Text</option>
              <option value="Work Sans" ${currentSettings.font === 'Work Sans' ? 'selected' : ''}>Work Sans</option>
              <option value="Space Grotesk" ${currentSettings.font === 'Space Grotesk' ? 'selected' : ''}>Space Grotesk</option>
              <option value="DM Sans" ${currentSettings.font === 'DM Sans' ? 'selected' : ''}>DM Sans</option>
              <option value="Inter" ${currentSettings.font === 'Inter' ? 'selected' : ''}>Inter</option>
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
                ${getWallpaperOptions(currentSettings.customWallpaper)}
              </div>
            </div>
          </div>

          <div class="theme-section">
            <h3>Visual Effects</h3>
            <div class="shader-controls">
              <select name="shader" class="shader-selector">
                <option value="none">None</option>
                <option value="blur">Blur</option>
                <option value="grain">Film Grain</option>
                <option value="crt">CRT Effect</option>
                <option value="glitch">Glitch</option>
                <option value="vignette">Vignette</option>
                <option value="duotone">Duotone</option>
                <option value="scanlines">Scanlines</option>
                <option value="pixelate">Pixelate</option>
                <option value="rainbow">Rainbow Wave</option>
                <option value="noise">Dynamic Noise</option>
                <option value="matrix">Matrix Rain</option>
                <option value="ripple">Ripple Effect</option>
                <option value="kaleidoscope">Kaleidoscope</option>
                <option value="neon">Neon Glow</option>
                <option value="retrowave">Retrowave Grid</option>
                <option value="cyberpunk">Cyberpunk</option>
                <option value="hologram">Hologram</option>
                <option value="glitchtext">Glitch Text</option>
                <option value="starfield">Starfield</option>
              </select>
              <div class="shader-intensity">
                <label for="shader-intensity">Effect Intensity</label>
                <div style="position: relative;">
                  <input 
                    type="range" 
                    id="shader-intensity"
                    name="shaderIntensity" 
                    min="0" 
                    max="1" 
                    step="0.1" 
                    value="${currentSettings.shaderIntensity || 0.5}"
                  >
                  <div class="range-tooltip"></div>
                </div>
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
      const previewSettings = {...currentSettings, customWallpaper: item.dataset.wallpaper};
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

  // Handle shader selection
  const shaderSelector = modal.querySelector('.shader-selector');
  const intensitySlider = modal.querySelector('input[name="shaderIntensity"]');
  shaderSelector.addEventListener('change', () => {
    const shader = shaderSelector.value;
    const intensity = parseFloat(intensitySlider.value);
    applyShader(shader, intensity);
    const previewSettings = {...currentSettings, shader: shader, shaderIntensity: intensity};
    applyTheme(previewSettings);
  });
  intensitySlider.addEventListener('input', () => {
    const shader = shaderSelector.value;
    const intensity = parseFloat(intensitySlider.value);
    applyShader(shader, intensity);
    const previewSettings = {...currentSettings, shader: shader, shaderIntensity: intensity};
    applyTheme(previewSettings);
  });

  // Handle form submission
  modal.querySelector('#theme-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newSettings = {
      mode: modal.querySelector('.mode-button.active').dataset.mode,
      font: formData.get('font'),
      customWallpaper: modal.querySelector('.wallpaper-item.active')?.dataset.wallpaper || null,
      siteName: formData.get('siteName'),
      shader: formData.get('shader'),
      shaderIntensity: parseFloat(formData.get('shaderIntensity'))
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
      customWallpaper: null,
      siteName: 'My Media Hub',
      shader: 'none',
      shaderIntensity: 0.5
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

  addShareLinkButton(modal.querySelector('.data-management'));
}

function getWallpaperOptions(currentWallpaper) {
  let wallpaperHtml = `
    <div class="wallpaper-item none ${!currentWallpaper ? 'active' : ''}" data-wallpaper="">
      <span>Theme Default</span>
    </div>
  `;

  // Add all theme wallpapers
  Object.entries(themeWallpapers).forEach(([theme, url]) => {
    wallpaperHtml += `
      <div class="wallpaper-item ${url === currentWallpaper ? 'active' : ''}" 
           style="background-image: url('${url}')"
           data-wallpaper="${url}">
        <div class="wallpaper-label">${theme.charAt(0).toUpperCase() + theme.slice(1)} Theme</div>
      </div>
    `;
  });

  // Add custom wallpapers
  const customWallpapers = JSON.parse(localStorage.getItem('customWallpapers')) || [];
  customWallpapers.forEach(wallpaper => {
    wallpaperHtml += `
      <div class="wallpaper-item ${wallpaper.url === currentWallpaper ? 'active' : ''}" 
           style="background-image: url('${wallpaper.url}')"
           data-wallpaper="${wallpaper.url}">
        <div class="wallpaper-label">${wallpaper.name}</div>
        <button class="remove-wallpaper" data-wallpaper="${wallpaper.url}">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;
  });

  return wallpaperHtml;
}

function addCustomWallpaper(url) {
  const modal = document.createElement('div');
  modal.className = 'modal active';
  modal.innerHTML = `
    <div class="modal-content">
      <h2>Name Your Wallpaper</h2>
      <div class="settings-section">
        <label for="wallpaper-name">Wallpaper Name</label>
        <input type="text" id="wallpaper-name" placeholder="Enter a name for this wallpaper" required>
        <div class="wallpaper-preview" style="margin-top: 1rem; width: 100%; height: 200px; background-image: url('${url}'); background-size: cover; background-position: center; border-radius: var(--border-radius);"></div>
      </div>
      <div class="button-group">
        <button type="button" class="cancel">Cancel</button>
        <button type="button" class="save">Save Wallpaper</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const nameInput = modal.querySelector('#wallpaper-name');
  const saveButton = modal.querySelector('.save');
  const cancelButton = modal.querySelector('.cancel');

  saveButton.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (!name) {
      alert('Please enter a name for your wallpaper');
      return;
    }

    try {
      let currentSettings = JSON.parse(localStorage.getItem('themeSettings')) || {};
      let customWallpapers = JSON.parse(localStorage.getItem('customWallpapers')) || [];
      
      // Add new wallpaper to custom wallpapers
      customWallpapers.push({
        name: name,
        url: url
      });
      
      // Save custom wallpapers
      localStorage.setItem('customWallpapers', JSON.stringify(customWallpapers));
      
      // Set as current wallpaper
      currentSettings.customWallpaper = url;
      localStorage.setItem('themeSettings', JSON.stringify(currentSettings));
      
      // Apply theme
      applyTheme(currentSettings);
      
      // Refresh wallpaper grid
      const themeModal = document.querySelector('.theme-customizer');
      if (themeModal) {
        const wallpaperGrid = themeModal.querySelector('.wallpaper-grid');
        wallpaperGrid.innerHTML = getWallpaperOptions(url);
      }
      
      modal.remove();
    } catch (error) {
      console.error('Error adding custom wallpaper:', error);
      alert('Error saving wallpaper: ' + error.message);
    }
  });

  cancelButton.addEventListener('click', () => {
    modal.remove();
  });
}

function removeCustomWallpaper(wallpaperUrl) {
  try {
    let customWallpapers = JSON.parse(localStorage.getItem('customWallpapers')) || [];
    customWallpapers = customWallpapers.filter(w => w.url !== wallpaperUrl);
    localStorage.setItem('customWallpapers', JSON.stringify(customWallpapers));

    let currentSettings = JSON.parse(localStorage.getItem('themeSettings')) || {};
    if (currentSettings.customWallpaper === wallpaperUrl) {
      delete currentSettings.customWallpaper;
      localStorage.setItem('themeSettings', JSON.stringify(currentSettings));
      applyTheme(currentSettings);
    }

    // Refresh wallpaper grid
    const modal = document.querySelector('.theme-customizer');
    if (modal) {
      const wallpaperGrid = modal.querySelector('.wallpaper-grid');
      wallpaperGrid.innerHTML = getWallpaperOptions(currentSettings.customWallpaper);
    }
  } catch (error) {
    console.error('Error removing custom wallpaper:', error);
    alert('Error removing wallpaper: ' + error.message);
  }
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

function addShareLinkButton(dataManagementDiv) {
  const shareSection = document.createElement('div');
  shareSection.className = 'data-section';
  shareSection.innerHTML = `
    <h3>Share via Link</h3>
    <p>Generate a shareable code containing your settings, or input received settings</p>
    <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
      <button type="button" id="generate-link" class="primary">
        <i class="fas fa-link"></i> Generate Shareable Code
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
      <p style="margin-bottom: 1rem;">Paste the shared settings code here:</p>
      <textarea 
        style="width: 100%; min-height: 150px; padding: 0.5rem; border-radius: var(--border-radius); margin-bottom: 1rem; font-family: monospace;"
        placeholder="Paste the shared code here..."
      ></textarea>
      <p style="font-size: 0.9em; color: var(--on-surface); opacity: 0.7;">Paste the code you received from someone sharing their settings.</p>
      <div class="button-group">
        <button type="button" class="cancel">Cancel</button>
        <button type="button" class="preview">Preview Changes</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Handle preview button
  modal.querySelector('.preview').addEventListener('click', async () => {
    const input = modal.querySelector('textarea').value.trim();
    
    try {
      // Try to parse the input as base64
      const importedData = JSON.parse(decodeURIComponent(atob(input)));
      
      // Validate data structure
      if (!importedData || typeof importedData !== 'object') {
        throw new Error('Invalid code format');
      }

      // Get current data
      const currentData = {
        bookmarks: JSON.parse(localStorage.getItem('bookmarks') || '[]'),
        links: JSON.parse(localStorage.getItem('links') || '[]'),
        themeSettings: JSON.parse(localStorage.getItem('themeSettings') || '{}'),
        creators: JSON.parse(localStorage.getItem('creators') || '[]')
      };

      // Create change summary
      let changes = [];
      
      // Compare bookmarks
      if (importedData.bookmarks?.length !== currentData.bookmarks.length) {
        changes.push(`Bookmarks will change from ${currentData.bookmarks.length} to ${importedData.bookmarks?.length || 0} items`);
      }
      
      // Compare quick access links
      if (importedData.links?.length !== currentData.links.length) {
        changes.push(`Quick Access Links will change from ${currentData.links.length} to ${importedData.links?.length || 0} items`);
      }

      // Compare creators
      if (importedData.creators?.length !== currentData.creators.length) {
        changes.push(`Favorite Creators will change from ${currentData.creators.length} to ${importedData.creators?.length || 0} items`);
      }

      // Compare theme settings
      const themeChanges = [];
      if (importedData.themeSettings?.mode !== currentData.themeSettings.mode) {
        themeChanges.push(`Theme Mode: ${currentData.themeSettings.mode || 'default'} → ${importedData.themeSettings?.mode || 'default'}`);
      }
      if (importedData.themeSettings?.font !== currentData.themeSettings.font) {
        themeChanges.push(`Font: ${currentData.themeSettings.font || 'default'} → ${importedData.themeSettings?.font || 'default'}`);
      }
      if (importedData.themeSettings?.siteName !== currentData.themeSettings.siteName) {
        themeChanges.push(`Site Name: ${currentData.themeSettings.siteName || 'My Media Hub'} → ${importedData.themeSettings?.siteName || 'My Media Hub'}`);
      }
      if (themeChanges.length > 0) {
        changes.push('Theme Settings Changes:', ...themeChanges.map(change => `  - ${change}`));
      }

      // Show confirmation modal with changes
      const confirmModal = document.createElement('div');
      confirmModal.className = 'modal active';
      confirmModal.innerHTML = `
        <div class="modal-content">
          <h2>Review Changes</h2>
          <div style="margin: 1rem 0;">
            <h3 style="margin-bottom: 0.5rem;">The following changes will be made:</h3>
            ${changes.length > 0 ? 
              `<ul style="list-style: none; margin-left: 0;">
                ${changes.map(change => `<li style="margin-bottom: 0.5rem; padding-left: ${change.startsWith('  -') ? '1rem' : '0'};">${change}</li>`).join('')}
              </ul>` : 
              '<p>No changes detected</p>'
            }
          </div>
          <p style="margin-bottom: 1rem; color: var(--on-surface); opacity: 0.8;">
            ⚠️ Warning: This will overwrite your current settings with the imported ones.
            Please make sure to backup your current settings if needed.
          </p>
          <div class="button-group">
            <button type="button" class="cancel">Cancel</button>
            <button type="button" class="backup">Backup Current</button>
            <button type="button" class="import">Import Changes</button>
          </div>
        </div>
      `;

      document.body.appendChild(confirmModal);

      // Handle backup button
      confirmModal.querySelector('.backup').addEventListener('click', () => {
        exportData();
      });

      // Handle import button
      confirmModal.querySelector('.import').addEventListener('click', () => {
        // Import the data
        Object.entries(importedData).forEach(([key, value]) => {
          if (value) localStorage.setItem(key, JSON.stringify(value));
        });
        
        // Reload page
        alert('Settings imported successfully! The page will now reload.');
        window.location.reload();
      });

      // Handle cancel button
      confirmModal.querySelector('.cancel').addEventListener('click', () => {
        confirmModal.remove();
      });

      // Remove the original modal
      modal.remove();

    } catch (error) {
      console.error('Error importing settings:', error);
      alert('Error importing settings: Invalid code format. Please make sure you\'ve copied the entire code.');
    }
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
    
    // Show modal with copyable code
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
      <div class="modal-content">
        <h2>Share Settings</h2>
        <p style="margin-bottom: 1rem;">Copy this code to share your settings:</p>
        <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
          <input type="text" value="${encodedData}" readonly style="flex: 1; padding: 0.5rem; border-radius: var(--border-radius); margin-bottom: 1rem; font-family: monospace;">
          <button class="copy-button" style="padding: 0.5rem 1rem; background: var(--primary-color); color: white; border: none; border-radius: var(--border-radius); cursor: pointer;">Copy</button>
        </div>
        <p style="font-size: 0.9em; color: var(--on-surface); opacity: 0.7;">Share this code with others so they can import your settings using the "Input Share Data" button.</p>
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
    console.error('Error generating share code:', error);
    alert('Error generating share code: ' + error.message);
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
});
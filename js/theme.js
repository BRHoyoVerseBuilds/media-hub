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
  
  // Apply custom colors
  if (settings.primaryColor) {
    document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
  }
  if (settings.secondaryColor) {
    document.documentElement.style.setProperty('--secondary-color', settings.secondaryColor);
  }
  if (settings.textColor) {
    document.documentElement.style.setProperty('--on-background', settings.textColor);
    document.documentElement.style.setProperty('--on-surface', settings.textColor);
  }

  // Apply font
  if (settings.font) {
    document.documentElement.style.setProperty('--font-family', `'${settings.font}', sans-serif`);
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
      <h2>Theme Customization</h2>
      <form id="theme-form">
        <div class="theme-section">
          <h3>Theme Mode</h3>
          <div class="theme-mode-toggle">
            <button type="button" class="mode-button ${currentSettings.mode === 'light' ? 'active' : ''}" data-mode="light">
              Light Mode
            </button>
            <button type="button" class="mode-button ${currentSettings.mode === 'dark' ? 'active' : ''}" data-mode="dark">
              Dark Mode
            </button>
          </div>
        </div>

        <div class="theme-section">
          <h3>Colors</h3>
          <div class="color-picker-group">
            <div class="color-picker-item">
              <label>Primary Color (Buttons & Accents)</label>
              <input type="color" name="primaryColor" value="${currentSettings.primaryColor || '#6200ee'}">
            </div>
            <div class="color-picker-item">
              <label>Secondary Color (Highlights)</label>
              <input type="color" name="secondaryColor" value="${currentSettings.secondaryColor || '#03dac6'}">
            </div>
            <div class="color-picker-item">
              <label>Text Color</label>
              <input type="color" name="textColor" value="${currentSettings.textColor || '#000000'}">
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
          <div class="wallpaper-grid">
            <div class="wallpaper-item none ${!currentSettings.wallpaper ? 'active' : ''}" data-wallpaper="">
              <span>No Background</span>
            </div>
            ${getWallpaperOptions(currentSettings.wallpaper)}
          </div>
        </div>

        <div class="button-group">
          <button type="button" class="cancel">Cancel</button>
          <button type="button" class="reset">Reset to Default</button>
          <button type="submit">Save Changes</button>
        </div>
      </form>
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
}

function getWallpaperOptions(currentWallpaper) {
  const wallpapers = [
    'https://github.com/BRHoyoVerseBuilds/media-hub/blob/main/wallpapers/Wallpaper%201.png?raw=true',
    'https://github.com/BRHoyoVerseBuilds/media-hub/blob/main/wallpapers/Wallpaper%202.png?raw=true',
    'https://github.com/BRHoyoVerseBuilds/media-hub/blob/main/wallpapers/Wallpaper%203.png?raw=true',
    'https://github.com/BRHoyoVerseBuilds/media-hub/blob/main/wallpapers/Wallpaper%204.png?raw=true',
    'https://github.com/BRHoyoVerseBuilds/media-hub/blob/main/wallpapers/Wallpaper%205.png?raw=true',
    'https://github.com/BRHoyoVerseBuilds/media-hub/blob/main/wallpapers/Wallpaper%206.png?raw=true',
    'https://github.com/BRHoyoVerseBuilds/media-hub/blob/main/wallpapers/Wallpaper%207.png?raw=true',
    'https://github.com/BRHoyoVerseBuilds/media-hub/blob/main/wallpapers/Wallpaper%208.png?raw=true',
    'https://github.com/BRHoyoVerseBuilds/media-hub/blob/main/wallpapers/Wallpaper%209.png?raw=true',
    'https://github.com/BRHoyoVerseBuilds/media-hub/blob/main/wallpapers/Wallpaper%2010.png?raw=true',
    'https://github.com/BRHoyoVerseBuilds/media-hub/blob/main/wallpapers/Wallpaper%2011.png?raw=true',
    'https://github.com/BRHoyoVerseBuilds/media-hub/blob/main/wallpapers/Wallpaper%2012.png?raw=true',
    'https://github.com/BRHoyoVerseBuilds/media-hub/blob/main/wallpapers/Wallpaper%2013.png?raw=true',
    'https://github.com/BRHoyoVerseBuilds/media-hub/blob/main/wallpapers/Wallpaper%2014.png?raw=true',
    'https://github.com/BRHoyoVerseBuilds/media-hub/blob/main/wallpapers/Wallpaper%2015.png?raw=true'
  ];

  return wallpapers.map((wallpaper, index) => `
    <div class="wallpaper-item ${currentWallpaper === wallpaper ? 'active' : ''}" 
         style="background-image: url('${wallpaper}')"
         data-wallpaper="${wallpaper}">
      <span class="wallpaper-number">${index + 1}</span>
    </div>
  `).join('');
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
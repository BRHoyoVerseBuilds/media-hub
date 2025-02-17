export function initializeInfo() {
  const infoButton = document.getElementById('info-toggle');
  
  infoButton.addEventListener('click', () => {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
      <div class="modal-content">
        <h2>About My Media Hub</h2>
        
        <div class="settings-tabs">
          <button class="tab-button active" data-tab="info">Information</button>
          <button class="tab-button" data-tab="version">Version History</button>
        </div>

        <div class="tab-content" id="info-tab">
          <div class="info-section">
            <h3>Quick Access Links</h3>
            <p>Add and organize your frequently visited websites. Drag and drop to reorder links.</p>
            <ul>
              <li>Click the + button in the lower right to add new links</li>
              <li>Drag and drop links to reorder them</li>
              <li>Click the gear icon on each link to edit or remove it</li>
            </ul>
          </div>

          <div class="info-section">
            <h3>Continue Watching</h3>
            <p>Keep track of videos and shows you're watching.</p>
            <ul>
              <li>Click the + button to add new items</li>
              <li>The system will attempt to fetch thumbnails and titles automatically when possible</li>
              <li>Click 'Continue' to resume watching</li>
            </ul>
          </div>

          <div class="info-section">
            <h3>Favorite Creators</h3>
            <p>Keep track of your favorite content creators.</p>
            <ul>
              <li>Add creators from YouTube, Twitch, or other platforms</li>
              <li>Quick access to creator channels</li>
              <li>The system will attempt to fetch avatars and information when available</li>
            </ul>
          </div>

          <div class="info-section">
            <h3>Customization</h3>
            <p>Customize your experience through the Settings menu:</p>
            <ul>
              <li>Choose from multiple theme modes</li>
              <li>Set custom wallpapers</li>
              <li>Change the site name</li>
              <li>Select your preferred font</li>
            </ul>
          </div>

          <div class="info-section">
            <h3>Data Management</h3>
            <p>Your data is stored locally in your browser. You can:</p>
            <ul>
              <li>Export/Import your data through Settings</li>
              <li>Share your setup via links</li>
              <li>Reset all data if needed</li>
            </ul>
          </div>

          <div class="data-section">
            <h3>Reset Data</h3>
            <p>Clear all your data and start fresh. This action cannot be undone.</p>
            <button type="button" id="reset-data" class="danger">
              <i class="fas fa-trash"></i> Reset All Data
            </button>
          </div>
        </div>

        <div class="tab-content" id="version-tab" style="display: none;">
          <div class="version-section">
            <div class="version-entry">
              <div class="version-header">
                <h3>Version 1.2.0 - The Customization Update</h3>
              </div>
              <div class="version-details">
                <ul>
                  <li>Added 13 new theme modes with custom wallpapers</li>
                  <li>Expanded visual effects with customizable intensity</li>
                  <li>Added wallpaper management system</li>
                  <li>Added custom wallpaper naming feature</li>
                  <li>Enhanced theme customization controls</li>
                  <li>Added 20 new font options</li>
                  <li>Improved settings management system</li>
                  <li>Added complete factory reset functionality</li>
                  <li>Enhanced visual effects and animations</li>
                  <li>Improved overall UI/UX</li>
                </ul>
              </div>
            </div>

            <div class="version-entry">
              <div class="version-header">
                <h3>Version 1.1.0</h3>
              </div>
              <div class="version-details">
                <ul>
                  <li>Added settings sharing via exportable codes</li>
                  <li>Added preview changes before importing shared settings</li>
                  <li>Added version history tracking</li>
                  <li>Enhanced theme customization with additional modes</li>
                  <li>Improved creator management system</li>
                </ul>
              </div>
            </div>

            <div class="version-entry">
              <div class="version-header">
                <h3>Version 1.0.1</h3>
              </div>
              <div class="version-details">
                <ul>
                  <li>Fixed thumbnail fetching issues</li>
                  <li>Improved drag and drop functionality</li>
                  <li>Enhanced theme switching performance</li>
                  <li>Added additional wallpaper options</li>
                  <li>Fixed various UI/UX issues</li>
                </ul>
              </div>
            </div>

            <div class="version-entry">
              <div class="version-header">
                <h3>Version 1.0.0</h3>
              </div>
              <div class="version-details">
                <ul>
                  <li>Initial release</li>
                  <li>Basic link management functionality</li>
                  <li>Continue watching feature</li>
                  <li>Theme customization options</li>
                  <li>Local data storage implementation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="button-group">
          <button type="button" class="primary close-modal">Got it!</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Add styles dynamically
    const style = document.createElement('style');
    style.textContent = `
      .info-section {
        margin-bottom: 2rem;
        padding: 1.5rem;
        background: var(--surface);
        border-radius: var(--border-radius);
      }

      .info-section h3 {
        color: var(--primary-color);
        margin-bottom: 0.75rem;
      }

      .info-section ul {
        margin-top: 1rem;
        margin-left: 1.5rem;
      }

      .info-section li {
        margin-bottom: 0.5rem;
        color: var(--on-surface);
      }

      .version-section {
        padding: 1rem;
      }

      .version-entry {
        background: var(--surface);
        border-radius: var(--border-radius);
        margin-bottom: 1.5rem;
        overflow: hidden;
      }

      .version-header {
        background: var(--primary-color);
        color: white;
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .version-header h3 {
        margin: 0;
        font-size: 1.2rem;
      }

      .version-details {
        padding: 1.5rem;
      }

      .version-details ul {
        margin: 0;
        padding-left: 1.5rem;
      }

      .version-details li {
        margin-bottom: 0.5rem;
        color: var(--on-surface);
      }

      .version-details li:last-child {
        margin-bottom: 0;
      }
    `;
    document.head.appendChild(style);

    // Add tab switching functionality
    const tabs = modal.querySelectorAll('.tab-button');
    const tabContents = modal.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Update active tab button
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Show corresponding content
        tabContents.forEach(content => content.style.display = 'none');
        modal.querySelector(`#${tab.dataset.tab}-tab`).style.display = 'block';
      });
    });

    modal.querySelector('#reset-data').addEventListener('click', () => {
      const confirmModal = document.createElement('div');
      confirmModal.className = 'modal active';
      confirmModal.innerHTML = `
        <div class="modal-content">
          <h2>Reset All Data</h2>
          <p style="margin: 1rem 0; color: var(--on-surface);">
            Are you sure you want to reset all data? This will:
          </p>
          <ul style="margin: 1rem 0 2rem 1.5rem; color: var(--on-surface);">
            <li>Remove all quick access links</li>
            <li>Clear continue watching list</li>
            <li>Remove favorite creators</li>
            <li>Reset theme settings</li>
            <li>Remove custom wallpapers</li>
            <li>Reset site name</li>
          </ul>
          <p style="margin-bottom: 2rem; color: #ff4444;">
            ⚠️ This action cannot be undone!
          </p>
          <div class="button-group">
            <button type="button" class="cancel">Cancel</button>
            <button type="button" class="confirm-reset danger">Reset Everything</button>
          </div>
        </div>
      `;

      document.body.appendChild(confirmModal);

      // Handle cancel
      confirmModal.querySelector('.cancel').addEventListener('click', () => {
        confirmModal.remove();
      });

      // Handle confirm reset
      confirmModal.querySelector('.confirm-reset').addEventListener('click', () => {
        // Clear all localStorage data
        localStorage.clear();

        // Reset to default theme settings
        const defaultSettings = {
          mode: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
          primaryColor: '#6200ee',
          secondaryColor: '#03dac6',
          textColor: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#ffffff' : '#000000',
          font: 'Poppins',
          customWallpaper: null,
          siteName: 'My Media Hub',
          shader: 'none',
          shaderIntensity: 0.5
        };

        // Save default settings
        localStorage.setItem('themeSettings', JSON.stringify(defaultSettings));

        // Show success message
        const successModal = document.createElement('div');
        successModal.className = 'modal active';
        successModal.innerHTML = `
          <div class="modal-content">
            <h2>Reset Complete</h2>
            <p style="margin: 1rem 0; color: var(--on-surface);">
              All data has been successfully reset to factory settings.
            </p>
            <p style="margin-bottom: 2rem; color: var(--on-surface);">
              The page will now reload to apply the changes.
            </p>
            <div class="button-group">
              <button type="button" class="primary reload">Reload Now</button>
            </div>
          </div>
        `;

        document.body.appendChild(successModal);

        // Handle reload
        successModal.querySelector('.reload').addEventListener('click', () => {
          window.location.reload();
        });

        // Remove the confirm modal
        confirmModal.remove();
      });
    });

    // Handle close button
    modal.querySelector('.close-modal').addEventListener('click', () => {
      modal.remove();
      style.remove();
    });

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
        style.remove();
      }
    });
  });
}
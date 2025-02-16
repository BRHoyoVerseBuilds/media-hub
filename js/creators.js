export function initializeCreators() {
  let creators = JSON.parse(localStorage.getItem('creators')) || [];
  
  // Initialize creators section in the UI
  const mainElement = document.querySelector('main');
  const creatorsSection = document.createElement('section');
  creatorsSection.id = 'favorite-creators';
  creatorsSection.innerHTML = `
    <h2>Favorite Creators</h2>
    <div class="scroll-container" id="creators"></div>
  `;
  mainElement.appendChild(creatorsSection);

  const creatorsContainer = document.getElementById('creators');

  function renderCreators() {
    if (!creatorsContainer) return;
    
    creatorsContainer.innerHTML = '';
    creators.forEach((creator, index) => {
      const card = document.createElement('div');
      card.className = 'creator-card';
      
      card.innerHTML = `
        <div class="creator-avatar" style="background-image: url('${creator.avatar || 'https://github.com/BRHoyoVerseBuilds/media-hub/blob/main/img/default-thumbnail.png?raw=true'}')">
          ${!creator.avatar ? `<div class="creator-fallback">${creator.name[0].toUpperCase()}</div>` : ''}
        </div>
        <div class="creator-info">
          <h3>${creator.name}</h3>
          <p class="platform">${creator.platform}</p>
          <div class="creator-actions">
            <button onclick="window.open('${creator.channelUrl}', '_blank')" class="visit-button">Visit Channel</button>
            <button class="remove-creator" data-index="${index}">Remove</button>
          </div>
        </div>
      `;
      
      creatorsContainer.appendChild(card);
    });
  }

  // Add creator modal
  const addCreatorModal = document.createElement('div');
  addCreatorModal.id = 'add-creator-modal';
  addCreatorModal.className = 'modal';
  addCreatorModal.innerHTML = `
    <div class="modal-content">
      <h2>Add Creator</h2>
      <form id="add-creator-form">
        <div class="settings-section">
          <label for="creator-name">Creator Name</label>
          <input type="text" id="creator-name" name="name" required>
        </div>
        
        <div class="settings-section">
          <label for="creator-platform">Platform</label>
          <select id="creator-platform" name="platform" required>
            <option value="YouTube">YouTube</option>
            <option value="Twitch">Twitch</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div class="settings-section">
          <label for="creator-channel">Channel URL</label>
          <input type="url" id="creator-channel" name="channelUrl" required>
        </div>
        
        <div class="settings-section">
          <label for="creator-avatar">Avatar URL (optional)</label>
          <input type="url" id="creator-avatar" name="avatar">
        </div>

        <div class="button-group">
          <button type="button" class="cancel">Cancel</button>
          <button type="submit">Add Creator</button>
        </div>
      </form>
    </div>
  `;
  document.body.appendChild(addCreatorModal);

  // Add creator button
  const addCreatorButton = document.createElement('button');
  addCreatorButton.id = 'add-creator';
  addCreatorButton.className = 'fab-button creator-fab';
  addCreatorButton.innerHTML = `
    <img src="https://github.com/BRHoyoVerseBuilds/media-hub/blob/main/img/add%20new%20link.png?raw=true" alt="Add creator">
  `;
  document.body.appendChild(addCreatorButton);

  // Event Listeners
  addCreatorButton.addEventListener('click', () => {
    addCreatorModal.classList.add('active');
  });

  addCreatorModal.querySelector('.cancel').addEventListener('click', () => {
    addCreatorModal.classList.remove('active');
    document.getElementById('add-creator-form').reset();
  });

  document.getElementById('add-creator-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newCreator = {
      name: formData.get('name'),
      platform: formData.get('platform'),
      channelUrl: formData.get('channelUrl'),
      avatar: formData.get('avatar')
    };
    
    creators.push(newCreator);
    localStorage.setItem('creators', JSON.stringify(creators));
    renderCreators();
    addCreatorModal.classList.remove('active');
    e.target.reset();
  });

  creatorsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-creator')) {
      const index = e.target.dataset.index;
      creators.splice(index, 1);
      localStorage.setItem('creators', JSON.stringify(creators));
      renderCreators();
    }
  });

  // Initial render
  renderCreators();
}
import { initializeTheme } from './theme.js';
import { initializeLinks } from './links.js';
import { initializeBookmarks } from './bookmarks.js';
import { initializeCreators } from './creators.js';

document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
  initializeLinks();
  initializeBookmarks();
  initializeCreators();

  // Handle link type toggle
  const linkTypeInputs = document.querySelectorAll('input[name="type"]');
  const quickAccessFields = document.querySelector('.quick-access-fields');
  const continueWatchingFields = document.querySelector('.continue-watching-fields');

  linkTypeInputs.forEach(input => {
    input.addEventListener('change', (e) => {
      if (e.target.value === 'quick-access') {
        quickAccessFields.style.display = 'block';
        continueWatchingFields.style.display = 'none';
      } else {
        quickAccessFields.style.display = 'none';
        continueWatchingFields.style.display = 'block';
      }
    });
  });
});
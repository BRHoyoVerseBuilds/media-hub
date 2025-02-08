import { initializeTheme } from './theme.js';
import { initializeLinks } from './links.js';
import { initializeBookmarks } from './bookmarks.js';

document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
  initializeLinks();
  initializeBookmarks();
});
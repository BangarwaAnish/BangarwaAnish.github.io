import { initAnimations } from './modules/animations.js';
import { initMobileMenu, initSmoothScrolling, initActiveNav } from './modules/navigation.js';
import { initDarkMode } from './modules/darkmode.js';
import { initContactForm } from './modules/form.js';
import { updateCurrentYear, showConsoleGreeting } from './modules/utils.js';

// Initialize all modules
function initApp() {
  showConsoleGreeting();
  updateCurrentYear();
  initMobileMenu();
  initSmoothScrolling();
  initActiveNav();
  initAnimations();
  initDarkMode();
  initContactForm();
}

// Start the app
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

/**
 * ==========================================================================
 * SONU'S PERSONAL PORTFOLIO — MAIN INITIALIZER
 * Application bootstrap, keyboard accessibility, console signature
 * ==========================================================================
 */

(function () {
  'use strict';

  // Log portfolio greeting
  console.log(
    '%c Sonu • Personal Portfolio %c Built with clean vanilla HTML5, CSS3 & ES6+ %c',
    'background: #17678F; color: #FFFFFF; font-weight: bold; padding: 4px 8px; border-radius: 4px 0 0 4px;',
    'background: #E8F6FD; color: #17678F; padding: 4px 8px;',
    'background: transparent;'
  );

  // Keyboard navigation enhancement
  document.addEventListener('keydown', (e) => {
    // Quick skip to main content with Alt + S
    if (e.altKey && e.key.toLowerCase() === 's') {
      const main = document.getElementById('main-content');
      if (main) {
        main.setAttribute('tabindex', '-1');
        main.focus();
      }
    }
  });

  // Verify image loading
  window.addEventListener('load', () => {
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      if (!img.complete || img.naturalWidth === 0) {
        console.warn('Image failed or pending:', img.src);
      }
    });
  });
})();

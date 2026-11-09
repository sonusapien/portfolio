/**
 * ==========================================================================
 * SONU'S PERSONAL PORTFOLIO — MEDICAL-THEMED PRELOADER ENGINE
 * Real page asset progress tracking, smooth counter animation,
 * graceful exit sequence, back-forward cache handling, and accessibility.
 * ==========================================================================
 */

(function () {
  'use strict';

  // Elements
  let preloaderEl = null;
  let progressFillEl = null;
  let percentTextEl = null;
  let statusTextEl = null;
  let progressTrackEl = null;

  // Progress State
  let currentProgress = 0;
  let targetProgress = 12;
  let isComplete = false;
  let isDismissed = false;
  let rafId = null;

  // Preferences
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let prefersReducedMotion = motionQuery.matches;

  /**
   * Initialize Preloader
   */
  function initPreloader() {
    preloaderEl = document.getElementById('portfolio-preloader');
    if (!preloaderEl) return;

    progressFillEl = preloaderEl.querySelector('.preloader-progress-fill');
    percentTextEl = preloaderEl.querySelector('.preloader-percent-text');
    statusTextEl = preloaderEl.querySelector('.preloader-status-text');
    progressTrackEl = preloaderEl.querySelector('.preloader-progress-track');

    // Prevent background scrolling while loading
    document.body.classList.add('preloader-active');

    // Start progress animation loop
    startProgressLoop();

    // Begin tracking real loading conditions
    trackRealLoadingProgress();

    // Listen to motion changes
    try {
      motionQuery.addEventListener('change', (e) => {
        prefersReducedMotion = e.matches;
      });
    } catch (e) {
      motionQuery.addListener((e) => {
        prefersReducedMotion = e.matches;
      });
    }

    // Handle bfcache (browser back/forward cache)
    window.addEventListener('pageshow', onPageShow);
  }

  /**
   * Track Real Asset & Document Loading Conditions
   */
  function trackRealLoadingProgress() {
    let domProgress = 0.25;
    let fontsProgress = 0;
    let imagesProgress = 0;
    let windowLoadProgress = 0;

    function recalculate() {
      if (isComplete) return;
      const combined = Math.round(
        (domProgress + fontsProgress + imagesProgress + windowLoadProgress) * 100
      );
      targetProgress = Math.max(targetProgress, Math.min(combined, 95));
    }

    // 1. Document Readiness
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        domProgress = 0.35;
        recalculate();
      });
    } else {
      domProgress = 0.35;
      recalculate();
    }

    // 2. Critical Fonts Loading
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready
        .then(() => {
          fontsProgress = 0.25;
          recalculate();
        })
        .catch(() => {
          fontsProgress = 0.25; // fallback
          recalculate();
        });
    } else {
      fontsProgress = 0.25;
      recalculate();
    }

    // 3. Track Image Assets
    const images = Array.from(document.querySelectorAll('img'));
    if (images.length === 0) {
      imagesProgress = 0.25;
      recalculate();
    } else {
      let loadedCount = 0;
      const totalImages = images.length;

      function onImageComplete() {
        loadedCount++;
        imagesProgress = (loadedCount / totalImages) * 0.25;
        recalculate();
      }

      images.forEach((img) => {
        if (img.complete && img.naturalWidth !== 0) {
          onImageComplete();
        } else {
          img.addEventListener('load', onImageComplete, { once: true });
          img.addEventListener('error', onImageComplete, { once: true }); // Error fallback
        }
      });
    }

    // 4. Window Load Event (All assets & subresources ready)
    if (document.readyState === 'complete') {
      onFullLoad();
    } else {
      window.addEventListener('load', onFullLoad, { once: true });
    }

    function onFullLoad() {
      domProgress = 0.35;
      fontsProgress = 0.25;
      imagesProgress = 0.25;
      windowLoadProgress = 0.15;
      targetProgress = 100;
    }

    // 5. Safety Maximum Timeout Fallback (Guarantees preloader never hangs forever)
    setTimeout(() => {
      targetProgress = 100;
    }, 3200);
  }

  /**
   * Progress Animation Loop (Interpolates to target smoothly)
   */
  function startProgressLoop() {
    function step() {
      if (isDismissed) return;

      if (prefersReducedMotion) {
        currentProgress = targetProgress;
      } else {
        const delta = targetProgress - currentProgress;
        currentProgress += delta * 0.14;
      }

      const displayVal = Math.min(100, Math.floor(currentProgress));

      // Update UI
      if (progressFillEl) {
        progressFillEl.style.width = displayVal + '%';
      }
      if (percentTextEl) {
        percentTextEl.textContent = displayVal + '%';
      }
      if (progressTrackEl) {
        progressTrackEl.setAttribute('aria-valuenow', displayVal);
      }

      // Check if finished
      if (targetProgress >= 100 && currentProgress >= 99.2) {
        completeAndExit();
        return;
      }

      rafId = requestAnimationFrame(step);
    }

    rafId = requestAnimationFrame(step);
  }

  /**
   * Final Completion and Exit Sequence
   */
  function completeAndExit() {
    if (isComplete) return;
    isComplete = true;

    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }

    // Force 100% display
    if (progressFillEl) progressFillEl.style.width = '100%';
    if (percentTextEl) percentTextEl.textContent = '100%';
    if (progressTrackEl) progressTrackEl.setAttribute('aria-valuenow', 100);

    // Update status text
    if (statusTextEl) {
      statusTextEl.classList.add('is-updating');
      setTimeout(() => {
        statusTextEl.textContent = 'Welcome to my portfolio.';
        statusTextEl.classList.remove('is-updating');
      }, 100);
    }

    // Briefly display completed state (350ms or instant for reduced motion)
    const holdTime = prefersReducedMotion ? 50 : 350;

    setTimeout(() => {
      dismissPreloader();
    }, holdTime);
  }

  /**
   * Dismiss Preloader Smoothly
   */
  function dismissPreloader() {
    if (isDismissed || !preloaderEl) return;
    isDismissed = true;

    // Fade out overlay
    preloaderEl.classList.add('is-loaded');
    document.body.classList.remove('preloader-active');
    document.body.classList.add('page-loaded');

    // Trigger reveal on visible hero items if interactions.js didn't trigger them yet
    const initialReveals = document.querySelectorAll('#hero .reveal-item');
    initialReveals.forEach((el) => el.classList.add('revealed'));

    // Remove from layout after fade-out transition
    const fadeDuration = prefersReducedMotion ? 10 : 620;
    setTimeout(() => {
      preloaderEl.style.display = 'none';
      preloaderEl.setAttribute('aria-hidden', 'true');
    }, fadeDuration);
  }

  /**
   * Dismiss Immediately (e.g. Back-Forward Cache navigation)
   */
  function dismissImmediately() {
    if (!preloaderEl) return;
    isDismissed = true;
    isComplete = true;
    if (rafId) cancelAnimationFrame(rafId);
    preloaderEl.classList.add('is-loaded');
    preloaderEl.style.display = 'none';
    preloaderEl.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('preloader-active');
    document.body.classList.add('page-loaded');
  }

  /**
   * PageShow handler for bfcache recovery
   */
  function onPageShow(event) {
    if (event.persisted) {
      dismissImmediately();
    }
  }

  // Bootstrap
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPreloader);
  } else {
    initPreloader();
  }
})();

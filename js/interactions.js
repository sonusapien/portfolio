/**
 * ==========================================================================
 * SONU'S PERSONAL PORTFOLIO — INTERACTIONS MODULE
 * Search & filter for projects, pagination, scroll animations, dynamic year
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initProjectSearchAndFilter();
  initDynamicYear();
  initScrollAnimations();
});

/**
 * 1. Project Search, Category Filtering & Dynamic Count
 */
function initProjectSearchAndFilter() {
  const searchInput = document.getElementById('project-search-input');
  const clearBtn = document.getElementById('search-clear-btn');
  const filterButtons = document.querySelectorAll('.filter-tab-btn');
  const projectCards = document.querySelectorAll('.project-entry-card');
  const emptyState = document.getElementById('projects-empty-state');
  const resetBtn = document.getElementById('reset-filter-btn');
  const paginationInfo = document.getElementById('pagination-info');
  const prevBtn = document.getElementById('proj-prev-btn');
  const nextBtn = document.getElementById('proj-next-btn');

  if (!projectCards.length) return;

  let currentCategory = 'all';
  let currentSearchQuery = '';

  // Calculate and update category counts on tabs
  function updateCategoryCounts() {
    const counts = {
      'all': projectCards.length,
      'software-apps': 0,
      'pharmacy-research': 0,
      'productivity-tools': 0
    };

    projectCards.forEach((card) => {
      const cat = card.getAttribute('data-category') || '';
      if (cat.includes('software-apps') || cat.includes('web-apps') || cat.includes('android-apps')) counts['software-apps']++;
      if (cat.includes('pharmacy-research')) counts['pharmacy-research']++;
      if (cat.includes('productivity-tools')) counts['productivity-tools']++;
    });

    const countAllEl = document.getElementById('count-all');
    const countAppsEl = document.getElementById('count-apps') || document.getElementById('count-web');
    const countPharmaEl = document.getElementById('count-pharma');
    const countProdEl = document.getElementById('count-prod');

    if (countAllEl) countAllEl.textContent = counts['all'];
    if (countAppsEl) countAppsEl.textContent = counts['software-apps'];
    if (countPharmaEl) countPharmaEl.textContent = counts['pharmacy-research'];
    if (countProdEl) countProdEl.textContent = counts['productivity-tools'];
  }

  updateCategoryCounts();

  // Filter application
  function applyFilters() {
    let visibleCount = 0;
    const query = currentSearchQuery.trim().toLowerCase();

    projectCards.forEach((card) => {
      const cardCategory = card.getAttribute('data-category') || '';
      const cardTags = (card.getAttribute('data-tags') || '').toLowerCase();
      const cardTitle = (card.querySelector('.entry-title')?.textContent || '').toLowerCase();
      const cardDesc = (card.querySelector('.entry-description')?.textContent || '').toLowerCase();

      // Check category
      const matchesCategory = currentCategory === 'all' || cardCategory.includes(currentCategory);

      // Check search query
      const matchesQuery = query === '' ||
        cardTitle.includes(query) ||
        cardDesc.includes(query) ||
        cardTags.includes(query);

      if (matchesCategory && matchesQuery) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Update empty state
    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    // Update pagination info text
    if (paginationInfo) {
      if (visibleCount === projectCards.length) {
        paginationInfo.textContent = `Showing all ${visibleCount} records`;
      } else {
        paginationInfo.textContent = `Showing ${visibleCount} of ${projectCards.length} records`;
      }
    }

    // Prev / Next button states
    if (prevBtn && nextBtn) {
      prevBtn.disabled = true;
      nextBtn.disabled = true;
    }
  }

  // Search input events
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value;
      if (clearBtn) {
        clearBtn.style.display = currentSearchQuery ? 'block' : 'none';
      }
      applyFilters();
    });
  }

  // Clear button event
  if (clearBtn && searchInput) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      currentSearchQuery = '';
      clearBtn.style.display = 'none';
      searchInput.focus();
      applyFilters();
    });
  }

  // Category filter tabs
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-filter') || 'all';
      applyFilters();
    });
  });

  // Reset filter button
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      currentCategory = 'all';
      currentSearchQuery = '';
      if (searchInput) searchInput.value = '';
      if (clearBtn) clearBtn.style.display = 'none';

      filterButtons.forEach((b) => {
        b.classList.toggle('active', b.getAttribute('data-filter') === 'all');
      });

      applyFilters();
    });
  }
}

/**
 * 2. Dynamic Copyright Year
 */
function initDynamicYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/**
 * 3. Scroll Reveal Animations via IntersectionObserver
 */
function initScrollAnimations() {
  const revealItems = document.querySelectorAll('.reveal-item');
  if (!revealItems.length) return;

  // If user prefers reduced motion, reveal everything immediately
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealItems.forEach((el) => el.classList.add('revealed'));
    return;
  }

  const revealItem = (el) => {
    el.classList.add('revealed');
  };

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealItem(entry.target);
          observer.unobserve(entry.target); // Reveal once
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px 80px 0px',
      threshold: 0.05
    });

    revealItems.forEach((item) => {
      // Check if already in viewport or near top on load
      const rect = item.getBoundingClientRect();
      if (rect.top <= (window.innerHeight || document.documentElement.clientHeight) + 100) {
        revealItem(item);
      } else {
        revealObserver.observe(item);
      }
    });
  } else {
    // Fallback: reveal all
    revealItems.forEach(revealItem);
  }
}

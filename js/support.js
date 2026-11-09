/**
 * ==========================================================================
 * SONU'S PERSONAL PORTFOLIO — SUPPORT MY WORK MODULE
 * Support Modal, Genuine UPI QR Code Generator, Copy UPI ID, and Accessibility
 * ==========================================================================
 */

(function () {
  'use strict';

  const UPI_CONFIG = {
    id: 'sonusapien@fam',
    name: 'Sonu',
    amount: '89',
    currency: 'INR',
    get uri() {
      return `upi://pay?pa=${encodeURIComponent(this.id)}&pn=${encodeURIComponent(this.name)}&am=${this.amount}&cu=${this.currency}`;
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    initSupportSection();
  });

  function initSupportSection() {
    const modalBackdrop = document.getElementById('support-modal');
    const openBtn = document.getElementById('open-support-modal');
    const closeBtn = document.getElementById('close-support-modal');
    const copyBtn = document.getElementById('copy-upi-btn');
    const qrContainer = document.getElementById('support-qr-target');

    if (!modalBackdrop || !openBtn) return;

    let previousActiveElement = null;
    let qrRendered = false;

    // 1. Generate Genuine UPI QR Code
    function renderUPIQRCode() {
      if (qrRendered || !qrContainer) return;

      try {
        if (typeof qrcode === 'function') {
          // Type 0 = auto-detect minimum version for URI size, Error correction level 'M' (15%)
          const qr = qrcode(0, 'M');
          qr.addData(UPI_CONFIG.uri);
          qr.make();

          // Generate scalable SVG
          const svgTag = qr.createSvgTag({
            scalable: true,
            margin: 2
          });

          qrContainer.innerHTML = svgTag;

          const svgEl = qrContainer.querySelector('svg');
          if (svgEl) {
            svgEl.setAttribute('role', 'img');
            svgEl.setAttribute('aria-label', `Scannable UPI QR Code to pay ₹${UPI_CONFIG.amount} INR to ${UPI_CONFIG.name}`);
            svgEl.style.width = '100%';
            svgEl.style.height = '100%';
            svgEl.style.display = 'block';
          }

          qrRendered = true;
        } else {
          console.warn('QRCode library not ready yet; retrying on demand.');
        }
      } catch (err) {
        console.error('Failed to generate UPI QR code:', err);
        qrContainer.innerHTML = `
          <div class="qr-fallback-msg">
            <p><strong>UPI ID:</strong> ${UPI_CONFIG.id}</p>
            <p>Please copy the UPI ID below to pay directly.</p>
          </div>
        `;
      }
    }

    // Pre-render QR on DOM ready
    renderUPIQRCode();

    // 2. Open Modal
    function openModal() {
      previousActiveElement = document.activeElement;

      // Ensure QR is rendered
      if (!qrRendered) {
        renderUPIQRCode();
      }

      modalBackdrop.removeAttribute('hidden');
      // Force layout reflow before adding active class for smooth transition
      void modalBackdrop.offsetWidth;
      modalBackdrop.classList.add('is-active');

      document.body.style.overflow = 'hidden';

      // Set focus to close button for keyboard accessibility
      if (closeBtn) {
        closeBtn.focus();
      }
    }

    // 3. Close Modal
    function closeModal() {
      if (!modalBackdrop.classList.contains('is-active')) return;

      modalBackdrop.classList.remove('is-active');
      document.body.style.overflow = '';

      // Wait for fade transition before hiding completely
      setTimeout(() => {
        if (!modalBackdrop.classList.contains('is-active')) {
          modalBackdrop.setAttribute('hidden', '');
        }
      }, 300);

      if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
        previousActiveElement.focus();
      }
    }

    // 4. Event Listeners for Open / Close
    openBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal();
      });
    }

    // Click outside modal card to close
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });

    // Keyboard handlers (Escape key & Focus trap)
    document.addEventListener('keydown', (e) => {
      if (!modalBackdrop.classList.contains('is-active')) return;

      if (e.key === 'Escape' || e.key === 'Esc') {
        e.preventDefault();
        closeModal();
        return;
      }

      // Focus trap within modal
      if (e.key === 'Tab') {
        const focusableElements = modalBackdrop.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusableElements.length) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    });

    // 5. Robust Clipboard Copy Helper
    async function copyToClipboard(text) {
      let succeeded = false;

      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(text);
          succeeded = true;
        } catch (e) {
          // Document not focused or permission denied; fall back to execCommand
          succeeded = false;
        }
      }

      if (!succeeded) {
        try {
          const textArea = document.createElement('textarea');
          textArea.value = text;
          textArea.style.position = 'fixed';
          textArea.style.left = '-9999px';
          textArea.style.top = '-9999px';
          textArea.setAttribute('readonly', '');
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          succeeded = document.execCommand('copy');
          document.body.removeChild(textArea);
        } catch (err) {
          succeeded = false;
        }
      }

      return succeeded;
    }

    // 6. Copy UPI ID with Visual Feedback
    if (copyBtn) {
      const copyLabel = document.getElementById('copy-btn-label');
      let resetTimer = null;

      copyBtn.addEventListener('click', async () => {
        const textToCopy = UPI_CONFIG.id;
        const copied = await copyToClipboard(textToCopy);

        if (copied) {
          copyBtn.classList.add('is-copied');
          if (copyLabel) copyLabel.textContent = 'Copied! ✓';

          clearTimeout(resetTimer);
          resetTimer = setTimeout(() => {
            copyBtn.classList.remove('is-copied');
            if (copyLabel) copyLabel.textContent = 'Copy UPI ID';
          }, 2200);
        } else {
          if (copyLabel) copyLabel.textContent = 'Copy Failed';
          setTimeout(() => {
            if (copyLabel) copyLabel.textContent = 'Copy UPI ID';
          }, 2000);
        }
      });
    }
  }
})();

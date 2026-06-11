/* ============================================================
   ROCARD — servicios.js
   Click-to-expand service cards
   ============================================================ */
(function () {
  'use strict';

  const cards = document.querySelectorAll('.service-card');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const isOpen = card.classList.contains('expanded');
      /* Close all */
      cards.forEach(c => c.classList.remove('expanded'));
      /* Toggle clicked */
      if (!isOpen) card.classList.add('expanded');
    });
  });
})();

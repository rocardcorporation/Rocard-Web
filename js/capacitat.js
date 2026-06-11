/* ============================================================
   ROCARD — capacitat.js
   FAQ accordion with smooth height transition
   ============================================================ */
(function () {
  'use strict';

  const items = document.querySelectorAll('.faq-item');

  items.forEach(item => {
    const question = item.querySelector('.faq-q');
    const answer   = item.querySelector('.faq-ans');
    const inner    = item.querySelector('.faq-ans-inner');

    if (!question || !answer || !inner) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      /* Close all */
      items.forEach(i => {
        i.classList.remove('open');
        const a = i.querySelector('.faq-ans');
        if (a) a.style.maxHeight = '0';
      });

      /* Open clicked if it was closed */
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = inner.scrollHeight + 'px';
      }
    });
  });
})();

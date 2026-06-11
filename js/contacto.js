/* ============================================================
   ROCARD — contacto.js
   Dynamic "Otro" textarea + form success message
   ============================================================ */
(function () {
  'use strict';

  /* ── "Otro" textarea reveal ───────────────────────────── */
  const serviceSelect = document.getElementById('servicio');
  const otroField     = document.getElementById('otroField');

  if (serviceSelect && otroField) {
    serviceSelect.addEventListener('change', () => {
      const isOtro = serviceSelect.value === 'otro';
      otroField.classList.toggle('visible', isOtro);
      if (isOtro) {
        otroField.querySelector('textarea')?.focus();
      }
    });
  }

  /* ── Form submit (success message placeholder) ────────── */
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');

  if (form && success) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      /* Basic validation */
      const required = form.querySelectorAll('[required]');
      let valid = true;
      required.forEach(field => {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = 'rgba(239,68,68,0.6)';
          field.addEventListener('input', () => {
            field.style.borderColor = '';
          }, { once: true });
        }
      });

      if (!valid) return;

      /* Show success */
      form.style.display = 'none';
      success.classList.add('visible');
    });
  }

})();

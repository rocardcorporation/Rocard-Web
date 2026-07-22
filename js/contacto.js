/* ============================================================
   ROCARD — contacto.js
   ============================================================ */
(function () {
  'use strict';

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwAP-vnQlytSHyws_xLZYtjK2ViccSa4Xlhghu8CkbTX9iYrEQPVUDmd38qbax_AW-WMg/exec';

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

  /* ── Form submit ──────────────────────────────────────── */
  const form      = document.getElementById('contactForm');
  const success   = document.getElementById('formSuccess');
  const submitBtn = document.getElementById('submitBtn');

  if (form && success) {
    form.addEventListener('submit', async e => {
      e.preventDefault();

      /* Validación */
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

      /* Enviar */
      submitBtn.disabled = true;
      submitBtn.textContent = 'ENVIANDO...';

      const data = {
        nombre:    document.getElementById('nombre').value.trim(),
        telefono:  document.getElementById('telefono').value.trim(),
        email:     document.getElementById('email').value.trim(),
        servicio:  document.getElementById('servicio').value,
        otro_desc: document.getElementById('otro-desc')?.value.trim() || ''
      };

      try {
        await fetch(SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        form.style.display = 'none';
        success.classList.add('visible');

      } catch (err) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'ENVIAR CONSULTA';
        alert('Hubo un error. Por favor intenta de nuevo.');
      }
    });
  }

})();

/* ============================================================
   ROCARD — main.js
   Shared logic: navbar, hamburger, language toggle, animations
   ============================================================ */
(function () {
  'use strict';

  /* ── Navbar scroll shadow ─────────────────────────────── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Active nav link (by filename) ───────────────────── */
  function setActiveLinks() {
    const path = window.location.pathname;
    const file = path.split('/').pop() || 'index.html';
    const map = {
      'index.html': ['index.html', ''],
      'servicios.html': ['servicios.html'],
      'capacitat.html': ['capacitat.html'],
      'contacto.html':  ['contacto.html'],
    };
    document.querySelectorAll('.nav-links a, .drawer-links a').forEach(link => {
      const href = link.getAttribute('href').split('/').pop();
      let isActive = false;
      for (const [, aliases] of Object.entries(map)) {
        if (aliases.includes(href) && aliases.includes(file)) {
          isActive = true;
          break;
        }
      }
      link.classList.toggle('active', isActive);
    });
  }
  setActiveLinks();

  /* ── Hamburger / Mobile Drawer ────────────────────────── */
  const hamburger    = document.getElementById('hamburger');
  const drawer       = document.getElementById('navDrawer');
  const overlay      = document.getElementById('drawerOverlay');
  const drawerClose  = document.getElementById('drawerClose');

  function openDrawer() {
    drawer && drawer.classList.add('open');
    overlay && overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    drawer && drawer.classList.remove('open');
    overlay && overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger && hamburger.addEventListener('click', openDrawer);
  drawerClose && drawerClose.addEventListener('click', closeDrawer);
  overlay && overlay.addEventListener('click', closeDrawer);

  /* ── Language Toggle ──────────────────────────────────── */
  let currentLang = localStorage.getItem('rocard-lang') || 'es';

  function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem('rocard-lang', lang);

    /* Swap text content on all bilingual elements */
    document.querySelectorAll('[data-es]').forEach(el => {
      const key = lang === 'es' ? 'es' : 'en';
      if (el.dataset[key] !== undefined) {
        el.textContent = el.dataset[key];
      }
    });

    /* Highlight active lang button */
    document.querySelectorAll('[data-lang-btn]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.langBtn === lang);
    });
  }

  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.dataset.langBtn));
  });

  applyLang(currentLang);

  /* ── Scroll Fade-Up (IntersectionObserver) ────────────── */
  const fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    fadeEls.forEach(el => io.observe(el));
  } else {
    /* Fallback: show all immediately */
    fadeEls.forEach(el => el.classList.add('is-visible'));
  }

})();

/* ─── script.js — Editorial Portfolio ─────────────────────── */

const menuToggle      = document.getElementById('menuToggle');
const navLinks        = document.getElementById('navLinks');
const siteHeader      = document.getElementById('siteHeader');
const cursorGlow      = document.getElementById('cursorGlow');
const pageLoader      = document.getElementById('pageLoader');
const themeToggle     = document.getElementById('themeToggle');
const navSectionLinks = document.querySelectorAll('.nav-links a');
const sections        = document.querySelectorAll('main section[id]');
const projectSlider   = document.getElementById('projectSlider');
const projectPrev     = document.getElementById('projectPrev');
const projectNext     = document.getElementById('projectNext');
const projectPrevMob  = document.getElementById('projectPrevMobile');
const projectNextMob  = document.getElementById('projectNextMobile');

let lastScrollY = 0;
let ticking     = false;

/* ══════════════════════════════════════════════════════════
   THEME TOGGLE
══════════════════════════════════════════════════════════ */
const THEME_KEY = 'awsmx-theme';

function applyTheme(isLight) {
  document.body.classList.toggle('light', isLight);
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(isLight));
    themeToggle.setAttribute('aria-label',
      isLight ? 'Switch to dark theme' : 'Switch to light theme'
    );
  }
}

/* Resolve initial theme before paint to avoid flash */
(function () {
  const saved = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const startLight = saved === 'light' || (!saved && !prefersDark);
  applyTheme(startLight);
})();

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nowLight = !document.body.classList.contains('light');
    applyTheme(nowLight);
    localStorage.setItem(THEME_KEY, nowLight ? 'light' : 'dark');

    /* Micro-repaint so backdrop-filter picks up new background */
    if (siteHeader && window.scrollY > 60) {
      siteHeader.style.willChange = 'background';
      requestAnimationFrame(() => { siteHeader.style.willChange = ''; });
    }
  });
}

/* ══════════════════════════════════════════════════════════
   MOBILE MENU
══════════════════════════════════════════════════════════ */
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('show');
    menuToggle.classList.toggle('is-active', open);
    menuToggle.setAttribute('aria-expanded', String(open));
  });

  /* Close on link click */
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('show');
      menuToggle.classList.remove('is-active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* Close when clicking outside */
  document.addEventListener('click', e => {
    if (!e.target.closest('.nav')) {
      navLinks.classList.remove('show');
      menuToggle.classList.remove('is-active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ══════════════════════════════════════════════════════════
   SCROLL-REVEAL
══════════════════════════════════════════════════════════ */
const revealEls = document.querySelectorAll('.reveal');

const revealIO = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach((el, i) => {
  if (!el.style.transitionDelay) {
    el.style.transitionDelay = `${Math.min(i * 55, 220)}ms`;
  }
  revealIO.observe(el);
});

/* ══════════════════════════════════════════════════════════
   ACTIVE NAV SECTION
══════════════════════════════════════════════════════════ */
function updateActiveSection() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 160) current = sec.id;
  });
  navSectionLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

/* ══════════════════════════════════════════════════════════
   NAVBAR SCROLL SHRINK
══════════════════════════════════════════════════════════ */
const SHRINK_AT = 60;
const DEAD_ZONE = 5;

function updateNav(reset = false) {
  if (!siteHeader) return;
  const y = Math.max(window.scrollY, 0);

  if (reset || y < SHRINK_AT) {
    siteHeader.classList.remove('scrolled');
  } else {
    if (y > lastScrollY + DEAD_ZONE) siteHeader.classList.add('scrolled');
    if (y < lastScrollY - DEAD_ZONE) siteHeader.classList.remove('scrolled');
  }
  lastScrollY = y;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateNav();
      updateActiveSection();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

/* ══════════════════════════════════════════════════════════
   PROJECT CAROUSEL
══════════════════════════════════════════════════════════ */
function updateCarouselBtns() {
  [projectPrev, projectNext, projectPrevMob, projectNextMob]
    .filter(Boolean)
    .forEach(btn => { btn.disabled = false; });
}

if (projectSlider && projectPrev && projectNext) {
  function slide(dir) {
    const card = projectSlider.querySelector('.project-card');
    if (!card) return;
    const gap   = parseFloat(window.getComputedStyle(projectSlider).columnGap || '2');
    const step  = card.getBoundingClientRect().width + gap;
    const maxL  = projectSlider.scrollWidth - projectSlider.clientWidth - 2;
    const cur   = projectSlider.scrollLeft;

    if (dir > 0 && cur >= maxL) { projectSlider.scrollTo({ left: 0,    behavior: 'smooth' }); return; }
    if (dir < 0 && cur <= 2)    { projectSlider.scrollTo({ left: maxL, behavior: 'smooth' }); return; }
    projectSlider.scrollBy({ left: dir * step, behavior: 'smooth' });
  }

  projectPrev.addEventListener('click', () => slide(-1));
  projectNext.addEventListener('click', () => slide(1));
  if (projectPrevMob) projectPrevMob.addEventListener('click', () => slide(-1));
  if (projectNextMob) projectNextMob.addEventListener('click', () => slide(1));

  projectSlider.addEventListener('scroll', updateCarouselBtns, { passive: true });
  window.addEventListener('resize', updateCarouselBtns);
  setTimeout(updateCarouselBtns, 100);
}

/* ══════════════════════════════════════════════════════════
   CURSOR GLOW
══════════════════════════════════════════════════════════ */
if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('pointermove', e => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top  = `${e.clientY}px`;
  }, { passive: true });
}

/* ══════════════════════════════════════════════════════════
   PAGE LOAD
══════════════════════════════════════════════════════════ */
window.addEventListener('load', () => {
  document.body.classList.add('is-loaded');
  lastScrollY = 0;
  updateNav(true);
  updateActiveSection();
  updateCarouselBtns();
  if (pageLoader) setTimeout(() => pageLoader.classList.add('hidden'), 400);
});

window.addEventListener('pageshow', () => {
  lastScrollY = 0;
  updateNav(true);
});
// ============================================
// ELISABETH BERTELMANN — Navigation + Hero
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.nav__mobile-menu');
  const wordmark   = document.querySelector('.section-hero__wordmark');
  const hero       = document.querySelector('.section-hero');

  // ---- Wordmark fade on scroll ----
  if (wordmark && hero) {
    function updateWordmark() {
      const heroH = hero.offsetHeight;
      const scrollY = window.scrollY;
      // Fade out over the first 40% of the hero height
      const fadeEnd = heroH * 0.4;
      const opacity = Math.max(0, 1 - scrollY / fadeEnd);
      wordmark.style.opacity = opacity;
      // Also disable pointer events once invisible
      wordmark.style.pointerEvents = opacity === 0 ? 'none' : 'none'; // always none
    }

    updateWordmark();
    window.addEventListener('scroll', updateWordmark, { passive: true });
  }

  // ---- Hamburger toggle ----
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      mobileMenu.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- Active nav link ----
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav__links a, .nav__mobile-menu a').forEach(link => {
    const href = link.getAttribute('href') || '';
    const linkSlug = href.replace(/^\.\.\//, '').replace('.html', '');
    const pathSlug = currentPath.replace('.html', '');
    if (pathSlug.endsWith(linkSlug) && linkSlug !== '') {
      link.classList.add('active');
    }
  });

});

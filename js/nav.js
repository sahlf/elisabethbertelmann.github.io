// ============================================
// ELISABETH BERTELMANN — Navigation
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  const nav = document.getElementById('nav');
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.nav__mobile-menu');

  // Hero height detection for transparent/white switching
  const hero = document.querySelector('.section-hero');

  function updateNav() {
    const scrollY = window.scrollY;
    const heroHeight = hero ? hero.offsetHeight : 0;

    if (scrollY > 10) {
      nav.classList.add('scrolled');
      nav.classList.remove('over-dark');
    } else {
      nav.classList.remove('scrolled');
      // If hero exists, nav sits over it — use white text
      if (hero) {
        nav.classList.add('over-dark');
      }
    }
  }

  // Run on load
  updateNav();

  window.addEventListener('scroll', updateNav, { passive: true });

  // Hamburger
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

  // Active nav link
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav__links a, .nav__mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPage = href.replace('../', '').replace('.html', '');
    const pathPage = currentPath.replace('.html', '');
    if (pathPage.endsWith(linkPage) || (linkPage === 'index' && (pathPage === '/' || pathPage.endsWith('/')))) {
      link.classList.add('active');
    }
  });

});

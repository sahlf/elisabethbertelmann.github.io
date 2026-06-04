// ============================================
// ELISABETH BERTELMANN — Navigation
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  const nav = document.getElementById('nav');
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.nav__mobile-menu');
  const wordmark = document.querySelector('.section-hero__wordmark');
  const hero = document.querySelector('.section-hero');

  // ---- Wordmark fade on scroll ----
  if (wordmark && hero) {
    function updateWordmark() {
      const scrollY = window.scrollY;
      // Abrupt: hide immediately on any scroll
      wordmark.style.opacity = scrollY > 10 ? 0 : 1;
      wordmark.style.transition = 'none';
    }
    updateWordmark();
    window.addEventListener('scroll', updateWordmark, { passive: true });
  }

  // ---- Scroll hide/show nav (mobile only, non-homepage) ----
  const isHomepage = document.querySelector('.section-hero') !== null;
  let lastScrollY = 0;
  let scrollTimer;

  if (!isHomepage && window.innerWidth <= 768) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const isMobile = window.innerWidth <= 768;
      if (!isMobile) return;

      if (scrollY <= 10) {
        // At top — transparent
        nav.style.transform = 'translateY(0)';
        nav.style.background = 'transparent';
      } else if (scrollY > lastScrollY + 5) {
        // Scrolling down — hide
        nav.style.transform = 'translateY(-100%)';
      } else if (scrollY < lastScrollY - 5) {
        // Scrolling up — show with white bg
        nav.style.transform = 'translateY(0)';
        nav.style.background = '#fff';
        nav.style.transition = 'transform 0.3s ease, background 0.3s ease';
        // Check if back at top
        if (scrollY <= 10) {
          nav.style.background = 'transparent';
        }
      }

      lastScrollY = scrollY;
    }, { passive: true });

    // Add transition to nav
    nav.style.transition = 'transform 0.3s ease, background 0.3s ease';
  }

  // ---- Hamburger toggle ----
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      mobileMenu.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      // Invert nav to white when menu is open
      const nav = document.getElementById('nav');
      if (isOpen) {
        nav.style.setProperty('--nav-text', '#fff');
        nav.querySelectorAll('.nav__logo img').forEach(el => el.style.filter = 'brightness(0) invert(1)');
        nav.querySelectorAll('.nav__hamburger span').forEach(el => el.style.background = '#fff');
      } else {
        nav.querySelectorAll('.nav__logo img').forEach(el => el.style.filter = '');
        nav.querySelectorAll('.nav__hamburger span').forEach(el => el.style.background = '');
      }
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

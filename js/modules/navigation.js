export function initMobileMenu() {
  const mobileMenu = document.querySelector('.mobile-menu');
  const navLinks = document.querySelector('.nav-links');

  if (!mobileMenu || !navLinks) return;

  mobileMenu.addEventListener('click', () => {
    const isExpanded = navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    mobileMenu.setAttribute('aria-expanded', isExpanded);
  });
}

export function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Close mobile menu if open
        const navLinks = document.querySelector('.nav-links');
        const mobileMenu = document.querySelector('.mobile-menu');
        if (navLinks) navLinks.classList.remove('active');
        if (mobileMenu) {
          mobileMenu.classList.remove('active');
          mobileMenu.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });
}

export function initActiveNav() {
  function updateActiveNav() {
    let current = '';
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('header');

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });

    if (header) {
      header.style.background = window.scrollY > 100 
        ? 'rgba(15, 23, 42, 0.98)'
        : 'rgba(15, 23, 42, 0.95)';
    }
  }

  function debounce(func, wait = 100) {
    let timeout;
    return function() {
      clearTimeout(timeout);
      timeout = setTimeout(func, wait);
    };
  }

  window.addEventListener('scroll', debounce(updateActiveNav));
}

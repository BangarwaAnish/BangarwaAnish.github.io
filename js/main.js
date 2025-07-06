// ===== DOM Cache =====
const DOM = {
  mobileMenu: document.querySelector('.mobile-menu'),
  navLinks: document.querySelector('.nav-links'),
  header: document.querySelector('header'),
  contactForm: document.querySelector('.contact-form'),
  sections: document.querySelectorAll('section'),
  navAnchors: document.querySelectorAll('.nav-links a')
};

// ===== Mobile Menu Toggle =====
if (DOM.mobileMenu) {
  DOM.mobileMenu.addEventListener('click', () => {
    DOM.navLinks.classList.toggle('active');
    DOM.mobileMenu.classList.toggle('active');
    DOM.mobileMenu.setAttribute('aria-expanded', 
      DOM.navLinks.classList.contains('active'));
  });
}

// ===== Smooth Scrolling =====
document.body.addEventListener('click', (e) => {
  if (e.target.matches('.nav-links a[href^="#"]')) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    
    if (target) {
      // Close mobile menu if open
      DOM.navLinks?.classList.remove('active');
      DOM.mobileMenu?.classList.remove('active');
      DOM.mobileMenu?.setAttribute('aria-expanded', 'false');
      
      // Smooth scroll
      setTimeout(() => {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  }
});

// ===== Active Navigation Highlighting =====
function updateActiveNav() {
  let currentSection = '';
  
  DOM.sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= (sectionTop - 200)) {
      currentSection = section.getAttribute('id');
    }
  });

  DOM.navAnchors.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });

  // Header scroll effect
  if (DOM.header) {
    DOM.header.style.background = window.scrollY > 100 
      ? 'rgba(15, 23, 42, 0.98)' 
      : 'rgba(15, 23, 42, 0.95)';
  }
}

// Debounced scroll handler
function debounce(func, wait = 100) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
}

window.addEventListener('scroll', debounce(updateActiveNav));

// ===== Form Submission =====
if (DOM.contactForm) {
  DOM.contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const email = formData.get('email');
    
    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    // Prepare mailto link
    const mailtoLink = `mailto:brm.anish.choudhary@gmail.com?subject=${
      encodeURIComponent(formData.get('subject'))
    }&body=${
      encodeURIComponent(
        `Name: ${formData.get('name')}\nEmail: ${email}\n\nMessage:\n${formData.get('message')}`
      )
    }`;
    
    // Open email client
    window.location.href = mailtoLink;
    this.reset();
  });
}

// ===== Intersection Observer for Animations =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
  // Observe sections
  DOM.sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    section.style.willChange = 'opacity, transform';
    observer.observe(section);
  });
  
  // Initialize active nav
  updateActiveNav();
});

// ===== Reduced Motion Preference =====
const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
if (motionMediaQuery.matches) {
  document.querySelectorAll('*').forEach(el => {
    el.style.transition = 'none !important';
    el.style.animation = 'none !important';
  });
}

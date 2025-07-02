export function initContactForm() {
  const contactForm = document.querySelector('.contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    const formData = new FormData(this);
    const mailtoLink = `mailto:brm.anish.choudhary@gmail.com?subject=${
      encodeURIComponent(formData.get('subject'))
    }&body=${
      encodeURIComponent(
        `Name: ${formData.get('name')}\nEmail: ${email}\n\nMessage:\n${formData.get('message')}`
      )
    }`;

    window.location.href = mailtoLink;
    this.reset();
  });
}

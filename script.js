document.documentElement.classList.add('js-ready');

const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav');
const navLinks = [...document.querySelectorAll('.nav-link')];

if (menuToggle && primaryNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    primaryNav.classList.toggle('open', !isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      primaryNav.classList.remove('open');
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => revealObserver.observe(item));

const sections = [...document.querySelectorAll('main section[id]')];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const activeId = entry.target.id;
      navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`));
    }
  });
}, { rootMargin: '-25% 0px -62% 0px', threshold: 0 });

sections.forEach((section) => sectionObserver.observe(section));

const inquiryForm = document.querySelector('#inquiry-form');
const formStatus = document.querySelector('#form-status');

if (inquiryForm && formStatus) {
  inquiryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = inquiryForm.elements.name.value.trim();
    formStatus.textContent = name ? `Thanks, ${name}. Your first note is ready for the care desk.` : 'Thanks. Your first note is ready for the care desk.';
    inquiryForm.reset();
  });
}

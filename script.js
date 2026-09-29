// Navbar scroll effect
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
function closeMenu() {
  navLinks.classList.remove('open');
  menuToggle.classList.remove('active');
  document.body.style.overflow = '';
}

function openMenu() {
  navLinks.classList.add('open');
  menuToggle.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scroll
}

menuToggle.addEventListener('click', () => {
  if (navLinks.classList.contains('open')) {
    closeMenu();
  } else {
    openMenu();
  }
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (
    navLinks.classList.contains('open') &&
    !navLinks.contains(e.target) &&
    !menuToggle.contains(e.target)
  ) {
    closeMenu();
  }
});

// Close menu on resize to desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    closeMenu();
  }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNav() {
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

    if (navLink && scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
      navLink.classList.add('active');
    }
  });
}

window.addEventListener('scroll', highlightNav);

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Simple reveal animation on scroll
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.section, .project-card, .skill-category, .info-card, .education-card, .contact-card').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// Add reveal styles dynamically
const style = document.createElement('style');
style.textContent = `
  .reveal {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.55s ease, transform 0.55s ease;
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }
  @media (max-width: 480px) {
    .reveal {
      transform: translateY(14px);
    }
  }
`;
document.head.appendChild(style);

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const header = document.getElementById('header');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenuBtn.classList.toggle('active');
  mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking on links
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-cta a');
mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenuBtn.classList.remove('active');
    mobileMenu.classList.remove('active');
  });
});

// Header scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });


        document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const pintsEl = document.getElementById("pintsCount");
    const livesEl = document.getElementById("livesCount");

    const pintsSpan = pintsEl.querySelector('span');
    const livesSpan = livesEl.querySelector('span');

    // Show spans first (but still invisible due to opacity 0)
    pintsSpan.style.display = "inline";
    livesSpan.style.display = "inline";

    // Force reflow (ensures transition triggers)
    void pintsSpan.offsetWidth;
    void livesSpan.offsetWidth;

    // Fade in
    pintsSpan.style.opacity = 1;
    livesSpan.style.opacity = 1;

    // Remove spinner icons
    pintsEl.querySelector('i').remove();
    livesEl.querySelector('i').remove();

    // Optionally remove loading class
    pintsEl.classList.remove('loading-animation');
    livesEl.classList.remove('loading-animation');
  }, 10000); // 10 seconds
});

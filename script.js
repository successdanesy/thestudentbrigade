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

        // Initialize
        createParticles();

        // API call to fetch data from the functional tracker
async function fetchBloodDriveData() {
  try {
    const response = await fetch("https://students-bridage.onrender.com/api/counts");
    const data = await response.json();
    return {
      pints: data.pints || 0,
      lives: data.lives || 0
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { pints: 0, lives: 0 };
  }
}


    // Update dashboard with fetched data
    function updateDashboard(data) {
  const pintsElement = document.getElementById('pintsCount');
  const livesElement = document.getElementById('livesCount');

  // Remove loading animations
  [pintsElement, livesElement].forEach(el => {
    el.classList.remove('loading-animation');
    el.innerHTML = el.innerHTML.replace(/<i[^>]*><\/i>/, ''); // Remove spinner
  });

  animateNumber(pintsElement.querySelector('span'), data.pints);
  animateNumber(livesElement.querySelector('span'), data.lives);
}


    // Animate number counting
    function animateNumber(element, targetNumber) {
      const currentNumber = parseInt(element.textContent) || 0;
      const increment = targetNumber > currentNumber ? 1 : -1;
      const duration = 1000;
      const steps = Math.abs(targetNumber - currentNumber);
      const stepDuration = duration / steps;

      let current = currentNumber;
      const timer = setInterval(() => {
        current += increment;
        element.textContent = current;
        
        if (current === targetNumber) {
          clearInterval(timer);
        }
      }, stepDuration);
    }

    // Calculate days remaining
    function updateDaysRemaining() {
      const endDate = new Date('2025-06-13'); // June 13, 2025
      const today = new Date();
      const diffTime = endDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      document.getElementById('daysLeft').textContent = Math.max(0, diffDays);
    }

    // Initialize dashboard
    async function initializeDashboard() {
      updateDaysRemaining();
      
      // Fetch initial data
      const data = await fetchBloodDriveData();
      updateDashboard(data);
      
      // Set up periodic updates every 30 seconds
      setInterval(async () => {
        const newData = await fetchBloodDriveData();
        updateDashboard(newData);
      }, 30000);
    }

    // Start the dashboard
    initializeDashboard();
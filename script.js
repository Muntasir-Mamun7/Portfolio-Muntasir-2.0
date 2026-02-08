// ===== HAMBURGER MENU =====
function toggleMenu() {
  const menu = document.querySelector('.menu-links');
  const icon = document.querySelector('.hamburger-icon');
  menu.classList.toggle('open');
  icon.classList.toggle('open');
}

// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading-screen');
  const smokeContainer = document.getElementById('smoke-container');
  const progressBar = document.getElementById('progress-bar');
  const progressPercentage = document.getElementById('progress-percentage');
  const loadingMessage = document.getElementById('loading-message');
  const particleContainer = document.getElementById('particle-container');
  
  // Loading messages that change during the loading process
  const messages = [
    'Initializing...',
    'Loading resources...',
    'Preparing experience...',
    'Setting up interface...',
    'Almost ready...',
    'Welcome!'
  ];
  
  let currentProgress = 0;
  let messageIndex = 0;
  const TOTAL_DURATION = 3000; // Total loading time: 3 seconds
  const PROGRESS_INTERVAL = 30; // Update every 30ms for smooth animation
  const SMOKE_ANIMATION_DURATION = 9000;
  const SMOKE_FADE_OUT_DURATION = 2000;
  
  // Create interactive particles
  function createParticle() {
    if (!particleContainer) return;
    
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random horizontal position
    const startX = Math.random() * 100;
    particle.style.left = startX + '%';
    
    // Random drift amount
    const drift = (Math.random() - 0.5) * 200;
    particle.style.setProperty('--particle-drift', drift + 'px');
    
    // Random animation duration
    const duration = 2 + Math.random() * 2;
    particle.style.animationDuration = duration + 's';
    
    // Random delay
    const delay = Math.random() * 1;
    particle.style.animationDelay = delay + 's';
    
    // Random size
    const size = 2 + Math.random() * 4;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    particleContainer.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
      particle.remove();
    }, (duration + delay) * 1000);
  }
  
  // Create particles continuously during loading
  const particleInterval = setInterval(() => {
    createParticle();
  }, 200);
  
  // Animate progress bar and percentage
  const progressInterval = setInterval(() => {
    if (currentProgress >= 100) {
      clearInterval(progressInterval);
      clearInterval(particleInterval);
      
      // Show final message
      if (loadingMessage) {
        loadingMessage.textContent = messages[messages.length - 1];
      }
      
      // Hide loading screen
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
      }, 500);
      
      return;
    }
    
    // Increment progress with slight randomness for natural feel
    const increment = 2 + Math.random() * 3;
    currentProgress = Math.min(currentProgress + increment, 100);
    
    // Update progress bar width
    if (progressBar) {
      progressBar.style.width = currentProgress + '%';
    }
    
    // Update percentage text
    if (progressPercentage) {
      progressPercentage.textContent = Math.floor(currentProgress) + '%';
    }
    
    // Update loading message based on progress
    const messageThreshold = 100 / messages.length;
    const newMessageIndex = Math.min(
      Math.floor(currentProgress / messageThreshold),
      messages.length - 1
    );
    
    if (newMessageIndex !== messageIndex && loadingMessage) {
      messageIndex = newMessageIndex;
      loadingMessage.style.animation = 'none';
      // Trigger reflow to restart animation reliably
      void loadingMessage.offsetHeight;
      loadingMessage.textContent = messages[messageIndex];
      loadingMessage.style.animation = 'fadeIn 0.5s ease-in-out';
    }
  }, PROGRESS_INTERVAL);
  
  // Trigger smoke fade-out after longest animation completes
  setTimeout(() => {
    if (smokeContainer) {
      smokeContainer.classList.add('fade-out');
      // Remove smoke container after fade-out completes
      setTimeout(() => {
        smokeContainer.style.display = 'none';
      }, SMOKE_FADE_OUT_DURATION);
    }
  }, SMOKE_ANIMATION_DURATION);
});

// ===== DARK/LIGHT MODE TOGGLE =====
const themeToggleBtns = document.querySelectorAll('.theme-btn');
const html = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

// Add click event to all theme toggle buttons
themeToggleBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
});

function updateThemeIcon(theme) {
  const icons = document.querySelectorAll('.theme-icon');
  icons.forEach(icon => {
    if (theme === 'dark') {
      icon.className = 'bi bi-sun-fill theme-icon';
    } else {
      icon.className = 'bi bi-moon-fill theme-icon';
    }
  });
}

// ===== SCROLL PROGRESS INDICATOR =====
window.addEventListener('scroll', () => {
  const scrollProgress = document.getElementById('scroll-progress');
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
  scrollProgress.style.width = scrollPercentage + '%';
});

// ===== STICKY NAVIGATION WITH SHADOW =====
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ===== SMOOTH SCROLL FOR NAVIGATION LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed nav
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ===== INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all sections and cards
document.addEventListener('DOMContentLoaded', () => {
  const elementsToAnimate = document.querySelectorAll(
    'section, .project-card, .skill-item, .certificate-card, .publication-card, .details-container'
  );
  
  elementsToAnimate.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
});

// ===== SKILL BARS ANIMATION =====
const animateSkillBars = () => {
  const skillBars = document.querySelectorAll('.skill-progress');
  skillBars.forEach(bar => {
    const targetWidth = bar.style.width || '0%';
    bar.style.width = '0%';
    setTimeout(() => {
      bar.style.width = targetWidth;
    }, 100);
  });
};

// Trigger skill bars animation when skills section is visible
const skillsSection = document.getElementById('skills');
if (skillsSection) {
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillBars();
        skillsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  skillsObserver.observe(skillsSection);
}

// ===== DYNAMIC YEAR IN FOOTER =====
const updateYear = () => {
  const year = new Date().getFullYear();
  const footerText = document.querySelector('footer p');
  if (footerText) {
    footerText.innerHTML = `Copyright &#169; ${year} Muntasir Al Mamun. All Rights Reserved`;
  }
};
updateYear();

// ===== PERFORMANCE: Lazy Loading Images =====
if ('loading' in HTMLImageElement.prototype) {
  // Browser supports native lazy loading, images will load automatically
  const images = document.querySelectorAll('img[loading="lazy"]');
  // No action needed, native lazy loading handles it
} else {
  // Fallback for browsers that don't support lazy loading
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}

// ===== HANDLE NAVIGATION MENU CLOSE ON OUTSIDE CLICK =====
document.addEventListener('click', (e) => {
  const menu = document.querySelector('.menu-links');
  const icon = document.querySelector('.hamburger-icon');
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  
  if (menu && icon && hamburgerMenu) {
    if (!hamburgerMenu.contains(e.target) && menu.classList.contains('open')) {
      menu.classList.remove('open');
      icon.classList.remove('open');
    }
  }
});

// ===== ESCAPE KEY TO CLOSE MENU =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const menu = document.querySelector('.menu-links');
    const icon = document.querySelector('.hamburger-icon');
    if (menu && icon && menu.classList.contains('open')) {
      menu.classList.remove('open');
      icon.classList.remove('open');
    }
  }
});

// ===== ADD HOVER EFFECT TO PROJECT CARDS =====
// Hover effects are handled by CSS - no JavaScript needed

// ===== CONSOLE MESSAGE =====
console.log('%c👋 Welcome to Muntasir\'s Portfolio!', 'color: #2c3e50; font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code? Check it out on GitHub!', 'color: #3498db; font-size: 14px;');
console.log('%chttps://github.com/Muntasir-Mamun7', 'color: #34495e; font-size: 12px;');

// ===== CERTIFICATE GALLERY MODAL =====
const certificateItems = document.querySelectorAll('.certificate-gallery-item');
certificateItems.forEach(item => {
  item.addEventListener('click', function() {
    const img = this.querySelector('img');
    const modal = document.createElement('div');
    modal.className = 'certificate-modal';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'certificate-modal-content';
    
    const modalImg = document.createElement('img');
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    
    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = 'position: absolute; top: 20px; right: 40px; color: #fff; font-size: 50px; font-weight: bold; cursor: pointer; z-index: 10001;';
    
    modalContent.appendChild(modalImg);
    modal.appendChild(closeBtn);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Close modal on click
    modal.addEventListener('click', function() {
      modal.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(modal);
      }, 300);
    });
    
    closeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      modal.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(modal);
      }, 300);
    });
  });
});

// ===== HERO SECTION COUNTER ANIMATION =====
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16); // 60fps
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

// Trigger counter animation when hero section is visible
const heroSection = document.getElementById('hero-section');
if (heroSection) {
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'));
          stat.classList.add('counting');
          animateCounter(stat, target);
        });
        heroObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  heroObserver.observe(heroSection);
}

// ===== ENHANCED SCROLL ANIMATIONS =====
// Add parallax effect to hero section with performance optimization
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const heroSection = document.getElementById('hero-section');
      if (heroSection && window.innerWidth >= 1200) {
        const scrolled = window.pageYOffset;
        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual) {
          heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
      }
      ticking = false;
    });
    ticking = true;
  }
});

// ===== SMOOTH PAGE TRANSITIONS =====
// Add fade-in effect for page sections
const addSectionAnimations = () => {
  const sections = document.querySelectorAll('section');
  sections.forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  });
};

// Observe sections for scroll animations
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { 
  threshold: 0.1,
  rootMargin: '-50px'
});

// Initialize animations and handle resize
let animationsInitialized = false;

const initializeSectionAnimations = () => {
  if (window.innerWidth >= 1200 && !animationsInitialized) {
    addSectionAnimations();
    const sections = document.querySelectorAll('section');
    sections.forEach(section => sectionObserver.observe(section));
    animationsInitialized = true;
  } else if (window.innerWidth < 1200 && animationsInitialized) {
    // Reset sections for smaller viewports
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
      sectionObserver.unobserve(section);
    });
    animationsInitialized = false;
  }
};

document.addEventListener('DOMContentLoaded', initializeSectionAnimations);

// Handle resize with debouncing
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(initializeSectionAnimations, 250);
});

// ===== ABOUT SECTION ANIMATIONS =====
// Animate info cards on scroll
const aboutHomeSection = document.getElementById('about-home');
if (aboutHomeSection) {
  const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add visible class to trigger CSS animations
        const infoCards = document.querySelectorAll('.info-card');
        infoCards.forEach(card => {
          card.classList.add('visible');
        });
        
        const aboutDetails = document.querySelector('.about-details');
        if (aboutDetails) {
          aboutDetails.classList.add('visible');
        }
        
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach(tag => {
          tag.classList.add('visible');
        });
        
        aboutObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  aboutObserver.observe(aboutHomeSection);
}

// Parallax effect removed to avoid conflicts with hover animations

// Counter animation for experience years
const experienceDetail = document.querySelector('.info-card [data-counter="experience"]');
if (experienceDetail) {
  const experienceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetText = experienceDetail.textContent;
        const match = targetText.match(/(\d+)\+/);
        if (match) {
          const target = parseInt(match[1]);
          let count = 0;
          const interval = setInterval(() => {
            if (count < target) {
              count++;
              experienceDetail.textContent = `${count}+ Years`;
            } else {
              clearInterval(interval);
            }
          }, 500);
        }
        experienceObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  const parentCard = experienceDetail.closest('.info-card');
  if (parentCard) {
    experienceObserver.observe(parentCard);
  }
}

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
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
  }, 1500); // Show loading for 1.5 seconds
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
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
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
console.log('%c👋 Welcome to Muntasir\'s Portfolio!', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code? Check it out on GitHub!', 'color: #764ba2; font-size: 14px;');
console.log('%chttps://github.com/Muntasir-Mamun7', 'color: #3b82f6; font-size: 12px;');

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

// ===== HAMBURGER MENU =====
function toggleMenu() {
  const menu = document.querySelector('.menu-links');
  const icon = document.querySelector('.hamburger-icon');
  menu.classList.toggle('open');
  icon.classList.toggle('open');
  const isOpen = menu.classList.contains('open');
  icon.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) loadingScreen.classList.add('hidden');
});

// ===== LAZY LOAD CHATBOT =====
window.addEventListener('load', () => {
  const loadChatbot = () => {
    const s = document.createElement('script');
    s.src = 'chatbot.js';
    document.body.appendChild(s);
  };
  // Use requestIdleCallback when available; fall back to a short timeout
  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadChatbot, { timeout: 3000 });
  } else {
    setTimeout(loadChatbot, 500);
  }
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
    
    // Brief rotation effect on click
    btn.classList.add('rotating');
    setTimeout(() => btn.classList.remove('rotating'), 400);
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
});

function updateThemeIcon(theme) {
  const icons = document.querySelectorAll('.theme-icon');
  icons.forEach(icon => {
    if (theme === 'dark') {
      icon.className = 'bi bi-brightness-high-fill theme-icon';
    } else {
      icon.className = 'bi bi-moon-stars-fill theme-icon';
    }
  });
}

// ===== UNIFIED SCROLL HANDLER (single rAF-throttled listener) =====
const nav = document.querySelector('nav');
let scrollTicking = false;
function onScroll() {
  if (!scrollTicking) {
    window.requestAnimationFrame(() => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Scroll progress indicator
      const scrollProgress = document.getElementById('scroll-progress');
      if (scrollProgress) {
        scrollProgress.style.width = ((scrollY / (documentHeight - windowHeight)) * 100) + '%';
      }

      // Sticky nav shadow
      if (nav) nav.classList.toggle('scrolled', scrollY > 100);

      // Parallax (desktop only)
      if (window.innerWidth >= 1200) {
        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual) heroVisual.style.transform = `translateY(${scrollY * 0.3}px)`;
      }

      // Back to top button visibility
      const backToTopBtn = document.getElementById('back-to-top-btn');
      if (backToTopBtn) backToTopBtn.classList.toggle('visible', scrollY > 400);

      scrollTicking = false;
    });
    scrollTicking = true;
  }
}
window.addEventListener('scroll', onScroll, { passive: true });

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
  threshold: 0,
  rootMargin: '0px 0px -50px 0px'
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
const skillsSection = document.getElementById('skills-main') || document.getElementById('skills');
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
// All modern browsers support the native loading="lazy" attribute natively.

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
      icon.setAttribute('aria-expanded', 'false');
    }
  }
});

// ===== ADD HOVER EFFECT TO PROJECT CARDS =====
// Hover effects are handled by CSS - no JavaScript needed

// ===== CONSOLE MESSAGE =====
console.log('%cWelcome to Muntasir\'s Portfolio!', 'color: #2c3e50; font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code? Check it out on GitHub!', 'color: #3498db; font-size: 14px;');
console.log('%chttps://github.com/Muntasir-Mamun7', 'color: #34495e; font-size: 12px;');

// ===== CERTIFICATE GALLERY MODAL =====
const certificateItems = document.querySelectorAll('.certificate-gallery-item');
certificateItems.forEach(item => {
  item.addEventListener('click', function() {
    const img = this.querySelector('img');
    const modal = document.createElement('div');
    modal.className = 'certificate-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Certificate image');
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'certificate-modal-content';
    
    const modalImg = document.createElement('img');
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close certificate');
    closeBtn.style.cssText = 'position: absolute; top: 20px; right: 40px; color: #fff; font-size: 50px; font-weight: bold; cursor: pointer; z-index: 10001; background: none; border: none; line-height: 1;';
    
    modalContent.appendChild(modalImg);
    modal.appendChild(closeBtn);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Trap focus inside the modal
    const focusableElements = [closeBtn];
    closeBtn.focus();

    const trapFocus = (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        closeBtn.focus();
      }
    };
    modal.addEventListener('keydown', trapFocus);
    
    const closeModal = (e) => {
      if (e) e.stopPropagation();
      modal.removeEventListener('keydown', trapFocus);
      modal.style.opacity = '0';
      setTimeout(() => {
        if (document.body.contains(modal)) document.body.removeChild(modal);
      }, 300);
    };

    // Close modal on backdrop click (but not on image click)
    modal.addEventListener('click', function(e) {
      if (e.target === modal) closeModal(e);
    });

    closeBtn.addEventListener('click', closeModal);

    // Close on Escape key
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
  });
});

// ===== HERO SECTION COUNTER ANIMATION =====
function animateCounter(element, target, duration = 2000) {
  let start = null;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    element.textContent = Math.floor(progress * target);
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      element.textContent = target;
    }
  };
  requestAnimationFrame(step);
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
// Parallax effect is handled in the unified scroll handler above

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
  threshold: 0,
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

// ===== ABOUT PAGE (dedicated page) ANIMATIONS =====
// On about.html there is no #about-home, so trigger animations per section
if (!document.getElementById('about-home')) {
  const aboutPageSections = document.querySelectorAll(
    '#about, #about-research, #about-academics, #about-leadership, #about-skills-section, #about-connect'
  );
  const aboutPageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.info-card').forEach(el => el.classList.add('visible'));
        entry.target.querySelectorAll('.about-details').forEach(el => el.classList.add('visible'));
        entry.target.querySelectorAll('.skill-tag').forEach(el => el.classList.add('visible'));
        aboutPageObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  aboutPageSections.forEach(sec => aboutPageObserver.observe(sec));
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


// WeChat QR code image fallback
const wechatQrImg = document.getElementById('wechat-qr-img');
const wechatQrFallback = document.getElementById('wechat-qr-fallback');
if (wechatQrImg && wechatQrFallback) {
  wechatQrImg.addEventListener('error', function () {
    wechatQrImg.style.display = 'none';
    wechatQrFallback.style.display = 'block';
  });
}

// ===== WECHAT POPUP - MOBILE TOUCH SUPPORT =====
// CSS :hover doesn't trigger on touch devices, so toggle the popup on click/tap
(function () {
  const wechatCard = document.querySelector('.wechat-card');
  if (!wechatCard) return;
  const wechatPopup = wechatCard.querySelector('.wechat-qr-popup');
  if (!wechatPopup) return;

  // Toggle popup open/closed on click (works on both mouse and touch)
  wechatCard.addEventListener('click', function (e) {
    e.stopPropagation();
    const isVisible = wechatPopup.style.display === 'block';
    wechatPopup.style.display = isVisible ? '' : 'block';
  });

  // Close popup when clicking anywhere else on the page
  document.addEventListener('click', function () {
    wechatPopup.style.display = '';
  });
}());

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const statusEl = document.getElementById('form-status');
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    const subject = `Portfolio Contact from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    window.location.href = `mailto:munmamun9@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (statusEl) statusEl.textContent = '✓ Opening your email client…';
  });
}

// ===== BACK TO TOP BUTTON =====
(function () {
  const btn = document.createElement('button');
  btn.id = 'back-to-top-btn';
  btn.setAttribute('aria-label', 'Back to top');
  btn.setAttribute('title', 'Back to top');
  btn.innerHTML = '<i class="bi bi-arrow-up-short"></i>';
  document.body.appendChild(btn);

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}());

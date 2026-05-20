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
// Close the details popup when clicking outside or pressing Escape
(function () {
  const wechatCard = document.querySelector('.wechat-card');
  if (!wechatCard || wechatCard.tagName !== 'DETAILS') return;

  document.addEventListener('click', function (e) {
    if (!wechatCard.contains(e.target)) {
      wechatCard.removeAttribute('open');
    }
  });

  wechatCard.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      wechatCard.removeAttribute('open');
    }
  });
}());

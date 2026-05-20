/* ===== MULTI-LANGUAGE TRANSLATION ENGINE ===== */

const languages = [
  { code: 'en', label: 'English',   flag: '🇬🇧', dir: 'ltr' },
  { code: 'zh', label: '中文',       flag: '🇨🇳', dir: 'ltr' },
  { code: 'hi', label: 'हिन्दी',    flag: '🇮🇳', dir: 'ltr' },
  { code: 'es', label: 'Español',    flag: '🇪🇸', dir: 'ltr' },
  { code: 'fr', label: 'Français',   flag: '🇫🇷', dir: 'ltr' },
  { code: 'ar', label: 'العربية',    flag: '🇸🇦', dir: 'rtl' },
  { code: 'bn', label: 'বাংলা',     flag: '🇧🇩', dir: 'ltr' },
  { code: 'pt', label: 'Português',  flag: '🇧🇷', dir: 'ltr' },
  { code: 'ru', label: 'Русский',    flag: '🇷🇺', dir: 'ltr' },
  { code: 'ja', label: '日本語',     flag: '🇯🇵', dir: 'ltr' },
];

// Build a lookup map for quick access
let translations = null;
let dictionaryLoadPromise = null;

const langMap = {};
languages.forEach(l => { langMap[l.code] = l; });

function ensureTranslationsLoaded() {
  if (translations) return Promise.resolve(translations);
  if (window.__PORTFOLIO_TRANSLATIONS__) {
    translations = window.__PORTFOLIO_TRANSLATIONS__;
    return Promise.resolve(translations);
  }
  if (dictionaryLoadPromise) return dictionaryLoadPromise;

  dictionaryLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'translator.dictionary.js';
    script.defer = true;
    script.onload = () => {
      translations = window.__PORTFOLIO_TRANSLATIONS__ || null;
      if (translations) {
        resolve(translations);
      } else {
        reject(new Error('Translation dictionary failed to initialize.'));
      }
    };
    script.onerror = () => reject(new Error('Failed to load translation dictionary script.'));
    document.body.appendChild(script);
  });

  return dictionaryLoadPromise;
}

// ===== INJECT LANGUAGE SWITCHER UI =====
function createLangSwitcherHTML(suffix) {
  return `<div class="lang-switcher" id="lang-switcher-${suffix}">
      <button class="lang-btn" id="lang-btn-${suffix}" aria-label="Change language" title="Change language">
        <i class="bi bi-globe2"></i>
        <span class="lang-code">EN</span>
      </button>
      <div class="lang-dropdown" id="lang-dropdown-${suffix}" role="listbox" aria-label="Select language">
        <div class="lang-option" data-lang="en" role="option">🇬🇧 English</div>
        <div class="lang-option" data-lang="zh" role="option">🇨🇳 中文</div>
        <div class="lang-option" data-lang="hi" role="option">🇮🇳 हिन्दी</div>
        <div class="lang-option" data-lang="es" role="option">🇪🇸 Español</div>
        <div class="lang-option" data-lang="fr" role="option">🇫🇷 Français</div>
        <div class="lang-option" data-lang="ar" role="option">🇸🇦 العربية</div>
        <div class="lang-option" data-lang="bn" role="option">🇧🇩 বাংলা</div>
        <div class="lang-option" data-lang="pt" role="option">🇧🇷 Português</div>
        <div class="lang-option" data-lang="ru" role="option">🇷🇺 Русский</div>
        <div class="lang-option" data-lang="ja" role="option">🇯🇵 日本語</div>
      </div>
    </div>`;
}

function injectLangSwitchers() {
  // Desktop nav: append after theme button inside .theme-toggle
  const desktopThemeToggle = document.querySelector('#desktop-nav .theme-toggle');
  if (desktopThemeToggle) {
    const div = document.createElement('div');
    div.innerHTML = createLangSwitcherHTML('desktop');
    desktopThemeToggle.appendChild(div.firstElementChild);
  }

  // Hamburger nav: insert before .hamburger-menu inside .nav-right
  const navRight = document.querySelector('#hamburger-nav .nav-right');
  const hamburgerMenu = document.querySelector('#hamburger-nav .hamburger-menu');
  if (navRight && hamburgerMenu) {
    const div = document.createElement('div');
    div.innerHTML = createLangSwitcherHTML('mobile');
    navRight.insertBefore(div.firstElementChild, hamburgerMenu);
  }

  // Attach event listeners to both switchers
  ['desktop', 'mobile'].forEach(suffix => {
    const btn = document.getElementById(`lang-btn-${suffix}`);
    const switcher = document.getElementById(`lang-switcher-${suffix}`);
    const dropdown = document.getElementById(`lang-dropdown-${suffix}`);
    if (!btn || !switcher || !dropdown) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = switcher.classList.contains('open');
      // Close all open dropdowns first
      document.querySelectorAll('.lang-switcher.open').forEach(s => s.classList.remove('open'));
      if (!isOpen) switcher.classList.add('open');
    });

    dropdown.addEventListener('click', (e) => {
      const option = e.target.closest('.lang-option');
      if (!option) return;
      const lang = option.dataset.lang;
      if (lang) {
        switchLanguage(lang);
        document.querySelectorAll('.lang-switcher.open').forEach(s => s.classList.remove('open'));
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', () => {
    document.querySelectorAll('.lang-switcher.open').forEach(s => s.classList.remove('open'));
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.lang-switcher.open').forEach(s => s.classList.remove('open'));
    }
  });
}

function resolveTranslation(key, lang, year) {
  if (!translations) return null;
  const entry = translations[key];
  if (!entry || !entry[lang]) return null;
  let value = entry[lang];
  if (value.includes('{year}') && year !== undefined) {
    value = value.replace('{year}', year);
  }
  return value;
}

// ===== APPLY TRANSLATIONS =====
function applyTranslation(lang) {
  const langData = langMap[lang] || langMap['en'];
  const currentYear = new Date().getFullYear();

  // Set document language and direction
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', langData.dir);

  // Translate all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = resolveTranslation(key, lang, currentYear);
    if (value) {
      el.textContent = value;
    }
  });

  // Translate data-i18n-html elements (innerHTML)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    const value = resolveTranslation(key, lang, currentYear);
    if (value) {
      el.innerHTML = value;
    }
  });

  // Translate placeholder attributes
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const value = resolveTranslation(key, lang, currentYear);
    if (value) {
      el.placeholder = value;
    }
  });

  // Translate aria-label attributes
  document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria-label');
    const value = resolveTranslation(key, lang, currentYear);
    if (value) {
      el.setAttribute('aria-label', value);
    }
  });

  // Update lang-code display and active state in all switchers
  const langCode = lang.toUpperCase();
  document.querySelectorAll('.lang-code').forEach(el => {
    el.textContent = langCode;
  });

  document.querySelectorAll('.lang-option').forEach(el => {
    el.classList.toggle('active', el.dataset.lang === lang);
  });
}

// ===== SWITCH LANGUAGE WITH ANIMATION =====
async function switchLanguage(lang) {
  document.body.classList.add('lang-switching');
  try {
    await ensureTranslationsLoaded();
    setTimeout(() => {
      applyTranslation(lang);
      localStorage.setItem('lang', lang);
      setTimeout(() => {
        document.body.classList.remove('lang-switching');
      }, 10);
    }, 200);
  } catch (error) {
    console.warn('Unable to load translations:', error);
    document.body.classList.remove('lang-switching');
  }
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', async () => {
  injectLangSwitchers();
  const savedLang = localStorage.getItem('lang') || 'en';

  if (savedLang !== 'en') {
    try {
      await ensureTranslationsLoaded();
      applyTranslation(savedLang);
    } catch (error) {
      console.warn('Unable to apply saved translation:', error);
    }
  }
});

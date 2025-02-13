import i18next from 'i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const i18nConfig = {
  fallbackLng: 'en',
  supportedLngs: ['en', 'fr'],
  defaultNS: 'common',
  ns: ['common', 'navigation', 'home'],
  debug: process.env.NODE_ENV === 'development',
  load: 'languageOnly',
  interpolation: {
    escapeValue: false
  },
  detection: {
    order: ['querystring', 'cookie', 'localStorage', 'navigator'],
    lookupCookie: 'i18next',
    lookupLocalStorage: 'i18nextLng',
    caches: ['localStorage', 'cookie']
  },
  backend: {
    loadPath: '/translations/{{lng}}/{{ns}}.json',
  }
};

class I18nManager {
  static async initialize() {
    await i18next
      .use(HttpBackend)
      .use(LanguageDetector)
      .init(i18nConfig);
    
    this.updateContent();
    this.setupLanguageSwitcher();
    this.updateHtmlLang();
  }

  static updateContent() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const keys = element.getAttribute('data-i18n').split(',');
      const options = {};

      keys.forEach(key => {
        const [keyName, keyValue] = key.split(':');
        if (keyValue) {
          element.setAttribute(keyName, i18next.t(keyValue.trim()));
        } else {
          element.innerHTML = i18next.t(keyName.trim());
        }
      });
    });
  }

  static setupLanguageSwitcher() {
    const switcherContainer = document.querySelector('.lang-switcher');
    i18nConfig.supportedLngs.forEach(lng => {
      const btn = document.getElementById(`btn-${lng}`);
      if (btn) {
        btn.addEventListener('click', () => this.switchLanguage(lng));
        this.updateButtonState(btn, lng);
      }
    });
  }

  static async switchLanguage(lng) {
    try {
      document.documentElement.classList.add('loading');
      await i18next.changeLanguage(lng);
      this.updateContent();
      this.updateHtmlLang();
      this.updateButtonStates();
      document.documentElement.classList.remove('loading');
    } catch (err) {
      console.error('Language switch failed:', err);
    }
  }

  static updateHtmlLang() {
    document.documentElement.lang = i18next.language;
  }

  static updateButtonStates() {
    i18nConfig.supportedLngs.forEach(lng => {
      const btn = document.getElementById(`btn-${lng}`);
      if (btn) this.updateButtonState(btn, lng);
    });
  }

  static updateButtonState(btn, lng) {
    btn.classList.toggle('active', i18next.language === lng);
    btn.setAttribute('aria-pressed', i18next.language === lng);
  }
}

export default I18nManager;
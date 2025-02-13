const i18next = require('i18next');
const Backend = require('i18next-http-backend');
const LanguageDetector = require('i18next-browser-languagedetector');

i18next
  .use(Backend)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false
    },
    backend: {
      loadPath: '/src/_data/locales/{{lng}}.json'
    },
    resources: {
      en: {
        translation: require('../_data/locales/en.json')
      },
      fr: {
        translation: require('../_data/locales/fr.json')
      }
    }
  });

module.exports = i18next;

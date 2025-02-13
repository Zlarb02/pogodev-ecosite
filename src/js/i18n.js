import i18next from 'i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
  .use(HttpBackend)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    },
    backend: {
      loadPath: '/translations/{{lng}}.json'
    }
  });

export default i18next;
const i18nConfig = {
  fallbackLng: 'en',
  supportedLngs: ['en', 'fr'],
  defaultNS: 'common',
  ns: ['common'],
  debug: false,
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
      loadPath: '/locales/{{lng}}/{{ns}}.json',
  }
};

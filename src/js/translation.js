import i18next from './i18n.js';

function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.innerHTML = i18next.t(key);
  });
}

function switchLanguage(lng) {
  i18next.changeLanguage(lng, () => {
    updateContent();
  });
}

i18next.on('languageChanged', () => {
  updateContent();
});

document.addEventListener('DOMContentLoaded', () => {
  updateContent();
});

export { switchLanguage };

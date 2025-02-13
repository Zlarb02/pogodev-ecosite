const I18nManager = {
    async initialize() {
        try {
            await i18next
                .use(i18nextHttpBackend)
                .use(i18nextBrowserLanguageDetector)
                .init(i18nConfig);
            
            this.updateContent();
            this.setupLanguageSwitcher();
            this.updateHtmlLang();
        } catch (error) {
            console.error('i18n initialization failed:', error);
        }
    },

    updateContent() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.innerHTML = i18next.t(key);
        });
    },

    setupLanguageSwitcher() {
        const buttons = document.querySelectorAll('.lang-switcher button');
        buttons.forEach(btn => {
            const lang = btn.id.replace('btn-', '');
            btn.setAttribute('data-lang', lang);
            btn.addEventListener('click', () => this.switchLanguage(lang));
            this.updateButtonState(btn, lang);
        });
    },

    async switchLanguage(lng) {
        document.documentElement.classList.add('loading');
        try {
            await i18next.changeLanguage(lng);
            this.updateContent();
            this.updateHtmlLang();
            this.updateButtonStates();
        } finally {
            document.documentElement.classList.remove('loading');
        }
    },

    updateHtmlLang() {
        document.documentElement.lang = i18next.language;
    },

    updateButtonStates() {
        document.querySelectorAll('.lang-switcher button').forEach(btn => {
            const lang = btn.getAttribute('data-lang');
            this.updateButtonState(btn, lang);
        });
    },

    updateButtonState(btn, lang) {
        btn.classList.toggle('active', i18next.language === lang);
    }
};
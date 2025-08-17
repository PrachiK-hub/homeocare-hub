import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import hi from './locales/hi.json';
import gu from './locales/gu.json';

// Custom language detector for localStorage
const localStorageDetector = {
  name: 'localStorage',
  lookup() {
    return localStorage.getItem('lang') || 'en';
  },
  cacheUserLanguage(lng: string) {
    localStorage.setItem('lang', lng);
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      gu: { translation: gu },
    },
    fallbackLng: 'en',
    debug: false,
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

// Add custom detector
i18n.services.languageDetector.addDetector(localStorageDetector);

export default i18n;
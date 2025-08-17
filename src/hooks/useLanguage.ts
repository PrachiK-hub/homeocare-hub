import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const useLanguage = () => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const languages = [
    { code: 'en', label: 'English', name: 'English' },
    { code: 'hi', label: 'हिंदी', name: 'Hindi' },
    { code: 'gu', label: 'ગુજરાતી', name: 'Gujarati' },
  ];

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') || 'en';
    setCurrentLanguage(savedLang);
    i18n.changeLanguage(savedLang);
  }, [i18n]);

  const changeLanguage = (langCode: string) => {
    setCurrentLanguage(langCode);
    i18n.changeLanguage(langCode);
    localStorage.setItem('lang', langCode);
  };

  const toggleLanguage = () => {
    const currentIndex = languages.findIndex(lang => lang.code === currentLanguage);
    const nextIndex = (currentIndex + 1) % languages.length;
    changeLanguage(languages[nextIndex].code);
  };

  return {
    currentLanguage,
    languages,
    changeLanguage,
    toggleLanguage,
  };
};

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './en.json';
import bikTranslation from './bik.json';
import tagTranslation from './tag.json';


const resources = {
  en: { translation: enTranslation },
  bik: { translation: bikTranslation },
  tag: { translation: tagTranslation },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', 
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

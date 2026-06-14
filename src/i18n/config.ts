import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enCommon from './locales/en/common.json';
import faCommon from './locales/fa/common.json';

export const defaultNS = 'common';
export const resources = {
  en: { common: enCommon },
  fa: { common: faCommon },
} as const;

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'en',
      fallbackLng: 'en',
      defaultNS,
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
}

export default i18n;
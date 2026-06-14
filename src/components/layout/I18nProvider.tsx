'use client';

import React, { useEffect } from 'react';
import '@/i18n/config';
import { useAppSelector } from '@/store';
import { selectLanguage } from '@/store';
import i18n from '@/i18n/config';


export function I18nProvider({ children }: { children: React.ReactNode }) {
  const language = useAppSelector(selectLanguage);

  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return <>{children}</>;
}
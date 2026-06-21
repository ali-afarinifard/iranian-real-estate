'use client';

import React, { useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import createCache from '@emotion/cache'; 
import { CacheProvider } from '@emotion/react';
import { useAppSelector, selectColorMode } from '@/store';
import { createIrAmlakTheme } from './theme';

const emotionCache = createCache({ key: 'mui', prepend: true });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const colorMode = useAppSelector(selectColorMode);
  const theme = useMemo(() => createIrAmlakTheme(colorMode), [colorMode]);

  return (
    <CacheProvider value={emotionCache}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </CacheProvider>
  );
}
'use client';

import React, { useState, useEffect } from 'react';
import {
  Box, Paper, Typography, Button, IconButton,
  Slide, useTheme, alpha,
} from '@mui/material';
import {
  CloseRounded, GetAppRounded, HomeRounded,
} from '@mui/icons-material';
import { usePWAInstall } from '@/hooks/use-pwa-install';

export function PWAInstallBanner() {
  const { isInstallable, isInstalled, promptInstall } = usePWAInstall();
  const [dismissed, setDismissed] = useState(true);
  const [visible, setVisible] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const wasDismissed = sessionStorage.getItem('pwa-banner-dismissed') === 'true';
    if (wasDismissed || isInstalled) return;
    setDismissed(false);

    const timer = setTimeout(() => {
      if (isInstallable) setVisible(true);
    }, 30_000);

    return () => clearTimeout(timer);
  }, [isInstallable, isInstalled]);

  useEffect(() => {
    if (isInstallable && !dismissed) setVisible(true);
  }, [isInstallable, dismissed]);

  const handleDismiss = () => {
    setVisible(false);
    sessionStorage.setItem('pwa-banner-dismissed', 'true');
  };

  const handleInstall = async () => {
    const accepted = await promptInstall();
    if (accepted) setVisible(false);
  };

  if (dismissed || isInstalled || !isInstallable) return null;

  return (
    <Slide direction="up" in={visible} mountOnEnter unmountOnExit>
      <Paper
        elevation={8}
        sx={{
          position: 'fixed',
          bottom: { xs: 16, md: 24 },
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9998,
          width: { xs: 'calc(100vw - 32px)', sm: 420 },
          p: 2.5,
          borderRadius: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          bgcolor: 'background.paper',
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <HomeRounded sx={{ color: '#fff', fontSize: 24 }} />
        </Box>

        {/* Text */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="subtitle2" fontWeight={700} noWrap>
            Install Iranian Amlak
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            Add to home screen for quick access
          </Typography>
        </Box>

        {/* Actions */}
        <Button
          variant="contained"
          size="small"
          startIcon={<GetAppRounded />}
          onClick={handleInstall}
          sx={{ flexShrink: 0 }}
        >
          Install
        </Button>

        <IconButton size="small" onClick={handleDismiss} sx={{ flexShrink: 0 }}>
          <CloseRounded fontSize="small" />
        </IconButton>
      </Paper>
    </Slide>
  );
}

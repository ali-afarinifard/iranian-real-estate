'use client';

import React from 'react';
import {
  Box, Typography, Chip, Button, Stack, IconButton,
  Divider, useTheme, alpha,
} from '@mui/material';
import {
  CloseRounded, BedRounded, SquareFootRounded, LocationOnRounded,
  ArrowForwardRounded, FavoriteRounded, FavoriteBorderRounded, PhoneRounded,
} from '@mui/icons-material';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { useAppDispatch, useAppSelector, selectIsFavorited } from '@/store';
import { favoritesActions, uiActions } from '@/store/slices';
import { formatPrice } from '@/lib/utils';
import type { MapProperty } from '@/store/api/propertiesApi';

interface MapPropertyPanelProps {
  property: MapProperty;
  onClose: () => void;
  mobile?: boolean;
}

export function MapPropertyPanel({ property, onClose, mobile = false }: MapPropertyPanelProps) {
  const theme    = useTheme();
  const dispatch = useAppDispatch();
  const isFav    = useAppSelector(selectIsFavorited(property.id));
  const isSale   = property.listingType === 'sale';

  const handleFav = () => {
    dispatch(favoritesActions.toggleFavorite(property.id));
    dispatch(uiActions.addNotification({
      type:     isFav ? 'info' : 'success',
      title:    isFav ? 'Removed from saved' : 'Saved to favorites',
      duration: 2500,
    }));
  };

  return (
    <Box sx={{
      width:      mobile ? '100%' : 380,
      height:     mobile ? 'auto' : '100%',
      bgcolor:    'background.paper',
      display:    'flex',
      flexDirection: 'column',
      borderLeft: mobile ? 'none' : `1px solid ${theme.palette.divider}`,
      overflow:   'hidden',
    }}>

      {/* Hero image */}
      <Box sx={{ position: 'relative', height: 240, flexShrink: 0 }}>
        <NextImage
          src={property.primaryImage.url}
          alt={property.primaryImage.alt}
          fill
          sizes="380px"
          style={{ objectFit: 'cover' }}
        />
        <Box sx={{
          position:   'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)',
        }} />

        {/* Close + Favorite */}
        <Box sx={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 1 }}>
          <IconButton
            size="small"
            onClick={handleFav}
            sx={{
              bgcolor: alpha('#000', 0.4),
              color:   isFav ? '#EF4444' : '#fff',
              '&:hover': { bgcolor: alpha('#000', 0.6) },
            }}
          >
            {isFav
              ? <FavoriteRounded fontSize="small" />
              : <FavoriteBorderRounded fontSize="small" />
            }
          </IconButton>
          <IconButton
            size="small"
            onClick={onClose}
            sx={{ bgcolor: alpha('#000', 0.4), color: '#fff', '&:hover': { bgcolor: alpha('#000', 0.6) } }}
          >
            <CloseRounded fontSize="small" />
          </IconButton>
        </Box>

        {/* Badges + price */}
        <Box sx={{ position: 'absolute', bottom: 16, left: 16 }}>
          <Stack direction="row" spacing={0.75} sx={{ mb: 1 }}>
            <Chip
              label={isSale ? 'For Sale' : 'For Rent'}
              size="small"
              sx={{ bgcolor: isSale ? '#1463C7' : '#F97316', color: '#fff', fontWeight: 700 }}
            />
            <Chip
              label={property.type}
              size="small"
              sx={{ bgcolor: alpha('#fff', 0.2), color: '#fff', fontWeight: 600, textTransform: 'capitalize' }}
            />
          </Stack>
          <Typography variant="h4" fontWeight={900} sx={{ color: '#fff', lineHeight: 1.1 }}>
            {formatPrice(property.price, property.currency as 'EUR')}
            {!isSale && (
              <Typography component="span" variant="body2" sx={{ color: 'rgba(255,255,255,0.75)', ml: 0.75 }}>
                /month
              </Typography>
            )}
          </Typography>
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 2.5 }}>

        <Typography variant="h6" fontWeight={800} sx={{ mb: 0.5, lineHeight: 1.3 }}>
          {property.title}
        </Typography>

        {/* Stats row */}
        <Stack
          direction="row"
          spacing={0}
          sx={{
            mt: 2, mb: 2.5,
            bgcolor:      'action.hover',
            borderRadius: 2.5,
            overflow:     'hidden',
          }}
        >
          {property.bedrooms > 0 && (
            <Box sx={{ flex: 1, py: 1.5, textAlign: 'center', borderRight: '1px solid', borderColor: 'divider' }}>
              <BedRounded sx={{ fontSize: 20, color: 'primary.main', display: 'block', mx: 'auto', mb: 0.25 }} />
              <Typography variant="caption" color="text.secondary" display="block">Beds</Typography>
              <Typography variant="subtitle2" fontWeight={800}>{property.bedrooms}</Typography>
            </Box>
          )}
          <Box sx={{
            flex: 1, py: 1.5, textAlign: 'center',
            borderRight: property.bedrooms > 0 ? '1px solid' : 'none',
            borderColor: 'divider',
          }}>
            <SquareFootRounded sx={{ fontSize: 20, color: 'primary.main', display: 'block', mx: 'auto', mb: 0.25 }} />
            <Typography variant="caption" color="text.secondary" display="block">Area</Typography>
            <Typography variant="subtitle2" fontWeight={800}>{property.area}m²</Typography>
          </Box>
          <Box sx={{ flex: 1, py: 1.5, textAlign: 'center' }}>
            <LocationOnRounded sx={{ fontSize: 20, color: 'primary.main', display: 'block', mx: 'auto', mb: 0.25 }} />
            <Typography variant="caption" color="text.secondary" display="block">Type</Typography>
            <Typography variant="subtitle2" fontWeight={800} sx={{ textTransform: 'capitalize' }}>
              {property.type}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ mb: 2.5 }} />

        {/* CTA buttons */}
        <Stack spacing={1.5}>
          <Button
            component={NextLink}
            href={`/property/${property.id}`}
            variant="contained"
            fullWidth
            size="large"
            endIcon={<ArrowForwardRounded />}
            sx={{ borderRadius: 2.5, py: 1.5, fontWeight: 700 }}
          >
            View Full Details
          </Button>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<PhoneRounded />}
            sx={{ borderRadius: 2.5 }}
          >
            Contact Agent
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
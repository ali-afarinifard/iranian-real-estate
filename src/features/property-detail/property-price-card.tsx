"use client";
import React from "react";
import { Button, Paper, Stack, Tooltip, Typography } from "@mui/material";
import {
  FavoriteBorderRounded,
  FavoriteRounded,
  PhoneRounded,
  ShareRounded,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector, selectIsFavorited } from "@/store";
import { favoritesActions, uiActions } from "@/store/slices";
import { formatTomanPrice } from "@/lib/localize";
import type { IProperty, Language } from "@/types";
import { useTranslation } from "react-i18next";

interface IPropertyPriceCardProps {
  property: IProperty;
}

export function PropertyPriceCard({ property }: IPropertyPriceCardProps) {
  const dispatch = useAppDispatch();
  const isFavorited = useAppSelector(selectIsFavorited(property.id));
  const { t, i18n } = useTranslation();
  const isRent = property.listingType === "rent";
  const lang = i18n.language as Language;

  const handleFavorite = () => {
    dispatch(favoritesActions.toggleFavorite(property.id));
    dispatch(
      uiActions.addNotification({
        type: isFavorited ? "info" : "success",
        title: isFavorited ? "Removed from saved" : "Saved to favorites",
        duration: 2500,
      }),
    );
  };

  return (
    <Paper
      elevation={3}
      sx={{ p: 3, borderRadius: 3, mb: 3 }}
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Typography variant="h3" fontWeight={900} color="primary.main">
        {formatTomanPrice(property.price, lang)}
        {isRent && (
          <Typography component="span" variant="h6" color="text.secondary">
            {" "}
            / {t("property.perMonth")}
          </Typography>
        )}
      </Typography>
      {property.pricePerSqm && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {formatTomanPrice(property.pricePerSqm, lang)} / m²
        </Typography>
      )}
      <Stack spacing={1.5}>
        <Button
          variant="contained"
          size="large"
          fullWidth
          startIcon={<PhoneRounded />}
          sx={{
            "& .MuiButton-startIcon": {
              "[dir='rtl'] &": {
                marginRight: "-2px",
                marginLeft: "6px",
              },
            },
          }}
        >
          {t("property.requestViewing")}
        </Button>
        <Button
          variant="outlined"
          size="large"
          fullWidth
          startIcon={
            isFavorited ? (
              <FavoriteRounded color="error" />
            ) : (
              <FavoriteBorderRounded />
            )
          }
          onClick={handleFavorite}
          color={isFavorited ? "error" : "primary"}
          sx={{
            "& .MuiButton-startIcon": {
              "[dir='rtl'] &": {
                marginRight: "-2px",
                marginLeft: "6px",
              },
            },
          }}
        >
          {isFavorited ? t("nav.saved") : t("property.saveProperty")}
        </Button>
        <Tooltip title="Share this listing">
          <Button
            variant="text"
            size="small"
            startIcon={<ShareRounded />}
            color="inherit"
            sx={{
              "& .MuiButton-startIcon": {
                "[dir='rtl'] &": {
                  marginRight: "-2px",
                  marginLeft: "6px",
                },
              },
            }}
          >
            {t("property.shareProperty")}
          </Button>
        </Tooltip>
      </Stack>
    </Paper>
  );
}

"use client";

import React, { useState, useMemo, memo } from "react";
import NextLink from "next/link";
import NextImage from "next/image";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Stack,
  alpha,
  useTheme,
} from "@mui/material";
import {
  FavoriteRounded,
  FavoriteBorderRounded,
  BedRounded,
  BathtubRounded,
  SquareFootRounded,
  LocationOnRounded,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { formatArea } from "@/lib/utils";
import { formatTomanPrice, toPersianDigits } from "@/lib/localize";
import { TYPE_LABEL_KEYS, CARD_IMAGE_SIZES } from "./property-card.constants";
import type { IPropertyCardProps } from "./types/property-card.types";
import type { Language } from "@/types";
import { useLocalize } from "@/hooks/use-localize";

function getTransition(index: number) {
  return { delay: index * 0.04, duration: 0.3 };
}

export const PropertyCardList = memo(function PropertyCardList({
  property,
  index = 0,
  onSelect,
  isFavorited,
  onFavorite,
}: IPropertyCardProps & {
  isFavorited: boolean;
  onFavorite: (e: React.MouseEvent) => void;
}) {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const localize = useLocalize();
  const [imgLoaded, setImgLoaded] = useState(false);

  const isRTL = i18n.dir() === "rtl";
  const lang = i18n.language as Language;

  const formattedPrice = useMemo(
    () => formatTomanPrice(property.price, lang),
    [property.price, lang],
  );

  const formattedArea = useMemo(
    () => formatArea(property.area),
    [property.area],
  );

  const typeLabel = useMemo(
    () => String(t(TYPE_LABEL_KEYS[property.type] ?? "", property.type)),
    [property.type, t],
  );

  const localizedTitle = localize(property.title);
  const imageAlt = property.primaryImage.alt || localizedTitle;
  const transition = useMemo(() => getTransition(index), [index]);

  const forSaleLabel = t("property.forSale");
  const forRentLabel = t("property.forRent");
  const favoriteAriaLabel = isFavorited
    ? t("property.removedFromFavorites")
    : t("property.savedToFavorites");

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={transition}
    >
      <Card
        component={NextLink}
        href={`/property/${property.slug}`}
        onClick={() => onSelect?.(property.id)}
        aria-label={`${typeLabel} – ${localizedTitle}`}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          textDecoration: "none",
          color: "inherit",
          height: { sm: 180 },
          overflow: "hidden",
          "&:focus-visible": {
            outline: `2px solid ${theme.palette.primary.main}`,
            outlineOffset: 2,
          },
        }}
      >
        {/* Image */}
        <Box
          sx={{
            position: "relative",
            width: { xs: "100%", sm: 240 },
            flexShrink: 0,
            height: { xs: 200, sm: "auto" },
          }}
        >
          <NextImage
            src={property.primaryImage.url}
            alt={imageAlt}
            fill
            sizes={CARD_IMAGE_SIZES.list}
            style={{ objectFit: "cover" }}
            onLoad={() => setImgLoaded(true)}
          />
          {!imgLoaded && (
            <Box
              aria-hidden="true"
              sx={{
                position: "absolute",
                inset: 0,
                bgcolor: "action.hover",
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
          )}

          <Box
            aria-hidden="true"
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              display: "flex",
              gap: 0.5,
            }}
          >
            <Chip
              label={
                property.listingType === "sale" ? forSaleLabel : forRentLabel
              }
              size="small"
              sx={{
                bgcolor:
                  property.listingType === "sale"
                    ? alpha(theme.palette.primary.main, 0.9)
                    : alpha(theme.palette.secondary.main, 0.9),
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.7rem",
              }}
            />
            {property.isNew && (
              <Chip
                label={t("property.new")}
                size="small"
                color="success"
                sx={{ fontWeight: 700, fontSize: "0.7rem" }}
              />
            )}
          </Box>
        </Box>

        {/* Content */}
        <CardContent
          sx={{
            flex: 1,
            p: 2.5,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Box>
              <Typography
                variant="overline"
                color="primary.main"
                component="p"
                sx={{ lineHeight: 1.2 }}
              >
                {typeLabel}
              </Typography>
              <Typography
                variant="h6"
                fontWeight={700}
                component="h3"
                sx={{ lineHeight: 1.3, mt: 0.25 }}
              >
                {localizedTitle}
              </Typography>
            </Box>
            <Box onClick={(e) => e.preventDefault()}>
              {" "}
              <Tooltip title={favoriteAriaLabel}>
                <IconButton
                  size="small"
                  onClick={onFavorite}
                  aria-label={favoriteAriaLabel}
                  sx={{ ml: 1 }}
                >
                  {isFavorited ? (
                    <FavoriteRounded color="error" fontSize="small" />
                  ) : (
                    <FavoriteBorderRounded fontSize="small" />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <LocationOnRounded
              sx={{ fontSize: 14, color: "text.secondary" }}
              aria-hidden="true"
            />
            <Typography variant="caption" color="text.secondary">
              {localize(property.location.district)},{" "}
              {localize(property.location.city)}
            </Typography>
          </Box>

          <Stack
            component="dl"
            direction="row"
            gap={2}
            sx={{ mt: "auto", m: 0 }}
          >
            {property.bedrooms > 0 && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <BedRounded
                  sx={{ fontSize: 16, color: "text.secondary" }}
                  aria-hidden="true"
                />
                <Typography
                  component="dd"
                  variant="caption"
                  color="text.secondary"
                  aria-label={`${property.bedrooms} ${t("property.bedrooms")}`}
                >
                  {isRTL
                    ? toPersianDigits(property.bedrooms)
                    : property.bedrooms}{" "}
                  {t("property.bedrooms")}
                </Typography>
              </Box>
            )}
            {property.bathrooms > 0 && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <BathtubRounded
                  sx={{ fontSize: 16, color: "text.secondary" }}
                  aria-hidden="true"
                />
                <Typography
                  component="dd"
                  variant="caption"
                  color="text.secondary"
                  aria-label={`${property.bathrooms} ${t("property.bathrooms")}`}
                >
                  {isRTL
                    ? toPersianDigits(property.bathrooms)
                    : property.bathrooms}{" "}
                  {t("property.bathrooms")}
                </Typography>
              </Box>
            )}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <SquareFootRounded
                sx={{ fontSize: 16, color: "text.secondary" }}
                aria-hidden="true"
              />
              <Typography
                component="dd"
                variant="caption"
                color="text.secondary"
              >
                {isRTL ? toPersianDigits(formattedArea) : formattedArea}
              </Typography>
            </Box>
            <Box sx={{ ml: "auto" }}>
              <Typography
                variant="h5"
                fontWeight={800}
                color="primary.main"
                component="p"
                noWrap
              >
                {formattedPrice}
                {property.listingType === "rent" && (
                  <Typography
                    component="span"
                    variant="caption"
                    color="text.secondary"
                  >
                    {isRTL ? " / ماهانه" : " /mo"}
                  </Typography>
                )}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </motion.article>
  );
});

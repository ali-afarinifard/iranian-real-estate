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
  VerifiedRounded,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { formatPrice, formatArea, timeAgo, toPersianNumber } from "@/lib/utils";
import { TYPE_LABEL_KEYS, CARD_IMAGE_SIZES } from "./property-card.constants";
import type { PropertyCardProps } from "./property-card.types";

const GRID_ANIMATION = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
} as const;

function getTransition(index: number) {
  return {
    delay: index * 0.06,
    duration: 0.35,
    ease: [0.25, 0.46, 0.45, 0.94] as const,
  };
}

export const PropertyCardGrid = memo(function PropertyCardGrid({
  property,
  index = 0,
  onSelect,
  isFavorited,
  onFavorite,
}: PropertyCardProps & {
  isFavorited: boolean;
  onFavorite: (e: React.MouseEvent) => void;
}) {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const [imgLoaded, setImgLoaded] = useState(false);

  const isRTL = i18n.dir() === "rtl";

  const formattedPrice = useMemo(() => {
    const formatted = new Intl.NumberFormat(isRTL ? "fa-IR" : "en-US").format(
      property.price,
    );
    return isRTL ? `${formatted} تومان` : `${formatted} T`;
  }, [property.price, isRTL]);

  const formattedArea = useMemo(
    () => formatArea(property.area),
    [property.area],
  );

  const typeLabel = useMemo(
    () => String(t(TYPE_LABEL_KEYS[property.type] ?? "", property.type)),
    [property.type, t],
  );

  const createdAgo = useMemo(() => {
    if (isRTL) {
      const diffMs =
        new Date().getTime() - new Date(property.createdAt).getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays <= 0) return "امروز";

      if (diffDays < 7) {
        return toPersianNumber(`${diffDays} روز پیش`);
      }

      if (diffDays < 30) {
        const diffWeeks = Math.floor(diffDays / 7);
        return toPersianNumber(`${diffWeeks} هفته پیش`);
      }

      const diffMonths = Math.floor(diffDays / 30);
      return toPersianNumber(`${diffMonths} ماه پیش`);
    }

    return timeAgo(property.createdAt);
  }, [property.createdAt, isRTL]);

  const imageAlt = property.primaryImage.alt || property.title;
  const transition = useMemo(() => getTransition(index), [index]);

  const forSaleLabel = t("property.forSale");
  const forRentLabel = t("property.forRent");
  const savedLabel = t("property.savedToFavorites");
  const removedLabel = t("property.removedFromFavorites");
  const favoriteAriaLabel = isFavorited ? removedLabel : savedLabel;

  return (
    <motion.article {...GRID_ANIMATION} transition={transition}>
      <Card
        component={NextLink}
        href={`/property/${property.slug}`}
        onClick={() => onSelect?.(property.id)}
        aria-label={`${typeLabel} – ${property.title}`}
        sx={{
          textDecoration: "none",
          color: "inherit",
          display: "block",
          height: "100%",
          "&:focus-visible": {
            outline: `2px solid ${theme.palette.primary.main}`,
            outlineOffset: 2,
          },
        }}
      >
        {/* Image */}
        <Box sx={{ position: "relative", height: 220, overflow: "hidden" }}>
          <NextImage
            src={property.primaryImage.url}
            alt={imageAlt}
            fill
            sizes={CARD_IMAGE_SIZES.grid}
            style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
            onLoad={() => setImgLoaded(true)}
          />
          {!imgLoaded && (
            <Box
              aria-hidden="true"
              sx={{ position: "absolute", inset: 0, bgcolor: "action.hover" }}
            />
          )}

          <Box
            aria-hidden="true"
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)",
            }}
          />

          {/* Badges */}
          <Box
            aria-hidden="true"
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              display: "flex",
              gap: 0.75,
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
                    ? alpha(theme.palette.primary.main, 0.92)
                    : alpha(theme.palette.secondary.main, 0.92),
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.7rem",
                backdropFilter: "blur(8px)",
              }}
            />
            {property.isNew && (
              <Chip
                label={t("property.new")}
                size="small"
                sx={{
                  bgcolor: alpha("#22C55E", 0.92),
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "0.7rem",
                }}
              />
            )}
            {property.isFeatured && (
              <Chip
                label={t("property.featured")}
                size="small"
                icon={
                  <VerifiedRounded
                    sx={{
                      fontSize: "12px !important",
                      color: "#fff !important",
                      position: "relative",
                      right: isRTL ? 8 : 0,
                    }}
                  />
                }
                sx={{
                  bgcolor: alpha("#F97316", 0.92),
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "0.7rem",
                }}
              />
            )}
          </Box>

          {/* Favorite */}
          <Box sx={{ position: "absolute", top: 8, right: 8 }}>
            <Tooltip title={favoriteAriaLabel}>
              <IconButton
                size="small"
                onClick={onFavorite}
                aria-label={favoriteAriaLabel}
                sx={{
                  bgcolor: alpha("#000", 0.35),
                  backdropFilter: "blur(8px)",
                  color: isFavorited ? "#ef4444" : "#fff",
                  "&:hover": {
                    bgcolor: alpha("#000", 0.5),
                    transform: "scale(1.1)",
                  },
                  "&:focus-visible": {
                    outline: `2px solid #fff`,
                    outlineOffset: 2,
                  },
                  transition: "all 0.2s",
                }}
              >
                {isFavorited ? (
                  <FavoriteRounded fontSize="small" />
                ) : (
                  <FavoriteBorderRounded fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
          </Box>

          {/* Price */}
          <Box
            sx={{
              position: "absolute",
              bottom: 12,
              left: isRTL ? "undefined" : 12,
              right: isRTL ? 12 : "undefined",
            }}
          >
            <Typography
              variant="h5"
              fontWeight={800}
              component="p"
              sx={{
                color: "#fff",
                textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                direction: isRTL ? "rtl" : "ltr",
              }}
            >
              {isRTL ? toPersianNumber(formattedPrice) : formattedPrice}
              {property.listingType === "rent" && (
                <Typography
                  component="span"
                  variant="caption"
                  sx={{ color: "rgba(255,255,255,0.8)", mx: 0.5 }}
                >
                  {isRTL ? " / ماهانه" : " /mo"}
                </Typography>
              )}
            </Typography>
          </Box>
        </Box>

        {/* Content */}
        <CardContent sx={{ p: 2, pb: "16px !important" }}>
          <Typography
            variant="overline"
            color="primary.main"
            component="p"
            sx={{ lineHeight: 1, fontSize: "12px" }}
          >
            {typeLabel}
          </Typography>

          <Typography
            variant="subtitle1"
            fontWeight={700}
            component="h3"
            sx={{
              mt: 0.5,
              mb: 0.75,
              lineHeight: 1.3,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {property.title}
          </Typography>

          <Box
            sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1.5 }}
          >
            <LocationOnRounded
              sx={{ fontSize: 14, color: "text.secondary" }}
              aria-hidden="true"
            />
            <Typography variant="caption" color="text.secondary" noWrap>
              {property.location.district}, {property.location.city}
            </Typography>
          </Box>

          {/* Specs row */}
          <Box
            component="dl"
            sx={{
              display: "flex",
              gap: 1.5,
              pt: 1.5,
              borderTop: "1px solid",
              borderColor: "divider",
              m: 0,
            }}
          >
            {property.bedrooms > 0 && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <BedRounded
                  sx={{ fontSize: 15, color: "text.secondary" }}
                  aria-hidden="true"
                />
                <Typography
                  component="dd"
                  variant="caption"
                  color="text.secondary"
                  fontWeight={600}
                  aria-label={`${property.bedrooms} ${t("property.bedrooms")}`}
                >
                  {isRTL
                    ? toPersianNumber(property.bedrooms)
                    : property.bedrooms}
                </Typography>
              </Box>
            )}
            {property.bathrooms > 0 && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <BathtubRounded
                  sx={{ fontSize: 15, color: "text.secondary" }}
                  aria-hidden="true"
                />
                <Typography
                  component="dd"
                  variant="caption"
                  color="text.secondary"
                  fontWeight={600}
                  aria-label={`${property.bathrooms} ${t("property.bathrooms")}`}
                >
                  {isRTL
                    ? toPersianNumber(property.bathrooms)
                    : property.bathrooms}
                </Typography>
              </Box>
            )}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <SquareFootRounded
                sx={{ fontSize: 15, color: "text.secondary" }}
                aria-hidden="true"
              />
              <Typography
                component="dd"
                variant="caption"
                color="text.secondary"
                fontWeight={600}
                aria-label={`${t("property.area")} ${formattedArea}`}
              >
                {isRTL ? toPersianNumber(formattedArea) : formattedArea}
              </Typography>
            </Box>
            <Typography
              component="dd"
              variant="caption"
              color="text.disabled"
              sx={{ [isRTL ? "mr" : "ml"]: "auto" }}
            >
              <time dateTime={property.createdAt}>{createdAgo}</time>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.article>
  );
});

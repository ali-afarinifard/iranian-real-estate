"use client";

import React, { useState, useMemo, memo } from "react";
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
import { formatArea } from "@/lib/utils";
import {
  formatTomanPrice,
  formatRelativeTime,
  toPersianDigits,
} from "@/lib/localize";
import { TYPE_LABEL_KEYS, CARD_IMAGE_SIZES } from "./property-card.constants";
import type { PropertyCardProps } from "./property-card.types";
import type { Language } from "@/types";
import { useLocalize } from "@/hooks/use-localize";
import { useRouter } from "next/navigation";

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
  isFavorited,
  onFavorite,
}: PropertyCardProps & {
  isFavorited: boolean;
  onFavorite: (e: React.MouseEvent) => void;
}) {
  const theme = useTheme();
  const router = useRouter();
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

  const createdAgo = useMemo(
    () => formatRelativeTime(property.createdAt, lang),
    [property.createdAt, lang],
  );

  const localizedTitle = localize(property.title);
  const imageAlt = property.primaryImage.alt || localizedTitle;
  const transition = useMemo(() => getTransition(index), [index]);

  const forSaleLabel = t("property.forSale");
  const forRentLabel = t("property.forRent");
  const savedLabel = t("property.savedToFavorites");
  const removedLabel = t("property.removedFromFavorites");
  const favoriteAriaLabel = isFavorited ? removedLabel : savedLabel;

  return (
    <motion.article {...GRID_ANIMATION} transition={transition}>
      <Card
        onClick={() => router.push(`/property/${property.slug}`)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") router.push(`/property/${property.slug}`);
        }}
        sx={{
          textDecoration: "none",
          color: "inherit",
          display: "block",
          height: "100%",
          cursor: "pointer",
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
                    outline: "2px solid #fff",
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
              left: isRTL ? undefined : 12,
              right: isRTL ? 12 : undefined,
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
              {formattedPrice}
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
            {localizedTitle}
          </Typography>

          <Box
            sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1.5 }}
          >
            <LocationOnRounded
              sx={{ fontSize: 14, color: "text.secondary" }}
              aria-hidden="true"
            />
            <Typography variant="caption" color="text.secondary" noWrap>
              {localize(property.location.district)},{" "}
              {localize(property.location.city)}
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
                    ? toPersianDigits(property.bedrooms)
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
                    ? toPersianDigits(property.bathrooms)
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
                {isRTL ? toPersianDigits(formattedArea) : formattedArea}
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

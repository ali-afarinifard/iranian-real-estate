"use client";

import React, { useState, useCallback } from "react";
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
  VerifiedRounded,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { PropertySummary } from "@/types";
import { formatPrice, formatArea, timeAgo } from "@/lib/utils";
import { useAppDispatch, useAppSelector, selectIsFavorited } from "@/store";
import { favoritesActions, uiActions } from "@/store/slices";

interface PropertyCardProps {
  property: PropertySummary;
  viewMode?: "grid" | "list";
  index?: number;
  onSelect?: (id: string) => void;
}

const STATUS_COLORS = {
  available: "success",
  pending: "warning",
  sold: "error",
  rented: "error",
} as const;

const TYPE_LABELS: Record<string, string> = {
  apartment: "Apartment",
  villa: "Villa",
  penthouse: "Penthouse",
  office: "Office",
  land: "Land",
};

export function PropertyCard({
  property,
  viewMode = "grid",
  index = 0,
  onSelect,
}: PropertyCardProps) {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isFavorited = useAppSelector(selectIsFavorited(property.id));
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleFavorite = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dispatch(favoritesActions.toggleFavorite(property.id));
      dispatch(
        uiActions.addNotification({
          type: isFavorited ? "info" : "success",
          title: isFavorited ? "Removed from saved" : "Saved to favorites",
          duration: 2500,
        }),
      );
    },
    [dispatch, property.id, isFavorited],
  );

  const handleSelect = useCallback(() => {
    onSelect?.(property.id);
  }, [onSelect, property.id]);

  if (viewMode === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.04, duration: 0.3 }}
        onClick={handleSelect}
      >
        <Card
          component={NextLink}
          href={`/property/${property.slug}`}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            textDecoration: "none",
            color: "inherit",
            cursor: "pointer",
            height: { sm: 180 },
            overflow: "hidden",
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
              alt={property.primaryImage.alt}
              fill
              sizes="(max-width: 600px) 100vw, 240px"
              style={{ objectFit: "cover" }}
              onLoad={() => setImgLoaded(true)}
            />
            {!imgLoaded && (
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  bgcolor: "action.hover",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              />
            )}
            {/* Badges */}
            <Box
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
                  property.listingType === "sale" ? "For Sale" : "For Rent"
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
                  label="New"
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
                  sx={{ lineHeight: 1.2 }}
                >
                  {TYPE_LABELS[property.type] ?? property.type}
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{ lineHeight: 1.3, mt: 0.25 }}
                >
                  {property.title}
                </Typography>
              </Box>
              <Tooltip
                title={isFavorited ? "Remove from saved" : "Save property"}
              >
                <IconButton
                  size="small"
                  onClick={handleFavorite}
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

            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <LocationOnRounded
                sx={{ fontSize: 14, color: "text.secondary" }}
              />
              <Typography variant="caption" color="text.secondary">
                {property.location.district}, {property.location.city}
              </Typography>
            </Box>

            <Stack direction="row" spacing={2} sx={{ mt: "auto" }}>
              {property.bedrooms > 0 && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <BedRounded sx={{ fontSize: 16, color: "text.secondary" }} />
                  <Typography variant="caption" color="text.secondary">
                    {property.bedrooms} bd
                  </Typography>
                </Box>
              )}
              {property.bathrooms > 0 && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <BathtubRounded
                    sx={{ fontSize: 16, color: "text.secondary" }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {property.bathrooms} ba
                  </Typography>
                </Box>
              )}
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <SquareFootRounded
                  sx={{ fontSize: 16, color: "text.secondary" }}
                />
                <Typography variant="caption" color="text.secondary">
                  {formatArea(property.area)}
                </Typography>
              </Box>
              <Box sx={{ ml: "auto" }}>
                <Typography
                  variant="h5"
                  fontWeight={800}
                  color="primary.main"
                  noWrap
                >
                  {formatPrice(property.price, property.currency)}
                  {property.listingType === "rent" && (
                    <Typography
                      component="span"
                      variant="caption"
                      color="text.secondary"
                    >
                      /mo
                    </Typography>
                  )}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // Grid view
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.06,
        duration: 0.35,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onClick={handleSelect}
    >
      <Card
        component={NextLink}
        href={`/property/${property.slug}`}
        sx={{
          textDecoration: "none",
          color: "inherit",
          display: "block",
          height: "100%",
        }}
      >
        {/* Image container */}
        <Box sx={{ position: "relative", height: 220, overflow: "hidden" }}>
          <NextImage
            src={property.primaryImage.url}
            alt={property.primaryImage.alt}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
            style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
            onLoad={() => setImgLoaded(true)}
          />
          {!imgLoaded && (
            <Box
              sx={{ position: "absolute", inset: 0, bgcolor: "action.hover" }}
            />
          )}

          {/* Gradient overlay */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)",
            }}
          />

          {/* Top badges */}
          <Box
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              display: "flex",
              gap: 0.75,
            }}
          >
            <Chip
              label={property.listingType === "sale" ? "For Sale" : "For Rent"}
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
                label="New"
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
                label="Featured"
                size="small"
                icon={
                  <VerifiedRounded
                    sx={{
                      fontSize: "12px !important",
                      color: "#fff !important",
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

          {/* Favorite button */}
          <Box sx={{ position: "absolute", top: 8, right: 8 }}>
            <Tooltip
              title={isFavorited ? "Remove from saved" : "Save property"}
            >
              <IconButton
                size="small"
                onClick={handleFavorite}
                sx={{
                  bgcolor: alpha("#000", 0.35),
                  backdropFilter: "blur(8px)",
                  color: isFavorited ? "#ef4444" : "#fff",
                  "&:hover": {
                    bgcolor: alpha("#000", 0.5),
                    transform: "scale(1.1)",
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

          {/* Price on image */}
          <Box sx={{ position: "absolute", bottom: 12, left: 12 }}>
            <Typography
              variant="h5"
              fontWeight={800}
              sx={{ color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
            >
              {formatPrice(property.price, property.currency)}
              {property.listingType === "rent" && (
                <Typography
                  component="span"
                  variant="caption"
                  sx={{ color: "rgba(255,255,255,0.8)", ml: 0.5 }}
                >
                  /mo
                </Typography>
              )}
            </Typography>
          </Box>
        </Box>

        {/* Card Content */}
        <CardContent sx={{ p: 2, pb: "16px !important" }}>
          <Typography
            variant="overline"
            color="primary.main"
            sx={{ lineHeight: 1 }}
          >
            {TYPE_LABELS[property.type] ?? property.type}
          </Typography>

          <Typography
            variant="subtitle1"
            fontWeight={700}
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
            <LocationOnRounded sx={{ fontSize: 14, color: "text.secondary" }} />
            <Typography variant="caption" color="text.secondary" noWrap>
              {property.location.district}, {property.location.city}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              pt: 1.5,
              borderTop: `1px solid`,
              borderColor: "divider",
            }}
          >
            {property.bedrooms > 0 && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <BedRounded sx={{ fontSize: 15, color: "text.secondary" }} />
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight={600}
                >
                  {property.bedrooms}
                </Typography>
              </Box>
            )}
            {property.bathrooms > 0 && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <BathtubRounded
                  sx={{ fontSize: 15, color: "text.secondary" }}
                />
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight={600}
                >
                  {property.bathrooms}
                </Typography>
              </Box>
            )}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <SquareFootRounded
                sx={{ fontSize: 15, color: "text.secondary" }}
              />
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={600}
              >
                {formatArea(property.area)}
              </Typography>
            </Box>
            <Typography
              variant="caption"
              color="text.disabled"
              sx={{ ml: "auto" }}
            >
              {timeAgo(property.createdAt)}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}

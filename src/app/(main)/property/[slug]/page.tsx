"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Chip,
  Button,
  Stack,
  Paper,
  Avatar,
  Divider,
  Tooltip,
  alpha,
  Skeleton,
  Alert,
} from "@mui/material";
import {
  BedRounded,
  BathtubRounded,
  SquareFootRounded,
  GarageRounded,
  LocationOnRounded,
  FavoriteRounded,
  FavoriteBorderRounded,
  ShareRounded,
  CheckCircleRounded,
  CalendarMonthRounded,
  VisibilityRounded,
  ArrowBackRounded,
  PhoneRounded,
  EmailRounded,
} from "@mui/icons-material";
import NextImage from "next/image";
import NextLink from "next/link";
import { motion } from "framer-motion";
import {
  useGetPropertyBySlugQuery,
  useGetSimilarPropertiesQuery,
} from "@/store/api/propertiesApi";
import { useAppDispatch, useAppSelector, selectIsFavorited } from "@/store";
import { favoritesActions, uiActions } from "@/store/slices";
import { PropertyCard } from "@/features/listings/components/PropertyCard";
import { formatPrice, formatArea, timeAgo } from "@/lib/utils";
import { usePropertySSE } from "@/hooks/usePropertySSE";

interface PropertyPageProps {
  params: { slug: string };
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = params;
  const dispatch = useAppDispatch();
  const [activeImage, setActiveImage] = useState(0);

  const {
    data: property,
    isLoading,
    isError,
  } = useGetPropertyBySlugQuery(slug);
  const { data: similar } = useGetSimilarPropertiesQuery(property?.id ?? "", {
    skip: !property?.id,
  });

  const isFavorited = useAppSelector(selectIsFavorited(property?.id ?? ""));

  // SSE on property detail page
  usePropertySSE({ enabled: !!property });

  const handleFavorite = () => {
    if (!property) return;
    dispatch(favoritesActions.toggleFavorite(property.id));
    dispatch(
      uiActions.addNotification({
        type: isFavorited ? "info" : "success",
        title: isFavorited ? "Removed from saved" : "Saved to favorites",
        duration: 2500,
      }),
    );
  };

  if (isLoading) return <PropertyDetailSkeleton />;
  if (isError || !property) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="error">
          Property not found.{" "}
          <NextLink href="/listings">Browse all listings</NextLink>
        </Alert>
      </Container>
    );
  }

  const statusColors = {
    available: "success",
    pending: "warning",
    sold: "error",
    rented: "error",
  } as const;

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
      {/* Back button */}
      <Button
        component={NextLink}
        href="/listings"
        startIcon={<ArrowBackRounded />}
        sx={{ mb: 3, color: "text.secondary" }}
      >
        Back to Listings
      </Button>

      <Grid container spacing={4}>
        {/* Images + Details */}
        <Grid item xs={12} lg={8}>
          {/* Image Gallery */}
          <Box sx={{ mb: 3 }}>
            {/* Main Image */}
            <Box
              sx={{
                position: "relative",
                height: { xs: 280, md: 480 },
                borderRadius: 3,
                overflow: "hidden",
                mb: 1.5,
              }}
            >
              <motion.div
                key={activeImage}
                initial={{ opacity: 0.6, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                style={{ height: "100%" }}
              >
                <NextImage
                  src={property.images[activeImage]?.url}
                  alt={property.images[activeImage]?.alt}
                  fill
                  priority={activeImage === 0}
                  sizes="(max-width: 1200px) 100vw, 65vw"
                  style={{ objectFit: "cover" }}
                />
              </motion.div>
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 40%)",
                }}
              />
              {/* Status badge */}
              <Box
                sx={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  display: "flex",
                  gap: 1,
                }}
              >
                <Chip
                  label={
                    property.listingType === "sale" ? "For Sale" : "For Rent"
                  }
                  color={
                    property.listingType === "sale" ? "primary" : "secondary"
                  }
                  sx={{ fontWeight: 700 }}
                />
                <Chip
                  label={property.status}
                  color={statusColors[property.status] ?? "default"}
                  variant="filled"
                  sx={{ fontWeight: 700, textTransform: "capitalize" }}
                />
                {property.isNew && (
                  <Chip label="New" color="success" sx={{ fontWeight: 700 }} />
                )}
              </Box>
              {/* Image counter */}
              <Typography
                variant="caption"
                sx={{
                  position: "absolute",
                  bottom: 16,
                  right: 16,
                  bgcolor: alpha("#000", 0.5),
                  color: "#fff",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 10,
                  fontWeight: 600,
                  backdropFilter: "blur(4px)",
                }}
              >
                {activeImage + 1} / {property.images.length}
              </Typography>
            </Box>

            {/* Thumbnails */}
            <Box sx={{ display: "flex", gap: 1, overflowX: "auto", pb: 0.5 }}>
              {property.images.map((img, i) => (
                <Box
                  key={img.id}
                  onClick={() => setActiveImage(i)}
                  sx={{
                    position: "relative",
                    width: 80,
                    height: 60,
                    borderRadius: 2,
                    overflow: "hidden",
                    flexShrink: 0,
                    cursor: "pointer",
                    border: "2px solid",
                    borderColor:
                      i === activeImage ? "primary.main" : "transparent",
                    opacity: i === activeImage ? 1 : 0.65,
                    transition: "all 0.2s",
                    "&:hover": { opacity: 1 },
                  }}
                >
                  <NextImage
                    src={img.url}
                    alt={img.alt}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="80px"
                  />
                </Box>
              ))}
            </Box>
          </Box>

          {/* Property Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="overline"
                color="primary.main"
                fontWeight={700}
              >
                {property.type} · {property.location.district}
              </Typography>
              <Typography
                variant="h4"
                fontWeight={800}
                sx={{ mt: 0.5, mb: 1.5, lineHeight: 1.2 }}
              >
                {property.title}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  mb: 2.5,
                }}
              >
                <LocationOnRounded
                  sx={{ fontSize: 18, color: "text.secondary" }}
                />
                <Typography variant="body2" color="text.secondary">
                  {property.location.address}, {property.location.district},{" "}
                  {property.location.city}
                  {property.location.zipCode &&
                    ` · ${property.location.zipCode}`}
                </Typography>
              </Box>

              {/* Key stats */}
              <Stack
                direction="row"
                spacing={3}
                flexWrap="wrap"
                sx={{ gap: 2 }}
              >
                {property.bedrooms > 0 && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <BedRounded color="primary" />
                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                      >
                        Bedrooms
                      </Typography>
                      <Typography fontWeight={700}>
                        {property.bedrooms}
                      </Typography>
                    </Box>
                  </Box>
                )}
                {property.bathrooms > 0 && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <BathtubRounded color="primary" />
                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                      >
                        Bathrooms
                      </Typography>
                      <Typography fontWeight={700}>
                        {property.bathrooms}
                      </Typography>
                    </Box>
                  </Box>
                )}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <SquareFootRounded color="primary" />
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                    >
                      Area
                    </Typography>
                    <Typography fontWeight={700}>
                      {formatArea(property.area)}
                    </Typography>
                  </Box>
                </Box>
                {property.parkingSpots > 0 && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <GarageRounded color="primary" />
                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                      >
                        Parking
                      </Typography>
                      <Typography fontWeight={700}>
                        {property.parkingSpots}
                      </Typography>
                    </Box>
                  </Box>
                )}
                {property.floor !== undefined && (
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                    >
                      Floor
                    </Typography>
                    <Typography fontWeight={700}>
                      {property.floor} / {property.totalFloors}
                    </Typography>
                  </Box>
                )}
                {property.yearBuilt && (
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                    >
                      Year Built
                    </Typography>
                    <Typography fontWeight={700}>
                      {property.yearBuilt}
                    </Typography>
                  </Box>
                )}
              </Stack>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Description */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Description
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.8 }}
              >
                {property.description}
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Features */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Features & Amenities
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {property.features.map((feat) => (
                  <Chip
                    key={feat}
                    label={feat}
                    icon={<CheckCircleRounded />}
                    variant="outlined"
                    size="small"
                    color="primary"
                    sx={{ fontWeight: 500 }}
                  />
                ))}
              </Box>
            </Box>

            {/* Meta */}
            <Box sx={{ display: "flex", gap: 3, mt: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                <CalendarMonthRounded
                  sx={{ fontSize: 16, color: "text.secondary" }}
                />
                <Typography variant="caption" color="text.secondary">
                  Listed {timeAgo(property.createdAt)}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                <VisibilityRounded
                  sx={{ fontSize: 16, color: "text.secondary" }}
                />
                <Typography variant="caption" color="text.secondary">
                  {property.viewCount.toLocaleString()} views
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </Grid>

        {/* Price Card + Agent */}
        <Grid item xs={12} lg={4}>
          <Box sx={{ position: "sticky", top: 88 }}>
            {/* Price Card */}
            <Paper
              elevation={3}
              sx={{ p: 3, borderRadius: 3, mb: 3 }}
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Typography variant="h3" fontWeight={900} color="primary.main">
                {formatPrice(property.price, property.currency)}
                {property.listingType === "rent" && (
                  <Typography
                    component="span"
                    variant="h6"
                    color="text.secondary"
                  >
                    /mo
                  </Typography>
                )}
              </Typography>
              {property.pricePerSqm && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  {formatPrice(property.pricePerSqm, property.currency)} / m²
                </Typography>
              )}

              <Stack spacing={1.5}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  startIcon={<PhoneRounded />}
                >
                  Request Viewing
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
                >
                  {isFavorited ? "Saved" : "Save Property"}
                </Button>
                <Tooltip title="Share this listing">
                  <Button
                    variant="text"
                    size="small"
                    startIcon={<ShareRounded />}
                    color="inherit"
                  >
                    Share
                  </Button>
                </Tooltip>
              </Stack>
            </Paper>

            {/* Agent Card */}
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
              <Typography
                variant="overline"
                color="text.secondary"
                fontWeight={700}
                gutterBottom
                display="block"
              >
                Listed by
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2.5 }}
              >
                <Avatar
                  src={property.agent.avatar}
                  sx={{ width: 52, height: 52 }}
                />
                <Box>
                  <Typography fontWeight={700}>
                    {property.agent.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {property.agent.agency}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      mt: 0.25,
                    }}
                  >
                    <Typography
                      variant="caption"
                      color="warning.main"
                      fontWeight={700}
                    >
                      ★ {property.agent.rating}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      · {property.agent.totalListings} listings
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Stack spacing={1}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<PhoneRounded />}
                  size="small"
                >
                  {property.agent.phone}
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<EmailRounded />}
                  size="small"
                >
                  Send Message
                </Button>
              </Stack>
            </Paper>
          </Box>
        </Grid>
      </Grid>

      {/* Similar Properties */}
      {(similar?.data?.length ?? 0) > 0 && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" fontWeight={800} gutterBottom>
            Similar Properties
          </Typography>
          <Grid container spacing={3}>
            {similar!.data.map((p, i) => (
              <Grid item xs={12} sm={6} lg={3} key={p.id}>
                <PropertyCard property={p} index={i} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
}

function PropertyDetailSkeleton() {
  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          <Skeleton
            variant="rectangular"
            height={480}
            sx={{ borderRadius: 3, mb: 1.5 }}
          />
          <Box sx={{ display: "flex", gap: 1 }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                width={80}
                height={60}
                sx={{ borderRadius: 2 }}
              />
            ))}
          </Box>
          <Box sx={{ mt: 3 }}>
            <Skeleton variant="text" width="30%" />
            <Skeleton variant="text" width="70%" height={40} />
            <Skeleton variant="text" width="50%" />
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Skeleton
            variant="rectangular"
            height={280}
            sx={{ borderRadius: 3 }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

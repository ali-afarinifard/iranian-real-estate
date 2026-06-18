"use client";

import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Skeleton,
  Button,
  Chip,
  LinearProgress,
  useTheme,
  alpha,
} from "@mui/material";
import {
  HomeRounded,
  TrendingUpRounded,
  FavoriteRounded,
  SearchRounded,
  AddHomeRounded,
} from "@mui/icons-material";
import NextLink from "next/link";
import { motion } from "framer-motion";
import {
  useGetStatsQuery,
  useGetFavoritesQuery,
} from "@/store/api/propertiesApi";
import { useAppSelector, selectUser } from "@/store";
import { formatPrice } from "@/lib/utils";
import { usePropertySSE } from "@/hooks/usePropertySSE";
import { PropertyCard, PropertyCardSkeleton } from "@/features/listings/components/PropertyCard";

function StatCard({
  icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  color: string;
}) {
  return (
    <Paper
      elevation={2}
      sx={{ p: 3, borderRadius: 3, height: "100%" }}
      component={motion.div}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: alpha(color, 0.12),
            color,
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography
            variant="caption"
            color="text.secondary"
            fontWeight={600}
            display="block"
          >
            {label}
          </Typography>
          <Typography variant="h5" fontWeight={800} sx={{ lineHeight: 1.2 }}>
            {value}
          </Typography>
          {sub && (
            <Typography variant="caption" color="text.secondary">
              {sub}
            </Typography>
          )}
        </Box>
      </Box>
    </Paper>
  );
}

export default function DashboardPage() {
  const theme = useTheme();
  const user = useAppSelector(selectUser);
  const { data: stats, isLoading: statsLoading } = useGetStatsQuery();
  const { data: favorites, isLoading: favLoading } = useGetFavoritesQuery();

  // Real-time on dashboard
  usePropertySSE({ enabled: true });

  const statCards = stats
    ? [
        {
          icon: <HomeRounded />,
          label: "Total Listings",
          value: stats.totalListings,
          color: theme.palette.primary.main,
        },
        {
          icon: <TrendingUpRounded />,
          label: "For Sale",
          value: stats.forSale,
          sub: `Avg. ${formatPrice(stats.avgPriceSale)}`,
          color: "#22C55E",
        },
        {
          icon: <SearchRounded />,
          label: "For Rent",
          value: stats.forRent,
          color: theme.palette.secondary.main,
        },
        {
          icon: <AddHomeRounded />,
          label: "New This Month",
          value: stats.newThisMonth,
          color: "#F59E0B",
        },
      ]
    : [];

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
      {/* Header */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={800} gutterBottom>
            Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""} 👋
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Here&apos;s what&apos;s happening in the market today.
          </Typography>
        </Box>
        <Button
          variant="contained"
          component={NextLink}
          href="/listings"
          startIcon={<SearchRounded />}
          sx={{ display: { xs: "none", sm: "flex" } }}
        >
          Browse Market
        </Button>
      </Box>

      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {statsLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Grid item xs={12} sm={6} lg={3} key={i}>
                <Skeleton
                  variant="rectangular"
                  height={100}
                  sx={{ borderRadius: 3 }}
                />
              </Grid>
            ))
          : statCards.map((s, i) => (
              <Grid item xs={12} sm={6} lg={3} key={s.label}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <StatCard {...s} />
                </motion.div>
              </Grid>
            ))}
      </Grid>

      {/* Market distribution */}
      {stats && (
        <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 5 }}>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Market Distribution
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 0.75,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                For Sale
              </Typography>
              <Typography variant="body2" fontWeight={700}>
                {Math.round((stats.forSale / stats.totalListings) * 100)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(stats.forSale / stats.totalListings) * 100}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: alpha(theme.palette.primary.main, 0.12),
              }}
            />
          </Box>
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 0.75,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                For Rent
              </Typography>
              <Typography variant="body2" fontWeight={700}>
                {Math.round((stats.forRent / stats.totalListings) * 100)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(stats.forRent / stats.totalListings) * 100}
              color="secondary"
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: alpha(theme.palette.secondary.main, 0.12),
              }}
            />
          </Box>
        </Paper>
      )}

      {/* Saved Properties */}
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h6" fontWeight={700}>
            Saved Properties
            {favorites?.data.length ? (
              <Chip
                label={favorites.data.length}
                size="small"
                color="primary"
                sx={{ ml: 1 }}
              />
            ) : null}
          </Typography>
          <Button component={NextLink} href="/favorites" size="small">
            View All
          </Button>
        </Box>
        <Grid container spacing={3}>
          {favLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Grid item xs={12} sm={6} lg={4} key={i}>
                <PropertyCardSkeleton />
              </Grid>
            ))
          ) : favorites?.data.length ? (
            favorites.data.slice(0, 3).map((p, i) => (
              <Grid item xs={12} sm={6} lg={4} key={p.id}>
                <PropertyCard property={p} index={i} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 6,
                  borderRadius: 3,
                  textAlign: "center",
                  border: "2px dashed",
                  borderColor: "divider",
                }}
              >
                <FavoriteRounded
                  sx={{ fontSize: 48, color: "text.disabled", mb: 2 }}
                />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No saved properties yet
                </Typography>
                <Button
                  component={NextLink}
                  href="/listings"
                  variant="contained"
                  sx={{ mt: 1 }}
                >
                  Start Browsing
                </Button>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
}

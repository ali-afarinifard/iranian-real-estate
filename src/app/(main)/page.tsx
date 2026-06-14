"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Chip,
  Stack,
  useTheme,
  alpha,
  Paper,
} from "@mui/material";
import {
  SearchRounded,
  MapRounded,
  TrendingUpRounded,
  ApartmentRounded,
  HouseRounded,
  DomainRounded,
  ArrowForwardRounded,
  VerifiedRounded,
} from "@mui/icons-material";
import NextLink from "next/link";
import NextImage from "next/image";
import { motion } from "framer-motion";
import {
  useGetFeaturedPropertiesQuery
} from "@/store/api/propertiesApi";
import { PropertyCard } from "@/features/listings/components/PropertyCard";
import { PropertyCardSkeleton } from "@/features/listings/components/PropertyCardSkeleton";

const HERO_STATS = [
  { label: "Properties Listed", value: "2,400+", icon: <ApartmentRounded /> },
  { label: "Cities Covered", value: "5", icon: <MapRounded /> },
  { label: "Happy Clients", value: "1,800+", icon: <VerifiedRounded /> },
];

const QUICK_FILTERS = [
  {
    label: "Apartments",
    type: "apartment",
    icon: <ApartmentRounded fontSize="small" />,
  },
  { label: "Villas", type: "villa", icon: <HouseRounded fontSize="small" /> },
  {
    label: "Penthouses",
    type: "penthouse",
    icon: <DomainRounded fontSize="small" />,
  },
  {
    label: "For Rent",
    listingType: "rent",
    icon: <TrendingUpRounded fontSize="small" />,
  },
];

function FeaturedSection() {
  const { data, isLoading } = useGetFeaturedPropertiesQuery();

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            mb: 4,
          }}
        >
          <Box>
            <Typography
              variant="overline"
              color="primary.main"
              fontWeight={700}
            >
              Hand-picked
            </Typography>
            <Typography variant="h3" fontWeight={800} sx={{ mt: 0.5 }}>
              Featured Properties
            </Typography>
          </Box>
          <Button
            component={NextLink}
            href="/listings"
            endIcon={<ArrowForwardRounded />}
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            View All
          </Button>
        </Box>

        <Grid container spacing={3}>
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Grid item xs={12} sm={6} lg={4} key={i}>
                  <PropertyCardSkeleton />
                </Grid>
              ))
            : data?.data.slice(0, 6).map((property, i) => (
                <Grid item xs={12} sm={6} lg={4} key={property.id}>
                  <PropertyCard property={property} index={i} />
                </Grid>
              ))}
        </Grid>

        <Box sx={{ textAlign: "center", mt: 4, display: { sm: "none" } }}>
          <Button
            component={NextLink}
            href="/listings"
            endIcon={<ArrowForwardRounded />}
            variant="outlined"
          >
            View All Properties
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default function HomePage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <>
      {/* Hero */}
      <Box
        component="section"
        sx={{
          position: "relative",
          minHeight: { xs: "88vh", md: "90vh" },
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* Background image */}
        <Box sx={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <NextImage
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&h=1000&fit=crop"
            alt="Amsterdam canal houses"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: isDark
                ? "linear-gradient(135deg, rgba(1,17,46,0.95) 0%, rgba(7,55,122,0.7) 60%, rgba(0,0,0,0.4) 100%)"
                : "linear-gradient(135deg, rgba(1,17,46,0.88) 0%, rgba(7,55,122,0.6) 60%, rgba(0,0,0,0.2) 100%)",
            }}
          />
        </Box>

        <Container
          maxWidth="xl"
          sx={{ position: "relative", zIndex: 1, py: { xs: 8, md: 12 } }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Chip
                  label="🏆 #1 Real Estate Platform in Netherlands"
                  sx={{
                    bgcolor: alpha("#fff", 0.15),
                    color: "#fff",
                    backdropFilter: "blur(8px)",
                    fontWeight: 600,
                    mb: 3,
                    border: `1px solid ${alpha("#fff", 0.2)}`,
                  }}
                />

                <Typography
                  variant="h1"
                  sx={{
                    color: "#fff",
                    fontSize: { xs: "2.5rem", md: "3.75rem", lg: "4.5rem" },
                    fontWeight: 900,
                    lineHeight: 1.05,
                    letterSpacing: "-0.04em",
                    mb: 3,
                  }}
                >
                  Find Your
                  <Box
                    component="span"
                    sx={{
                      display: "block",
                      background: `linear-gradient(90deg, ${theme.palette.secondary.main}, #FCD34D)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Perfect Home.
                  </Box>
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    color: alpha("#fff", 0.8),
                    fontWeight: 400,
                    mb: 4,
                    maxWidth: 520,
                  }}
                >
                  Discover premium apartments, villas, and penthouses across
                  Amsterdam, Rotterdam, and beyond — with real-time updates.
                </Typography>

                {/* Quick filter chips */}
                <Stack
                  direction="row"
                  spacing={1}
                  flexWrap="wrap"
                  sx={{ mb: 4, gap: 1 }}
                >
                  {QUICK_FILTERS.map((f) => (
                    <Chip
                      key={f.label}
                      label={f.label}
                      icon={f.icon}
                      component={NextLink}
                      href={`/listings?${f.type ? `type=${f.type}` : `listingType=${f.listingType}`}`}
                      clickable
                      sx={{
                        bgcolor: alpha("#fff", 0.12),
                        color: "#fff",
                        backdropFilter: "blur(8px)",
                        border: `1px solid ${alpha("#fff", 0.2)}`,
                        fontWeight: 600,
                        "&:hover": { bgcolor: alpha("#fff", 0.22) },
                        "& .MuiChip-icon": { color: "#fff" },
                      }}
                    />
                  ))}
                </Stack>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Button
                    component={NextLink}
                    href="/listings"
                    variant="contained"
                    size="large"
                    startIcon={<SearchRounded />}
                    sx={{
                      bgcolor: "secondary.main",
                      "&:hover": { bgcolor: "secondary.dark" },
                      px: 4,
                      py: 1.75,
                      fontSize: "1rem",
                    }}
                  >
                    Browse Properties
                  </Button>
                  <Button
                    component={NextLink}
                    href="/map"
                    variant="outlined"
                    size="large"
                    startIcon={<MapRounded />}
                    sx={{
                      borderColor: alpha("#fff", 0.5),
                      color: "#fff",
                      "&:hover": {
                        borderColor: "#fff",
                        bgcolor: alpha("#fff", 0.1),
                      },
                      px: 4,
                      py: 1.75,
                      fontSize: "1rem",
                    }}
                  >
                    Explore Map
                  </Button>
                </Stack>
              </motion.div>
            </Grid>

            {/* Stats panel */}
            <Grid item xs={12} md={5}>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    bgcolor: alpha(
                      isDark ? "#1E293B" : "#fff",
                      isDark ? 0.85 : 0.9,
                    ),
                    backdropFilter: "blur(16px)",
                    border: `1px solid ${alpha("#fff", 0.15)}`,
                  }}
                >
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Market Overview
                  </Typography>
                  <Grid container spacing={2} sx={{ mt: 0.5 }}>
                    {HERO_STATS.map((stat) => (
                      <Grid item xs={4} key={stat.label}>
                        <Box sx={{ textAlign: "center" }}>
                          <Box sx={{ color: "primary.main", mb: 0.5 }}>
                            {stat.icon}
                          </Box>
                          <Typography
                            variant="h5"
                            fontWeight={800}
                            color="primary.main"
                          >
                            {stat.value}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ lineHeight: 1.3 }}
                          >
                            {stat.label}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>

                  <Box
                    sx={{
                      mt: 2.5,
                      p: 2,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                    }}
                  >
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                      gutterBottom
                    >
                      Average Sale Price · Amsterdam
                    </Typography>
                    <Typography
                      variant="h4"
                      fontWeight={800}
                      color="primary.main"
                    >
                      €485,000
                    </Typography>
                    <Typography
                      variant="caption"
                      color="success.main"
                      fontWeight={600}
                    >
                      ↑ 4.2% from last quarter
                    </Typography>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Featured */}
      <FeaturedSection />

      {/* How It Works */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: "background.paper" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            fontWeight={800}
            textAlign="center"
            gutterBottom
          >
            How Nestify Works
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            textAlign="center"
            sx={{ mb: 6, maxWidth: 480, mx: "auto" }}
          >
            Find, explore, and connect with your ideal property in three simple
            steps.
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                step: "01",
                title: "Search & Filter",
                desc: "Use powerful filters — price, type, location, features — to narrow down exactly what you need.",
                color: theme.palette.primary.main,
              },
              {
                step: "02",
                title: "Explore on Map",
                desc: "Browse listings spatially. See neighborhoods, schools, and amenities at a glance.",
                color: theme.palette.secondary.main,
              },
              {
                step: "03",
                title: "Connect & Close",
                desc: "Contact the agent directly, schedule a viewing, and make your move with confidence.",
                color: "#22C55E",
              },
            ].map((item, i) => (
              <Grid item xs={12} md={4} key={item.step}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                >
                  <Box sx={{ textAlign: "center", px: 2 }}>
                    <Typography
                      sx={{
                        fontSize: "4rem",
                        fontWeight: 900,
                        color: alpha(item.color, 0.15),
                        lineHeight: 1,
                        mb: 1,
                        letterSpacing: "-0.05em",
                      }}
                    >
                      {item.step}
                    </Typography>
                    <Typography variant="h5" fontWeight={700} gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.desc}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}

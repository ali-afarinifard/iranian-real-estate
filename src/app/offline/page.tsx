"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  useTheme,
  alpha,
} from "@mui/material";
import {
  WifiOffRounded,
  HomeRounded,
  RefreshRounded,
} from "@mui/icons-material";
import NextLink from "next/link";
import { motion } from "framer-motion";

export default function OfflinePage() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          theme.palette.mode === "dark"
            ? `linear-gradient(135deg, ${theme.palette.background.default}, ${alpha(theme.palette.primary.dark, 0.3)})`
            : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.04)}, ${alpha(theme.palette.secondary.main, 0.08)})`,
        p: 3,
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Paper
            elevation={4}
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 4,
              textAlign: "center",
            }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Box
                sx={{
                  width: 96,
                  height: 96,
                  borderRadius: "50%",
                  bgcolor: alpha(theme.palette.warning.main, 0.12),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 3,
                }}
              >
                <WifiOffRounded sx={{ fontSize: 48, color: "warning.main" }} />
              </Box>
            </motion.div>

            <Typography variant="h4" fontWeight={800} gutterBottom>
              You&apos;re Offline
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 360, mx: "auto" }}
            >
              It looks like you&apos;ve lost your internet connection.
              Previously visited pages are still available from cache.
            </Typography>

            {/* Tips */}
            <Paper
              variant="outlined"
              sx={{
                p: 2.5,
                mb: 4,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.info.main, 0.05),
                borderColor: alpha(theme.palette.info.main, 0.2),
                textAlign: "left",
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={700}
                display="block"
                gutterBottom
              >
                WHAT YOU CAN STILL ACCESS:
              </Typography>
              {[
                "Home page and featured listings (cached)",
                "Properties you previously viewed",
                "Your saved favorites list",
              ].map((tip) => (
                <Box
                  key={tip}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mt: 0.75,
                  }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      bgcolor: "info.main",
                      flexShrink: 0,
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {tip}
                  </Typography>
                </Box>
              ))}
            </Paper>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<RefreshRounded />}
                onClick={() => window.location.reload()}
                sx={{ px: 4 }}
              >
                Try Again
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<HomeRounded />}
                component={NextLink}
                href="/"
                sx={{ px: 4 }}
              >
                Go Home
              </Button>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}

"use client";

import React from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  useTheme,
  alpha,
} from "@mui/material";
import { HomeRounded } from "@mui/icons-material";
import NextLink from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { LoginForm } from "@/features/auth/login/login-form";

export default function LoginPage() {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background:
          theme.palette.mode === "dark"
            ? `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${alpha(theme.palette.primary.dark, 0.4)} 100%)`
            : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.04)} 0%, ${alpha(theme.palette.secondary.main, 0.08)} 100%)`,
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Brand */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box
              component={NextLink}
              href="/"
              aria-label={t("nav.home")}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1.5,
                textDecoration: "none",
                mb: 2,
              }}
            >
              <Box
                aria-hidden="true"
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2.5,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <HomeRounded sx={{ fontSize: 24, color: "#fff" }} />
              </Box>
              <Typography
                variant="h5"
                fontWeight={900}
                color="text.primary"
                sx={{ letterSpacing: "-0.03em" }}
              >
                {t("nav.logo")}
              </Typography>
            </Box>

            <Typography
              variant="h5"
              fontWeight={800}
              gutterBottom
              component="h1"
            >
              {t("auth.login.welcomeBack")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("auth.login.subtitle")}
            </Typography>
          </Box>

          <Paper
            elevation={3}
            sx={{ p: { xs: 3, md: 4 }, borderRadius: 3 }}
            component="main"
          >
            <LoginForm />
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}

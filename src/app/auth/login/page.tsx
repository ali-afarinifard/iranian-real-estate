"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Alert,
  Link as MuiLink,
  useTheme,
  alpha,
} from "@mui/material";
import {
  VisibilityRounded,
  VisibilityOffRounded,
  HomeRounded,
} from "@mui/icons-material";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAppDispatch } from "@/store";
import { authActions, uiActions } from "@/store/slices";
import { LoginSchema } from "@/lib/validations/schemas";
import type { LoginFormData } from "@/lib/validations/schemas";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const theme = useTheme();

  const [form, setForm] = useState<LoginFormData>({ email: "", password: "" });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange =
    (field: keyof LoginFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: "" }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    // Validate with Zod
    const result = LoginSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<LoginFormData> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof LoginFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setApiError(data.message ?? "Login failed");
        return;
      }

      dispatch(authActions.setUser(data.user));
      dispatch(
        uiActions.addNotification({
          type: "success",
          title: `Welcome back, ${data.user.name}!`,
          duration: 3000,
        }),
      );
      router.push("/dashboard");
    } catch {
      setApiError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
          {/* Logo */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box
              component={NextLink}
              href="/"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1.5,
                textDecoration: "none",
                mb: 2,
              }}
            >
              <Box
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
                Iranian Amlak
              </Typography>
            </Box>
            <Typography variant="h5" fontWeight={800} gutterBottom>
              Welcome back
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to access your saved properties and personalized
              recommendations.
            </Typography>
          </Box>

          <Paper elevation={3} sx={{ p: { xs: 3, md: 4 }, borderRadius: 3 }}>
            {apiError && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {apiError}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                label="Email address"
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                error={!!errors.email}
                helperText={errors.email}
                fullWidth
                required
                autoComplete="email"
                sx={{ mb: 2.5 }}
              />

              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange("password")}
                error={!!errors.password}
                helperText={errors.password}
                fullWidth
                required
                autoComplete="current-password"
                sx={{ mb: 3 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((s) => !s)}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? (
                          <VisibilityOffRounded />
                        ) : (
                          <VisibilityRounded />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                loading={isLoading}
                disabled={isLoading}
                sx={{ mb: 2 }}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>

              <Typography
                variant="body2"
                textAlign="center"
                color="text.secondary"
              >
                Demo: enter any email + 8+ char password
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }}>
              <Typography variant="caption" color="text.secondary">
                OR
              </Typography>
            </Divider>

            <Typography
              variant="body2"
              textAlign="center"
              color="text.secondary"
            >
              Don&apos;t have an account?{" "}
              <MuiLink
                component={NextLink}
                href="/auth/register"
                fontWeight={600}
              >
                Create one
              </MuiLink>
            </Typography>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}

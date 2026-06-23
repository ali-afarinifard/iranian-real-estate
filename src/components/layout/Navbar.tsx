"use client";

import React, { useState } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Button,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
  useMediaQuery,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  useTheme,
  alpha,
} from "@mui/material";
import {
  HomeRounded,
  SearchRounded,
  MapRounded,
  FavoriteRounded,
  DashboardRounded,
  Brightness4Rounded,
  Brightness7Rounded,
  MenuRounded,
  CloseRounded,
  TranslateRounded,
  PersonRounded,
  LogoutRounded,
  NotificationsNoneRounded,
} from "@mui/icons-material";
import {
  useAppDispatch,
  useAppSelector,
  selectColorMode,
  selectIsAuthenticated,
  selectFavoriteIds,
  selectLanguage,
} from "@/store";
import { uiActions, authActions } from "@/store/slices";
import { useTranslation } from "react-i18next";
import { toPersianNumber } from "@/lib/utils";

export function Navbar() {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const pathname = usePathname();
  const colorMode = useAppSelector(selectColorMode);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const favoriteCount = useAppSelector(selectFavoriteIds).length;
  const language = useAppSelector(selectLanguage);
  const { t, i18n } = useTranslation();

  const isRTL = i18n.dir() === "rtl";

  const NAV_LINKS = [
    { href: "/", label: t("nav.home"), icon: <HomeRounded fontSize="small" /> },
    {
      href: "/listings",
      label: t("nav.browse"),
      icon: <SearchRounded fontSize="small" />,
    },
    {
      href: "/map",
      label: t("nav.map"),
      icon: <MapRounded fontSize="small" />,
    },
    {
      href: "/favorites",
      label: t("nav.saved"),
      icon: <FavoriteRounded fontSize="small" />,
    },
    {
      href: "/dashboard",
      label: t("nav.dashboard"),
      icon: <DashboardRounded fontSize="small" />,
    },
  ];

  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(
    null,
  );

  const isDark = colorMode === "dark";

  const handleToggleTheme = () => dispatch(uiActions.toggleColorMode());

  const handleToggleLanguage = () => {
    const nextLang = language === "en" ? "fa" : "en";
    dispatch(uiActions.setLanguage(nextLang));
    i18n.changeLanguage(nextLang);
    document.documentElement.dir = nextLang === "fa" ? "rtl" : "ltr";
    document.documentElement.lang = nextLang;
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
    setUserMenuAnchor(null);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <AppBar position="fixed" elevation={0}>
        <Toolbar sx={{ gap: 1, minHeight: { xs: 56, md: 64 } }}>
          {/* Logo */}
          <Box
            component={NextLink}
            href="/"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              textDecoration: "none",
              mr: { md: 1 },
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 2,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <HomeRounded sx={{ fontSize: 18, color: "#fff" }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: "text.primary",
                letterSpacing: "-0.03em",
              }}
            >
              {t("nav.logo")}
            </Typography>
          </Box>

          {/* Desktop Nav */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 0.5, flex: 1 }}>
              {NAV_LINKS.map((link) => (
                <Button
                  key={link.href}
                  component={NextLink}
                  href={link.href}
                  startIcon={link.icon}
                  size="small"
                  sx={{
                    color: isActive(link.href)
                      ? "primary.main"
                      : "text.secondary",
                    backgroundColor: isActive(link.href)
                      ? alpha(theme.palette.primary.main, 0.1)
                      : "transparent",
                    fontWeight: isActive(link.href) ? 700 : 500,
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                      color: "primary.main",
                    },
                    position: "relative",
                    whiteSpace: "nowrap",
                    px: "13px",
                    py: "6px",
                    minWidth: "unset",
                    "& .MuiButton-startIcon": {
                      "[dir='rtl'] &": {
                        marginRight: "-2px",
                        marginLeft: "6px",
                      },
                    },
                  }}
                >
                  {link.label}
                  {link.href === "/favorites" && favoriteCount > 0 && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: -6,
                        right: 4,
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        bgcolor: "secondary.main",
                        color: "#fff",
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{ position: "relative", top: "1px" }}
                      >
                        {isRTL ? toPersianNumber(favoriteCount) : favoriteCount}
                      </Typography>
                    </Box>
                  )}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ flex: 1 }} />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // gap: "7px",
            }}
          >
            {/* Action buttons */}
            <Tooltip title={isDark ? "Light mode" : "Dark mode"}>
              <IconButton
                onClick={handleToggleTheme}
                size="small"
                sx={{ color: "text.secondary" }}
              >
                {isDark ? <Brightness7Rounded /> : <Brightness4Rounded />}
              </IconButton>
            </Tooltip>

            <Tooltip title={language === "en" ? "فارسی" : "English"}>
              <IconButton
                onClick={handleToggleLanguage}
                size="small"
                sx={{ color: "text.secondary" }}
              >
                <TranslateRounded />
              </IconButton>
            </Tooltip>

            {!isMobile && (
              <Tooltip title="Notifications">
                <IconButton size="small" sx={{ color: "text.secondary" }}>
                  <Badge
                    badgeContent={isRTL ? toPersianNumber(2) : 2}
                    color="secondary"
                    sx={{
                      "& .MuiBadge-badge": {
                        fontSize: "12px",
                        width: "11px",
                        height: "21px",
                        position: "absolute",
                        right: "3px",
                      },
                    }}
                  >
                    <NotificationsNoneRounded />
                  </Badge>
                </IconButton>
              </Tooltip>
            )}

            {/* User menu or Sign In */}
            {isAuthenticated ? (
              <>
                <Tooltip title="Account">
                  <IconButton
                    size="small"
                    onClick={(e) => setUserMenuAnchor(e.currentTarget)}
                    sx={{ p: 0.5 }}
                  >
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: "primary.main",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                      }}
                    >
                      A
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={userMenuAnchor}
                  open={Boolean(userMenuAnchor)}
                  onClose={() => setUserMenuAnchor(null)}
                  PaperProps={{ sx: { mt: 1, minWidth: 180, borderRadius: 2 } }}
                >
                  <MenuItem
                    component={NextLink}
                    href="/dashboard"
                    onClick={() => setUserMenuAnchor(null)}
                  >
                    <ListItemIcon>
                      <DashboardRounded fontSize="small" />
                    </ListItemIcon>
                    {t("nav.dashboard")}
                  </MenuItem>
                  <MenuItem
                    component={NextLink}
                    href="/favorites"
                    onClick={() => setUserMenuAnchor(null)}
                  >
                    <ListItemIcon>
                      <FavoriteRounded fontSize="small" />
                    </ListItemIcon>
                    {t("dashboard.savedProperties")}
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
                    <ListItemIcon>
                      <LogoutRounded fontSize="small" color="error" />
                    </ListItemIcon>
                    {t("nav.signOut")}
                  </MenuItem>
                </Menu>
              </>
            ) : (
              !isMobile && (
                <Button
                  component={NextLink}
                  href="/auth/login"
                  variant="contained"
                  size="small"
                  startIcon={<PersonRounded />}
                  sx={{
                    ml: 1,
                    textWrap: "nowrap",
                    "& .MuiButton-startIcon": {
                      "[dir='rtl'] &": {
                        marginRight: "-2px",
                        marginLeft: "6px",
                      },
                    },
                  }}
                >
                  {t("nav.signIn")}
                </Button>
              )
            )}

            {/* Mobile hamburger */}
            {isMobile && (
              <IconButton
                onClick={() => setMobileOpen(true)}
                size="small"
                sx={{ color: "text.primary" }}
              >
                <MenuRounded />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{ sx: { width: 280 } }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" fontWeight={800}>
            Menu
          </Typography>
          <IconButton onClick={() => setMobileOpen(false)} size="small">
            <CloseRounded />
          </IconButton>
        </Box>
        <Divider />
        <List sx={{ pt: 1 }}>
          {NAV_LINKS.map((link) => (
            <ListItemButton
              key={link.href}
              component={NextLink}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              selected={isActive(link.href)}
              sx={{ borderRadius: 2, mx: 1, mb: 0.5 }}
            >
              <ListItemIcon>{link.icon}</ListItemIcon>
              <ListItemText
                primary={link.label}
                primaryTypographyProps={{ fontWeight: 600 }}
              />
              {link.href === "/favorites" && favoriteCount > 0 && (
                <Badge badgeContent={favoriteCount} color="secondary" />
              )}
            </ListItemButton>
          ))}
        </List>
        <Divider sx={{ mt: "auto" }} />
        <Box sx={{ p: 2 }}>
          {!isAuthenticated && (
            <Button
              component={NextLink}
              href="/auth/login"
              variant="contained"
              fullWidth
              onClick={() => setMobileOpen(false)}
            >
              Sign In
            </Button>
          )}
        </Box>
      </Drawer>
    </>
  );
}

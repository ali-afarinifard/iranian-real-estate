"use client";

import { createTheme, alpha } from "@mui/material/styles";
import type { PaletteMode } from "@mui/material";

// ─── Design Tokens
const BRAND = {
  primary: {
    50: "#F0F7FF",
    100: "#C2DFFF",
    200: "#89BEFC",
    300: "#5198EF",
    400: "#2B7CE0",
    500: "#1463C7", // main
    600: "#0D4DA0",
    700: "#07377A",
    800: "#042353",
    900: "#01112E",
  },
  accent: {
    main: "#F97316", // warm orange — property highlight
    light: "#FED7AA",
    dark: "#C2410C",
  },
  success: "#22C55E",
  warning: "#F59E0B",
  error: "#EF4444",
};

const NEUTRAL = {
  50: "#F8FAFC",
  100: "#F1F5F9",
  200: "#E2E8F0",
  300: "#CBD5E1",
  400: "#94A3B8",
  500: "#64748B",
  600: "#475569",
  700: "#334155",
  800: "#1E293B",
  900: "#0F172A",
};

// ─── Theme factor
export function createNestifyTheme(mode: PaletteMode) {
  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode,
      primary: {
        main: BRAND.primary[500],
        light: BRAND.primary[300],
        dark: BRAND.primary[700],
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: BRAND.accent.main,
        light: BRAND.accent.light,
        dark: BRAND.accent.dark,
        contrastText: "#FFFFFF",
      },
      success: { main: BRAND.success },
      warning: { main: BRAND.warning },
      error: { main: BRAND.error },
      background: {
        default: isDark ? NEUTRAL[900] : NEUTRAL[50],
        paper: isDark ? NEUTRAL[800] : "#FFFFFF",
      },
      text: {
        primary: isDark ? NEUTRAL[50] : NEUTRAL[900],
        secondary: isDark ? NEUTRAL[400] : NEUTRAL[600],
        disabled: isDark ? NEUTRAL[600] : NEUTRAL[400],
      },
      divider: isDark ? alpha("#FFFFFF", 0.08) : alpha("#000000", 0.08),
    },

    typography: {
      fontFamily:
        "var(--font-vazirmatn), -apple-system, BlinkMacSystemFont, sans-serif",
      h1: {
        fontSize: "3rem",
        fontWeight: 800,
        lineHeight: 1.1,
        letterSpacing: "-0.03em",
      },
      h2: {
        fontSize: "2.25rem",
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: "-0.02em",
      },
      h3: {
        fontSize: "1.75rem",
        fontWeight: 700,
        lineHeight: 1.3,
        letterSpacing: "-0.015em",
      },
      h4: { fontSize: "1.375rem", fontWeight: 600, lineHeight: 1.4 },
      h5: { fontSize: "1.125rem", fontWeight: 600, lineHeight: 1.5 },
      h6: { fontSize: "1rem", fontWeight: 600, lineHeight: 1.5 },
      body1: { fontSize: "1rem", lineHeight: 1.6 },
      body2: { fontSize: "0.875rem", lineHeight: 1.6 },
      caption: { fontSize: "0.75rem", letterSpacing: "0.04em" },
      overline: {
        fontSize: "0.7rem",
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
      },
      button: {
        fontWeight: 600,
        letterSpacing: "0.02em",
        textTransform: "none",
      },
    },

    shape: { borderRadius: 12 },

    shadows: isDark
      ? ([
          "none",
          "0 1px 3px rgba(0,0,0,0.5)",
          "0 2px 8px rgba(0,0,0,0.4)",
          "0 4px 16px rgba(0,0,0,0.35)",
          "0 8px 32px rgba(0,0,0,0.3)",
          ...Array(20).fill("0 16px 64px rgba(0,0,0,0.25)"),
        ] as import("@mui/material").Shadows)
      : ([
          "none",
          "0 1px 3px rgba(15,23,42,0.04), 0 1px 2px rgba(15,23,42,0.06)",
          "0 4px 6px rgba(15,23,42,0.04), 0 2px 4px rgba(15,23,42,0.06)",
          "0 10px 15px rgba(15,23,42,0.04), 0 4px 6px rgba(15,23,42,0.05)",
          "0 20px 25px rgba(15,23,42,0.04), 0 8px 10px rgba(15,23,42,0.04)",
          ...Array(20).fill("0 25px 50px rgba(15,23,42,0.1)"),
        ] as import("@mui/material").Shadows),

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          "*, *::before, *::after": { boxSizing: "border-box" },
          html: { scrollBehavior: "smooth" },
          body: {
            backgroundColor: isDark ? NEUTRAL[900] : NEUTRAL[50],
            color: isDark ? NEUTRAL[50] : NEUTRAL[900],
            "-webkit-font-smoothing": "antialiased",
          },
          "::-webkit-scrollbar": { width: "6px", height: "6px" },
          "::-webkit-scrollbar-track": { background: "transparent" },
          "::-webkit-scrollbar-thumb": {
            background: isDark ? NEUTRAL[700] : NEUTRAL[300],
            borderRadius: "3px",
          },
          "::-webkit-scrollbar-thumb:hover": {
            background: isDark ? NEUTRAL[600] : NEUTRAL[400],
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            paddingTop: 10,
            paddingBottom: 10,
            fontSize: "0.875rem",
            fontWeight: 600,
          },
          contained: {
            boxShadow: "none",
            "&:hover": { boxShadow: "0 4px 12px rgba(20,99,199,0.35)" },
          },
          outlined: {
            borderWidth: "1.5px",
            "&:hover": { borderWidth: "1.5px" },
          },
          sizeLarge: { paddingTop: 13, paddingBottom: 13, fontSize: "1rem" },
          sizeSmall: { paddingTop: 6, paddingBottom: 6, fontSize: "0.8125rem" },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            border: `1px solid ${isDark ? alpha("#FFFFFF", 0.06) : alpha("#000000", 0.06)}`,
            boxShadow: isDark
              ? "0 2px 12px rgba(0,0,0,0.4)"
              : "0 2px 12px rgba(15,23,42,0.06)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: isDark
                ? "0 8px 32px rgba(0,0,0,0.5)"
                : "0 8px 32px rgba(15,23,42,0.12)",
            },
          },
        },
      },

      MuiChip: {
        styleOverrides: {
          root: { fontWeight: 600, fontSize: "0.75rem", borderRadius: 8 },
          colorPrimary: {
            backgroundColor: alpha(BRAND.primary[500], isDark ? 0.25 : 0.1),
            color: isDark ? BRAND.primary[200] : BRAND.primary[700],
          },
        },
      },

      MuiTextField: {
        defaultProps: { variant: "outlined", size: "medium" },
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 10,
              "& fieldset": {
                borderColor: isDark
                  ? alpha("#FFFFFF", 0.15)
                  : alpha("#000000", 0.15),
              },
              "&:hover fieldset": {
                borderColor: isDark
                  ? alpha("#FFFFFF", 0.3)
                  : alpha("#000000", 0.3),
              },
            },
          },
        },
      },

      MuiInputBase: {
        styleOverrides: {
          root: { borderRadius: 10 },
        },
      },

      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: isDark
              ? alpha(NEUTRAL[800], 0.85)
              : alpha("#FFFFFF", 0.85),
            backdropFilter: "blur(12px)",
            borderBottom: `1px solid ${isDark ? alpha("#FFFFFF", 0.06) : alpha("#000000", 0.06)}`,
            boxShadow: "none",
            color: isDark ? NEUTRAL[50] : NEUTRAL[900],
          },
        },
      },

      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: isDark ? NEUTRAL[800] : "#FFFFFF",
            borderRight: `1px solid ${isDark ? alpha("#FFFFFF", 0.06) : alpha("#000000", 0.06)}`,
          },
        },
      },

      MuiSkeleton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            backgroundColor: isDark
              ? alpha("#FFFFFF", 0.06)
              : alpha("#000000", 0.06),
          },
        },
      },

      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            borderRadius: 8,
            fontSize: "0.75rem",
            backgroundColor: isDark ? NEUTRAL[700] : NEUTRAL[900],
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },

      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: isDark
              ? alpha("#FFFFFF", 0.08)
              : alpha("#000000", 0.08),
          },
        },
      },
    },
  });
}

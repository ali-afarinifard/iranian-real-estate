import React from "react";
import { Box, CircularProgress, Stack, Typography, alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export function MapLoadingOverlay() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        zIndex: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: alpha(theme.palette.background.paper, 0.75),
        backdropFilter: "blur(4px)",
      }}
    >
      <Stack alignItems="center" spacing={2}>
        <CircularProgress size={40} />
        <Typography variant="body2" color="text.secondary">
          Loading listings…
        </Typography>
      </Stack>
    </Box>
  );
}
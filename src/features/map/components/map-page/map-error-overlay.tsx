import React from "react";
import { Alert, Box, Button } from "@mui/material";

interface IMapErrorOverlayProps {
  onRetry: () => void;
}

export function MapErrorOverlay({ onRetry }: IMapErrorOverlayProps) {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        zIndex: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Alert
        severity="error"
        action={
          <Button size="small" onClick={onRetry}>
            Retry
          </Button>
        }
      >
        Failed to load map data.
      </Alert>
    </Box>
  );
}
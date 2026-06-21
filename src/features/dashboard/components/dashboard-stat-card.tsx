import React from "react";
import { Box, Paper, Typography, alpha } from "@mui/material";
import { motion } from "framer-motion";

export interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  color: string;
}

export function DashboardStatCard({
  icon,
  label,
  value,
  sub,
  color,
}: StatCardProps) {
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
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ visibility: sub ? "visible" : "hidden" }}
          >
            {sub ?? "placeholder"}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

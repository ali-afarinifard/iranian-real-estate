"use client";
import React from "react";
import { Avatar, Box, Button, Paper, Stack, Typography } from "@mui/material";
import { EmailRounded, PhoneRounded } from "@mui/icons-material";
import type { PropertyAgent } from "@/types";
import { useTranslation } from "react-i18next";
import { toPersianNumber } from "@/lib/utils";

interface PropertyAgentCardProps {
  agent: PropertyAgent;
}

export function PropertyAgentCard({ agent }: PropertyAgentCardProps) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
      <Typography
        variant="overline"
        color="text.secondary"
        fontWeight={700}
        gutterBottom
        display="block"
        sx={{
          fontSize: "13px",
        }}
      >
        {t("property.listedBy")}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2.5 }}>
        <Avatar src={agent.avatar} sx={{ width: 52, height: 52 }} />
        <Box>
          <Typography fontWeight={700}>{agent.name}</Typography>
          <Typography variant="caption" color="text.secondary">
            {agent.agency}
          </Typography>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.25 }}
          >
            <Typography variant="caption" color="warning.main" fontWeight={700}>
              ★ {isRTL ? toPersianNumber(agent.rating) : agent.rating}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {isRTL
                ? `· ${toPersianNumber(agent.totalListings)} ${t("common.agentListings")}`
                : `· ${agent.totalListings} ${t("common.agentListings")}`}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Stack spacing={1}>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<PhoneRounded />}
          size="small"
          dir="ltr"
        >
          {agent.phone}
        </Button>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<EmailRounded />}
          size="small"
          sx={{
            "& .MuiButton-startIcon": {
              "[dir='rtl'] &": {
                marginRight: "-2px",
                marginLeft: "6px",
              },
            },
          }}
        >
          {t("property.sendMessage")}
        </Button>
      </Stack>
    </Paper>
  );
}

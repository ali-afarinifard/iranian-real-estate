"use client";
import React from "react";
import { Avatar, Box, Button, Paper, Stack, Typography } from "@mui/material";
import { EmailRounded, PhoneRounded } from "@mui/icons-material";
import type { IPropertyAgent } from "@/types";
import { useTranslation } from "react-i18next";
import { toPersianDigits } from "@/lib/localize";
import { useLocalize } from "@/hooks/use-localize";

interface IPropertyAgentCardProps {
  agent: IPropertyAgent;
}

export function PropertyAgentCard({ agent }: IPropertyAgentCardProps) {
  const { t, i18n } = useTranslation();
  const localize = useLocalize();
  const isRTL = i18n.dir() === "rtl";

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
      <Typography
        variant="overline"
        color="text.secondary"
        fontWeight={700}
        gutterBottom
        display="block"
        sx={{ fontSize: "13px" }}
      >
        {t("property.listedBy")}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2.5 }}>
        <Avatar src={agent.avatar} sx={{ width: 52, height: 52 }} />
        <Box>
          {/* LocalizedString — picks fa or en based on active language */}
          <Typography fontWeight={700}>{localize(agent.name)}</Typography>
          <Typography variant="caption" color="text.secondary">
            {localize(agent.agency)}
          </Typography>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.25 }}
          >
            <Typography variant="caption" color="warning.main" fontWeight={700}>
              ★ {isRTL ? toPersianDigits(String(agent.rating)) : agent.rating}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {isRTL
                ? `· ${toPersianDigits(String(agent.totalListings))} ${t("common.agentListings")}`
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
          dir="ltr" // Phone numbers always LTR
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

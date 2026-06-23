"use client";

import { Box, Typography, Chip, IconButton, Tooltip } from "@mui/material";
import { CloseRounded, FilterListRounded, RestartAltRounded } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { toPersianNumber } from "@/lib/utils";

interface IFilterPanelHeaderProps {
  activeCount: number;
  isRTL: boolean;
  onClose: () => void;
  onReset: () => void;
}

export function FilterPanelHeader({
  activeCount,
  isRTL,
  onClose,
  onReset,
}: IFilterPanelHeaderProps) {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        px: 3,
        py: 2.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid",
        borderColor: "divider",
        position: "sticky",
        top: 0,
        bgcolor: "background.paper",
        zIndex: 1,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <FilterListRounded color="primary" />
        <Typography variant="h6" fontWeight={700}>
          {t("common.filters")}
        </Typography>
        {activeCount > 0 && (
          <Chip
            label={`${isRTL ? toPersianNumber(activeCount) : activeCount} : ${t("common.activeParameters")}`}
            size="small"
            color="primary"
          />
        )}
      </Box>

      <Box sx={{ display: "flex", gap: 1 }}>
        {activeCount > 0 && (
          <Tooltip title={t("common.reset")}>
            <IconButton size="small" onClick={onReset} color="error">
              <RestartAltRounded fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        <IconButton size="small" onClick={onClose}>
          <CloseRounded />
        </IconButton>
      </Box>
    </Box>
  );
}
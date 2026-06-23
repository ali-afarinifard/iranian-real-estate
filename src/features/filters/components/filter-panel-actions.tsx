"use client";

import { Box, Button } from "@mui/material";
import { RestartAltRounded } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

interface IFilterPanelActionsProps {
  activeCount: number;
  isDirty: boolean;
  onReset: () => void;
  onApply: () => void;
}

export function FilterPanelActions({
  activeCount,
  isDirty,
  onReset,
  onApply,
}: IFilterPanelActionsProps) {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        px: 3,
        py: 2.5,
        borderTop: "1px solid",
        borderColor: "divider",
        position: "sticky",
        bottom: 0,
        bgcolor: "background.paper",
        display: "flex",
        gap: 1.5,
      }}
    >
      <Button
        variant="outlined"
        fullWidth
        onClick={onReset}
        disabled={activeCount === 0}
        startIcon={<RestartAltRounded />}
        sx={{
          "& .MuiButton-startIcon": {
            "[dir='rtl'] &": { marginRight: "-2px", marginLeft: "6px" },
          },
        }}
      >
        {t("common.reset")}
      </Button>
      <Button
        variant="contained"
        fullWidth
        onClick={onApply}
        disabled={!isDirty}
      >
        {t("common.showResults")}
      </Button>
    </Box>
  );
}
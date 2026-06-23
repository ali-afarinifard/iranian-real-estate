"use client";

import { Badge, Button, Tooltip } from "@mui/material";
import { FilterListRounded } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

interface IFilterTriggerButtonProps {
  activeCount: number;
  onClick: () => void;
}

export function FilterTriggerButton({
  activeCount,
  onClick,
}: IFilterTriggerButtonProps) {
  const { t } = useTranslation();

  return (
    <Tooltip title={t("common.filters")}>
      <Badge badgeContent={activeCount} color="secondary">
        <Button
          variant="outlined"
          startIcon={<FilterListRounded />}
          onClick={onClick}
          sx={{
            borderRadius: 2,
            fontWeight: 600,
            "& .MuiButton-startIcon": {
              "[dir='rtl'] &": { marginRight: "-2px", marginLeft: "6px" },
            },
          }}
        >
          {t("common.filters")}
        </Button>
      </Badge>
    </Tooltip>
  );
}
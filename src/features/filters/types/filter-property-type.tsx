"use client";

import { Box, Typography, Chip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { PROPERTY_TYPES } from "@/lib/constants";
import type { IPropertyFilters } from "@/types";

interface IFilterPropertyTypeProps {
  value: IPropertyFilters["type"];
  onChange: (patch: Partial<IPropertyFilters>) => void;
}

export function FilterPropertyType({ value, onChange }: IFilterPropertyTypeProps) {
  const { t } = useTranslation();

  return (
    <Box>
      <Typography
        variant="overline"
        color="text.secondary"
        fontWeight={700}
        display="block"
        sx={{ mb: 1.5 }}
      >
        {t("filters.propertyType")}
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {PROPERTY_TYPES.map((pt) => {
          const active = value?.includes(pt.value);
          return (
            <Chip
              key={pt.value}
              label={t(pt.label)}
              onClick={() => {
                const current = value ?? [];
                onChange({
                  type: active
                    ? current.filter((t) => t !== pt.value)
                    : [...current, pt.value],
                });
              }}
              variant={active ? "filled" : "outlined"}
              sx={{ fontWeight: 600 }}
            />
          );
        })}
      </Box>
    </Box>
  );
}
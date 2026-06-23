"use client";

import { Box, Typography, Chip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { PROPERTY_FEATURES } from "@/lib/constants";
import type { IPropertyFilters } from "@/types";

interface FilterFeaturesProps {
  value: IPropertyFilters["features"];
  onChange: (patch: Partial<IPropertyFilters>) => void;
}

export function FilterFeatures({ value, onChange }: FilterFeaturesProps) {
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
        {t("filters.features")}
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
        {PROPERTY_FEATURES.slice(0, 12).map((feat) => {
          const active = value?.includes(feat);
          return (
            <Chip
              key={feat}
              label={t(feat)}
              size="small"
              onClick={() => {
                const current = value ?? [];
                onChange({
                  features: active
                    ? current.filter((f) => f !== feat)
                    : [...current, feat],
                });
              }}
              variant={active ? "filled" : "outlined"}
              color={active ? "secondary" : "default"}
              sx={{ fontWeight: 500, fontSize: "0.75rem" }}
            />
          );
        })}
      </Box>
    </Box>
  );
}
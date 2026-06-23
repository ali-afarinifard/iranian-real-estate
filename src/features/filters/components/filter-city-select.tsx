"use client";

import { Box, Typography, FormControl, Select, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { CITIES } from "@/lib/constants";
import type { IPropertyFilters } from "@/types";

interface IFilterCitySelectProps {
  value: IPropertyFilters["city"];
  onChange: (patch: Partial<IPropertyFilters>) => void;
}

export function FilterCitySelect({ value, onChange }: IFilterCitySelectProps) {
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
        {t("filters.city")}
      </Typography>
      <FormControl fullWidth size="small">
        <Select
          value={value ?? ""}
          displayEmpty
          onChange={(e) => onChange({ city: e.target.value || undefined })}
          sx={{ borderRadius: 2 }}
        >
          <MenuItem value="">
            <em>{t("filters.allCities")}</em>
          </MenuItem>
          {CITIES.map((c) => (
            <MenuItem key={c.value} value={c.value}>
              {c.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
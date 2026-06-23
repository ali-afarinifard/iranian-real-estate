"use client";

import { Box, Typography, FormControl, Select, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { SORT_OPTIONS } from "@/lib/constants";
import type { IPropertyFilters } from "@/types";

interface IFilterSortSelectProps {
  value: IPropertyFilters["sortBy"];
  onChange: (patch: Partial<IPropertyFilters>) => void;
}

export function FilterSortSelect({ value, onChange }: IFilterSortSelectProps) {
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
        {t("filters.sortBy")}
      </Typography>
      <FormControl fullWidth size="small">
        <Select
          value={value ?? "newest"}
          onChange={(e) =>
            onChange({ sortBy: e.target.value as IPropertyFilters["sortBy"] })
          }
          sx={{ borderRadius: 2 }}
        >
          {SORT_OPTIONS.map((s) => (
            <MenuItem key={s.value} value={s.value}>
              {t(s.label)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
"use client";

import { Box, Typography, Chip, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { LISTING_TYPES } from "@/lib/constants";
import type { IPropertyFilters } from "@/types";

interface IFilterListingTypeProps {
  value: IPropertyFilters["listingType"];
  onChange: (patch: Partial<IPropertyFilters>) => void;
}

export function FilterListingType({ value, onChange }: IFilterListingTypeProps) {
  const { t } = useTranslation();

  const options = [
    { value: undefined, label: t("common.filterTypeAll") },
    ...LISTING_TYPES,
  ];

  return (
    <Box>
      <Typography
        variant="overline"
        color="text.secondary"
        fontWeight={700}
        display="block"
        sx={{ mb: 1.5 }}
      >
        {t("common.listingType")}
      </Typography>
      <Stack direction="row" gap={1}>
        {options.map((lt) => (
          <Chip
            key={lt.label}
            label={t(lt.label ?? "")}
            onClick={() =>
              onChange({ listingType: lt.value as IPropertyFilters["listingType"] })
            }
            variant={value === lt.value ? "filled" : "outlined"}
            sx={{ fontWeight: 600, flex: 1 }}
          />
        ))}
      </Stack>
    </Box>
  );
}
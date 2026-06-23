"use client";

import { Box, Typography, Slider } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { IPropertyFilters } from "@/types";

const PRICE_MAX_SALE = 5_000_000;
const PRICE_MAX_RENT = 10_000;

interface IFilterPriceRangeProps {
  priceMin: IPropertyFilters["priceMin"];
  priceMax: IPropertyFilters["priceMax"];
  isRent: boolean;
  onChange: (patch: Partial<IPropertyFilters>) => void;
}

export function FilterPriceRange({
  priceMin,
  priceMax,
  isRent,
  onChange,
}: IFilterPriceRangeProps) {
  const { t } = useTranslation();
  const maxLimit = isRent ? PRICE_MAX_RENT : PRICE_MAX_SALE;

  return (
    <Box>
      <Typography
        variant="overline"
        color="text.secondary"
        fontWeight={700}
        display="block"
        sx={{ mb: 0.5 }}
      >
        {t("filters.priceRange")}
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ mb: 2, display: "block" }}
      >
        €{(priceMin ?? 0).toLocaleString()} — €
        {(priceMax ?? maxLimit).toLocaleString()}
        {isRent && "/mo"}
      </Typography>
      <Slider
        value={[priceMin ?? 0, priceMax ?? maxLimit]}
        min={0}
        max={maxLimit}
        step={isRent ? 200 : 10_000}
        onChange={(_, val) => {
          const [min, max] = val as number[];
          onChange({
            priceMin: min || undefined,
            priceMax: max === maxLimit ? undefined : max,
          });
        }}
        valueLabelDisplay="auto"
        valueLabelFormat={(v) => `€${(v / 1000).toFixed(0)}k`}
        disableSwap
        sx={{ color: "primary.main" }}
      />
    </Box>
  );
}
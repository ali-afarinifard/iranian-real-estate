"use client";

import { Box, Typography, Slider } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { IPropertyFilters } from "@/types";
import { PRICE_SLIDER } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

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
  const { t, i18n } = useTranslation();
  const { min, max, step } = PRICE_SLIDER[isRent ? "rent" : "sale"];

  const isRTL = i18n.dir() === "rtl";
  const locale = isRTL ? "fa-IR" : "en-US";

  const currentMin = priceMin ?? min;
  const currentMax = priceMax ?? max;

  const fmt = (v: number) => formatPrice(v, "IRR", locale);

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
        {fmt(currentMin)} — {fmt(currentMax)} {isRTL ? "تومان" : "T"}
        {isRent && ` / ${t("common.perMonth")}`}
      </Typography>
      <Slider
        value={[currentMin, currentMax]}
        min={min}
        max={max}
        step={step}
        onChange={(_, val) => {
          const [newMin, newMax] = val as number[];
          onChange({
            priceMin: newMin > min ? newMin : undefined,
            priceMax: newMax < max ? newMax : undefined,
          });
        }}
        valueLabelDisplay="auto"
        valueLabelFormat={fmt}
        disableSwap
        sx={{ color: "primary.main" }}
      />
    </Box>
  );
}

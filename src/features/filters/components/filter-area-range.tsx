"use client";

import { Box, Typography, Slider } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { IPropertyFilters } from "@/types";

const AREA_MAX = 500;

interface IFilterAreaRangeProps {
  areaMin: IPropertyFilters["areaMin"];
  areaMax: IPropertyFilters["areaMax"];
  onChange: (patch: Partial<IPropertyFilters>) => void;
}

export function FilterAreaRange({ areaMin, areaMax, onChange }: IFilterAreaRangeProps) {
  const { t } = useTranslation();

  return (
    <Box>
      <Typography
        variant="overline"
        color="text.secondary"
        fontWeight={700}
        display="block"
        sx={{ mb: 0.5 }}
      >
        {t("common.area")}
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ mb: 2, display: "block", direction: "ltr" }}
      >
        {areaMin ?? 0} m² — {areaMax ?? AREA_MAX}+ m²
      </Typography>
      <Slider
        value={[areaMin ?? 0, areaMax ?? AREA_MAX]}
        min={0}
        max={AREA_MAX}
        step={10}
        onChange={(_, val) => {
          const [min, max] = val as number[];
          onChange({
            areaMin: min || undefined,
            areaMax: max === AREA_MAX ? undefined : max,
          });
        }}
        valueLabelDisplay="auto"
        valueLabelFormat={(v) => `${v}m²`}
        disableSwap
        sx={{ color: "secondary.main" }}
      />
    </Box>
  );
}
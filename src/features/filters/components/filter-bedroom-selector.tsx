"use client";

import { Box, Typography, Chip, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { toPersianNumber } from "@/lib/utils";
import type { IPropertyFilters } from "@/types";

const BEDROOMS = [1, 2, 3, 4, 5];

const options = [
  { label: "Any", value: undefined as number | undefined },
  ...BEDROOMS.map((b) => ({ label: b === 5 ? "5+" : String(b), value: b })),
];

interface IFilterBedroomSelectorProps {
  value: IPropertyFilters["bedrooms"];
  isRTL: boolean;
  onChange: (patch: Partial<IPropertyFilters>) => void;
}

export function FilterBedroomSelector({
  value,
  isRTL,
  onChange,
}: IFilterBedroomSelectorProps) {
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
        {t("property.bedrooms")}
      </Typography>
      <Stack direction="row" gap={1}>
        {options.map((opt) => {
          const isActive =
            opt.value === undefined
              ? !value?.length
              : value?.includes(opt.value);

          return (
            <Chip
              key={opt.label}
              label={isRTL ? toPersianNumber(opt.label) : opt.label}
              size="small"
              onClick={() => {
                if (opt.value === undefined) {
                  onChange({ bedrooms: undefined });
                } else {
                  const current = value ?? [];
                  onChange({
                    bedrooms: current.includes(opt.value)
                      ? current.filter((b) => b !== opt.value)
                      : [...current, opt.value],
                  });
                }
              }}
              variant={isActive ? "filled" : "outlined"}
              sx={{ fontWeight: 600, minWidth: 40 }}
            />
          );
        })}
      </Stack>
    </Box>
  );
}
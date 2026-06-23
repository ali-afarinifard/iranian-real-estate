"use client";

import React from "react";
import {
  Box,
  Typography,
  Chip,
  Button,
  Stack,
  IconButton,
  Divider,
  useTheme,
  alpha,
} from "@mui/material";
import {
  CloseRounded,
  BedRounded,
  SquareFootRounded,
  LocationOnRounded,
  ArrowForwardRounded,
  PhoneRounded,
} from "@mui/icons-material";
import NextImage from "next/image";
import NextLink from "next/link";
import { formatTomanPrice } from "@/lib/localize";
import { toPersianNumber } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useLocalize } from "@/hooks/use-localize";
import { IMapProperty } from "@/types";
import type { Language } from "@/types";

interface IMapPropertyPanelProps {
  property: IMapProperty;
  onClose: () => void;
  mobile?: boolean;
}

export function MapPropertyPanel({
  property,
  onClose,
  mobile = false,
}: IMapPropertyPanelProps) {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const localize = useLocalize();

  const isSale = property.listingType === "sale";
  const isRTL = i18n.dir() === "rtl";
  const lang = i18n.language as Language;

  return (
    <Box
      sx={{
        width: mobile ? "100%" : 380,
        height: mobile ? "auto" : "100%",
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        borderLeft: mobile ? "none" : `1px solid ${theme.palette.divider}`,
        overflow: "hidden",
      }}
    >
      {/* Hero image */}
      <Box sx={{ position: "relative", height: 240, flexShrink: 0 }}>
        <NextImage
          src={property.primaryImage.url}
          alt={property.primaryImage.alt}
          fill
          sizes="380px"
          style={{ objectFit: "cover" }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)",
          }}
        />

        {/* Close + Favorite */}
        <Box
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
          }}
        >
          <IconButton
            size="small"
            onClick={onClose}
            sx={{
              bgcolor: alpha("#000", 0.4),
              color: "#fff",
              "&:hover": { bgcolor: alpha("#000", 0.6) },
            }}
          >
            <CloseRounded fontSize="small" />
          </IconButton>
        </Box>

        {/* Badges + price */}
        <Box sx={{ position: "absolute", bottom: 16, left: 16 }}>
          <Stack direction="row" gap={0.75} sx={{ mb: 1 }}>
            <Chip
              label={isSale ? t("dashboard.forSale") : t("dashboard.forRent")}
              size="small"
              sx={{
                bgcolor: isSale ? "#1463C7" : "#F97316",
                color: "#fff",
                fontWeight: 700,
              }}
            />
            <Chip
              label={t(`property.type.${property.type}`)}
              size="small"
              sx={{
                bgcolor: alpha("#fff", 0.2),
                color: "#fff",
                fontWeight: 600,
                textTransform: "capitalize",
              }}
            />
          </Stack>
          <Typography
            variant="h4"
            fontWeight={900}
            sx={{ color: "#fff", lineHeight: 1.1, textAlign: "left" }}
          >
            {formatTomanPrice(property.price, lang)}
            {!isSale && (
              <Typography
                component="span"
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.75)", ml: 0.75 }}
              >
                {isRTL ? "/ماه" : "/month"}
              </Typography>
            )}
          </Typography>
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, overflowY: "auto", p: 2.5 }}>
        <Typography
          variant="h6"
          fontWeight={800}
          sx={{ mb: 0.5, lineHeight: 1.3 }}
        >
          {localize(property.title)}
        </Typography>

        {/* Stats row */}
        <Stack
          direction="row"
          spacing={0}
          sx={{
            mt: 2,
            mb: 2.5,
            bgcolor: "action.hover",
            borderRadius: 2.5,
            overflow: "hidden",
          }}
        >
          {property.bedrooms > 0 && (
            <Box
              sx={{
                flex: 1,
                py: 1.5,
                textAlign: "center",
                borderRight: "1px solid",
                borderColor: "divider",
              }}
            >
              <BedRounded
                sx={{
                  fontSize: 20,
                  color: "primary.main",
                  display: "block",
                  mx: "auto",
                  mb: 0.25,
                }}
              />
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
              >
                {t("map.beds")}
              </Typography>
              <Typography variant="subtitle2" fontWeight={800}>
                {isRTL ? toPersianNumber(property.bedrooms) : property.bedrooms}
              </Typography>
            </Box>
          )}
          <Box
            sx={{
              flex: 1,
              py: 1.5,
              textAlign: "center",
              borderRight: property.bedrooms > 0 ? "1px solid" : "none",
              borderColor: "divider",
            }}
          >
            <SquareFootRounded
              sx={{
                fontSize: 20,
                color: "primary.main",
                display: "block",
                mx: "auto",
                mb: 0.25,
              }}
            />
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
            >
              {t("property.area")}
            </Typography>
            <Typography variant="subtitle2" fontWeight={800}>
              {isRTL ? toPersianNumber(property.area) : property.area}m²
            </Typography>
          </Box>
          <Box sx={{ flex: 1, py: 1.5, textAlign: "center" }}>
            <LocationOnRounded
              sx={{
                fontSize: 20,
                color: "primary.main",
                display: "block",
                mx: "auto",
                mb: 0.25,
              }}
            />
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
            >
              {t("map.type")}
            </Typography>
            <Typography
              variant="subtitle2"
              fontWeight={800}
              sx={{ textTransform: "capitalize" }}
            >
              {t(`property.type.${property.type}`)}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ mb: 2.5 }} />

        {/* CTA buttons */}
        <Stack spacing={1.5}>
          <Button
            component={NextLink}
            href={`/property/${property.id}`}
            variant="contained"
            fullWidth
            size="large"
            startIcon={isRTL ? <ArrowForwardRounded /> : undefined}
            endIcon={isRTL ? undefined : <ArrowForwardRounded />}
            sx={{
              borderRadius: 2.5,
              py: 1.5,
              fontWeight: 700,
              "& .MuiButton-startIcon": {
                "[dir='rtl'] &": {
                  marginRight: "-2px",
                  marginLeft: "6px",
                },
              },
            }}
          >
            {t("map.viewFullDetails")}
          </Button>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<PhoneRounded />}
            sx={{
              borderRadius: 2.5,
              "& .MuiButton-startIcon": {
                "[dir='rtl'] &": {
                  marginRight: "-2px",
                  marginLeft: "6px",
                },
              },
            }}
          >
            {t("map.contactAgent")}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

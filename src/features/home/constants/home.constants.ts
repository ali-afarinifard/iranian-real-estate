import {
  ApartmentRounded,
  MapRounded,
  VerifiedRounded,
  HouseRounded,
  DomainRounded,
  TrendingUpRounded,
} from "@mui/icons-material";
import React from "react";

export const HERO_STATS = [
  {
    labelKey: "home.stats.propertiesListed" as const,
    fallback: "Properties Listed",
    value: "2,400+",
    icon: React.createElement(ApartmentRounded),
  },
  {
    labelKey: "home.stats.citiesCovered" as const,
    fallback: "Cities Covered",
    value: "5",
    icon: React.createElement(MapRounded),
  },
  {
    labelKey: "home.stats.happyClients" as const,
    fallback: "Happy Clients",
    value: "1,800+",
    icon: React.createElement(VerifiedRounded),
  },
] as const;

export const QUICK_FILTERS = [
  {
    labelKey: "property.type.apartment" as const,
    type: "apartment" as const,
    listingType: undefined,
    icon: React.createElement(ApartmentRounded, { fontSize: "small" }),
  },
  {
    labelKey: "property.type.villa" as const,
    type: "villa" as const,
    listingType: undefined,
    icon: React.createElement(HouseRounded, { fontSize: "small" }),
  },
  {
    labelKey: "property.type.penthouse" as const,
    type: "penthouse" as const,
    listingType: undefined,
    icon: React.createElement(DomainRounded, { fontSize: "small" }),
  },
  {
    labelKey: "property.forRent" as const,
    type: undefined,
    listingType: "rent" as const,
    icon: React.createElement(TrendingUpRounded, { fontSize: "small" }),
  },
] as const;

export const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    titleKey: "home.howItWorks.step1.title" as const,
    descKey: "home.howItWorks.step1.desc" as const,
    titleFallback: "Search & Filter",
    descFallback:
      "Use powerful filters — price, type, location, features — to narrow down exactly what you need.",
    colorKey: "primary" as const,
  },
  {
    step: "02",
    titleKey: "home.howItWorks.step2.title" as const,
    descKey: "home.howItWorks.step2.desc" as const,
    titleFallback: "Explore on Map",
    descFallback:
      "Browse listings spatially. See neighborhoods, schools, and amenities at a glance.",
    colorKey: "secondary" as const,
  },
  {
    step: "03",
    titleKey: "home.howItWorks.step3.title" as const,
    descKey: "home.howItWorks.step3.desc" as const,
    titleFallback: "Connect & Close",
    descFallback:
      "Contact the agent directly, schedule a viewing, and make your move with confidence.",
    colorKey: "success" as const,
  },
] as const;

import { PropertyType, ListingType } from "@/types";

export const CITIES = [
  { value: "amsterdam", label: "Amsterdam", lat: 52.3676, lng: 4.9041 },
  { value: "rotterdam", label: "Rotterdam", lat: 51.9225, lng: 4.4792 },
  { value: "the-hague", label: "The Hague", lat: 52.0705, lng: 4.3007 },
  { value: "utrecht", label: "Utrecht", lat: 52.0907, lng: 5.1214 },
  { value: "eindhoven", label: "Eindhoven", lat: 51.4416, lng: 5.4697 },
];

export const PROPERTY_TYPES: {
  value: PropertyType;
  label: string;
  icon: string;
}[] = [
  {
    value: "apartment",
    label: "property.type.apartment",
    icon: "ApartmentRounded",
  },
  { value: "villa", label: "property.type.villa", icon: "HouseRounded" },
  { value: "office", label: "property.type.office", icon: "BusinessRounded" },
  { value: "land", label: "property.type.land", icon: "LandscapeRounded" },
  {
    value: "penthouse",
    label: "property.type.penthouse",
    icon: "DomainRounded",
  },
];

export const LISTING_TYPES: { value: ListingType; label: string }[] = [
  { value: "sale", label: "common.filterTypeSale" },
  { value: "rent", label: "common.filterTypeRent" },
];

export const PROPERTY_FEATURES = [
  "property.features.swimmingPool",
  "property.features.parking",
  "property.features.garden",
  "property.features.balcony",
  "property.features.elevator",
  "property.features.airConditioning",
  "property.features.centralHeating",
  "property.features.storage",
  "property.features.gym",
  "property.features.securitySystem",
  "property.features.smartHome",
  "property.features.furnished",
  "property.features.petFriendly",
  "property.features.fireplace",
  "property.features.rooftopAccess",
  "property.features.concierge",
  "property.features.eVCharging",
  "property.features.solarPanels",
];

export const SORT_OPTIONS = [
  { value: "newest", label: "sortOptions.newestFirst" },
  { value: "price_asc", label: "sortOptions.priceLowToHigh" },
  { value: "price_desc", label: "sortOptions.priceHighToLow" },
  { value: "area_asc", label: "sortOptions.sizeSmallToLarge" },
  { value: "area_desc", label: "sortOptions.sizeLargeToSmall" },
  { value: "popular", label: "sortOptions.mostPopular" },
];

export const PRICE_RANGES = {
  sale: [
    { min: 0, max: 2_000_000_000, label: "زیر ۲ میلیارد" },
    { min: 2_000_000_000, max: 4_000_000_000, label: "۲ - ۴ میلیارد" },
    { min: 4_000_000_000, max: 7_000_000_000, label: "۴ - ۷ میلیارد" },
    { min: 7_000_000_000, max: 10_000_000_000, label: "۷ - ۱۰ میلیارد" },
    { min: 10_000_000_000, max: undefined, label: "بالای ۱۰ میلیارد" },
  ],
  rent: [
    { min: 0, max: 20_000_000, label: "زیر ۲۰ میلیون" },
    { min: 20_000_000, max: 30_000_000, label: "۲۰ - ۳۰ میلیون" },
    { min: 30_000_000, max: 40_000_000, label: "۳۰ - ۴۰ میلیون" },
    { min: 40_000_000, max: undefined, label: "بالای ۴۰ میلیون" },
  ],
};

export const PRICE_SLIDER = {
  sale: { min: 0, max: 10_000_000_000, step: 500_000_000 },
  rent: { min: 0, max: 60_000_000, step: 4_000_000 },
};

export const AREA_SLIDER = {
  min: 0,
  max: 2_000,
  step: 10,
};

export const PER_PAGE = 12;

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api";

export const MSW_DELAY = 600; // ms — simulates realistic network latency

export const MAP_CONFIG = {
  defaultCenter: [35.6892, 51.389] as [number, number], // Tehran
  defaultZoom: 11,
  maxZoom: 18,
  tileLayer: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  attribution: "© OpenStreetMap contributors",
};

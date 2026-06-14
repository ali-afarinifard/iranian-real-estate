import { PropertyType, ListingType } from '@/types';

export const CITIES = [
  { value: 'amsterdam', label: 'Amsterdam', lat: 52.3676, lng: 4.9041 },
  { value: 'rotterdam', label: 'Rotterdam', lat: 51.9225, lng: 4.4792 },
  { value: 'the-hague', label: 'The Hague', lat: 52.0705, lng: 4.3007 },
  { value: 'utrecht', label: 'Utrecht', lat: 52.0907, lng: 5.1214 },
  { value: 'eindhoven', label: 'Eindhoven', lat: 51.4416, lng: 5.4697 },
];

export const PROPERTY_TYPES: { value: PropertyType; label: string; icon: string }[] = [
  { value: 'apartment', label: 'Apartment', icon: 'ApartmentRounded' },
  { value: 'villa', label: 'Villa', icon: 'HouseRounded' },
  { value: 'office', label: 'Office', icon: 'BusinessRounded' },
  { value: 'land', label: 'Land', icon: 'LandscapeRounded' },
  { value: 'penthouse', label: 'Penthouse', icon: 'DomainRounded' },
];

export const LISTING_TYPES: { value: ListingType; label: string }[] = [
  { value: 'sale', label: 'For Sale' },
  { value: 'rent', label: 'For Rent' },
];

export const PROPERTY_FEATURES = [
  'Swimming Pool',
  'Parking',
  'Garden',
  'Balcony',
  'Elevator',
  'Air Conditioning',
  'Central Heating',
  'Storage',
  'Gym',
  'Security System',
  'Smart Home',
  'Furnished',
  'Pet Friendly',
  'Fireplace',
  'Rooftop Access',
  'Concierge',
  'EV Charging',
  'Solar Panels',
];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'area_asc', label: 'Size: Small to Large' },
  { value: 'area_desc', label: 'Size: Large to Small' },
  { value: 'popular', label: 'Most Popular' },
];

export const PRICE_RANGES = {
  sale: [
    { min: 0, max: 250000, label: 'Under €250K' },
    { min: 250000, max: 500000, label: '€250K - €500K' },
    { min: 500000, max: 1000000, label: '€500K - €1M' },
    { min: 1000000, max: 2000000, label: '€1M - €2M' },
    { min: 2000000, max: undefined, label: 'Over €2M' },
  ],
  rent: [
    { min: 0, max: 1000, label: 'Under €1,000/mo' },
    { min: 1000, max: 2000, label: '€1,000 - €2,000' },
    { min: 2000, max: 4000, label: '€2,000 - €4,000' },
    { min: 4000, max: undefined, label: 'Over €4,000' },
  ],
};

export const PER_PAGE = 12;

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '/api';

export const MSW_DELAY = 600; // ms — simulates realistic network latency

export const MAP_CONFIG = {
  defaultCenter: [52.3676, 4.9041] as [number, number], // Amsterdam
  defaultZoom: 12,
  maxZoom: 18,
  tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '© OpenStreetMap contributors',
};

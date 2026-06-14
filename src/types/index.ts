// ─── Property

export type PropertyType = 'apartment' | 'villa' | 'office' | 'land' | 'penthouse';
export type ListingType = 'sale' | 'rent';
export type PropertyStatus = 'available' | 'sold' | 'rented' | 'pending';

export interface PropertyImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface PropertyLocation {
  address: string;
  city: string;
  district: string;
  lat: number;
  lng: number;
  zipCode?: string;
}

export interface PropertyAgent {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  email: string;
  agency: string;
  rating: number;
  totalListings: number;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;
  type: PropertyType;
  listingType: ListingType;
  status: PropertyStatus;
  price: number;
  pricePerSqm?: number;
  currency: 'EUR' | 'USD' | 'IRR';
  area: number; // sqm
  bedrooms: number;
  bathrooms: number;
  parkingSpots: number;
  floor?: number;
  totalFloors?: number;
  yearBuilt?: number;
  images: PropertyImage[];
  location: PropertyLocation;
  agent: PropertyAgent;
  features: string[];
  isFeatured: boolean;
  isNew: boolean;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface PropertySummary {
  id: string;
  title: string;
  slug: string;
  type: PropertyType;
  listingType: ListingType;
  status: PropertyStatus;
  price: number;
  currency: 'EUR' | 'USD' | 'IRR';
  area: number;
  bedrooms: number;
  bathrooms: number;
  primaryImage: PropertyImage;
  location: Pick<PropertyLocation, 'city' | 'district' | 'lat' | 'lng'>;
  isFeatured: boolean;
  isNew: boolean;
  createdAt: string;
}

// Filters

export interface PropertyFilters {
  query?: string;
  type?: PropertyType[];
  listingType?: ListingType;
  city?: string;
  district?: string;
  priceMin?: number;
  priceMax?: number;
  areaMin?: number;
  areaMax?: number;
  bedrooms?: number[];
  bathrooms?: number[];
  features?: string[];
  sortBy?: 'price_asc' | 'price_desc' | 'area_asc' | 'area_desc' | 'newest' | 'popular';
}

// API Responses

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
}

// Auth

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'buyer' | 'seller' | 'agent' | 'admin';
  savedProperties: string[];
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

// Real-time

export type SSEEventType = 'price_update' | 'new_listing' | 'status_change' | 'view_update';

export interface SSEEvent {
  type: SSEEventType;
  propertyId: string;
  payload: Record<string, unknown>;
  timestamp: string;
}

// UI State

export type ViewMode = 'grid' | 'list' | 'map';
export type ColorMode = 'light' | 'dark';
export type Language = 'en' | 'fa';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
  duration?: number;
  createdAt: number;
}

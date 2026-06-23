
// ─── Localization ──────────────────────────────────────────────────────────────
/**
 * User-generated content that must be bilingual.
 * Backend stores both; frontend picks the right one at render time via `useLocalize()`.
 * If the English translation is missing, the Persian fallback is used automatically.
 */
export interface ILocalizedString {
  fa: string;
  en?: string;
}

// ─── Property

export type PropertyType =
  | "apartment"
  | "villa"
  | "office"
  | "land"
  | "penthouse";
export type ListingType = "sale" | "rent";
export type PropertyStatus = "available" | "sold" | "rented" | "pending";

export interface IPropertyImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface IPropertyLocation {
  /** Bilingual — use `useLocalize()` or `localize()` to display */
  address: ILocalizedString;
  /** Bilingual — use `useLocalize()` or `localize()` to display */
  city: ILocalizedString;
  /** Bilingual — use `useLocalize()` or `localize()` to display */
  district: ILocalizedString;
  lat: number;
  lng: number;
  zipCode?: string;
}

export interface IPropertyAgent {
  id: string;
  /** Bilingual — use `useLocalize()` or `localize()` to display */
  name: ILocalizedString;
  avatar: string;
  phone: string;
  email: string;
  /** Bilingual — use `useLocalize()` or `localize()` to display */
  agency: ILocalizedString;
  rating: number;
  totalListings: number;
}

export interface IProperty {
  id: string;
  /** Bilingual — use `useLocalize()` or `localize()` to display */
  title: ILocalizedString;
  /**
   * Slug is always Latin/ASCII for clean URLs.
   * Backend generates this from the English title (or a transliterated version).
   * Never derive slug from the Persian title.
   */
  slug: string;
  /** Bilingual — use `useLocalize()` or `localize()` to display */
  description: ILocalizedString;
  type: PropertyType;
  listingType: ListingType;
  status: PropertyStatus;
  /**
   * Price is always stored in Tomans (تومان).
   * Never store in Rials to avoid 10× confusion.
   * Backend contract: price field = Tomans.
   */
  price: number;
  pricePerSqm?: number;
  currency: "IRR";
  area: number; // sqm
  bedrooms: number;
  bathrooms: number;
  parkingSpots: number;
  floor?: number;
  totalFloors?: number;
  /**
   * yearBuilt is stored as a Jalali (Shamsi) year, e.g. 1395.
   * Backend stores and returns Jalali. Frontend does NOT convert.
   */
  yearBuilt?: number;
  images: IPropertyImage[];
  location: IPropertyLocation;
  agent: IPropertyAgent;
  features: string[];
  isFeatured: boolean;
  isNew: boolean;
  viewCount: number;
  createdAt: string; // ISO 8601 UTC — always Gregorian for sorting/comparison
  updatedAt: string;
}

export interface IPropertySummary {
  id: string;
  /** Bilingual — use `useLocalize()` or `localize()` to display */
  title: ILocalizedString;
  slug: string;
  type: PropertyType;
  listingType: ListingType;
  status: PropertyStatus;
  price: number;
  currency: "IRR";
  area: number;
  bedrooms: number;
  bathrooms: number;
  primaryImage: IPropertyImage;
  location: Pick<IPropertyLocation, "city" | "district" | "lat" | "lng">;
  isFeatured: boolean;
  isNew: boolean;
  createdAt: string;
}

/**
 * Lightweight property shape used exclusively by the map view.
 * Intentionally minimal — map pins don't need full property data.
 * Full data is fetched on demand when the user clicks a pin.
 */
export interface IMapProperty {
  id: string;
  /** Bilingual — use `useLocalize()` or `localize()` to display */
  title: ILocalizedString;
  price: number;
  currency: "IRR";
  type: PropertyType;
  listingType: ListingType;
  status: PropertyStatus;
  lat: number;
  lng: number;
  primaryImage: IPropertyImage;
  bedrooms: number;
  area: number;
}

export interface PropertyCardProps {
  property: IPropertySummary;
  viewMode?: "grid" | "list";
  index?: number;
  onSelect?: (id: string) => void;
}

export interface PropertyCardSharedProps extends PropertyCardProps {
  isFavorited: boolean;
  onFavorite: (e: React.MouseEvent) => void;
}

// ─── Filters
// NOTE: city/district filters are matched against the Persian (`fa`) value,
// since that's the canonical/stable key used for filtering & comparison
// regardless of UI language. The English value is for display only.

export interface IPropertyFilters {
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
  sortBy?:
    | "price_asc"
    | "price_desc"
    | "area_asc"
    | "area_desc"
    | "newest"
    | "popular";
}

// ─── API ──────────────────────────────────────────────────────────────────────

export interface IPaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

export interface IApiError {
  message: string;
  code: string;
  status: number;
}

/**
 * Arguments for the paginated properties list endpoint.
 * Defined here (not in the API layer) so other features can
 * reference this shape without importing from the store.
 */
export interface IGetPropertiesArgs {
  filters?: IPropertyFilters;
  page?: number;
  perPage?: number;
}

// ─── Auth

export interface IUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "buyer" | "seller" | "agent" | "admin";
  savedProperties: string[];
  createdAt: string;
}

export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

// ─── Real-time

export type SSEEventType =
  | "price_update"
  | "new_listing"
  | "status_change"
  | "view_update";

export interface ISSEEvent {
  type: SSEEventType;
  propertyId: string;
  payload: Record<string, unknown>;
  timestamp: string;
}

// ─── UI State

export type ViewMode = "grid" | "list" | "map";
export type ColorMode = "light" | "dark";
export type Language = "en" | "fa";

export interface INotification {
  id: string;
  type: "success" | "error" | "info" | "warning";
  title: string;
  message?: string;
  duration?: number;
  createdAt: number;
}

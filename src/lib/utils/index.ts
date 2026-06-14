import { PropertyFilters } from '@/types';

// Price Formatting

export function formatPrice(
  price: number,
  currency: 'EUR' | 'USD' | 'IRR' = 'EUR',
  locale = 'en-NL'
): string {
  if (currency === 'IRR') {
    return new Intl.NumberFormat('fa-IR', {
      style: 'currency',
      currency: 'IRR',
      maximumFractionDigits: 0,
    }).format(price);
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
    notation: price >= 1_000_000 ? 'compact' : 'standard',
  }).format(price);
}

export function formatArea(area: number): string {
  return `${area.toLocaleString()} m²`;
}

// URL / Filter Helpers

export function filtersToQueryString(filters: PropertyFilters): string {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    if (Array.isArray(value)) {
      if (value.length > 0) params.set(key, value.join(','));
    } else {
      params.set(key, String(value));
    }
  });

  return params.toString();
}

export function queryStringToFilters(search: string): PropertyFilters {
  const params = new URLSearchParams(search);
  const filters: PropertyFilters = {};

  params.forEach((value, key) => {
    const arrayKeys = ['type', 'bedrooms', 'bathrooms', 'features'];
    if (arrayKeys.includes(key)) {
      (filters as any)[key] = value.split(',');
    } else if (['priceMin', 'priceMax', 'areaMin', 'areaMax'].includes(key)) {
      (filters as any)[key] = Number(value);
    } else {
      (filters as any)[key] = value;
    }
  });

  return filters;
}

export function countActiveFilters(filters: PropertyFilters): number {
  return Object.entries(filters).filter(([key, value]) => {
    if (key === 'sortBy') return false; // don't count sort
    if (Array.isArray(value)) return value.length > 0;
    return value !== undefined && value !== '';
  }).length;
}

// Slug / ID

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Date helpers

export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

// Class names

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Random / Mock helpers

export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

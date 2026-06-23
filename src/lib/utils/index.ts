import type { IPropertyFilters } from "@/types";

const numberFormatCache = new Map<string, Intl.NumberFormat>();

function getNumberFormat(
  locale: string,
  options: Intl.NumberFormatOptions,
): Intl.NumberFormat {
  const key = `${locale}:${JSON.stringify(options)}`;
  if (!numberFormatCache.has(key)) {
    numberFormatCache.set(key, new Intl.NumberFormat(locale, options));
  }
  return numberFormatCache.get(key)!;
}

// ── Price Formatting
export function formatPrice(
  price: number,
  currency: "EUR" | "USD" | "IRR" = "EUR",
  locale = "en-NL",
): string {
  if (currency === "IRR") {
    return getNumberFormat("fa-IR", {
      style: "currency",
      currency: "IRR",
      maximumFractionDigits: 0,
    }).format(price);
  }

  return getNumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
    notation: price >= 1_000_000 ? "compact" : "standard",
  }).format(price);
}

export function formatArea(area: number, locale = "en-NL"): string {
  return `${area.toLocaleString(locale)} m²`;
}

// ── URL / Filter Helpers
const ARRAY_FILTER_KEYS = new Set<keyof IPropertyFilters>([
  "type",
  "bedrooms",
  "bathrooms",
  "features",
]);
const NUMBER_FILTER_KEYS = new Set<keyof IPropertyFilters>([
  "priceMin",
  "priceMax",
  "areaMin",
  "areaMax",
]);

export function filtersToQueryString(filters: IPropertyFilters): string {
  const params = new URLSearchParams();

  (
    Object.entries(filters) as [
      keyof IPropertyFilters,
      IPropertyFilters[keyof IPropertyFilters],
    ][]
  ).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    if (Array.isArray(value)) {
      if (value.length > 0) params.set(key, value.join(","));
    } else {
      params.set(key, String(value));
    }
  });

  return params.toString();
}

export function queryStringToFilters(search: string): IPropertyFilters {
  const params = new URLSearchParams(search);
  const filters: IPropertyFilters = {};

  params.forEach((value, rawKey) => {
    const key = rawKey as keyof IPropertyFilters;

    if (ARRAY_FILTER_KEYS.has(key)) {
      (filters[key] as string[]) = value.split(",");
    } else if (NUMBER_FILTER_KEYS.has(key)) {
      const num = Number(value);
      if (!Number.isNaN(num)) {
        (filters[key] as number) = num;
      }
    } else {
      (filters[key] as string) = value;
    }
  });

  return filters;
}

export function countActiveFilters(filters: IPropertyFilters): number {
  return (
    Object.entries(filters) as [
      keyof IPropertyFilters,
      IPropertyFilters[keyof IPropertyFilters],
    ][]
  ).filter(([key, value]) => {
    if (key === "sortBy") return false;
    if (Array.isArray(value)) return value.length > 0;
    return value !== undefined && value !== "";
  }).length;
}

// ── Slug / ID
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ── Date Helpers
type TimeAgoLocale = "en" | "fa";

const TIME_AGO_LABELS: Record<
  TimeAgoLocale,
  {
    today: string;
    yesterday: string;
    daysAgo: (n: number) => string;
    weeksAgo: (n: number) => string;
    monthsAgo: (n: number) => string;
    yearsAgo: (n: number) => string;
  }
> = {
  en: {
    today: "Today",
    yesterday: "Yesterday",
    daysAgo: (n) => `${n} days ago`,
    weeksAgo: (n) => `${n} weeks ago`,
    monthsAgo: (n) => `${n} months ago`,
    yearsAgo: (n) => `${n} years ago`,
  },
  fa: {
    today: "امروز",
    yesterday: "دیروز",
    daysAgo: (n) => `${toPersianNumber(n)} روز پیش`,
    weeksAgo: (n) => `${toPersianNumber(n)} هفته پیش`,
    monthsAgo: (n) => `${toPersianNumber(n)} ماه پیش`,
    yearsAgo: (n) => `${toPersianNumber(n)} سال پیش`,
  },
};

export function timeAgo(
  dateString: string,
  locale: TimeAgoLocale = "en",
): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";

  const diffMs = Date.now() - date.getTime();
  const diffDays = Math.floor(diffMs / 86_400_000);
  const labels = TIME_AGO_LABELS[locale];

  if (diffDays === 0) return labels.today;
  if (diffDays === 1) return labels.yesterday;
  if (diffDays < 7) return labels.daysAgo(diffDays);
  if (diffDays < 30) return labels.weeksAgo(Math.floor(diffDays / 7));
  if (diffDays < 365) return labels.monthsAgo(Math.floor(diffDays / 30));
  return labels.yearsAgo(Math.floor(diffDays / 365));
}

// ── Class Names
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

// ── Random / Mock Helpers
export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function pickRandom<T>(arr: readonly T[]): T | undefined {
  if (arr.length === 0) return undefined;
  return arr[Math.floor(Math.random() * arr.length)];
}

// ── Persian Number
const PERSIAN_DIGITS = [
  "۰",
  "۱",
  "۲",
  "۳",
  "۴",
  "۵",
  "۶",
  "۷",
  "۸",
  "۹",
] as const;

export function toPersianNumber(
  num: number | string | null | undefined,
): string {
  if (num === null || num === undefined || num === "") return "";

  return String(num).replace(
    /\d/g,
    (digit) => PERSIAN_DIGITS[parseInt(digit, 10)],
  );
}

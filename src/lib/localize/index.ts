/**
 *
 * Adapter layer between data (mock or real backend) and the UI.
 * SERVER-SAFE — does NOT import react-i18next, i18n/config, or anything
 * React-context based. Safe to use in: server components, generateMetadata,
 * MSW handlers, or anywhere outside the React tree.
 *
 * IMPORTANT: This file must never import `@/i18n/config` or `react-i18next`,
 * even transitively — doing so breaks generateMetadata / Server Components
 * with "createContext is not a function".
 *
 * For the reactive client-side hook, see `@/hooks/useLocalize`.
 *
 * Rules:
 *  - All user-generated text (title, description, agent name, agency) is a
 *    `LocalizedString { fa: string; en?: string }`.
 *  - The UI never touches `.fa` or `.en` directly — it always calls
 *    `localize()` or `useLocalize()`.
 *  - If the English translation is absent, the Persian value is shown as
 *    graceful fallback (common when admin enters only Persian).
 *  - Price  → always Tomans (تومان), never Rials.
 *  - Dates  → `yearBuilt` is already Jalali; `createdAt` is ISO/Gregorian
 *    and is converted to Jalali for display only.
 */

import type { LocalizedString, Language } from "@/types";

const DEFAULT_LANG: Language = "fa";

// Core localize helper 

/**
 * One-shot helper — safe to use anywhere: server components, generateMetadata,
 * MSW handlers, or outside React tree.
 * Defaults to "fa" when no language is passed (e.g. server-side, no i18n context).
 */
export function localize(
  field: LocalizedString,
  lang: Language = DEFAULT_LANG,
): string {
  if (lang === "en" && field.en) return field.en;
  return field.fa;
}

// Price formatting

/**
 * Formats a Toman price for display.
 *
 * Persian (fa): "۸۰۰,۰۰۰,۰۰۰ تومان"
 * English  (en): "800,000,000 T"
 *
 * Note: prices in data are already in Tomans. Never multiply/divide by 10.
 */
export function formatTomanPrice(
  price: number,
  lang: Language = DEFAULT_LANG,
): string {
  if (lang === "fa") {
    const formatted = new Intl.NumberFormat("fa-IR").format(price);
    return `${formatted} تومان`;
  }
  const formatted = new Intl.NumberFormat("en-US").format(price);
  return `${formatted} T`;
}

// Jalali year display

/**
 * Returns `yearBuilt` for display.
 * Since the backend stores it as a Jalali integer (e.g. 1395),
 * we just format the digits — no conversion needed.
 */
export function formatYearBuilt(
  year: number,
  lang: Language = DEFAULT_LANG,
): string {
  if (lang === "fa") return toPersianDigits(String(year));
  return `${year}`;
}

// Relative time (createdAt)

/**
 * Converts an ISO date string to a human-readable relative time.
 * createdAt is always ISO/Gregorian UTC — this is for display only.
 */
export function formatRelativeTime(
  isoDate: string,
  lang: Language = DEFAULT_LANG,
): string {
  const diffMs = Date.now() - new Date(isoDate).getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (lang === "fa") {
    if (diffDays <= 0) return "امروز";
    if (diffDays < 7) return toPersianDigits(`${diffDays} روز پیش`);
    if (diffDays < 30)
      return toPersianDigits(`${Math.floor(diffDays / 7)} هفته پیش`);
    return toPersianDigits(`${Math.floor(diffDays / 30)} ماه پیش`);
  }

  if (diffDays <= 0) return "Today";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
}

// Digit conversion

/**
 * Converts Latin digits in a string to Eastern Arabic (Persian) digits.
 * e.g. "123" → "۱۲۳"
 */
export function toPersianDigits(value: string | number): string {
  return String(value).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
}

// Search filter helper

/**
 * Checks whether a LocalizedString matches a search query.
 * Searches both fa and en values so filters work regardless of UI language.
 */
export function localizedIncludes(
  field: LocalizedString,
  query: string,
): boolean {
  const q = query.toLowerCase();
  if (field.fa.toLowerCase().includes(q)) return true;
  if (field.en?.toLowerCase().includes(q)) return true;
  return false;
}

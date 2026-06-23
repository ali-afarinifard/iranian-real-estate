"use client";

/**
 * hooks/useLocalize.ts
 *
 * Reactive client-only hook — re-renders when the user switches language.
 * Use this inside Client Components only.
 *
 * For server-safe usage (generateMetadata, server components, MSW handlers),
 * use `localize()` from `@/lib/localize` instead.
 *
 * @example
 * const localize = useLocalize();
 * <Typography>{localize(property.title)}</Typography>
 */

import { useTranslation } from "react-i18next";
import type { LocalizedString, Language } from "@/types";

export function useLocalize() {
  const { i18n } = useTranslation();
  const lang = i18n.language as Language;

  return (field: LocalizedString): string => {
    if (lang === "en" && field.en) return field.en;
    return field.fa;
  };
}

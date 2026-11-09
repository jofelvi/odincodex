"use client";

import { useI18n } from "./index";
import type { Locale } from "./index";

/**
 * Section-local bilingual copy. Each section owns a `copy.ts` exporting
 * `{ es: {...}, en: {...} }` with the same shape in both languages, so
 * sections can be built and edited independently.
 */
export type Bilingual<T> = Record<Locale, T>;

export function useCopy<T>(copy: Bilingual<T>): T {
  const { locale } = useI18n();
  return copy[locale];
}

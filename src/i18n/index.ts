"use client";

import { createContext, useContext } from "react";
import en from "./en";
import es from "./es";

export type Locale = "en" | "es";

type TranslationDict = Record<string, string>;

export interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const translations: Record<Locale, TranslationDict> = { en, es };

export const I18nContext = createContext<I18nContextValue | null>(null);

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return ctx;
}

export function getTranslation(locale: Locale, key: string): string {
  return translations[locale][key] ?? key;
}

"use client";

import { ReactNode, useState, useCallback, useEffect, useRef } from "react";
import { I18nContext, getTranslation } from "./index";
import type { Locale } from "./index";

const STORAGE_KEY = "odincodex-locale";

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return "es";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "es") return stored;
  return "es";
}

export default function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");

  useEffect(() => {
    setLocaleState(readStoredLocale());
  }, []);

  // Keep <html lang> in sync so screen readers and the browser's own
  // validation/translation use the language actually on screen.
  // Only the home page's generic title is swapped: every other route (e.g.
  // /sistemas/valhalla) keeps the title its metadata rendered on the server,
  // which is also what search engines see after rendering the page.
  const serverTitle = useRef<string | null>(null);
  useEffect(() => {
    document.documentElement.lang = locale;
    serverTitle.current ??= document.title;
    if (serverTitle.current === getTranslation("es", "site.title")) {
      document.title = getTranslation(locale, "site.title");
    }
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const t = useCallback(
    (key: string) => getTranslation(locale, key),
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

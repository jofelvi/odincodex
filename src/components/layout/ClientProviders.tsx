"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";
import CustomCursor from "./CustomCursor";
import I18nProvider from "@/i18n/provider";

export default function ClientProviders({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <I18nProvider>
      <div style={{ width: "100%" }}>
        <CustomCursor />
        {children}
      </div>
    </I18nProvider>
  );
}

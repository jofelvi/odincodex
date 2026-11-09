"use client";

import { useEffect, useState, type CSSProperties, type MouseEvent } from "react";
import dynamic from "next/dynamic";
import { SECTION_IDS } from "@/lib/constants";
import { goToSystem, scrollToSection } from "@/lib/scroll";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";
import { useCopy } from "@/i18n/useCopy";
import Button from "@/components/ui/Button";
import NorseIcon from "@/components/ui/NorseIcon";
import { systems } from "@/data/systems";
import { useI18n } from "@/i18n";
import type { SystemId } from "@/types";
import { HERO_COPY, HERO_TARGETS } from "./copy";

// The rune particle field is a brand fixture: rendered as-is, never restyled.
// It is decoration, so its three.js bundle (~230 KB) must never compete with
// the text that paints first: it is requested only once the page has loaded
// and the main thread is idle.
const HeroCanvas = dynamic(() => import("@/components/sections/Hero/HeroCanvas"), {
  ssr: false,
});

/** True once the window has loaded and the browser reports an idle moment. */
function usePageIdle(): boolean {
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    let idleId: number | undefined;
    let timeoutId: number | undefined;

    const markIdle = () => {
      // Safari before 18 has no requestIdleCallback (the DOM types assume it).
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(() => setIdle(true), { timeout: 2000 });
      } else {
        timeoutId = window.setTimeout(() => setIdle(true), 200);
      }
    };

    if (document.readyState === "complete") markIdle();
    else window.addEventListener("load", markIdle, { once: true });

    return () => {
      window.removeEventListener("load", markIdle);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  return idle;
}

export default function Hero() {
  const { tier } = useDevicePerformance();
  const pageIdle = usePageIdle();
  const c = useCopy(HERO_COPY);
  const { locale } = useI18n();
  const live = systems.filter((s) => s.stage === "live");
  // The load sequence ships in the server HTML: the first frame already starts
  // from opacity 0, so nothing flashes on hydration (CSS runs without JS too).
  const step = (i: number) => ({ "--i": i }) as CSSProperties;

  // Deep link to the system's own panel in the explorer (#sistemas-<id>):
  // one history entry; Systems selects/opens it and scrolls on hashchange.
  const goSystem = (id: SystemId) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    goToSystem(id);
  };

  return (
    <section
      id={SECTION_IDS.hero}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-16"
    >
      {pageIdle && tier > 0 && (
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <HeroCanvas />
        </div>
      )}
      {/* Legibility veil: darkens the rune field behind the text column only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_80%_at_20%_50%,rgb(14_26_28/0.85),transparent_70%)]"
      />

      <div className="hero-depth page grid items-end gap-14 py-20 lg:grid-cols-[minmax(0,1fr)_27rem] lg:gap-20 lg:py-28">
        <div>
          <h1
            id="hero-title"
            style={step(0)}
            className="rise max-w-[16ch] text-[clamp(2.6rem,5.6vw,5rem)] leading-[1.02] font-semibold tracking-[-0.03em] text-parchment [text-wrap:balance]"
          >
            {c.title}
          </h1>
          <p
            style={step(1)}
            className="rise mt-7 max-w-[54ch] text-lg leading-relaxed text-mist md:text-xl"
          >
            {c.lede}
          </p>
          <div style={step(2)} className="rise mt-10 flex flex-wrap gap-3">
            <Button size="large" onClick={() => scrollToSection(HERO_TARGETS.primary)}>
              {c.primary}
            </Button>
            <Button size="large" variant="secondary" onClick={() => scrollToSection(HERO_TARGETS.secondary)}>
              {c.secondary}
            </Button>
          </div>
        </div>

        <nav
          aria-labelledby="hero-suite"
          style={step(3)}
          className="rise rounded-2xl border border-line bg-night/70 p-2 backdrop-blur-sm"
        >
          <h2 id="hero-suite" className="px-4 pt-3 pb-2 text-sm font-semibold text-mist">
            {c.suiteTitle}
          </h2>
          <ul>
            {live.map((sys) => {
              const copy = sys.copy[locale];
              return (
                <li key={sys.id}>
                  <a
                    href={`#${SECTION_IDS.systems}-${sys.id}`}
                    onClick={goSystem(sys.id)}
                    className="group flex gap-3.5 rounded-lg px-4 py-3 transition-colors duration-150 ease-[ease] hover:bg-surface"
                  >
                    <NorseIcon
                      id={sys.id}
                      className="mt-0.5 h-7 w-7 text-bronze transition-colors duration-150 ease-[ease] group-hover:text-bronze-bright"
                    />
                    <span className="min-w-0">
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="font-semibold text-parchment">{sys.name}</span>
                        <span className="text-right text-xs text-mist">{copy.sector}</span>
                      </span>
                      <span className="mt-1 block text-sm leading-snug text-mist-dim">
                        {copy.highlights
                          .map((h, i) => (i > 0 && /^\p{Lu}\p{Ll}/u.test(h) ? h[0]!.toLowerCase() + h.slice(1) : h))
                          .join(", ")}
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </section>
  );
}

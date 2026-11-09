"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SECTION_IDS } from "@/lib/constants";
import { scrollToSection } from "@/lib/scroll";
import { useI18n } from "@/i18n";
import type { Locale } from "@/i18n";
import { useCopy, type Bilingual } from "@/i18n/useCopy";

const COPY: Bilingual<{
  links: { id: string; label: string }[];
  cta: string;
  home: string;
  primary: string;
  language: string;
  open: string;
  close: string;
  skip: string;
}> = {
  es: {
    links: [
      { id: SECTION_IDS.systems, label: "Sistemas" },
      { id: SECTION_IDS.whiteLabel, label: "Marca blanca" },
      { id: SECTION_IDS.studio, label: "Estudio" },
      { id: SECTION_IDS.stack, label: "Stack" },
      { id: SECTION_IDS.services, label: "A medida" },
    ],
    cta: "Solicitar demo",
    home: "OdinCodex, inicio",
    primary: "Principal",
    language: "Idioma",
    open: "Abrir menú",
    close: "Cerrar menú",
    skip: "Saltar al contenido",
  },
  en: {
    links: [
      { id: SECTION_IDS.systems, label: "Systems" },
      { id: SECTION_IDS.whiteLabel, label: "White label" },
      { id: SECTION_IDS.studio, label: "Studio" },
      { id: SECTION_IDS.stack, label: "Stack" },
      { id: SECTION_IDS.services, label: "Custom" },
    ],
    cta: "Request a demo",
    home: "OdinCodex, home",
    primary: "Primary",
    language: "Language",
    open: "Open menu",
    close: "Close menu",
    skip: "Skip to content",
  },
};

const LOCALES: { value: Locale; label: string }[] = [
  { value: "es", label: "ES" },
  { value: "en", label: "EN" },
];

function LanguageSwitch({ label }: { label: string }) {
  const { locale, setLocale } = useI18n();
  return (
    <div role="group" aria-label={label} className="flex items-center rounded-lg border border-line p-0.5 text-sm">
      {LOCALES.map(({ value, label: text }) => {
        const active = locale === value;
        return (
          <button
            key={value}
            type="button"
            lang={value}
            aria-pressed={active}
            onClick={() => setLocale(value)}
            className={`min-h-11 min-w-11 rounded-md px-2 font-semibold transition-colors duration-150 ease-[ease] ${
              active ? "bg-surface-raised text-parchment" : "text-mist hover:text-parchment"
            }`}
          >
            {text}
          </button>
        );
      })}
    </div>
  );
}

const SPY_IDS: string[] = Object.values(SECTION_IDS);

/** Scroll-spy: the section in view inside the band below the header. */
function useActiveSection(): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  useEffect(() => {
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // The LAST section (in page order) touching the band wins: the previous
        // section's tail can still sit under the header after a jump.
        const current = [...SPY_IDS].reverse().find((id) => visible.has(id));
        if (current) setActiveId(current);
      },
      { rootMargin: "-64px 0px -60% 0px" },
    );
    for (const id of SPY_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);
  return activeId;
}

// 2px bronze underline shown on the link of the section in view.
const CURRENT_MARK =
  "relative after:absolute after:inset-x-0 after:h-0.5 after:rounded-full after:bg-bronze after:opacity-0 after:transition-opacity after:duration-150 after:ease-[ease]";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Keyboard-initiated closes (Escape) are not animated.
  const [instantClose, setInstantClose] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeId = useActiveSection();
  const c = useCopy(COPY);
  // Section links scroll in place on the home page. On any other route they are plain
  // <a href="/#<id>"> (a full navigation): next/link is avoided for cross-route hash
  // links because Next 16.2's route cache keeps the first hash it fetched "/" with and
  // appends the next one (/#sistemas#estudio).
  const pathname = usePathname();
  const onHome = pathname === "/";
  const onSystemPage = pathname.startsWith("/sistemas/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setInstantClose(true);
        setIsMenuOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    // Scrolling the page dismisses the menu (small jitter is ignored).
    const start = window.scrollY;
    const onScroll = () => {
      if (Math.abs(window.scrollY - start) > 8) setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setInstantClose(false);
    setIsMenuOpen((open) => !open);
  };

  const go = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    setIsMenuOpen(false);
    if (!onHome) return;
    e.preventDefault();
    scrollToSection(id);
  };

  const sectionHref = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  // On a system page the Sistemas link stays marked, so the visitor knows where they are.
  const current = (id: string) =>
    (onHome && activeId === id) || (onSystemPage && id === SECTION_IDS.systems)
      ? ("location" as const)
      : undefined;

  // Asymmetric timing: deliberate open at 200ms, system close at 150ms.
  const panelMotion = instantClose
    ? "transition-none"
    : `transition-[opacity,transform,visibility] ease-[var(--ease-out-strong)] motion-reduce:transition-[opacity,visibility] ${
        isMenuOpen ? "duration-200" : "duration-150"
      }`;

  return (
    <>
      {/* Shown on focus-visible, not focus: after a client-side route change Next focuses the
          first element of the page (this link), which must not cover the logo for a mouse
          user; a keyboard user still lands on it and can skip straight to the content. */}
      <a
        href="#main"
        className="sr-only rounded-lg bg-bronze px-4 py-3 font-semibold text-night-deep focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-[60]"
      >
        {c.skip}
      </a>

      {/* Scrim under the mobile panel: a tap outside the menu closes it. Kept
          outside the header, whose backdrop-filter would contain fixed children. */}
      <div
        aria-hidden="true"
        onClick={() => setIsMenuOpen(false)}
        className={`fixed inset-x-0 top-16 bottom-0 z-40 bg-night-deep/50 lg:hidden ${panelMotion} ${
          isMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-200 ease-[ease] ${
          scrolled || isMenuOpen
            ? "border-b border-line bg-night/90 backdrop-blur-md"
            : "border-b border-transparent bg-transparent backdrop-blur-[0px]"
        }`}
      >
        {/* Reading progress: a bronze hairline driven by the page scroll (CSS only). */}
        <div aria-hidden="true" className="scroll-progress pointer-events-none absolute inset-x-0 -bottom-px h-px origin-left bg-bronze" />
        <div className="page flex h-16 items-center justify-between gap-6">
          <Link
            href="/"
            onClick={(e) => go(e, SECTION_IDS.hero)}
            aria-label={c.home}
            className="flex min-h-11 items-center gap-2.5"
          >
            <Image src="/images/logo-mark.png" alt="" width={34} height={34} className="h-[34px] w-[34px]" />
            <span className="text-[1.0625rem] font-semibold tracking-[-0.01em] text-parchment">OdinCodex</span>
          </Link>

          <nav aria-label={c.primary} className="hidden items-center gap-7 lg:flex">
            {c.links.map((link) => (
              <a
                key={link.id}
                href={sectionHref(link.id)}
                onClick={(e) => go(e, link.id)}
                aria-current={current(link.id)}
                className={`${CURRENT_MARK} inline-flex min-h-11 items-center text-[0.9375rem] text-mist transition-colors duration-150 ease-[ease] after:bottom-2 hover:text-parchment aria-[current=location]:text-parchment aria-[current=location]:after:opacity-100`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitch label={c.language} />
            <a
              href={sectionHref(SECTION_IDS.contact)}
              onClick={(e) => go(e, SECTION_IDS.contact)}
              className="press inline-flex min-h-11 items-center rounded-lg bg-bronze px-4 text-[0.9375rem] font-semibold text-night-deep hover:bg-bronze-bright"
            >
              {c.cta}
            </a>
          </div>

          <button
            id="menu-toggle"
            type="button"
            onClick={toggleMenu}
            className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label={isMenuOpen ? c.close : c.open}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span
              className={`h-0.5 w-5 rounded-full bg-parchment transition-transform duration-200 ease-[var(--ease-out-strong)] motion-reduce:transition-none ${
                isMenuOpen ? "translate-y-[4px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 rounded-full bg-parchment transition-transform duration-200 ease-[var(--ease-out-strong)] motion-reduce:transition-none ${
                isMenuOpen ? "-translate-y-[4px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>

        {/* Overlay panel: only opacity + transform animate (opacity only with
            reduced motion); inert + invisible when closed. */}
        <div
          id="mobile-menu"
          inert={!isMenuOpen}
          className={`absolute inset-x-0 top-full border-b border-line bg-night shadow-[0_16px_32px_rgb(0_0_0/0.35)] lg:hidden ${panelMotion} ${
            isMenuOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 opacity-0 motion-reduce:translate-y-0"
          }`}
        >
          <nav aria-label={c.primary} className="page flex flex-col py-3">
            {c.links.map((link) => (
              <a
                key={link.id}
                href={sectionHref(link.id)}
                onClick={(e) => go(e, link.id)}
                aria-current={current(link.id)}
                className="group flex min-h-12 items-center border-b border-line text-lg text-parchment"
              >
                <span className={`${CURRENT_MARK} after:-bottom-1 group-aria-[current=location]:after:opacity-100`}>
                  {link.label}
                </span>
              </a>
            ))}
            <div className="mt-4 flex items-center justify-between gap-4 pb-2">
              <LanguageSwitch label={c.language} />
              <a
                href={sectionHref(SECTION_IDS.contact)}
                onClick={(e) => go(e, SECTION_IDS.contact)}
                className="press inline-flex min-h-12 items-center rounded-lg bg-bronze px-6 font-semibold text-night-deep"
              >
                {c.cta}
              </a>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}

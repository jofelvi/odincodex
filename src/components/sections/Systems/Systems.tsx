"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import Link from "next/link";
import { systems } from "@/data/systems";
import { SECTION_IDS } from "@/lib/constants";
import { PROJECT_TYPES, type ProjectType } from "@/lib/contact";
import { scrollToSection } from "@/lib/scroll";
import { prefillContact } from "@/lib/prefill";
import { useI18n } from "@/i18n";
import { useCopy } from "@/i18n/useCopy";
import Button from "@/components/ui/Button";
import NorseIcon from "@/components/ui/NorseIcon";
import type { SystemCopy, SystemEntry, SystemId } from "@/types";
import { SYSTEMS_COPY, type SystemsCopy } from "./copy";

const LIVE: SystemEntry[] = systems.filter((s: SystemEntry) => s.stage === "live");
const WORKSHOP: SystemEntry[] = systems.filter((s: SystemEntry) => s.stage === "workshop");

/** Deep links look like #sistemas-valhalla. */
const HASH_PREFIX = `#${SECTION_IDS.systems}-`;
const hashFor = (id: SystemId) => `${HASH_PREFIX}${id}`;
const itemId = (id: SystemId) => `${SECTION_IDS.systems}-${id}`;
const tabId = (id: SystemId) => `systems-tab-${id}`;
const regionId = (id: SystemId) => `systems-region-${id}`;
const PANEL_ID = "systems-panel";

/** Matches the sticky tablist (top-24): a panel whose top sits above it is out of view. */
const PANEL_TOP = 96;

function liveIdFromHash(hash: string): SystemId | null {
  if (!hash.startsWith(HASH_PREFIX)) return null;
  const candidate = hash.slice(HASH_PREFIX.length);
  return LIVE.find((s) => s.id === candidate)?.id ?? null;
}

/** The contact form only knows the systems it can demo; anything else leaves its field alone. */
function toProjectType(id: SystemId): ProjectType | undefined {
  return PROJECT_TYPES.find((t) => t === id);
}

const isDesktop = () => window.matchMedia("(min-width: 1024px)").matches;
const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Scroll and focus work that must run once the new selection is in the DOM. */
type NavAction =
  | { kind: "panel" }
  | { kind: "opened"; id: SystemId }
  | { kind: "closed"; id: SystemId }
  | { kind: "deeplink"; id: SystemId; focus: boolean };

export default function Systems() {
  const { locale } = useI18n();
  const c = useCopy(SYSTEMS_COPY);

  // Desktop: one selected tab. Mobile: at most one open disclosure, all closed by default.
  const [selected, setSelected] = useState<SystemId | null>(LIVE[0]?.id ?? null);
  const [open, setOpen] = useState<SystemId | null>(null);
  // Only a pointer-initiated change animates; keyboard and deep links switch in place.
  const [animatePanel, setAnimatePanel] = useState(false);
  const [animateRegion, setAnimateRegion] = useState(false);

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const headerRefs = useRef<Partial<Record<SystemId, HTMLButtonElement | null>>>({});

  const navRef = useRef<NavAction | null>(null);
  const [navTick, setNavTick] = useState(0);
  const queueNav = useCallback((action: NavAction) => {
    navRef.current = action;
    setNavTick((t) => t + 1);
  }, []);

  // Runs after the commit that applied the selection, before paint.
  useLayoutEffect(() => {
    const action = navRef.current;
    if (!action) return;
    navRef.current = null;

    switch (action.kind) {
      case "panel": {
        // Jump, never glide: the panel swap is the only motion the person should see.
        const panel = document.getElementById(PANEL_ID);
        if (panel && panel.getBoundingClientRect().top < PANEL_TOP - 1) {
          panel.scrollIntoView({ block: "start", behavior: "instant" });
        }
        break;
      }
      case "opened":
        document
          .getElementById(itemId(action.id))
          ?.scrollIntoView({ block: "start", behavior: "instant" });
        break;
      case "closed":
        document
          .getElementById(itemId(action.id))
          ?.scrollIntoView({ block: "start", behavior: "instant" });
        headerRefs.current[action.id]?.focus({ preventScroll: true });
        break;
      case "deeplink": {
        const desktop = isDesktop();
        const target = document.getElementById(desktop ? SECTION_IDS.systems : itemId(action.id));
        target?.scrollIntoView({
          behavior: prefersReducedMotion() ? "auto" : "smooth",
          block: "start",
        });
        if (!action.focus) break;
        const control = desktop
          ? tabRefs.current[LIVE.findIndex((s) => s.id === action.id)]
          : headerRefs.current[action.id];
        control?.focus({ preventScroll: true });
        break;
      }
    }
  }, [navTick]);

  // Select (desktop) or open (mobile) from #sistemas-<id>, on load and on every hashchange
  // (the Hero reaches a system through goToSystem, which dispatches one).
  useEffect(() => {
    const apply = (focus: boolean) => {
      const id = liveIdFromHash(window.location.hash);
      if (!id) return;
      setAnimatePanel(false);
      setAnimateRegion(false);
      setSelected(id);
      setOpen(id);
      queueNav({ kind: "deeplink", id, focus });
    };
    const onHashChange = () => apply(true);
    // On load, scroll to the deep link but leave focus where the browser put it.
    apply(false);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [queueNav]);

  const recordInUrl = useCallback((id: SystemId) => {
    if (window.location.hash !== hashFor(id)) {
      window.history.replaceState(null, "", hashFor(id));
    }
  }, []);

  /** A closed disclosure must not reopen on reload, so the deep link falls back to the section. */
  const clearItemHash = useCallback(() => {
    if (window.location.hash.startsWith(HASH_PREFIX)) {
      window.history.replaceState(null, "", `#${SECTION_IDS.systems}`);
    }
  }, []);

  const select = (id: SystemId, animate: boolean) => {
    if (id === selected) return;
    setAnimatePanel(animate);
    setSelected(id);
    recordInUrl(id);
    queueNav({ kind: "panel" });
  };

  const toggle = (id: SystemId, event: MouseEvent<HTMLButtonElement>) => {
    if (open === id) {
      setOpen(null);
      clearItemHash();
      return;
    }
    // detail is 0 when Enter or Space fired the click: keyboard opens are not animated.
    setAnimateRegion(event.detail > 0);
    setOpen(id);
    setSelected(id);
    recordInUrl(id);
    queueNav({ kind: "opened", id });
  };

  const close = (id: SystemId) => {
    setOpen(null);
    clearItemHash();
    queueNav({ kind: "closed", id });
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = LIVE.length - 1;
    let next: number;
    switch (event.key) {
      case "ArrowDown":
        next = index === last ? 0 : index + 1;
        break;
      case "ArrowUp":
        next = index === 0 ? last : index - 1;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = last;
        break;
      default:
        return;
    }
    event.preventDefault();
    const target = LIVE[next];
    if (!target) return;
    select(target.id, false);
    tabRefs.current[next]?.focus();
  };

  const requestDemo = (entry: SystemEntry) => {
    prefillContact(c.demoMessage(entry.name), toProjectType(entry.id));
    scrollToSection(SECTION_IDS.contact);
  };

  const current = LIVE.find((s) => s.id === selected) ?? LIVE[0];

  return (
    <section
      id={SECTION_IDS.systems}
      aria-labelledby="systems-title"
      className="border-t border-line py-24 lg:py-32"
    >
      <div className="page">
        <header className="max-w-[46rem]">
          <h2
            id="systems-title"
            className="text-[clamp(2rem,3.6vw,3rem)] leading-[1.08] font-semibold tracking-[-0.025em] text-parchment [text-wrap:balance]"
          >
            {c.title}
          </h2>
          <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-mist">{c.intro}</p>
        </header>

        {/* Desktop: vertical tablist + panel */}
        <div className="mt-16 hidden gap-10 lg:grid lg:grid-cols-[18.5rem_minmax(0,1fr)] xl:gap-14">
          <div className="sticky top-24 self-start">
            <LiveLabel id="systems-live-label" text={c.liveLabel} />
            <div
              role="tablist"
              aria-orientation="vertical"
              aria-labelledby="systems-live-label"
              className="mt-3 flex flex-col gap-1"
            >
              {LIVE.map((s, index) => {
                const isSelected = s.id === current?.id;
                return (
                  <button
                    key={s.id}
                    ref={(el) => {
                      tabRefs.current[index] = el;
                    }}
                    id={tabId(s.id)}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls={PANEL_ID}
                    tabIndex={isSelected ? 0 : -1}
                    onClick={(e) => select(s.id, e.detail > 0)}
                    onKeyDown={(e) => onTabKeyDown(e, index)}
                    className={`group relative flex min-h-16 w-full items-center gap-4 rounded-xl px-4 py-3 text-left transition-colors duration-150 ease-[ease] ${
                      isSelected ? "bg-surface-raised" : "hover:bg-surface"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute inset-y-3 left-0 w-0.5 rounded-full bg-bronze transition-opacity duration-150 ease-[ease] ${
                        isSelected ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <span
                      className={`grid size-10 shrink-0 place-items-center rounded-lg border transition-colors duration-150 ease-[ease] ${
                        isSelected
                          ? "border-line-strong bg-night text-bronze-bright"
                          : "border-line text-mist group-hover:text-parchment"
                      }`}
                    >
                      <NorseIcon id={s.id} className="size-6" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold leading-snug text-parchment">{s.name}</span>
                      <span className="block text-sm leading-snug text-mist">{s.copy[locale].sector}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <Workshop headingId="systems-workshop" c={c} className="mt-10" />
          </div>

          {current && (
            <div
              id={PANEL_ID}
              role="tabpanel"
              aria-labelledby={tabId(current.id)}
              tabIndex={0}
              className="scroll-mt-4 rounded-2xl border border-line bg-surface p-8 xl:p-10"
            >
              <div key={current.id} className={animatePanel ? "swap-in" : undefined}>
                <SystemDetail
                  entry={current}
                  copy={current.copy[locale]}
                  c={c}
                  onDemo={() => requestDemo(current)}
                  withHeader
                />
              </div>
            </div>
          )}
        </div>

        {/* Mobile and tablet: disclosure list, one open at a time */}
        <div className="mt-12 lg:hidden">
          <LiveLabel id="systems-live-label-m" text={c.liveLabel} />
          <ul aria-labelledby="systems-live-label-m" className="mt-3 border-b border-line">
            {LIVE.map((s) => {
              const isOpen = open === s.id;
              const copy = s.copy[locale];
              return (
                // No scroll-margin: html's scroll-padding-top already clears the fixed header.
                <li key={s.id} id={itemId(s.id)} className="border-t border-line">
                  <h3>
                    <button
                      ref={(el) => {
                        headerRefs.current[s.id] = el;
                      }}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={regionId(s.id)}
                      onClick={(e) => toggle(s.id, e)}
                      className="flex min-h-18 w-full items-center gap-4 py-4 text-left"
                    >
                      <span
                        className={`grid size-11 shrink-0 place-items-center rounded-lg border transition-colors duration-150 ease-[ease] ${
                          isOpen ? "border-line-strong bg-surface-raised text-bronze-bright" : "border-line text-mist"
                        }`}
                      >
                        <NorseIcon id={s.id} className="size-6" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-lg font-semibold leading-snug text-parchment">{s.name}</span>
                        <span className="block text-[0.9375rem] leading-snug text-mist">{copy.sector}</span>
                      </span>
                      <Chevron open={isOpen} />
                    </button>
                  </h3>
                  {/* Always rendered so aria-controls points at a real element. */}
                  <div
                    id={regionId(s.id)}
                    hidden={!isOpen}
                    className={isOpen && animateRegion ? "swap-in pb-10" : "pb-10"}
                  >
                    {isOpen && (
                      <SystemDetail
                        entry={s}
                        copy={copy}
                        c={c}
                        onDemo={() => requestDemo(s)}
                        onClose={() => close(s.id)}
                      />
                    )}
                  </div>
                </li>
              );
            })}
          </ul>

          <Workshop headingId="systems-workshop-m" c={c} className="mt-12" />
        </div>
      </div>
    </section>
  );
}

function LiveLabel({ id, text }: { id: string; text: string }) {
  return (
    <p id={id} className="flex items-center gap-2.5 px-1 text-sm font-medium text-mist">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-rune" />
      {text}
    </p>
  );
}

function SystemDetail({
  entry,
  copy,
  c,
  onDemo,
  onClose,
  withHeader = false,
}: {
  entry: SystemEntry;
  copy: SystemCopy;
  c: SystemsCopy;
  onDemo: () => void;
  /** Mobile disclosures end with a way to fold the region back up. */
  onClose?: () => void;
  withHeader?: boolean;
}) {
  return (
    <>
      {withHeader && (
        <div className="flex items-center gap-5">
          <span className="grid size-16 shrink-0 place-items-center rounded-xl border border-line-strong bg-night text-bronze-bright">
            <NorseIcon id={entry.id} className="size-9" />
          </span>
          <div className="min-w-0">
            <h3 className="text-[1.875rem] leading-tight font-semibold tracking-[-0.02em] text-parchment">
              {entry.name}
            </h3>
            <p className="mt-0.5 text-mist">{copy.sector}</p>
          </div>
        </div>
      )}

      <p
        className={`max-w-[62ch] text-lg leading-relaxed text-parchment ${withHeader ? "mt-7" : "mt-1"}`}
      >
        {copy.summary}
      </p>

      {copy.proof && (
        <p className="mt-4 flex items-center gap-2.5 text-[0.9375rem] font-medium text-parchment">
          <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-rune" />
          {copy.proof}
        </p>
      )}

      <ul
        aria-label={c.highlightsLabel}
        className="mt-8 grid divide-y divide-line border-y border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0"
      >
        {copy.highlights.map((h) => (
          <li
            key={h}
            className="flex gap-2.5 py-4 text-[0.9375rem] leading-snug text-parchment sm:px-5 sm:first:pl-0 sm:last:pr-0"
          >
            <Check />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <h4 className="mt-10 text-lg font-semibold tracking-[-0.01em] text-parchment">{c.modules}</h4>
      <dl className="mt-4 gap-x-10 md:columns-2">
        {copy.modules.map((m) => (
          <div key={m.title} className="break-inside-avoid border-t border-line pt-4 pb-6">
            <dt className="font-semibold leading-snug text-parchment">{m.title}</dt>
            <dd className="mt-2.5">
              <ul className="space-y-1.5">
                {m.points.map((p) => (
                  <li
                    key={p}
                    className="relative pl-4 text-[0.9375rem] leading-relaxed text-mist before:absolute before:top-[0.8em] before:left-0 before:h-px before:w-2 before:bg-bronze/70"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
        <TagList title={c.platforms} items={copy.platforms} />
        <TagList title={c.integrations} items={copy.integrations} />
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Button variant="secondary" onClick={onDemo}>
          {c.demo(entry.name)}
        </Button>
        <Link
          href={`/sistemas/${entry.id}`}
          className="inline-flex min-h-11 items-center text-[0.9375rem] font-medium text-mist underline decoration-line-strong underline-offset-4 transition-colors duration-150 ease-[ease] hover:text-parchment hover:decoration-mist"
        >
          {c.page(entry.name)}
        </Link>
        {onClose && (
          <Button variant="secondary" onClick={onClose}>
            {c.close(entry.name)}
          </Button>
        )}
      </div>
    </>
  );
}

function TagList({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <h4 className="text-[0.9375rem] font-semibold text-parchment">{title}</h4>
      <ul className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-md border border-line bg-night/40 px-2.5 py-1 text-sm leading-snug text-mist"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Workshop({
  headingId,
  c,
  className = "",
}: {
  headingId: string;
  c: SystemsCopy;
  className?: string;
}) {
  const { locale } = useI18n();
  if (WORKSHOP.length === 0) return null;
  return (
    <div className={className}>
      <h3 id={headingId} className="px-1 text-sm font-medium text-mist">
        {c.workshopTitle}
      </h3>
      <p className="mt-1 px-1 text-sm text-mist-dim">{c.workshopNote}</p>
      <ul aria-labelledby={headingId} className="mt-3 flex flex-col gap-1">
        {WORKSHOP.map((s) => (
          <li key={s.id} className="flex min-h-14 items-center gap-4 rounded-xl px-4 py-2.5">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-dashed border-line text-mist-dim">
              <NorseIcon id={s.id} className="size-6" />
            </span>
            <span className="min-w-0">
              <span className="block font-semibold leading-snug text-mist">{s.name}</span>
              <span className="block text-sm leading-snug text-mist">{s.copy[locale].sector}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Check() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-[0.2em] size-4 shrink-0 text-verdigris"
    >
      <path d="M3 8.5l3 3 7-7" />
    </svg>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`size-5 shrink-0 text-mist transition-transform duration-200 ease-[var(--ease-out-strong)] motion-reduce:transition-none ${
        open ? "rotate-180" : ""
      }`}
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

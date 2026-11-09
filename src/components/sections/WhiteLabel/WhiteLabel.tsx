"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import { SECTION_IDS } from "@/lib/constants";
import { useI18n } from "@/i18n";
import { useCopy } from "@/i18n/useCopy";
import {
  DEMO_BRANDS,
  DEMO_MENU,
  DEMO_RATE,
  DEMO_TICKET,
  WHITE_LABEL_COPY,
  type DemoBrand,
  type DemoBrandId,
} from "./copy";

const HEADING_ID = "white-label-title";
const BRANDS_LABEL_ID = "white-label-brands";
const BRANDS_HINT_ID = "white-label-brands-hint";
const BRANDS_SUMMARY_ID = "white-label-brands-summary";

/**
 * One curve for the whole demo: colours and the name/monogram crossfade both
 * run 200ms on plain `ease`, as interruptible CSS transitions. A brand change
 * made from the keyboard is applied instantly (no transition at all).
 */
const DEMO_TRANSITION = "duration-200 ease-[ease]";

type ChangeSource = "pointer" | "keyboard";

const SHAPE_CLASS: Record<DemoBrand["shape"], string> = {
  rounded: "rounded-lg",
  circle: "rounded-full",
  square: "rounded-[3px]",
};

/* ── Money helpers (integer cents, so no floating-point drift) ── */

type MenuKey = (typeof DEMO_MENU)[number]["key"];
type ScreenCopy = (typeof WHITE_LABEL_COPY)["es"]["demo"]["screen"];

const priceOf = (key: MenuKey) => DEMO_MENU.find((m) => m.key === key)?.cents ?? 0;
const qtyOf = (key: MenuKey) => DEMO_TICKET.find((t) => t.key === key)?.qty ?? 0;
const SUBTOTAL = DEMO_TICKET.reduce((sum, line) => sum + priceOf(line.key) * line.qty, 0);

function brandById(id: DemoBrandId): DemoBrand | undefined {
  return DEMO_BRANDS.find((b) => b.id === id) ?? DEMO_BRANDS[0];
}

function serviceLabel(brand: DemoBrand, c: ScreenCopy): string {
  return brand.service.mode === "added"
    ? `${c.serviceAdded} ${brand.service.percent} %`
    : brand.service.mode === "included"
      ? c.serviceIncluded
      : c.serviceNone;
}

function serviceCents(brand: DemoBrand, subtotal: number): number {
  return brand.service.mode === "added" ? Math.round((subtotal * brand.service.percent) / 100) : 0;
}

function useMoney() {
  const { locale } = useI18n();
  const fmt = new Intl.NumberFormat(locale === "es" ? "es-VE" : "en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return {
    usd: (cents: number) => `$${fmt.format(cents / 100)}`,
    bs: (cents: number) => `Bs ${fmt.format((cents * DEMO_RATE) / 100)}`,
  };
}

/**
 * Stacks one layer per brand in the same grid cell and crossfades to the
 * active one (opacity plus a 2px blur that masks the swap; opacity only with
 * reduced motion). CSS transitions, so a quick second click reverses
 * mid-flight instead of queueing.
 */
function Crossfade({
  activeId,
  animate,
  render,
  className = "",
}: {
  activeId: DemoBrandId;
  animate: boolean;
  render: (brand: DemoBrand) => ReactNode;
  className?: string;
}) {
  return (
    <span className={`grid ${className}`}>
      {DEMO_BRANDS.map((brand) => {
        const active = brand.id === activeId;
        return (
          <span
            key={brand.id}
            className={`col-start-1 row-start-1 ${animate ? `transition-[opacity,filter] ${DEMO_TRANSITION}` : "transition-none"} ${
              active ? "opacity-100 blur-[0px]" : "opacity-0 blur-[2px] motion-reduce:blur-none"
            }`}
          >
            {render(brand)}
          </span>
        );
      })}
    </span>
  );
}

function Monogram({ brand }: { brand: DemoBrand }) {
  return (
    <span
      className={`grid size-9 place-items-center text-[0.8125rem] font-semibold tracking-[-0.01em] ${SHAPE_CLASS[brand.shape]}`}
      style={{ backgroundColor: brand.colors.accent, color: brand.colors.accentInk }}
    >
      {brand.monogram}
    </span>
  );
}

function BrandPicker({
  activeId,
  onChange,
  label,
  hint,
  summary,
  className = "",
}: {
  activeId: DemoBrandId;
  onChange: (id: DemoBrandId, source: ChangeSource) => void;
  label: string;
  hint: string;
  /** Text description of the preview for the active brand (the mock itself is aria-hidden). */
  summary: string;
  className?: string;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  // Radio-group keyboard model: arrows move and select, Home/End jump.
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = DEMO_BRANDS.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    const brand = DEMO_BRANDS[next];
    if (!brand) return;
    onChange(brand.id, "keyboard");
    refs.current[next]?.focus();
  };

  return (
    <div className={className}>
      <p id={BRANDS_LABEL_ID} className="text-[0.9375rem] font-semibold text-parchment">
        {label}
      </p>
      <p id={BRANDS_HINT_ID} className="mt-0.5 text-[0.9375rem] text-mist">
        {hint}
      </p>
      <div
        role="radiogroup"
        aria-labelledby={BRANDS_LABEL_ID}
        aria-describedby={`${BRANDS_HINT_ID} ${BRANDS_SUMMARY_ID}`}
        className="mt-3 grid grid-cols-3 gap-2"
      >
        {DEMO_BRANDS.map((brand, index) => {
          const checked = brand.id === activeId;
          return (
            <button
              key={brand.id}
              ref={(el) => {
                refs.current[index] = el;
              }}
              type="button"
              role="radio"
              aria-checked={checked}
              tabIndex={checked ? 0 : -1}
              // detail === 0: activated with Space/Enter, not a pointer.
              onClick={(e) => onChange(brand.id, e.detail === 0 ? "keyboard" : "pointer")}
              onKeyDown={(e) => onKeyDown(e, index)}
              className="press flex min-h-11 cursor-pointer flex-col items-start gap-2 rounded-lg border border-field px-3 py-2.5 text-left text-[0.9375rem] leading-tight font-medium text-mist hover:border-mist hover:text-parchment aria-checked:border-bronze aria-checked:bg-surface aria-checked:text-parchment aria-checked:shadow-[inset_0_0_0_1px_var(--color-bronze)] sm:flex-row sm:items-center sm:gap-2.5"
            >
              {/* Swatch: the brand's surface with its accent, in the shape of its mark */}
              <span
                aria-hidden="true"
                className="grid size-7 shrink-0 place-items-center rounded-md border border-line-strong"
                style={{ backgroundColor: brand.colors.surface }}
              >
                <span
                  className={`size-3.5 ${SHAPE_CLASS[brand.shape]}`}
                  style={{ backgroundColor: brand.colors.accent }}
                />
              </span>
              <span>{brand.name}</span>
            </button>
          );
        })}
      </div>
      <p id={BRANDS_SUMMARY_ID} className="sr-only" aria-live="polite">
        {summary}
      </p>
    </div>
  );
}

function PosDemo({ activeId, animate }: { activeId: DemoBrandId; animate: boolean }) {
  const c = useCopy(WHITE_LABEL_COPY).demo.screen;
  const money = useMoney();
  const brand = brandById(activeId);
  if (!brand) return null;

  const subtotal = SUBTOTAL;
  const colorTransition = animate ? `transition-colors ${DEMO_TRANSITION}` : "transition-none";

  const vars = {
    "--demo-surface": brand.colors.surface,
    "--demo-panel": brand.colors.panel,
    "--demo-ink": brand.colors.ink,
    "--demo-muted": brand.colors.muted,
    "--demo-line": brand.colors.line,
    "--demo-accent": brand.colors.accent,
    "--demo-accent-ink": brand.colors.accentInk,
  } as CSSProperties;

  return (
    <div
      aria-hidden="true"
      style={vars}
      className={`@container overflow-hidden rounded-xl bg-[var(--demo-surface)] text-[var(--demo-ink)] select-none ${colorTransition}`}
    >
      {/* Top bar: the brand */}
      <div
        className={`flex items-center justify-between gap-3 border-b border-[var(--demo-line)] bg-[var(--demo-panel)] px-3.5 py-3 ${colorTransition}`}
      >
        <div className="flex min-w-0 items-center gap-2.5">
          <Crossfade activeId={activeId} animate={animate} render={(b) => <Monogram brand={b} />} />
          <div className="min-w-0 leading-tight">
            <Crossfade
              activeId={activeId}
              animate={animate}
              render={(b) => <span className="block text-[0.9375rem] font-semibold">{b.name}</span>}
            />
            <span className={`block text-xs text-[var(--demo-muted)] ${colorTransition}`}>{c.subtitle}</span>
          </div>
        </div>
        <span className={`flex items-center gap-1.5 text-xs text-[var(--demo-muted)] ${colorTransition}`}>
          <span className={`size-1.5 rounded-full bg-[var(--demo-accent)] ${colorTransition}`} />
          {c.register}
        </span>
      </div>

      <div className="grid @[30rem]:grid-cols-[minmax(0,1fr)_12.5rem]">
        {/* Menu */}
        <div className="p-3.5">
          <div className="flex gap-4 text-[0.8125rem]">
            {c.categories.map((cat, i) => (
              <span
                key={cat}
                className={`border-b-2 pb-1.5 ${colorTransition} ${
                  i === 0
                    ? "border-[var(--demo-accent)] font-semibold"
                    : "border-transparent text-[var(--demo-muted)]"
                }`}
              >
                {cat}
              </span>
            ))}
          </div>
          <ul className="mt-3 grid grid-cols-2 gap-2">
            {DEMO_MENU.map((item) => {
              const qty = qtyOf(item.key);
              return (
                <li
                  key={item.key}
                  className={`relative flex min-h-[5.25rem] flex-col justify-between rounded-lg border border-[var(--demo-line)] bg-[var(--demo-panel)] p-2.5 ${colorTransition}`}
                >
                  <span className="pr-6 text-[0.8125rem] leading-snug font-medium">{c.menu[item.key]}</span>
                  <span className="figures mt-2 leading-tight">
                    <span className="block text-[0.8125rem] font-semibold">{money.usd(item.cents)}</span>
                    <span className={`block text-xs text-[var(--demo-muted)] ${colorTransition}`}>
                      {money.bs(item.cents)}
                    </span>
                  </span>
                  {qty > 0 && (
                    <span
                      className={`figures absolute top-2 right-2 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--demo-accent)] px-1 text-xs font-semibold text-[var(--demo-accent-ink)] ${colorTransition}`}
                    >
                      {qty}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Ticket */}
        <div
          className={`flex flex-col border-t border-[var(--demo-line)] bg-[var(--demo-panel)] p-3.5 @[30rem]:border-t-0 @[30rem]:border-l ${colorTransition}`}
        >
          <span className="text-[0.8125rem] font-semibold">{c.table}</span>
          <ul className="figures mt-2.5 space-y-1.5 text-[0.8125rem]">
            {DEMO_TICKET.map((line) => (
              <li key={line.key} className="flex items-baseline gap-2">
                <span className={`w-4 shrink-0 text-[var(--demo-muted)] ${colorTransition}`}>{line.qty}</span>
                <span className="min-w-0 flex-1 truncate">{c.menu[line.key]}</span>
                <span>{money.usd(priceOf(line.key) * line.qty)}</span>
              </li>
            ))}
          </ul>

          <div
            className={`figures mt-3 space-y-1 border-t border-[var(--demo-line)] pt-2.5 text-xs text-[var(--demo-muted)] ${colorTransition}`}
          >
            <div className="flex justify-between gap-2">
              <span>{c.subtotal}</span>
              <span>{money.usd(subtotal)}</span>
            </div>
            <div className="flex justify-between gap-2">
              <Crossfade activeId={activeId} animate={animate} render={(b) => serviceLabel(b, c)} />
              <Crossfade
                activeId={activeId}
                animate={animate}
                className="justify-items-end"
                render={(b) => (b.service.mode === "added" ? money.usd(serviceCents(b, subtotal)) : "")}
              />
            </div>
          </div>

          <div className="mt-2.5 flex items-end justify-between gap-2">
            <span className="text-[0.8125rem] font-semibold">{c.total}</span>
            <Crossfade
              activeId={activeId}
              animate={animate}
              className="figures justify-items-end text-right leading-tight"
              render={(b) => {
                const total = subtotal + serviceCents(b, subtotal);
                return (
                  <>
                    <span className="block text-lg font-semibold tracking-[-0.01em]">{money.usd(total)}</span>
                    <span className="block text-xs text-[var(--demo-muted)]">{money.bs(total)}</span>
                  </>
                );
              }}
            />
          </div>

          <span
            className={`mt-3.5 grid h-10 place-items-center rounded-md bg-[var(--demo-accent)] text-[0.875rem] font-semibold text-[var(--demo-accent-ink)] ${colorTransition} @[30rem]:mt-auto`}
          >
            {c.charge}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function WhiteLabel() {
  const c = useCopy(WHITE_LABEL_COPY);
  const money = useMoney();
  const [activeId, setActiveId] = useState<DemoBrandId>("brasa");
  // Keyboard-initiated brand changes are applied without animation.
  const [animate, setAnimate] = useState(true);

  const onBrandChange = (id: DemoBrandId, source: ChangeSource) => {
    setAnimate(source === "pointer");
    setActiveId(id);
  };

  const brand = brandById(activeId);
  const total = brand ? SUBTOTAL + serviceCents(brand, SUBTOTAL) : SUBTOTAL;
  const summary = brand
    ? c.demo.summary({
        name: brand.name,
        service: serviceLabel(brand, c.demo.screen),
        usd: money.usd(total),
        bs: money.bs(total),
      })
    : "";

  return (
    <section id={SECTION_IDS.whiteLabel} aria-labelledby={HEADING_ID} className="py-24 md:py-32">
      <div className="page grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] xl:gap-x-24">
        {/* Heading and intro */}
        <div className="lg:col-start-1 lg:row-start-1">
          <h2
            id={HEADING_ID}
            className="max-w-[20ch] text-[clamp(2rem,3.6vw,3rem)] leading-[1.08] font-semibold tracking-[-0.025em] text-parchment [text-wrap:balance]"
          >
            {c.title}
          </h2>
          <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-mist">{c.intro}</p>
        </div>

        {/*
          Live demo: second on mobile, right column (sticky) on desktop.
          Below lg the preview comes first and the picker sits right under it,
          so choosing a brand and seeing the result happen in one view.
          On desktop the picker goes back above the preview.
        */}
        <figure className="flex flex-col lg:sticky lg:top-24 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
          <BrandPicker
            activeId={activeId}
            onChange={onBrandChange}
            label={c.demo.brandsLabel}
            hint={c.demo.brandsHint}
            summary={summary}
            className="order-2 mt-4 lg:order-1 lg:mt-0"
          />
          <div className="order-1 rounded-[1.125rem] border border-line bg-night-deep p-2 shadow-[0_24px_60px_-28px_rgb(0_0_0/0.7)] sm:p-2.5 lg:order-2 lg:mt-5">
            <PosDemo activeId={activeId} animate={animate} />
          </div>
          <figcaption className="order-3 mt-3 text-sm leading-snug text-mist">{c.demo.caption}</figcaption>
        </figure>

        {/* What is configurable */}
        <div className="lg:col-start-1 lg:row-start-2">
          <h3 className="text-lg font-semibold tracking-[-0.01em] text-parchment">{c.groupsLabel}</h3>
          <ul className="mt-4 border-b border-line">
            {c.groups.map((group) => (
              <li
                key={group.title}
                className="grid gap-x-6 gap-y-1.5 border-t border-line py-5 sm:grid-cols-[10.5rem_minmax(0,1fr)]"
              >
                <h4 className="text-base font-semibold text-parchment">{group.title}</h4>
                <p className="text-base leading-relaxed text-mist">{group.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-2 text-[0.9375rem] leading-relaxed text-mist">
            {c.notes.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

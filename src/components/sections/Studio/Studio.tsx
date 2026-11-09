"use client";

import { SECTION_IDS } from "@/lib/constants";
import { scrollToSection } from "@/lib/scroll";
import { useCopy } from "@/i18n/useCopy";
import Button from "@/components/ui/Button";
import NorseIcon from "@/components/ui/NorseIcon";
import { STUDIO_COPY } from "./copy";

const BLOCK_GAP = "mt-24 md:mt-32";
const H3 = "text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.15] font-semibold tracking-[-0.02em] text-parchment";

export default function Studio() {
  const c = useCopy(STUDIO_COPY);

  return (
    <section
      id={SECTION_IDS.studio}
      aria-labelledby="studio-title"
      className="border-t border-line py-24 md:py-32"
    >
      <div className="page">
        {/* Who we are */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-20">
          <h2
            id="studio-title"
            className="max-w-[17ch] text-[clamp(2.1rem,4vw,3.4rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-parchment [text-wrap:balance]"
          >
            {c.title}
          </h2>
          <div className="max-w-[60ch] lg:pt-2">
            <p className="text-lg leading-relaxed text-parchment/90">{c.lede}</p>
            <p className="mt-6 text-mist">{c.origin}</p>
          </div>
        </div>

        {/* Facts: only figures re-counted from the repos (see copy.ts). */}
        <dl
          aria-label={c.factsLabel}
          className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 md:mt-20 lg:grid-cols-4"
        >
          {c.facts.map((f) => (
            <div key={f.figure} className="scroll-rise flex flex-col-reverse justify-end gap-3 border-t border-line pt-6">
              <dt className="max-w-[26ch] text-[0.9375rem] leading-snug text-mist">{f.label}</dt>
              <dd className="figures text-[clamp(2.25rem,4vw,3.25rem)] leading-none font-semibold tracking-[-0.03em] text-parchment">
                {f.figure}
              </dd>
            </div>
          ))}
        </dl>

        {/* What we do */}
        <div className={`${BLOCK_GAP} grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20`}>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h3 className={H3}>{c.doTitle}</h3>
            <p className="mt-4 max-w-[44ch] text-mist">{c.doLede}</p>
          </div>
          <ul className="divide-y divide-line border-y border-line">
            {c.capabilities.map((cap) => (
              <li key={cap.title} className="grid gap-2 py-6 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] sm:gap-8">
                <h4 className="font-semibold tracking-[-0.01em] text-parchment">{cap.title}</h4>
                <p className="text-mist">{cap.body}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* How we work: practices backed by evidence in the repos */}
        <div className={BLOCK_GAP}>
          <h3 className={H3}>{c.howTitle}</h3>
          <p className="mt-4 max-w-[58ch] text-mist">{c.howLede}</p>
          <ul className="mt-12 grid gap-x-16 gap-y-12 md:grid-cols-2">
            {c.practices.map((p) => (
              <li
                key={p.title}
                className="relative border-t border-line pt-6 before:absolute before:-top-px before:left-0 before:h-px before:w-12 before:bg-bronze"
              >
                <h4 className="text-lg font-semibold tracking-[-0.015em] text-parchment">{p.title}</h4>
                <p className="mt-3 max-w-[62ch] text-mist">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Sectors: only those with a real system behind them */}
        <div className={BLOCK_GAP}>
          <h3 className={H3}>{c.sectorsTitle}</h3>
          <p className="mt-4 max-w-[58ch] text-mist">{c.sectorsLede}</p>

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
            <div>
              <h4 className="flex items-center gap-2.5 text-[0.9375rem] font-semibold text-parchment">
                <span aria-hidden="true" className="size-2 rounded-full bg-rune" />
                {c.liveTitle}
              </h4>
              <ul className="mt-5 grid gap-4">
                {c.live.map((s) => (
                  <li
                    key={s.name}
                    className="grid grid-cols-[3.25rem_minmax(0,1fr)] gap-5 rounded-2xl border border-line bg-surface p-5 sm:p-6"
                  >
                    <span
                      aria-hidden="true"
                      className="flex size-13 items-center justify-center rounded-xl border border-line-strong bg-night-deep text-bronze"
                    >
                      {s.system && <NorseIcon id={s.system.id} className="size-7" />}
                    </span>
                    <div>
                      <p className="text-lg font-semibold tracking-[-0.015em] text-parchment">{s.name}</p>
                      {s.system && (
                        <p className="mt-0.5 text-[0.9375rem] font-semibold text-verdigris">{s.system.name}</p>
                      )}
                      <p className="mt-3 text-mist">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="flex items-center gap-2.5 text-[0.9375rem] font-semibold text-parchment">
                <span aria-hidden="true" className="size-2 rounded-full border border-mist" />
                {c.workshopTitle}
              </h4>
              <ul className="mt-5 divide-y divide-line border-y border-line">
                {c.workshop.map((s) => (
                  <li key={s.name} className="py-5">
                    <p className="font-semibold tracking-[-0.01em] text-parchment">{s.name}</p>
                    <p className="mt-2 text-mist">{s.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Closing */}
        <div className="mt-20 flex flex-col gap-6 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[52ch] text-lg text-parchment">{c.closing}</p>
          <Button variant="secondary" onClick={() => scrollToSection(SECTION_IDS.contact)} className="shrink-0">
            {c.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}

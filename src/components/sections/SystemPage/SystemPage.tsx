"use client";

import Link from "next/link";
import { systems } from "@/data/systems";
import { SECTION_IDS } from "@/lib/constants";
import { useI18n } from "@/i18n";
import { useCopy } from "@/i18n/useCopy";
import NorseIcon from "@/components/ui/NorseIcon";
import type { SystemEntry, SystemId } from "@/types";
import { SYSTEM_PAGE_COPY } from "./copy";

const LIVE: SystemEntry[] = systems.filter((s) => s.stage === "live");

/** Public path of a system page; also used by the explorer, the footer and the sitemap. */
export const systemPath = (id: SystemId) => `/sistemas/${id}`;

/**
 * The home contact form reads ?demo=<id> to preselect the system and prefill the message.
 * Links into the home with a hash are plain <a> (full navigation), never next/link: Next
 * 16.2's route cache keeps the first hash "/" was fetched with and appends the next one.
 */
const demoHref = (id: SystemId) => `/?demo=${id}#${SECTION_IDS.contact}`;

export default function SystemPage({ id }: { id: SystemId }) {
  const { locale } = useI18n();
  const c = useCopy(SYSTEM_PAGE_COPY);
  const entry = LIVE.find((s) => s.id === id);
  if (!entry) return null;
  const copy = entry.copy[locale];
  const others = LIVE.filter((s) => s.id !== id);

  return (
    <>
      <article aria-labelledby="system-title" className="pt-16">
        <div className="page pt-10 pb-20 lg:pt-14 lg:pb-28">
          <nav aria-label={c.breadcrumb}>
            <ol className="flex flex-wrap items-center gap-x-2 text-sm text-mist">
              <li className="flex items-center gap-2">
                <Link href="/" className="inline-flex min-h-11 items-center hover:text-parchment">
                  {c.home}
                </Link>
                <Slash />
              </li>
              <li className="flex items-center gap-2">
                <a
                  href={`/#${SECTION_IDS.systems}`}
                  className="inline-flex min-h-11 items-center hover:text-parchment"
                >
                  {c.systems}
                </a>
                <Slash />
              </li>
              <li>
                <span aria-current="page" className="inline-flex min-h-11 items-center text-parchment">
                  {entry.name}
                </span>
              </li>
            </ol>
          </nav>

          <header className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-7">
            <span className="grid size-20 shrink-0 place-items-center rounded-2xl border border-line-strong bg-surface text-bronze-bright">
              <NorseIcon id={entry.id} className="size-11" />
            </span>
            <div className="min-w-0">
              <h1
                id="system-title"
                className="text-[clamp(2.6rem,5.6vw,4.25rem)] leading-[1.02] font-semibold tracking-[-0.03em] text-parchment [text-wrap:balance]"
              >
                {entry.name}
              </h1>
              <p className="mt-2 text-lg text-mist md:text-xl">{copy.sector}</p>
            </div>
          </header>

          <p className="mt-10 max-w-[58ch] text-[1.1875rem] leading-[1.55] text-parchment md:text-xl">
            {copy.summary}
          </p>

          {copy.proof && (
            <p className="mt-5 flex items-center gap-2.5 text-[0.9375rem] font-medium text-parchment">
              <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-rune" />
              {copy.proof}
            </p>
          )}

          <a
            href={demoHref(entry.id)}
            className="press mt-9 inline-flex min-h-12 items-center rounded-lg bg-bronze px-6 text-base font-semibold text-night-deep hover:bg-bronze-bright"
          >
            {c.demo(entry.name)}
          </a>

          <ul
            aria-label={c.highlightsLabel}
            className="mt-14 grid divide-y divide-line border-y border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0"
          >
            {copy.highlights.map((h) => (
              <li
                key={h}
                className="flex gap-2.5 py-5 text-base leading-snug text-parchment sm:px-6 sm:first:pl-0 sm:last:pr-0"
              >
                <Check />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <section aria-labelledby="system-modules" className="mt-16 lg:mt-20">
            <h2
              id="system-modules"
              className="text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.15] font-semibold tracking-[-0.02em] text-parchment"
            >
              {c.modules}
            </h2>
            <div className="mt-6 gap-x-12 md:columns-2">
              {copy.modules.map((m) => (
                <div key={m.title} className="break-inside-avoid border-t border-line pt-5 pb-8">
                  <h3 className="text-lg font-semibold leading-snug tracking-[-0.01em] text-parchment">
                    {m.title}
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {m.points.map((p) => (
                      <li
                        key={p}
                        className="relative pl-4 leading-relaxed text-mist before:absolute before:top-[0.8em] before:left-0 before:h-px before:w-2 before:bg-bronze/70"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-4 grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
            <TagList id="system-platforms" title={c.platforms} items={copy.platforms} />
            <TagList id="system-integrations" title={c.integrations} items={copy.integrations} />
          </div>

          <div className="mt-14 flex flex-col gap-5 rounded-2xl border border-line bg-surface p-7 sm:flex-row sm:items-center sm:justify-between md:p-9">
            <p className="max-w-[40ch] text-lg leading-snug font-semibold text-parchment">{c.demoNote}</p>
            <a
              href={demoHref(entry.id)}
              className="press inline-flex min-h-12 shrink-0 items-center self-start rounded-lg bg-bronze px-6 text-base font-semibold text-night-deep hover:bg-bronze-bright sm:self-auto"
            >
              {c.demo(entry.name)}
            </a>
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <section aria-labelledby="other-systems" className="border-t border-line py-20 lg:py-24">
          <div className="page">
            <h2
              id="other-systems"
              className="text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.15] font-semibold tracking-[-0.02em] text-parchment"
            >
              {c.othersTitle}
            </h2>
            <p className="mt-3 max-w-[56ch] text-mist">{c.othersIntro}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((s) => (
                <li key={s.id}>
                  <Link
                    href={systemPath(s.id)}
                    className="group flex min-h-20 items-center gap-4 rounded-xl border border-line px-4 py-3.5 transition-colors duration-150 ease-[ease] hover:border-line-strong hover:bg-surface"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-line text-mist transition-colors duration-150 ease-[ease] group-hover:text-bronze-bright">
                      <NorseIcon id={s.id} className="size-6" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold leading-snug text-parchment">{s.name}</span>
                      <span className="block text-sm leading-snug text-mist">{s.copy[locale].sector}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}

function TagList({ id, title, items }: { id: string; title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <h2 id={id} className="text-base font-semibold text-parchment">
        {title}
      </h2>
      <ul aria-labelledby={id} className="mt-3 flex flex-wrap gap-2">
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

function Slash() {
  return (
    <span aria-hidden="true" className="text-mist-dim">
      /
    </span>
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

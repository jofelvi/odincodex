"use client";

import { stack } from "@/data/stack";
import { SECTION_IDS } from "@/lib/constants";
import { useI18n } from "@/i18n";
import { useCopy } from "@/i18n/useCopy";
import { STACK_COPY } from "./copy";

/** Real number of items shown; the count line never states anything else. */
const TOTAL = stack.reduce((sum, group) => sum + group.items.length, 0);

export default function Stack() {
  const { locale } = useI18n();
  const c = useCopy(STACK_COPY);

  return (
    <section
      id={SECTION_IDS.stack}
      aria-labelledby="stack-title"
      className="border-t border-line py-24 lg:py-32"
    >
      <div className="page">
        <header className="max-w-[46rem]">
          <h2
            id="stack-title"
            className="text-[clamp(2rem,3.6vw,3rem)] leading-[1.08] font-semibold tracking-[-0.025em] text-parchment [text-wrap:balance]"
          >
            {c.title}
          </h2>
          <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-mist">{c.intro}</p>
          <p className="figures mt-3 max-w-[60ch] text-base leading-relaxed text-mist-dim">
            {c.total(TOTAL)}
          </p>
        </header>

        {/* Balanced index: CSS columns keep the reading order top to bottom, column by column. */}
        <div className="mt-14 columns-1 gap-x-12 md:columns-2 lg:mt-16 lg:columns-3 xl:gap-x-16">
          {stack.map((group, groupIndex) => {
            const headingId = `stack-group-${groupIndex}`;
            const last = group.items.length - 1;
            return (
              <div
                key={group.category.es}
                className="scroll-rise break-inside-avoid border-t border-line pt-5 pb-10"
              >
                <h3
                  id={headingId}
                  className="text-base leading-snug font-semibold text-parchment"
                >
                  {group.category[locale]}
                </h3>
                <ul
                  role="list"
                  aria-labelledby={headingId}
                  className="mt-2.5 text-base leading-[1.75] text-mist [text-wrap:pretty]"
                >
                  {group.items.map((item, index) => (
                    <li key={item} className="inline">
                      {c.terms[item] ?? item}
                      {index < last ? ", " : ""}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

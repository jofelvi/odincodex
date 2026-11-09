"use client";

import { SECTION_IDS } from "@/lib/constants";
import { scrollToSection } from "@/lib/scroll";
import Button from "@/components/ui/Button";
import { useCopy } from "@/i18n/useCopy";
import { SERVICES_COPY } from "./copy";

const HEADING_ID = "services-title";

/** Two columns that line up with the contact section: label side and reading side. */
const COLUMNS = "lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20";

export default function Services() {
  const c = useCopy(SERVICES_COPY);

  return (
    <section
      id={SECTION_IDS.services}
      aria-labelledby={HEADING_ID}
      className="border-t border-line py-24 md:py-32"
    >
      <div className="page">
        <div className={COLUMNS}>
          <h2
            id={HEADING_ID}
            className="max-w-[18ch] text-[clamp(2rem,4.2vw,2.875rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-balance text-parchment"
          >
            {c.title}
          </h2>
          <p className="mt-5 max-w-[60ch] text-[1.1875rem] leading-[1.55] text-mist lg:mt-2">{c.lede}</p>
        </div>

        <ul role="list" className="mt-14 border-b border-line md:mt-20">
          {c.capabilities.map((capability) => (
            <li key={capability.id} className={`border-t border-line py-8 md:py-10 ${COLUMNS}`}>
              <h3 className="text-xl leading-snug font-semibold tracking-[-0.02em] text-parchment md:text-[1.375rem]">
                {capability.title}
              </h3>
              <div className="mt-3 lg:mt-0">
                <p className="max-w-[60ch] text-[1.0625rem] leading-[1.6] text-mist">
                  {capability.description}
                </p>
                <ul
                  role="list"
                  aria-label={c.deliverablesLabel}
                  className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2"
                >
                  {capability.deliverables.map((item) => (
                    <li key={item} className="flex items-baseline gap-3 text-[0.9875rem] leading-snug text-parchment">
                      <span aria-hidden="true" className="h-px w-3 shrink-0 translate-y-[-0.3em] bg-verdigris" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>

        <div className={`mt-10 md:mt-12 ${COLUMNS}`}>
          <div aria-hidden="true" className="hidden lg:block" />
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
            <p className="max-w-[46ch] text-[1.0625rem] leading-[1.6] text-mist">{c.closing}</p>
            <Button variant="secondary" className="shrink-0" onClick={() => scrollToSection(SECTION_IDS.contact)}>
              {c.action}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

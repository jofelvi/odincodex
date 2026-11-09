import Link from "next/link";
import NorseIcon from "@/components/ui/NorseIcon";
import { systems } from "@/data/systems";
import type { GuideBlock } from "@/data/guides";
import type { SystemId } from "@/types";

/** "2026-11-09" → "9 de noviembre de 2026" (fixed to UTC so server and client agree). */
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("es-VE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Ruta de navegación">
      <ol className="flex flex-wrap items-center gap-x-2 text-sm text-mist">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.label} className="flex min-w-0 items-center gap-2">
              {item.href && !last ? (
                <Link href={item.href} className="inline-flex min-h-11 items-center hover:text-parchment">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="inline-flex min-h-11 items-center text-parchment">
                  {item.label}
                </span>
              )}
              {!last && (
                <span aria-hidden="true" className="text-mist-dim">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

const DASH_ITEM =
  "relative pl-5 before:absolute before:top-[0.85em] before:left-0 before:h-px before:w-2.5 before:bg-bronze/80";

export function Block({ block }: { block: GuideBlock }) {
  switch (block.type) {
    case "p":
      return <p className="mt-5 first:mt-0">{block.text}</p>;

    case "list":
      if (block.ordered) {
        return (
          <ol className="mt-5 space-y-3 first:mt-0">
            {block.items.map((item, index) => (
              <li key={item} className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-1">
                <span aria-hidden="true" className="figures font-semibold text-bronze-bright">
                  {index + 1}.
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        );
      }
      return (
        <ul className="mt-5 space-y-3 first:mt-0">
          {block.items.map((item) => (
            <li key={item} className={DASH_ITEM}>
              {item}
            </li>
          ))}
        </ul>
      );

    case "note":
      return (
        <p className="mt-7 border-l-2 border-bronze pl-5 text-parchment first:mt-0">{block.text}</p>
      );

    case "example":
      return (
        <figure className="mt-7 overflow-hidden rounded-xl border border-line-strong bg-surface first:mt-0">
          <figcaption className="border-b border-line px-5 py-3.5 text-[0.9375rem] font-semibold text-bronze-bright">
            {block.title}
          </figcaption>
          <dl className="figures divide-y divide-line text-[1rem] leading-snug">
            {block.rows.map(([label, value]) => (
              <div
                key={label}
                className="grid gap-1 px-5 py-3 sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] sm:gap-5"
              >
                <dt className="text-mist">{label}</dt>
                <dd className="text-parchment">{value}</dd>
              </div>
            ))}
          </dl>
          {block.note && (
            <p className="border-t border-line px-5 py-3.5 text-[0.9375rem] leading-snug text-mist">{block.note}</p>
          )}
        </figure>
      );
  }
}

/** Links to the system pages that solve what a guide describes. */
export function RelatedSystems({ ids, title }: { ids: SystemId[]; title: string }) {
  const entries = ids
    .map((id) => systems.find((s) => s.id === id && s.stage === "live"))
    .filter((s) => s !== undefined);
  if (entries.length === 0) return null;
  return (
    <section aria-labelledby="related-systems">
      <h2
        id="related-systems"
        className="text-[clamp(1.35rem,2vw,1.625rem)] leading-[1.2] font-semibold tracking-[-0.015em] text-parchment"
      >
        {title}
      </h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {entries.map((s) => (
          <li key={s.id}>
            <Link
              href={`/sistemas/${s.id}`}
              className="group flex min-h-20 items-center gap-4 rounded-xl border border-line px-4 py-3.5 transition-colors duration-150 ease-[ease] hover:border-line-strong hover:bg-surface"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-line text-mist transition-colors duration-150 ease-[ease] group-hover:text-bronze-bright">
                <NorseIcon id={s.id} className="size-6" />
              </span>
              <span className="min-w-0">
                <span className="block font-semibold leading-snug text-parchment">{s.name}</span>
                <span className="block text-sm leading-snug text-mist">{s.copy.es.sector}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

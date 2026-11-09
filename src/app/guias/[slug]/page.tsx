import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findGuide, guides, readingMinutes } from "@/data/guides";
import { SITE_CONFIG, SECTION_IDS } from "@/lib/constants";
import { articleLd, breadcrumbLd, guideUrl } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import ClientProviders from "@/components/layout/ClientProviders";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Block, Breadcrumb, RelatedSystems, formatDate } from "@/components/sections/Guides/GuideParts";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const guide = findGuide(slug);
  if (!guide) return {};
  // A page-level openGraph/twitter object replaces the layout's, so the shared card is carried over.
  const inherited = await parent;
  const ogImages = inherited.openGraph?.images ?? [];
  const twitterImages = inherited.twitter?.images?.length ? inherited.twitter.images : ogImages;
  const path = `/guias/${guide.slug}`;
  return {
    title: guide.seoTitle,
    description: guide.description,
    alternates: { canonical: path },
    openGraph: {
      title: `${guide.seoTitle} | ${SITE_CONFIG.name}`,
      description: guide.description,
      url: path,
      siteName: SITE_CONFIG.name,
      type: "article",
      publishedTime: guide.published,
      locale: "es_419",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: `${guide.seoTitle} | ${SITE_CONFIG.name}`,
      description: guide.description,
      images: twitterImages,
    },
  };
}

const LEGAL_NOTE =
  "Esta guía es informativa y no constituye asesoría legal, contable ni tributaria. Las normas cambian: confirma cada punto con tu contador o abogado y con el texto publicado en la Gaceta Oficial.";

export default async function GuideRoute({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const guide = findGuide(slug);
  if (!guide) notFound();

  const minutes = readingMinutes(guide);
  const others = guides.filter((g) => g.slug !== guide.slug);
  const demoHref = `/?demo=${guide.systems[0]}#${SECTION_IDS.contact}`;

  return (
    <ClientProviders>
      <JsonLd
        data={[
          articleLd(guide),
          breadcrumbLd([
            { name: "Inicio", url: `${SITE_CONFIG.url}/` },
            { name: "Guías", url: guideUrl() },
            { name: guide.title, url: guideUrl(guide.slug) },
          ]),
        ]}
      />
      <Navbar />
      {/* Guides are written in Spanish only: lang stays "es" even if the visitor switches the UI to English. */}
      <main id="main" tabIndex={-1} lang="es" className="outline-none">
        <article aria-labelledby="guide-title" className="pt-16">
          <div className="page pt-10 pb-20 lg:pt-14 lg:pb-28">
            <Breadcrumb
              items={[
                { label: "Inicio", href: "/" },
                { label: "Guías", href: "/guias" },
                { label: guide.title },
              ]}
            />

            <header className="mt-8 max-w-[46rem]">
              <h1
                id="guide-title"
                className="text-[clamp(2.1rem,4.6vw,3.5rem)] leading-[1.06] font-semibold tracking-[-0.028em] text-parchment [text-wrap:balance]"
              >
                {guide.title}
              </h1>
              <p className="mt-5 text-[1.1875rem] leading-[1.55] text-mist md:text-xl">{guide.description}</p>
              <p className="figures mt-5 text-[0.9375rem] text-mist">
                Publicada el <time dateTime={guide.published}>{formatDate(guide.published)}</time>. Lectura de{" "}
                {minutes} minutos.
              </p>
            </header>

            <div className="mt-12 lg:mt-16 lg:grid lg:grid-cols-[minmax(0,44rem)_minmax(0,1fr)] lg:gap-20">
              <div className="min-w-0">
                {/* On small screens the contents fold into a disclosure so the text starts right away. */}
                <details className="group mb-10 rounded-xl border border-line lg:hidden">
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-5 font-semibold text-parchment [&::-webkit-details-marker]:hidden">
                    En esta guía
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-4 text-mist transition-transform duration-200 ease-[var(--ease-out-strong)] group-open:rotate-180 motion-reduce:transition-none"
                    >
                      <path d="M4 6l4 4 4-4" />
                    </svg>
                  </summary>
                  <Contents sections={guide.sections} className="border-t border-line px-5 py-3" />
                </details>

                <div className="text-[1.125rem] leading-[1.7] text-parchment">
                  {guide.intro.map((text) => (
                    <p key={text} className="mt-5 first:mt-0">
                      {text}
                    </p>
                  ))}

                  {guide.sections.map((section) => (
                    <section key={section.id} aria-labelledby={section.id} className="mt-14">
                      <h2
                        id={section.id}
                        className="mb-5 scroll-mt-24 text-[clamp(1.4rem,2.3vw,1.75rem)] leading-[1.2] font-semibold tracking-[-0.018em] text-parchment [text-wrap:balance]"
                      >
                        {section.heading}
                      </h2>
                      {section.blocks.map((block, index) => (
                        <Block key={index} block={block} />
                      ))}
                    </section>
                  ))}
                </div>

                {guide.legal && (
                  <p className="mt-14 rounded-xl border border-line bg-surface px-5 py-4 text-[0.9375rem] leading-relaxed text-mist">
                    {LEGAL_NOTE}
                  </p>
                )}

                {guide.sources && guide.sources.length > 0 && (
                  <section aria-labelledby="guide-sources" className="mt-14">
                    <h2 id="guide-sources" className="text-lg font-semibold text-parchment">
                      Fuentes
                    </h2>
                    <ol className="mt-4 space-y-2.5 text-[0.9375rem] leading-snug">
                      {guide.sources.map((source) => (
                        <li key={source.url}>
                          <a
                            href={source.url}
                            rel="noopener"
                            className="text-mist underline decoration-line-strong underline-offset-4 hover:text-parchment hover:decoration-bronze"
                          >
                            {source.label}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </section>
                )}

                <div className="mt-16 border-t border-line pt-12">
                  <RelatedSystems ids={guide.systems} title="Los sistemas que lo resuelven" />
                  <a
                    href={demoHref}
                    className="press mt-8 inline-flex min-h-12 items-center rounded-lg bg-bronze px-6 text-base font-semibold text-night-deep hover:bg-bronze-bright"
                  >
                    Solicitar una demo
                  </a>
                </div>
              </div>

              <aside aria-label="En esta guía" className="hidden lg:block">
                <div className="sticky top-28">
                  <p className="text-sm font-semibold text-parchment">En esta guía</p>
                  <Contents sections={guide.sections} className="mt-3 border-l border-line pl-4" />
                </div>
              </aside>
            </div>
          </div>
        </article>

        <section aria-labelledby="other-guides" className="border-t border-line py-20 lg:py-24">
          <div className="page">
            <h2
              id="other-guides"
              className="text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.15] font-semibold tracking-[-0.02em] text-parchment"
            >
              Otras guías
            </h2>
            <ul className="mt-8 grid gap-x-12 md:grid-cols-2">
              {others.map((g) => (
                <li key={g.slug} className="border-t border-line">
                  <Link href={`/guias/${g.slug}`} className="group block py-6">
                    <span className="block text-lg leading-snug font-semibold text-parchment transition-colors duration-150 ease-[ease] group-hover:text-bronze-bright">
                      {g.title}
                    </span>
                    <span className="mt-2 block max-w-[52ch] leading-relaxed text-mist">{g.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </ClientProviders>
  );
}

function Contents({ sections, className }: { sections: { id: string; heading: string }[]; className?: string }) {
  return (
    <ol className={className}>
      {sections.map((section) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            className="flex min-h-10 items-center py-1 text-[0.9375rem] leading-snug text-mist hover:text-parchment"
          >
            {section.heading}
          </a>
        </li>
      ))}
    </ol>
  );
}

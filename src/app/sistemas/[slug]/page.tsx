import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { systems } from "@/data/systems";
import { SITE_CONFIG, SECTION_IDS } from "@/lib/constants";
import { breadcrumbLd, softwareApplicationLd } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import ClientProviders from "@/components/layout/ClientProviders";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SystemPage from "@/components/sections/SystemPage/SystemPage";
import type { SystemEntry } from "@/types";

type Params = { slug: string };

const LIVE: SystemEntry[] = systems.filter((s) => s.stage === "live");

// Only the systems in production get a page; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return LIVE.map((s) => ({ slug: s.id }));
}

function findLive(slug: string): SystemEntry | undefined {
  return LIVE.find((s) => s.id === slug);
}

/** Cuts at a word boundary so the snippet never ends mid-word. */
function clampDescription(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  const base = (lastSpace > 80 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.—-]+$/, "");
  return `${base}…`;
}

export async function generateMetadata(
  { params }: { params: Promise<Params> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const system = findLive(slug);
  if (!system) return {};
  // A page-level openGraph/twitter object replaces the layout's whole object, so the
  // shared card (src/app/opengraph-image.tsx), site name and locale are carried over.
  const inherited = await parent;
  const ogImages = inherited.openGraph?.images ?? [];
  // The layout's twitter card falls back to the OG image only at the final merge, so reuse it.
  const twitterImages = inherited.twitter?.images?.length ? inherited.twitter.images : ogImages;
  const copy = system.copy.es;
  const title = `${system.name} — ${copy.sector}`;
  const description = clampDescription(copy.summary);
  const path = `/sistemas/${system.id}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${SITE_CONFIG.name}`,
      description,
      url: path,
      siteName: SITE_CONFIG.name,
      type: "website",
      locale: "es_419",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_CONFIG.name}`,
      description,
      images: twitterImages,
    },
  };
}

export default async function SystemRoute({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const system = findLive(slug);
  if (!system) notFound();

  const url = `${SITE_CONFIG.url}/sistemas/${system.id}`;

  return (
    <ClientProviders>
      <JsonLd
        data={[
          softwareApplicationLd(system, "es"),
          breadcrumbLd([
            { name: "Inicio", url: `${SITE_CONFIG.url}/` },
            { name: "Sistemas", url: `${SITE_CONFIG.url}/#${SECTION_IDS.systems}` },
            { name: system.name, url },
          ]),
        ]}
      />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <SystemPage id={system.id} />
      </main>
      <Footer />
    </ClientProviders>
  );
}

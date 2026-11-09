import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { systems } from "@/data/systems";
import { faqs } from "@/data/faq";
import { SITE_CONFIG, SECTION_IDS } from "@/lib/constants";
import { breadcrumbLd, faqPageLd, softwareApplicationLd } from "@/lib/seo";
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

/**
 * Search titles lead with what people type into Google (the need), then the
 * product name; nobody searches "Valhalla ERP" before knowing it exists.
 * Every claim mirrors src/data/systems.ts.
 */
const SEO: Partial<Record<SystemEntry["id"], { title: string; description: string }>> = {
  valhalla: {
    title: "Sistema POS para restaurantes y bares en Venezuela — Valhalla ERP",
    description:
      "Punto de venta para restaurantes, bares y clubes: caja en dólares y bolívares con tasa BCV, comandas por estación, inventario por receta y app para mesoneros. Con tu marca.",
  },
  bifrost: {
    title: "Software para clubes sociales y deportivos — Bifrost ERP",
    description:
      "Sistema de gestión para clubes privados en Venezuela: socios y acciones, cuotas y morosidad, facturación SENIAT, control de acceso con QR, reservas y app para socios.",
  },
  heimdall: {
    title: "Verificación automática de pago móvil — Heimdall",
    description:
      "Confirma cada pago móvil contra el banco, con monto exacto y alerta de referencias repetidas, sin que nadie tenga que entrar al banco. Para restaurantes, comercios y clubes en Venezuela.",
  },
  thor: {
    title: "Autopago con pago móvil y BioPago — Thor",
    description:
      "Kiosco de autopago configurable: el cliente se identifica, paga con pago móvil o BioPago y recibe su pase con QR al instante. Para clubes y negocios de atención al público.",
  },
  asgard: {
    title: "Sistema de nómina y RRHH para Venezuela (LOTTT) — Asgard",
    description:
      "Recursos humanos para empresas venezolanas: marcaje con selfie y geocerca, nómina con comisiones y propinas, préstamos, vacaciones, prestaciones y liquidaciones según la LOTTT.",
  },
  forseti: {
    title: "Software de facturación SENIAT para empresas y comercios — Forseti",
    description:
      "Facturación para Venezuela con número de control correlativo, notas de crédito y débito, IVA e IGTF, libro de ventas y cobro en bolívares y dólares a la tasa del día.",
  },
};

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
  const seo = SEO[system.id];
  const title = seo ? seo.title : `${system.name} — ${copy.sector}`;
  const description = clampDescription(seo ? seo.description : copy.summary);
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
  // The page renders in Spanish first, so the FAQ markup uses the Spanish answers.
  const faq = faqs[system.id]?.es ?? [];

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
          ...(faq.length > 0 ? [faqPageLd(url, faq)] : []),
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

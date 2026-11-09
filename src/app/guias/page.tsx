import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { guides, readingMinutes } from "@/data/guides";
import { systems } from "@/data/systems";
import { SITE_CONFIG } from "@/lib/constants";
import { breadcrumbLd, guideUrl, guidesItemListLd } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import ClientProviders from "@/components/layout/ClientProviders";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/sections/Guides/GuideParts";
import type { SystemId } from "@/types";

const TITLE = "Guías para negocios en Venezuela: pago móvil, SENIAT y nómina";
const DESCRIPTION =
  "Guías prácticas para dueños y gerentes: verificar pagos móviles, facturación SENIAT, prestaciones sociales, caja en dólares y bolívares e inventario por receta.";

export async function generateMetadata(_: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const inherited = await parent;
  const ogImages = inherited.openGraph?.images ?? [];
  const twitterImages = inherited.twitter?.images?.length ? inherited.twitter.images : ogImages;
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: "/guias" },
    openGraph: {
      title: `${TITLE} | ${SITE_CONFIG.name}`,
      description: DESCRIPTION,
      url: "/guias",
      siteName: SITE_CONFIG.name,
      type: "website",
      locale: "es_419",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: `${TITLE} | ${SITE_CONFIG.name}`,
      description: DESCRIPTION,
      images: twitterImages,
    },
  };
}

/** "Heimdall, Thor y Valhalla ERP" */
function systemNames(ids: SystemId[]): string {
  const names = ids
    .map((id) => systems.find((s) => s.id === id)?.name)
    .filter((name): name is string => Boolean(name));
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} y ${names[names.length - 1]}`;
}

export default function GuidesRoute() {
  return (
    <ClientProviders>
      <JsonLd
        data={[
          guidesItemListLd(guides),
          breadcrumbLd([
            { name: "Inicio", url: `${SITE_CONFIG.url}/` },
            { name: "Guías", url: guideUrl() },
          ]),
        ]}
      />
      <Navbar />
      <main id="main" tabIndex={-1} lang="es" className="outline-none">
        <div className="page pt-26 pb-20 lg:pt-30 lg:pb-28">
          <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Guías" }]} />

          <header className="mt-8 max-w-[46rem]">
            <h1 className="text-[clamp(2.4rem,5.2vw,4rem)] leading-[1.03] font-semibold tracking-[-0.03em] text-parchment [text-wrap:balance]">
              Guías para administrar tu negocio en Venezuela
            </h1>
            <p className="mt-6 max-w-[58ch] text-[1.1875rem] leading-[1.55] text-mist md:text-xl">
              Pago móvil, facturación, nómina y caja en dos monedas, explicados con pasos y ejemplos por el equipo
              que construye los sistemas que lo resuelven.
            </p>
          </header>

          <ul className="mt-14 border-b border-line lg:mt-16">
            {guides.map((guide) => (
              <li key={guide.slug} className="border-t border-line">
                <Link
                  href={`/guias/${guide.slug}`}
                  className="group grid gap-3 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,16rem)] md:gap-12"
                >
                  <span className="min-w-0">
                    <span className="block text-[clamp(1.3rem,2.1vw,1.625rem)] leading-[1.2] font-semibold tracking-[-0.015em] text-parchment transition-colors duration-150 ease-[ease] [text-wrap:balance] group-hover:text-bronze-bright">
                      {guide.title}
                    </span>
                    <span className="mt-3 block max-w-[62ch] leading-relaxed text-mist">{guide.summary}</span>
                  </span>
                  <span className="figures text-[0.9375rem] leading-relaxed text-mist md:pt-1.5">
                    <span className="block">Lectura de {readingMinutes(guide)} minutos</span>
                    <span className="block">
                      {guide.systems.length > 1 ? "Lo resuelven" : "Lo resuelve"} {systemNames(guide.systems)}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </ClientProviders>
  );
}

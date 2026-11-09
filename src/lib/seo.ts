import type { Locale } from "@/i18n";
import type { SystemEntry } from "@/types";
import { systems } from "@/data/systems";
import { SECTION_IDS, SITE_CONFIG } from "@/lib/constants";

/**
 * schema.org structured data (JSON-LD) builders. Pure functions: each returns
 * a plain node that <JsonLd> serialises. Only facts the owner has confirmed go
 * here; anything not provided (address, phone, profiles, prices, ratings) is
 * left out on purpose and marked where it would go.
 */

export type JsonLdPrimitive = string | number | boolean;
export type JsonLdValue = JsonLdPrimitive | JsonLdObject | JsonLdValue[];
export interface JsonLdObject {
  [key: string]: JsonLdValue;
}
export interface JsonLdNode extends JsonLdObject {
  "@type": string | string[];
}

const SITE_URL = SITE_CONFIG.url;
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const ORGANIZATION_REF: JsonLdObject = { "@id": ORGANIZATION_ID };

const ORGANIZATION_DESCRIPTION =
  "Estudio de software que adapta sus propios sistemas de gestión a la marca y la operación de cada negocio: punto de venta para restaurantes, gestión de clubes privados, verificación de pago móvil, autopago con BioPago, recursos humanos y facturación. Y software a medida cuando ningún sistema encaja.";

const AREA_SERVED: JsonLdValue[] = [
  { "@type": "Country", name: "Venezuela" },
  { "@type": "Place", name: "Latinoamérica" },
];

/** Public URL of a system's own page. */
export function systemUrl(id: SystemEntry["id"]): string {
  return `${SITE_URL}/sistemas/${id}`;
}

export function organizationLd(): JsonLdNode {
  return {
    // A software company with a visitable office: Organization + LocalBusiness
    // (ProfessionalService), so the address can back the Google Business Profile.
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORGANIZATION_ID,
    name: SITE_CONFIG.name,
    url: `${SITE_URL}/`,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/logo-mark.png`,
      contentUrl: `${SITE_URL}/images/logo-mark.png`,
      width: 512,
      height: 512,
    },
    email: SITE_CONFIG.email,
    description: ORGANIZATION_DESCRIPTION,
    areaServed: AREA_SERVED,
    knowsAbout: [
      "Punto de venta",
      "ERP",
      "Facturación SENIAT",
      "Pago móvil",
      "Recursos humanos",
      "Gestión de clubes privados",
      "Software a medida",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: SITE_CONFIG.email,
      availableLanguage: ["es", "en"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.region,
      addressCountry: SITE_CONFIG.address.country,
    },
    // Pending from the owner, add only with real data:
    // telephone: "+58…" (also inside contactPoint),
    // sameAs: [Google Business Profile, LinkedIn, Instagram… profile URLs],
  };
}

export function websiteLd(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: SITE_CONFIG.name,
    inLanguage: "es",
    publisher: ORGANIZATION_REF,
  };
}

/** The systems in production, in display order, each pointing to its page. */
export function systemsItemListLd(): JsonLdNode {
  const live = systems.filter((system) => system.stage === "live");
  return {
    "@type": "ItemList",
    "@id": `${SITE_URL}/#sistemas`,
    name: "Sistemas de gestión de OdinCodex",
    numberOfItems: live.length,
    itemListElement: live.map((system, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: system.name,
      url: systemUrl(system.id),
    })),
  };
}

/** Maps the free-text platform lines of a system to operating systems. */
function operatingSystems(platforms: string[]): string[] {
  const text = platforms.join(" ").toLowerCase();
  const found: string[] = [];
  if (/web|navegador|browser|pwa/.test(text)) found.push("Web");
  if (text.includes("android")) found.push("Android");
  if (/\bios\b/.test(text)) found.push("iOS");
  return found;
}

export function softwareApplicationLd(
  system: SystemEntry,
  locale: Locale = "es",
): JsonLdNode {
  const copy = system.copy[locale];
  const url = systemUrl(system.id);
  const node: JsonLdNode = {
    "@type": "SoftwareApplication",
    "@id": `${url}#software`,
    name: system.name,
    url,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: copy.sector,
    description: copy.summary,
    inLanguage: locale,
    provider: ORGANIZATION_REF,
    publisher: ORGANIZATION_REF,
    // No offers, price or aggregateRating: the owner has not published them.
    // Google only shows software rich results with offers or a rating, so this
    // node helps entity understanding but will not earn a rich result as is.
  };
  const os = operatingSystems(copy.platforms);
  if (os.length > 0) node.operatingSystem = os.join(", ");
  if (copy.modules.length > 0) {
    node.featureList = copy.modules.map((module) => module.title);
  }
  return node;
}

export function breadcrumbLd(items: { name: string; url: string }[]): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** The custom-software offer, provided by the organization. */
export function serviceLd(): JsonLdNode {
  return {
    "@type": "Service",
    "@id": `${SITE_URL}/#software-a-medida`,
    name: "Software a medida",
    serviceType: "Desarrollo de software a medida",
    url: `${SITE_URL}/#${SECTION_IDS.services}`,
    description:
      "Aplicaciones web, apps para Android e iOS, APIs e integraciones construidas para la operación de cada negocio cuando ningún sistema hecho encaja, con la misma ingeniería que sostiene nuestros sistemas en producción.",
    provider: ORGANIZATION_REF,
    areaServed: AREA_SERVED,
    inLanguage: "es",
  };
}

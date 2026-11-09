import type { Bilingual } from "@/i18n/useCopy";
import type { SystemId } from "@/types";

/*
 * Every statement here traces to the studio research (repos under
 * RepositoriosPersonales). Figures were re-counted on 2026-11-09:
 * - 2025: first commit of the product lineage (calolisPos-odinSyst, 2025-07-09).
 * - 2 systems in daily operation: Arena Restobar POS and the private club system.
 * - 80+: 71 prod-* tags (Arena) + 18 v1.0.x tags (club) = 89 production releases.
 * - 900+: 685 (club) + 262 (Arena) = 947 automated test files; odin6-pos is
 *   left out because it is a copy of Arena and would double count.
 * The club is never named (owner has not cleared it); banks are never named.
 */

interface Fact {
  figure: string;
  label: string;
}

interface Capability {
  title: string;
  body: string;
}

interface Practice {
  title: string;
  body: string;
}

interface Sector {
  name: string;
  body: string;
  /** System that serves it; drives the Norse icon and the product name. */
  system?: { id: SystemId; name: string };
}

export interface StudioCopy {
  title: string;
  lede: string;
  origin: string;
  factsLabel: string;
  facts: Fact[];
  doTitle: string;
  doLede: string;
  capabilities: Capability[];
  howTitle: string;
  howLede: string;
  practices: Practice[];
  sectorsTitle: string;
  sectorsLede: string;
  liveTitle: string;
  live: Sector[];
  workshopTitle: string;
  workshop: Sector[];
  closing: string;
  cta: string;
}

export const STUDIO_COPY: Bilingual<StudioCopy> = {
  es: {
    title: "Un estudio que construye, publica y opera sus propios sistemas.",
    lede: "OdinCodex diseña y desarrolla sistemas de gestión para negocios en Venezuela y los mantiene funcionando después de entregarlos. Los mismos núcleos que operan a diario en un restobar y en un club social privado son los que entregamos con la marca de cada cliente. También construimos software a la medida cuando el problema no cabe en un producto.",
    origin: "El nombre une a Odín, el dios nórdico de la sabiduría, con codex, el libro que la guarda. Es lo que hace un buen sistema de gestión: conserva lo que el negocio sabe de sí mismo.",
    factsLabel: "OdinCodex en cifras",
    facts: [
      { figure: "2025", label: "Año en que empezamos a construir nuestros sistemas de gestión" },
      { figure: "3", label: "Plataformas en las que publicamos: web, Google Play y App Store" },
      { figure: "80+", label: "Versiones publicadas en producción, cada una etiquetada y rastreable" },
      { figure: "900+", label: "Archivos de pruebas automatizadas en nuestros sistemas en producción" },
    ],
    doTitle: "Qué hacemos",
    doLede: "Nos ocupamos del sistema completo, desde el primer flujo hasta el servidor donde corre. No hay una parte que dependa de un tercero que nadie conoce.",
    capabilities: [
      {
        title: "Diseño de producto",
        body: "Flujos pensados para quien cobra, despacha y cierra la caja, con revisiones de diseño y accesibilidad documentadas.",
      },
      {
        title: "Paneles web",
        body: "Administración, caja, inventario e informes desde el navegador, sin instalar nada en cada equipo.",
      },
      {
        title: "Apps Android e iOS",
        body: "Una app por rol para mesoneros, caja, cocina, porteros y socios, con su ficha en Google Play y App Store y versión instalable desde la web.",
      },
      {
        title: "APIs y reglas de negocio",
        body: "El servidor fija precios y cobros; ningún teléfono decide cuánto se paga. Web, app y API comparten los mismos tipos de datos.",
      },
      {
        title: "Impresión térmica en la caja",
        body: "Comandas separadas por estación y arqueo de cierre en impresoras térmicas, con un servicio que se instala en la PC del local.",
      },
      {
        title: "Verificación de pagos",
        body: "El sistema confirma que un pago móvil llegó de verdad a la cuenta del negocio consultando los movimientos del banco.",
      },
      {
        title: "Despliegue y operación",
        body: "Publicamos en servidores que administramos nosotros, con respaldo de la base de datos antes de cada despliegue y vuelta atrás automática si algo falla.",
      },
    ],
    howTitle: "Cómo trabajamos",
    howLede: "La experiencia se nota en las prácticas, no en los adjetivos. Estas son las que sostienen los sistemas que hoy operan.",
    practices: [
      {
        title: "Pruebas en cada cambio",
        body: "Cada sistema tiene pruebas automatizadas. En el del club, cada cambio pasa por integración continua: revisión de tipos, análisis de código, pruebas y escaneo de secretos para que ninguna clave termine en el código.",
      },
      {
        title: "El camino del dinero, probado de punta a punta",
        body: "Pruebas de punta a punta recorren facturación, pagos y cobros simultáneos contra el sistema real, sobre una base de datos que se crea y se destruye en cada corrida. Otras abren un navegador y recorren socios, caja y facturación como lo haría tu personal.",
      },
      {
        title: "Migración desde sistemas heredados",
        body: "Para un club construimos la migración de su sistema de escritorio anterior, hecho en Visual FoxPro sobre SQL Server, con historial de cuotas desde 2018. El legado se lee en solo lectura, con simulación previa y respaldo, y la migración se puede repetir sin duplicar datos.",
      },
      {
        title: "Hecho para operar en Venezuela",
        body: "Facturación con número de control, notas de crédito y débito, IVA e IGTF según las reglas del SENIAT. Una sola tasa BCV para todo el sistema, cobro en bolívares y dólares, pago móvil y cierre de caja por moneda y por método.",
      },
      {
        title: "Preparados para los cortes de internet",
        body: "En Arena Restobar medimos 28 cortes de internet en 30 días. Desde entonces la web y la app avisan cuando no hay conexión y nunca dan por guardado lo que no llegó al servidor, y una prueba automática lo vigila.",
      },
      {
        title: "Roles y PIN de supervisor",
        body: "Cada persona ve lo que le toca. Quitar un producto de una cuenta, corregir la tasa o traspasar una acción del club exige PIN de supervisor y deja registro de quién, cuándo y por qué.",
      },
    ],
    sectorsTitle: "Sectores que atendemos",
    sectorsLede: "Solo nombramos sectores donde hay un sistema real detrás.",
    liveTitle: "En operación",
    live: [
      {
        name: "Restaurantes, bares y restobares",
        body: "Mesas y zonas, comandas por estación, caja bimoneda, inventario con recetas y nómina con comisiones. En producción en Arena Restobar.",
        system: { id: "valhalla", name: "Valhalla ERP" },
      },
      {
        name: "Clubes sociales privados",
        body: "Socios y acciones, cobranza de cuotas, facturación fiscal, control de acceso con carnet QR, reservas y comités deportivos. En operación en un club social privado.",
        system: { id: "bifrost", name: "Bifrost ERP" },
      },
    ],
    workshopTitle: "En desarrollo",
    workshop: [
      {
        name: "Gimnasios",
        body: "Gestión para varios gimnasios desde una sola instalación, con una app pensada para que el entrenamiento en curso siga aunque se vaya la señal.",
      },
      {
        name: "Servicio técnico y reparaciones",
        body: "Órdenes de servicio con sus estados, inventario de repuestos e historial de fallas, con app móvil.",
      },
    ],
    closing: "Si tu operación se parece a alguna de estas, o a ninguna, cuéntanos cómo trabaja hoy tu negocio.",
    cta: "Conversar con el estudio",
  },
  en: {
    title: "A studio that builds, ships and runs its own systems.",
    lede: "OdinCodex designs and builds management systems for businesses in Venezuela and keeps them running after delivery. The same cores that operate every day in a restobar and a private social club are the ones we deliver under each client's brand. We also build custom software when the problem doesn't fit a product.",
    origin: "The name joins Odin, the Norse god of wisdom, with codex, the book that keeps it. That is what a good management system does: it keeps what the business knows about itself.",
    factsLabel: "OdinCodex in figures",
    facts: [
      { figure: "2025", label: "The year we started building our management systems" },
      { figure: "3", label: "Platforms we ship to: web, Google Play and the App Store" },
      { figure: "80+", label: "Releases shipped to production, each one tagged and traceable" },
      { figure: "900+", label: "Automated test files across our production systems" },
    ],
    doTitle: "What we do",
    doLede: "We take care of the whole system, from the first flow to the server it runs on. No part of it depends on a third party nobody knows.",
    capabilities: [
      {
        title: "Product design",
        body: "Flows designed for the people who take payments, dispatch orders and close the register, with documented design and accessibility reviews.",
      },
      {
        title: "Web panels",
        body: "Administration, register, inventory and reports in the browser, with nothing to install on each computer.",
      },
      {
        title: "Android and iOS apps",
        body: "One app per role for waiters, cashiers, kitchen, door staff and members, listed on Google Play and the App Store, with a version installable from the web.",
      },
      {
        title: "APIs and business rules",
        body: "The server sets prices and charges; no phone decides how much gets paid. Web, app and API share the same data types.",
      },
      {
        title: "Thermal printing at the register",
        body: "Tickets split by station and end-of-shift counts on thermal printers, through a service installed on the venue's PC.",
      },
      {
        title: "Payment verification",
        body: "The system confirms that a mobile payment actually reached the business account by checking the bank's transactions.",
      },
      {
        title: "Deployment and operations",
        body: "We ship to servers we run ourselves, with a database backup before every deployment and an automatic rollback if anything fails.",
      },
    ],
    howTitle: "How we work",
    howLede: "Experience shows in practices, not adjectives. These are the ones behind the systems running today.",
    practices: [
      {
        title: "Tests on every change",
        body: "Every system has automated tests. In the club system, each change goes through continuous integration: type checks, linting, tests and secret scanning so no key ends up in the code.",
      },
      {
        title: "The money path, tested end to end",
        body: "End-to-end tests run invoicing, payments and concurrent charges against the real system, on a database created and destroyed on every run. Others open a browser and walk through members, the register and invoicing the way your staff would.",
      },
      {
        title: "Migration from legacy systems",
        body: "For a club, we built the migration from its previous desktop system, written in Visual FoxPro on SQL Server, with dues history going back to 2018. The legacy data is read in read-only mode, with a dry run and a backup first, and the migration can be repeated without duplicating records.",
      },
      {
        title: "Built to operate in Venezuela",
        body: "Invoicing with control numbers, credit and debit notes, VAT and IGTF under SENIAT rules. One BCV exchange rate across the whole system, payments in bolívares and dollars, pago móvil, and register closing by currency and method.",
      },
      {
        title: "Ready for internet outages",
        body: "At Arena Restobar we measured 28 internet outages in 30 days. Since then the web and the app say so when there is no connection and never report as saved what didn't reach the server, and an automated test guards that rule.",
      },
      {
        title: "Roles and supervisor PIN",
        body: "Each person sees what their job needs. Removing an item from a bill, correcting the exchange rate or transferring a club share requires a supervisor PIN and records who, when and why.",
      },
    ],
    sectorsTitle: "Sectors we serve",
    sectorsLede: "We only list sectors with a real system behind them.",
    liveTitle: "In operation",
    live: [
      {
        name: "Restaurants, bars and restobars",
        body: "Tables and zones, tickets by station, dual-currency register, recipe-based inventory and payroll with commissions. In production at Arena Restobar.",
        system: { id: "valhalla", name: "Valhalla ERP" },
      },
      {
        name: "Private social clubs",
        body: "Members and shares, dues collection, fiscal invoicing, QR card access control, bookings and sports committees. Running at a private social club.",
        system: { id: "bifrost", name: "Bifrost ERP" },
      },
    ],
    workshopTitle: "In development",
    workshop: [
      {
        name: "Gyms",
        body: "Management for several gyms from a single installation, with an app designed so a workout in progress carries on when the signal drops.",
      },
      {
        name: "Technical service and repairs",
        body: "Service orders with their stages, spare-parts inventory and fault history, with a mobile app.",
      },
    ],
    closing: "If your operation looks like one of these, or like none of them, tell us how your business works today.",
    cta: "Talk to the studio",
  },
};

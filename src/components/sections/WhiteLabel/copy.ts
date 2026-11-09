import type { Bilingual } from "@/i18n/useCopy";

/* ───────────────────────────────────────────────────────────────
   White-label section copy and demo data.

   The demo brands below are FICTITIOUS examples. Their colours are
   illustrative values for the mock point-of-sale screen only: this is
   the one place in the site where raw colours are allowed.
   ─────────────────────────────────────────────────────────────── */

export type DemoBrandId = "brasa" | "marea" | "altamar";
export type MenuKey = "tequenos" | "burger" | "lemonade" | "beer";

/** Service charge mode, mirroring the real tariff setting (added, included or none). */
export type ServiceMode = { mode: "added"; percent: number } | { mode: "included" } | { mode: "none" };

export interface DemoBrand {
  id: DemoBrandId;
  name: string;
  monogram: string;
  /** Shape of the monogram tile, so each example logo reads as its own mark. */
  shape: "rounded" | "circle" | "square";
  service: ServiceMode;
  colors: {
    /** Screen background. */
    surface: string;
    /** Bars, tiles and the ticket panel. */
    panel: string;
    ink: string;
    muted: string;
    line: string;
    accent: string;
    /** Text drawn on the accent colour. */
    accentInk: string;
  };
}

export const DEMO_BRANDS: DemoBrand[] = [
  {
    id: "brasa",
    name: "Casa Brasa",
    monogram: "CB",
    shape: "rounded",
    service: { mode: "added", percent: 10 },
    colors: {
      surface: "#1c1714",
      panel: "#27201b",
      ink: "#f3ebe2",
      muted: "#b9aa9b",
      line: "#3b312a",
      accent: "#e0703a",
      accentInk: "#1c1714",
    },
  },
  {
    id: "marea",
    name: "Marea Bar",
    monogram: "MB",
    shape: "circle",
    service: { mode: "included" },
    colors: {
      surface: "#eaf1f2",
      panel: "#ffffff",
      ink: "#12303a",
      muted: "#4d6a73",
      line: "#d2dfe2",
      accent: "#0f6e7f",
      accentInk: "#ffffff",
    },
  },
  {
    id: "altamar",
    name: "Club Altamar",
    monogram: "CA",
    shape: "square",
    service: { mode: "none" },
    colors: {
      surface: "#0f1a2e",
      panel: "#17243c",
      ink: "#eef1f6",
      muted: "#a3afc2",
      line: "#283754",
      accent: "#d8b25a",
      accentInk: "#0f1a2e",
    },
  },
];

/** Example prices in USD cents. The menu is the same for every brand: only the brand changes. */
export const DEMO_MENU: { key: MenuKey; cents: number }[] = [
  { key: "tequenos", cents: 600 },
  { key: "burger", cents: 950 },
  { key: "lemonade", cents: 300 },
  { key: "beer", cents: 250 },
];

export const DEMO_TICKET: { key: MenuKey; qty: number }[] = [
  { key: "tequenos", qty: 1 },
  { key: "burger", qty: 1 },
  { key: "lemonade", qty: 2 },
];

/** Illustrative exchange rate (Bs per USD) used only to show both currencies in the demo. */
export const DEMO_RATE = 250;

/** Values for the screen-reader summary of the demo result. */
export interface DemoSummary {
  name: string;
  service: string;
  usd: string;
  bs: string;
}

interface ConfigGroup {
  title: string;
  body: string;
}

export const WHITE_LABEL_COPY: Bilingual<{
  title: string;
  intro: string;
  groupsLabel: string;
  groups: ConfigGroup[];
  notes: string[];
  demo: {
    brandsLabel: string;
    brandsHint: string;
    caption: string;
    /** Polite live-region text describing the preview for the selected brand. */
    summary: (s: DemoSummary) => string;
    screen: {
      subtitle: string;
      register: string;
      categories: string[];
      menu: Record<MenuKey, string>;
      table: string;
      subtotal: string;
      serviceAdded: string;
      serviceIncluded: string;
      serviceNone: string;
      total: string;
      charge: string;
    };
  };
}> = {
  es: {
    title: "Tu nombre, tus colores y tus reglas, sobre un sistema probado.",
    intro:
      "Valhalla ERP y Bifrost ERP se entregan en marca blanca. Cada cliente recibe su propia instalación, con su base de datos, su dominio y su app. La marca y la operación se configuran desde el panel de Ajustes, sin tocar el código.",
    groupsLabel: "Qué se configura desde el panel",
    groups: [
      {
        title: "Datos del negocio",
        body: "Nombre comercial, razón social, RIF y dirección. También los textos del ticket y los datos de Pago Móvil y transferencia que se imprimen en él.",
      },
      {
        title: "Marca",
        body: "Nombre de la app, logo para fondo claro y para fondo oscuro, ícono y una paleta de 17 colores para el tema claro y el oscuro. La misma paleta viste el panel web y la app móvil.",
      },
      {
        title: "Tarifas y nómina",
        body: "Monedas, servicio adicional, incluido o sin servicio, impuesto y propinas sugeridas. Para el personal, la tasa y la base de la comisión, las cortesías y las retenciones. Cada orden guarda la tarifa con la que se cobró, así que un cambio no altera las órdenes cerradas.",
      },
      {
        title: "Operación y vocabulario",
        body: "País, zona horaria, hora de inicio de la jornada y primer día de la semana. Los roles y las estaciones se renombran para que el sistema hable como tu negocio: Mesonero, Mesa, Cocina o Barra.",
      },
      {
        title: "Módulos",
        body: "Nueve módulos opcionales se encienden o se apagan por cliente: socios, reservas, mesa conectada, fichas de barra, productos por rondas, bono por producto, conciliación bancaria, vigilancia de divisas y bot de Telegram. Un módulo apagado sale del menú y sus tareas programadas dejan de correr.",
      },
    ],
    notes: [
      "Una instalación nueva arranca neutra: sin logo y sin datos de otro negocio.",
      "En Bifrost ERP, además, la app móvil se compila para cada club con su nombre, sus colores y su ícono.",
    ],
    demo: {
      brandsLabel: "Marcas de ejemplo",
      brandsHint: "Elige una y mira la misma pantalla con otra marca.",
      caption:
        "Pantalla ilustrativa. Las marcas, los colores y los precios son de ejemplo y no corresponden a clientes de OdinCodex.",
      summary: ({ name, service, usd, bs }) => `Vista previa con ${name}: ${service}. Total ${usd} (${bs}).`,
      screen: {
        subtitle: "Punto de venta",
        register: "Caja 1",
        categories: ["Entradas", "Principales", "Bebidas"],
        menu: {
          tequenos: "Tequeños (6)",
          burger: "Hamburguesa de la casa",
          lemonade: "Limonada de hierbabuena",
          beer: "Cerveza nacional",
        },
        table: "Mesa 4",
        subtotal: "Subtotal",
        serviceAdded: "Servicio",
        serviceIncluded: "Servicio incluido",
        serviceNone: "Sin servicio",
        total: "Total",
        charge: "Cobrar",
      },
    },
  },
  en: {
    title: "Your name, your colors and your rules, on a proven system.",
    intro:
      "Valhalla ERP and Bifrost ERP are delivered white label. Every client gets its own installation, with its own database, domain and app. Brand and operations are configured from the Settings panel, without touching code.",
    groupsLabel: "What you configure from the panel",
    groups: [
      {
        title: "Business details",
        body: "Trade name, legal name, tax ID (RIF) and address. Also the receipt texts and the mobile payment and bank transfer details printed on it.",
      },
      {
        title: "Brand",
        body: "App name, logos for light and dark backgrounds, icon and a 17-color palette for the light and dark themes. The same palette dresses the web panel and the mobile app.",
      },
      {
        title: "Tariffs and payroll",
        body: "Currencies, service charge added, included or none, tax and suggested tips. For staff, the commission rate and base, comps and withholdings. Every order keeps the tariff it was charged with, so a change never alters closed orders.",
      },
      {
        title: "Operations and vocabulary",
        body: "Country, time zone, business-day start time and first day of the week. Roles and stations can be renamed so the system speaks like your business: waiter, table, kitchen or bar.",
      },
      {
        title: "Modules",
        body: "Nine optional modules are switched on or off per client: members, reservations, connected table, bar tokens, rounds, per-product bonus, bank reconciliation, currency watch and a Telegram bot. A module that is off leaves the menu and its scheduled tasks stop running.",
      },
    ],
    notes: [
      "A new installation starts neutral: no logo and no data from any other business.",
      "In Bifrost ERP, the mobile app is also built for each club with its own name, colors and icon.",
    ],
    demo: {
      brandsLabel: "Example brands",
      brandsHint: "Pick one to see the same screen under another brand.",
      caption:
        "Illustrative screen. Brands, colors and prices are examples and do not correspond to OdinCodex clients.",
      summary: ({ name, service, usd, bs }) => `Preview as ${name}: ${service}. Total ${usd} (${bs}).`,
      screen: {
        subtitle: "Point of sale",
        register: "Register 1",
        categories: ["Starters", "Mains", "Drinks"],
        menu: {
          tequenos: "Tequeños (6)",
          burger: "House burger",
          lemonade: "Mint lemonade",
          beer: "Local beer",
        },
        table: "Table 4",
        subtotal: "Subtotal",
        serviceAdded: "Service",
        serviceIncluded: "Service included",
        serviceNone: "No service charge",
        total: "Total",
        charge: "Charge",
      },
    },
  },
};

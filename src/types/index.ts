import type { Locale } from "@/i18n";

/** Ids of the OdinCodex systems; each has a drawn Norse icon in ui/NorseIcon. */
export type SystemId =
  | "valhalla"
  | "bifrost"
  | "heimdall"
  | "thor"
  | "asgard"
  | "forseti"
  | "sleipnir"
  | "midgard";

export interface SystemModule {
  /** Module name, e.g. "Caja bimoneda y arqueo". */
  title: string;
  /** 2–5 concrete capabilities, plain business language. */
  points: string[];
}

export interface SystemCopy {
  /** Sector it serves, short: "Restaurantes, bares y clubes". */
  sector: string;
  /** One sentence: what it is and what changes for the business. */
  summary: string;
  /** Three short, verifiable headline capabilities for compact views (hero index). */
  highlights: string[];
  /** Full module map. */
  modules: SystemModule[];
  /** Where it runs: "Panel web", "App Android e iOS", "Impresoras térmicas"… */
  platforms: string[];
  /** Integrations: "Tasa oficial BCV", "Pago móvil verificado contra el banco"… */
  integrations: string[];
  /** Optional fact line shown with the system, e.g. "En producción en Arena Restobar." */
  proof?: string;
}

export interface SystemEntry {
  id: SystemId;
  name: string;
  /** live: in production or client validation · workshop: in development. */
  stage: "live" | "workshop";
  copy: Record<Locale, SystemCopy>;
}

/** One question and its answer on a system page (also emitted as FAQPage JSON-LD). */
export interface FaqItem {
  /** Phrased the way people search for it. */
  q: string;
  /** Plain-text answer; every claim must trace to the system's data. */
  a: string;
}

export interface StackGroup {
  category: Record<Locale, string>;
  items: string[];
}

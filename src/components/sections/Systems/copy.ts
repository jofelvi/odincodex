import type { Bilingual } from "@/i18n/useCopy";

export interface SystemsCopy {
  title: string;
  intro: string;
  /** Label over the selectable systems; also names the tablist. */
  liveLabel: string;
  workshopTitle: string;
  workshopNote: string;
  highlightsLabel: string;
  modules: string;
  platforms: string;
  integrations: string;
  demo: (name: string) => string;
  /** Quiet link to the system's own page (/sistemas/<id>). */
  page: (name: string) => string;
  /** Collapses a mobile disclosure; focus returns to its header button. */
  close: (name: string) => string;
  /** Text handed to the contact form when a demo is requested. */
  demoMessage: (name: string) => string;
}

export const SYSTEMS_COPY: Bilingual<SystemsCopy> = {
  es: {
    title: "Qué incluye cada sistema, módulo por módulo.",
    intro:
      "Todos están en producción o en validación con clientes y comparten un mismo núcleo, así que lo que se prueba en uno fortalece a los demás. Elige un sistema para ver sus módulos, dónde funciona y con qué se conecta.",
    liveLabel: "En uso con clientes",
    workshopTitle: "En desarrollo",
    workshopNote: "Aún no se implementan con clientes.",
    highlightsLabel: "Lo esencial",
    modules: "Módulos",
    platforms: "Plataformas",
    integrations: "Integraciones",
    demo: (name) => `Solicitar una demo de ${name}`,
    page: (name) => `Ver la página de ${name}`,
    close: (name) => `Cerrar ${name}`,
    demoMessage: (name) => `Hola, quiero ver una demo de ${name} para mi negocio.`,
  },
  en: {
    title: "What each system includes, module by module.",
    intro:
      "Every one is in production or in client validation, and they share one core, so what is proven in one strengthens the rest. Choose a system to see its modules, where it runs and what it connects to.",
    liveLabel: "Running with clients",
    workshopTitle: "In development",
    workshopNote: "Not yet deployed with clients.",
    highlightsLabel: "Key capabilities",
    modules: "Modules",
    platforms: "Platforms",
    integrations: "Integrations",
    demo: (name) => `Request a ${name} demo`,
    page: (name) => `See the ${name} page`,
    close: (name) => `Close ${name}`,
    demoMessage: (name) => `Hi, I'd like to see a demo of ${name} for my business.`,
  },
};

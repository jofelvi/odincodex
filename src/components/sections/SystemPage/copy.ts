import type { Bilingual } from "@/i18n/useCopy";

export interface SystemPageCopy {
  breadcrumb: string;
  home: string;
  systems: string;
  highlightsLabel: string;
  modules: string;
  platforms: string;
  integrations: string;
  demo: (name: string) => string;
  demoNote: string;
  othersTitle: string;
  othersIntro: string;
}

export const SYSTEM_PAGE_COPY: Bilingual<SystemPageCopy> = {
  es: {
    breadcrumb: "Ruta de navegación",
    home: "Inicio",
    systems: "Sistemas",
    highlightsLabel: "Lo esencial",
    modules: "Módulos",
    platforms: "Plataformas",
    integrations: "Integraciones",
    demo: (name) => `Solicitar una demo de ${name}`,
    demoNote: "Cuéntanos de tu negocio y coordinamos la demostración.",
    othersTitle: "Otros sistemas",
    othersIntro: "Todos comparten un mismo núcleo y se entregan con tu marca.",
  },
  en: {
    breadcrumb: "Breadcrumb",
    home: "Home",
    systems: "Systems",
    highlightsLabel: "Key capabilities",
    modules: "Modules",
    platforms: "Platforms",
    integrations: "Integrations",
    demo: (name) => `Request a ${name} demo`,
    demoNote: "Tell us about your business and we will set up the demo.",
    othersTitle: "Other systems",
    othersIntro: "They all share one core and ship under your brand.",
  },
};

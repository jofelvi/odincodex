import type { Bilingual } from "@/i18n/useCopy";
import { SECTION_IDS } from "@/lib/constants";

export const HERO_COPY: Bilingual<{
  title: string;
  lede: string;
  primary: string;
  secondary: string;
  suiteTitle: string;
}> = {
  es: {
    title: "Sistemas de gestión para negocios que no pueden detenerse.",
    lede: "Punto de venta, clubes privados, pagos móviles, autopago, recursos humanos y facturación. Un mismo núcleo probado en producción, entregado con tu marca.",
    primary: "Solicitar una demo",
    secondary: "Explorar los sistemas",
    suiteTitle: "La suite",
  },
  en: {
    title: "Management systems for businesses that can't stop.",
    lede: "Point of sale, private clubs, mobile payments, self-checkout, human resources and invoicing. One core proven in production, delivered under your brand.",
    primary: "Request a demo",
    secondary: "Explore the systems",
    suiteTitle: "The suite",
  },
};

export const HERO_TARGETS = { primary: SECTION_IDS.contact, secondary: SECTION_IDS.systems } as const;

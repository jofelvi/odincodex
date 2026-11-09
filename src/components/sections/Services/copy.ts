import type { Bilingual } from "@/i18n/useCopy";

export interface Capability {
  id: "development" | "ai" | "design" | "consulting" | "branding";
  title: string;
  /** One or two sentences: what the business gets. */
  description: string;
  /** Concrete deliverables, short noun phrases. */
  deliverables: string[];
}

export interface ServicesCopy {
  title: string;
  lede: string;
  deliverablesLabel: string;
  closing: string;
  action: string;
  capabilities: Capability[];
}

export const SERVICES_COPY: Bilingual<ServicesCopy> = {
  es: {
    title: "Si ningún sistema encaja, lo construimos",
    lede: "Hay operaciones que no caben en un sistema hecho. Para esas construimos software a medida, con la misma ingeniería que sostiene nuestros sistemas en producción.",
    deliverablesLabel: "Incluye",
    closing: "Cuéntanos qué necesitas resolver y te decimos con franqueza si conviene adaptar un sistema o construir uno nuevo.",
    action: "Contar mi proyecto",
    capabilities: [
      {
        id: "development",
        title: "Desarrollo a medida",
        description:
          "Aplicaciones web, apps móviles y APIs pensadas para tu operación, no para un caso genérico. Se conectan con lo que ya usas.",
        deliverables: [
          "Aplicaciones web y paneles de gestión",
          "Apps para Android e iOS",
          "APIs e integraciones con otros sistemas",
        ],
      },
      {
        id: "ai",
        title: "Automatización con IA",
        description:
          "Modelos de lenguaje integrados en tus sistemas para quitarle trabajo repetitivo al equipo: leer documentos, responder consultas y preparar información.",
        deliverables: [
          "Reportes que se piden en lenguaje natural",
          "Lectura de facturas con OCR",
          "Listas de compra generadas a partir de los datos",
          "Agentes y flujos de datos a medida",
        ],
      },
      {
        id: "design",
        title: "Diseño de producto",
        description:
          "Interfaces que el personal entiende a la primera, con un sistema de diseño que mantiene el producto coherente mientras crece.",
        deliverables: ["Flujos e interfaces UI/UX", "Sistemas de diseño", "Prototipos navegables"],
      },
      {
        id: "consulting",
        title: "Consultoría técnica",
        description:
          "Criterio técnico antes de invertir: cómo estructurar el sistema, con qué tecnología y qué revisar en lo que ya tienes.",
        deliverables: [
          "Arquitectura y elección de tecnología",
          "Revisión de sistemas existentes",
          "Diagnóstico de rendimiento",
        ],
      },
      {
        id: "branding",
        title: "Marca",
        description:
          "Identidad visual para que tu producto se reconozca, aplicada de forma consistente en cada pantalla y pieza.",
        deliverables: ["Identidad visual", "Sistema gráfico", "Guía de marca"],
      },
    ],
  },
  en: {
    title: "When no system fits, we build it",
    lede: "Some operations don't fit a ready-made system. For those we build custom software, with the same engineering behind our systems in production.",
    deliverablesLabel: "Includes",
    closing: "Tell us what you need to solve and we'll tell you plainly whether to adapt a system or build a new one.",
    action: "Tell us about your project",
    capabilities: [
      {
        id: "development",
        title: "Custom development",
        description:
          "Web applications, mobile apps and APIs designed around your operation, not a generic case. They connect to what you already use.",
        deliverables: [
          "Web applications and management dashboards",
          "Android and iOS apps",
          "APIs and integrations with other systems",
        ],
      },
      {
        id: "ai",
        title: "AI automation",
        description:
          "Language models built into your systems to take repetitive work off your team: reading documents, answering questions and preparing information.",
        deliverables: [
          "Reports requested in plain language",
          "Invoice reading with OCR",
          "Purchase lists generated from your data",
          "Custom agents and data pipelines",
        ],
      },
      {
        id: "design",
        title: "Product design",
        description:
          "Interfaces your staff understands the first time, with a design system that keeps the product consistent as it grows.",
        deliverables: ["UI/UX flows and interfaces", "Design systems", "Clickable prototypes"],
      },
      {
        id: "consulting",
        title: "Technical consulting",
        description:
          "Technical judgment before you invest: how to structure the system, which technology to use and what to review in what you already have.",
        deliverables: [
          "Architecture and technology choices",
          "Review of existing systems",
          "Performance assessment",
        ],
      },
      {
        id: "branding",
        title: "Brand",
        description:
          "A visual identity that makes your product recognizable, applied consistently across every screen and asset.",
        deliverables: ["Visual identity", "Visual system", "Brand guidelines"],
      },
    ],
  },
};

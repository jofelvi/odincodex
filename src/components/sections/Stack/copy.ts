import type { Bilingual } from "@/i18n/useCopy";

export interface StackCopy {
  title: string;
  intro: string;
  /** Count line; receives the real number of items displayed. */
  total: (count: number) => string;
  /**
   * Translations for the few descriptive items in src/data/stack.ts, which are
   * written in Spanish. Product names (React, NestJS…) are not translated.
   */
  terms: Readonly<Record<string, string>>;
}

export const STACK_COPY: Bilingual<StackCopy> = {
  es: {
    title: "Con qué construimos",
    intro:
      "Todo lo que usamos para construir, publicar y mantener nuestros sistemas, desde la app en el teléfono hasta la impresora de la caja.",
    total: (count) => `${count} tecnologías en los sistemas que hemos construido, agrupadas por área.`,
    terms: {},
  },
  en: {
    title: "What we build with",
    intro:
      "Everything we use to build, ship and maintain our systems, from the app on the phone to the printer at the till.",
    total: (count) => `${count} technologies across the systems we have built, grouped by area.`,
    terms: {
      "Escáner de QR y códigos de barras": "QR and barcode scanning",
      Geolocalización: "Geolocation",
      "Modo sin conexión con NetInfo": "Offline mode with NetInfo",
      "Android nativo": "Native Android",
      "Tareas programadas": "Scheduled jobs",
      "Servidores VPS con Ubuntu": "Ubuntu VPS servers",
      "Servicios de Windows": "Windows services",
      "Tasa oficial BCV": "BCV official exchange rate",
      "Verificación automática de pagos": "Automatic payment verification",
      "Consulta de banca en línea": "Online banking lookups",
      "APIs compatibles con OpenAI": "OpenAI-compatible APIs",
      "Telegram con grammY": "Telegram with grammY",
      "Enlaces de WhatsApp": "WhatsApp links",
      "Pasarela SMS propia": "In-house SMS gateway",
      "Impresión térmica ESC/POS": "ESC/POS thermal printing",
      "Etiquetas CPCL por Bluetooth": "Bluetooth CPCL labels",
      "Códigos QR": "QR codes",
      "Despliegue automático con vuelta atrás": "Automatic deploys with rollback",
      "Persistencia offline de consultas": "Offline query persistence",
    },
  },
};

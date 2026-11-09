import type { Bilingual } from "@/i18n/useCopy";
import type { ContactFieldError, ProjectType } from "@/lib/contact";

/** Fields validateContact can report as "required"; each gets its own message. */
export type RequiredField = "name" | "email" | "message";

type SystemType = Exclude<ProjectType, "custom" | "other">;
type FailureReason = "send_failed" | "not_configured" | "rate_limited" | "network";

export interface ContactCopy {
  title: string;
  lede: string;
  next: string;
  emailLabel: string;
  labels: {
    name: string;
    email: string;
    company: string;
    projectType: string;
    message: string;
  };
  optional: string;
  placeholderProjectType: string;
  placeholderMessage: string;
  systemsGroup: string;
  /** Option label per system: name and the sector it serves. */
  systems: Record<SystemType, string>;
  custom: string;
  other: string;
  submit: string;
  sending: string;
  successTitle: string;
  successMessage: string;
  sendAnother: string;
  counter: (count: number, max: number) => string;
  /** "required" is worded per field so the message says what is missing. */
  errors: Record<Exclude<ContactFieldError, "required">, string> & {
    required: Record<RequiredField, string>;
  };
  /** Each is followed by the email address and a period. */
  failure: Record<FailureReason, string>;
}

export const CONTACT_COPY: Bilingual<ContactCopy> = {
  es: {
    title: "Solicita una demo",
    lede: "Elige el sistema que te interesa y cuéntanos cómo funciona tu negocio hoy.",
    next: "Te respondemos en menos de 24 horas para acordar la demo. Si lo que necesitas no está en la lista, escríbenos igual: también construimos software a medida.",
    emailLabel: "¿Prefieres el correo?",
    labels: {
      name: "Nombre",
      email: "Correo",
      company: "Empresa",
      projectType: "Sistema de interés",
      message: "Tu negocio",
    },
    optional: "opcional",
    placeholderProjectType: "Elige una opción",
    placeholderMessage: "Qué vende tu negocio, cuántas sedes o personas tiene y qué quieres resolver.",
    systemsGroup: "Sistemas",
    systems: {
      valhalla: "Valhalla ERP: restaurantes y bares",
      bifrost: "Bifrost ERP: clubes privados",
      heimdall: "Heimdall: verificación de pago móvil",
      thor: "Thor: autopago con BioPago",
      asgard: "Asgard: recursos humanos",
      forseti: "Forseti: facturación",
    },
    custom: "Software a medida",
    other: "Otro",
    submit: "Solicitar la demo",
    sending: "Enviando…",
    successTitle: "Solicitud recibida.",
    successMessage: "Te respondemos en menos de 24 horas al correo que nos dejaste.",
    sendAnother: "Enviar otra solicitud",
    counter: (count, max) => `${count} de ${max} caracteres`,
    errors: {
      required: {
        name: "Escribe tu nombre.",
        email: "Escribe tu correo para poder responderte.",
        message: "Cuéntanos qué necesitas.",
      },
      email: "Revisa el correo: debe tener la forma nombre@dominio.com.",
      tooLong: "Es demasiado largo; acórtalo un poco.",
      tooShort: "Cuéntanos un poco más (mínimo 10 caracteres).",
      invalid: "Elige una opción de la lista.",
    },
    failure: {
      send_failed:
        "No pudimos enviar tu solicitud. Tu texto sigue aquí: inténtalo de nuevo o escríbenos directo a",
      not_configured:
        "El formulario no está disponible en este momento. Tu texto sigue aquí; escríbenos directo a",
      rate_limited:
        "Recibimos varias solicitudes seguidas desde tu conexión. Espera unos minutos o escríbenos a",
      network: "No hay conexión. Revisa tu red e inténtalo de nuevo, o escríbenos a",
    },
  },
  en: {
    title: "Request a demo",
    lede: "Choose the system you're interested in and tell us how your business runs today.",
    next: "We reply within 24 hours to schedule the demo. If what you need isn't on the list, write to us anyway: we also build custom software.",
    emailLabel: "Prefer email?",
    labels: {
      name: "Name",
      email: "Email",
      company: "Company",
      projectType: "System of interest",
      message: "Your business",
    },
    optional: "optional",
    placeholderProjectType: "Choose an option",
    placeholderMessage: "What your business sells, how many locations or people it has, and what you want to solve.",
    systemsGroup: "Systems",
    systems: {
      valhalla: "Valhalla ERP: restaurants and bars",
      bifrost: "Bifrost ERP: private clubs",
      heimdall: "Heimdall: mobile payment verification",
      thor: "Thor: BioPago self-checkout",
      asgard: "Asgard: human resources",
      forseti: "Forseti: invoicing",
    },
    custom: "Custom software",
    other: "Other",
    submit: "Request the demo",
    sending: "Sending…",
    successTitle: "Request received.",
    successMessage: "We'll reply within 24 hours to the email you gave us.",
    sendAnother: "Send another request",
    counter: (count, max) => `${count} of ${max} characters`,
    errors: {
      required: {
        name: "Enter your name.",
        email: "Enter your email so we can reply.",
        message: "Tell us what you need.",
      },
      email: "Check the email: it should look like name@domain.com.",
      tooLong: "That's too long; please shorten it.",
      tooShort: "Tell us a little more (at least 10 characters).",
      invalid: "Choose an option from the list.",
    },
    failure: {
      send_failed:
        "We couldn't send your request. Your text is still here: try again or email us directly at",
      not_configured:
        "The form isn't available right now. Your text is still here; email us directly at",
      rate_limited:
        "We received several requests in a row from your connection. Wait a few minutes or email us at",
      network: "You're offline. Check your connection and try again, or email us at",
    },
  },
};

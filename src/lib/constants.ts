export const SITE_CONFIG = {
  name: "OdinCodex",
  url: "https://odincodex.com",
  email: "hello@odincodex.com",
  /** Same address as the Google Business Profile (name/address consistency helps local SEO). */
  address: {
    street: "Círculo Militar, Local 11 (al lado del gimnasio), Las Delicias",
    city: "Maracay",
    region: "Aragua",
    country: "VE",
  },
} as const;

export const SECTION_IDS = {
  hero: "inicio",
  systems: "sistemas",
  whiteLabel: "marca-blanca",
  studio: "estudio",
  stack: "stack",
  services: "a-medida",
  contact: "contacto",
} as const;

export const SITE_CONFIG = {
  name: "OdinCodex",
  tagline: "Software Studio",
  description:
    "We craft exceptional digital experiences through software development, design, and strategic consulting.",
  url: "https://odincodex.com",
  email: "hello@odincodex.com",
} as const;

export const SECTION_IDS = {
  hero: "hero",
  services: "services",
  work: "work",
  about: "about",
  aiAutomations: "ai-automations",
  techStack: "tech-stack",
  contact: "contact",
} as const;

export const NAV_LINKS = [
  { label: "Services", href: `#${SECTION_IDS.services}` },
  { label: "Work", href: `#${SECTION_IDS.work}` },
  { label: "About", href: `#${SECTION_IDS.about}` },
  { label: "AI", href: `#${SECTION_IDS.aiAutomations}` },
  { label: "Tech", href: `#${SECTION_IDS.techStack}` },
  { label: "Contact", href: `#${SECTION_IDS.contact}` },
] as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

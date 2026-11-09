# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Three audiences, all confirmed by the owner as primary:

- **Small and local businesses** (restaurants, shops, services): need a system or site that works and someone they can trust to build and keep it running.
- **Startups and founders**: need a product (MVP, SaaS) built fast with sound technical judgment.
- **Mid-size companies**: have internal systems and processes they want to modernize or automate (management systems, integrations, AI).

They arrive evaluating a studio before writing to it: they want to see what was built, for whom, and with what result, then contact.

## Product Purpose

OdinCodex is a software studio. The website exists to turn a visitor into a contact: someone who understands what the studio builds, believes it can build theirs, and writes through the contact form or email. Success is a qualified message in the inbox.

## Positioning

Lead offer (owner, 2026-11-09): **OdinCodex's own management systems, adapted to each client's brand and operation**, all built on shared cores. Custom software is the complementary offer when no system fits. Design, branding, consulting and AI automation are capabilities inside custom work.

Systems line (owner-confirmed names and scope; Norse names accepted on 2026-11-09; Huginn, Einherjar and Draupnir renamed to Thor, Asgard and Forseti the same day as more commercial):

| System | What it is | Stage |
|---|---|---|
| Valhalla ERP | POS + management for restaurants and bars; emphasis on **white label: everything is customizable** | In production at Arena Restobar |
| Heimdall | Mobile-payment verification against the bank (bank not named, owner's choice) | In production or client validation |
| Thor | Configurable self-checkout module with **BioPago** payments | In production or client validation |
| Bifrost ERP | Management for private clubs | In production or client validation |
| Asgard | HR, built on the ERP cores | In production or client validation |
| Forseti | Invoicing, built on the ERP cores | In production or client validation |
| Sleipnir | Car sales | In development (paused) |
| Midgard | Real estate sales | In development |

The owner stated the live group as "in production or in client validation" without a per-system split; do not assign a per-system stage until confirmed. Strategy the owner stated as an intention (not yet a fact to publish): modularize every system to sell modules and maximize revenue.

## Operating Context

- Bilingual site, Spanish first (default locale `es`), English second; the visitor's choice persists.
- Single landing page with sections: systems ledger (with white label and workshop), custom software (services, AI folded in), studio, tools, contact.
- Contact goes through `POST /api/contact` (Resend); the email address `hello@odincodex.com` is always shown as a direct fallback.

## Capabilities and Constraints

- Stack in place: Next.js 16, React 19, Tailwind 4, react-three-fiber, Lenis.
- The 3D rune particle field in the hero (`HeroCanvas`, `ParticleField`) is **not to be modified** (owner's instruction); only its surroundings change.
- Contact form needs `RESEND_API_KEY` (and optionally `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`) in the deploy environment; without it the form shows an honest failure and the email fallback.

## Brand Commitments

- Name: **OdinCodex**, "Software Studio" / "Estudio de Software". The name joins Odin (Norse god of wisdom) and the codex (the bound manuscript); this origin is part of the brand story.
- Logo: the triple-horn mark with glowing Elder Futhark runes, kept as **PNG** (owner's instruction). Source file `public/images/logo.png`; cleaned square mark `public/images/logo-mark.png`.
- Elder Futhark runes are a recognized brand element (hero particle field, logo).
- Owner direction for the redesign: build the identity around the **"Codex"** idea, so the site stops reading as a generic dark agency template.

## Evidence on Hand

- The systems line above, in `src/data/systems.ts`. Mister Winner, Odin Systems and the e-commerce platform were removed from the site at the owner's request (2026-11-09).
- The owner **has screenshots and real figures** for the systems, not yet in the repo. Until they arrive, no metric, client quote or testimonial may be invented; empty slots must look intentionally pending, not filled with decorative gradients.
- No testimonials, client logos, team photos or pricing exist in the repo.

## Product Principles

1. **Proof before promise**: what was built and what it achieved comes before adjectives.
2. **Systems first**: the own systems line leads, under the client's brand; custom software complements it when nothing fits.
3. **Honest contact**: the form never claims a send it did not make; email is always one tap away.
4. **Spanish first, bilingual always**: both languages are complete and correct, not translated afterthoughts.

## Accessibility & Inclusion

WCAG 2.1 AA: text contrast ≥4.5:1, labelled form fields, keyboard-complete navigation, `prefers-reduced-motion` honored including JS-driven motion (smooth scroll, cursor, canvas where allowed).

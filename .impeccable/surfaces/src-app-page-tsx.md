---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: []
---

# Surface brief: home (src/app/page.tsx)

Scope: the single landing page. Visitor mode: **Persuade**.
Audience: small/local businesses, founders, mid-size companies evaluating a studio. Job: decide whether OdinCodex can build their system, then write.
Action: contact (hero one-line field that carries the text into the contact form; full form at the end; email fallback always visible).
Proof: the OdinCodex systems line in `src/data/systems.ts` (Valhalla ERP leads, white label; Sleipnir and Midgard in the workshop); owner will supply screenshots and real figures. Until then those cells read "Por asentar" / "To be entered" in pencil; never invented.
Constraints: rune particle field (`HeroCanvas`, `ParticleField`, `useDevicePerformance`) untouched; logo stays PNG (`logo-mark.png`).

## Direction contract

THESIS: The studio's codex is a work ledger. Every system built is a numbered entry with client, scope, tools and result, so proof comes before adjectives. It refuses the category default of a glowing dark hero over rows of equal service cards.

OWN-WORLD: Bottle-green bookcloth covers (#1F3A30) with bronze-gold stamping (#D9B45A). Inside pages are eye-ease green accounting paper (#DFE8D8) in blue-black ink (#1B2230), with pale blue line ruling (#8FA9C9) and red double rules (#B8332A) at margins and totals. Pencil grey (#5E6660) for anything still to be entered. Libre Caslon for headings and entries; Archivo (narrow widths) for printed column heads and UI, with tabular figures.

STORY: The visitor learns that OdinCodex builds custom software end to end. They believe it because the ledger lists real works with scope and tools, and results as they are entered. They act by opening a new entry: writing what they want to build.

FIRST VIEWPORT: The full-bleed green cloth cover, with the untouched rune field drifting over it. Left two-thirds: a gold-stamped title block with the volume line, the offer set large in Caslon, and one sentence naming who it serves. Below it, a ruled one-line field "What do you want to build?" with a gold stamp button. The logo mark is stamped on the right. A cloth head-band nav runs across the top.

FORM: Libro de registro de obras (ledger of works), position 1 on the ordered grounded list (IMPECCABLE'S PICK, chosen by the user over the assigned runestone). seed:2a2ee00f61cc569c. Signature interaction: the works register enters its rows once, each row's ink settling as its blue rule is drawn. The hero field carries its text into the contact entry. Motion grammar: one authored moment; everything else is feedback under 200 ms with cubic-bezier(0.23,1,0.32,1).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved
- Project screenshots and figures (owner to supply).
- Resend credentials in the deploy environment.

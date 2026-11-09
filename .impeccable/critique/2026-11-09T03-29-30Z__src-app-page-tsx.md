---
target: todo el diseño y animaciones (home)
total_score: 13
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 4
target_identity: "file:C:\\Users\\jofel\\RepositoriosPersonales\\odincodex\\src\\app\\page.tsx"
target_fingerprint: "sha256:164d38fd6c1834d5b6f1d8663e6f53cce3d8867d725672f85679e900c43d0dae"
target_path: "C:\\Users\\jofel\\RepositoriosPersonales\\odincodex\\src\\app\\page.tsx"
timestamp: 2026-11-09T03-29-30Z
slug: src-app-page-tsx
---
Method: dual-agent (A: design review · B: detector + browser) + animation audit (Emil Kowalski review-animations standards)

## Design Health Score (13/32, Poor; H7 and H10 n/a, Persuade surface)

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 1 | Form shows "sent" with zero network requests (Contact.tsx:46-53); no active nav state |
| 2 | Match System / Real World | 2 | "AI"/"Tech" nav labels; ES copy errors ("Hechos Diferente", "Deslizar") |
| 3 | User Control and Freedom | 2 | Nav are buttons, no #hash URLs; Esc/outside tap don't close mobile menu |
| 4 | Consistency and Standards | 1 | False affordances: "View Project", "Learn more →", hover-lit About rows do nothing |
| 5 | Error Prevention | 2 | No maxlength; fake submit wipes the visitor's text |
| 6 | Recognition Rather Than Recall | 2 | Placeholder-only form fields, no labels |
| 7 | Flexibility and Efficiency | n/a | One-page brochure |
| 8 | Aesthetic and Minimalist Design | 2 | Name x3 in hero, eyebrows repeat headings, two parallel 4-card grids, decorative motion everywhere |
| 9 | Error Recovery | 1 | No failure state; native tooltips in English on ES page |
| 10 | Help and Documentation | n/a | Marketing page |

## Design Specificity Verdict
Category-interchangeable dark agency template: blurred blobs, gradient on every H2, mono eyebrows, 4-card service grid twice, text-pill marquee, custom cursor, generic copy. Only ownable idea: the Elder Futhark rune particle field, diluted with generic symbols and confined to the hero. "Codex" half of the name unused.
Detector: CLI 2 findings (gradient-text globals.css:91, bounce-easing globals.css:240). Browser overlay: 31 desktop / 30 mobile (gradient-text x9, low-contrast x6 + placeholders x4, kicker-above-heading x6, stragglers, icon-tile-stack, pulsing-dot, marquee x2, grid background). Agreement with review on contrast, gradient overuse, eyebrows, bounce easing. Stragglers are viewport-fragile; grid bg and pulsing dot are stylistic.

## Priority Issues
- [P0] Contact form fakes success, sends nothing (Contact.tsx:46-53). Fix: real endpoint + pending/error states + aria-live, keep text on failure; mailto meanwhile. /impeccable harden
- [P1] About story never renders: .anim-line-reveal starts clip-path inset(0 0 100% 0), IntersectionObserver never fires (About.tsx:63-89, globals.css:210-222). Fix: observe parent, reveal with opacity/transform, visible by default. /impeccable animate
- [P1] Logo asset broken: checkerboard baked in pixels, 2816x1536, 6 MB, is the LCP element (Navbar.tsx:58, Hero.tsx:50, Footer.tsx:59). Fix: transparent SVG mark + wordmark. /impeccable polish
- [P1] No proof in Work (placeholder gradients, missing thumbnails/videos) + dead affordances; hero H1 is the name, not the offer. /impeccable clarify
- [P1] Accessibility cluster: text-muted #52525B ~2.6:1 (detector confirms), no labels, html lang fixed "en", mobile menu without aria-expanded and focusable when closed, WebGL + Lenis ignore reduced motion. /impeccable audit

## Animation audit (Emil Kowalski standards) — verdict: BLOCK
Feel-breaking: scale(0)+overshoot on whole marquee (globals.css:237-246); 700-1000ms reveals with transition-all (SectionHeading.tsx:41); About reveal never fires; 7 different reveal vocabularies (rotate, skew, clip, slide, scale, field-up, fade) = no cohesion; hero (focal moment) has no authored entrance while every lower section does.
Performance: ParallaxBlobs transition 0.1s linear fighting rAF + rAF per scroll event + 80-100px blur on fixed layers at 5% alpha; infinite box-shadow pulse on hover (globals.css:282); 4 infinite ai-icon-float loops; WebGL useFrame never pauses offscreen; 3000-sprite first render before detection; Lenis + cursor rAF loops never cancelled; cursor transitions width/height.
Timing: stagger 150-200ms per item (Work.tsx:51 up to 600ms); mobile menu max-height 500ms transition-all; navbar transition-all 500ms.
Physicality: cursor ring off-center on hover (fixed -20px offset while size grows to 64/96px, CustomCursor.tsx:58/79-80); marquee seam jumps ~16px each loop (gap-8 inside the -50% track); no :active press feedback on any button.
A11y: reduced motion kills all transitions to 0.01ms (erases meaningful feedback) but leaves JS motion running; .ai-card-glow:hover ungated; Work hover via onMouseEnter sticks on touch; marquee duplicate not aria-hidden; native cursor hidden globally (I-beam lost in inputs).

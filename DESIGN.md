---
name: OdinCodex
description: A house of white-label management systems, presented in night iron, forged bronze and verdigris.
colors:
  night: "#0e1a1c"
  night-deep: "#0a1416"
  surface: "#13252a"
  surface-raised: "#1a3036"
  line: "#24403f"
  line-strong: "#33585a"
  field: "#5a807d"
  parchment: "#e8e4da"
  mist: "#a9b8b5"
  mist-dim: "#8a9c99"
  bronze: "#c08a4e"
  bronze-bright: "#d39d60"
  bronze-deep: "#8f6232"
  verdigris: "#5fa89a"
  rune: "#2fd3c0"
  state-error: "#e88a76"
  state-ok: "#5fa89a"
  selection: "rgb(192 138 78 / 0.38)"
typography:
  display:
    fontFamily: "Familjen Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 5.6vw, 5rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Familjen Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2rem, 3.6vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  headline-close:
    fontFamily: "Familjen Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4.2vw, 2.875rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  headline-studio:
    fontFamily: "Familjen Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 4vw, 3.4rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  figure:
    fontFamily: "Familjen Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 4vw, 3.25rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontFeature: "tnum, lnum"
  title-lg:
    fontFamily: "Familjen Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Familjen Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.4vw, 2rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title-confirm:
    fontFamily: "Familjen Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.33
    letterSpacing: "-0.02em"
  title-sm:
    fontFamily: "Familjen Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.375
    letterSpacing: "-0.02em"
  title-xs:
    fontFamily: "Familjen Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.01em"
  lede:
    fontFamily: "Familjen Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.55
  body-lg:
    fontFamily: "Familjen Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "Familjen Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  body-read:
    fontFamily: "Familjen Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
  list:
    fontFamily: "Familjen Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "0.9875rem"
    fontWeight: 400
    lineHeight: 1.375
  ui:
    fontFamily: "Familjen Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1.375
  label:
    fontFamily: "Familjen Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.375
  caption:
    fontFamily: "Familjen Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.375
  micro:
    fontFamily: "Familjen Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.33
rounded:
  hairline: "3px"
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  2xl: "16px"
  frame: "18px"
  full: "9999px"
spacing:
  page-gutter: "clamp(1.25rem, 4vw, 3rem)"
  page-max: "78rem"
  header: "64px"
  scroll-offset: "80px"
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "20px"
  xl: "32px"
  2xl: "40px"
  3xl: "56px"
  4xl: "80px"
  section: "96px"
  section-lg: "128px"
components:
  button-primary:
    backgroundColor: "{colors.bronze}"
    textColor: "{colors.night-deep}"
    typography: "{typography.ui}"
    rounded: "{rounded.lg}"
    padding: "0 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.bronze-bright}"
    textColor: "{colors.night-deep}"
  button-primary-large:
    backgroundColor: "{colors.bronze}"
    textColor: "{colors.night-deep}"
    rounded: "{rounded.lg}"
    padding: "0 24px"
    height: "48px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.parchment}"
    typography: "{typography.ui}"
    rounded: "{rounded.lg}"
    padding: "0 20px"
    height: "44px"
  button-secondary-hover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.parchment}"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.parchment}"
    typography: "{typography.ui}"
    rounded: "{rounded.lg}"
  button-quiet-hover:
    textColor: "{colors.bronze-bright}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.parchment}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "10px 16px"
    height: "48px"
  system-tab:
    backgroundColor: "transparent"
    textColor: "{colors.parchment}"
    rounded: "{rounded.xl}"
    padding: "12px 16px"
    height: "64px"
  system-tab-selected:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.parchment}"
  system-panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.parchment}"
    rounded: "{rounded.2xl}"
    padding: "32px"
  icon-well:
    backgroundColor: "{colors.night}"
    textColor: "{colors.bronze-bright}"
    rounded: "{rounded.lg}"
    size: "40px"
  tag:
    backgroundColor: "rgb(14 26 28 / 0.4)"
    textColor: "{colors.mist}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "4px 10px"
  language-switch-active:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.parchment}"
    rounded: "{rounded.md}"
    size: "44px"
  nav-link:
    textColor: "{colors.mist}"
    typography: "{typography.ui}"
    height: "44px"
  nav-link-current:
    textColor: "{colors.parchment}"
---

# Design System: OdinCodex

## Overview

**Creative North Star: "Casa de sistemas"**

A house that builds and owns its own management systems, presenting them the way a serious product company would: dark, quiet and specific. The ground is night iron, a verdigris-tinted near-black taken from the logo itself; the one warm material is forged bronze, which marks every action. Verdigris confirms, and the cyan of the logo's runes appears only where something is actually live. The page is product-led: every system (Valhalla ERP, Bifrost ERP, Heimdall, Thor, Asgard, Forseti; Sleipnir and Midgard in development) is shown by its own hand-drawn Norse mark, its sector, and its real modules, not by mood imagery.

Density is calm B2B: generous section rhythm (96 to 128px), wide reading measures capped by `ch`, hairline dividers instead of boxes wherever a list will do, and one family of type doing all the work through weight and tracking. Motion is short and purposeful: one orchestrated rise on the hero, a 200ms settle when a person swaps a panel by pointer, nothing else moving for its own sake.

Two fixtures are part of the brand and are never restyled: the 3D rune particle field behind the hero (its colours are its own, not the token palette) and the PNG logo mark (`public/images/logo-mark.png`). The previous "ledger of works" world (bookcloth, accounting paper, serif display) was rejected by the owner and nothing of it carries over.

**Key Characteristics:**
- Night iron ground with tonal surfaces one step lighter; depth by tone and hairline, not shadow.
- Forged bronze is the single action colour; verdigris confirms; rune cyan means live.
- One sans family (Familjen Grotesk), semibold headings with negative tracking, sentence case everywhere.
- Hand-drawn Norse SVG marks on a 32 grid at 1.5 stroke, one per system.
- Restrained motion on a strong ease-out curve; reduced motion falls back to opacity only.

## Colors

A cold, dark, metallic palette lifted from the logo: iron greens for ground, one warm bronze for action, two cool accents with strictly separated meanings.

### Primary
- **Forged Bronze** (bronze): primary buttons, the current-section underline in the nav, the selected-tab bar in the systems explorer, Norse marks at rest, list rules in module lists (at 70% opacity), the caret, and the selection tint (`selection`, bronze at 38%).
- **Bright Bronze** (bronze-bright): hover state of bronze actions, selected icon wells, inline links (email), and the global focus ring.
- **Deep Bronze** (bronze-deep): defined in the theme but unused on the shipped page; no role assigned yet.

### Secondary
- **Verdigris** (verdigris): confirmation and belonging. Check marks in system highlights, the short dashes before custom-software deliverables, the system name under a live installation in Studio. `state-ok` shares its value.

### Tertiary
- **Rune Cyan** (rune): live signal only. A 6 to 8px dot before "live" labels and production proof lines. Never a surface, a text colour, a border or a button.

### Neutral
- **Night Iron** (night): page ground, theme colour, header at 90% when scrolled, icon well background.
- **Deep Night** (night-deep): footer ground, scrollbar track, text on bronze buttons, recessed icon wells and the white-label demo frame.
- **Iron Surface** (surface): panels, cards, form fields, hover fill of list rows.
- **Raised Iron** (surface-raised): the selected state of a tab, disclosure or language toggle.
- **Hairline** (line): every divider and resting card border.
- **Strong Hairline** (line-strong): secondary button border, icon well borders on selected items, scrollbar thumb, the success card border.
- **Field Edge** (field): input and unselected radio boundaries, kept at 3:1 or better on night and surface.
- **Parchment** (parchment): headings, primary text, body copy on panels.
- **Mist** (mist): secondary text, nav links at rest, ledes, sector labels.
- **Dim Mist** (mist-dim): tertiary text, placeholders, workshop (in development) items, the copyright line.
- **Error Coral** (state-error): field error borders and messages; at 60% for the send-failure notice border.

### Named Rules
**The Rune Is Alive Rule.** Rune cyan appears only as a small dot that means "in production now". If nothing on the screen is live, rune is absent.

**The One Warm Metal Rule.** Bronze is the only warm colour in the system and it always means "act here" or "you are here". Do not introduce a second accent hue for actions.

**The Tinted Neutral Rule.** No pure black or pure grey: every neutral carries the verdigris tint of the iron (#0e1a1c family). Shadows are the one place `rgb(0 0 0 / x)` is allowed.

## Typography

**Display Font:** Familjen Grotesk (with Segoe UI, system-ui, sans-serif)
**Body Font:** Familjen Grotesk (same family)

**Character:** A single grotesk with a slightly humanist, engineered feel. Hierarchy comes from size, semibold weight (600) and tight negative tracking on headings, never from a second family or from capitals.

### Hierarchy
- **Display** (600, clamp(2.6rem, 5.6vw, 5rem), 1.02, -0.03em): the hero headline only, max 16ch, balanced wrap.
- **Headline** (600, clamp(2rem, 3.6vw, 3rem), 1.08, -0.025em): section titles for Systems, White label and Stack. Services and Contact use the slightly tighter **headline-close** step; Studio uses the larger **headline-studio** step. All three are shipped; new sections should use Headline.
- **Figure** (600, clamp(2.25rem, 4vw, 3.25rem), 1, -0.03em, tabular lining figures): Studio facts.
- **Title** (600): system name in the explorer panel (1.875rem, -0.02em); Studio sub-heads (clamp(1.5rem, 2.4vw, 2rem), 1.15); the form success title (1.5rem); Services capability names (1.25rem stepping to 1.375rem at md); brand and email lines (1.25rem, -0.01em).
- **Lede** (400, 1.1875rem, 1.55): the opening paragraph under section titles in Services and Contact. The hero lede uses 1.125rem stepping to 1.25rem at md.
- **Body** (400, 1.0625rem, 1.6): the base body size set on `body`; descriptions, form fields, notices. Long reading text in Stack uses 1rem at 1.75. Body-lg (1.125rem, relaxed) carries system summaries.
- **UI** (500 to 600, 0.9375rem): the workhorse small size for nav links, buttons, form labels, highlights, module points and tag headings. Service deliverables sit at 0.9875rem.
- **Label** (500, 0.875rem): live labels, tags, footer column titles, the hero suite heading.
- **Caption and Micro** (0.8125rem and 0.75rem): inside the white-label demo and the hero suite sector labels only.

### Named Rules
**The Sentence Case Rule.** Every heading, label and button is sentence case. No uppercase transforms, no letter-spaced small caps, no eyebrow or kicker line above a heading.

**The One Family Rule.** Familjen Grotesk is the only face. Emphasis is weight or colour, never a second family.

**The Tabular Number Rule.** Every number that can change or be compared (facts, prices, counters, the copyright year) uses tabular lining figures.

## Layout

A single centred container (max 78rem) with a fluid gutter of clamp(1.25rem, 4vw, 3rem). Sections are stacked bands separated by a hairline top border, with 96px vertical padding stepping to 128px at md or lg; the hero is a full small-viewport-height band with 80 to 112px padding under a 64px fixed header. In-page anchors clear the header with an 80px scroll padding.

Desktop compositions are asymmetric two-column grids expressed in fractions: 5fr/7fr for heading-and-content sections, a fixed 18.5rem sticky tablist beside the systems panel, a 27rem suite list beside the hero headline, and a 2fr/1fr/1fr footer. Column gaps are 40 to 80px. Below lg (1024px) everything collapses to one column; the systems tablist becomes a disclosure list with one item open at a time, and the nav becomes an overlay panel.

Reading widths are always capped in `ch` (16 to 20ch for headlines, 44 to 62ch for paragraphs). Lists prefer hairline rows (`divide-y` with a border top and bottom) over cards. Touch targets are at least 44px tall throughout, 48px for primary mobile actions.

## Elevation & Depth

The system is flat and tonal. Depth reads as night, then surface, then surface-raised, bordered by hairlines. Shadows appear only on things that genuinely float above the page.

### Shadow Vocabulary
- **Overlay drop** (`box-shadow: 0 16px 32px rgb(0 0 0 / 0.35)`): the mobile menu panel, which sits over content.
- **Showcase lift** (`box-shadow: 0 24px 60px -28px rgb(0 0 0 / 0.7)`): the white-label demo frame, the one object presented as a device.
- **Selected ring** (`box-shadow: inset 0 0 0 1px var(--color-bronze)`): doubles the bronze border of a selected brand choice; a state, not an elevation.

Translucency is used twice: the scrolled header (night at 90% with a 12px backdrop blur) and the hero suite card (night at 70% with a 4px blur over the rune field). The hero also carries a radial legibility veil (night at 85% fading to transparent) behind the text column.

### Named Rules
**The Tone Before Shadow Rule.** A card at rest is a tone step and a hairline. If it does not float over other content, it gets no shadow.

## Shapes

Softly rounded, never pill-shaped for containers. Controls and fields are 8px; tabs, icon wells and small cards are 12px; panels and large cards are 16px; the white-label device frame is 18px. 6px is for tags, the language toggle segments and the scrollbar thumb; 4px is the focus ring; 3px is the square monogram in the demo. Full rounding is only for dots, the 2px current-section underline, the selected-tab bar and the hamburger strokes.

Borders are 1px hairlines. In-development items use a dashed hairline on their icon well, the only dashed border in the system.

Icons are a hand-drawn Norse family (`NorseIcon`): 32x32 viewBox, 1.5 stroke, round caps and joins, `currentColor`, with solid fill only for small accents (eyes, bosses, knot ends). Utility glyphs (check, chevron) are 16 grid at 1.6 stroke. Icons sit in square wells (40, 44, 52 or 64px) with a hairline border.

## Components

### Buttons
Solid, compact and confident; bronze carries the weight.
- **Shape:** gently rounded (8px), 44px tall by default, 48px for the large size; semibold 0.9375rem (1rem for large).
- **Primary:** bronze fill with deep-night text; hover to bright bronze. One per view region.
- **Secondary:** transparent with a strong-hairline border and parchment text; hover lifts the border to mist and fills with surface.
- **Quiet:** text only, parchment to bright bronze on hover.
- **Press:** scales to 0.97 over 160ms on the strong ease-out; colours transition 150ms plain ease. Disabled and aria-disabled sit at 60% opacity; in-flight actions stay focusable via aria-disabled.

### Chips (tags)
- **Style:** platform and integration tags are 6px rounded, hairline border, night at 40% fill, 0.875rem mist text.
- **Brand choice (white-label demo):** a radio card with a field-edge border; selected state is a bronze border doubled by the inset bronze ring on a surface fill.

### Cards / Containers
- **Corner Style:** 16px for panels and Studio installation cards; 12px for the success card.
- **Background:** surface on night; the hero suite is translucent night.
- **Shadow Strategy:** none at rest (see Elevation & Depth).
- **Border:** 1px hairline; strong hairline for the success card.
- **Internal Padding:** 32px stepping to 40px for panels; 20 to 24px for installation cards; 8px around the hero suite list, whose rows pad 12px by 16px.

### Inputs / Fields
- **Style:** surface fill, 1px field-edge border, 8px radius, 48px tall, 16px horizontal padding, 1.0625rem text, dim-mist placeholder. Selects replace the native arrow with a mist chevron at 12px from the right.
- **Focus:** border turns bright bronze, plus the global 2px bright-bronze outline at 3px offset.
- **Hover:** border lifts to mist.
- **Error:** coral border and a coral message beneath at 0.9375rem; the send-failure notice is a surface box with a 60% coral border.

### Navigation
- **Desktop:** fixed 64px header, transparent at the top of the page and night at 90% with blur and a hairline once scrolled (200ms). Links are 0.9375rem mist, parchment on hover; the section in view gets parchment text and a 2px bronze underline (scroll-spy). Right side: an ES/EN segmented toggle (hairline group, raised-iron active segment) and the bronze "request a demo" button.
- **Mobile (below 1024px):** a two-stroke toggle that rotates into an X; an overlay panel drops from the header with a scrim of deep night at 50%. Opens over 200ms and closes over 150ms on the strong ease-out; Escape closes instantly and returns focus to the toggle.
- **Skip link:** a bronze 8px-radius button with deep-night text, revealed on focus at the top left.

### Systems explorer (signature)
The core of the page. On desktop a sticky vertical tablist (64px rows, 12px radius, raised-iron selected fill with a 2px bronze bar at the left edge, icon in a 40px well that turns bright bronze when selected) drives a 16px-radius surface panel. On mobile each system is a disclosure row with a 44px icon well and a rotating chevron. Panel content: 64px icon well, system name, summary, a rune-dot proof line, three verdigris-checked highlights in a hairline-divided row, modules in two columns with short bronze rules, and tags. Pointer-initiated swaps play the 200ms swap-in; keyboard and deep-link changes switch in place.

### White-label demo (signature)
A live point-of-sale mock inside an 18px device frame on deep night with the showcase lift. Switching sample brands recolours the mock through scoped `--demo-*` custom properties over 200ms. The sample brand palettes are demo content, not system tokens.

## Do's and Don'ts

### Do:
- **Do** use bronze (#c08a4e) for the single primary action in a region and for "you are here" markers; hover to bright bronze (#d39d60).
- **Do** reserve rune cyan (#2fd3c0) for small live-status dots only.
- **Do** use verdigris (#5fa89a) for confirmation marks and deliverable rules.
- **Do** draw new system or feature icons in the NorseIcon family: 32 grid, 1.5 stroke, round caps and joins, currentColor.
- **Do** ease motion with cubic-bezier(0.23, 1, 0.32, 1): press 0.97 over 160ms, hero rise 480ms from 10px with a 60ms stagger, panel swap 200ms from 4px, menu 200ms open and 150ms close; colour changes 150 to 200ms on plain ease.
- **Do** animate only on pointer-initiated panel swaps; keyboard and deep-link changes switch in place.
- **Do** fall back to opacity only (200ms fade) under prefers-reduced-motion, with no scale on press and no smooth scrolling.
- **Do** use the 2px bright-bronze focus outline at 3px offset with a 4px radius on every focusable element.
- **Do** keep the rune particle field and the PNG logo mark exactly as they are.
- **Do** name only real, verifiable work: Arena Restobar is the only client that may be named.

### Don't:
- **Don't** put an all-caps eyebrow, kicker or letter-spaced label above a heading.
- **Don't** use gradient text, or gradients as decoration; the hero legibility veil is the only gradient.
- **Don't** use emoji, Unicode symbols or icon-font glyphs as icons; every icon is drawn SVG.
- **Don't** build meta strings joined with middle dots; separate with commas or layout.
- **Don't** append "→" or an arrow icon to CTA labels.
- **Don't** invent clients, logos, testimonials or metrics, and never name banks.
- **Don't** use the valknut, sunwheel, Othala or Wolfsangel in any mark.
- **Don't** restyle, recolour or replace the hero rune field, or redraw the logo as vector.
- **Don't** add shadows to cards at rest or introduce a second accent hue.
- **Don't** bring back the ledger world: no bookcloth, accounting paper or serif display face.

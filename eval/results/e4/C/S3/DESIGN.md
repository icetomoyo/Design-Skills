---
name: Concord
description: Conflict-free CRDT sync inside SQLite, drawn as a surveyor's triangulation sheet — cool ink paper, hairline rules, one cobalt ink.
colors:
  ink-0: "#F6F7F9"
  ink-1: "#EDEFF2"
  ink-2: "#DDE1E7"
  ink-3: "#C3CAD4"
  ink-4: "#9AA3B2"
  ink-5: "#676F80"
  ink-6: "#47505F"
  ink-7: "#2A3140"
  ink-8: "#171C26"
  ink-9: "#0E121A"
  cobalt: "#0047AB"
  cobalt-deep: "#003A85"
  cobalt-on-dark: "#7FA6F0"
  white: "#FFFFFF"
typography:
  display:
    fontFamily: "Inter, 'Segoe UI', system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2.3rem, 4.4vw, 3.5rem)"
    fontWeight: 800
    lineHeight: 1.12
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Inter, 'Segoe UI', system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.7rem, 2.8vw, 2.35rem)"
    fontWeight: 750
    lineHeight: 1.12
    letterSpacing: "-0.024em"
  title:
    fontFamily: "Inter, 'Segoe UI', system-ui, -apple-system, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 700
    lineHeight: 1.12
  body:
    fontFamily: "Inter, 'Segoe UI', system-ui, -apple-system, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Inter, 'Segoe UI', system-ui, -apple-system, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.04em"
  mono:
    fontFamily: "ui-monospace, 'Cascadia Mono', 'SF Mono', Consolas, Menlo, monospace"
    fontSize: "0.82rem"
    fontWeight: 400
    lineHeight: 1.7
    fontFeature: "tnum"
rounded:
  xs: "2px"
  sm: "3px"
  md: "4px"
  lg: "5px"
  xl: "6px"
spacing:
  section: "clamp(80px, 9vw, 120px)"
  gutter: "clamp(20px, 4vw, 48px)"
components:
  button-primary:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.white}"
    rounded: "{rounded.lg}"
    padding: "13px 22px"
  button-primary-hover:
    backgroundColor: "{colors.cobalt-deep}"
    textColor: "{colors.white}"
  button-nav:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.white}"
    rounded: "{rounded.lg}"
    padding: "9px 16px"
  station-card:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: "12px 14px 8px"
  trace-panel:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.xl}"
    padding: "20px 22px"
  tier-featured:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink-9}"
    rounded: "{rounded.xs}"
    padding: "30px 26px"
---

# Design System: Concord

## Overview

**Creative North Star: "The Triangulation Survey Sheet"**

One world owns the page: a surveyor's triangulation sheet. Devices are observation stations plotting writes onto cool ink drafting paper; the cobalt net converges them into one resolved point. The ground is ink paper ruled at a 36px pitch by a repeating hairline (`rgba(14, 18, 26, 0.028)`, i.e. deepest ink at 2.8% alpha over `ink-0`) — this ruling is the sheet's material, not decoration; it is never removed, blurred, or restyled. Structure is carried by 1px hairlines, never by fills, blocks, or heavy borders. Cobalt is the surveyor's plotting ink: the only saturated color on the sheet, spent on the single primary action, convergence lines, and kept-state marks.

The density is documentation-grade: SQL traces, merged-row tables, convergence matrices, and mono measurement captions do the persuading; prose stays measured and short-measure. Every figure ships with a provenance caption ("trace · fixture tasks-417-two-writers · synthetic data"), and the footer signs the sheet ("Sheet 001 — set in Inter · plotted in cobalt"). Confirmed visual rejections, binding on every future surface: no pill badges, no kicker/eyebrow labels above headings, no floating gradient blobs, no all-centered stacks, no gradient text, no glass/blur, no hard offset shadows, no decorative section numbers.

**Key Characteristics:**
- Cool ink drafting-paper ground: a ten-step low-saturation ink ramp, ruled at 36px, with white cards laid on it like plot sheets.
- One saturated ink: cobalt for plotting — primary CTA, convergence lines, kept marks, focus ring, selection.
- Hairline architecture: 1px rules in `ink-2`/`ink-3` separate sections, tiers, table cells, and footer columns.
- States are drawn marks, never hue swaps: cobalt plus-mark (kept), ink cross (superseded), dashed outline (pending).
- Inter for every heading, body, and label; mono only where a machine wrote the line (code, SQL, traces, hashes, measurements).
- Documentation-grade artifacts: every table, trace, and figure carries a mono measurement caption in muted ink.

## Colors

A ten-step cool ink ramp does all the neutral work; cobalt is the single saturated plotting ink, and white is the card paper laid on the sheet.

### Primary
- **Surveyor's Cobalt** (#0047AB): the only saturated color. Primary CTA background, links, focus ring, selection background, convergence lines in the triangulation nets, kept-state plus-marks, featured-tier outline, and the wordmark's mark.
- **Cobalt Deep** (#003A85): hover state of the primary action and of links; nothing else.
- **Cobalt on Dark** (#7FA6F0): cobalt's legible form on the deep-ink footer — footer links and the light wordmark's mark.

### Neutral
- **Survey Paper** (#F6F7F9, `ink-0`): page ground, sticky nav background. Carries the 36px ruled drafting texture.
- **Faded Panel** (#EDEFF2, `ink-1`): sunken panel ground (demo station panel), inline-code background, table header background, write-row hover.
- **Hairline** (#DDE1E7, `ink-2`): standard 1px rules — section separators, card and table borders, tier column separators.
- **Strong Hairline** (#C3CAD4, `ink-3`): load-bearing hairlines — nav bottom border, panel and trace borders, dashed pending outline, scrollbar thumb.
- **Footer Mute** (#9AA3B2, `ink-4`): quietest captions on the dark footer band; disabled-feeling secondary text on paper.
- **Measurement Ink** (#676F80, `ink-5`): mono measurement captions, fine print, awaiting-note text.
- **Annotation Ink** (#47505F, `ink-6`): secondary reading text — hero sub-line, chart station labels, notes, nav links.
- **Body Ink** (#2A3140, `ink-7`): body copy and argument prose.
- **Heading Ink** (#171C26, `ink-8`): headings, table values, mono trace text, station dots; also the footer's deep ground.
- **Deepest Ink** (#0E121A, `ink-9`): price numerals; the alpha source for every ink-tinted overlay (ruling, shadows).
- **Card White** (#FFFFFF): cards, station cards, traces, tables, featured tier — paper laid on the ruled sheet.

### Named Rules
**The One Ink Rule.** Cobalt is the only saturated color permitted on the sheet. Every other value comes from the ink ramp or white; introducing a second hue is a world break, not a palette extension.

**The Ruled Ground Rule.** The page ground is Survey Paper ruled at a 36px pitch by a 1px repeating hairline of deepest ink at 0.028 alpha. The ruling is the world's material: it stays on every surface that reads as "the sheet", and any tinted overlay must derive from a token (alpha overlays use `ink-9`'s RGB).

**The Mark-Not-Hue Rule.** State is drawn, never recolored: kept = cobalt plus-mark, superseded = ink cross, pending = dashed ink-3 outline, featured = 1.5px cobalt inset outline. No state is ever signaled by swapping a fill or text hue.

## Typography

**Display Font:** Inter (with 'Segoe UI', system-ui, -apple-system, sans-serif fallbacks)
**Body Font:** Inter (same stack)
**Label/Mono Font:** Inter caps for labels; ui-monospace ('Cascadia Mono', 'SF Mono', Consolas, Menlo) for machine lines

**Character:** One face, two registers. Inter carries everything human — tightly tracked at display sizes, tabular and calm at label sizes — while the mono face is reserved strictly for lines a machine wrote: SQL, traces, hashes, timestamps, measurements. The pairing reads as an instrument sheet: annotated by a person, plotted by a device.

### Hierarchy
- **Display** (800, clamp(2.3rem, 4.4vw, 3.5rem), 1.12, −0.03em): the hero claim only; measure capped at 21ch.
- **Headline** (750, clamp(1.7rem, 2.8vw, 2.35rem), 1.12, −0.024em): section arguments and pricing/install headings; measure capped at 24ch.
- **Title** (700, 1.2rem, 1.12): pricing tier names; footer column heads are its small-caps form (700, 0.85rem, 0.04em, uppercase).
- **Body** (400, 1.0625rem, 1.65): all prose, measure capped at 66ch; hero sub-line steps up to 1.14rem / 52ch in Annotation Ink.
- **Label** (700, 0.75rem–0.85rem, 0.04em, uppercase): chart station labels, table headers, station legends' caps register, footer column heads — typed or transformed caps, always Inter, never mono.
- **Mono** (400, 0.82rem, 1.7, tabular): SQL, shell traces, hashes, timestamps, measurement captions (0.76rem, 0.03em); inline code at 0.86em on a Faded Panel chip (3px radius).

### Named Rules
**The Pinned Face Rule.** Inter is the house face, pinned by the brand brief. Headings, body, labels, chart annotations, prices — all Inter. No other face is introduced for any role; display or label "variety" comes from weight (400–800) and tracking, not from a second family.

**The Mono Scope Rule.** Mono appears only where a machine wrote the line: code, SQL, traces, hashes, timestamps, and measurement values. It never sets prose, headings, navigation, or labels.

**The Tabular Figure Rule.** Every numeral that could be compared down a column is tabular: code, traces, measurements, chart labels, and prices all set `"tnum"` / `tabular-nums`.

## Layout

The sheet is a single 1200px-max column (`--container`) with fluid gutters (clamp(20px, 4vw, 48px)) and a fixed vertical rhythm: every section gets clamp(80px, 9vw, 120px) block padding, which resolves inside the product's 80–128px invariant at desktop. Sections separate with a 1px Hairline top rule — never blank voids, never bands of tint.

The hero splits asymmetrically (1.02fr / 0.98fr, gap clamp(40px, 5vw, 72px)): left-aligned claim block on the left, the convergence station panel on the right — the page refuses the centered SaaS stack. Argument sections alternate emphasis with mirrored grids (0.92fr/1.08fr prose-first, 1.08fr/0.92fr art-first) and one full-width argument; the transport net runs the full container. Pricing is three equal columns separated by Hairline column rules (not cards); the trust band is a three-column list; the footer is a deep-ink band with a 1.4fr/1fr/1fr/1fr grid. Sticky navigation is a 64px-min hairline-bordered bar carrying wordmark, section links, and the persistent primary CTA.

Two collapse points: at 1020px all multi-column grids stack to one column, pricing tiers switch from column rules to top rules, and the trust band stacks; at 760px nav links hide (wordmark + CTA remain), stations stack, and table cells wrap.

### Named Rules
**The Rhythm Rule.** Section vertical padding is clamp(80px, 9vw, 120px) — at desktop width it must resolve within 80–128px. Sections are separated by the Hairline rule, not by extra padding.

**The Persistent Sheet Rule.** The sticky hairline top nav is present at load and on scroll and always carries the wordmark plus the single primary CTA ("Install the extension"), rendered as the same button component everywhere it appears. One primary action per surface; at most one secondary (a text link).

## Elevation & Depth

This is a flat, ruled sheet: depth comes from hairlines, from the paper/ink value step between ground (`ink-0`), panel (`ink-1`), and card (white), and from the footer's deep-ink band — not from shadow. Shadows exist only as low-alpha rests derived from deepest ink, holding raised paper panels (demo station, trace blocks, transport figure) barely off the sheet; the primary button alone earns a cobalt-tinted rest. Nothing floats, nothing blurs, nothing glows.

### Shadow Vocabulary
- **Panel Rest** (`box-shadow: 0 1px 2px rgba(14, 18, 26, 0.06), 0 10px 28px rgba(14, 18, 26, 0.09)`): the only panel shadow — demo station, trace blocks, transport figure.
- **Inked Button Rest** (`box-shadow: 0 1px 2px rgba(14, 18, 26, 0.18), 0 6px 18px rgba(0, 71, 171, 0.22)`): under the primary button only; cobalt-tinted, sits with 1px rise on hover rather than lifting.

### Named Rules
**The Subordinate Shadow Rule.** Hairlines structure; shadows merely rest. A shadow may appear only under a raised paper panel or the primary button, always low-alpha and always derived from a token's RGB. Elevation never substitutes for a rule, a mark, or a state change.

## Shapes

The form language is the drafting sheet's: small radii (2–6px) that take the sting off paper corners without rounding the world soft — focus outlines and the featured tier at 2px, inline code at 3px, station cards and pending notes at 4px, buttons at 5px, raised panels (demo station, traces, net figure) at 6px. Edges are otherwise hairlines: 1px `ink-2` for standard rules, 1px `ink-3` where the rule is load-bearing.

Recurring drawn geometry: station points are small filled ink dots (≈3.5–5px radius) with the resolved hub a larger cobalt dot; baselines are 1px ink hairlines (dashed 3/4 for ambient links) while convergence lines are 1.25px cobalt and may draw themselves in; the plus-mark (a 1.5px cobalt cross, 9px in lists) is the system's "kept/true" glyph and repeats from merged cells to tier bullets; the pending state is a dashed 1px ink-3 outline; the featured tier is an inset 1.5px cobalt outline on white — an outline, never a tinted fill.

## Components

### Buttons
Instrument-grade and single: one primary component, no secondary button.
- **Shape:** softly squared paper corner (5px radius).
- **Primary:** cobalt ground, white label, Inter 700 at 1rem (−0.008em), padding 13px 22px, Inked Button Rest shadow.
- **Nav variant:** same component at 0.9rem with 9px 16px padding — the persistent CTA.
- **Hover / Focus:** ground steps to Cobalt Deep with a 1px rise (160ms, cubic-bezier(0.16, 1, 0.3, 1)); active settles back; focus-visible draws the standard 2px cobalt outline at 2px offset.
- **Secondary:** never a button — a cobalt text link with a right arrow that translates 3px on hover (same 160ms easing).

### Chips
Only one chip exists: inline code — mono at 0.86em on Faded Panel, 3px radius, 0.08em/0.36em padding, deepest-ink text. It is a quoted machine line, not a badge; pill badges are banned.

### Cards / Containers
Paper laid on the ruled sheet.
- **Corner Style:** 6px (raised panels), 4px (station cards inside them).
- **Background:** white cards on Faded Panel (`ink-1`) or directly on Survey Paper; the demo station is Faded Panel with a Strong Hairline border.
- **Shadow Strategy:** Panel Rest only on raised panels (see Elevation & Depth); station cards take none.
- **Border:** 1px Strong Hairline on raised panels; 1px Hairline on nested cards and tables.
- **Internal Padding:** 24px (demo station), 20px 22px (trace blocks), 12px 14px (station cards), 22px (net figure).

### Inputs / Fields
Inputs are survey choices, not form fields: radio rows inside station cards (7px 6px, 4px radius) whose hover washes Faded Panel; the radio itself keeps native form with `accent-color: cobalt`; the SQL line beside it is mono; timestamps annotate in Measurement Ink. The pending verdict is a dashed-outline note (1px dashed Strong Hairline, 4px radius, 12px 14px) — the dashed outline is the empty state.

### Navigation
Sticky 64px-min bar on Survey Paper with a Strong Hairline bottom rule. Left: wordmark (Inter 800, 1.12rem, −0.02em) with the cobalt triangulation mark. Right of links: primary CTA. Section links are Annotation Ink at 0.95rem/600, going cobalt + underline on hover. Below 760px links hide; wordmark and CTA persist. Footer navigation is the inverted register: deep Heading Ink band, Cobalt-on-Dark links going white on hover, small-caps Inter column heads.

### The Convergence Station (signature)
The page's memorable instrument: two replica station cards (mono caps legends, radio write-rows), a cobalt triangulation net whose convergence lines draw in over 900ms, and a verdict box that stays a dashed pending note until both stations are plotted — then settles (320ms) into the one merged row: a white hairline table whose kept cells carry the cobalt plus-mark, with superseded writes retained below as ink-cross history lines and a mono merge note. State lives entirely in these drawn marks.

### Measurement Caption (signature)
Every figure, trace, and table ends with a mono caption at 0.76rem (0.03em) in Measurement Ink stating what was measured and on what fixture. Provenance captions are part of the world's credibility, not fine print to skip.

## Do's and Don'ts

### Do:
- **Do** draw state as marks: kept = cobalt plus-mark, superseded = ink cross, pending = dashed ink-3 outline, featured = 1.5px cobalt inset outline.
- **Do** caption every trace, table, and figure with a mono measurement line (0.76rem, 0.03em, Measurement Ink).
- **Do** separate sections, tiers, and table cells with 1px hairlines (ink-2 standard, ink-3 load-bearing).
- **Do** set all comparable numerals tabular (`tnum`): code, traces, measurements, chart labels, prices.
- **Do** keep the sticky hairline nav and its single primary CTA on every surface, and end documents on the deep-ink footer band signing the sheet.
- **Do** derive any alpha overlay (ruling, shadow, tint) from a token's own RGB — deepest ink for ink washes.

### Don't:
- **Don't** introduce a second saturated hue; cobalt is the only one, and Cobalt Deep/Cobalt-on-Dark are its only companions.
- **Don't** signal state with hue or fill swaps — that is the one move this world forbids.
- **Don't** set any heading, label, or prose in a face other than Inter, or use mono outside code, SQL, traces, hashes, and measurements.
- **Don't** use pill badges, kicker/eyebrow labels, gradient text, glass/blur, floating gradient blobs, all-centered stacks, hard offset shadows, or decorative section numbers.
- **Don't** remove, blur, or restyle the 36px ruled drafting ground — it is the sheet's material, not a background choice.
- **Don't** add a second primary button or a shadow that structures; the single cobalt CTA and the hairline carry the page.

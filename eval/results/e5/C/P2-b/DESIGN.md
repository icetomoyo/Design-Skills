---
name: 五度圈 · 一条规则推完十二个调
description: A cloth-bound chart book of key signatures, whose front matter is a computing wheel.
colors:
  bookcloth: "#16302B"
  bookcloth-raised: "#1D3A33"
  bookcloth-deep: "#0C1D19"
  foil: "#C9A44C"
  foil-dim: "#8A6F31"
  foil-on-paper: "#6B4E10"
  paper: "#F1F2EC"
  paper-shade: "#E7E9E0"
  paper-rule: "#DCDED2"
  toner: "#14181A"
  toner-secondary: "#4C5457"
  toner-tertiary: "#5F6769"
  steel: "#9AA0A0"
  steel-light: "#C4C8C6"
  cloth-ink: "#B9BFA9"
  tab-rest: "#C3C8B6"
  tab-hover: "#26483F"
  tab-active-ink: "#20260F"
  scroll-thumb: "#3A5A4E"
  leaf-current: "#E4E6D9"
  colophon-ink: "#A9B0A0"
  pressed-hover: "#252B2D"
typography:
  display:
    fontFamily: "Bahnschrift SemiCondensed, Bahnschrift, Franklin Gothic Medium, STSong, SimSun, Segoe UI Symbol, serif"
    fontSize: "clamp(2.1rem, 4.2vw, 3rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.02em"
  headline:
    fontFamily: "Bahnschrift, STSong, SimSun, Segoe UI Symbol, serif"
    fontSize: "clamp(1.45rem, 2.3vw, 1.9rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  chart-key:
    fontFamily: "Bahnschrift SemiCondensed, Bahnschrift, STSong, SimSun, serif"
    fontSize: "clamp(2rem, 3.4vw, 2.6rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Bahnschrift, STSong, SimSun, serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.2
  body:
    fontFamily: "Sitka Text, Cambria, STSong, SimSun, Segoe UI Symbol, serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.85
  label:
    fontFamily: "Bahnschrift, Franklin Gothic Medium, Microsoft YaHei, Segoe UI Symbol, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.4
  small:
    fontFamily: "Bahnschrift, Microsoft YaHei, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  micro:
    fontFamily: "Bahnschrift, Microsoft YaHei, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.4
  tag:
    fontFamily: "Bahnschrift, Microsoft YaHei, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.35
  data:
    fontFamily: "Cascadia Mono, Consolas, Lucida Console, Segoe UI Symbol, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.2
  data-mini:
    fontFamily: "Cascadia Mono, Consolas, Lucida Console, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.2
  tag-text:
    fontFamily: "Bahnschrift, Microsoft YaHei, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1
  strip:
    fontFamily: "Bahnschrift, Microsoft YaHei, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.3
  display-mobile:
    fontFamily: "Bahnschrift SemiCondensed, Bahnschrift, STSong, SimSun, serif"
    fontSize: "1.85rem"
    fontWeight: 600
    lineHeight: 1
rounded:
  sheet: "0px"
  mark: "2px"
  coil: "50%"
  thumb: "6px"
spacing:
  s1: "6px"
  s2: "10px"
  s3: "16px"
  s4: "24px"
  s5: "36px"
  s6: "56px"
  s7: "84px"
components:
  wheel-position:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.toner}"
    rounded: "{rounded.mark}"
    typography: "{typography.label}"
    padding: "0"
  wheel-position-active:
    backgroundColor: "{colors.toner}"
    textColor: "{colors.paper}"
  fore-edge-tab:
    backgroundColor: "{colors.bookcloth-raised}"
    textColor: "{colors.tab-rest}"
    typography: "{typography.tag-text}"
    padding: "0 5px"
  fore-edge-tab-active:
    backgroundColor: "{colors.foil}"
    textColor: "{colors.tab-active-ink}"
  stepper:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.toner}"
    typography: "{typography.small}"
    padding: "0 13px"
  stepper-hover:
    backgroundColor: "{colors.toner}"
    textColor: "{colors.paper}"
---

# Design System: 五度圈

## Overview

**Creative North Star: "The Working Chart Book"**

A player keeps a spiral-bound book of key charts: cloth-covered board, photocopy leaves, a coil down the gutter, index tabs on the fore edge. This page is that book laid open on a dark desk. Everything the reader meets is a piece of the object — the running heads, the folios, the punched edge, the ruled bands, the tab whose length is the accidental count. The wheel is not a diagram above the text; it is the front matter of the book, bound in.

The world owns the frame and serves the column. Cloth and foil hold the masthead, the coil, the tab rail and the section openers; the leaves stay calm paper with a reading measure of 34em, a reading serif, and a printed rule system. Nothing performs behind the prose.

Colour does one job: foil marks "you are here" and nothing else. Every other distinction is drawn — rule weight, ink density, tab length, hatch. The wheel is achromatic on purpose; the subject it explains is not a colour code.

**Key Characteristics:**
- Cloth ground, paper leaves, toner ink; no third material.
- Foil is a position marker, never an accent decoration.
- Distinctions by rule, density and measure — not hue.
- Chart apparatus at every scale: running head, folio, punched edge, index tab.
- Square corners; the only circles belong to hardware (coil, punched holes, marker dot).

## Colors

A two-material palette — bookcloth and paper — with one metallic marker.

### Primary
- **Brass Foil** (#C9A44C): the current position only. The active tab, the marker dot on the wheel rim, the folio rule on the masthead. It never touches body text on paper; on paper it drops to Foil on Paper (#6B4E10) so it can carry a rule at reading contrast.
- **Bookcloth** (#16302B): the page ground and every frame surface. Raised cloth (#1D3A33) for the tab rail, deep cloth (#0C1D19) for the masthead, the coil well, and the punched holes cut through a leaf.

### Neutral
- **Cool Photocopy Paper** (#F1F2EC): every leaf. Shaded paper (#E7E9E0) for worked-example blocks and the second leaf's ground; paper rule (#DCDED2) for the unlit arc segments.
- **Toner** (#14181A): text, hairlines, staff lines. Secondary toner (#4C5457) for supporting prose and `dd` values; tertiary (#5F6769) for labels and captions — the lightest ink allowed on paper.
- **Steel** (#9AA0A0) for coil rings, alternating with steel light (#C4C8C6) so the coil reads as hardware rather than as a border.

### Named Rules
**The Foil-Is-a-Place Rule.** Foil marks where the reader is. It may fill a tab, dot the wheel rim, or rule the masthead; it may never set a paragraph, a heading, or an icon.

**The Two-Material Rule.** A surface is cloth or it is paper. Nothing else appears — no third panel colour, no tinted overlay, no glass.

## Typography

**Display Font:** Bahnschrift (with Bahnschrift SemiCondensed, Franklin Gothic Medium, then STSong/SimSun for Chinese)
**Body Font:** Sitka Text (with Cambria, then STSong / SimSun for Chinese)
**Label/Mono Font:** Consolas for figures; Microsoft YaHei for Chinese labels

**Character:** A printing-standard grotesque for the apparatus and a screen-reading serif for the prose. Latin pitch names, folios and counts fall to Bahnschrift and Consolas; the Chinese sets in Song. That split is the whole type idea: the machine part of the page is grotesque, the part the reader reads is Song.

### Hierarchy
- **Display** (600, clamp(2.1rem, 4.2vw, 3rem), 1): the masthead title only, in foil.
- **Headline** (600, clamp(1.45rem, 2.3vw, 1.9rem), 1.2): section openers, under a 2.5px rule.
- **Chart Key** (600, clamp(2rem, 3.4vw, 2.6rem), 1): the selected key's letter on the right leaf, with its mode set at 1.0625rem beside it.
- **Body** (400, 1.0625rem, 1.85, measure 34em ≈ 65–75ch): the reading column.
- **Label** (400, .9375rem, 1.4): data values, tab names, chord symbols.
- **Data** (400, 12px / 11px, mono): accidental counts, folios, roman numerals, the run strip.

### Named Rules
**The Two-Script Rule.** Bahnschrift and Consolas carry pitch names, numbers and apparatus; Song carries running text. A Chinese label never takes the grotesque at display size, and a pitch name never takes the Song.

**The Mono-For-Measurement Rule.** Monospace is used for counts, positions, durations and folios — never as a costume for "technical".

## Layout

A 1320px board holds the open book. The first spread is a four-column grid: left leaf `.94fr`, a 46px coil gutter, right leaf `1.06fr`, and a 62px fore-edge tab rail. The reading column inside every later leaf is 34em, centred, with a wider 800px column reserved for the register table.

Leaves carry their own padding — 36px, with 62px on the punched side — so the frame's margin belongs to the frame and the column stays narrow. The rhythm runs 6 / 10 / 16 / 24 / 36 / 56 / 84px; more space above a heading than below it, and a dense passage always followed by a quiet one.

Below 1140px the spread collapses to a single stacked leaf and the coil and tab rail retire — the wheel stays the only key selector. Below 820px the data band, chord band and run strip wrap to a 4-per-row grid; below 460px the wheel drops to 320px with its radii rescaled (123px / 80px) so labels never collide.

## Elevation & Depth

Depth is a leaf resting on cloth, nothing more. Two shadows exist and both are offset and blurred; there is no glow, no halo, no tinted lift.

### Shadow Vocabulary
- **Leaf on cloth** (`0 22px 44px -18px rgba(0,0,0,.62), 0 3px 10px -4px rgba(0,0,0,.34)`): every leaf, including the two in the spread.
- **Masthead seat** (`0 1px 0 rgba(201,164,76,.18) inset`): a single inset foil rule under the title strip, standing in for a stamped edge.

### Named Rules
**The Paper-Has-Weight Rule.** Shadows describe a leaf's distance from the board. They never respond to hover, and no element gains a shadow it did not have at rest.

## Shapes

Square. Leaves, tabs, steppers, bands and the register are all corner-less; a 2px radius exists only to keep a pressed wheel position from looking torn. Circles belong exclusively to hardware: coil rings, punched holes, and the 8px foil marker dot on the wheel rim. Borders are hairlines — 1px at rgba(20,24,26,.14) or .32 — except the 2.5px rule that opens a section and the 1.5px rules that close the staff band and the run strip.

## Components

### The Wheel
The signature component. Twelve major positions on a 380px rim at radius 146px, their relative minors inside at 95px, a centre disc carrying the two rules. Each position is a real `<button>` with `aria-pressed`. The current position inverts to toner with a foil count; a foil dot sits on the rim at that angle. The diatonic set — the six arc segments between the seven fifths of the selected key — turns to 5px toner while every other segment stays 3px hairline-grey at 90ms steps(2). Nothing eases; print is a step.

### The Chart
Right leaf of the spread. Key letter, mode, signature count, a 320-unit staff with a real G-clef glyph and accidentals placed at their engraved line/space steps, the accidental names in order, three data cells, the seven diatonic chords, and a 推法 note. Changing key fires the page's one authored moment: a soft shadow sweeps across the leaf in 440ms and the chart settles in 340ms.

### Fore-edge Tabs
Twelve cloth tabs at the right edge, each carrying the key name and a bar whose length is the accidental count (3px for C, 21px for F♯). The active tab turns foil with dark ink. Retired entirely below 1140px.

### Steppers
Two 40px-tall bordered buttons either side of a mono read-out. Hover inverts to toner. The read-out is the `aria-live` region announcing the new key.

### Register
A ruled table of all twelve positions: key, count, the accidentals in order, relative minor, seven chords. Rows are focusable and selectable; the current row is tinted leaf-current.

## Do's and Don'ts

### Do:
- **Do** keep foil to the current position: tab, rim dot, masthead rule.
- **Do** draw every difference with rule weight or ink density before reaching for a hue.
- **Do** set Chinese running text in Song and apparatus in Bahnschrift.
- **Do** give each leaf its punched edge and its running head; the object must stay legible as a book at every scroll position.
- **Do** keep the reading measure at 34em so the column never widens past 75 characters.

### Don't:
- **Don't** colour the wheel, the staff, or any chord by key. The page has no colour-coded keys, by design.
- **Don't** round a leaf, a tab or a band.
- **Don't** put a label above a heading; the numbered opener rule and the heading carry the structure.
- **Don't** animate a hover, an arc, or a tab — motion is reserved for the leaf turn.
- **Don't** use the grotesque for running Chinese prose or the Song for counts.

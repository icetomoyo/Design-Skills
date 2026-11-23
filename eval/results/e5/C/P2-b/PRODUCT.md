# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: single self-contained HTML file (inline CSS + inline JS, zero external requests). Chosen because the brief constrains the deliverable to one file and the runtime forbids npm/network/browser tooling.

## Users

*Inferred from the brief — no interview was possible (no answer mechanism in this session; see README).*
Students and self-taught musicians who can already name key signatures and count intervals by hand, and who keep hitting the same wall: memorising thirty key signatures as thirty unrelated facts. They arrive with a specific question ("why does adding a sharp move me up a fifth?"), usually with an instrument or a laptop at hand, often in the middle of practising rather than in a classroom.

## Product Purpose

A single page that teaches the circle of fifths as one mechanism instead of a diagram to memorise. Success is a reader who can derive the next key, its accidentals, and its relative minor from the circle without consulting a table.

## Positioning

Most circle-of-fifths pages present the finished wheel and a paragraph of explanation. This one stays on the derivation: every ring on the wheel is generated from the same single rule (add a fifth, gain a sharp), and the reader can step the rule by hand and watch the rings follow.

## Operating Context

Read on a laptop at a desk, and on a phone in a practice room. Frequently consulted mid-practice, in short bursts, with a real instrument nearby. The reader may already have a chart open elsewhere and needs the explanation the chart does not give.

## Capabilities and Constraints

- One HTML file, no build step, no network, no external fonts, scripts, or images.
- Must work with JavaScript disabled for the core explanatory content; the interactive derivation is an enhancement.
- Keyboard reachable; the wheel's rings must be readable by a screen reader as text, not as an unlabelled SVG.
- Music facts must be correct: enharmonic spellings, relative minors, and accidental counts all verified against standard theory.

## Evidence on Hand

No supplied assets, imagery, or brand material. All diagrams are authored SVG; all text is written for this page.

## Product Principles

- One mechanism, shown working, beats thirty memorised facts.
- Every claim about the circle should be steppable and checkable on the page.
- The instrument is the reader's, not the page's: nothing on the page competes with the sound they are making.

## Accessibility & Inclusion

Body text at 4.5:1 or better; the wheel's information duplicated as a real table so it survives without colour and without SVG.

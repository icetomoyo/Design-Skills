# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: static HTML/CSS single page (eval constraint: no npm install, no network, no browser; deliverable is a static folder)

## Users

[ASSUMED from brief] App developers (indie to mid-size teams) building local-first or offline-capable products on SQLite — Electron/desktop, iOS/Android, Flutter or embedded apps. Their job: ship sync without writing and operating a sync server or per-field conflict logic. Secondary: architects evaluating local-first infrastructure.

## Product Purpose

[ASSUMED from brief, invented example product] "Concord" is a local-first SQLite sync engine: an embeddable extension/library that keeps SQLite databases converged across devices. Writes happen locally with normal SQL; the engine replicates and merges changes conflict-free. Success = the developer deletes their sync server code and ships offline-first.

## Positioning

Column-level CRDT merge inside SQLite itself: two devices can edit the same row offline and both writes survive — converging deterministically, no central authority, over any transport. Neighboring products (server-mediated sync, cloud-hosted replicas) cannot truthfully claim "no server in the write path".

## Operating Context

Developers embed via SQLite extension or language bindings; keep their existing schema (add per-table tracking); sync over WebSocket, P2P, or any byte transport; test convergence with deterministic fixtures. Evaluation happens in a terminal/editor world: migrations, `EXPLAIN` plans, CI.

## Capabilities and Constraints

- Confirmed by brief: landing page needs hero (one-line value + primary CTA), three feature argument sections, pricing table, footer.
- [ASSUMED/invented example, demonstration only] capabilities dramatized on the page: offline writes, conflict-free column merge, any-transport replication, deterministic convergence. These are the fictional product's premise from the brief, not verified claims.
- Binding brand contract: low-saturation ink neutral ramp + cobalt blue accent + Inter for body text. Zero deviation tolerated (CHK-02).
- Page invariants: top navigation and primary CTA must persist; section rhythm 80–128px.

## Brand Commitments

- Neutral ramp: low-saturation "ink" grays (cool-tinted neutrals, not warm).
- Accent: cobalt blue, used sparingly for the single primary action and key data emphasis.
- Body typeface: Inter.
- Voice: precise, engineering-credible; hype words (赋能/无缝/革命性, "seamless/revolutionary") banned by brief.

## Evidence on Hand

None real: this is an example product for a design task. All copy, pricing tiers, and repository links are authored demonstration material; nothing on the page may present invented customers, benchmarks, or ratings as fact. Placeholder repo link documented in README.

## Product Principles

1. Show the mechanism, not adjectives: demonstrate a real merge, not "seamless sync".
2. One primary action: try/install; at most one secondary.
3. Credibility from technical precision (real-looking SQL, schemas, convergence traces), never social proof theater.
4. Respect developer reading habits: scannable argument sections, honest pricing, no dark patterns.
5. The brand contract (ink ramp, cobalt, Inter) binds every pixel.

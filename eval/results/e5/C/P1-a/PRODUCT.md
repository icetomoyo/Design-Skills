# Product

<!-- impeccable:product-schema 1 -->

> Init substitution: this run is an unattended subagent lane (single-sentence brief, no
> interview channel). Every fact below is inferred from the explicit brief and the run's
> environment rules, and labeled as such. File kept lane-scoped
> (`eval/results/e5/C/P1-a/PRODUCT.md`) to avoid cross-lane write conflicts instead of the
> repo root `impeccable context` resolved.

## Platform

web

## Stack

static single-file HTML — inline CSS/JS, zero external requests; pinned by the run's
environment rule (self-contained deliverable), not a user choice. No build step.

## Users

[Inferred] Chinese-reading adults and students who meet "马尔可夫链" for the first time or
want to consolidate a partial understanding; arriving via link, desktop or phone, a few
minutes of attention, no assumed probability background beyond basic percentages.

## Product Purpose

One page that explains what a Markov chain is — states, transition probabilities,
memorylessness, and where such chains lead — well enough that the reader leaves with an
accurate, usable mental model. Success: the reader can explain "the next step depends only
on where you are now" to someone else.

## Positioning

The page teaches by showing the mechanism doing its job on screen (live transition
diagram, steppable simulation) rather than prose around static formulas; every number on
the page is computed from a real transition matrix in the file.

## Operating Context

Static hosting / local file open; offline-capable; no network at view time; desktop and
mobile viewports.

## Capabilities and Constraints

- Self-contained: all CSS/JS inline in one HTML file; zero external requests.
- Fonts must be system stacks (no webfont downloads).
- All examples are illustrative/synthetic mathematics, labeled as examples.
- No commercial or factual claims; pure educational content.

## Evidence on Hand

None. All content is authored from standard textbook mathematics (Markov property,
stationary distribution, classic examples: weather states, board-game walk, random
surfer). No real-world data claims.

## Product Principles

1. Demonstrate, don't assert — the mechanism on screen is the argument.
2. One idea per passage, in reading order: state → transition → probability →
   memorylessness → long-run distribution.
3. Mathematically honest: displayed numbers are computed, not decorated.
4. Copy in Chinese (the brief's language).

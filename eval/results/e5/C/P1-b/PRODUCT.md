# Product

<!-- impeccable:product-schema 1 -->

<!-- Init substitution disclosure: this record was written by a sub-agent from a
one-line brief ("做一个网页，讲马尔可夫链。"). No structured question tool and no
decision-page mechanism exists in this run, and the dispatching brief explicitly
directs full self-inference of audience/layout/style/components. Every fact
below marked 「推断」 is an inference from the brief and standard textbook
material, not a confirmed user answer. -->

## Platform

web

## Stack

delegated: static single-file HTML/CSS/JS — fixed by the environment rule for
this deliverable: fully self-contained, all CSS/JS inline, zero external
requests (no CDN fonts, no images, no libraries), opens offline from file://.

## Users

推断 Primary users: curious readers meeting Markov chains for the first time —
students, self-learners, engineers from adjacent fields. Situation: reading
alone, on a laptop or phone, likely referred by a course, article, or their own
curiosity about "where do probabilities go in the long run".

## Product Purpose

推断 A single-page interactive explainer that teaches what a Markov chain is
and why it matters: states, transition probabilities, the memoryless
(markov/no-aftereffect) property, transition matrices, and convergence to a
stationary distribution. Success = a reader who arrives knowing only the name
leaves able to explain the memoryless property, read a transition matrix, and
predict long-run behavior.

## Positioning

推断 Mechanism: the reader doesn't just read about randomness — they walk the
chain themselves and watch the long-run frequencies settle, so the stationary
distribution becomes something seen, not memorized.

## Operating Context

推断 Read as a standalone article-page, offline, in a modern browser. Chinese
language throughout (brief is Chinese). No server, no build step, no analytics.

## Capabilities and Constraints

- 环境规则（confirmed）：one self-contained HTML file; all CSS/JS inline; zero
  external requests; delivered at eval/results/e5/C/P1-b/index.html.
- 推断 Content scope: discrete-time, finite-state Markov chains only. Include:
  definition & memorylessness, a small concrete example (weather-style),
  transition matrix, simulation/walking interaction, stationary distribution
  (empirical convergence), and a short note on real applications and limits
  (e.g. i.i.d. has no memory; state space must be finite here).
- 无网络、无浏览器、无 npm install（confirmed by environment rules）— visual
  verification uses static/local means only; whatever cannot be verified live
  is declared in README.

## Evidence on Hand

None beyond standard textbook mathematics (public knowledge): two-state weather
example, transition matrix notation, stationary distribution via eigenvector /
power iteration. No proprietary data, no testimonials — nothing fabricated.

## Product Principles

- 先看见，再记号：every abstraction (matrix, π) arrives after the reader has
  seen the phenomenon it names. 推断
- 一个核心交互做透：one deep simulation beats six shallow widgets. 推断
- 数学诚实：numbers shown are actually computed in-page, not hardcoded. 推断

## Accessibility & Inclusion

推断 Standard: semantic headings, sufficient contrast, keyboard-operable
controls, prefers-reduced-motion respected.

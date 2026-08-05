# Task: V20.1 — Coherent Globe-Facing Views + Eye-Guided Global Sequence

## Question/task as given

One-shot execution prompt (`CLAUDE-V20-1-ONE-SHOT-EXECUTION-PROMPT.md`,
uploaded with a `V201ONESHOTCLAUDECODEPACKAGE.zip`) instructing a single,
non-stop correction pass: fix v20's rejected geographic presentation model
(Asia/Australia overlapping Africa/Europe on one flat, rotated SVG surface) by
implementing pre-authored coherent globe-facing SVG views, in one execution,
with full evidence and reports, producing
`Problem-v86-nav-logo-simplified-signin-continuous-hand-20-1-coherent-global-earth-views.html`.
Do not overwrite v19.1 or v20. Do not start v21.

This note is self-contained; it does not supersede any prior ai-notes entry.
Prior related entries: `2026-08-04-v19-1-eye-earth-transition-correction.md`,
`2026-08-04-v20-world-style-global-future-earth.md`.

## Answer / what was done

Built v20.1 from the **v19.1 baseline** (not v20 — v20's flawed continent
architecture was discarded, not patched). Replaced the single flat
`.lhmz-story-earth-continents` group with three mutually-exclusive,
independently opacity-controlled sub-groups:

- View A (`#lhmzEarthViewAfricaEurope`) — Africa/Europe/Americas, byte-identical
  to v19.1's existing continent paths. Also the final settled Atlantic view.
- View B (`#lhmzEarthViewAsiaPacific`) — newly authored Asia + Australia paths,
  validated self-intersection-free, inside core radius 53.4, zero overlap with
  each other.
- View D (`#lhmzEarthViewAmericas`) — reuses View A's America path data under
  new ids.

A new independent `globeSequenceProgress` progress key (factor `0.02200`,
`0.003` threshold, decoupled from the approved v19.1 `holdT` arrival timeline)
drives group-level crossfade `bell()` windows plus 6 per-continent emphasis
`bell()` windows, producing the required order: Africa → Asia → Australia →
Europe → North America → South America → calm Atlantic return. No rotation
transform is used on any view group — hemisphere change is expressed purely
by which group is opacity-dominant.

One real bug was found and fixed during the build: an earlier window
configuration crossfaded away from Africa before `holdOrbReveal` (the
unchanged v19.1 arrival-timeline gate controlling overall Earth visibility)
had made the globe visible in real time, so Africa's dominant moment was
nearly invisible. Fixed by shifting all `sequenceT` window boundaries later
and raising the factor to `0.02200`; re-verified via a real-flow Playwright
trace that Africa now gets a clean, fully-dominant moment (viewA=0.999,
africa=0.995 at t=831ms) and total tour duration stays within the required
4.0-5.5s band (measured 4.29-4.73s across 3 runs).

Verdict: **`V20_1_READY_FOR_INDEPENDENT_AUDIT`**.

Full detail, geometry metrics, sequence/eye-gaze traces, and frozen-scope
proof are in `V20-1-COHERENT-GLOBAL-EARTH-VIEWS-REPORT.md` and
`V20-to-V20-1-EXACT-DIFF-REPORT.md` (both in the repo root, delivered
alongside this note).

## Key files delivered

- `Problem-v86-nav-logo-simplified-signin-continuous-hand-20-1-coherent-global-earth-views.html`
- `V20-1-COHERENT-GLOBAL-EARTH-VIEWS-REPORT.md`
- `V20-to-V20-1-EXACT-DIFF-REPORT.md`
- `V20-1-GLOBE-VIEW-METRICS.json`
- `V20-1-NORMAL-SPEED-LIFECYCLE-TRACE.json`
- `V20-1-SEQUENCE-BOARD.png`, `V20-1-FINAL-HOLD-ENGLISH.png`,
  `V20-1-FINAL-HOLD-ARABIC.png`, 6x `V20-1-SEQUENCE-*.png`,
  `V20-1-GLOBE-VIEW-TRANSITION-STRIP.png`, plus 3 additional runtime-viewport
  captures (900x900 EN, mobile DPR2 EN/AR).
- `V20-1-FINAL-DELIVERY-PACKAGE.zip` (all of the above, packaged)

v19.1 (SHA-256 `809754b2...d429a7`) and v20 (SHA-256 `cdb1cec6...5d38a88`) were
verified unchanged at every checkpoint and remain unmodified.

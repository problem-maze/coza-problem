# Visible Eye — Isolated Home Integration Correction 01A

Continues the lineage from the mechanical-focus prototypes 01–05 and
Isolated Home Integration Test 01 (see the 2026-08-03-dated notes for
those). Supersedes nothing — this is a corrective pass over Integration 01,
which remains untouched and byte-identical.

## Task

Perform a narrow corrective pass on the completed Isolated Home Integration
Test 01: restore the approved Lunar-White visual environment around the
integrated eye (it had been rendering as a fully transparent SVG directly
on Home's dark hero background), while preserving every working system
from Integration 01 unchanged — root placement, test-only activation, the
namespace protections, the state bridge, `VisibleEyeLife`, reduced motion,
lifecycle stability, and Journey/legacy-eye preservation. Deliver
`Problem-v86-VISIBLE-EYE-ISOLATED-INTEGRATION-01A.html`,
`VISIBLE-EYE-HOME-INTEGRATION-01A-NOTE.md`, a machine-readable verification
report, and a handoff package. Explicitly forbidden: modifying Integration
01, Prototype 05, production, or any earlier prototype; creating
Integration 02 or Prototype 06; starting a production plan or a
physical-device test.

## What was done

1. Reused Integration 01's proven assembler script unchanged except for one
   addition: two plain `<rect>` elements (`.veye-env-bg` / `.veye-env-surface`)
   inserted as the first children inside the SVG itself, using Prototype
   05's own `--bg`/`--surface` CSS custom properties (`#FAFBFD`/`#FFFFFF`)
   via `fill="var(--bg)"` / `fill="var(--surface)"` — not new colors, and
   confined entirely to the SVG's own viewBox, so they can never leak
   outside `#visibleMechanicalEyeIntegrationRoot`.
2. Measured Prototype 05's actual rendered content bbox
   (`svg.getBBox()` = `x:-726..726, y:-410..410`) against its viewBox
   (`-760 -440 1520 880`) before choosing rect dimensions, confirming the
   viewBox itself is already a tightly-fitted frame around the artwork
   (~30-34 unit margin) — so filling it with the new plate reproduces that
   same margin instead of introducing an oversized card.
3. Ran a full Playwright verification+capture suite
   (`verify_01A.js`, scratchpad-only) and, via direct diagnostics, found
   and fixed two capture-methodology issues (not markup defects):
   - An early screenshot (~500ms after activation) showed the new plate as
     gray instead of white; `getComputedStyle` at that instant already
     showed the correct fill/opacity, proving it was a stale compositor
     frame in the headless/software-GL sandbox, not incorrect CSS. Fixed
     by waiting longer plus two `requestAnimationFrame` ticks.
   - A "console warning introduced" and an "overlap with Home text"
     reading both turned out to be timing artifacts: the font-preload and
     software-WebGL warnings appear identically on vanilla, unmodified
     production once held open equally long; the overlap was Home's own
     `.hi-panel` auto-rotating insight-card carousel caught mid-fade
     (independent of the eye). Both were confirmed via direct side-by-side
     checks against production/settled state, then the wait logic was
     corrected (wait for `.hero-page-dark` to clear, then for `.hi-panel`'s
     own opacity to settle) rather than suppressing the finding.
4. Visually confirmed a small pre-existing Home layout artifact (a floating
   icon+glow overlapping the "what others" headline) appears identically
   on the default/no-flag screenshot (untouched legacy eye) — proving it
   predates and is unrelated to this correction — and left it untouched
   per the task's Home-layout constraint.

## Result

- Production, Prototype 05, and Integration 01 file hashes all confirmed
  unchanged (`c2b62cc9...`, `2e35daad...`, `b131aefb...` respectively).
- New Integration 01A hash: `baef1c8d1ab7f36a816284c63e519f5832213449549137a87c53612693834245`,
  3,099,844 bytes.
- 0 duplicate ids, 0 new console errors introduced, 0 new console warnings
  introduced (both apparent "new" warnings confirmed pre-existing on
  vanilla production via a direct timing-matched check).
- Environment colors verified via `getComputedStyle`:
  `rgb(250, 251, 253)` (`#FAFBFD`) and `rgb(255, 255, 255)` (`#FFFFFF`) —
  matching Prototype 05's own approved values exactly.
- All 4 required viewports (390×844, 412×915, 768×1024, 1440×900): no
  clipping, no horizontal overflow, no overlap with Home text/controls,
  exactly one active `.hero-v`.
- All 6 semantic states map correctly via the real
  `window.setHeroQaStage` source.
- Lifecycle stable across 3× page navigation and 3× tab-visibility
  toggling; reduced motion correct.
- Visual result confirmed directly by eye: the desktop and mobile
  screenshots show the complete almond, focus core, chamber rings, left
  input, right bridge, and Morning Wine signal path all clearly legible
  against a tightly-fitted Lunar-White plate — not an oversized card, not
  an iframe-like paste-over.

## Deliverables

`Problem-v86-VISIBLE-EYE-ISOLATED-INTEGRATION-01A.html`,
`VISIBLE-EYE-HOME-INTEGRATION-01A-NOTE.md`,
`VISIBLE-EYE-HOME-INTEGRATION-01A-VERIFICATION-REPORT.json`,
`VISIBLE-EYE-HOME-INTEGRATION-01A-default-no-flag.png`,
`VISIBLE-EYE-HOME-INTEGRATION-01A-desktop.png`,
`VISIBLE-EYE-HOME-INTEGRATION-01A-mobile-390x844.png`,
`VISIBLE-EYE-HOME-INTEGRATION-01A-close-eye.png`,
`VISIBLE-EYE-HOME-INTEGRATION-01A-original-vs-corrected.png`,
`VISIBLE-EYE-HOME-INTEGRATION-01A-states-strip.png`,
`VISIBLE-EYE-HOME-INTEGRATION-01A-state-{watching,searching,found,solved,embodied,idle}.png`,
plus `VISIBLE-EYE-HOME-INTEGRATION-01A-HANDOFF/` and its `.zip`.

## Scope note

This is a corrective pass only. Integration 01, Prototype 05, and
production all remain untouched (hash-verified). No Integration 02, no
Prototype 06, no production plan, no physical-device test.

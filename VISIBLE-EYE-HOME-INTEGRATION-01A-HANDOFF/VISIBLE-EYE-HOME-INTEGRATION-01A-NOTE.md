# Isolated Home Integration — Correction 01A

This is a **narrow corrective pass** over Isolated Home Integration Test 01,
not a redesign. Integration 01 (`Problem-v86-VISIBLE-EYE-ISOLATED-INTEGRATION-01.html`)
is the protected structural baseline and was not modified — its SHA-256 is
identical before and after this task (see below). This correction fixes
exactly one problem: the integrated eye's approved Lunar-White visual
environment was missing, so it rendered as a fully transparent SVG directly
on Home's dark hero background, making the graphite architecture, white
plates, and Morning Wine signal path hard to read.

## What stayed exactly as it was (Integration 01, unchanged)

Every one of these was carried over from Integration 01 with zero changes,
per the task's explicit "preserve" list:

- Root placement as a sibling inside `.hero-visual-wrap` (the off-by-one fix
  from Integration 01 that made the root a child of `.hero-vperson` instead
  of a proper sibling — already corrected there, untouched here).
- `#visibleMechanicalEyeIntegrationRoot` as the single dedicated root id.
- Test-only activation: inert unless the page URL contains
  `?visibleEyeTest=1` (checked from `location.search` only — never written
  to localStorage/sessionStorage/cookies).
- Zero runtime JavaScript side effects without the flag (confirmed:
  `VisibleEyeLife`, `setVisibleEyeState`, and the bridge are all
  `"undefined"` on `window` when the flag is absent).
- The namespace-scoping approach: every class-based Prototype 05 selector
  prefixed with `#visibleMechanicalEyeIntegrationRoot`.
- Zero duplicate ids (verified fresh in this pass, both with and without
  the flag).
- All six semantic-state mappings (`qa-watching → watching`, etc.).
- The `MutationObserver` bridge on `#heroEyeSvg`'s `class` attribute,
  forwarding to `setVisibleEyeState` — unmodified.
- `VisibleEyeLife` (the motion-gating engine) — reproduced verbatim, same
  as Integration 01.
- Reduced-motion behavior.
- Page-navigation and tab-visibility lifecycle stability.
- Journey and the legacy dark eye remaining in the DOM, suppressed (not
  deleted) and fully restorable.
- The responsive host-slot placement (same `.hero-visual-wrap` slot, same
  sizing breakpoints).

## What changed: the scoped Lunar-White visual environment

Two plain `<rect>` elements were added as the **first children inside the
SVG itself** — before `<defs>`, before `#eyeAssembly`, before anything else
— so every existing element in Prototype 05's artwork still paints on top
of them, unchanged:

```html
<rect class="veye-env-bg" x="-760" y="-440" width="1520" height="880" rx="32" fill="var(--bg)"/>
<rect class="veye-env-surface" x="-736" y="-416" width="1472" height="832" rx="26" fill="var(--surface)"/>
```

Why this approach:

- **Colors are not new.** `fill="var(--bg)"` and `fill="var(--surface)"`
  resolve to Prototype 05's own `--bg:#FAFBFD` / `--surface:#FFFFFF` custom
  properties, already defined on `svg.mech-eye` and used nowhere else by
  us. Verified via `getComputedStyle` at runtime:
  `environmentBgFill: "rgb(250, 251, 253)"` (`#FAFBFD`) and
  `environmentSurfaceFill: "rgb(255, 255, 255)"` (`#FFFFFF`) at every tested
  viewport.
- **Cannot leak outside the integration root.** These are SVG shapes
  confined entirely inside `svg.mech-eye`'s own viewBox coordinate space —
  there is no separate CSS rule for `.veye-env-bg`/`.veye-env-surface`
  anywhere in the file (confirmed via grep: the only two occurrences of
  either class are the two `<rect>` tags themselves). Nothing to scope,
  nothing that can leak.
- **No large unexplained white card.** The plate is sized to the artwork's
  own viewBox (`-760 -440 1520 880`), not an arbitrarily larger box.
  Measured directly against Prototype 05's real rendered content
  (`svg.getBBox()`): the true artwork content spans `x:-726..726,
  y:-410..410` — a symmetric ~30-34-unit margin inside that exact viewBox.
  In other words, the viewBox was already a tightly-fitted frame around the
  artwork; drawing the plate to fill it reproduces that same margin rather
  than introducing a new, larger one. The inner "surface" rect is inset a
  further ~24-26 units from the outer "environment" rect, producing a
  subtle two-tone bezel (a thin `--bg`-colored margin around a `--surface`
  panel) that mirrors Prototype 05's own standalone demo relationship
  between its page background and its `.stage` card — just implemented as
  SVG shapes instead of page-level HTML/CSS, so it can never touch Home's
  own background.
- **Home's background, text, nav, cards, and the dark eye are untouched.**
  No CSS rule outside the two inline `fill` attributes on these two rects
  was added or changed for this correction.

Every other line of Prototype 05's CSS/SVG inside the integration — ring
geometry, focus core, optical chamber, left input, right bridge, red
signal path, state classes, gradients, motion amplitudes — is byte-for-byte
what Integration 01 already had.

## Two rendering artifacts found and corrected in the verification harness (not in the markup)

Both were root-caused with direct diagnostic scripts before being written
off as "fine" — neither required any change to the integration file itself:

1. **A screenshot taken too early mid-paint.** A first capture at ~500ms
   after activation showed the new plate as a dull gray instead of white.
   Direct `getComputedStyle` inspection at that same instant showed
   `opacity: 1` and the correct `fill` on every element in the ancestor
   chain — the DOM/CSS were already fully correct. Waiting longer (and
   forcing two `requestAnimationFrame` ticks) produced the correct,
   intended appearance. This was a headless/software-GL compositor timing
   quirk in the verification sandbox, not a markup or CSS defect.
2. **A false "overlap with Home text" reading.** The first full responsive
   pass flagged `.hi-panel` (Home's own auto-rotating "insight card"
   carousel, unrelated to the eye) as overlapping the eye's bounding box at
   390×844/412×915/768×1024. Investigation showed `.hi-panel` fades in/out
   on its own schedule, independent of the eye; the flagged instant caught
   it mid-fade (`opacity` between 0 and 1) at a transient position. Waiting
   for its own opacity to reach ≥0.95 (in addition to waiting for Home's
   `.hero-page-dark` boot-reveal class to clear) resolved this: the actual,
   settled measurement shows `overlapWithHomeText: false` at all four
   required viewports, matching the direct visual confirmation in the
   mobile screenshot (clear gaps above and below the plate, no collision).

## A pre-existing Home rendering artifact, confirmed unrelated to this correction

The desktop screenshot shows a small floating icon-with-glow and a strip of
card text ("Your problem has a shape...") visually overlapping the "what
others" headline in the **left text column** — nothing to do with the eye.
This was checked directly against the default/no-flag screenshot (which
shows the original, untouched legacy dark eye) and the same overlap is
present there too, identically. It is a pre-existing characteristic of
Home's own hero-text/carousel layout, unrelated to and unaffected by this
correction. Per the task's explicit constraints, Home text, layout, and
spacing were not touched to address it — out of scope for Correction 01A.

## File identity

| File | Role | SHA-256 | Bytes |
|---|---|---|---|
| `Problem-v86-DARK-ONLY.html` | production, read-only | `c2b62cc98f1e3d0fa00d3709818f79f9ee73bd568700dcb6b665adef20b0d6b1` | 3,051,238 |
| `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-05.html` | approved source eye, read-only | `2e35daad2024c847eeac14948a898e598a20da1c5c62ccbc2dbe66d99e53b24e` | 38,832 |
| `Problem-v86-VISIBLE-EYE-ISOLATED-INTEGRATION-01.html` | prior baseline, read-only in this task | `b131aefb01166783a0a4e81b579960d5294d3b6ac760989d56cbd97c82090cff` | 3,099,115 |
| `Problem-v86-VISIBLE-EYE-ISOLATED-INTEGRATION-01A.html` | this correction | `baef1c8d1ab7f36a816284c63e519f5832213449549137a87c53612693834245` | 3,099,844 |

All three read-only sources are confirmed byte-identical to their recorded
baselines. Not modified: `Problem-v86-DARK-ONLY.html`, Prototype 05,
Integration 01, any earlier prototype, Journey, the legacy dark eye,
production routing, persistent storage. No Integration 02 was created. No
Prototype 06 was created. No production build was created.

## Verification summary

Full machine-readable detail in
`VISIBLE-EYE-HOME-INTEGRATION-01A-VERIFICATION-REPORT.json`. Headline
results:

- Duplicate ids: **0** (with and without the flag).
- New console errors introduced: **0**. New console warnings introduced:
  **0** (both a font-preload notice and a software-WebGL notice appear
  identically on vanilla, unmodified production once held open equally
  long — confirmed via a direct side-by-side check — so neither counts as
  introduced by this correction).
- Active `.hero-v` count with the flag: **1** at every viewport (no
  competing eye engines).
- State mapping: **6/6** correct, driven through the real
  `window.setHeroQaStage`.
- Clipping: **false**. Horizontal overflow: **false**. Overlap with Home
  text/controls: **false** — at 390×844, 412×915, 768×1024, and 1440×900.
- Page-navigation stability (Home → circle → Home ×3): stable, exactly one
  observer each time.
- Tab-visibility stability (visible → hidden → visible ×3): stable.
- Reduced motion: transitions suppressed, final state still resolves
  correctly.
- Production hash unchanged. Prototype 05 hash unchanged. Integration 01
  hash unchanged.

## Deliverables

`Problem-v86-VISIBLE-EYE-ISOLATED-INTEGRATION-01A.html`,
`VISIBLE-EYE-HOME-INTEGRATION-01A-NOTE.md` (this file),
`VISIBLE-EYE-HOME-INTEGRATION-01A-VERIFICATION-REPORT.json`,
`VISIBLE-EYE-HOME-INTEGRATION-01A-default-no-flag.png`,
`VISIBLE-EYE-HOME-INTEGRATION-01A-desktop.png`,
`VISIBLE-EYE-HOME-INTEGRATION-01A-mobile-390x844.png`,
`VISIBLE-EYE-HOME-INTEGRATION-01A-close-eye.png`,
`VISIBLE-EYE-HOME-INTEGRATION-01A-original-vs-corrected.png`,
`VISIBLE-EYE-HOME-INTEGRATION-01A-states-strip.png`,
`VISIBLE-EYE-HOME-INTEGRATION-01A-state-{watching,searching,found,solved,embodied,idle}.png`.

## Scope

This delivers Correction 01A and its evidence only. No production
integration, no Integration 02, no Prototype 06, no physical-device test,
no production plan. Journey, the dark eye, routing, storage, and
`HeroV1Life` were left untouched throughout.

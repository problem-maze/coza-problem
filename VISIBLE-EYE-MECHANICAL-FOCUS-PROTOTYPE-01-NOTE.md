# Mechanical Focus Prototype 01 — technical note

## Reference identity (verified, not asserted)

- Source file (as supplied to this session): `c0d67434-VISIBLEEYEMECHANICALFOCUSTIER1.png`
  (upload id `2ecc3911` for the manifest, `c0d67434` for the PNG itself).
  No `design-references/` directory exists in this repository — the manifest's
  file table describes the packet's intended layout, but the only artifact
  actually delivered into this session is the single full-resolution PNG plus
  the two markdown instruction files. There is no separate center-detail crop
  file in the session; the center-detail inspection used in this note was
  produced locally with Pillow (see below), not a supplied second image.
- Dimensions (measured with Pillow, not assumed): **1536 × 1152 px**, RGB.
- SHA-256 (computed with `sha256sum`): `d9415238927f515ae9e0614319fb7bbf2f3e41870ebc6444b59e7a0a6b4b53c4`
  — **matches** the manifest's stated hash exactly.
- File size: 135,335 bytes — matches the manifest.

## Reference forensics performed

Pillow was installed (`pip3 install pillow`; not present at session start) to
measure the reference precisely instead of eyeballing it, since no
`design-references/` copy exists locally to re-inspect later:

- Cropped and upscaled the left tip, right tip, top apex, bottom apex, and
  center regions (`/tmp/left_crop.png`, `/tmp/right_crop.png`,
  `/tmp/top_crop.png`, `/tmp/bottom_crop.png`, `/tmp/center_crop.png`) to read
  fine detail beyond what the full-size view shows.
- Found the true optical axis by locating the two small ring+red-dot markers
  on the horizontal axis (pixel cluster analysis, not visual guessing): both
  center on **y = 541–542**, not the raw image center (y = 576). All frame
  measurements below use this axis, confirmed self-consistent (see next
  point).
- Measured the frame (almond) by scanning for non-background pixels along
  that axis and its perpendicular:
  - Left tip: x ≈ 41, right tip: x ≈ 1494 → **half-width 726.5px**, symmetric
    around x = 767.5 (image center), confirming axis_y = 541 is correct
    (an incorrect axis would not produce left/right symmetry).
  - Top apex: y ≈ 165, bottom apex: y ≈ 937, relative to axis_y = 541: upper
    lobe depth ≈ 376px, lower lobe depth ≈ 396px (lower reaches ~5% further —
    used directly in the reconstruction's control-point math below).
  - Frame width : height ≈ **1453 : 772 ≈ 1.88 : 1**.
- Found the two axis-endpoint markers (small hollow ring + red center dot)
  at x ≈ 227.8 and x ≈ 1306.5 (both y ≈ 541–542) — i.e. **≈ 0.742 × half-width**
  from center, symmetric. Confirmed the left one sits *inside* the frame tip,
  not outside it (a prior visual guess had this backwards; corrected via
  pixel bounding-box measurement).
- Confirmed via crop that a small hollow guide-circle marker sits just inside
  the **top** apex only; the equivalent region near the bottom apex has no
  such marker — a genuine asymmetry, replicated deliberately rather than
  "fixed."
- Radial pixel scans from the optical center at several off-axis angles
  (20°–340°, avoiding the cardinal directions where the control assembly,
  process bridge, and top/bottom gates sit) were used to bound the
  approximate radius of the core/chamber/ring cluster (core ≈ r 55–65,
  chamber/tick region ≈ r 75–160, ring cluster ≈ r 160–275) before hand-tuning
  clean round numbers for the reconstruction (exact per-ring pixel radii were
  **not** pursued to the same forensic precision as the frame/axis — this is
  a new, from-scratch reconstruction rather than a locked-geometry trace, so
  proportion and composition were the target, not pixel-identical radii).

This is a materially different level of rigor from an assumption-based read,
but it is *not* pixel-identical tracing the way the earlier Ring System
lineage's locked geometry was. The manifest itself frames this as a
composition/proportion reference ("reads composition and proportions"), not
a coordinate source, and explicitly excludes the previous prototypes'
geometry as a source for this one.

## Actual Home files inspected

Single file: `Problem-v86-DARK-ONLY.html` (the only Home/production file in
this repository). Specific subsystems read:

- `window.HeroLife` (~line 40200): the engine-selection lifecycle
  (`select`, `setPage`, `setVisible`, `setInView`, `stopAll`, `_state()`).
  Confirms the "single active engine, explicit sync() reconciliation,
  debug-introspectable state" pattern.
- `window.HeroV1Life` (~line 20330): the V1 hero's own tiny task scheduler
  (`timeout`, `interval`, `clear`, `sleep`, `subscribe`, `setActive`,
  `isActive`) — gates all its timers on `PROBLEM_HERO_MODE==='eye' && allowed
  && inView && !document.hidden`, pauses (preserving remaining delay) rather
  than losing state when hidden, and is driven by an `IntersectionObserver`
  plus a `visibilitychange` listener. This is the direct model for this
  prototype's `VisibleEyeLife`.
- `setHeroQaStage()` (~line 20626) and its five real semantic classes,
  documented in the file's own comment block at ~line 6071:
  - `.qa-watching` — Stage 01/04, **ANALYZING** (observing)
  - `.qa-searching` — Stage 02/04, **TRACING** (questioning)
  - `.qa-found` — Stage 03/04, **PATH FOUND** (discovery)
  - `.qa-solved` — Stage 04/04, **SOLVED** (clarity)
  - `.qa-embodied` — Stage 5, **EMBODIED**, triggered ~3s after `qa-solved`
    and held for a further ~2.4s before reset (~line 20895–20933)
- `phase1()/phase2()/phase3()/heroPhaseLoop()` (~line 20654–20964): the
  calm one-shot pacing rhythm this prototype's state transitions borrow —
  holds of 600–850ms, transitions of 400–750ms, a 35-second watchdog
  timeout guarding against a stuck phase, and `HeroV1Life.clear()` cleanup
  of every timer it creates.
- Reduced-motion handling throughout: `perf.prefersReducedMotion` set from
  `matchMedia('(prefers-reduced-motion:reduce)')` at ~line 19117/20048, the
  `html.reduced-motion` class toggle, and dozens of
  `.reduced-motion X{transition:none}` /`{animation:none!important}` CSS
  overrides — the direct model for this prototype's
  `html:not(.eye-motion-ok) #eyeAssembly *{transition:none!important}` plus
  its own `@media(prefers-reduced-motion:reduce)` block.

Only the **semantic progression and operational rhythm** were borrowed, per
the brief. No dark-eye geometry, no class names, no SVG structure, and no
code was copied from `Problem-v86-DARK-ONLY.html` into this file.

## Discovered semantic states → this prototype's states

| Home (`Problem-v86-DARK-ONLY.html`) | This prototype (`setVisibleEyeState`) |
|---|---|
| `qa-watching` — stage 01/04, ANALYZING | `watching` (baseline/default) |
| `qa-searching` — stage 02/04, TRACING | `searching` |
| `qa-found` — stage 03/04, PATH FOUND | `found` |
| `qa-solved` — stage 04/04, SOLVED | `solved` |
| `qa-embodied` — stage 5, EMBODIED | `embodied` |
| all stage classes cleared (reset / hero inactive) | `idle` |

## SVG component inventory

All under a single `<g id="eyeAssembly">` (used for all bounding-box
measurements below), viewBox `-760 -440 1520 880`:

| Element | id / class | Role |
|---|---|---|
| `<g class="qmf">` | quiet measurement field | axis lines, 2 diagonals, 2 dashed circles, 2 axis-endpoint markers, 1 top-only marker |
| `.eye-lid-upper` / `.eye-lid-lower` | outer almond frame | quadratic-Bézier lids |
| `#leftControl` (`.left-control`) | left control assembly | `.lc-bracket`, `.lc-connector`, 4× `.lc-dot` (one `#indicatorActive`) |
| `#rightBridge` (`.right-bridge`) | right process bridge | `.rb-line`, `.rb-signal-ring`, `#bridgeSignal`, `.rb-terminal` |
| `.ring-system` → 6× `.ring-level[data-ring="r1".."r6"]` | segmented operation rings | 15 `<path class="seg role-*">` arcs total across the 6 levels |
| `#opticalChamber` (`.optical-chamber`) | inner optical chamber | `.chamber-boundary` circle + 60 `.tick`/`.tick-major`/`.tick-accent` dial ticks |
| `#focusCore` (`.focus-core`) | central focus core | `.core-rim`, `.core-body`, `#catchlightPrimary`, `#catchlightSecondary` |

Ring segment counts/roles (radius, stroke-width, segment count, gate sizes
computed and printed by the generator script, not hand-typed):

| Ring | r | stroke-width | segments | roles present |
|---|---|---|---|---|
| r1 | 140 | 9.5 | 2 | ink, red-100 |
| r2 | 160 | 8.5 | 3 | support, red-100, red-78 |
| r3 | 180 | 8 | 2 | ink, red-78 |
| r4 | 200 | 7 | 3 | support, red-78, red-50 (widest right-side gate — the bridge opening) |
| r5 | 222 | 6.5 | 2 | quiet, red-50 |
| r6 | 246 | 6 | 3 | quiet, red-26 ×2 (widest gates of all — opening continues outward) |

15 arc segments total across 6 levels (satisfies the "5–7 major segmented
operational levels" requirement; each level itself carries 2–3 explicit
`<path>` arcs, not a single dashed circle). Hemisphere rule applied
uniformly: angle range 270°→90° (through 0°, the right/red-signal side) is
red-family; 90°→270° (through 180°, the left/control side) is graphite —
matching the reference's own red-right / graphite-left balance.

## Color-token mapping

Defined as CSS custom properties on `svg.mech-eye`, identical values to the
manifest:

| Token | Value | Source |
|---|---|---|
| `--bg` | `#FAFBFD` | Lunar environment |
| `--surface` | `#FFFFFF` | Clean surface (`.stage` card) |
| `--ink` | `#30333A` | Primary graphite (lids, inner-hemisphere rings, chamber boundary, major ticks) |
| `--support` | `#777A82` | Supporting graphite (mid rings, bracket, bridge line, minor ticks) |
| `--quiet` | `#C4C8CF` | Quiet graphite (outer rings, guide field) |
| `--red-base` / `--red-100` | `#B95B5A` | Morning Wine Red, full strength |
| `--red-78` | `color-mix(in srgb, var(--red-base) 78%, var(--bg) 22%)` | derived |
| `--red-50` | `color-mix(in srgb, var(--red-base) 50%, var(--bg) 50%)` | derived |
| `--red-26` | `color-mix(in srgb, var(--red-base) 26%, var(--bg) 74%)` | derived |
| `--core` | `#14161B` | focus-core body — deliberately darker/cooler than `--ink`, the single darkest fill in the piece, distinct from pure `#000` |

Grep-confirmed: no other color literal appears anywhere in the stylesheet
except `#FFFFFF` (catchlights + core rim) and the debug-panel chrome (which
reuses the same tokens).

## State-to-behavior mapping

All deltas are one-shot CSS-transition results of a class swap on
`#eyeAssembly` (`state-watching` / `state-searching` / `state-found` /
`state-solved` / `state-embodied` / `state-idle`) — never a looping
`@keyframes` animation (grep-confirmed: no `@keyframes`, no SMIL `<animate>`,
anywhere in the file).

| State | Behavior (all "calm micro" per the brief) | Elements touched |
|---|---|---|
| `watching` (baseline) | resting look; no override rules fire | — |
| `searching` | micro-refocus: catchlight shifts 1.6×1.1px; restrained attention transfer toward the bridge begins | `#catchlightPrimary` translate, `.tick-accent` +0.17 opacity, `#bridgeSignal` +0.20 opacity, `.rb-signal-ring` +0.22 opacity |
| `found` | tiny gate-alignment change + attention arrives | `.lc-bracket` translateX(-4px), `#bridgeSignal` opacity→1 and r 6→7.5, `.rb-signal-ring` +0.13 opacity |
| `solved` | full calm clarity across the red-family + rim + active indicator | `.core-rim` opacity→1 / width 2.4→3, `.role-red-100` opacity→1, `.role-red-78` opacity→0.95, `.lc-dot-active` opacity→1 |
| `embodied` | deepest, quietest presence — subtle depth only, not a burst | `.catchlight-primary` opacity→1 + scale(1.06), `.catchlight-secondary` opacity→0.9, `.qmf-topmark` +0.2 opacity, `.core-rim` width→3.2 |
| `idle` | system at rest (mirrors production's all-classes-cleared reset) | all red-family roles opacity→0.28, `#bridgeSignal` opacity→0.35, `.rb-signal-ring` opacity→0.25, `.lc-dot-active` opacity→0.4 |

## Animation durations and amplitudes

| Property | Duration | Easing | Amplitude |
|---|---|---|---|
| catchlight transform/opacity | 0.55s / 0.5s | `cubic-bezier(0.4,0,0.2,1)` / ease | translate ≤ 1.6×1.1px, scale ≤ 1.06 |
| bracket translateX | 0.45s | `cubic-bezier(0.4,0,0.2,1)` | 4px |
| bridge signal opacity/radius | 0.5s | ease | opacity 0.35–1, radius 6–7.5 |
| ring/chamber/rim opacity | 0.5s | ease | ≤ 0.28 delta on any single property |

All durations sit inside the 400–750ms band used by Home's own phase
transitions; none exceed 0.6s; nothing repeats or loops.

## Reduced-motion behavior

Two independent, redundant guards (mirroring Home's own dual approach):

1. `VisibleEyeLife` computes `matchMedia('(prefers-reduced-motion: reduce)')`
   and only adds an `eye-motion-ok` class to `<html>` when motion is
   simultaneously: not reduced, tab visible, and `#eyeAssembly` in view
   (via `IntersectionObserver`). `html:not(.eye-motion-ok) #eyeAssembly
   *{transition:none!important}` removes all transitions when any of those
   three is false.
2. A plain `@media(prefers-reduced-motion:reduce){ #eyeAssembly
   *{transition:none!important} }` block, independent of JS, as a
   belt-and-suspenders fallback.

Verified with Playwright's `reducedMotion:'reduce'` emulation: `<html>` does
**not** receive `eye-motion-ok` (confirmed `false`, expected `false`). Every
state remains fully legible without motion — each state's CSS deltas are
static end-values (opacity/geometry), not motion-dependent, so reduced-motion
users see the same final visual difference, just arrived at instantly.

## Responsive measurements

Measured via Playwright `page.locator('#eyeAssembly').boundingBox()` — the
actual artwork group, not the `.stage` card:

| Viewport | `#eyeAssembly` box (x, y, w, h) | width % of viewport | height % of viewport |
|---|---|---|---|
| 390×844 | (19.7, 324.2, 350.6, 195.5) | 89.9% | 23.2% |
| 412×915 | (20.1, 353.8, 371.9, 207.4) | 90.3% | 22.7% |
| 768×1024 | (57.6, 330.0, 652.7, 364.0) | 85.0% | 35.6% |
| 1440×900 | (393.6, 268.0, 652.7, 364.0) | 45.3% | 40.4% |

The almond, focus core, all 6 ring levels, left control assembly, and right
process bridge are all confirmed visible (non-zero, unclipped) at every
viewport by direct visual inspection of the captured screenshots at each
size.

## Debug controls

Confirmed via Playwright:
- Loading the file with no query string: `#eyeDebugPanel` count = 0.
- Loading with `?debug=1`: `#eyeDebugPanel` count = 1 (6 state buttons + a
  state readout + a reduced-motion readout).
- `window.setVisibleEyeState(name)` and `window.getVisibleEyeState()` are
  always available globally regardless of the debug flag — the flag only
  gates whether the *visual panel* is built, matching "debug controls only
  when `?debug=1`; normal view and screenshots must contain no controls."
  All six per-state screenshots below were captured with **no** `?debug=1`
  in the URL (state set via a direct `setVisibleEyeState()` call), so none
  of them contain the debug panel.

## Forbidden-effects check

`grep -n -E "animate|<filter|feGaussianBlur|blur\(|drop-shadow|box-shadow|gradient|glow|@keyframes|linearGradient|radialGradient"` against the file: **zero matches** (an initial `box-shadow` on the debug-only panel chrome was found and removed before this final check). SVG parsed with Python's `xml.dom.minidom`: well-formed.

## Geometry source

All coordinates were generated by a Python script (arc/tick/marker math via
`math.cos`/`math.sin`, not hand-typed), based on the frame/axis measurements
above. The quadratic-Bézier lid control points use the same doubling rule
discovered during the earlier Ring System lineage (`actual apex depth =
0.5 × control-point y` for a symmetric endpoint pair) — control points
`-752`/`792` were computed to land the rendered apexes at the measured
`-376`/`396`.

## Files delivered

1. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-01.html`
2. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-01-desktop.png` (clean, 1440×900, no debug UI)
3. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-01-mobile-390x844.png` (clean, no debug UI)
4. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-01-state-watching.png`
5. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-01-state-searching.png`
6. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-01-state-found.png`
7. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-01-state-solved.png`
8. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-01-state-embodied.png`
9. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-01-state-idle.png`
10. this note

## Production-untouched confirmation

`git status --short` before committing shows only the 10 new files listed
above as untracked additions. `Problem-v86-DARK-ONLY.html` was opened
read-only (`Read`/`Grep`) to inspect `HeroLife`/`HeroV1Life`/the `qa-*`
lifecycle and was never written to. No other prototype, experiment, or
production file was modified. No Prototype 02 was created; this stops after
Prototype 01 and its evidence, per the brief.

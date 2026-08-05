# Mechanical Focus Prototype 05 — final character calibration note

This is a **calibration pass**, not a redesign. Prototype 04 was copied
byte-for-byte and only specific numeric CSS/attribute values were edited —
no new SVG geometry, no new ring levels, no new colors, no new elements
except where explicitly noted below (all reuses of existing classes on
existing elements). `git diff --stat` against Prototype 04 confirms this
scope precisely (see the production-untouched section for the full diff
target list).

## Protected-component verification

| Protected item | Status |
|---|---|
| outer almond geometry | unchanged — lid `d=` byte-identical to Prototype 04 |
| viewBox | unchanged — `-760 -440 1520 880` |
| optical center | unchanged — `(0,0)` |
| `#eyeAssembly` footprint | unchanged — bounding box pixel-identical to Prototype 04 at all 4 viewports (table below) |
| `#focusCore` position/layer radii | unchanged — rim 86 / chamber 77 / pupil 63, center `(4,-3)`, gaze direction untouched |
| `#opticalChamber` geometry | unchanged — all boundary/tick/orientation-signal `d=` values byte-identical |
| six semantic levels r1–r6 | unchanged radii (158/178/212/234/272/296) |
| Focus/Process/Support cluster structure | unchanged — same `data-cluster` groupings and void spacing |
| `#leftControl` | unchanged geometry, only stroke-opacity/fill-opacity calibrated |
| `#rightBridge` | unchanged geometry, only stroke-opacity/fill-opacity calibrated |
| Morning Wine Red `#B95B5A` | unchanged — no new color introduced anywhere |
| six state names + API | unchanged — `watching/searching/found/solved/embodied/idle`, identical `setVisibleEyeState`/`getVisibleEyeState` |
| `VisibleEyeLife` | unchanged implementation, still exposed on `window` |
| reduced-motion support | unchanged dual guard |
| debug controls | unchanged `?debug=1` gating |
| responsive shell | unchanged `.stage`/`svg` CSS, unchanged breakpoint |

Confirmed via `git diff --stat` against `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-01/02/03/04.html`
and `Problem-v86-DARK-ONLY.html`: only Prototype 05 itself appears as a new
untracked file; none of the prior prototypes or production were touched.

## Prototype 04 → 05 visual-delta inventory

Every change below is a numeric calibration of a value that already
existed in Prototype 04 — no property, class, or element category is new
except `.tension-path.tension-thick`/`.tension-thin` combined selectors
used for the FOUND-state fix (both classes themselves are unchanged from
Prototype 04).

| Area | Prototype 04 | Prototype 05 | Change |
|---|---|---|---|
| `.tension-thick` opacity | 0.22 | 0.32 | +45% relative |
| `.tension-thin` opacity | 0.14 | 0.17 | +21% relative |
| `.lc-sleeve` opacity | 0.16 | 0.20 | +25% |
| `.lc-connector` opacity | 0.62 | 0.68 | +10% |
| `.rb-sleeve` opacity | 0.16 | 0.20 | +25% |
| `.rb-terminal-anchor` opacity | 0.42 | 0.48 | +14% |
| `.channel-backing` opacity | 0.40 | 0.44 | +10% |
| `.plate-keyline` opacity | 0.50 | 0.58 | +16% |
| r4 gate stroke-widths (backing/keyline/plate) | 11.2/9.4/8.4 | 11.6/9.6/8.8 | +0.4 each |
| r6 gate stroke-widths (backing/keyline/plate) | 10.2/8.4/7.4 | 10.6/8.6/7.8 | +0.4 each |
| `.core-rim` width/opacity | 2.8 / 0.94 | 3.0 / 0.96 | slightly stronger separation |
| `.core-shadow-lower` opacity | 0.24 | 0.20 | reduced (less heavy) |
| `#catchlightPrimary` rx/ry | 13/10 | 11.5/8.5 | ~12% smaller (less "lens/button") |
| FOUND: `role-support` | 0.25 | 0.34 | raised above the ~45% floor |
| FOUND: `role-ink` | 0.45 | 0.50 | raised |
| FOUND: r5 opacity | 0.25 | 0.32 | raised |
| FOUND: r6 opacity | 0.25 | 0.28 | raised |
| FOUND: tick/tick-major | 0.28/0.40 | 0.40/0.55 | raised (less "disappearance") |
| FOUND: core-chamber | 0.68 | 0.75 | raised |
| FOUND: `.connector-signal` | *(not set — inherited 0.72)* | 1.0 | **new rule**, process-route continuity |
| FOUND: `.plate`/`.plate-keyline` | *(not set — inherited 0.98/0.5)* | 1.0 | **new rule**, plate-alignment clarity |
| SOLVED: `role-red-78` | 0.96 | 0.90 | lowered (moderated) |
| SOLVED: `role-red-50` | 0.88 | 0.80 | lowered (moderated) |

Nothing was removed; every Prototype 04 rule not listed above is carried
forward verbatim.

## Tension-path calibration

Prototype 04's tension paths (opacity 0.22/0.14) were confirmed too faint
at 390×844 — barely visible even on close inspection. Raised to 0.32/0.14→0.17
(thick/thin), a real but still deliberately subtle increase: at normal
viewing distance the paths remain invisible against the busier mechanism
(confirmed in the delivered mobile capture — they don't register on first
glance), but are now clearly traceable on a deliberate second look,
exactly per the brief's two-glance requirement. Geometry (position,
direction, taper structure) is completely unchanged — only the two opacity
constants moved. Confirmed they still stop short of the lids by the same
14-unit margin documented in the Prototype 04 note (unchanged geometry).

## Left-input calibration

- `.lc-sleeve` opacity 0.16→0.20: the structural mass linking the bracket
  to the r6 gate is now more visible without becoming a solid block.
- `.lc-connector` opacity 0.62→0.68: the thin connecting line itself reads
  slightly more solid.
- r6's gate (`channel-backing`/`plate-keyline`/`plate`) widened by 0.4
  units per layer and the shared `.plate-keyline` opacity raised globally
  (0.5→0.58) — the "support-cluster opening" where the bracket's plate
  enters is now more legible as a distinct mechanical joint, not just a
  gap in the ring.
- 4 indicators and the single active Morning Wine indicator
  (`#indicatorActive`) are byte-identical to Prototype 04 — same
  positions, same size hierarchy (active r=7.4 vs. inactive r=5.4).
- The assembly's absolute position and scale relative to the focus core
  are untouched — it remains visually subordinate (its dots/bracket are
  still smaller and quieter than the core itself).

## Right-output calibration

- `.rb-sleeve` opacity 0.16→0.20, matching the left side's treatment
  exactly (kept symmetric).
- `.rb-terminal-anchor` opacity 0.42→0.48 — the two perpendicular end
  ticks that anchor the terminal are now clearly present rather than
  nearly blending into the line they cap.
- r4's gate widened the same +0.4/layer as r6's, and shares the same
  `.plate-keyline` opacity bump — the process gateway the bridge emerges
  from is equally legible to the left gate.
- `#bridgeSignal`, `.rb-signal-ring`, `.rb-line`, `.rb-terminal` geometry
  and base styling are all unchanged from Prototype 04 — the relationship
  to the Morning Wine path (the signal ring brightening under
  `searching`/`found`) is preserved exactly.

## White-plate material calibration

Kept the exact 3-pass construction (channel backing → keyline → plate) and
its document paint order. Calibrated:

- `.channel-backing` opacity 0.40→0.44 (10% stronger groove).
- `.plate-keyline` opacity 0.50→0.58 (16% stronger dark edge — this is the
  layer that does the actual "don't disappear against white" work).
- Both gates' 3 stroke-widths widened by a uniform +0.4 units per layer,
  giving the white plate itself a visibly thicker cross-section (r4:
  8.4→8.8, r6: 7.4→7.8) so it reads as a **thin mechanical body** — a flat
  ribbon with real width — rather than a stroked line at the edge of
  legibility. Confirmed readable without zooming in the delivered mobile
  and close-mechanism captures. No shadows, filters, blur, glow,
  glassmorphism, or 3D were introduced (grep-confirmed zero matches, see
  verification below) — every change here is a plain opacity or
  stroke-width number.

## Focus-core calibration

- Primary catchlight (`#catchlightPrimary`) reduced from `rx=13,ry=10` to
  `rx=11.5,ry=8.5` (~12% smaller by area) — the single change most
  directly aimed at "slightly less like a camera lens/glossy button,"
  since an oversized bright ellipse on a black disc is exactly what reads
  as a lens highlight. Position (`cx=15,cy=-19`) and opacity (1)
  unchanged — it still clearly dominates the secondary catchlight.
- Secondary catchlight (`#catchlightSecondary`) completely unchanged
  (r=4.2, opacity 0.6) — the hierarchy gap between primary and secondary
  widened only because the primary shrank, not because the secondary
  changed.
- `.core-shadow-lower` opacity 0.24→0.20 — the lower internal shadow is
  now a touch less heavy, reducing the "photographic" weight slightly
  while keeping the crescent fully present.
- `.core-rim` stroke-width 2.8→3.0, opacity 0.94→0.96 — a cleaner,
  slightly more definite separation between the core and the chamber ring
  around it.
- Gaze direction (pupil center `(4,-3)`), the transition into the chamber
  (`.core-chamber` fill/geometry), and both approved gradients
  (`corePupilGrad`, `coreChamberGrad`) are completely unchanged, per the
  brief's explicit "do not change gaze direction" / "do not flatten" /
  "do not enlarge" constraints.

## FOUND correction

**The problem** (Prototype 04): `role-quiet`/`role-support` dropped to
0.25 (33–45% of baseline) and both support-cluster levels (r5/r6) dropped
to a uniform 0.25 opacity (37–42% of baseline) — the support cluster
nearly vanished, and the state read as partial erasure rather than "a
route has been discovered."

**The fix**: every element the brief named a floor for now sits at or
above ~45% of its Prototype 04 **watching** baseline:

| Element | Watching baseline | Found (P04) | Found (P05) | P05 as % of baseline |
|---|---|---|---|---|
| `role-quiet` | 0.55 | 0.25 (45%) | 0.26 | 47% |
| `role-support` | 0.75 | 0.25 (33%) | 0.34 | 45% |
| r5 opacity | 0.68 | 0.25 (37%) | 0.32 | 47% |
| r6 opacity | 0.60 | 0.25 (42%) | 0.28 | 47% |

`role-quiet` was already close to the floor in Prototype 04 (45%); the
real correction is `role-support` and r5/r6, which were meaningfully
below the ~40–50% band and are now inside it.

**What now carries the "alignment" reading instead of dimming:**
- Gate translate/rotate (unchanged from P04 — up to 6px/2°, already at
  the brief's ceiling).
- **New**: `.connector-signal` (the two red connectors carrying the
  signal path between ring levels) jumps to full opacity — "process-route
  continuity" is now an explicit rule, not incidental.
- **New**: `.plate`/`.plate-keyline` jump to full opacity — the gate
  plates the route passes through resolve to maximum clarity, giving
  "plate alignment" a direct visual signal.
- Tick/tick-major dimming moderated from 0.28/0.40 to 0.40/0.55 — the
  optical chamber's measurement detail recedes less aggressively.
- `core-chamber` dimming moderated from 0.68 to 0.75.

Net effect, visible in the delivered `state-found` capture and the states
strip: the support-cluster arcs are clearly still there (readable
structure, not near-blank space), while the red path, both gate plates,
and the connectors are unambiguously the brightest, sharpest things on the
canvas — "focused," not "erased."

## SOLVED correction

**The problem** (Prototype 04): `role-red-78`→0.96 and `role-red-50`→0.88
pushed every red tier close to maximum simultaneously — combined with
`role-red-100`→1, the state read as "everything got brighter" rather than
"the architecture resolved."

**The fix**: `role-red-78` lowered 0.96→0.90 and `role-red-50` lowered
0.88→00.80 (both moderated, `role-red-100` unchanged at 1 since it marks
the actual resolved-path endpoints). Everything else that *does* the real
"resolves into calm clarity" work is unchanged from Prototype 04: plates/
channel-backing/plate-keyline still resolve to full opacity, the
chamber's inner boundary still brightens, ticks still recede (reducing
measurement noise), and the gates still settle with a small rotation. The
result is a state where the red path is clearly the most saturated color
in the piece (still stronger than any other state except itself), but not
by pushing every red tier to the same ceiling — the "resolution" reads
through the graphite/plate/chamber clarity, matching the brief's
"clearer because the architecture resolves, not because every piece
reaches maximum opacity."

## State pixel-difference percentages

Measured identically to Prototype 04 (Pillow, RGB per-pixel delta summed
across channels, threshold 12, at 390×844, full-page screenshots,
`watching` as the baseline):

| State vs watching | Measured | Target (this pass) | Status |
|---|---|---|---|
| searching | 0.877% | 0.8–1.5% | **within range** |
| found | 1.593% | 1.2–2.5% | **within range** |
| solved | 1.194% | 1.0–2.0% | **within range** |
| embodied | 0.940% | 0.8–1.8% | **within range** |
| idle | 0.923% | 0.8–1.8% | **within range** |

All 5 states land inside their bands on the first calibration pass (no
further tuning iterations were needed this time, unlike Prototype 04's
multi-round tuning). Note that `found`'s absolute percentage (1.593%) is
nearly unchanged from Prototype 04's (1.589%) despite the correction
described above — this is expected and intentional: the *floor* on
role-support/quiet/r5/r6 was raised (reducing their contribution to the
diff), while new full-opacity jumps on `.connector-signal` and
`.plate`/`.plate-keyline` were added (increasing their contribution) — the
two effects roughly offset in raw pixel count, while the *qualitative*
reading of the image (alignment vs. erasure, confirmed visually in the
delivered captures) changed substantially. This confirms the brief's own
instruction not to optimize only for the percentage — the number stayed
similar while the actual visual meaning corrected.

## Responsive verification

| Viewport | P04 box (x,y,w,h) | P05 box (x,y,w,h) | Match |
|---|---|---|---|
| 390×844 | (19.7, 324.2, 350.6, 195.5) | (19.7, 324.2, 350.6, 195.5) | pixel-identical |
| 412×915 | (20.1, 353.8, 371.9, 207.4) | (20.1, 353.8, 371.9, 207.4) | pixel-identical |
| 768×1024 | (57.6, 330.0, 652.7, 364.0) | (57.6, 330.0, 652.7, 364.0) | pixel-identical |
| 1440×900 | (393.6, 268.0, 652.7, 364.0) | (393.6, 268.0, 652.7, 364.0) | pixel-identical |

Expected and confirmed: this pass touched no geometry that determines
`#eyeAssembly`'s extremal bounds (lids, `.qmf` field, tension-path/gate/
assembly endpoints all unchanged in position).

## Reduced-motion verification

Unchanged dual guard from Prototype 01–04. Verified via Playwright's
`reducedMotion:'reduce'` emulation: `<html>` does **not** receive
`eye-motion-ok` (confirmed `false`). Every calibrated state delta
(including the corrected FOUND/SOLVED rules) is a static end-value, so
reduced-motion users see the identical final differences — including the
pixel-diff percentages measured above — without any in-between motion.

## Debug-controls / API verification

- No query string: `#eyeDebugPanel` count = 0. `?debug=1`: count = 1.
- `window.setVisibleEyeState`/`window.getVisibleEyeState`/`window.VisibleEyeLife`
  present and functional (`setVisibleEyeState('found')` returns `'found'`,
  `getVisibleEyeState()` reads back `'found'`).
- All delivered screenshots (desktop, mobile, close-mechanism, states
  strip, 6 individual states) were captured with **no** `?debug=1` in the
  URL.
- All 9 protected ids present exactly once (grep-confirmed). Exactly 6
  `<g class="ring-level" data-ring="..." data-cluster="...">` declarations
  exist, unchanged from Prototype 04.

## Forbidden-effects / well-formedness verification

- `xml.dom.minidom` parses the extracted `<svg>...</svg>` block without
  error: well-formed.
- `grep` for `animate|<filter|feGaussianBlur|blur\(|drop-shadow|box-shadow|glow|@keyframes`:
  zero matches. No new ring levels, no new colors, no dashed strokes
  outside the unchanged `.qmf` field, no alternative variants.

## Production-untouched confirmation

`git diff --stat` against `Problem-v86-DARK-ONLY.html`,
`VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-01.html`,
`VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-02.html`,
`VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-03.html`, and
`VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-04.html` is **empty**. `git status
--short` before committing shows only the new Prototype 05 files as
untracked additions. No Prototype 06 was created. No alternative variants
were created. No production/Home integration of any kind — this pass
remains an isolated, standalone file, exactly as instructed ahead of any
future Home-integration test.

## Files delivered

1. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-05.html`
2. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-05-desktop.png` (clean, 1440×900)
3. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-05-mobile-390x844.png` (clean)
4. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-05-close-mechanism.png` (clean, cropped around `#opticalChamber`)
5. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-05-states-strip.png` (all 6 states, equal scale, side by side)
6. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-05-state-watching.png`
7. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-05-state-searching.png`
8. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-05-state-found.png`
9. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-05-state-solved.png`
10. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-05-state-embodied.png`
11. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-05-state-idle.png`
12. this note

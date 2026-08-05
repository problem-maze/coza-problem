# Mechanical Focus Prototype 04 — whole-eye character pass note

Prototype 03 is the protected baseline for this pass, reviewed from its
delivered desktop/mobile/close-mechanism/state captures. The brief's own
diagnosis (core has presence, arcs still read as radar, mechanism feels
"placed inside" rather than unified, left/right systems weak at mobile
scale, white plates invisible, states hard to distinguish) was treated as
the punch list for this pass — this note reports against each item.

## Protected-component verification

| Protected item | Status |
|---|---|
| outer almond geometry | unchanged — lid `d=` byte-identical to Prototype 03 |
| viewBox | unchanged — `-760 -440 1520 880` |
| optical center | unchanged — `(0,0)` |
| `#eyeAssembly` footprint | unchanged — bounding box pixel-identical to Prototype 03 at all 4 viewports (table below) |
| `#focusCore` position/general scale | unchanged — same `(0,0)` center, same layer radii (rim 86 / chamber 77 / pupil 63) |
| `#opticalChamber` | unchanged — identical geometry to Prototype 03 (boundaries, ticks, orientation signal all byte-identical) |
| six semantic levels r1–r6 | preserved as semantic levels, radii reorganized into 3 clusters (explicitly permitted — "refinement and rebalancing pass") |
| `#leftControl` | preserved id/role/position/4 indicators/1 active indicator, strengthened |
| `#rightBridge` | preserved id/role/direction/signal/terminal, strengthened |
| Morning Wine Red `#B95B5A` | unchanged — `--red-base` value identical, no new color introduced |
| state names + API | unchanged — `watching/searching/found/solved/embodied/idle`, identical `setVisibleEyeState`/`getVisibleEyeState` |
| `VisibleEyeLife` | unchanged implementation, still exposed on `window` |
| reduced-motion handling | unchanged — same dual guard |
| debug controls | unchanged — identical `?debug=1` gating |
| responsive shell | unchanged — same `.stage`/`svg` CSS, same breakpoint |

Confirmed via `git diff --stat` against `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-01.html`,
`...-02.html`, `...-03.html`, and `Problem-v86-DARK-ONLY.html`: **empty** —
none of the four were touched while building this file. No subsystem was
deleted; every protected id/class from Prototype 03 is still present.

## Three-cluster architecture map

| Cluster | Levels | Radii | Internal gap | Role |
|---|---|---|---|---|
| **FOCUS** | r1, r2 | 158, 178 | 20 (tight) | most precise/concentrated — focus core + chamber + r1/r2 |
| — void — | | | **34** | large intentional separation |
| **PROCESS** | r3, r4 | 212, 234 | 22 | the working middle — visible gates, primary signal route, strongest front/back relationships |
| — void — | | | **38** | large intentional separation |
| **SUPPORT** | r5, r6 | 272, 296 | 24 | quieter, more open, tied to the left/right assemblies |

Each `<g class="ring-level" data-ring="r1".."r6">` now also carries a
`data-cluster="focus"|"process"|"support"` attribute, so the grouping is
explicit in the markup, not just implied by radius. The two voids (34 and
38 units, vs. 20–24 units *within* a cluster) are visually the largest gaps
in the whole ring system — the point where "one eye whose parts belong to
the same character" stops reading as "a mechanism placed inside an
almond": there are now only 3 visually distinct rings of activity, not 6
evenly-spaced ones.

## Removed/reworked radar cues

- **Cluster reorganization** (above) replaces 6 near-evenly-spaced radii
  with 3 visually grouped bands + 2 large voids.
- **Unequal segment spans carried over and extended** from Prototype 03
  (12°–122° range), now additionally varying *which* levels get long vs.
  short treatment per cluster rather than one long+rest-short pattern
  repeated identically on every level.
- **One stepped-curved-path piece**: r3's upper-left piece
  (`200°→236°` at r=212, then a radial step inward to r=205, then
  `236°→268°` at r=205) — a genuinely non-circular arc, built via
  `arc→line→arc`, not a dashed line and not a decorative flourish; it sits
  exactly where the brief asked for "sections that flatten slightly or use
  stepped curved paths."
- **Differentiated lower-left vs. lower-right roles** (see the dedicated
  section below) replace what were four near-identical "U" sweeps in
  Prototype 03.

## Lower-U-shape corrections

Prototype 03 had one lower-hemisphere "U" arc on **each** of r3, r4, r5,
r6 (72°–168°, 60°–150°, 78°–178°, 34°–150° respectively) — four stacked,
near-parallel sweeps through the bottom, the single strongest remaining
radar cue. Corrected per level:

| Level | Prototype 03 | Prototype 04 | Correction |
|---|---|---|---|
| r3 | 72°–168° (96°, both lower-left+lower-right) | 108°–168° (60°, lower-**left only**) | shortened; lower-right portion removed entirely |
| r4 | 60°–150° (90°, one continuous arc) | 58°–94° (lower-right, support) **+** 116°–150° (lower-left, ink) | **converted into two separated load-bearing plates** with an 18° gap between them |
| r5 | 78°–178° (100°) | 130°–178° (48°, lower-**left only**) | shortened; lower-right portion removed |
| r6 | 34°–150° (116°) | 34°–80° (46°, lower-**right only**) | shortened; lower-left portion removed |

Result: no two adjacent levels share the same lower-hemisphere coverage
any more (left-only, split-both, left-only, right-only — an alternating,
non-repeating pattern), and 2 of the 4 arcs are meaningfully shorter (r3:
96°→60°, r5: 100°→48°). The **offset connector** required by the brief
lives in r4's new 94°–116° gap: a `.connector-offset` radial link at 105°
(deliberately off the 0°/180°/340° axis used by the other 5 connectors)
joining r4 to r5. Lower-left and lower-right now visibly differ in role —
r4's lower-right plate is `role-support` at stroke-width 7.6, its
lower-left plate is `role-ink` (darker) at stroke-width 6.4 — a real
material/weight difference, not just a angular one. The lower half remains
present (not emptied), just no longer a stack of matching arcs.

## White-plate visibility method

Both gate plates (r4's `gateway-plate`, r6's `left-gate-plate`) now use a
**3-pass** construction instead of Prototype 03's 2-pass:

1. `.channel-backing` — widest (stroke-width base+2.8/+2.4), ink at
   opacity 0.4 (up from 0.35) — the "groove" the plate sits in.
2. `.plate-keyline` — **new**, medium width (base+1.4/+1.0), ink at
   opacity 0.5 — a thin, deliberate dark edge directly under the plate.
3. `.plate` — narrowest (base+0.8), pure white at opacity 0.98 — the
   visible raised surface.

The keyline is the direct fix for "white plates disappear against the
white surface": every plate now carries its own dark contact edge
independent of the channel backing, so the plate reads as a distinct raised
object (dark edge → white top) rather than blending into `--surface`.
Confirmed visible at 390×844 without zooming in the delivered mobile
capture and close-mechanism capture. No blur, no drop-shadow, no
glassmorphism, no 3D extrusion — purely stroke-width/opacity layering
(grep-confirmed zero forbidden effects).

## Focus-to-chamber attachment inventory

Per section 5's "2–3 visible but restrained attachment relationships":

1. **Core-chamber-rim nesting itself** — `.core-chamber` (r77) sits
   directly between `.core-body` (r63) and `.core-rim` (r86), an implicit
   but structurally real attachment (unchanged from Prototype 03).
2. **Red link now originates at the core rim, not the chamber** — the
   `.chamber-link-signal` path was extended from Prototype 03's start
   point (chamber mid-boundary, r=133) to `r=86` (the core rim itself):
   `M 80.81,-29.41 L 148.47,-54.04`. The red signal now visibly begins
   *at the focus region* and travels out through the chamber into r1,
   rather than appearing to start mid-chamber.
3. **Graphite link, chamber → r1, quiet side** — unchanged from Prototype
   03, `M -124.98,45.49 L -148.47,54.04` at 160°, the counterweight to the
   red attachment.

Together these reduce "the impression that the black core is floating
inside a white dial" — the core now has a visible line reaching out to the
mechanism on both its active and quiet sides.

## Whole-eye structural relationship inventory (section 2/10)

4 quiet, tapered `.tension-path` pairs (thick segment near the mechanism,
thinner segment reaching toward the lid/direction — a genuine 2-segment
taper, not a uniform line), from the support cluster's edge (r=296)
outward, **never touching the lids**:

| Path | Direction | From → mid → to (radius) | Relationship |
|---|---|---|---|
| `tension-upper` | 270° (up) | 296→330→362 | quiet upper alignment response |
| `tension-lower` | 90° (down) | 296→340→380 | quieter lower structural response |
| `tension-right` | 20° | 296→322→352 | directional relationship toward the right process bridge |
| `tension-left` | 160° | 296→314→344 | balancing relationship toward the left control |

All 4 stop well short of the lid curves (closest approach at the upper
path, 362 units vs. the lid's actual apex depth of 376 — an 14-unit
margin, confirmed by direct computation, not eyeballing). At normal
viewing distance the eye reads clean; the 4 paths are subtle enough
(opacity 0.14–0.22) to only become apparent on closer inspection, exactly
as specified ("at first glance... clean; on second glance... organized
around the same focus").

## Left-input integration

- Position, 4 indicators, and the single active Morning Wine indicator
  (`#indicatorActive`) all preserved — only coordinates shifted outward
  (+22 units) to meet the new r6=296.
- **More visible structural sleeve**: `.lc-sleeve` opacity raised from
  0.12 (Prototype 03) to 0.16, width unchanged (spans bracket→r6 edge).
- **A plate clearly enters the support cluster**: r6's
  `ring-gate[data-gate="left"]` (150°–204°, the widest single gap in the
  system) sits exactly where the bracket's connector arrives.
- **Internal route toward the optical chamber**: the graphite
  `.chamber-link` (160°) sits on the same side as the left assembly,
  echoing its alignment inward.
- **Visible interruption in r5/r6**: r6 is interrupted by the gate;
  r5's own segment layout leaves the adjacent 178°–206° zone open too, so
  the interruption reads across both support-cluster levels.
- **Better active/inactive hierarchy**: the active dot grew from r=6.2 to
  r=7.4 (20% larger) while the 3 inactive dots shrank slightly (6.2→5.4)
  and their stroke-opacity dropped (0.72→0.65) — a clearer size+weight
  hierarchy, not just a color difference.

## Right-output integration

- Direction, signal point (`#bridgeSignal`), and terminal all preserved —
  coordinates shifted outward (+10 units) to meet the new r4=234.
- **Clearly visible gateway through the process cluster**: r4's
  `ring-gate[data-gate="right"]` (342°–20°, wrapping through 0°, the
  widest gate in the process cluster) plus r5's own natural gap in the
  same angular zone (26°–70° starts right after) means the opening reads
  through 2 consecutive levels.
- **Track continuing from r3/r4 into the bridge**: the r3→r4 `connector-
  signal` (red, 340°) plus the r4→r5 `connector-bridge` (5°, capped by
  `.gate-emergence-cap`) form the same visible chain as Prototype 03, now
  scaled and slightly repositioned to the new radii.
- **More legible sleeve**: `.rb-sleeve` opacity raised 0.12→0.16, matching
  the left side's treatment.
- **Restrained terminal anchor**: `.rb-terminal-anchor` kept, scaled.
- **Relationship to the Morning Wine signal path**: `#bridgeSignal` is the
  literal endpoint of the red path (see next section) — its ring
  (`.rb-signal-ring`) brightens under `searching`/`found`, visibly
  "receiving" the path's arrival.

## Red signal-path map

| Stage | Element | Strength |
|---|---|---|
| 1. focus orientation | pupil gaze offset (4,-3) | — |
| 2. chamber marker | `.chamber-orientation-signal` wedge, ≈340° | strong |
| 3. focus→chamber→r1 link | `.chamber-link-signal`, now originating at the core rim | strong |
| 4. r1 activation | 2 pieces, red-78 (38°) + red-100 (42°) | strongest near core |
| 5. r1→r2 connector | `.connector-signal`, red, 320° | strong |
| 6. r2 activation | red-100 track seated inside a graphite channel (3-pass), 320°–352° | strong |
| 7. r3 process route | 1 red-78 piece, 336°–356° (restrained) | medium |
| 8. r3→r4 connector | `.connector-signal`, red, 340° | medium |
| 9. r4 process route | 1 red-50 piece, 296°–338° (weaker) | weak |
| 10. right bridge signal | `#bridgeSignal` + `.rb-signal-ring` | full (destination) |
| counter-signal | `.counter-signal` (red-26), r2, 160°–172°, 12° span — the shortest, palest red element, on the left/quiet side | weakest, dims further under `solved`/`idle` |

Strength decreases monotonically from stage 4 through stage 9 before
resolving at full strength at the bridge (the destination), exactly per
the brief's "strongest close to the core... one clear medium red process
route... zero or almost zero red on quiet outer supports" — r5 and r6
carry **zero** red pieces. `.eye-lid-upper`/`.eye-lid-lower` remain pure
`--ink`, zero red. The path is legible through *continuity* (a traceable
chain of connected red elements from core to bridge) rather than uniform
brightness — confirmed by the fact that stages 7–9 are deliberately
*dimmer*, not brighter, than stages 4–6.

## State-by-state structural changes

Every state now changes **structure and coverage**, not just a handful of
small opacity nudges:

| State | Structural/spatial changes (beyond Prototype 03) |
|---|---|
| watching | baseline — stable unified architecture |
| searching | catchlight + orientation-signal motion (kept); **all red-family → full opacity** (was partial); **r1's ink + r2's support roles → full opacity**; **core-chamber opacity → 0.75** (recedes, revealing more rim); right gate translate+rotate; tick/tick-major brighten broadly |
| found | **role-quiet/support system-wide → 0.25 opacity**; **role-ink → 0.45**; **r5/r6 whole clusters → 0.25 opacity**; **core-chamber → 0.68**; tension-paths nearly vanish (0.06); both gates translate (6px/−4px) + right gate rotates 2°; core-reflection-soft shrinks+dims |
| solved | plates/channel-backing/keylines → full opacity; **tick/tick-major dim further** (0.25/0.4, "visual noise reduces"); **role-quiet → 0.35, role-support → 0.5**; **r5/r6 → 0.48 opacity**; r1/r3 ink brightens; counter-signal dims to 0.15 (red concentrates into the successful path, not everywhere) |
| embodied | catchlight scale+opacity; pupil gradient swap; **r3/r4/r5/r6 opacity all raised** (0.93/0.88/0.9/0.85 — hierarchy unifies across all 4 non-focus levels, not just the outer 2); **role-support/quiet system-wide brighten** (0.9/0.7); tension-paths + chamber-boundary brighten (outer relationships "more present") |
| idle | red-family → 0.13 (nearly gone); **role-ink → 0.62, role-support → 0.55** (graphite recedes somewhat too, but stays clearly readable); **core-rim → 0.65, core-reflection-soft → 0.55, core-chamber → 0.8** (focus "alive but quiet"); tension-paths recede |

No state relies mainly on opacity of a single small element — every state
now touches a broad, thematically-consistent set of roles/clusters
simultaneously, which is also why the pixel-diff percentages (below) are
substantially larger than Prototype 03's.

## Pixel-difference percentages

Measured with Pillow (RGB per-pixel absolute difference summed across
channels, threshold 12) at **390×844** — the viewport the brief's target
ranges are specified against — comparing each state to `watching` using
identical full-page screenshots:

| State vs watching | Measured | Target (brief) | Status |
|---|---|---|---|
| searching | 0.877% | 0.8–1.5% | **within range** |
| found | 1.589% | 1.5–3.0% | **within range** |
| solved | 1.228% | 1.0–2.0% | **within range** |
| embodied | 0.947% | 0.8–1.8% | **within range** |
| idle | 0.907% | 0.8–1.8% | **within range** |

All 5 states land inside their specified bands. Reaching these percentages
at mobile scale required moving beyond Prototype 03's small-element
opacity nudges (which measured only 0.19–0.50% at this same 390×844
scale during initial testing) to the broader, cluster/role-wide changes
described above — confirmed necessary and sufficient by direct
measurement, not asserted. No background, layout, or outer-eye/lid change
contributed to any of these numbers — the lids and `.qmf` field carry zero
state-conditional CSS rules (grep-confirmed: no `.state-*` selector in the
file targets `.eye-lid-*` or `.qmf-*`).

## Motion amplitudes and durations

| Property | Duration | Easing | Amplitude |
|---|---|---|---|
| catchlight translate | 0.5–0.55s | `cubic-bezier(0.4,0,0.2,1)` / ease | up to 2.6×2px |
| orientation-signal translate+rotate | 0.5s | `cubic-bezier(0.4,0,0.2,1)` | 3×2.2px + 5° |
| gate translate+rotate | 0.55s | `cubic-bezier(0.4,0,0.2,1)` | up to 6px + 2° (at the brief's stated ceiling) |
| bracket translate+rotate | 0.55s | `cubic-bezier(0.4,0,0.2,1)` | 4px + 1° |
| core-reflection scale | 0.5s | ease | 0.88 (12% shrink) |
| bridge-signal opacity/radius | 0.5s | ease | opacity 0.22–1, radius 6.8–8.8 |
| cluster/role opacity shifts | 0.5–0.55s | ease | up to ~0.6 delta on any single property (e.g. role-quiet 0.55→0.25 in `found`) |

All durations sit inside the 0.5–0.9s band the brief allows; the largest
gate translation (6px) and rotation (2°) both sit exactly at, not beyond,
the stated ceilings. Nothing loops, spins continuously, blinks, pulses the
whole eye, or scales the whole eye (grep-confirmed zero `@keyframes`/
`<animate>` in the file).

## Responsive bounding-box comparison (Prototype 03 vs Prototype 04)

| Viewport | P03 box (x,y,w,h) | P04 box (x,y,w,h) | Match |
|---|---|---|---|
| 390×844 | (19.7, 324.2, 350.6, 195.5) | (19.7, 324.2, 350.6, 195.5) | pixel-identical |
| 412×915 | (20.1, 353.8, 371.9, 207.4) | (20.1, 353.8, 371.9, 207.4) | pixel-identical |
| 768×1024 | (57.6, 330.0, 652.7, 364.0) | (57.6, 330.0, 652.7, 364.0) | pixel-identical |
| 1440×900 | (393.6, 268.0, 652.7, 364.0) | (393.6, 268.0, 652.7, 364.0) | pixel-identical |

As with every prior pass, this follows directly from the outer-composition
lock: the lids and `.qmf` guide field (up to r=410) are untouched, and the
new outer edges (r6=296, tension paths out to 380/362, left/right
assemblies out to x=±453) all stay inside that envelope.

## Reduced-motion verification

Same dual guard as Prototype 01–03, unchanged. Verified via Playwright's
`reducedMotion:'reduce'` emulation: `<html>` does **not** receive
`eye-motion-ok` (confirmed `false`). Every state's deltas (translations,
rotations, opacity/cluster shifts, gradient swap) are static end-values, so
reduced-motion users see the identical final differences — including the
pixel-diff percentages measured above — just without the in-between
motion.

## Debug-controls / API verification

- No query string: `#eyeDebugPanel` count = 0. `?debug=1`: count = 1.
- `window.setVisibleEyeState`/`window.getVisibleEyeState`/`window.VisibleEyeLife`
  present and functional (`setVisibleEyeState('found')` returns `'found'`,
  `getVisibleEyeState()` reads back `'found'`).
- All delivered screenshots (desktop, mobile, close-mechanism, states strip,
  6 individual states) were captured with **no** `?debug=1` in the URL.
- All 9 protected ids appear exactly once each (grep-confirmed). Exactly 6
  `<g class="ring-level" data-ring="..." data-cluster="...">` element
  declarations exist, named `r1`–`r6` with clusters `focus/focus/process/
  process/support/support` respectively.

Note on capture scale: the 6 individual per-state PNGs and the pixel-diff
measurements above use the **390×844** viewport (the scale the brief's own
legibility and percentage targets are specified against); the states strip
uses a larger equal-scale crop per panel for easier side-by-side visual
comparison in this deliverable.

## Forbidden-effects / well-formedness verification

- `xml.dom.minidom` parses the extracted `<svg>...</svg>` block without
  error: well-formed. (One HTML comment originally contained a literal
  `--`, which is invalid inside an XML comment — caught by this exact
  check and fixed by rewording the comment before final delivery.)
- `grep` for `animate|<filter|feGaussianBlur|blur\(|drop-shadow|box-shadow|glow|@keyframes`:
  zero matches. No new dashed strokes anywhere outside the unchanged
  `.qmf` field.

## Production-untouched confirmation

`git diff --stat` against `Problem-v86-DARK-ONLY.html`,
`VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-01.html`,
`VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-02.html`, and
`VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-03.html` is **empty**. `git status
--short` before committing shows only the new Prototype 04 files as
untracked additions. No Prototype 05 was created. No alternative variants
were created. No production/Home integration of any kind.

## Files delivered

1. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-04.html`
2. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-04-desktop.png` (clean, 1440×900)
3. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-04-mobile-390x844.png` (clean)
4. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-04-close-mechanism.png` (clean, cropped around `#opticalChamber`)
5. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-04-states-strip.png` (all 6 states, equal scale, side by side)
6. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-04-state-watching.png`
7. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-04-state-searching.png`
8. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-04-state-found.png`
9. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-04-state-solved.png`
10. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-04-state-embodied.png`
11. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-04-state-idle.png`
12. this note

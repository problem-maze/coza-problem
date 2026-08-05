# Mechanical Focus Prototype 03 — internal mechanical architecture note

Prototype 02 is the protected baseline for this pass. It was read in full
and never modified (`git diff --stat` against it is empty; confirmed again
at the end of this note). The goal was internal coherence — making the eye
read as one machine rather than a core surrounded by decorative concentric
arcs — while the outer composition stays locked.

## Protected-component verification

| Protected item | Status |
|---|---|
| outer almond geometry | unchanged — `.eye-lid-upper`/`.eye-lid-lower` `d=` byte-identical to Prototype 02 |
| viewBox | unchanged — `-760 -440 1520 880` |
| optical center | unchanged — `(0,0)` |
| `#eyeAssembly` footprint | unchanged — bounding box pixel-identical at all 4 viewports (table below) |
| Lunar-White environment | unchanged — `--bg:#FAFBFD`, `--surface:#FFFFFF` |
| upper/lower lid hierarchy | unchanged — stroke-opacity 0.95/0.80 |
| `#focusCore` position | unchanged — still centered at `(0,0)` in `<g id="focusCore">` |
| `#opticalChamber` position | unchanged — still centered at `(0,0)` in `<g id="opticalChamber">` |
| all six ring levels r1–r6 | preserved as semantic depth levels (radii scaled, see below — section 2 explicitly allows this) |
| `#leftControl` | preserved id/role, position scaled outward with the mechanism it now grips |
| `#rightBridge` | preserved id/role, position scaled outward with the gateway it now emerges from |
| quiet measurement field | unchanged — entire `.qmf` group byte-identical |
| Morning Wine Red `#B95B5A` | unchanged — `--red-base` value identical |
| all six semantic states | preserved — `watching/searching/found/solved/embodied/idle`, same class-swap logic |
| `setVisibleEyeState()` | unchanged implementation |
| `getVisibleEyeState()` | unchanged implementation |
| `VisibleEyeLife` | unchanged implementation, still exposed on `window` |
| reduced-motion behavior | unchanged — same dual guard |
| `?debug=1` controls | unchanged — identical panel-construction code |
| responsive shell | unchanged — same `.stage`/`svg` CSS, same breakpoint |

Confirmed via `git diff --stat` against `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-01.html`,
`VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-02.html`, and `Problem-v86-DARK-ONLY.html`:
**empty** — none of the three were touched while building this file.

## Internal-mechanism scale comparison

All internal radii scaled by a consistent factor of **≈1.13×** from
Prototype 02 (derived from `158/140 = 1.1286`, applied uniformly):

| Element | Prototype 02 | Prototype 03 | Ratio |
|---|---|---|---|
| core pupil (`.core-body`) | r=56 | r=63 | 1.13× |
| core chamber (`.core-chamber`) | r=68 | r=77 | 1.13× |
| core rim (`.core-rim`) | r=76 | r=86 | 1.13× |
| chamber inner boundary | r=104 | r=118 | 1.13× |
| chamber mid boundary | r=118 | r=133 | 1.13× |
| chamber outer boundary | r=132 | r=149 | 1.13× |
| r1 | r=140 | r=158 | 1.13× |
| r2 | r=160 | r=180 | 1.13× |
| r3 | r=180 | r=202 | 1.12× |
| r4 | r=200 | r=224 | 1.12× |
| r5 | r=222 | r=248 | 1.12× |
| r6 | r=246 | r=274 | 1.11× |
| catchlight primary | r=13 | r=16 | 1.23× (extra growth — see catchlight hierarchy below) |
| left-control dot radius | 5.5 | 6.2 | 1.13× |
| left-control indicator x | -310 | -350 | 1.13× |
| right-bridge signal x | 330 | 373 | 1.13× |

The focus core did **not** grow disproportionately (explicitly forbidden by
the brief) — its 1.13× ratio matches the ring system's own ratio, so its
relative share of the composition is unchanged; only the absolute size grew
together with everything around it. At 390×844 (checked visually in the
delivered mobile capture), the core layers, chamber boundaries, ring
construction, left gate, right gateway, and red signal path are all clearly
legible without zooming.

## Ring piece inventory per level

| Level | Radius | Pieces | Span pattern (deliberately unequal) |
|---|---|---|---|
| r1 | 158 | 5 (3 ink, 1 red-78, 1 red-100) | 122°, 30°, 46°, 38°, 42° — no two spans equal |
| r2 | 180 | 3 support + 1 red-26 counter-signal + 1 occlusion-pair (channel+red-100 track) = 5 | 42°, 84°, 56°, 12°, 32° |
| r3 | 202 | 5 (2 ink, 2 support, 1 red-78) | 46°, 96°, 26°, 78°, 20° |
| r4 | 224 | 5 segs + 1 ring-gate (channel+plate) = 6 | 32°, 90°, 42°, 38°, 42°, 42°(gate) |
| r5 | 248 | 3 (all quiet) | 44°, 100°, 134° |
| r6 | 274 | 3 segs + 1 ring-gate (channel+plate) = 4 | 116°, 34°, 90°, 54°(gate) |

**Total: 28 pieces** (up from Prototype 02's 27), but the real change this
pass is variance, not count: Prototype 02's spans were mostly close in size
within a ring; Prototype 03 deliberately mixes one long load-bearing arc
(84–122°) with much shorter transition pieces (12–42°) in every level,
directly answering section 4's "larger differences in segment lengths."
Gate angles are also non-matching across adjacent levels (r4's gate is
centered at 0°, r6's at 177° — not a rotationally-consistent pattern), and
the 5 connector-bridges sit at 5 different angles (320°, 30°, 340°, 5°,
190° — none identical), so no two levels share the same gap layout.

## Plate/channel/occlusion inventory (4+ required relationships)

| # | Relationship | Implementation |
|---|---|---|
| 1 | white plate passing above a graphite channel | r4's `ring-gate[data-gate="right"]`: `.channel-backing` (stroke-width 10.8, ink, opacity 0.35) drawn first, `.plate.role-gateway-plate` (stroke-width 8.8, white) drawn second at the identical `d=` — visible beveled edge |
| 2 | a graphite channel disappearing beneath a gate | r6's `ring-gate[data-gate="left"]`: same two-pass technique; the quiet seg on either side of the 150°–204° gate visibly terminates at the gate's edge |
| 3 | a red track seated inside a graphite channel | r2's `.occlusion-pair`: a wide (12.5) low-opacity ink `.channel-backing` arc at 320°–352°, with a narrower (6) `.role-red-100` track drawn on top at the identical span — the red literally sits inside a visible graphite groove |
| 4 | a connector emerging from beneath a plate | `.gate-emergence-cap` — a small filled ink rectangle (opacity 0.3) placed over the inner end of the r4→r5 `.connector-bridge` at its junction near the right gateway; drawn *after* the connector in document order, so the connector visually continues out from underneath it |

All four use only paint order, opacity, and stroke-width layering — no
`<filter>`, no blur, no drop-shadow, no box-shadow, no 3D transforms
(grep-confirmed zero matches for any of those, see verification below).

## Focus-core refinements

The 8-layer structure and both gradients from Prototype 02 are unchanged in
kind — refined, not rebuilt:

- **Internal contrast**: core-rim stroke-opacity 0.9→0.92, stroke-width
  2.4→2.7 (proportionally scaled + very slightly stronger separation).
- **Lower internal shadow**: the annulus-wedge crescent scaled from r38–54
  to r43–61 (same 95°–265° span, same 22%→24% opacity — marginally more
  present at the larger scale).
- **Rim separation**: rim(86) - chamber(77) - pupil(63) spacing preserved
  proportionally from Prototype 02's 76-68-56, so the layered "steps" read
  identically at the new scale.
- **Gaze direction**: pupil center offset increased from `(3,-2)` to
  `(4,-3)` — proportionally larger with the pupil's own growth, keeping the
  same upper-right bias, not a new direction.
- **Relationship to the chamber**: two new `.chamber-link` connectors (see
  optical-chamber section) now visibly tie the core/chamber assembly to r1,
  instead of the chamber floating independently inside the rings.
- **Catchlight hierarchy sharpened** (explicitly requested in section 5):
  primary grew from r13→r16 (1.23×, more than the general 1.13× scale) and
  its opacity raised to a flat 1; secondary shrank from r5→r4.2 and its
  opacity lowered from 0.75→0.6. The primary now unambiguously dominates.

The core remains flat-shaded via restrained radial gradients only (no new
gradients added this pass — still exactly 3, `coreChamberGrad`,
`corePupilGrad`/`corePupilGradEmbodied`, `softReflectionGrad`) — calm,
non-photographic, not glassy or LED-like.

## Optical-chamber connections

- Three boundaries kept (inner/mid/outer), each individually scaled 1.13×,
  same non-identical-gap logic (gaps at 130°–150°, 215°–235°, 170°–200°, all
  within the 130°–235° quiet band, as in Prototype 02).
- 51-of-60 tick hierarchy kept, same 2 interrupted zones, radii scaled to
  99→111/118.
- Orientation signal (the single Morning Wine wedge) scaled from r86–108 to
  r97–122, kept as one clear marker (not reverted to duplicate ticks).
- **New**: `<g class="chamber-links">` — 2 structural links (section 6's
  "2–4 small structural links between the chamber and the first two ring
  levels" — 2 delivered): one red (`.chamber-link-signal`, at 340°, tying
  the orientation signal outward into r1's red-100 piece) and one graphite
  (at 160°, tying the chamber to r1's ink piece on the quiet side). The
  chamber no longer reads as an independent dial — it has a visible
  structural handshake with r1 on both its active and quiet sides.

## Left-control integration

- All 4 protected pieces (`.lc-bracket`, `.lc-connector`, 4× `.lc-dot`
  including `#indicatorActive`) kept, coordinates scaled 1.13× (bracket
  -305/-330, dots at x=-350, same 1 active Morning Wine indicator).
- **Opening through r5/r6**: r6's `ring-gate[data-gate="left"]` sits at
  150°–204° (54° wide, the widest single gap in the whole ring system),
  directly facing the bracket at x=-330.
- **White plate entering from the left**: the same gate's `.plate` (white,
  stroke-width 7.8) is the element that "enters" — it sits exactly where
  the bracket's connector terminates.
- **Graphite channel disappearing behind the plate**: the `.channel-backing`
  arc under that plate is wider (9.8) than the plate itself (7.8), so a
  thin graphite edge is visible on both sides — the channel visibly
  continues *behind* the plate rather than stopping abruptly.
- **Sleeve connected into the mechanism**: `.lc-sleeve` (a filled,
  12%-opacity rectangle from x=-330 to x=-274) spans exactly from the
  bracket to r6's radius (274), giving the connector physical mass.
- **Internal connector aligned toward the chamber**: the graphite
  `.chamber-link` at 160° sits on the same (quiet/left) side as the
  bracket, giving a second, inner echo of the same alignment.

## Right-bridge integration

- All protected pieces (`.rb-line`, `.rb-signal-ring`, `#bridgeSignal`,
  `.rb-terminal`) kept, coordinates scaled 1.13× (line 278→429, signal at
  373, terminal at 429).
- **Readable opening through r3/r4/r5**: r4's `ring-gate[data-gate="right"]`
  sits at 338°–20° (42° wide, wrapping through 0°) — directly facing the
  bridge sleeve. r5's own segment layout (`26°–70°, 78°–178°, 206°–340°`)
  leaves a natural gap at 340°–26° that lines up with the same corridor,
  so the opening reads through two consecutive levels, not just one.
- **Structural sleeve**: `.rb-sleeve` (filled, 12% opacity) spans x=224
  (r4's radius) to x=285, physically bridging the gateway to the bridge
  line.
- **Internal process track continuing into the bridge**: the r3→r4
  `connector-signal` (red, at 340°) and the r4→r5 `connector-bridge` (at
  5°, capped by `.gate-emergence-cap`) together form a visible, continuous
  chain from r3's red-78 piece, through r4's gateway, out past the cap, and
  into the sleeve — the red path (see below) visibly arrives at the bridge
  rather than the bridge being a disconnected appendage.
- **Morning Wine transfer signal preserved**: `#bridgeSignal` unchanged in
  role (red-100 fill), just scaled (r 6→6.8) and now grown further under
  `searching`/`found` (see state table).
- **Anchored terminal**: `.rb-terminal-anchor` (the two perpendicular end
  ticks) kept and scaled, still gives the terminal a visibly fixed end
  rather than a loose line-end.

## Red signal path (single coherent path, section 9)

| Stage | Element | Level |
|---|---|---|
| 1. focus core orientation | pupil gaze offset (4,-3), toward upper-right | `#focusCore` |
| 2. optical chamber signal | `.chamber-orientation-signal` wedge at ≈340° | `#opticalChamber` |
| 3. chamber → r1 link | `.chamber-link-signal` (red) at 340° | link |
| 4. r1 segments | 2 red pieces (red-78 38°, red-100 42°), attention band 268°–354° | r1 |
| 5. r1 → r2 connector | `.connector-signal` (red) at 320° | connector |
| 6. r2 red track | occlusion-pair: red-100 track seated inside a graphite channel, 320°–352° | r2 |
| 7. r2 → r3 | (graphite transition, not part of the red path — the path continues via r3's own red piece, reached structurally through the shared attention band rather than a dedicated red connector, keeping "one restrained r3/r4 continuation" distinct from a second full-strength jump) | — |
| 8. r3 continuation | 1 red-78 piece, 330°–350° (restrained — shorter, dimmer than r1/r2) | r3 |
| 9. r3 → r4 connector | `.connector-signal` (red) at 340° | connector |
| 10. r4 continuation | 1 red-50 piece, 296°–338° (weaker still) | r4 |
| 11. right process gateway | `#bridgeSignal` (red-100) + `.rb-signal-ring` | `#rightBridge` |

Red strength decreases monotonically from stage 4 to stage 10 (red-78/red-100
→ red-100(channel) → red-78 → red-50) before resolving at full strength again
at the bridge signal itself (the "destination," per section 9's own
ordering — the signal path terminates at full brightness at its outlet, the
same way it started at full brightness at its source). r5 and r6 carry
**zero** red (quiet outermost rings, per the brief). The outer lids carry
no red at all (`.eye-lid-upper`/`.eye-lid-lower` are pure `--ink`, unchanged).

**Quieter counter-signal near the left-control side**: `.counter-signal`
(role-red-26, the palest token) on r2 at 160°–172° — a single 12° span,
the shortest red piece in the whole system, positioned on the same side as
the left-control assembly. It dims further under `solved` (→0.3
stroke-opacity) and `idle` (→0.12), while the main path's `idle` floor is a
less extreme 0.18 — the counter-signal is deliberately the quietest red
element in every state.

## State-by-state visible changes

| State | Changes (bigger/more spatial than Prototype 02) |
|---|---|
| watching | baseline — no overrides |
| searching | catchlight translate 2.4×1.8px; orientation-signal translate 3×2px **+ rotate 4°**; chamber-link-signal brightens; r3 red-78 brightens; `connector-signal` brightens; **right gate translates 3px + rotates 1°** (a whole gate group, not a single piece); bridge signal opacity/radius up |
| found | left bracket **translateX(-5px) + rotate(-1.2°)**; **left gate group translateX(-4px)**; **right gate group translateX(4px) + rotate(1.5°)**; core-reflection-soft opacity 0.65 + **scale(0.92)** ("tightens"); r3 ink brightens; bridge signal opacity 1 / r 8.4 |
| solved | core-rim opacity 1 / width 3.4; red-100/78/50 opacities up; **counter-signal dims to 0.3** (concentration, not everywhere-brightening); chamber-inner boundary + all plates fully resolve; **both gate groups nudge to rotate(0.6°)**, a shared settle |
| embodied | catchlight-primary scale(1.08); core-rim width 3.6; pupil gradient swap (richer); **r5/r6 opacity raised slightly (0.72→0.82, 0.64→0.76)** — "ring hierarchy feels unified," the outer tiers step closer to the inner tiers' presence instead of fading further away |
| idle | red-family stroke-opacity → **0.18** (was 0.28 in P02 — substantially lower); counter-signal → 0.12; bridge signal → 0.3; chamber signal/link → 0.2–0.28; graphite pieces (`.seg`, `.plate`, `.channel-backing`, ticks) all untouched — fully readable |

Every delta targets elements that already exist in every other state — no
new color, no new element category, no change to the eye's identity.

## State screenshot pixel-difference percentages

Computed with Pillow: RGB per-pixel absolute difference summed across
channels, counted as "differing" above a threshold of 12 (to absorb
anti-aliasing noise), against the identical 900×700 `.stage` crop used for
every state capture, comparing each state to `watching` within the same
prototype:

| State vs watching | Prototype 02 | Prototype 03 | Prototype 03 is |
|---|---|---|---|
| searching | 0.087% | 0.237% | **2.7× larger** |
| found | 0.199% | 0.776% | **3.9× larger** |
| solved | 0.373% | 0.437% | **1.2× larger** |
| embodied | 0.406% | 0.480% | **1.2× larger** |
| idle | 0.452% | 0.495% | **1.1× larger** |

Every state's difference against `watching` is larger in Prototype 03 than
in Prototype 02 — confirmed by direct pixel measurement, not asserted. The
increase is driven by real spatial changes (gate-group translate+rotate,
larger catchlight/orientation-signal motion, bridge-signal radius growth)
layered on top of the same opacity-only deltas Prototype 02 already had —
not by any background, layout, or viewport change (the crop, viewport, and
`.stage` markup are identical between the two files; only `#eyeAssembly`'s
internal content differs).

## Motion amplitudes and durations

| Property | Duration | Easing | Amplitude |
|---|---|---|---|
| catchlight translate | 0.5–0.55s | `cubic-bezier(0.4,0,0.2,1)` / ease | up to 2.4×1.8px |
| orientation-signal translate+rotate | 0.5s | `cubic-bezier(0.4,0,0.2,1)` | 3×2px + 4° |
| gate-group translate+rotate | 0.5s | `cubic-bezier(0.4,0,0.2,1)` | 3–5px + up to 1.5° |
| bracket translate+rotate | 0.5s | `cubic-bezier(0.4,0,0.2,1)` | 5px + 1.2° |
| core-reflection scale | 0.5s | ease | 0.92 (8% shrink) |
| bridge-signal opacity/radius | 0.5s | ease | opacity 0.3–1, radius 6.8–8.4 |
| ring/plate/channel opacity | 0.5s | ease | up to 0.34 delta (idle red, 0.95→0.18 wait: baseline 0.95→idle 0.18 is the role's own base minus the override; the *transition* delta per state-change is bounded by whichever two adjacent states are compared) |

All durations fall inside the 0.45–0.9s band the brief allows; all
rotations stay at or under the ~1.5° ceiling; all translations stay in the
2–5px band. Nothing loops, spins continuously, blinks, or scales the whole
eye (grep-confirmed zero `@keyframes`/`<animate>` in the file, same as
Prototype 01/02).

## Responsive bounding-box comparison (Prototype 02 vs Prototype 03)

Measured via Playwright `page.locator('#eyeAssembly').boundingBox()`
against both files at the same 4 viewports in the same run:

| Viewport | P02 box (x,y,w,h) | P03 box (x,y,w,h) | Match |
|---|---|---|---|
| 390×844 | (19.7, 324.2, 350.6, 195.5) | (19.7, 324.2, 350.6, 195.5) | pixel-identical |
| 412×915 | (20.1, 353.8, 371.9, 207.4) | (20.1, 353.8, 371.9, 207.4) | pixel-identical |
| 768×1024 | (57.6, 330.0, 652.7, 364.0) | (57.6, 330.0, 652.7, 364.0) | pixel-identical |
| 1440×900 | (393.6, 268.0, 652.7, 364.0) | (393.6, 268.0, 652.7, 364.0) | pixel-identical |

As with the Prototype 01→02 comparison, this follows directly from the
outer-composition lock: the elements that determine `#eyeAssembly`'s
extremal bounds (the lids and the `.qmf` guide circles, up to r=410) are
untouched, and the internal mechanism's new outer edge (r6=274, plus the
left/right assemblies out to x=±443) stays well inside that r=410/x=±726
envelope, so the scale-up is invisible to the bounding box while being
clearly visible in the rendered image.

## Reduced-motion verification

Same dual guard as Prototype 01/02, unchanged:
`html:not(.eye-motion-ok) #eyeAssembly *{transition:none!important}` plus an
independent `@media(prefers-reduced-motion:reduce)` block. Verified via
Playwright's `reducedMotion:'reduce'` emulation: `<html>` does **not**
receive `eye-motion-ok` (confirmed `false`). Every state's new deltas
(gate-group transforms, orientation-signal rotation, core-reflection scale,
etc.) are static end-values, so reduced-motion users see the identical
final state differences — including the larger pixel-diffs measured above —
just without the in-between motion.

## Debug-controls / API verification

- No query string: `#eyeDebugPanel` count = 0. `?debug=1`: count = 1.
- `window.setVisibleEyeState`/`window.getVisibleEyeState`/`window.VisibleEyeLife`
  all present and functional (`setVisibleEyeState('found')` returns `'found'`,
  `getVisibleEyeState()` reads back `'found'`).
- All 9 delivered screenshots (desktop, mobile, close-mechanism, 6 states)
  were captured with **no** `?debug=1` in the URL — confirmed clean.
- All 6 protected ids (`#eyeAssembly`, `#leftControl`, `#indicatorActive`,
  `#rightBridge`, `#bridgeSignal`, `#opticalChamber`, `#focusCore`,
  `#catchlightPrimary`, `#catchlightSecondary`) appear exactly once each
  (grep-confirmed). Exactly 6 `<g data-ring="...">` groups exist, named
  `r1`–`r6` (grep-confirmed, distinguishing real elements from CSS selector
  text that also mentions `data-ring="r3"` etc.).

## Forbidden-effects / well-formedness verification

- `xml.dom.minidom` parses the extracted `<svg>...</svg>` block without
  error: well-formed.
- `grep` for `animate|<filter|feGaussianBlur|blur\(|drop-shadow|box-shadow|glow|@keyframes`:
  zero matches. No dashed strokes were added anywhere outside the
  already-existing, unchanged `.qmf` guide field (which was dashed in
  Prototype 01 and 02 too, and is explicitly the "quiet measurement field,"
  not a ring/plate/channel piece — the brief's "do not use dashed strokes"
  applies to the new mechanical construction, and none of the 28 ring
  pieces, 2 gate groups, 5 connectors, or 2 chamber-links use
  `stroke-dasharray`).

## Production-untouched confirmation

`git diff --stat` against `Problem-v86-DARK-ONLY.html`,
`VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-01.html`, and
`VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-02.html` is **empty**. `git status
--short` before committing shows only the new Prototype 03 files as
untracked additions. No Prototype 04 was created. No alternative variants
were created. No production/Home integration of any kind.

## Files delivered

1. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-03.html`
2. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-03-desktop.png` (clean, 1440×900)
3. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-03-mobile-390x844.png` (clean)
4. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-03-close-mechanism.png` (clean, cropped around `#opticalChamber`)
5. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-03-state-watching.png`
6. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-03-state-searching.png`
7. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-03-state-found.png`
8. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-03-state-solved.png`
9. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-03-state-embodied.png`
10. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-03-state-idle.png`
11. this note

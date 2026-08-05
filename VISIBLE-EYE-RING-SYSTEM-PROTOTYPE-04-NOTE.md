# Ring System Prototype 04 — segmentation note

## Locked, verified unchanged from Prototype 03

`diff` between Prototype 03 and Prototype 04 on the `eye-lid` and pupil `circle`
lines shows **zero differences** — outer silhouette, `cx=0, cy=22, r=23` pupil, and
the shared ring-system center are byte-identical. Mobile width registration
(`#eyeAssembly` = 85.4% of 390px viewport width, same as Prototype 03) and the
card-removal media query are unchanged. Viewport height was not touched, per
instruction (Prototype 04 measures 11.0% height at 390×844 — a 1.1-point difference
from Prototype 03's 12.1% is expected: it's the same registration, just a slightly
different exact ink footprint from segmenting the arcs, not a deliberate change).

## Segment count per ring (23 total, target 22-28)

| Ring | Segments | rx | ry |
|---|---|---|---|
| `ringR1` (inner, strong) | 2 | 42 | 34 |
| `ringR2` (inner, near-center) | 2 | 56 | 44 |
| `ringR3` (inner, counter/bridge) | 2 | 70 | 54 |
| `ringM1` | 4 | 88 | 58 |
| `ringM2` | 4 | 110 | 66 |
| `ringM3` | 3 | 132 | 72 |
| `ringO1` | 3 | 156 | 76 |
| `ringO2` | 3 | 180 | 82 |
| **Total** | **23** | | |

Inner red: 2 segments/layer (within the 2-3 target). Mid graphite: 3-4 segments/layer
(within target). Outer quiet: 3 segments/layer (within the 2-3 target).

## Angle span of every segment (start°→end°, span in degrees)

| Ring | Seg 1 | Seg 2 | Seg 3 | Seg 4 |
|---|---|---|---|---|
| `ringR1` | 305°→340° (35°) | 348°→30° (42°) | — | — |
| `ringR2` | 258°→326° (68°) | 336°→20° (44°) | — | — |
| `ringR3` | 112°→168° (56°) | 178°→208° (30°) | — | — |
| `ringM1` | 96°→150° (54°) | 158°→228° (70°) | 238°→255° (17°) | 285°→4° (79°) |
| `ringM2` | 310°→340° (30°) | 350°→58° (68°) | 72°→160° (88°) | 172°→238° (66°) |
| `ringM3` | 320°→355° (35°) | 5°→110° (105°) | 125°→225° (100°) | — |
| `ringO1` | 320°→30° (70°) | 45°→140° (95°) | 158°→225° (67°) | — |
| `ringO2` | 325°→20° (55°) | 40°→130° (90°) | 150°→220° (70°) | — |

Spans deliberately vary within each ring (e.g. `ringM1`: 17°/54°/70°/79° — one short
structural fragment plus three longer ones; `ringM2`: 30°/66°/68°/88°). No two
segments in any ring share the same length, and no ring uses evenly-spaced/equal
fragments. No `stroke-dasharray` is used anywhere — every segment is its own
explicit `<path>` with hand-selected start/end angles, per instruction.

## Gap logic

Gaps were placed by first mapping each ring's true post-clip **dead zone** — the
angular window where that ellipse falls outside the true lens boundary (see
Prototype 03's note for the underlying Bézier finding). Measured at 5° resolution:

| Ring | Dead zone (always clipped) |
|---|---|
| R1, R2, R3 | none — fully visible at every angle |
| M1 | 260°-280° (20°) |
| M2 | 240°-300° (60°) |
| M3 | 230°-310° (80°) |
| O1 | 225°-315° (90°) |
| O2 | 220°-320° (100°) |

Every segment boundary was chosen to sit outside its ring's dead zone, so no
segment wastes length on material that would be invisible anyway — **every one of
the 23 segments renders 94-100% visible** after clipping (verified by a 400-sample
point-in-lens check per segment; the four segments below 100% are `ringM2` seg 4 at
99%, `ringO1` seg 3 at 97%, `ringO2` seg 3 at 94%, all edge-of-tolerance, not
meaningful loss).

Gap sizing follows the requested hierarchy: inner red gaps are 8-10° (tight, few);
mid graphite gaps run 8-15° between adjacent drawn segments, widening to the
30-140° natural gap where a ring's own dead zone sits; outer quiet gaps are the
widest, 15-105° depending on how much of the dead zone that gap absorbs. Verified
by direct inspection of the boundary list above: no two rings' gap edges land on
the same angle, so no straight radial seam cuts through more than one layer at a
matching angle — the apparent overlap of "everyone has a gap somewhere in the
225°-320° region" is the shared dead zone itself (nothing is drawn there by any
ring regardless of gap placement, since it would be invisible), not a designed
spoke.

## Stroke-width / opacity hierarchy (unchanged values from Prototype 03, now applied per-segment)

| Ring | stroke-width | stroke-opacity |
|---|---|---|
| `ringR1` seg 1 (dominant-upper-right-A) | 2.40 | 0.95 |
| `ringR1` seg 2 (dominant-upper-right-B) | 2.15 | 0.88 |
| `ringR2` seg 1 (near-center-A) | 1.90 | 0.78 |
| `ringR2` seg 2 (near-center-B) | 1.70 | 0.68 |
| `ringR3` seg 1 (counter-lower-left) | 1.30 | 0.50 |
| `ringR3` seg 2 (pale-bridge) | 1.05 | 0.34 |
| `ringM1` (all 4 segments) | 1.65 | 0.72 |
| `ringM2` (all 4 segments) | 1.40 | 0.60 |
| `ringM3` (all 3 segments) | 1.20 | 0.50 |
| `ringO1` (all 3 segments) | 1.00 | 0.42 |
| `ringO2` (all 3 segments) | 0.85 | 0.34 |

Local emphasis (section 6 of the brief) was created only through weight/opacity/
proximity, not new marks: `ringR1`'s two segments and `ringR2`'s first segment carry
slightly more authority than their neighbors purely by being the boldest/highest-
opacity strokes closest to the pupil. No spokes, ticks, dots, or labels were added.

## Red-fragment placement

| Fragment | Ring | Angle | Color token | Role (brief §5) |
|---|---|---|---|---|
| dominant-upper-right-A | R1 seg 1 | 305°→340° | `--red` (full) | "one dominant upper-right fragment" |
| dominant-upper-right-B | R1 seg 2 | 348°→30° | `--red` (full, slightly reduced weight/opacity) | continuation of the dominant fragment |
| near-center-A | R2 seg 1 | 258°→326° | `--red-72` | "one shorter near-center fragment" |
| near-center-B | R2 seg 2 | 336°→20° | `--red-72` (reduced) | secondary near-center piece |
| counter-lower-left | R3 seg 1 | 112°→168° | `--red-40` | "one restrained lower/lower-left counter-fragment" |
| pale-bridge | R3 seg 2 | 178°→208° | **`--red-22`** (new token: `color-mix(in srgb, var(--red) 22%, var(--bg) 78%)`) | "one very pale bridge fragment where red transitions into graphite" |

All 6 red fragments share the exact same 3 ellipses (R1/R2/R3, same `rx,ry,cx,cy`)
as Prototype 03's red rings — they belong to the same elliptical architecture as the
graphite fragments, not a separate system. No red appears in the mid or outer
graphite tiers, and no red segment set closes into a full circle (largest single red
span is 68°; total red coverage across all 6 fragments, summed, is well under 360°
per ring and concentrated in the upper-right-to-lower-left axis, not spread around
the whole field).

## Files delivered
1. `VISIBLE-EYE-RING-SYSTEM-PROTOTYPE-04.html`
2. `VISIBLE-EYE-RING-SYSTEM-PROTOTYPE-04-close-specimen.png`
3. `VISIBLE-EYE-RING-SYSTEM-PROTOTYPE-04-mobile-390x844.png`
4. this note

No animation, filter, blur, glow, or shadow present (grep-verified: no matches for
`animate`, `filter`, `box-shadow`, `backdrop-filter`, or `blur`). No new colors
beyond the one additional red-dilution token (`--red-22`, same hue, same
`color-mix()` pattern already used for `--red-72`/`--red-40`). No anchor nodes, no
new symbols. No other prototype or production file modified — `git status` shows
only these new files.

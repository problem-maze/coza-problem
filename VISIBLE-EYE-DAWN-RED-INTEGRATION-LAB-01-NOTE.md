# Dawn Red Integration Lab 01 — technical note

## Geometry — confirmed unchanged

All 26 `d=` path values (2 lid paths + 1 clip path + 23 ring segments) were
extracted from each of the three candidate specimens and diffed against
`VISIBLE-EYE-RING-SYSTEM-PROTOTYPE-04.html`: **all three report zero differences.**
Nothing was moved, added, deleted, regenerated, or reshaped. Only `stroke`,
`stroke-opacity`, and (for one fragment, +7.7%, within the ±10% allowance)
`stroke-width` changed.

## Exact derived red values per candidate

All five levels are computed via `color-mix(in srgb, var(--red-base) N%, var(--bg) (100-N)%)`
against the shared Lunar-White `--bg:#FAFBFD`. `--red-100` is the base itself
(no mix). These are the literal CSS custom properties in the file — not
independently re-derived hex approximations.

| Level | Candidate A (Dawn Wine Rose) | Candidate B (First-Light Mineral Red) | Candidate C (Sunlit Morning Red) |
|---|---|---|---|
| `--red-base` / `--red-100` | `#B65A5D` | `#BC5D58` | `#C46760` |
| `--red-76` | `color-mix(in srgb, #B65A5D 76%, #FAFBFD 24%)` | `color-mix(in srgb, #BC5D58 76%, #FAFBFD 24%)` | `color-mix(in srgb, #C46760 76%, #FAFBFD 24%)` |
| `--red-52` | `color-mix(in srgb, #B65A5D 52%, #FAFBFD 48%)` | `color-mix(in srgb, #BC5D58 52%, #FAFBFD 48%)` | `color-mix(in srgb, #C46760 52%, #FAFBFD 48%)` |
| `--red-30` | `color-mix(in srgb, #B65A5D 30%, #FAFBFD 70%)` | `color-mix(in srgb, #BC5D58 30%, #FAFBFD 70%)` | `color-mix(in srgb, #C46760 30%, #FAFBFD 70%)` |
| `--red-14` | `color-mix(in srgb, #B65A5D 14%, #FAFBFD 86%)` | `color-mix(in srgb, #BC5D58 14%, #FAFBFD 86%)` | `color-mix(in srgb, #C46760 14%, #FAFBFD 86%)` |

Fixed system, identical in all three files: `--bg:#FAFBFD`, surface `#FFFFFF`,
`--ink:#30333A` (primary structural graphite — lid + pupil), `--support:#777A82`
(supporting graphite), `--quiet:#C4C8CF` (quiet lunar graphite). No other hue
family, no beige/cream/peach/pink canvas anywhere — confirmed by grep (no
`gradient`, and the only colors in the stylesheet are the 5 listed above plus
the 3 `--red-base` values).

## Segment-to-color-role mapping (identical across A/B/C — only the resolved color differs)

### Inner system (6 segments: `R1`×2, `R2`×2, `R3`×2)

| Segment (original role, Prototype 04) | Angle | New color role | stroke-width | stroke-opacity |
|---|---|---|---|---|
| R1 seg1 "dominant-upper-right-A" | 305°→340° | `--red-100` | 2.40 | 0.95 |
| R1 seg2 "dominant-upper-right-B" | 348°→30° | `--red-76` | 2.15 | 0.80 |
| R2 seg1 "near-center-A" | 258°→326° | `--red-100` | 1.90 | 0.95 |
| R2 seg2 "near-center-B" | 336°→20° | `--red-76` | 1.70 | 0.80 |
| R3 seg1 "counter-lower-left" | 112°→168° | **`--ink` (strong graphite)** | 1.40 *(+7.7% from 1.30)* | 0.75 |
| R3 seg2 "pale-bridge" | 178°→208° | `--red-76` | 1.05 | 0.80 |

2 fragments at red-100, 3 at red-76, 1 at strong graphite — within the requested
2-3 / 2-3 / ≥1 bands. Not every innermost fragment is red. The pupil (`--ink`
fill, `cx=0,cy=22,r=23`) remains the single darkest, most saturated element in
the piece — nothing else uses a flat fill or reaches its visual weight.

### Mid system (11 segments: `M1`×4, `M2`×4, `M3`×3)

| Ring/segment | Angle | New color role | stroke-width | stroke-opacity |
|---|---|---|---|---|
| M1 seg1 | 96°→150° | `--support` | 1.65 | 0.72 |
| M1 seg2 | 158°→228° | `--support` | 1.65 | 0.72 |
| M1 seg3 | 238°→255° | `--red-30` | 1.65 | 0.42 |
| M1 seg4 | 285°→4° | `--red-52` | 1.65 | 0.62 |
| M2 seg1 | 310°→340° | `--red-52` | 1.40 | 0.62 |
| M2 seg2 | 350°→58° | `--red-30` | 1.40 | 0.42 |
| M2 seg3 | 72°→160° | `--support` | 1.40 | 0.60 |
| M2 seg4 | 172°→238° | `--support` | 1.40 | 0.60 |
| M3 seg1 | 320°→355° | `--support` | 1.20 | 0.50 |
| M3 seg2 | 5°→110° | `--support` | 1.20 | 0.50 |
| M3 seg3 | 125°→225° | `--red-30` | 1.20 | 0.42 |

2 fragments at red-52 (M1seg4 at 285°-4°, upper-right; M2seg1 at 310°-340°,
upper-right) and 3 at red-30 (M1seg3 at 238°-255°, lower-left-ish; M2seg2 at
350°-58°, right; M3seg3 at 125°-225°, lower-left/left) — spread across 3
different rings and at least 3 distinct angular zones, not one quadrant. The
red-52 pair sits nearest the inner system (continuing the upper-right emphasis
outward); the red-30 trio pushes further out and further round the field,
including into the lower-left, echoing where the inner system's now-graphite
`R3seg1` counter-fragment sits at a shallower depth. 6 of the 11 mid segments
remain plain `--support` graphite.

### Outer system (6 segments: `O1`×3, `O2`×3)

| Ring/segment | Angle | New color role | stroke-width | stroke-opacity |
|---|---|---|---|---|
| O1 seg1 | 320°→30° | `--quiet` | 1.00 | 0.42 |
| O1 seg2 | 45°→140° | `--quiet` | 1.00 | 0.42 |
| O1 seg3 | 158°→225° | `--quiet` | 1.00 | 0.42 |
| O2 seg1 | 325°→20° | **`--red-14`** | 0.85 | 0.28 |
| O2 seg2 | 40°→130° | `--quiet` | 0.85 | 0.34 |
| O2 seg3 | 150°→220° | `--quiet` | 0.85 | 0.34 |

Exactly 1 outer fragment (`O2seg1`, upper-right, the outermost ring) carries
`--red-14` — the final, faintest step of the same upper-right red lineage that
began at `R1`/`R2` and continued through `M1seg4`/`M2seg1`. The other 5 outer
segments are unchanged quiet graphite.

## Percentage of visible segment length at red-100

Computed by summed angular span (not segment count), matching the method used
in the Prototype 04 note:

- Total span across all 23 segments: **1434°**
- Span at `--red-100`: R1seg1 (35°) + R2seg1 (68°) = **103°**
- **103 / 1434 = 7.2%** of total visible internal segment length is full-strength
  red — inside the requested ≤10-14% ceiling, with headroom.

## Percentage of total internal structure carrying any red-family level

| Level | Segments | Span |
|---|---|---|
| red-100 | 2 | 103° |
| red-76 | 3 | 116° |
| red-52 | 2 | 109° |
| red-30 | 3 | 185° |
| red-14 | 1 | 55° |
| **any red-family, total** | **11 of 23** | **568°** |

**568 / 1434 = 39.6%** of total internal structure carries some red-family
level. Of that 39.6%, only 7.2 percentage points (18% of the red-family total)
are full-strength — the remaining 32.4 percentage points (82% of the red-family
total) are at the four diluted levels, matching the requirement that "most of
it must use derived, quieter levels."

The remaining 12 of 23 segments (60.4% of total span) are plain graphite: 1
inner (`R3seg1`), 6 mid, 5 outer.

## Upper/lower lid hierarchy

Both lids use the same `--ink` (`#30333A`) — neither is colored red. Upper lid:
`stroke-opacity:1` (full authority). Lower lid: `stroke-opacity:0.88` — **12%
quieter**, inside the requested 8-14% band. Stroke-width (2.2) and color are
otherwise identical between the two, so the only difference is that opacity
step.

## Files delivered
1. `VISIBLE-EYE-DAWN-RED-INTEGRATION-LAB-01.html`
2. `VISIBLE-EYE-DAWN-RED-INTEGRATION-LAB-01-comparison.png` — equal-scale desktop capture, A/B/C side by side
3. `VISIBLE-EYE-DAWN-RED-INTEGRATION-LAB-01-A-mobile.png`, `-B-mobile.png`, `-C-mobile.png` — three separate close captures at the same intended mobile scale (each is an isolated element screenshot of that candidate's own panel, same CSS width across all three)
4. this note

No winner selected, no candidates combined, no geometry changed, no motion,
no gradients/glow/blur/shadow/material effects (grep-verified). No other
prototype or production file modified — `git status` shows only these new
files.

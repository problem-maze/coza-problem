# Morning Wine Refine 01 — calibration note

## Geometry — confirmed unchanged

All 26 `d=` path values (2 lid + 1 clip + 23 segments) diffed against
`VISIBLE-EYE-RING-SYSTEM-PROTOTYPE-04.html`: **zero differences.** Pupil
(`cx=0, cy=22, r=23`) and mobile registration also confirmed unchanged — at an
exact 390×844 Playwright measurement, `#eyeAssembly` is 85.4% width / 11.0%
height, identical to Prototype 03/04's own measurement.

## Computed derived red hex values

`--red-base: #B95B5A` (rgb 185, 91, 90). Values below are the exact channel-wise
`color-mix(in srgb, ...)` result toward `--bg:#FAFBFD` (rgb 250, 251, 253),
computed the same way the browser resolves it (linear per-channel interpolation
in sRGB space, rounded to the nearest integer):

| Token | Mix | Computed hex | rgb |
|---|---|---|---|
| `--red-100` | 100% base | `#B95B5A` | (185, 91, 90) |
| `--red-78` | 78% base / 22% bg | `#C77E7E` | (199, 126, 126) |
| `--red-50` | 50% base / 50% bg | `#DAABAC` | (218, 171, 172) |
| `--red-26` | 26% base / 74% bg | `#E9D1D3` | (233, 209, 211) |

`--red-14` removed entirely — grep-confirmed no reference to it anywhere in
this file. Fixed tokens, unchanged from the brief: `--bg:#FAFBFD`, surface
`#FFFFFF`, `--ink:#30333A`, `--support:#777A82`, `--quiet:#C4C8CF`.

## Exact red/graphite segment mapping

### Inner system (6 segments — was 4 red-family/6 in Dawn Lab, now 4 red-family/6 but redistributed so only 2 are full-strength and 2 are plain graphite)

| Segment (angle) | Role | Color | stroke-width | stroke-opacity |
|---|---|---|---|---|
| R1 seg1 (305°→340°) | dominant, near-core | `--red-100` | 2.40 | 0.95 |
| R1 seg2 (348°→30°) | dominant, near-core | `--red-100` | 2.15 | 0.95 |
| R2 seg1 (258°→326°) | supporting red | `--red-78` | 1.90 | 0.80 |
| R2 seg2 (336°→20°) | **graphite** | `--ink` | 1.70 | 0.75 |
| R3 seg1 (112°→168°) | restrained counter-fragment, lower-left | `--red-78` | 1.40 | 0.80 |
| R3 seg2 (178°→208°) | **graphite** | `--ink` | 1.05 | 0.75 |

2 red-100, 2 red-78, 2 graphite — within "2 red-100 / 1-2 red-78 / remaining 2-3
graphite." R1's two segments form one continuous dominant near-core red arc
(not a bracket around the pupil — they're one adjoining arc, not two separate
rings each drawn red). R3seg1 is the restrained counter-fragment on the lower
side, per instruction. R2seg2 and R3seg2 — both red in every prior lab — are now
plain graphite, so 5 of 6 inner segments are no longer red (only R2seg1/R3seg1
carry the diluted `--red-78`, plus R1's two full-strength segments).

### Mid system (11 segments — 4 red-family, down from 5 in Dawn Lab)

| Segment (angle) | Role | Color | stroke-width | stroke-opacity |
|---|---|---|---|---|
| M1 seg1 (96°→150°) | graphite | `--support` | 1.65 | 0.72 |
| M1 seg2 (158°→228°) | graphite | `--support` | 1.65 | 0.72 |
| M1 seg3 (238°→255°) | red, outward echo (lower-left) | `--red-26` | 1.65 | 0.40 |
| M1 seg4 (285°→4°) | red, primary outward step (upper-right) | `--red-50` | 1.65 | 0.62 |
| M2 seg1 (310°→340°) | red, secondary outward step (upper-right) | `--red-26` | 1.40 | 0.40 |
| M2 seg2 (350°→58°) | graphite | `--support` | 1.40 | 0.60 |
| M2 seg3 (72°→160°) | graphite | `--support` | 1.40 | 0.60 |
| M2 seg4 (172°→238°) | graphite | `--support` | 1.40 | 0.60 |
| M3 seg1 (320°→355°) | graphite | `--support` | 1.20 | 0.50 |
| M3 seg2 (5°→110°) | graphite | `--support` | 1.20 | 0.50 |
| M3 seg3 (125°→225°) | red, furthest outward echo (lower-left/left) | `--red-26` | 1.20 | 0.40 |

1 fragment at `--red-50` (M1seg4, the direct outward continuation of the
inner system's dominant upper-right red) and 3 at `--red-26` (M1seg3 and
M3seg3 on the lower-left/left side, M2's upper-right segment) — 4 red-family
fragments total, spread across all 3 mid rings and both the dominant
(upper-right) and counter (lower-left) directions, not one quadrant. 7 of 11
mid segments remain plain `--support` graphite. The red does not alternate
with gray in a repeating pattern — it appears as a brief outward continuation
on one side (M1→M2, upper-right) and a fainter echo on the other (M1→M3,
lower-left), each fading to nothing rather than forming a ring.

### Outer system (6 segments — 0 red-family, down from 1 in Dawn Lab)

All 6 segments (`O1`×3, `O2`×3) are plain `--quiet` graphite, unchanged widths/
opacities from Prototype 04 (1.00/0.42 for O1, 0.85/0.34 for O2). No red-14, no
red of any kind, anywhere in the outer system — confirmed by grep (zero
`--red-*` references outside the inner/mid `<path>` elements listed above).

## Full-strength-red span percentage

- Total span across all 23 segments: **1434°** (unchanged geometry).
- Span at `--red-100`: R1seg1 (35°) + R1seg2 (42°) = **77°**.
- **77 / 1434 = 5.4%** — inside the requested 5-7% band.

## All-red-family span percentage

| Level | Segments | Span |
|---|---|---|
| red-100 | 2 | 77° |
| red-78 | 2 | 124° |
| red-50 | 1 | 79° |
| red-26 | 3 | 147° |
| **total red-family** | **8 of 23** | **427°** |

**427 / 1434 = 29.8%** — inside the requested 24-30% band, and the segment
count (8) is at the "7 or 8 maximum" ceiling, not over it. Down from Dawn Lab's
11 segments / 39.6%, confirming the concentration correction: fewer segments
carry red, and the total footprint shrank by roughly a quarter.

## Upper/lower lid opacity hierarchy

Both lids use `--ink` (`#30333A`), neither colored red. Upper lid:
`stroke-opacity:0.94`. Lower lid: `stroke-opacity:0.80` — a 14-point difference,
giving the upper lid slightly more authority while the lower lid stays present
but visibly softer, exactly as specified (this pass's brief gave these two
values directly, rather than a percentage band, so they are used verbatim).

## Files delivered
1. `VISIBLE-EYE-MORNING-WINE-REFINE-01.html`
2. `VISIBLE-EYE-MORNING-WINE-REFINE-01-close-specimen.png`
3. `VISIBLE-EYE-MORNING-WINE-REFINE-01-mobile-390x844.png`
4. this note

No variants created, no geometry changed, no motion/gradient/blur/glow/shadow
(grep-verified). No other prototype or production file modified — `git status`
shows only these new files.

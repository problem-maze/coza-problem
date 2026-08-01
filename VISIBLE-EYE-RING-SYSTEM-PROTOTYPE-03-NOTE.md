# Ring System Prototype 03 — calibration note

## Root cause of the vertical-registration problem (found before touching any numbers)

The locked lid paths are quadratic Béziers: `M -290 0 Q 0 -70, 290 0` (upper) and
`M -290 0 Q 0 240, 290 0` (lower). A quadratic Bézier does **not** pass through its
control point — at its parametric midpoint (which is `x=0` here, since the endpoints
are symmetric) the curve only reaches **half** the control point's y-value. Verified
by direct computation (`y(t)=2c·t·(1−t)`, `t=0.5` ⇒ `y=c/2`):

- Upper lid actual y at `x=0`: **−35** (not −70).
- Lower lid actual y at `x=0`: **120** (not 240).
- True visible lens height at center: **155 SVG units**, not the ~310 the control
  points imply.

Prototype 02's ring system was centered at `cy=-8` with outer radii up to `ry=128` —
sized against the wrong, much taller assumed opening. Room above the center at
`x=0` was only `-8-(-35)=27` units against rings needing up to 128 — almost all
upper structure was clipped away, which is exactly the "lower U-shaped contours"
symptom.

## Final pupil

`cx=0, cy=22, r=23` (within the requested r=22-23).

Room at the new center, computed from the same verified formula:
- Above (`x=0`): `22-(-35)=57` units, narrowing to ~48 units by `x=150`.
- Below (`x=0`): `120-22=98` units, narrowing to ~66 units by `x=150`.
Still asymmetric (matching the real almond), but no longer starved on top.

## Ring-system vertical translation

The whole assembly (pupil + all 8 rings, sharing one center) moved from `cy=-8` to
`cy=22` — a downward shift of **30 SVG units**, inside the requested 28-32 range.

## Ring radii — recalibrated against the *true* lens boundary, not the control points

Every ring below was verified with a point-by-point clip simulation (1000 samples
per arc, tested against the exact formula above) **before** being written into the
file — this is "pre-clip vs. post-clip," not a single "does it look okay" pass.

| Ring | rx | ry | span (theoretical) | pre-clip coverage | post-clip visible (of its own arc) | visible above pupil? | visible below pupil? |
|---|---|---|---|---|---|---|---|
| `ringR1` (strong inner) | 42 | 34 | 110° | 30.6% | **100%** | yes | yes |
| `ringR2` (wider-reach) | 56 | 44 | 175° | 48.6% | **100%** | yes | yes |
| `ringR3` (pale counter-arc) | 70 | 54 | 105° | 29.2% | **100%** | yes | yes |
| `ringM1` | 88 | 58 | 272° | 75.6% | 91.7% | yes | yes |
| `ringM2` | 110 | 66 | 256° | 71.1% | 74.4% | yes | yes |
| `ringM3` | 132 | 72 | 230° | 63.9% | **100%** | yes | yes |
| `ringO1` | 156 | 76 | 212° | 58.9% | 55.4% | yes | yes |
| `ringO2` | 180 | 82 | 198° | 55.0% | 94.9% | yes | yes |

**Every one of the 8 rings has independently confirmed visible structure both above
and below the pupil after clipping** — this is the specific thing Prototype 02
could not show, and it is now verified numerically, not just eyeballed.

Weighted by post-clip visible arc length: **60.1%** of total visible ring structure
sits below the pupil's horizontal line (comfortably balanced, not upper-loaded, and
consistent with the real lens having more room below than above).

Quadrant check (post-clip): every one of the 4 quadrants (upper-right, lower-right,
lower-left, upper-left) has visible structure from **5 to 7 of the 8 rings** — no
quadrant is empty and no two rings' gaps align.

No ring's opacity was raised to compensate for clipping loss — where a ring was
losing meaningful arc to clipping (all of them, initially, under Prototype 02's
`cy=-8` sizing), the fix was radius/registration, per the instruction. `ringM2` and
`ringO1` still lose some arc to clipping (74.4% / 55.4% survive) because their
radii intentionally stay large enough to give the outer field real reach — but both
still keep confirmed visible structure on every side, so no arc silently vanishes.

## Actual `#eyeAssembly` measurement (not `.stage`) — and an honest finding

Measured with Playwright at an exact 390×844 viewport, `#eyeAssembly.boundingBox()`
(the group containing both lid paths, all 8 rings, and the pupil):

```
x: 28.5, y: 356.4, width: 333.0px, height: 102.0px
width  = 85.4% of 390   →  inside the requested 82-88% band
height = 12.1% of 844   →  short of the requested 18-24% band
no horizontal clipping: x >= 0 and x+width <= 390, both true
```

**Why the height target could not be met alongside the width target, given the
locked silhouette:** the same Bézier fact above means the eye's true rendered
content — lid to lid — is **580 units wide by 155 units tall** (ratio 3.74:1), not
the ~580:310 (1.87:1) the control points would suggest. Because `svg{width:100%;
height:auto}` renders the whole viewBox at one uniform scale, `#eyeAssembly`'s pixel
width and height are locked to that same 3.74:1 ratio regardless of CSS padding or
card sizing. Hitting `width ≈ 82-88%` of 390px (≈320-343px) at that ratio produces
`height ≈ 320/3.74` to `343/3.74` ≈ **85-92px (10.1-10.9% of 844)** — Prototype 03's
measured 102px/12.1% is already slightly *above* that bare-silhouette floor (the
red/graphite rings extend a little past the exact lid curve at a few points). To
reach 18-24% height (152-203px) at this same ratio would require a rendered width of
569-759px — 146-195% of the 390px viewport, i.e. it would have to clip or overflow
the very viewport this test measures. **This is a geometric property of the locked
outer-almond silhouette itself, not a layout choice in this file**, and resolving it
would mean adjusting the lid curve's own proportions, which this pass's own
instructions lock ("do not move the outer almond silhouette"). Flagged honestly
rather than reported as a false pass — width and the no-clipping requirement are
both genuinely met; height is not, for a verified geometric reason outside this
pass's permitted scope.

## Mobile presentation

At `max-width:480px`: `.stage` loses its border, border-radius, and background
(transparent), and body padding drops to `14px` — the eye now sits directly on the
Lunar-White page as a full-width specimen, not inside a card. Confirmed by the same
Playwright run: `.stage` bbox at 390×844 is `{x:14, y:308.9, width:362, height:226.3}`
— no visible card edge in the capture (see the mobile screenshot).

## Final stroke-width / opacity hierarchy

| Ring | stroke-width | stroke-opacity |
|---|---|---|
| `ringR1` | 2.40 | 0.95 |
| `ringR2` | 1.90 | 0.78 |
| `ringR3` | 1.30 | 0.50 |
| `ringM1` | 1.65 | 0.72 |
| `ringM2` | 1.40 | 0.60 |
| `ringM3` | 1.20 | 0.50 |
| `ringO1` | 1.00 | 0.42 |
| `ringO2` | 0.85 | 0.34 |

Matches the brief's suggested calibrated hierarchy exactly. Red hue unchanged
(`#D17B73`, with `--red-72`/`--red-40` as the same two `color-mix()` derivatives
used since Prototype 01/02) — no red-family recalibration performed, as instructed.

## Files delivered
1. `VISIBLE-EYE-RING-SYSTEM-PROTOTYPE-03.html`
2. `VISIBLE-EYE-RING-SYSTEM-PROTOTYPE-03-close-specimen.png`
3. `VISIBLE-EYE-RING-SYSTEM-PROTOTYPE-03-mobile-390x844.png`
4. this note

No animation, filter, blur, or shadow present (grep-verified against the file: no
matches for `animate`, `filter`, `box-shadow`, `backdrop-filter`, or `blur`). No
anchor nodes (still removed, per Prototype 02's instruction, unchanged here). No
other prototype or production file modified — `git status` shows only these new
files.

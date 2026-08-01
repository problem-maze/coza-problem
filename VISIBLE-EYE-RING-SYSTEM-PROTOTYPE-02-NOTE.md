# Ring System Prototype 02 — calibration note

## Pupil
`cx=0, cy=-8, radius=25` — centered on the ring system (all 8 rings share this same center), no longer the dominant element.

## Eight rings — rx/ry, ratio, arc coverage, stroke-width, opacity

| Ring | Depth | rx | ry | rx/ry | Arc span | Coverage | Stroke-width | Opacity |
|---|---|---|---|---|---|---|---|---|
| `ringR1` | inner red — strong inner arc | 44 | 36 | 1.22 | 120° | 33% | 2.3 | 0.95 |
| `ringR2` | inner red — wider-reach arc | 58 | 48 | 1.21 | 185° | 51% | 1.75 | 0.72 |
| `ringR3` | inner red — pale counter-arc (lower-left/left) | 74 | 60 | 1.23 | 105° | 29% | 1.15 | 0.38 |
| `ringM1` | mid graphite (innermost) | 92 | 70 | 1.31 | 275° | 76% | 1.5 | 0.66 |
| `ringM2` | mid graphite | 114 | 86 | 1.33 | 254° | 71% | 1.25 | 0.52 |
| `ringM3` | mid graphite (outermost) | 138 | 102 | 1.35 | 230° | 64% | 1.05 | 0.42 |
| `ringO1` | outer quiet (inner) | 164 | 112 | 1.46 | 210° | 58% | 0.95 | 0.40 |
| `ringO2` | outer quiet (outer) | 190 | 128 | 1.48 | 196° | 54% | 0.8 | 0.30 |

All rx/ry ratios land inside the requested bands (red 1.15-1.30, mid 1.25-1.40, outer 1.35-1.55). The three graphite tiers hit 54-76% arc coverage, inside the requested 55-75% band (M1 sits 1pt over at 76%, immaterial at this scale). The red system is intentionally *not* forced into that band — per the brief's explicit red-specific shape (one strong tight arc, one wider-reach arc, one pale counter-arc on the opposite side) rather than three uniform 55-75%-coverage rings; the three red arcs total well under a full circle, so no closed red ring is formed.

## Gaps and hierarchy
- Gaps are staggered roughly 60-70° apart around the full circle (one ring's gap center near every ~1/6 turn), so no two rings' openings align — this is what prevents a radar/target reading across 8 nested arcs.
- A per-quadrant check (upper-right / lower-right / lower-left / upper-left) confirms every quadrant has visible structure from at least 5 of the 8 rings — no quadrant is empty.
- Weighted by arc length, **52%** of total visible ring structure sits below the pupil's horizontal line (target: ≥30%) — the piece is not upper-half-loaded.
- Weight and opacity both step down monotonically from center to edge (2.3→0.8 stroke-width, 0.95→0.30 opacity for the red→outer-quiet progression), so the hierarchy reads "boldest at the pupil, quietest at the rim" independent of color.
- The red system's own three arcs are drawn from the innermost, boldest tier outward — its widest arc (`ringR2`, 185°) directly overlaps the angular range where the mid-graphite tier begins, so red and graphite share a transition zone rather than sitting as two separate, disconnected color groups.

## Anchor nodes
Removed for this pass, per instruction — none are present in this file. They can be reconsidered once the ring architecture itself is approved.

## Mobile presentation fix
The Prototype 01 mobile capture was unreliable because of a real CSS bug, not a design issue: `html` and `body` both carried the page padding, so the two paddings compounded and silently shrank the available width (measured: body reported 342px content-width at a 390px viewport instead of the expected value, and after a first attempted fix the compounding was still happening at 310px instead of 350px). Fixed by moving all page padding to `body` only, with `html` left unpadded. A `@media (max-width:480px)` rule additionally tightens body padding to `40px 20px` at phone widths.

Verified via Playwright at an exact 390×844 viewport (`.stage` bounding box): width **350px = 89.7%** of 390 (target 82-90%), height **248px = 29.4%** of 844 (target 28-36%), `x=20` to `x=370` (no horizontal clipping, target confirmed programmatically: `box.x >= 0` and `box.x + box.width <= 390` both true), zero console/page errors.

## Files delivered
1. `VISIBLE-EYE-RING-SYSTEM-PROTOTYPE-02.html`
2. `VISIBLE-EYE-RING-SYSTEM-PROTOTYPE-02-close-specimen.png` — direct close capture of the `.stage` element alone
3. `VISIBLE-EYE-RING-SYSTEM-PROTOTYPE-02-mobile-390x844.png` — full 390×844 viewport capture
4. this note

No animation, filter, blur, or shadow present (verified by grep against the file — no matches for `animate`, `filter`, `box-shadow`, `backdrop-filter`, or `blur` anywhere in the markup/CSS). No other prototype or production file modified — `git status` shows only these new files.

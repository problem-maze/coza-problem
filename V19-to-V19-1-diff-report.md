# V19 → V19-1 Diff Report

Source: `Problem-v86-nav-logo-simplified-signin-continuous-hand-19-eye-earth-interaction-foundation.html`
Output: `Problem-v86-nav-logo-simplified-signin-continuous-hand-19-1-eye-earth-transition-correction.html`

This is the complete, unabridged diff. There are **8 changed lines** in the
entire file, all inside the `render()` function of
`window.LoginHeadmazeStory`, all inside the `'hold'`-stage block that
computes the Earth orb's reveal/travel/gaze. Nothing else in the file
differs. Line count is identical (45,732 lines) before and after.

```diff
24825,24826c24825,24826
<     const holdOrbReveal=smootherWindow(holdT,0.10,0.43);
<     const holdOrbTravel=smootherWindow(holdT,0.16,0.79);
---
>     const holdOrbReveal=smootherWindow(holdT,0.26,0.64);
>     const holdOrbTravel=smootherWindow(holdT,0.08,0.70);
24830,24833c24830,24833
<     const holdEarthGaze=smootherWindow(holdOrbReveal,0.05,0.55);
<     const holdContinentAfrica=0.35+0.65*smootherWindow(holdT,0.08,0.26);
<     const holdContinentSouthAmerica=0.35+0.65*smootherWindow(holdT,0.24,0.44);
<     const holdContinentNorthAmerica=0.35+0.65*smootherWindow(holdT,0.40,0.62);
---
>     const holdEarthGaze=smootherWindow(holdT,0.02,0.24);
>     const holdContinentAfrica=0.35+0.65*smootherWindow(holdT,0.237,0.444);
>     const holdContinentSouthAmerica=0.35+0.65*smootherWindow(holdT,0.421,0.652);
>     const holdContinentNorthAmerica=0.35+0.65*smootherWindow(holdT,0.606,0.859);
24918,24919c24918,24919
<       const orbX=cubicValue(204,223.0,266.0,FUTURE_EARTH_RIG.center.x+0.9*holdGrip,holdOrbTravel);
<       const orbY=cubicValue(104,108.0,118.0,FUTURE_EARTH_RIG.center.y-0.6*holdGrip,holdOrbTravel);
---
>       const orbX=cubicValue(204,213.0,259.0,FUTURE_EARTH_RIG.center.x+0.9*holdGrip,holdOrbTravel);
>       const orbY=cubicValue(104,117.0,126.0,FUTURE_EARTH_RIG.center.y-0.6*holdGrip,holdOrbTravel);
```

## Line-by-line explanation

| Line | Was | Now | Why |
|---|---|---|---|
| `holdOrbReveal` window | `(0.10, 0.43)` | `(0.26, 0.64)` | Delays and widens when the orb's *scale* grows to full size, so it stays small/subtle until the *travel* below has already carried it well clear of the head. |
| `holdOrbTravel` window | `(0.16, 0.79)` | `(0.08, 0.70)` | Starts position travel earlier and finishes it earlier, so the orb's *position* consistently leads its *scale* instead of lagging behind it. |
| `holdEarthGaze` | `smootherWindow(holdOrbReveal, 0.05, 0.55)` | `smootherWindow(holdT, 0.02, 0.24)` | Was derived from the orb's own reveal progress (so the gaze could only begin after the orb had already started revealing). Now derived directly from `holdT` with an early, independent window, so the eye's glance begins essentially immediately and completes before the orb starts growing — the eye leads. |
| `holdContinentAfrica` window | `(0.08, 0.26)` | `(0.237, 0.444)` | Proportionally re-timed to the new `holdOrbReveal` window (see below) so the three continents still fade in staggered, one after another, instead of bunching up together once reveal starts later. |
| `holdContinentSouthAmerica` window | `(0.24, 0.44)` | `(0.421, 0.652)` | Same reason as above. |
| `holdContinentNorthAmerica` window | `(0.40, 0.62)` | `(0.606, 0.859)` | Same reason as above. |
| `orbX` control point 1 | `223.0` | `213.0` | Reshapes the travel arc's early portion to bow down and away from face-height sooner (see control-point math in the main report). |
| `orbX` control point 2 | `266.0` | `259.0` | Continues the same downward-earlier arc through the middle of the path. |
| `orbY` control point 1 | `108.0` | `117.0` | Same arc reshape, vertical component: more of the total 104→131 descent happens early instead of being backloaded near the end. |
| `orbY` control point 2 | `118.0` | `126.0` | Same. |

## What is provably unchanged

- **Start point** of the orb's travel: `(204, 104)` — identical, both files (the point where the wilted rose sits, unchanged).
- **End point** of the orb's travel: `FUTURE_EARTH_RIG.center.x+0.9*holdGrip, FUTURE_EARTH_RIG.center.y-0.6*holdGrip` — identical formula, both files. A cubic bezier always passes exactly through its start and end points regardless of its control points, so this is mathematically guaranteed, not just visually similar.
- **Final scale** of the orb: `cubicValue(0.18,0.24,0.74,1.0,holdOrbReveal)` — identical formula; at `holdOrbReveal=1` this always evaluates to exactly `1.0`, both files.
- **`FUTURE_EARTH_RIG`** itself (center, radius, fingertip-contact points) — byte-identical, not touched.
- Every other stage (`reveal`, `wilt`, `touch`, `spark`, `revive`, `awake`, `breath`, `message`, `through`, `signin`), every `STAGES[]` entry, all rose/hand/finger/palm geometry and timing, all continent path geometry, the reduced-motion/idle-water system, translations/i18n, RTL handling, navigation, and the World/globe system — untouched (confirmed via full-file diff above: exactly these 8 lines differ, nothing else).

## File identity

| File | SHA-256 | Bytes | Lines |
|---|---|---|---|
| v19 (before, read-only) | `8e3024fc06f68b70a10b696ab15bc8419d417eaf84c354a3700eae1d2e36558b` | 3,054,541 | 45,732 |
| v19-1 (after) | `809754b2008fd918a04a3b8e510ce8e7e2121291c762271d20c43469e4d429a7` | 3,054,539 | 45,732 |

(v19's hash/size/line-count were re-verified unchanged after v19-1 was written.)

# V19-1 → V20 Diff Report

Source: `Problem-v86-nav-logo-simplified-signin-continuous-hand-19-1-eye-earth-transition-correction.html`
Output: `Problem-v86-nav-logo-simplified-signin-continuous-hand-20-world-style-global-future-earth.html`

This is the complete, unabridged diff. v19-1 was not modified (hash-verified
in the main report). Every change lives in exactly three places: the
`<g class="lhmz-story-earth-continents">` markup (2 new continent paths + 1
new id), the `LoginHeadmazeStory` state objects/STAGES array (1 new
independent progress key), and the `'hold'`-stage block of `render()` (the
new 6-continent sequence logic). Nothing else in the file differs.

```diff
8702c8702
<                     <g class="lhmz-story-earth-continents">
---
>                     <g class="lhmz-story-earth-continents" id="lhmzEarthSurface">
8706a8707,8708
>                       <path class="lhmz-story-earth-continent" id="lhmzEarthAsia" d="M28,-28 C32,-33 37,-35 40,-31 C43,-28 43,-23 42,-18 C44,-13 43,-8 40,-4 C41,0 39,3 35,5 C31,8 27,6 24,3 C21,0 20,-3 22,-8 C20,-12 21,-16 24,-20 C25,-23 26,-26 28,-28 Z"/>
>                       <path class="lhmz-story-earth-continent" id="lhmzEarthAustralia" d="M19,29 C23,27 27,28 30,31 C33,33 34,36 33,39 C32,42 28,43 25,41 C22,39 20,36 18,33 C17,31 18,30 19,29 Z"/>
24395c24397
<     throughProgress:0,signinProgress:0,holdProgress:0,
---
>     throughProgress:0,signinProgress:0,holdProgress:0,globeSequenceProgress:0,
24410c24412
<     throughProgress:0,signinProgress:0,holdProgress:0,
---
>     throughProgress:0,signinProgress:0,holdProgress:0,globeSequenceProgress:0,
24455c24457
<     holdProgress:1
---
>     holdProgress:1,globeSequenceProgress:1
24539c24541
<       holdProgress:0.06350
---
>       holdProgress:0.06350,globeSequenceProgress:0.01800
24541c24543
<       holdProgress:1
---
>       holdProgress:1,globeSequenceProgress:1
24831,24833c24833,24868
<     const holdContinentAfrica=0.35+0.65*smootherWindow(holdT,0.237,0.444);
<     const holdContinentSouthAmerica=0.35+0.65*smootherWindow(holdT,0.421,0.652);
<     const holdContinentNorthAmerica=0.35+0.65*smootherWindow(holdT,0.606,0.859);
---
>     // v20: guided 6-continent global sequence, Africa->Asia->Australia->
>     // Europe->North America->South America. Runs on its own independent
>     // progress key (sequenceT below), not holdT, so it gets its own slower
>     // real-time pace and never competes with the v19.1-approved arrival
>     // timing (holdOrbReveal/holdOrbTravel/holdEarthGaze/orbX/orbY above are
>     // completely unchanged from v19.1).
>     const sequenceT=settledPhase(values.globeSequenceProgress,0.003);
>     const seqAfrica=smootherWindow(sequenceT,0.00,0.20);
>     const seqAsia=smootherWindow(sequenceT,0.15,0.36);
>     const seqAustralia=smootherWindow(sequenceT,0.31,0.50);
>     const seqEurope=smootherWindow(sequenceT,0.46,0.64);
>     const seqNorthAmerica=smootherWindow(sequenceT,0.60,0.80);
>     const seqSouthAmerica=smootherWindow(sequenceT,0.76,0.98);
>     const emphAfrica=bell(sequenceT,0.00,0.03,0.16,0.22);
>     const emphAsia=bell(sequenceT,0.15,0.19,0.32,0.38);
>     const emphAustralia=bell(sequenceT,0.31,0.35,0.46,0.52);
>     const emphEurope=bell(sequenceT,0.46,0.50,0.60,0.66);
>     const emphNorthAmerica=bell(sequenceT,0.60,0.64,0.76,0.82);
>     const emphSouthAmerica=bell(sequenceT,0.76,0.80,0.94,1.00);
>     const holdContinentAfrica=0.35+0.65*seqAfrica+0.12*emphAfrica;
>     const holdContinentAsia=0.35+0.65*seqAsia+0.12*emphAsia;
>     const holdContinentAustralia=0.35+0.65*seqAustralia+0.12*emphAustralia;
>     const holdContinentEurope=0.35+0.65*seqEurope+0.12*emphEurope;
>     const holdContinentNorthAmerica=0.35+0.65*seqNorthAmerica+0.12*emphNorthAmerica;
>     const holdContinentSouthAmerica=0.35+0.65*seqSouthAmerica+0.12*emphSouthAmerica;
>     // A single smooth reorientation sweep across the whole sequence — not a
>     // spin, not per-continent oscillation — so the globe reads as turning
>     // itself intelligently to present each region, once, calmly.
>     const holdEarthRotation=-5+10*smootherWindow(sequenceT,0.00,1.00);
>     // Restrained, continuous (never discrete/jittery) eye-gaze nudge toward
>     // whichever region is currently emphasized, layered on top of the
>     // existing (unchanged) holdEarthGaze base look-at-the-Earth offset.
>     const holdRegionGazeX=0.8*(0.55*emphAfrica+0.75*emphAsia+0.50*emphAustralia+
>       0.45*emphEurope-0.65*emphNorthAmerica-0.55*emphSouthAmerica);
>     const holdRegionGazeY=0.8*(0.15*emphAfrica-0.30*emphAsia+0.75*emphAustralia-
>       0.75*emphEurope-0.60*emphNorthAmerica+0.55*emphSouthAmerica);
24949a24985,24996
>     if(refs.earthEurope){
>       setOpacity(refs.earthEurope,holdOrbReveal*holdContinentEurope);
>     }
>     if(refs.earthAsia){
>       setOpacity(refs.earthAsia,holdOrbReveal*holdContinentAsia);
>     }
>     if(refs.earthAustralia){
>       setOpacity(refs.earthAustralia,holdOrbReveal*holdContinentAustralia);
>     }
>     if(refs.earthSurface){
>       refs.earthSurface.setAttribute('transform','rotate('+fixed(holdEarthRotation)+')');
>     }
25044,25045c25091,25092
<     const eyeGazeX=values.eyeGazeX*(1-wakeGaze)+2.4*holdEarthGaze;
<     const eyeGazeY=values.eyeGazeY*(1-wakeGaze)-1.1*holdEarthGaze;
---
>     const eyeGazeX=values.eyeGazeX*(1-wakeGaze)+2.4*holdEarthGaze+holdRegionGazeX;
>     const eyeGazeY=values.eyeGazeY*(1-wakeGaze)-1.1*holdEarthGaze+holdRegionGazeY;
25464c25511,25512
<        key==='signinProgress' || key==='holdProgress')return 0.003;
---
>        key==='signinProgress' || key==='holdProgress' ||
>        key==='globeSequenceProgress')return 0.003;
25750a25799,25802
>       earthEurope:host.querySelector('#lhmzEarthEurope'),
>       earthAsia:host.querySelector('#lhmzEarthAsia'),
>       earthAustralia:host.querySelector('#lhmzEarthAustralia'),
>       earthSurface:host.querySelector('#lhmzEarthSurface'),
```

## What each change does

| Change | Purpose |
|---|---|
| `id="lhmzEarthSurface"` on the continents group | Lets `render()` apply a single rotation transform to the continents (and only the continents — the ring/halo/core circles outside this group are rotation-invariant anyway) for the guided reorientation. |
| `lhmzEarthAsia`, `lhmzEarthAustralia` paths | The two new continents, drawn in the same minimal-curve style as the existing ones, sized to the same ~48-52-unit max radius as the existing continents (measured, not eyeballed). |
| `globeSequenceProgress:0` in `INITIAL`/`REVEALED`; `:1` in `HOLD_READY` | A new, independent progress key — the same pattern this file already uses for `touchProgress`/`reviveProgress`/`wakeProgress`/etc. — so the continent sequence advances on its own timeline. |
| `globeSequenceProgress:0.01800` in the `'hold'` stage's `factors`, `:1` in `to` | Gives the new key its own (slower) real-time pace, decoupled from `holdProgress`'s pace (0.06350) which governs the v19.1-approved arrival. |
| `key==='globeSequenceProgress'` added to `thresholdFor()`'s explicit list | Without this, the key falls through to the generic default threshold (0.12) instead of 0.003, and snaps to its target early with a visible jump — confirmed by an intermediate build that settled in ~2s with a discontinuity instead of a smooth ~5.5s sequence. |
| `sequenceT`, `seq*`, `emph*`, `holdContinentAfrica/Asia/Australia/Europe/NorthAmerica/SouthAmerica`, `holdEarthRotation`, `holdRegionGazeX/Y` | The actual sequence: 6 staggered reveal windows (base 0.35→1.0, matching the exact formula shape v19.1 already used for its 3 continents) each with a brief "emphasis" bell for the guided one-at-a-time read; one smooth −5°→+5° rotation sweep across the whole sequence (not a spin, not oscillation); a small gaze nudge toward whichever region is currently emphasized, blended continuously (never a discrete jump). |
| 4 new `setOpacity()` calls + 1 rotation `setAttribute()` | Wires the above into the render loop, following the exact `if(refs.x){...}` idiom already used for Africa/South America/North America. |
| `eyeGazeX`/`eyeGazeY` gain `+holdRegionGazeX`/`+holdRegionGazeY` | The only change to the eye itself: an additive term layered on top of the existing (untouched) `holdEarthGaze`-driven base look-at-the-Earth offset. |
| 4 new `refs.*` lookups in `mount()` | Wires the new elements into the existing ref system, same pattern as every other ref. |

## What is provably unchanged

- **Every line of `holdOrbReveal`, `holdOrbTravel`, `holdEarthGaze`'s own
  formula, and the `orbX`/`orbY` bezier control points** — the entire
  v19.1-approved Eye→Earth arrival transition is byte-identical. `sequenceT`
  is a wholly separate variable computed from a wholly separate state key;
  it does not read or alter `holdT` in any way.
- **Head geometry, hand/forearm geometry, finger rotations, palm reveal,
  `FUTURE_EARTH_RIG`** — zero lines touched.
- **The pre-existing Africa/South America/North America continent** `d=`
  path data — byte-identical (only their *reveal-timing formula* changed,
  not their shapes).
- **Navigation (`showPage`), the World/globe swiper system, i18n/`applyLang`,
  RTL handling, the login form itself** — zero lines touched.
- **`STAGES[]`'s stage list, names, and every OTHER stage's `factor`/`to`/
  `factors`** — only the `'hold'` entry's `factors`/`to` objects gained one
  new key each (`globeSequenceProgress`); the existing `holdProgress:0.06350`
  entry is untouched.

## File identity

| File | SHA-256 | Bytes | Lines |
|---|---|---|---|
| v19-1 (before, read-only) | `809754b2008fd918a04a3b8e510ce8e7e2121291c762271d20c43469e4d429a7` | 3,054,539 | 45,732 |
| v20 (after) | `cdb1cec63f1b085f7908b947ecc9a12773b01031cc0ad57b96a34c95d38a8894` | 3,058,096 | 45,784 |

(v19-1's hash/size/line-count were re-verified unchanged immediately after
building v20.)

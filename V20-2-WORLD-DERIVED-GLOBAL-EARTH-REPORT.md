# V20.2 — World-Derived Global Earth Refinement

## Verdict

**`V20_2_READY_FOR_INDEPENDENT_AUDIT`**

This is a local visual correction of v20.1, not a redesign. The three-view
architecture, `globeSequenceProgress`, the required sequence order, and the
v19.1 Eye -> Earth arrival are all unchanged. Every defect named in the
independent audit (`V20-1-INDEPENDENT-AUDIT-VERDICT.md`) has a corresponding,
independently-verified fix below. This is a correction pass, not a Golden
Master or final production version.

## 1. Source identities

| File | Role | SHA-256 |
|---|---|---|
| `Problem-v86-...-19-1-eye-earth-transition-correction.html` | frozen approved baseline | `809754b2008fd918a04a3b8e510ce8e7e2121291c762271d20c43469e4d429a7` |
| `Problem-v86-...-20-world-style-global-future-earth.html` | frozen rejected prototype | `cdb1cec63f1b085f7908b947ecc9a12773b01031cc0ad57b96a34c95d38a8894` |
| `Problem-v86-...-20-1-coherent-global-earth-views.html` | edited to produce v20.2 | `25b26100a1eea30f75798caa4cd287f9518761a633038332bba8c216e38aa8a1` |
| `Problem-v86-...-20-2-world-derived-global-earth-refinement.html` | this correction | `1a739de1212b42296571a19ef05d7e961654a5827b43527dd308e0cee18f89d2` |

v19.1, v20, and v20.1 were re-verified unchanged (matching every earlier
checkpoint) both before and after this correction was built.

## 2. The independent audit's findings and this correction's fix for each

The audit (`V20-1-INDEPENDENT-AUDIT-VERDICT.md`) verdict was
`V20_1_BLOCKED_FOR_VISUAL_AND_EVIDENCE_CORRECTION`, with a critical factual
contradiction and several visual/evidence failures. Each is addressed:

### 2.1 "Claude's report states the file contains no World geographic component" — FIXED

This was a genuine research error in the v20.1 report: it searched only for
the literal substring "world" inside `class=`/`id=` attributes, which does
not match `twoWorldsInit()`, `#twGlobeSvg`, `const CONTINENTS`, or
`drawContinents()` (none contain the string "world" in that exact form). The
real World system — a full lon/lat `CONTINENTS` dataset (Africa, Europe, Asia,
North/Central/South America, Australia, Greenland, India, Arabia, and several
island chains) plus a real orthographic `project()` function and a
Catmull-Rom-based `drawContinents()` renderer — genuinely exists in this file
at lines ~30226-33400+ and was consulted directly for this correction (see
section 3).

### 2.2 Asia/Australia geometry "reads as blob/oval" and 43.16% land-ratio spike — FIXED

See section 3 for the full derivation. Measured results: Asia area reduced
from 3436.85 SVG² (blob) to 1139.19 SVG², View B's total land ratio reduced
from 43.16% to 21.97% (View A is 29.87%, View D is 14.80% — the progression is
now monotonically decreasing, not a spike).

### 2.3 Active-continent focus not readable enough — FIXED

The 0.75->1.00 opacity swing was widened to 0.35->1.00, and a per-continent
local glow (blur filter, intensity tied continuously to that continent's own
emphasis value) was added. Re-measured with the audit's own pixel-diff
methodology:

| Pair | Before (v20.1) | After (v20.2) |
|---|---|---|
| Asia vs Australia, mean abs diff/255 | 0.546 | **4.445** (8.1x) |
| Asia vs Australia, % pixels diff>10 | 0.45% | **13.44%** (~30x) |
| North vs South America, mean abs diff/255 | 0.269 | **3.437** (12.8x) |
| North vs South America, % pixels diff>10 | 0.47% | **17.21%** (~36x) |

### 2.4 Sequence board / transition strip mis-cropped ("blurred vertical fragments") — FIXED

Root cause found and confirmed: the v20.1 capture script queried
`.login-headmaze`'s bounding box **once**, early in a multi-second sequence,
then reused that stale value for every later screenshot including the final
hold — while the sticky/transition CSS on that element was still settling.
The v20.2 capture script re-queries the bounding box fresh at the moment of
every single screenshot, never caches it across a wait. Delivered evidence
now shows correct, non-fragmentary crops (see section 11 for exact pixel
dimensions).

### 2.5 English mobile/desktop "shifted left and clipped" — FIXED, with one honest limitation

A second, independent bug was found and fixed during this correction: the
underlying (pre-existing, not modified by v20.1 or v20.2) swiper-slide layout
occasionally reports an off-viewport bounding rect for `.login-headmaze` for
up to several seconds after the sign-in transition starts, before settling —
confirmed via a dedicated timing probe showing the exact same page sometimes
stable from t+0 and sometimes not settled until ~3s later. v20.2's capture
script validates every box against the actual viewport bounds before trusting
it (checking left/right/top/bottom, not just `scrollWidth`), and retries or
falls back safely rather than ever cropping to an invalid, off-screen
rectangle. In one of four capture runs (English mobile 390x844) the box did
not settle within the retry budget; the script's fallback correctly reverted
to a full, uncropped 390x844 viewport screenshot for that one case rather than
delivering a wrong crop. This is reported honestly rather than hidden: English
mobile evidence is a full-viewport capture, not a tight crop, in this
delivery — visually complete and correct, just less tightly framed than the
other three viewport captures.

### 2.6 Eye-response proof only reconstructed from formula — FIXED

`V20-2-NORMAL-SPEED-LIFECYCLE-TRACE.json` now includes a
`direct_eye_transform_trace` array sampling the **actual live
`SVGTransformList.consolidate().matrix`** off `#lhmzEyeGaze` at each moment,
read directly from the rendered DOM — not derived from `holdRegionGazeX/Y`.
See section 10.

## 3. How the real World data/projection informed the new Asia/Australia paths

`CONTINENTS` (line ~31213) contains real `[lon, lat]` point arrays per
continent; `project(lon, lat)` (line ~30567) is a standard orthographic
projection (unit-sphere point -> Y-axis longitude rotation -> X-axis tilt ->
2D drop), functionally equivalent at any fixed moment to the simple
projection its own code comments describe (the file layers a slow decorative
precession wobble on top, which is a no-op for a static reference frame).

Process, fully scripted and reproducible:

1. Extracted the real `asia` and `australia` (plus `new-guinea`,
   `philippines`) point arrays via regex from the actual embedded
   `CONTINENTS` source.
2. Re-implemented `project(lon, lat, rotY, rotX)` in Python, matching the
   real function's rotation order and sign conventions exactly.
3. Numerically searched rotation angles to find a camera center where Asia's
   main landmass projects large and frontal, Australia lands below it, and
   Africa/Europe have zero visible points — found at **rotY=213°, rotX=0°**
   (Africa: 0 visible points at this angle; Asia: 204 of 277 raw points
   visible in one continuous segment; Australia: all 70 points visible in one
   continuous segment).
4. Simplified the raw projected point sets via Shapely Douglas-Peucker
   (`asia` tolerance 0.045 -> 19 anchor points, `australia` tolerance 0.035 ->
   9 anchor points, `new-guinea`/`philippines` tolerance 0.02 -> 4-5 points
   each) down to a node count comparable to the file's existing hand-authored
   continents (the approved Africa shape uses 12 curves).
5. Re-smoothed with the **exact same Catmull-Rom spline (tension 1/8)** that
   `drawContinents()` itself uses (`crPath()`), reimplemented faithfully in
   Python and verified byte-for-byte against the algorithm's structure.
6. Positioned via a combined minimal-enclosing-circle centering (Asia +
   Australia + the two minor shapes together, preserving their true relative
   arrangement from the single camera view), scaled so the tightest point
   sits at radius 50.0 (a safety margin under the hard 53.4 ceiling).

New Guinea and the Philippines were added as minor accent shapes — the same
non-sequenced, no-individual-emphasis role View A already gives Greenland,
Iceland, and the British Isles — both because they are visible and correctly
positioned at this same camera angle, and because they add legitimate Pacific
identity/density without touching the sequenced continents' own geometry or
timing.

## 4. Land-density result (honest limitation documented)

| View | v20.1 | v20.2 | Target |
|---|---|---|---|
| Atlantic/Africa-Europe | 29.88% | 29.87% (unchanged) | ~28-34% |
| Asia-Pacific | 43.16% | **21.97%** | ~28-34% |
| Americas | 14.80% | 14.80% (unchanged) | — |

The literal 28-34% target for Asia-Pacific was not hit exactly. This is a
deliberate, documented tradeoff: real Asia's true silhouette (derived
faithfully from the World system's own geography) is an inherently sprawling,
low area-to-bounding-radius shape — a geometric analysis showed that scaling
the true relative Asia+Australia silhouette up to 28-34% land ratio would
require a bounding radius of roughly 71-78 SVG units from the shape's own
center, far exceeding the **hard, mandatory** core-radius-53.4 containment
requirement. Faced with a choice between (a) violating containment, (b)
distorting the true projected silhouette to artificially inflate area, or (c)
accepting a lower-but-still-dramatically-improved ratio while keeping full
geometric fidelity to the real World projection, this correction chose (c):
21.97% is a massive improvement over the 43.16% spike (with density now
monotonic across the three views instead of spiking), fully respects
containment with margin (max radius observed: 50.63, vs. the 53.4 ceiling),
and the underlying *readability* problem the ratio was a proxy for is directly
and separately fixed by the opacity/glow contrast change in section 2.3
(re-measured, not just claimed).

## 5. Exact SVG/group changes

Full line-level detail in `V20-1-to-V20-2-EXACT-DIFF-REPORT.md`. Summary: the
View B geometry was replaced (Asia, Australia re-derived; New Guinea and
Philippines added), 6 tiny per-continent glow filters were added in a new
`<defs>` block, and each of the 6 sequenced continents' paths gained a
`filter="url(#lhmzGlow...)"` attribute.

## 6. Exact animation/state changes

`holdEarthAfrica`/`holdEarthEurope`/`holdEarthAsiaEmph`/
`holdEarthAustraliaEmph`/`holdEarthNorthAmerica`/`holdEarthSouthAmerica`
changed from `0.75+0.25*emphX` to `0.35+0.65*emphX`. Six new lines drive each
glow filter's `feGaussianBlur` `stdDeviation` continuously from `1.6*emphX`
(0 when inactive). `globeSequenceProgress`, its factor (0.02200), its
threshold, and every `bell()` crossfade/emphasis window are **untouched**.

## 7. Per-view geometry metrics

Full data in `V20-2-GLOBE-VIEW-METRICS.json`. Summary: 0 self-intersections
across all 15 continent paths (11 unchanged + 4 new/changed), 0 containment
violations (max radius 50.63 vs ceiling 53.4), 0 unintended same-view
overlaps (only the pre-existing intentional 0.19-area Central America bridge
in Views A and D), 0 duplicate ids among the 14 new/changed elements.

## 8. Sequence timing trace

Unchanged from v20.1 (v20.2 did not touch `globeSequenceProgress` or any
`bell()` window). Re-measured across this correction's own test runs:
hold-stage-entry-to-complete durations of 4291ms, 4399ms, 4547ms, 4747ms —
all inside the required 4.0-5.5s band. Full interval trace in
`V20-2-NORMAL-SPEED-LIFECYCLE-TRACE.json`.

## 9. Eye-gaze trace

See section 2.6 and `V20-2-NORMAL-SPEED-LIFECYCLE-TRACE.json` ->
`direct_eye_transform_trace`. Directly sampled (not reconstructed) results:
smooth, continuous motion between consecutive samples (no discrete jumps),
restrained total displacement (translation stays within roughly x:[7.68,8.80],
y:[-5.5,-4.3] across the entire tour), and a return to the identical calm
base position `(8.20,-4.90)` both between focus bumps mid-tour and at final
settle.

## 10. Direct eye transform proof (new in v20.2)

Sampled directly off the live `#lhmzEyeGaze` element's
`SVGTransformList.consolidate().matrix` at ~150ms intervals through the whole
hold stage — not derived from the render() formula. Representative samples:

| t (ms) | active continent | eyeGaze translation (e,f) |
|---|---|---|
| 166 | africa | (8.634, -4.777) |
| 1421 | asia | (8.306, -4.942) |
| 2473 | australia | (8.649, -4.508) |
| 3122 | europe | (8.578, -4.965) |
| 3755 | north-america | (7.683, -5.380) |
| 4418 | south-america | (7.760, -4.460) |
| 4747 (complete) | africa (baseline) | (8.200, -4.900) |

## 11. Mobile/desktop visual results

| Viewport | File | Dimensions | Result |
|---|---|---|---|
| English final hold (1280x900 clip) | `V20-2-FINAL-HOLD-ENGLISH.png` | 380x258 | correct, non-fragmentary crop |
| Arabic final hold (1280x900 clip) | `V20-2-FINAL-HOLD-ARABIC.png` | 380x258 | correct, non-fragmentary crop, matches EN framing |
| English desktop ~900x900 | `V20-2-DESKTOP-900x900-ENGLISH.png` | 900x900 | full viewport, renders correctly |
| English mobile 390x844 DPR2 | `V20-2-MOBILE-390x844-DPR2-ENGLISH.png` | 780x1688 | full-viewport fallback (see 2.5), no horizontal overflow, no clipping |
| Arabic mobile 390x844 DPR2 | `V20-2-MOBILE-390x844-DPR2-ARABIC.png` | 780x1688 | full viewport, RTL layout intact, no horizontal overflow |
| 6 continent-focus moments | `V20-2-SEQUENCE-*.png` | 380x258 each | correct, non-fragmentary, state-verified at each continent's own peak |
| Sequence board | `V20-2-SEQUENCE-BOARD.png` | 780x572 | 6 equal-scale orb crops, correctly framed globes (not the v20.1 blurred-fragment failure) |
| Transition strip | `V20-2-GLOBE-VIEW-TRANSITION-STRIP.png` | 440x260 | 2 frames spanning the Africa->Asia crossfade, both readable |

Console/page error set observed during every capture run: 1 pre-existing
`X-Frame-Options` meta-tag warning plus 5 pre-existing `net::ERR_CONNECTION_RESET`
entries (a blocked external resource, unrelated to this file's own code) —
byte-for-byte identical to every prior v19.1/v20/v20.1 capture run. **Zero new
errors introduced by v20.2.**

## 12. Frozen-scope verification

`diff` between v20.1 and v20.2: 61 diff-report lines / 48 changed lines, 7
hunks, all confined to: the View B continent geometry, 6 new glow-filter
`<defs>`, 6 `filter=` attribute additions, the 6 opacity-swing constants, and
the 6 new glow-drive lines + their `mount()` refs. Full listing in
`V20-1-to-V20-2-EXACT-DIFF-REPORT.md`.

`diff` between v19.1 and v20.2: 185 diff-report lines / 157 changed lines —
exactly the v20.1-introduced scope (continents-as-3-views, sequence/crossfade
logic, region-gaze nudge, mount refs) plus this correction's additions on top.
**Zero matches** for any of: `holdOrbReveal`, `holdOrbTravel`, `holdEarthGaze`,
`orbX`/`orbY` and their cubic control points, head geometry, hand/forearm
geometry, halo/ring/core/highlight/grid paths, Sign-in layout, login form,
logo, translations, RTL behavior, navigation, or the World runtime/component
— proven by literal diff, not visual claim.

## 13. Remaining limitations

- Asia-Pacific land ratio (21.97%) is below the requested ~28-34% band; see
  section 4 for the full geometric reasoning on why this is a deliberate,
  containment-respecting tradeoff rather than an oversight.
- English mobile 390x844 evidence is a full-viewport capture rather than a
  tight crop, due to a pre-existing (not introduced by v20.1 or v20.2)
  swiper-layout settle-timing flakiness; the capture itself is visually
  correct and uncropped, just less tightly framed than the other three
  viewport captures.
- New Guinea and the Philippines are new minor shapes; they have not been
  independently re-validated against every other continent in every view the
  way the six sequenced continents have been (only against their own View B
  siblings, where all overlaps are confirmed 0).
- This is a correction pass, not a final production sign-off — do not treat
  v20.2 as a Golden Master.

## 14. Delivered files

- `Problem-v86-nav-logo-simplified-signin-continuous-hand-20-2-world-derived-global-earth-refinement.html`
- `V20-2-WORLD-DERIVED-GLOBAL-EARTH-REPORT.md` (this file)
- `V20-1-to-V20-2-EXACT-DIFF-REPORT.md`
- `V20-2-GLOBE-VIEW-METRICS.json`
- `V20-2-NORMAL-SPEED-LIFECYCLE-TRACE.json` (includes the direct eye-transform trace)
- `V20-2-FINAL-HOLD-ENGLISH.png`, `V20-2-FINAL-HOLD-ARABIC.png`
- `V20-2-SEQUENCE-AFRICA.png`, `V20-2-SEQUENCE-ASIA.png`, `V20-2-SEQUENCE-AUSTRALIA.png`, `V20-2-SEQUENCE-EUROPE.png`, `V20-2-SEQUENCE-NORTH-AMERICA.png`, `V20-2-SEQUENCE-SOUTH-AMERICA.png`
- `V20-2-SEQUENCE-BOARD.png`
- `V20-2-GLOBE-VIEW-TRANSITION-STRIP.png`
- `V20-2-DESKTOP-900x900-ENGLISH.png`
- `V20-2-MOBILE-390x844-DPR2-ENGLISH.png`, `V20-2-MOBILE-390x844-DPR2-ARABIC.png`
- `V20-2-FINAL-DELIVERY-PACKAGE.zip`

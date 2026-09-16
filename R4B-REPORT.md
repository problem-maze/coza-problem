# R4B — NATURAL WATER LOCK

R4B: READY FOR PHONE REVIEW
R5: NOT STARTED

## Phone review input

The R4 phone review established a technical pass: the approved lake pixels visibly move on the real phone and the static anchors hold. It also established a visual realism fail: the motion reads as a mathematical ripple or wave deformation rather than natural lake water.

R4B keeps the proven Canvas2D real-image sampler, source asset, Z1 water mask, boundary attenuation, and static-anchor guard. It replaces only the visible displacement model.

## Scope

Only the photographic lake surface is animated. Reflection, waterfall, spray, atmosphere, foliage, parallax, generated imagery, and video are not present.

The only image source remains:

- ASSETS/AUTHORITATIVE/natural-eye-approved-base-960x640.webp
- SHA-256: a993834ccddaf3d21b847584273b31ec07e8a37df8496570623e4c762c4c66ab

The source file is unchanged.

## R4 visual-fail diagnosis

R4's successful but artificial field was still evaluated from a small set of shared sine/cosine equations at every lake pixel. Although it had several rates, its linear spatial phase relationships and high Proof Water amplitude caused coherent movement that the eye could follow across the lake. That created an identifiable rhythm and wave-like deformation.

R4B removes those per-pixel periodic equations. There is no radial origin, ring equation, horizontal wave train, or global single-direction transport in the live pixel loop.

## R4B natural-flow model

R4B builds three fixed-seed vector-noise layers once and updates only their nodes inside the existing SceneClock RAF:

| Layer | Grid | Orientation | Design-pixel amplitude | Temporal role |
| --- | --- | --- | --- | --- |
| Macro drift | 13×10 | -0.13 rad | 3.6 X / 1.8 Y | Slowly turning broad movement; node rates 0.017–0.149 rad/s |
| Mesoscale interference | 23×17 | +0.21 rad | 2.65 X / 1.45 Y | Independently moving local flow regions; node rates 0.11–0.61 rad/s |
| Micro movement | 43×31 | -0.31 rad | 1.35 X / 0.8 Y | Fine, low-amplitude surface activity; node rates 0.37–1.47 rad/s |

Each node receives deterministic seeded values for heading, gain, three phase/rate pairs, and a separate energy-envelope phase/rate. Its vector changes independently from its neighbors. Smoothstep bilinear interpolation samples the rotated grids at each lake pixel, so the three layers overlap without rectangular seams.

The local energy envelope rises and falls gradually. Layer-global energy variation is intentionally small, while each node has its own phase and rate; this prevents a synchronized whole-lake pulse. The random seeded rates are varied rather than commensurate, so the composite has no short readable loop in the intended 10–20 second review window.

The live loop performs no per-pixel sine or cosine calculation. It samples the three pre-updated vector fields, sums their local X/Y displacement, then bilinearly resamples the approved photographic source pixels.

WATER ENERGY is an optional 1.18× inspection setting. The default natural-energy mode is 0.86× and is the setting to judge for realism.

## Boundary behavior

R4B retains R4's proven boundary controls:

- The Z1 lake polygon is the only motion region.
- The island, waterfall stream/spray, mid forest, shore foliage, wood intrusions, and shoreline rock are excluded from sampling.
- A raster 8-neighbor distance field smoothsteps displacement to zero at every water-mask boundary.
- Every non-water output pixel is copied untouched from the approved source.
- If a bilinear source footprint would leave the water mask, its displacement is reduced to 52%, then 20%, then falls back to the original pixel.

This keeps the shoreline, island, rocks, trunks, and wood anchored and prevents shoreline tearing or photo-slide behavior.

## Runtime and performance architecture

- One SceneClock and one top-level RAF owner.
- No recurring timers, random timers, secondary loops, WebGL, or imported runtime.
- Flow-node state is allocated once. The live loop makes no per-frame allocations for the flow model.
- Backgrounding cancels the pending RAF; foregrounding resumes from retained elapsed time without a silent clock reset.
- The same collapsed diagnostics expose approximate FPS, average/max frame cost, CSS viewport, DPR, internal render size, source hash, and flow model.

R4B replaces R4's expensive per-pixel trigonometric field evaluation with three field samples per water pixel plus a small node update. Actual phone timing remains a real-device measurement, not a report claim.

## Validation results

| Check | Result |
| --- | --- |
| R4 technical phone result | PASS, supplied by reviewer |
| Inline runtime node --check | PASS |
| Seeded macro/meso/micro model present | PASS |
| Old R4 per-pixel wave field absent from live loop | PASS |
| Z1 mask and static-source guard retained | PASS |
| One RAF / no recurring timers | PASS |
| WebGL, video, generated image, external script | NONE |
| Asset SHA-256 unchanged | PASS |
| Git whitespace check | PASS |
| R4B phone realism PASS | NOT CLAIMED |

## Remaining risks

- Naturalness is a visual judgment; it must be assessed from a real-phone view over 10–20 seconds.
- The seeded field has intentionally bounded detail. The phone review should check for any still-readable local lattice, repeated direction, or temporal beat.
- Internal render resolution and Canvas2D timing vary by Android browser and thermal state.
- Water Energy is a diagnostic strength control, not a final-realism setting.

## Phone test procedure

1. Serve the repository root and open Problem-NATURAL-EYE-R4B-NATURAL-WATER-LOCK-v1.html on the target phone.
2. Start from Static Reference, then tap START / RESUME. Leave WATER ENERGY off for the realism judgment.
3. Watch the open-water center, near-island water, and shore-adjacent water continuously for 10–20 seconds.
4. Ask only: Does this read as real lake water, or can I identify a mathematical animation pattern?
5. If a wave center, rings, a dominant travel direction, a repeated beat, a synchronized lake pulse, a visible grid, or sliding-photo behavior is identifiable, record a visual fail.
6. Use PAUSE, STATIC REFERENCE, and DEBUG GEOMETRY to inspect anchors and boundaries. Use WATER ENERGY only as a secondary motion-confirmation check.
7. Record diagnostics and the phone result. Do not begin R5 from this checkpoint.

R4B is ready for phone review, not visually passed by this report.

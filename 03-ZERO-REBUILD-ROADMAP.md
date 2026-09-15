# Zero Rebuild Roadmap

## Z0 — Static Golden Lock
Show the exact approved base with no animation, no canvas, no RAF, no filter system, and a visible build marker.

## Z1 — Geometry Lock
Create the authoritative region model using native 960×640 or normalized coordinates. Separate moving and static materials precisely.

Required regions:
1. lake moving surface,
2. island static exclusion,
3. waterfall stream,
4. waterfall impact/spray,
5. far air/mountains,
6. mid forest,
7. near foliage clusters,
8. static wood/trunks,
9. static rocks/shore intrusions.

## Z2 — Runtime Kernel
Build one SceneClock and one top-level RAF owner. No visual subsystem may own a private animation loop.

## Z3 — Proof Water
Water only. Exaggerate movement so the real phone result is unmistakable. This stage proves the rendering path, not realism.

## Z4 — Natural Water
Replace obvious periodic motion with irregular multi-scale flow. Add shoreline/island attenuation and remove any rubber-image feeling.

## Z5 — Reflection
Derive the sunlight reflection from the exact same water state. No independent sparkle clock.

## Z6 — Waterfall + Spray
Build continuous downward flow, impact breakup, and spray without visible dashed repetition.

## Z7 — Atmosphere
Add depth-limited valley air and waterfall moisture. Avoid a moving global fog sheet.

## Z8 — Foliage + Depth
Move leaf clusters around stable anchors. Near vegetation moves more; distant vegetation barely moves. Trunks and rocks remain stable.

## Z9 — Scene Unification
Use one environment state for wind, time, light direction, and depth response so the scene reads as one place.

## Z10 — Performance Hardening
Run full device benchmarks, tiers, reduced-motion validation, background/foreground recovery, and per-layer cost analysis.

## Z11 — Problem Home Integration
Only after the standalone scene passes Z10. Integrate with PageLife, Home layout, theme state, CTA, I18N, and Bottom Nav.

## Z12 — Final Verification and Golden Lock
No new features. Verify regressions, lifecycle, mobile layouts, theme persistence, and final visual quality.

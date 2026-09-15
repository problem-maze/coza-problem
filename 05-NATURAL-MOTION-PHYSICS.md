# Natural Motion Physics Specification

## Realism principle
Natural motion is a field of related but non-identical behavior, not a set of synchronized loops.

## Water
The lake should combine:
- macro drift: slow, broad directional flow,
- mesoscale interference: irregular changing wave cells,
- micro ripples: small detail only where it survives phone scale,
- boundary attenuation: motion approaches zero near shoreline, island edges, rocks, and wood intrusions.

Avoid an exposed short sine cycle. Periodic math may exist internally, but the visible result must not return to an obvious pose every few seconds.

## Reflection
Reflection must be a consequence of water state:
- use local slope/normal approximation,
- stable sun direction,
- changing surface roughness,
- localized catchlight corridor.

Do not place uniform glitter across the lake.

## Waterfall
Use continuous flow, local velocity variation, breakup toward the bottom, and a separate impact/spray zone.
Avoid marching dashes or visibly repeating stripe patterns.

## Atmosphere
Atmospheric movement is much slower than water and must be limited by depth.
Use long irregular drift and local waterfall moisture. Do not apply a moving translucent sheet over the whole image.

## Foliage
Model anchored movement:
- trunk/branch anchor stable,
- leaf cluster rotates/translates slightly around the anchor,
- near clusters respond more,
- mid clusters respond less,
- far clusters are almost still,
- clusters share wind direction but not identical phase.

## Irregularity tools
Preferred ingredients include seeded low-frequency noise, curl-like fields, phase drift, non-commensurate frequencies, spatially varying amplitude, and bounded gust envelopes.

## Developer modes
`PROOF`: deliberately exaggerated and visually undeniable.
`NATURAL`: product target.
Proof values must never silently become final values.

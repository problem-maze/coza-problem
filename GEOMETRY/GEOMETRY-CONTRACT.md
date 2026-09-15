# Geometry Contract

## Coordinate system
Author geometry in the native source space: **960×640**.
Normalized `[0,1]` coordinates are also acceptable if conversion is centralized and deterministic.

Never scatter independent geometry literals across rendering functions.

## Required regions
- `lake`
- `islandStatic`
- `waterfallStream`
- `waterfallSpray`
- `farAir`
- `midForest`
- `nearFoliage[]`
- `staticWood[]`
- `staticRocks[]`

## Required properties
Each region should expose:
- stable id,
- material type,
- polygon/path data,
- motion eligibility,
- optional feather/attenuation width,
- debug color only for geometry mode.

## Debug requirements
Z1 debug mode must show region outlines and labels on top of the exact source image.
If control points are used, expose them only in debug mode.

## Phone screenshot findings to correct
The old map shown in `EVIDENCE/phone-region-map-debug-691x1536.jpg` was not final:
- lake upper edge overlapped shore/wood in places,
- island exclusion was too broad,
- waterfall stream and spray were merged,
- far-air region overlapped near foliage/branches,
- near-foliage regions captured some static wood/rocks,
- mid forest was not independently mapped.

Z1 must fix these before any water implementation begins.

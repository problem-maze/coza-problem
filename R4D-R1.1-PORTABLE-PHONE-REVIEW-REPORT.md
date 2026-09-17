# R4D-R1.1 — Portable Phone Review Recovery

## Status

```text
R4D-R1.1: READY FOR PHONE REVIEW
R5: NOT STARTED
```

## Parent

- Branch: `rebuild/natural-eye-zero-v1`
- Previous checkpoint: `d3ddf62f0c01b952a5a40240e797ac028c4e5209`
- Scope: R4D-R1.1 portability and runtime-preflight recovery only.
- R4C was not modified.

## Recorded failure addressed

The first phone recording showed:

- `approved source failed to load`
- `frames=0`
- `viewport=0x0`
- `WebGL low-frequency base is not ready`

This was an incomplete delivery path: the downloaded HTML referenced an asset that was not present beside it. It was not evidence against the R4D-R1 spatial flow field.

## Correction

- The approved `960×640` WebP is embedded in this single HTML artifact as its original bytes, preserving the approved source SHA-256:
  `a993834ccddaf3d21b847584273b31ec07e8a37df8496570623e4c762c4c66ab`.
- The contextual source preview and the isolated ROI source use that same embedded data.
- The portable preflight starts at `booting portable source`, then must reach `ready`.
- B, C, D, and Start/Resume are disabled until the source, WebGL, non-zero layout, and low-frequency base are ready.
- The only recurring frame loop remains SceneClock's single D-mode RAF owner.

## Preserved R4D-R1 rules

- Same ROI: `x=215, y=275, width=190, height=130`.
- Same fixed blurred base and refraction cap: `<= 1.25px`.
- Same spatially varying continuous flow field for normals only.
- No original-pixel motion, residual reconstruction, texture scrolling, or generated media.
- No R5 work.

## Validation

- Embedded data URI is a WebP payload and is present once.
- No external approved-source path remains in the portable artifact.
- A Node script-syntax compilation passes on the extracted script.
- JSON report parses.
- Static checks confirm explicit `.gl-surface` edges, no `inset:`, one RAF call site, and no Canvas2D/ImageData residual path.

## Phone procedure

1. Download and open only `Problem-NATURAL-EYE-R4D-R1.1-PORTABLE-PHONE-REVIEW-v1.html`.
2. Wait for A status to say `portable WebGL proof ready`.
3. Open Diagnostics and confirm `preflight=ready`, `rendererState=ready`, non-zero viewport/internal render, and after D starts `frames>0`.
4. Run D continuously for at least 20 seconds and record the visible water.
5. Reject any sliding image, tiled/mosaic structure, texture scrolling, radial/concentric regularity, boiling noise, short loop, or excessive refraction.

## Decision

R4D-R1.1 is ready for phone review. This report does not claim a phone visual PASS.

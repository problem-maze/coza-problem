# R4C — Water Representation Lab

## Status

R4C: READY FOR PHONE REVIEW

R5: NOT STARTED

No visual PASS is claimed. This is a real-phone comparison lab.

## Scope and source

R4C is a new page based on the proven R4B Canvas2D path. R4B is not modified. The only authoritative input is `ASSETS/AUTHORITATIVE/natural-eye-approved-base-960x640.webp` with SHA-256 `a993834ccddaf3d21b847584273b31ec07e8a37df8496570623e4c762c4c66ab`.

No reflection, waterfall animation, spray, atmosphere, foliage, parallax, generated images, or video is present.

## Confirmed R4B root cause

R4B advected the original photographic water at `x + dx, y + dy`. Its original pixels already encode a readable concentric/radial ripple arrangement. Changing the vector field altered how those rings moved, but could not remove their baked geometry.

R4C separates representation from motion. Its D render function uses `const source=renderer.reconstructedPixels;`, not the original source buffer.

## Renderer and views

Canvas2D ImageData remains selected because the R3/R4 real-photo path is phone-proven, straightforward to inspect, and requires only one visible renderer.

| View | Method |
| --- | --- |
| A — ORIGINAL | The untouched approved source image. |
| B — DE-RINGED | Water-only, mask-aware, three-pass low-pass photographic base. Nominal radii are 11, 22, and 36 design pixels; 94% blend in open water falls smoothly to zero at the protected boundary. |
| C — RECONSTRUCTED | B plus real high-frequency residuals, `original − B`, sampled only from valid interior water. A seeded lattice blends up to four local residual samples with smoothstep weights. |
| D — NATURAL FLOW | Restrained macro/meso/micro motion at 0.42 scale samples C only. |

## Boundary and texture protection

The existing Z1 water mask and static exclusions are preserved. The smooth boundary field reaches zero at shoreline, island, rocks, wood, waterfall, spray, and other excluded regions. Bilinear samples are used only when all source-footprint pixels are valid water.

C selects source candidates at approximately 43 design pixels from a boundary, then maps local coordinates at 0.48 scale. It transfers photographic detail while B supplies low-frequency color and lighting. This is intended to break the original global radial arrangement without hard rectangular copy seams.

## Runtime and performance

- One SceneClock owns the single requestAnimationFrame call.
- There are no interval or timeout loops.
- Pausing/backgrounding preserves elapsed time; foreground recovery refreshes only the timestamp.
- B and C build after source load or internal-size change only. D has no representation rebuild or per-frame allocation.
- Canvas internal width is clamped to 360–600 pixels at 3:2. Diagnostics exposes viewport, DPR, FPS, average frame cost, and maximum frame cost on the review phone.

No performance or visual PASS is claimed from this environment. Device metrics and visual judgement remain for phone review.

## Validation completed

- Inline script: `node --check` passed.
- Approved source SHA-256: passed.
- Static constraints: A/B/C/D controls, de-ring/reconstructed buffers, D reconstructed-buffer sampling, boundary protection, one RAF owner, zero recurring timers, no WebGL, no video, and no R4B label: passed.
- R4B preservation: Git status contains only R4C deliverables.

## Remaining risks

- B may still retain broad ring evidence or be too smooth.
- C may show a mosaic or repeated texture on a phone screen.
- D may still expose a recognizable mathematical motion pattern.

## Phone review procedure

1. Open fullscreen and wait for A source-ready status.
2. Compare A and B for removal of the persistent radial center while anchors remain fixed.
3. Hold C static for at least 10 seconds; check for photographic detail, seams, tiling, and anchor stability.
4. Only after C, run D for 10–20 seconds; check for natural motion with no radial center, sliding photo, or moving anchors.
5. Use Diagnostics to capture device metrics separately from the visual verdict.

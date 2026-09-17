# R4D-R1 — Spatial Flow Field Proof

## Status

R4D-R1: READY FOR PHONE REVIEW

R5: NOT STARTED

No phone visual PASS or phone-performance PASS is claimed.

## Parent and scope

- Parent branch: `rebuild/natural-eye-zero-v1`
- Parent commit: `7f1c55bf5503827d00330ed231dd9532564d2c9f`
- Parent artifact retained unchanged: `Problem-NATURAL-EYE-R4D-WEBGL-WATER-SURFACE-PROOF-v1.html`
- R4C files are not modified.
- This is an explicit R4D proof revision, not R5 and not a full-lake implementation.

The only photographic input remains `ASSETS/AUTHORITATIVE/natural-eye-approved-base-960x640.webp`, SHA-256 `a993834ccddaf3d21b847584273b31ec07e8a37df8496570623e4c762c4c66ab`.

## Changed

Created `Problem-NATURAL-EYE-R4D-R1-SPATIAL-FLOW-FIELD-PROOF-v1.html` from the frozen R4D proof.

Only the final WebGL surface logic changed:

- The one-time two-pass blurred photographic base is unchanged.
- The isolated ROI is unchanged: `x=215, y=275, width=190, height=130`.
- The final shader now evaluates three continuous deterministic control fields:
  - `directionField`
  - `energyField`
  - `phaseField`
- The fields are spatially fixed; their values are smoothly interpolated from deterministic hashes. Time only changes local heading, energy, and phase. No image or procedural texture is translated across the ROI.
- Those controls locally rotate the six non-aligned analytic wave directions, vary their amplitude, and vary their phase/rate.
- The resulting gradient drives the normal only. The final shader still samples only `u_base`.
- Refraction remains bounded by the existing `1.25 px` cap against `gpu.baseTarget.texture`.
- The CSS contract violation was corrected: `.gl-surface` now uses explicit `top/right/bottom/left:0` instead of `inset:0`.

## Intentionally unchanged

- The original source image is never animated or sampled by the final shader.
- No residual reconstruction, patch blending, Canvas2D ImageData path, or `x+dx/y+dy` image advection exists.
- No texture scrolling, reflection system, waterfall, spray, atmosphere, foliage, parallax, generated asset, or R5 work exists.
- The original R4D artifact and all R4C files remain unchanged.
- The one SceneClock RAF owner, background/foreground handling, A/B/C/D modes, internal render limits, and one final fullscreen draw per animated frame remain unchanged.

## Validation performed

- Extracted inline JavaScript: `node --check` passed.
- Static checks passed:
  - explicit four-edge replacement present and no `inset:` declaration remains;
  - final shader contains `valueNoise`, `directionField`, `energyField`, `phaseField`, and `localDirection`;
  - final shader samples `u_base` only and contains no `u_texture` or `sourceTexture` reference;
  - the existing `1.25 px` refraction cap is present;
  - no R4C image-reconstruction identifiers or Canvas2D ImageData calls exist;
  - exactly one `requestAnimationFrame` call site and zero recurring timer call sites exist;
  - three total `gl.drawArrays` call sites remain: two one-time base passes and one final draw path.

The environment did not provide a target-phone WebGL runtime. Shader compilation, visual judgement, and performance remain pending real-phone evidence.

## Known risks

- The target phone may expose directional interference, excessive stillness, or a readable rhythm during a 20-second review.
- The continuous control fields may need later calibration only if the phone evidence identifies a specific visual failure.
- WebGL compile and measured FPS on the target device are not yet verified.

## Phone test

1. Open the R4D-R1 artifact and wait for `R4D-R1 WebGL proof ready`.
2. Inspect A to confirm the untouched source crop.
3. Inspect B to confirm the static low-frequency base.
4. Hold C to confirm a deterministic frozen normal response.
5. Run D continuously for at least 20 seconds.
6. Reject D if it shows a radial center, concentric pattern, sliding image, texture-scroll look, tiled/mosaic structure, boiling noise, a short loop, excessive refraction, or obvious synchronized motion.
7. Open Diagnostics and record FPS, frame costs, internal render size, viewport, and DPR.
8. Confirm that every non-ROI feature remains static.

## Decision

R4D-R1: READY FOR PHONE REVIEW

R5: NOT STARTED


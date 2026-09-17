# R4D — Isolated WebGL Water Surface Proof

## Status

R4D: READY FOR PHONE REVIEW

R5: NOT STARTED

No visual PASS or phone-performance PASS is claimed.

## Frozen inputs

R4C was not modified. Its checksums before and after the R4D implementation are:

- `Problem-NATURAL-EYE-R4C-WATER-REPRESENTATION-LAB-v1.html`: `71528c6fa6dc95e16a480a285700ac34ea00c3e7bc429aac81fa24c4d9040ce4`
- `R4C-REPORT.md`: `adf54fe1a3c4da838fa5607f2e8f617c23e6e3bf91291504ae1362272aafd93a`
- `R4C-report.json`: `a0f306599b617d21392ad1726d75beafd07a1871ed04063758eb246e678580b8`

The only photographic source is `ASSETS/AUTHORITATIVE/natural-eye-approved-base-960x640.webp`, SHA-256 `a993834ccddaf3d21b847584273b31ec07e8a37df8496570623e4c762c4c66ab`.

## Architecture

The original scene is a static DOM image/background. WebGL is limited to one enlarged open-water crop at source coordinates `x=215, y=275, width=190, height=130`, left of the island and separated from shore, trees, wood, and rocks.

The pipeline is:

`static source texture → one-time two-pass low-frequency base → procedural analytic normals → tiny base-only refraction + subtle lighting → isolated ROI canvas`

The final animated shader never samples the original source texture. It samples only the precomputed low-frequency framebuffer texture. There is no original-photo `x+dx/y+dy` path, de-ring reconstruction, patch reconstruction, ImageData loop, or reused R4B/R4C moving-image representation.

## Review modes

| Mode | Output |
| --- | --- |
| A — ORIGINAL WATER CROP | Untouched static crop from the approved image; WebGL canvas hidden. |
| B — LOW-FREQUENCY PHOTOGRAPHIC BASE | Static GPU base produced by horizontal and vertical nine-tap blur passes over the crop. |
| C — PROCEDURAL SURFACE FROZEN | Base-only refraction and normal lighting evaluated at deterministic time `37.25`, with no clock motion. |
| D — PROCEDURAL SURFACE ANIMATED | The same procedural surface driven by the single SceneClock. This mode must be watched for at least 20 seconds. |

## Procedural surface

The surface normal is an analytic gradient formed from six directional wave components. Their directions are non-aligned, spatial frequencies span `1.05` through `7.73`, and temporal rates use positive and negative non-commensurate values. Each component also has a separate slow energy envelope and slow phase modulation.

There is no radial coordinate, center point, distance field, ring function, scrolling noise texture, or regenerated random noise. Analytic gradients avoid finite-difference texture sampling and boiling noise. Multi-direction interference and slowly changing energy prevent synchronized translation and a short readable loop.

## Refraction and lighting

- Refraction samples only the static low-frequency base texture.
- The displacement vector is bounded by the unit normal and a `1.25 px` scale, keeping the theoretical vector magnitude at or below approximately `1.25 px`.
- Refraction is clamped inside the ROI texture; it cannot reach scene anchors.
- Lighting uses restrained normal-driven diffuse luminance and a small warm specular term.
- The light vector points toward the upper-right, matching the visible sun in the approved source.
- No reflection system is present.

## Runtime and performance design

- WebGL 1 is used for one ROI canvas only.
- Internal width is clamped to `320–480 px`; maximum internal size is approximately `480×328`.
- The original source uploads once. The two low-frequency framebuffer passes run only after load or an internal-size change.
- D submits one fullscreen-quad draw per frame.
- No per-frame texture, framebuffer, typed-array, or ImageData allocation occurs.
- One top-level `requestAnimationFrame` owner is present.
- No `setInterval` or recurring timeout exists.
- Backgrounding cancels the pending RAF without resetting elapsed time; foregrounding refreshes the timestamp before resuming.
- Diagnostics exposes approximate FPS, average/last/maximum CPU frame-submit cost, internal render size, viewport, and DPR.

The design target is at least 30 FPS on an A05s-class Android phone. That target is not asserted here because no equivalent WebGL phone context was available in this environment; the review phone must supply the measurement.

## Validation completed

- Inline JavaScript: `node --check` passed.
- Required A/B/C/D modes: passed.
- Isolated ROI and one WebGL canvas: passed.
- Final shader samples `u_base` only: passed.
- D binds `gpu.baseTarget.texture`, never `gpu.sourceTexture`: passed.
- One RAF owner and zero recurring timers: passed.
- No Canvas2D/ImageData path: passed.
- No R4B/R4C reconstruction identifiers: passed.
- No video or prohibited media path: passed.
- Approved asset SHA: passed.
- Frozen R4C checksums: passed.

## Remaining risks

- WebGL shader compilation and measured FPS still require the target phone.
- The low-frequency base may be too soft or retain too much source structure on the phone display.
- The six-scale surface may still reveal directional interference, excessive stillness, or a readable rhythm during a 20-second review.
- The luminance/specular response may need later calibration, but no such realism pass is authorized before phone evidence.

## Phone review procedure

1. Open R4D fullscreen and wait for `WebGL proof ready`.
2. Inspect A to confirm the exact original crop.
3. Select B and confirm the base is static, low-frequency, and free of anchor content.
4. Select C and hold for several seconds. Confirm the surface response is frozen and restrained.
5. Select D or START / RESUME and watch continuously for at least 20 seconds.
6. Reject D if a radial center, concentric pattern, short loop, boiling noise, sliding texture, excessive refraction, or obvious directional synchronization appears.
7. Open Diagnostics and record FPS, frame costs, internal size, viewport, and DPR. The target is at least 30 FPS.
8. Confirm the context scene and every non-ROI feature remain completely static.

Do not proceed to R5 without the real-phone verdict.

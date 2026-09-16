# R4 — REAL IMAGE WATER MOTION

R4: READY FOR PHONE REVIEW
R4B: NOT STARTED

## Scope

This checkpoint proves only the first real photographic lake-pixel motion mechanism. It does not animate reflection, waterfall, spray, atmosphere, foliage, parallax, or any other L0 environment layer. The approved source remains the only image input:

- `ASSETS/AUTHORITATIVE/natural-eye-approved-base-960x640.webp`
- SHA-256: `a993834ccddaf3d21b847584273b31ec07e8a37df8496570623e4c762c4c66ab`

The source file was not modified.

## R3 Stage D root-cause diagnosis

R3 established visible motion for DOM/CSS, Canvas2D, and WebGL presentation. Stage D was the remaining failure. The Stage D implementation was not a real lake compositor: it clipped a hard-coded `230×135` window and copied nine independent horizontal `drawImage` bands from shifted source rectangles.

That structure caused the Stage D phone failure for two verified reasons:

1. It had no authoritative Z1 water mask. There was no lake polygon, island exclusion, shoreline attenuation, or rock/wood/waterfall exclusion in the real-image path.
2. Its sampling was sparse one-dimensional strip replacement. It had no continuous two-dimensional displacement field, no bilinear bounded resampling, and no guarantee that a source sample stayed within the photographic water surface. Most of the approved lake remained untouched, so the phone did not show convincing real-surface motion.

The source and presentation path were alive: R3 loaded the approved image, created the Canvas2D context, resized the overlay for CSS pixels/DPR, and placed the overlay above the source image. Stage B’s phone result also demonstrated that Canvas2D presentation was visible. The failure was therefore classified as:

| Classification | R3 finding |
| --- | --- |
| Texture upload/source | Not the root cause; the approved image loaded and was used by `drawImage`. |
| Mask/geometry | Primary root cause; Stage D used a fixed rectangle rather than the Z1 lake mask and static exclusions. |
| Sampling | Primary root cause; nine independent horizontal bands were not a continuous 2D deformation. |
| UV transformation | Primary root cause; no localized field with spatial phase variation or bounded water-only sampling existed. |
| Compositor visibility | Not the root cause; the overlay was visible in the DOM and ordered above the source. |
| Viewport/DPR scaling | Not the root cause; R3 resized its canvases using the scene rectangle and DPR. |
| Draw ordering | Not the root cause; the image overlay was above the base image. |
| Alpha/compositing | Not the root cause; the overlay used a transparent Canvas2D surface and source-over drawing. |
| Renderer architecture | Primary root cause; overlaying a small strip patch could not prove anchored, continuous photographic water motion. |

R4 replaces that path instead of layering another patch over it.

## Renderer selected

R4 uses Canvas2D `ImageData` resampling.

Canvas2D was selected because R3 proved it visibly animates on the target phone, and it is the simplest renderer that can directly read the approved image, resample its pixels, and write a localized result. WebGL was intentionally not preserved: R3 did not provide evidence that its additional shader/texture architecture was needed for this isolated proof.

## Exact pixel-deformation method

1. The approved image is decoded once into a downsampled source pixel buffer at the current internal render resolution.
2. The Z1 lake path is rasterized into a binary water mask in the same internal pixel space.
3. Each live frame first copies the complete untouched source buffer into the output `ImageData`. This keeps every non-water pixel fixed.
4. For water-mask pixels, a deterministic displacement field is evaluated from four spatially different components with non-commensurate temporal rates (`0.31`, `0.57`, `0.93`, and `1.37` radians/second), spatial phase variation, and nested phase modulation.
5. The field produces independent local `dx` and `dy` values. The destination pixel samples the source at that displaced coordinate with four-tap bilinear interpolation.
6. If a displaced sample would cross out of the water mask, the displacement is reduced to `52%`, then `20%`, then falls back to the original pixel. This prevents island, shoreline, waterfall, wood, or rock pixels being pulled into the moving surface.

`PROOF WATER` uses a deliberately strong 26 design-pixel horizontal amplitude and 14 design-pixel vertical amplitude, scaled to the internal buffer. Normal water is present only as a reduced mechanism check; R4’s phone review should use the strong proof mode.

There are no decorative wave lines or overlay marks pretending to be water.

## Boundary attenuation and geometry

The water mask uses the Z1 lake polygon with explicit static exclusions for:

- island
- waterfall stream and impact/spray area
- mid forest
- left and right near-foliage shoreline intrusions
- upper arch and both lower wood intrusions
- right shoreline rock

The mask is rasterized at the same internal resolution as the source buffer. A bounded 8-neighbor distance field is computed once after resize. A smoothstep weight over approximately 15 design pixels drives displacement to zero at the mask boundary. The open-water interior receives the stronger field. The output outside the mask is always copied from the untouched source buffer.

The Z1 lake/island geometry is retained. The waterfall stream and near shoreline exclusions are additionally enforced in the R4 water mask because they are static anchors that must not be sampled as lake surface pixels.

## Runtime architecture

- One `SceneClock` owns elapsed time, running state, pause state, and the RAF handle.
- One top-level RAF owner schedules `renderLoop`.
- No `setInterval`, `setTimeout`, independent animation loop, or imported script is used.
- Pausing cancels the pending RAF and retains elapsed time.
- Backgrounding cancels the pending RAF and clears only the delta anchor; foregrounding resumes from the retained elapsed time without a silent clock reset or hidden-time jump.
- Static Reference pauses the live loop and shows the untouched approved `<img>` for direct comparison.
- Debug Geometry is an optional SVG inspection overlay; it is not part of the water renderer.
- The only animated content is the masked photographic lake surface.

The visible canvas plus two offscreen Canvas2D buffers are justified: one source pixel buffer and one geometry-mask buffer are required for bounded image resampling. No second visible renderer is used.

## Phone performance smoke test

The repository-side smoke test passed. A browser/phone runtime smoke test is intentionally not claimed in this environment because no local browser or target phone session was available. The page’s collapsed diagnostics report the required live values during the user’s phone run:

- approximate FPS
- average frame cost
- maximum observed frame cost
- CSS viewport
- device pixel ratio
- internal render resolution
- renderer and water-mask pixel count

The default internal policy is approximately `1.25×` CSS width, clamped to `360–600` internal pixels wide, with a fixed 3:2 render ratio. This limits unnecessary full-resolution redraw work while keeping Proof Water strong.

## Validation results

| Check | Result |
| --- | --- |
| `node --check` on extracted inline runtime | PASS |
| Required controls present | PASS |
| One authoritative source asset | PASS |
| Source SHA-256 unchanged | PASS |
| Real `ImageData` resampling path present | PASS |
| Z1 lake/static-anchor geometry present | PASS |
| One RAF call / one top-level owner | PASS |
| Recurring timers | NONE |
| WebGL or stale R3 image compositor | NONE |
| Video/generated image/external script | NONE |
| `git diff --check` | PASS |
| Phone visual PASS | NOT CLAIMED |

## Remaining risks

- The Z1 boundary map is authored geometry, so the user must verify the real phone video for any remaining shoreline or island edge mismatch.
- Canvas2D `ImageData` cost varies by Android browser and thermals. The diagnostics values are the authority for the user’s phone smoke test.
- The internal buffer is intentionally bounded and may be softer than the untouched static reference when upscaled.
- The proof amplitude is intentionally exaggerated and is not a final naturalism claim.
- No phone visual PASS is inferred from code execution, context creation, or counters.

## Phone test procedure

1. Serve the repository root so the relative asset path resolves.
2. Open `Problem-NATURAL-EYE-R4-REAL-IMAGE-WATER-MOTION-v1.html` on the target Android phone at the established phone viewport.
3. Leave the default Static Reference visible for a baseline. Optionally open Diagnostics and note viewport/DPR/internal render values.
4. Tap `PROOF WATER`. It selects the strong proof amplitude, switches to the live Canvas2D view, and starts/resumes the SceneClock.
5. Watch the actual photographic lake texture, especially the open-water center. Confirm that texture deforms locally rather than translating as one image.
6. Confirm the shoreline, island, waterfall edge, wood, and rocks remain visually anchored. Use `PAUSE` to inspect an edge and `STATIC REFERENCE` for direct untouched-image comparison.
7. Use `DEBUG GEOMETRY` only to inspect the authored mask and anchors; turn it off before judging the image pixels.
8. Record the phone’s visual result and diagnostics. The real-phone video, not this report, decides the visual PASS.

Stop after R4. Do not begin R4B until the real phone confirms photographic lake motion with stable physical anchors.

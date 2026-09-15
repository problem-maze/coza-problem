# L0-R3 — Renderer Truth Test

L0-R3: READY FOR PHONE TRUTH TEST

L1: NOT STARTED

## Purpose

L0-R2 showed a live runtime, one RAF owner, healthy frame timing, WebGL execution, and zero visible pixel change on the real phone. This checkpoint stops realism work and isolates the first renderer path that fails to reach visible pixels.

The deliverable is a standalone page:

- Problem-NATURAL-EYE-L0-R3-RENDERER-TRUTH-TEST-v1.html

It uses the same 3:2 scene viewport contract as the approved base-image pages and references only the existing authoritative 960×640 WebP. No old L0 or L0-R2 renderer is imported or started underneath it.

## Proof stages

| Stage | Path | Visible test | Manual interpretation |
| --- | --- | --- | --- |
| A | Plain DOM/CSS | A large yellow DOM marker travels across a fixed upper scene region. | If A fails, browser/layout/animation presentation is broken. |
| B | Canvas2D | A solid red-and-white 2D shape moves over the image. | If A passes and B fails, Canvas2D presentation is broken. |
| C | WebGL | A solid magenta WebGL circle with a white cross moves over the image. | If A/B pass and C fails, WebGL presentation is broken. |
| D | Canvas2D image pixels | After manually marking A/B/C PASS, a strongly displaced window of approved lake pixels moves while the surrounding image remains static. | If A/B/C pass and D fails, image-texture, mask, or deformation is broken. |

Each stage has its own run button and separate manual PASS/FAIL buttons. Stage D is locked until the reviewer manually marks A, B, and C PASS. The page never infers a visual PASS from counters, frame timing, context creation, or internal state.

## Phone procedure

1. Serve the repository root so the relative authoritative image path resolves.
2. Open Problem-NATURAL-EYE-L0-R3-RENDERER-TRUTH-TEST-v1.html at the same target phone CSS viewport used for L0-R2, such as 384×731, 390×844, or 360×800.
3. Run Stage A alone. Watch the yellow DOM/CSS marker and manually mark PASS or FAIL.
4. Run Stage B alone. Watch the solid Canvas2D shape and manually mark PASS or FAIL.
5. Run Stage C alone. Watch the solid WebGL circle and manually mark PASS or FAIL.
6. Only if A, B, and C are visibly proven, run Stage D. Watch the outlined lake window for actual approved-image texture deformation; manually mark PASS or FAIL.
7. Record the page’s manual decision branch and stop. Do not continue water, reflection, waterfall, atmosphere, foliage, or realism work from this checkpoint.

The real phone’s naked-eye result is authoritative. The collapsed diagnostics are supporting health information only.

## Validation completed in the workspace

- Artifact uses one authoritative image reference and no generated image or video.
- Artifact contains one shared JavaScript requestAnimationFrame schedule for Canvas2D/WebGL/image-pixel proof stages; Stage A uses CSS animation and does not create another RAF owner.
- Artifact contains no imported script, old runtime class, L0-R2 renderer, natural-effect layer, interval, or timeout.
- Asset SHA-256 remains a993834ccddaf3d21b847584273b31ec07e8a37df8496570623e4c762c4c66ab.
- The report intentionally does not contain a phone visual PASS claim.

The final phone result is not known from static validation.

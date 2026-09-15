# Z0 + Z1 Gate

## Changed

- Created `Problem-NATURAL-EYE-Z0-STATIC-v1.html` as the static golden baseline. It uses the exact authoritative WebP at 960x640 and has the visible build marker `Z0 STATIC GOLDEN v1 — 960x640 SOURCE LOCK`.
- Created `Problem-NATURAL-EYE-Z1-GEOMETRY-v1.html` as the standalone geometry-lock artifact. It keeps the source image at the native 3:2 composition and adds a toggleable static SVG debug map with region outlines, labels, legend, and non-animated exclusion masks.
- Authored `GEOMETRY/REGION-SCHEMA.json` in native 960x640 coordinates with nine required region groups and 22 flattened paths: lake, islandStatic, waterfallStream, waterfallSpray, farAir, midForest, nearFoliage, staticWood, and staticRocks.
- Added explicit static exclusions so moving-eligible masks do not include the island, wood, rocks, shoreline, mid forest, near foliage, or far air where the map declares those boundaries.

## Intentionally unchanged

- `ASSETS/AUTHORITATIVE/natural-eye-approved-base-960x640.webp` was not modified. Verified SHA-256: `a993834ccddaf3d21b847584273b31ec07e8a37df8496570623e4c762c4c66ab`.
- No video, canvas, filter system, RAF, interval, runtime kernel, SceneClock, Home integration, PageLife integration, water renderer, or animation system was added. Z2 and all later gates remain untouched.
- The repository `main` branch was not modified. Work remains on `rebuild/natural-eye-zero-v1`.

## Validation performed

- Baseline repository state: clean dedicated rebuild branch before implementation; head `018eed0 Baseline: Natural Eye zero rebuild package`; tag `natural-eye-zero-baseline-v1`.
- `bash TOOLS/check_js.sh Problem-NATURAL-EYE-Z1-GEOMETRY-v1.html`: PASS; one script block extracted and `node --check` passed.
- `python3 TOOLS/validate_html.py Problem-NATURAL-EYE-Z0-STATIC-v1.html`: PASS; zero canvas, zero RAF, zero interval, no `:has()`, no `inset:0`, no video.
- `python3 TOOLS/validate_html.py Problem-NATURAL-EYE-Z1-GEOMETRY-v1.html`: PASS; zero canvas, zero RAF, zero interval, no `:has()`, no `inset:0`, no video.
- Native geometry contract check: PASS; all required groups present, 22 unique flattened paths, 9 debug labels, all path numbers in native bounds, and all exclusion references valid.
- Embedded-map consistency check: PASS; the Z1 single-file `REGION_MAP` values match `GEOMETRY/REGION-SCHEMA.json` by order-independent comparison.
- Static-only contract check: PASS; no `requestAnimationFrame`, `setInterval`, `setTimeout`, canvas, video, or CSS filter in Z1.
- Source integrity: PASS; `file` and `ffprobe` identify the approved source as WebP, 960x640, and `sha256sum` matches the package fingerprint.
- Rendered geometry inspection: PASS as a local static preview using the unchanged source pixels and the authored SVG mask map. This is not a browser or phone gate.
- `git diff --check`: PASS.
- Canonical `TOOLS/image_audit.py` and `TOOLS/package_preflight.py`: NOT RUN TO COMPLETION because the container Python environment has no Pillow module (`ModuleNotFoundError: No module named 'PIL'`). This is an environment limitation, not a source validation pass.

## Evidence

- Supplied phone evidence was read as forensic reference for the documented old mapping errors.
- No new real-phone screenshot was captured in this run. Phone-visible acceptance remains open by design.
- No runtime or performance metrics are applicable to Z0/Z1 because animation and Z2 runtime work are explicitly out of scope.

## Known risks

- The geometry is authoritatively encoded and statically rendered, but visual acceptance still requires manual inspection on the real phone at the target CSS viewport. The phone screenshot is the required evidence for deciding whether any native boundary needs adjustment.
- The local rendered preview is not a substitute for device-scale readability or browser layout behavior.
- Pillow-dependent package checks should be rerun in an environment with Pillow before final archival if that environment is available.

## Phone test

1. Open `Problem-NATURAL-EYE-Z0-STATIC-v1.html` at a target phone CSS viewport such as 384x731. Confirm the full 3:2 source is visible without a missing-image state and capture a screenshot with the Z0 marker visible.
2. Open `Problem-NATURAL-EYE-Z1-GEOMETRY-v1.html` at the same viewport. Leave `Regions on` and `Labels on`, then capture a screenshot.
3. Inspect the Z1 screenshot for these decisions: the lake outline stays on water and clear of upper wood and foreground intrusions; the island exclusion hugs only the island/tree body; waterfall stream and impact/spray are separate; far air stays behind the distant scene and clear of near branches; mid forest is independently visible; near foliage outlines do not cover static wood or rocks; static wood and rocks remain stable exclusions.
4. Return the two phone screenshots and a Z0/Z1 decision. Do not begin Z2 until the map is visually approved.

## Decision

**REVIEW — static implementation and geometry contracts are ready; real-phone visual approval is pending. STOP before Z2.**

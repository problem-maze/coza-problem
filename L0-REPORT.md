# L0 — Living Foundation

## Decision

**READY FOR PHONE REVIEW — visual acceptance is intentionally still open.**

This milestone is a new standalone living runtime built from the approved source image and the authoritative Z1 native geometry. It is not a continuation of the old animation artifacts.

## Changed

- Added `Problem-NATURAL-EYE-L0-LIVING-FOUNDATION-v1.html`.
- Kept the exact `ASSETS/AUTHORITATIVE/natural-eye-approved-base-960x640.webp` as the visual source; no image was generated or replaced.
- Embedded the authoritative Z1 paths in native 960×640 coordinates, including lake, island, waterfall stream, impact/spray, far air, mid forest, near foliage, static wood, and static rocks.
- Added one `NaturalEyeRuntime` owner with one top-level `requestAnimationFrame` schedule, one pause-aware `SceneClock`, explicit layer registration, error isolation, and lifecycle recovery for visibility, pagehide/pageshow, and focus.
- Added seeded multi-scale water displacement with fixed shoreline/island exclusions, water-derived reflection, continuous waterfall flow, localized spray, far-air drift, anchored foliage response by depth, and local-only parallax.
- Added Natural and explicit Proof modes, user pause/resume, failed-layer retry, and diagnostics separating runtime state, update/render counts, pixel-change sampling, clock resets, resumes, cadence, and per-layer errors.

## Motion-family status

| Family | L0 implementation | Intentional guardrail |
|---|---|---|
| Water | Multi-scale seeded field drives native-image tile displacement | Fixed Z1 lake clip, shoreline attenuation, island/rock/wood exclusions |
| Reflection | Uses the same current water state and fixed light direction | Narrow irregular corridor; no independent sparkle clock or glow layer |
| Waterfall | Source-texture strips flow continuously downward with local variation | Stream-only Z1 mask; no dashed strokes or full-scene motion |
| Spray | Seeded low-density impact particles and localized moisture | Spray-only Z1 mask near the base |
| Atmosphere | Slow irregular translucent veils inside far-air geometry | No full-screen fog sheet |
| Foliage | Region-specific anchored translation/rotation with near > mid response | Static wood, rocks, island, and excluded boundaries remain fixed |
| Depth/parallax | Tiny local far/mid depth shift plus bounded pointer response | Only far-air/mid-forest masks are shifted; no rubber-sheet transform |

## Intentionally unfinished

- No phone-visible PASS is claimed. Natural motion, stable boundaries, reflection coupling, waterfall continuity, spray density, atmospheric depth, foliage anchoring, and parallax still require real-phone video/screenshot review.
- No later milestone has started: no Z10 hardening, no Home/PageLife integration, no theme/I18N/CTA integration, and no final golden lock.
- Full Z10 benchmark evidence is intentionally not included at L0; the runtime exposes the required early diagnostics but this checkpoint is not a performance gate.
- The repository Pillow-dependent image/package scripts remain environment-limited in this container; equivalent `file`, SHA-256, and `ffprobe` checks were run successfully.

## Validation summary

- `bash TOOLS/check_js.sh Problem-NATURAL-EYE-L0-LIVING-FOUNDATION-v1.html`: **PASS**; one script block, `node --check` passed.
- `python3 TOOLS/validate_html.py Problem-NATURAL-EYE-L0-LIVING-FOUNDATION-v1.html`: **PASS**; no CSS `:has()`, no `inset:0`, no video.
- Custom Z1 consistency check: **PASS**; all 22 flattened authoritative paths and required region IDs are present; the approved asset path appears once.
- Runtime ownership check: **PASS**; one `requestAnimationFrame(` call site, zero `setInterval`, zero `setTimeout`, one `SceneClock` construction, and one `NaturalEyeRuntime` owner.
- Asset integrity: **PASS**; `file` and `ffprobe` report WebP 960×640; SHA-256 matches `a993834ccddaf3d21b847584273b31ec07e8a37df8496570623e4c762c4c66ab`.
- `git diff --check`: **PASS**.
- `python3 TOOLS/image_audit.py ...`: **ENVIRONMENT-LIMITED** because Pillow is unavailable (`ModuleNotFoundError: No module named 'PIL'`).
- `python3 TOOLS/package_preflight.py .`: **ENVIRONMENT-LIMITED** for the same missing Pillow module.
- No browser or phone visual PASS was claimed; local browser/real-phone visual review remains the authority.

## Exact phone review

1. Copy/open `Problem-NATURAL-EYE-L0-LIVING-FOUNDATION-v1.html` together with the repository `ASSETS` folder so the relative asset path resolves.
2. Review at a target portrait phone CSS viewport such as 384×731, 390×844, or 360×800. The scene is intentionally landscape 3:2 inside the portrait page; do not crop it.
3. Leave **Mode: NATURAL** selected for the product-target review. First capture a screenshot after the source is visible, then record a short 10–20 second screen video.
4. Confirm visually that water moves irregularly while the shoreline and island remain fixed; reflection follows the water; the waterfall continuously falls; spray stays at the impact; atmosphere is distant and slow; near foliage responds more than mid/far regions; trunks, rocks, island, and major wood stay fixed; and the image is not globally warped.
5. Open the Runtime diagnostics disclosure and capture it after several seconds. Check `runtime=alive`, `active=true`, increasing frames/updates/renders, `pixels=changed`, `rafOwners=1`, `resets=0`, and no layer `ERROR`.
6. Tap **Pause scene**, verify movement stops and the diagnostics show `active=false`; tap **Resume scene** and verify movement continues without a visible sequence reset.
7. Switch away from the page or pull down the notification shade, return, and verify the scene resumes without reload, with `resets=0` and a higher `resumes` count.
8. Optionally use **Mode: PROOF** only to make each motion family easier to inspect; return to Natural before deciding product realism. Return the screenshots/video and a phone decision. Do not treat counters as a visual PASS.

## Scope boundary

Only L0 is implemented. Do not begin L1 or any later milestone from this checkpoint.

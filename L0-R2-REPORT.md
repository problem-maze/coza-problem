# L0-R2 — Cinematic Living Photograph Recovery

## Decision

L0-R2: READY FOR PHONE REVIEW

L1: NOT STARTED

A real 10–20 second phone video is still required for visual acceptance. This checkpoint does not claim a visual PASS.

## Diagnosed root causes

| Failure | Classification | Diagnosis |
|---|---|---|
| Lake looked static | ineffective pixel transformation; insufficient visible motion; excessive frame cost | The previous renderer re-sampled small 40×22 Canvas2D tiles on a 24×16 grid. Native displacement was only a few pixels, so it largely disappeared after phone downscaling. The repeated tile work also made captured phone states expensive. |
| Reflection was not convincing | unsuitable rendering technique; insufficient physical coupling | Reflection strokes had a separate visual rhythm and were not a consequence of the same pixel state that changed the lake surface. |
| Waterfall looked like the moving subsystem | unsuitable rendering technique | Wrapped source strips plus regular strokes created a clear effect, but the motion exposed a repeating texture/line construction instead of continuous falling water. |
| Foliage looked static or synthetic | ineffective pixel transformation; compositing/visibility issue | Whole source bounds were translated or rotated behind a clip. The small motion was visually weak and the rectangular/cardboard behavior was structurally wrong for anchored leaves. |
| Atmosphere was too weak | insufficient visible motion; compositing/visibility issue | Thin clipped veils were below phone-scale visibility and read as occasional overlays rather than depth-aware air. |
| Review scene was too small | viewport scaling issue | The previous page spent too much vertical and visual attention on the diagnostics panel. A reviewer could not judge the environment at phone scale. |
| Captured frame cost was suspicious | excessive frame cost; unsuitable rendering technique | Multiple per-layer Canvas2D scratch surfaces, many tile draws, and synchronous pixel sampling competed with the living scene. |
| Counters over-reported confidence | lifecycle/diagnostics design issue | Update/render/pixel counters established code execution, not perceptual motion. The replacement keeps diagnostics passive and explicitly labels the phone as authority. |

## Architectural replacements

- One global NaturalEyeRuntime owns one SceneClock, one top-level requestAnimationFrame schedule, lifecycle pause/resume, layer registration, failure isolation, and diagnostics.
- Logical subsystem layers update shared environment state at bounded cadences. One material-compositor layer renders the state; no layer owns a private clock, RAF, interval, or timeout.
- The approved 960×640 source remains a static image beneath one transparent motion canvas. No source image, video loop, generated image, or full-scene warp was added.
- The native Z1 geometry remains centralized in REGION_MAP. One-time masks are generated from the exact paths, including hard exclusions for island, wood, rocks, shore intrusions, waterfall separation, and far-air depth.
- Water and reflection share one shader field, one SceneClock time, one stable light direction, and one local water influence mask. The reflection response is computed from the same displaced surface normal/roughness field.
- Waterfall flow uses a domain-warped continuous downward source field with varied local velocity and breakup. Spray is a localized low-density moisture field whose energy is driven by waterfall state, not a separate particle choreography.
- Atmosphere is limited to the farAir mask and uses very slow, non-synchronized drift. Waterfall moisture remains in the separate impact mask.
- Foliage uses a per-pixel anchored field. The mask stores attachment distance and depth, so motion approaches zero around attachment points and near response exceeds mid response. Trunks, rocks, island mass, and major wood remain in the untouched base.
- Parallax is disabled in this recovery because realism outranks feature completeness; there is no whole-scene camera wobble or rubber-sheet transform.
- Natural is the default. Proof focus is explicit and separately selected; proof gains are only applied while mode is PROOF.

## Renderer choice and reasoning

WebGL is the primary renderer. The fragment compositor performs one fullscreen draw at a capped internal resolution: approximately 1.7× the CSS scene width on standard hardware and 1.45× on low-tier hardware, capped at the native 960-pixel width. The GPU samples the approved source with material-specific fields through three native masks. This replaces the old CPU-heavy tile and scratch-surface approach while making the lake pixels themselves change continuously.

A Canvas2D fallback is retained only for devices that cannot initialize WebGL. It uses the same centralized paths, stable clips, shared SceneClock state, and bounded motion families; it is a compatibility path, not a second active renderer.

## Proof and phone-first review

The page opens in a phone-first layout. The exact 3:2 scene fills the available width, the surrounding dock is compact and fixed low on portrait screens, and diagnostics are collapsed by default.

Manual proof tests:

- WATER ONLY: water surface plus its coupled reflection.
- WATERFALL ONLY: continuous waterfall plus localized impact moisture.
- ATMOSPHERE ONLY: far-air depth response.
- FOLIAGE ONLY: anchored near/mid foliage response.
- ALL: every enabled family.

Selecting a proof focus enters PROOF explicitly. Returning to the Mode button returns to NATURAL; proof values do not become Natural values.

## Remaining risks

- This environment has no Chromium, Playwright, Puppeteer, or other local browser runtime available, so shader compilation and live frame-cost numbers could not be exercised here.
- The actual phone may expose edge alignment, WebGL precision, source-texture orientation, or motion-visibility issues that static checks cannot prove.
- The waterfall shader uses a long, non-commensurate flow field; the phone review must still reject the build if any repeated texture rhythm is visible in a 10–20 second recording.
- The Canvas2D fallback is intentionally less expressive than the WebGL path and should be treated as a compatibility safety net.
- No Z10 benchmark, Home integration, or later milestone work was started.

## Phone test procedure

1. Serve the repository root over a local HTTP server and open Problem-NATURAL-EYE-L0-R2-CINEMATIC-LIVING-RECOVERY-v1.html on the target Android phone. Use a portrait viewport around 384×731, 390×844, or 360×800.
2. Confirm the approved still is visible and the page opens in Mode: NATURAL. Start a 10–20 second screen recording with the compact dock visible only as needed.
3. Watch the lake first. The water pixels must visibly change across the surface while the shoreline, island, wood, rocks, and waterfall boundary remain anchored. Reflection must change with the same surface, with no independent shimmer rhythm.
4. Watch the waterfall separately. It must read as continuous falling water with local variation and breakup toward the base; spray must remain localized and intermittent.
5. Over several seconds, check that far-air depth becomes perceptible without a full-screen fog sheet. Near foliage should be alive, mid vegetation weaker, far vegetation nearly still, and trunks/rocks/large structures static.
6. Tap each PROOF focus for a short inspection. Confirm only the selected family is exaggerated, then return to NATURAL and judge the environment for another uninterrupted 10–20 seconds.
7. Open Runtime diagnostics manually only after the visual recording. Confirm runtime alive, active true, rafOwners 1, resets 0, no ERROR lines, and a usable FPS/frame-cost reading. Treat these as health information only.
8. Tap Pause scene and Resume scene. Confirm the visible motion stops and resumes without a visual sequence reset.
9. Background the page or pull down the notification shade, return, and confirm it resumes without reload and without a clock reset.
10. Acceptance remains REVIEW until the phone video shows one continuously living environment with no repeating rhythm, mask edge, tearing, cardboard movement, global breathing, or major stutter.

## Validation performed

- JavaScript: PASS — TOOLS/check_js.sh extracted one script block and node --check passed.
- HTML contract: PASS — TOOLS/validate_html.py reported no CSS :has(), no CSS inset:0, and no video.
- Geometry: PASS — 22 embedded path strings exactly match GEOMETRY/REGION-SCHEMA.json; all nine required region groups are present.
- Runtime ownership: PASS — one NaturalEyeRuntime instance, one SceneClock construction, one requestAnimationFrame call site, no setInterval or setTimeout tokens, and no imported script.
- Source integrity: PASS — ASSETS/AUTHORITATIVE/natural-eye-approved-base-960x640.webp remains WebP 960×640 with SHA-256 a993834ccddaf3d21b847584273b31ec07e8a37df8496570623e4c762c4c66ab.
- Default/review controls: PASS — NATURAL is the constructor default, diagnostics have no open attribute, and all five proof focus controls are present.
- Stale-path review: PASS — the new file contains no makeVisualLayer, renderRegion, scratchCanvas, waterCell, or drawSourceBounds path from the failed L0 renderer.
- Generated-image check: PASS by worktree review — no image file was added or modified for this recovery. The repository image_audit.py and package_preflight.py were also attempted but are environment-limited because Pillow is not installed.
- Whitespace: PASS — git diff --cached --check returned clean.

## Changed files

- Problem-NATURAL-EYE-L0-R2-CINEMATIC-LIVING-RECOVERY-v1.html
- L0-R2-REPORT.md
- L0-R2-report.json

The authoritative image and all prior milestone artifacts remain unchanged.

## Performance smoke-test observations

No numerical browser smoke test was possible because no local browser package or executable is installed. Static/runtime observations are favorable for L0 review: the active WebGL path submits one compositor draw per top-level frame; logical environment state updates are bounded at 30, 24, 18, 12, and 8 Hz; the compositor is capped below native width on phone-sized CSS viewports; diagnostic DOM writes occur no more than about once per 700 ms; and pixel probes run only while diagnostics are manually open and no more than about once per 1.4 s. These observations are not a Z10 pass and must be checked on the real phone.

## Final status

L0-R2: READY FOR PHONE REVIEW

L1: NOT STARTED

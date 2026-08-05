# Visible Eye — Mechanical Focus Prototype 03 (internal mechanical architecture)

Supersedes nothing — continues the lineage from
`ai-notes/2026-08-03-visible-eye-mechanical-focus-prototype-01.md` and
`...-prototype-02.md`.

## Task

Create `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-03.html` as an "internal
mechanical architecture refinement pass" on top of Prototype 02 (the
protected baseline). The goal stated in the instruction: make the eye feel
like one coherent mechanical character rather than a focus core surrounded
by elegant radar-like arcs, while keeping the entire outer composition,
every protected id, the state engine/API, reduced-motion handling, debug
gating, and the responsive shell fully locked. Specific requirements: scale
up the internal mechanism for mobile legibility without enlarging the focus
core disproportionately; break the "radar" reading via unequal segment
spans and non-matching gates; add at least 4 explicit front/back occlusion
relationships; thread one coherent red signal path (core → chamber →
r1/r2 → r3/r4 → bridge) with a quieter counter-signal near the left side;
make state differences bigger and more spatially meaningful than Prototype
02, verified by an actual pixel-difference measurement, not an assertion.

## What was done

1. Re-read Prototype 02 in full as the new protected baseline (its exact
   geometry, CSS, and JS were already documented in the Prototype 02 note,
   re-verified against the live file before editing).

2. **Scaled the internal mechanism ~1.13×** (core/chamber/ring radii, and
   the left-control/right-bridge x-coordinates that meet them), while
   leaving the outer frame, `.qmf` field, and viewBox untouched — since
   those are what actually determine `#eyeAssembly`'s bounding box, the
   scale-up is invisible to the box measurement while being clearly visible
   in the render (confirmed both ways: identical bbox at all 4 viewports,
   visibly larger mechanism in the mobile screenshot).

3. **Broke the radar reading** by redesigning every ring's pieces with
   deliberately unequal spans (one long 84–122° load-bearing arc mixed with
   12–46° transition pieces per level, generated via Python) and 5
   non-matching connector-bridge angles (320°, 30°, 340°, 5°, 190° — no two
   the same), instead of the more uniform arcs from Prototype 02.

4. **Added 4 explicit occlusion relationships**: (a) a white plate over a
   graphite channel at the right gateway, (b) the mirror case at the left
   gateway, (c) a new one — a red track drawn inside a wider, lower-opacity
   graphite channel on r2 (literally "seated inside a channel"), (d) a
   small graphite cap over the r4→r5 connector's inner end so it visually
   emerges from beneath the cap.

5. **Built one coherent red signal path** instead of per-ring independent
   red assignment: pupil gaze bias → chamber orientation signal → a new red
   `.chamber-link` → r1 reds → a red connector → r2's channel-seated red
   track → r3's restrained red → a red connector → r4's weaker red → the
   bridge signal (full strength again at the destination). Added one
   deliberately weaker `.counter-signal` (red-26, 12° span) on r2's
   left-facing side, which dims further than the main path under `solved`
   and `idle`.

6. **Grouped the two gates as `<g class="ring-gate" data-gate="left|right">`**
   wrapping their channel-backing+plate pairs, so per-state CSS can move
   plate and backing together as one rigid mechanical unit (translate +
   rotate) instead of risking visual detachment between the two layers.

7. **Verification**: confirmed the SVG is well-formed XML; grepped for
   forbidden effects (zero matches); confirmed exactly 6 `data-ring` groups
   named `r1`–`r6` and all 9 protected ids present exactly once each;
   confirmed via `git diff --stat` that Prototype 01, Prototype 02, and
   `Problem-v86-DARK-ONLY.html` are untouched. Ran Playwright to capture a
   clean desktop/mobile/close-mechanism screenshot and one screenshot per
   state (all without `?debug=1`); confirmed the debug panel is absent by
   default and present only behind the flag; confirmed the public API and
   `VisibleEyeLife` are all present and functional; confirmed reduced-motion
   emulation suppresses the motion-enabling class; measured `#eyeAssembly`'s
   bounding box at all 4 required viewports for both Prototype 02 and
   Prototype 03 in the same run — pixel-identical at every one.

8. **Computed real pixel-difference percentages** (not asserted) between
   the `watching` screenshot and each of the other 5 states, for both
   Prototype 02 and Prototype 03, using Pillow (per-pixel RGB delta summed
   across channels, thresholded at 12 to absorb anti-aliasing noise) against
   identical 900×700 `.stage` crops. Every one of the 5 states came out
   larger in Prototype 03 than Prototype 02 (searching 2.7×, found 3.9×,
   solved 1.2×, embodied 1.2×, idle 1.1×) — confirming the state
   differences are measurably, not just subjectively, more pronounced.

9. **Delivery**: wrote `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-03-NOTE.md`
   with the full preservation matrix, scale-comparison table, ring piece
   inventory, occlusion inventory, focus-core refinements, chamber
   connections, left/right integration explanations, red signal-path
   mapping, state-by-state changes, the pixel-diff table, amplitudes/
   durations, the bounding-box comparison, and the production-untouched
   confirmation. Committed and pushed to `claude/start-claude-code-v86-tdn3cy`;
   no Prototype 04 was created, no alternatives were created.

## Result

See `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-03.html` and its companion
`-NOTE.md` in the repository root for the full deliverable and evidence.

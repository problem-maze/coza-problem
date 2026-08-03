# Visible Eye — Mechanical Focus Prototype 02 (deep internal refinement)

Supersedes nothing — this is a new stage in the same lineage as
`ai-notes/2026-08-03-visible-eye-mechanical-focus-prototype-01.md`, not a
replacement of it.

## Task

Create `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-02.html` as a "deep internal
refinement, not a replacement" of
`VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-01.html`, which is the protected
structural baseline. The instruction (15 numbered sections) required:

- developing the internal mechanical architecture substantially (layered
  focus core, richer optical chamber, more detailed rings, integrated
  left-control/right-bridge assemblies, a red signal-path instead of a
  hemisphere split, one coherent directional asymmetry) while keeping the
  overall eye composition, every protected id/class, the state engine, the
  public JS API, reduced-motion handling, debug gating, and the responsive
  shell fully intact;
- an anti-destruction verification: a pre-edit inventory of Prototype 01,
  then an explicit preserved/refined/expanded/replaced classification for
  every protected subsystem, plus a bounding-box comparison at the same 4
  viewports as Prototype 01;
- stopping after Prototype 02 and its evidence — no Prototype 03, no
  production/Home changes.

## What was done

1. **Pre-edit inventory.** Read Prototype 01 in full and recorded every
   protected id, class group, the exact ring radii/stroke-widths/15-segment
   list, the state list, the public API surface (including that
   `VisibleEyeLife` was module-private, not a global, in Prototype 01), the
   responsive shell, and both reduced-motion guard mechanisms — before
   changing anything.

2. **Deepened geometry, generated via Python.** Kept the frame (`eye-lid-*`
   paths), the `.qmf` guide field, and all 6 ring *radii* byte-for-byte
   unchanged, then:
   - expanded the 6 ring levels from 15 to 27 pieces (3–6 per level per the
     brief's target bands), redistributing red by *operational role*
     (strongest at r1/r2, restrained at r3, weak at r4, zero at r5/r6)
     inside one coherent 270°–352° attention band, instead of the earlier
     hemisphere split;
   - added 4 radial `.connector-bridge` links between adjacent ring levels
     and 2 two-pass "channel-backing + white plate" gate structures (r4's
     bridge gateway, r6's left-control gateway) for visible occlusion;
   - rebuilt `#opticalChamber` from 1 plain circle into 3 non-identical
     nested boundaries (each with its own asymmetric gap, all in the
     130°–235° quiet band) plus a 51-of-60-tick hierarchy with 2 interrupted
     zones and 1 new filled orientation-signal wedge (replacing 2 duplicate
     red accent ticks);
   - rebuilt `#focusCore` from a flat 2-circle disk into 8 layers (rim,
     recessed chamber, gaze-offset pupil, soft off-axis reflection, 2
     unchanged catchlights, a lower shadow crescent), using exactly 3
     restrained radial gradients scoped only to this region;
   - added `.lc-sleeve`/`.rb-sleeve` structural-mass pieces and a
     `.rb-terminal-anchor` so the left-control and right-bridge assemblies
     read as physically attached to the ring system rather than floating
     UI.

3. **Bug found and fixed during assembly.** An initial attempt to deepen the
   pupil's color for the `embodied` state via a CSS custom property read
   inside the gradient's `<stop>` didn't work — `<defs>` is a sibling of
   `#eyeAssembly`, not a descendant, so the custom property couldn't
   cascade there. Fixed by defining a second gradient
   (`corePupilGradEmbodied`) and swapping which gradient URL `.core-body`
   resolves to under the `.state-embodied` class — a correctly-scoped CSS
   rule instead of a cross-tree custom-property reference.

4. **Verification.** Confirmed the SVG is well-formed XML; grepped for
   forbidden effects (`animate`, `<filter>`, blur, drop-shadow, box-shadow,
   glow, `@keyframes`) — zero matches; confirmed all 3 gradients are used
   only by focus-core classes. Ran Playwright to capture a clean desktop and
   mobile screenshot, a close crop of the internal mechanism, one screenshot
   per state (all with no `?debug=1`, confirmed clean), confirmed the debug
   panel is absent by default and present only behind `?debug=1`, confirmed
   `window.setVisibleEyeState`/`getVisibleEyeState`/`VisibleEyeLife` are all
   present and functional, and confirmed reduced-motion emulation correctly
   suppresses the motion-enabling class. Measured `#eyeAssembly`'s bounding
   box at all 4 required viewports for both Prototype 01 and Prototype 02 in
   the same run: **pixel-identical at every viewport** (391×844, 412×915,
   768×1024, 1440×900), because the elements that determine that box (lids +
   quiet-measurement-field guides) were kept byte-for-byte unchanged.

5. **Delivery.** Wrote
   `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-02-NOTE.md` with the full
   preservation matrix, component mapping, layer/piece inventories,
   integration explanations, red signal-path mapping, depth/occlusion
   method, state-by-state changes, exact amplitudes/durations, the
   bounding-box comparison table, and the production-untouched confirmation.
   `git diff --stat` against `Problem-v86-DARK-ONLY.html` and both
   Prototype 01 files was empty before committing. Committed and pushed to
   `claude/start-claude-code-v86-tdn3cy`; no Prototype 03 was created.

## Result

See `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-02.html` and its companion
`-NOTE.md` in the repository root for the full deliverable and evidence.

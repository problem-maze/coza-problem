# Visible Eye — Mechanical Focus Prototype 01

## Task

Create `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-01.html` — a new, standalone,
isolated, responsive, deterministic, dependency-free HTML/SVG reconstruction
of a NEW Tier-1 reference image (a mechanical/technical eye illustration),
explicitly **not** continuing the earlier Ring System geometry lineage
(`VISIBLE-EYE-RING-SYSTEM-PROTOTYPE-04.html` / `VISIBLE-EYE-MORNING-WINE-REFINE-01.html`).

Full instructions were supplied in two attachments:
`CLAUDE-CODE-VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-01.md` (execution spec)
and `VISIBLE-EYE-MECHANICAL-FOCUS-TIER1-MANIFEST.md` (reference identity /
visual hierarchy / color system / exclusions), plus the reference PNG itself.

Required, in summary:
- Inspect the real Home eye subsystem in this repo first, and borrow its
  semantic lifecycle/timings/reduced-motion/cleanup rhythm only (not its
  geometry).
- Reconstruct the wide almond frame, central focus core (with 2 catchlights),
  inner optical chamber (tick ring), 5–7 segmented operation rings (explicit
  SVG paths, not dashed circles), a left control assembly, a right process
  bridge, and a quiet measurement field — using the manifest's exact color
  tokens (Lunar White environment, 3-tier graphite, 4-tier Morning Wine red).
- Provide a `setVisibleEyeState(stateName)` API mapped to the real semantic
  states discovered in Home.
- Respect `prefers-reduced-motion: reduce`; every state must stay legible
  without motion.
- Debug controls only behind `?debug=1`; normal view/screenshots must have
  none.
- Verify `#eyeAssembly`'s actual bounding box at 390×844, 412×915, 768×1024,
  1440×900.
- Deliver: the HTML, one clean desktop capture, one clean 390×844 mobile
  capture, one capture per implemented semantic state, and a detailed NOTE.md.
- Do not create Prototype 02. Do not modify production. Stop after Prototype
  01 and its evidence.

## What was done

1. **Reference forensics.** Verified the supplied PNG's SHA-256
   (`d9415238927f515ae9e0614319fb7bbf2f3e41870ebc6444b59e7a0a6b4b53c4`) and
   dimensions (1536×1152) match the manifest exactly. Installed Pillow (not
   present in the environment) and measured the reference directly instead
   of eyeballing it: found the true optical axis (y=541, not the raw image
   center y=576) via the two axis-endpoint marker dots, then measured the
   frame's half-width (726.5px) and asymmetric upper/lower lobe depths
   (376/396px, ratio ≈0.95) from that axis. Cropped and upscaled the tip,
   apex, and center regions to confirm fine detail (axis-endpoint dot
   position/radius, a top-only guide-circle marker with no bottom
   counterpart, the ring-cluster's rough radius band) that a full-image
   glance would have gotten wrong (an early guess had the axis-endpoint
   dots positioned "outside" the frame tips; pixel measurement showed they
   sit inside).

2. **Home eye subsystem inspection.** Read `Problem-v86-DARK-ONLY.html`'s
   `window.HeroLife` (engine-selection lifecycle), `window.HeroV1Life` (the
   V1 hero's own gated task scheduler — `timeout`/`interval`/`clear`/`sleep`,
   paused-not-lost on hidden/out-of-view, driven by `IntersectionObserver` +
   `visibilitychange`), and the real five-stage Q/A badge lifecycle:
   `qa-watching` (ANALYZING) → `qa-searching` (TRACING) → `qa-found` (PATH
   FOUND) → `qa-solved` (SOLVED) → `qa-embodied` (EMBODIED, +3s after
   solved). Borrowed the rhythm (calm one-shot transitions, 400–750ms holds,
   dual reduced-motion guards) — copied no geometry, class names, or code.

3. **Geometry generation.** Wrote a Python script computing the frame's
   Bézier control points (using the doubling rule discovered during the
   earlier Ring System lineage: control-y = 2× the desired rendered apex
   depth), 6 concentric segmented rings (15 arc segments total, hemisphere
   color rule: right=red-family, left=graphite, gates/gaps sized per ring
   for "unequal spans... gates, overlaps"), 60 dial ticks for the optical
   chamber, and all fixed-position elements (core, catchlights, left
   control assembly, right process bridge, quiet measurement field incl.
   the two axis-endpoint dots and the asymmetric top-only marker).

4. **Assembly.** Built the single HTML file: color tokens matching the
   manifest exactly (including `color-mix` derived red tiers), a
   `VisibleEyeLife` lifecycle controller mirroring `HeroV1Life`'s gating
   contract, `setVisibleEyeState()` mapped 1:1 to the 5 discovered states
   plus an `idle` reset, one-shot CSS-transition state deltas only (no
   `@keyframes`, no SMIL `<animate>`), and a debug panel built by JS only
   when `?debug=1` is present.

5. **Verification.** Confirmed the SVG is well-formed XML; grepped for and
   removed all forbidden effects (found and removed one incidental
   `box-shadow` on the debug-only panel; zero matches after). Ran Playwright
   to measure `#eyeAssembly`'s real bounding box at all 4 required
   viewports (all comfortably visible, 22–90% of viewport depending on
   axis), capture a clean desktop and clean mobile screenshot, capture one
   screenshot per state with **no** `?debug=1` in the URL (the API is global
   regardless of the debug flag, so state screenshots stay clean), and
   confirm the debug panel is absent by default and present only behind
   `?debug=1`. Confirmed via Playwright's `reducedMotion:'reduce'`
   emulation that the motion-enabling class never applies.

6. **Delivery.** Wrote `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-01-NOTE.md`
   documenting all of the above with computed numbers (not asserted ones).
   `git status --short` confirmed only the 10 new files are staged; no other
   file was touched. Committed and pushed to
   `claude/start-claude-code-v86-tdn3cy`; no Prototype 02 was created.

## Result

See `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-01.html` and its companion
`-NOTE.md` in the repository root for the full deliverable and evidence.

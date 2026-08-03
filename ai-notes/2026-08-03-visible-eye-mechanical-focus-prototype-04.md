# Visible Eye — Mechanical Focus Prototype 04 (whole-eye character pass)

Continues the lineage from prototypes 01–03 (see the same-dated notes for
those). Supersedes nothing.

## Task

Create `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-04.html` as a "whole-eye
character pass" on Prototype 03 (protected baseline), addressing a visual
review that found the technical foundation approved but the image itself
still failing: the mechanism read as a radar placed inside an almond
rather than one character; the left/right systems were too weak at mobile
scale; white plates were invisible against the white surface; states were
hard to distinguish. Requirements: reorganize the six ring levels into 3
readable clusters (Focus/Process/Support) with larger voids between them;
fix the repeated lower U-shaped arcs; make white plates visible via
non-shadow methods; add 3–5 quiet structural relationships tying the
mechanism to the wider eye interior; strengthen the left/right assemblies;
thread one readable-but-restrained red signal path; make states change
through structural/spatial deltas with pixel-difference percentages inside
specific target bands (0.8–3% depending on state) at 390×844; keep every
protected id, the state API, reduced-motion/debug mechanisms, and the
outer composition fully locked.

## What was done

1. **Reorganized r1–r6 into 3 clusters** by adjusting radii: Focus
   (r1=158, r2=178, 20-unit internal gap) → 34-unit void → Process
   (r3=212, r4=234, 22-unit gap) → 38-unit void → Support (r5=272, r6=296,
   24-unit gap). Added `data-cluster` attributes to each ring-level group
   alongside the existing `data-ring`.

2. **Fixed the repeated lower U-shapes**: Prototype 03 had one ~90–116°
   lower-hemisphere arc on each of r3/r4/r5/r6 (four near-parallel
   sweeps — the strongest remaining radar cue). Shortened r3's and r5's to
   one side only, split r4's into two separated plates (lower-right
   `role-support`, lower-left `role-ink`, different stroke-widths) with an
   offset connector in the gap between them, and kept r6's to the opposite
   side from r3/r5 — no two adjacent levels share the same lower coverage
   any more.

3. **Made white plates visible** by upgrading both gate plates from a
   2-pass to a 3-pass construction: wide ink channel-backing → a new
   medium-width ink `.plate-keyline` → the white plate on top. The keyline
   is the actual fix — it gives every plate its own dark contact edge
   independent of the (much lower-opacity) channel backing.

4. **Added 4 tapered `.tension-path` pairs** (thick segment near the
   mechanism, thin segment reaching toward a lid/direction) from the
   support cluster's edge toward the upper lid, lower lid, right-bridge
   direction, and left-control direction — confirmed via direct
   measurement to stop well short of the actual lid curves (14-unit
   margin at the closest point).

5. **Strengthened left/right assemblies**: scaled outward to meet the new
   cluster radii, sleeve opacity raised, active/inactive indicator
   hierarchy sharpened (active dot 20% larger, inactive dots dimmer), gate
   openings widened at both r6 (left) and r4 (right).

6. **Extended the red signal path** to originate visibly at the core rim
   itself (not mid-chamber) and traced it through the chamber, r1, r2's
   channel-seated track, a restrained r3 piece, a weaker r4 piece, to the
   bridge signal — strength decreasing monotonically before resolving at
   full strength at the destination, with a distinctly weaker counter-
   signal on the left/quiet side.

7. **Rebuilt all 6 states with structural/spatial deltas** instead of
   Prototype 03's small opacity nudges: broad opacity shifts across entire
   clusters and roles (e.g. `found` dims all `role-quiet`/`role-support`
   system-wide to 0.25 and both support-cluster levels to 0.25 opacity,
   while boosting all red to full strength), plus gate translate+rotate at
   the brief's stated ceiling (6px / 2°).

8. **Bug caught and fixed**: an HTML comment containing a literal `--`
   ("FOCUS (r1,r2) -- PROCESS...") made the SVG invalid XML (`--` is
   forbidden inside XML comments) — caught by the well-formedness check,
   fixed by rewording.

9. **Pixel-diff tuning loop**: measured watching-vs-each-state percentages
   at 390×844 with Pillow, found all 5 states substantially below their
   target bands on the first pass (0.19–0.50% vs. targets of 0.8–3%),
   diagnosed that light/`--quiet`-colored elements contribute little
   per-pixel RGB delta even at large relative opacity swings (already
   close to white), and iterated by shifting the affected changes toward
   high-contrast roles (ink, red) and large-area elements (the core-
   chamber fill) instead. Re-measured after each round until all 5 states
   landed inside their specified target bands.

10. **Verification**: confirmed well-formed XML, zero forbidden effects,
    all protected ids present exactly once, exactly 6 `data-ring` element
    declarations, `git diff --stat` empty against Prototypes 01–03 and
    production, `#eyeAssembly` bounding box pixel-identical to Prototype 03
    at all 4 required viewports, debug panel absent by default / present
    behind `?debug=1`, full API functional, reduced-motion emulation
    suppresses the motion-enabling class correctly.

11. **Delivery**: captured a clean desktop, clean mobile, close-mechanism
    crop, a side-by-side strip of all 6 states at equal scale, and 6
    individual state screenshots (captured at 390×844, the scale the
    brief's own percentage targets are specified against). Wrote
    `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-04-NOTE.md` with the full
    cluster map, radar-cue removal log, lower-U corrections, white-plate
    method, attachment/relationship inventories, red signal-path map,
    state-by-state changes, the pixel-diff table, amplitudes/durations,
    bbox comparison, and production-untouched confirmation. Committed and
    pushed; no Prototype 05, no alternatives.

## Result

See `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-04.html` and its companion
`-NOTE.md` in the repository root for the full deliverable and evidence.

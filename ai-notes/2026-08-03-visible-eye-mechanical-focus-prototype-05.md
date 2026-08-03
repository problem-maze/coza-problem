# Visible Eye — Mechanical Focus Prototype 05 (final character calibration)

Continues the lineage from prototypes 01–04 (see the same-dated notes for
those). Supersedes nothing.

## Task

Create `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-05.html` as a "final
character calibration pass" on top of Prototype 04 (the approved
structural and behavioral baseline), ahead of an isolated Home-integration
test. Explicitly scoped as calibration only: no new geometry, no new ring
levels, no new colors, no alternative variants. Six calibration targets:
make the four tension paths subtly readable at 390×844 without touching
the lids; improve left-input and right-output legibility through opacity/
width calibration only; give white plates more visible material presence
via the existing 3-pass construction; reduce the focus core's primary
catchlight so it reads less like a camera lens; correct FOUND so it
communicates route alignment (gate/connector/plate clarity) instead of
system-wide dimming, with an explicit floor (~40–50% of normal strength)
on role-support/role-quiet/r5/r6; moderate SOLVED so red doesn't push
uniformly to maximum opacity; retest all 6 states' pixel-diff percentages
against a new, slightly adjusted set of target bands.

## What was done

1. Copied `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-04.html` byte-for-byte
   as the starting point (confirmed via the file's own header comment and
   later via `git diff --stat`), then applied only targeted numeric CSS
   edits — no geometry regeneration was needed for this pass, unlike
   Prototypes 02–04.

2. **Tension paths**: raised `.tension-thick`/`.tension-thin` opacity from
   0.22/0.14 to 0.32/0.17 — confirmed via the delivered mobile capture
   that they remain invisible at first glance but are now traceable on a
   deliberate second look, matching the two-glance requirement exactly.

3. **Left/right legibility**: raised sleeve opacities (0.16→0.20 on both
   sides), the left connector (0.62→0.68), the right terminal-anchor
   (0.42→0.48), and both gates' 3-pass stroke-widths (+0.4 units per
   layer) plus the shared keyline opacity (0.50→0.58) — all pure
   numeric calibration, no new elements.

4. **Focus core**: shrank the primary catchlight from `rx=13,ry=10` to
   `rx=11.5,ry=8.5` (~12% smaller by area, the change most directly aimed
   at "less like a camera lens"), reduced the lower shadow's opacity
   slightly (0.24→0.20), and strengthened the rim's separation
   (width 2.8→3.0, opacity 0.94→0.96). Gaze direction, gradients, and
   layer radii all untouched per the brief's explicit constraints.

5. **FOUND correction**: diagnosed the Prototype 04 problem precisely —
   `role-support` had dropped to 33% of its watching baseline and r5/r6
   to 37–42%, well under the ~40–50% floor the brief specified. Raised
   `role-quiet` to 47%, `role-support` to 45%, r5 to 47%, r6 to 47% of
   their respective baselines, moderated the tick/chamber dimming, and
   added two brand-new full-opacity rules — `.connector-signal` and
   `.plate`/`.plate-keyline` — so "process-route continuity" and "plate
   alignment" became explicit visual signals carrying the "a route was
   found" meaning instead of relying on dimming everything else.

6. **SOLVED correction**: lowered `role-red-78` (0.96→0.90) and
   `role-red-50` (0.88→0.80) so the red family no longer pushes uniformly
   toward maximum opacity, while leaving every other "architecture
   resolves" signal (plate/channel/chamber clarity, tick reduction, gate
   settling) exactly as Prototype 04 had it.

7. **Verification**: confirmed well-formed XML, zero forbidden effects,
   all 9 protected ids present exactly once, exactly 6 `data-ring`
   declarations unchanged, `git diff --stat` empty against Prototypes
   01–04 and production, `#eyeAssembly` bounding box pixel-identical to
   Prototype 04 at all 4 required viewports, debug panel/API/
   reduced-motion all behaving identically to prior prototypes.

8. **Pixel-diff retest**: measured watching-vs-each-state at 390×844
   against the new target bands (searching 0.8–1.5%, found 1.2–2.5%,
   solved 1.0–2.0%, embodied/idle 0.8–1.8%) — all 5 states landed inside
   their bands on the first attempt, no further tuning rounds needed.
   Noted and explained in the note why `found`'s raw percentage (1.593%)
   barely moved from Prototype 04's (1.589%) despite the correction: the
   floor-raising and the new full-opacity connector/plate rules roughly
   offset each other in total pixel count, while the qualitative reading
   (alignment vs. erasure) changed substantially — confirming the brief's
   instruction not to optimize for the number alone.

9. **Delivery**: captured a clean desktop, clean mobile, close-mechanism
   crop, a side-by-side strip of all 6 states, and 6 individual state
   screenshots (390×844). Wrote
   `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-05-NOTE.md` with the full
   protected-component verification, the exact Prototype 04→05 delta
   table, per-area calibration writeups, the FOUND/SOLVED correction
   tables, the pixel-diff table, responsive comparison, reduced-motion
   verification, and production-untouched confirmation. Committed and
   pushed; no Prototype 06, no alternatives, no Home integration.

## Result

See `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-05.html` and its companion
`-NOTE.md` in the repository root for the full deliverable and evidence.

# Task: V20.2 — World-Derived Global Earth Refinement

## Question/task as given

One-shot local visual correction prompt (`CLAUDE-V20-2-ONE-SHOT-CORRECTION-PROMPT.md`,
uploaded with `V202ONESHOTCLAUDECODEPACKAGE.zip` containing an independent
audit, `V20-1-INDEPENDENT-AUDIT-VERDICT.md`, and a diagnostic image,
`V20-1-VISUAL-EVIDENCE-DIAGNOSTIC.png`). The audit found v20.1's Asia/Australia
geometry unreadable/blob-like despite a real World geographic system already
existing in the file (which the v20.1 report incorrectly claimed was absent),
plus mis-cropped visual evidence and imperceptible active/inactive continent
contrast. Verdict was `V20_1_BLOCKED_FOR_VISUAL_AND_EVIDENCE_CORRECTION`.

This note is self-contained; it does not supersede any prior ai-notes entry.
Prior related entries: `2026-08-04-v19-1-eye-earth-transition-correction.md`,
`2026-08-04-v20-world-style-global-future-earth.md`,
`2026-08-05-v20-1-coherent-global-earth-views.md`.

## Answer / what was done

Built v20.2 from v20.1 (three-view architecture, `globeSequenceProgress`, and
the v19.1 arrival all preserved unchanged) with 4 targeted fixes:

1. **Real-World-derived Asia/Australia geometry.** Located the actual
   `CONTINENTS` lon/lat dataset and `project()` orthographic projection
   already in the file (a genuine research gap in the prior report —
   confirmed and corrected). Re-implemented the projection in Python,
   numerically found a camera angle (rotY=213°, rotX=0°) where Asia is
   frontal/dominant, Australia sits below it, and Africa/Europe are fully out
   of frame, then simplified the real projected point sets (Douglas-Peucker)
   and re-smoothed with the same Catmull-Rom spline the file's own renderer
   uses. Asia's land ratio within its view dropped from 43.16% (a spike vs.
   the Atlantic view's 29.88%) to 21.97% — not the requested 28-34% band
   exactly, but a geometrically-forced tradeoff fully explained in the report
   (real Asia's true silhouette cannot hit that ratio while also respecting
   the hard core-radius-53.4 containment requirement).
2. **Contrast fix.** Widened the inactive->active opacity swing from
   0.75->1.00 to 0.35->1.00 and added a per-continent local glow (blur filter
   driven continuously by that continent's own emphasis value). Re-measured
   with the audit's own pixel-diff methodology: Asia vs Australia contrast
   improved 8.1x (mean pixel diff) / ~30x (% pixels differing), North vs
   South America improved 12.8x / ~36x.
3. **Capture-script fix.** Found and fixed two real bugs: a stale bounding-box
   reused across a multi-second capture sequence (root cause of v20.1's
   mis-cropped sequence board/transition strip), and a pre-existing
   swiper-layout settle-timing flakiness (confirmed via a dedicated timing
   probe) that could report an off-viewport rect for up to ~3 seconds. The
   new script validates every box against actual viewport bounds and uses a
   non-blocking instant check inside time-critical polling loops (a blocking
   retry there would have desynced the capture from the fast-moving
   continent-focus sequence).
4. **Direct eye-transform proof.** Added a trace that samples the real
   `#lhmzEyeGaze` element's live `SVGTransformList` matrix directly, rather
   than reconstructing gaze position from the render() formula — confirming
   smooth, restrained, jump-free motion and a return to a calm base position.

Verdict: **`V20_2_READY_FOR_INDEPENDENT_AUDIT`**.

Full detail in `V20-2-WORLD-DERIVED-GLOBAL-EARTH-REPORT.md` and
`V20-1-to-V20-2-EXACT-DIFF-REPORT.md`.

## Key files delivered

- `Problem-v86-nav-logo-simplified-signin-continuous-hand-20-2-world-derived-global-earth-refinement.html`
- `V20-2-WORLD-DERIVED-GLOBAL-EARTH-REPORT.md`
- `V20-1-to-V20-2-EXACT-DIFF-REPORT.md`
- `V20-2-GLOBE-VIEW-METRICS.json`
- `V20-2-NORMAL-SPEED-LIFECYCLE-TRACE.json` (includes the direct eye-transform trace)
- `V20-2-FINAL-HOLD-ENGLISH.png`, `V20-2-FINAL-HOLD-ARABIC.png`, 6x `V20-2-SEQUENCE-*.png`,
  `V20-2-SEQUENCE-BOARD.png`, `V20-2-GLOBE-VIEW-TRANSITION-STRIP.png`,
  `V20-2-DESKTOP-900x900-ENGLISH.png`, `V20-2-MOBILE-390x844-DPR2-ENGLISH.png`,
  `V20-2-MOBILE-390x844-DPR2-ARABIC.png`
- `V20-2-FINAL-DELIVERY-PACKAGE.zip`

v19.1, v20, and v20.1 were verified unchanged at every checkpoint and remain
unmodified.

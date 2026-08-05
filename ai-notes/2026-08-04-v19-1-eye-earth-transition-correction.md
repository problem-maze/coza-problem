# V19-1: Eye → Earth Transition Correction

New lineage in this repo — a "sign-in hand/head/eye/Earth" story
(`LoginHeadmazeStory`), uploaded by the user as
`Problem-v86-nav-logo-simplified-signin-continuous-hand-19-eye-earth-interaction-foundation.html`
("v19") after the requested file wasn't found anywhere in this repo's
history/branches. Unrelated to the "Visible Eye" mechanical-eye lineage
(prototypes 01–05, Home integrations) also present in this repo.

## Task

Strict local correction pass: during v19's `'hold'` stage (after sign-in
resolves), an Earth orb travels from near the wilted rose toward the hand.
The reported defect: the globe passes too close to the eye/face during the
transition, reading as a collision rather than the eye noticing and guiding
the Earth toward the hand. Explicitly scoped as a timing/path correction
only — no redesign of the Sign-in story, no Earth-system rebuild, no v20, no
new continents, no full rotation, and v19 itself must not be modified.

## What was done

1. Read the full `LoginHeadmazeStory` IIFE (`window.LoginHeadmazeStory`,
   ~1700 lines) to find the Earth-orb travel/reveal logic inside `render()`.
2. Root-caused the collision by reading the exact formulas: the orb's SCALE
   (`holdOrbReveal`, window `0.10–0.43`) reached full size well before its
   POSITION (`holdOrbTravel`, window `0.16–0.79`) had traveled meaningfully
   away from its start point near the rose/face — so a large, opaque Earth
   sat close to the face for a real stretch of the transition. Separately,
   the eye's glance toward the Earth (`holdEarthGaze`) was derived from the
   orb's *own* reveal progress, so it could only react *after* the Earth had
   already begun, not lead it.
3. Drove the REAL sign-in flow in Playwright (`showLogin()` → click the
   actual sign-in dot → the real `STAGES` sequence, no fabricated shortcut)
   and captured frames every 50ms through the opening of the hold stage,
   confirming the exact worst frame empirically (t+150ms into hold) before
   designing the fix, then again after, to prove the fix visually — not just
   analytically.
4. Applied exactly 8 numeric edits inside `render()`'s hold-stage block: (a)
   decoupled `holdEarthGaze` from the orb's own reveal progress onto an
   early, independent `holdT` window so the eye leads; (b) delayed/widened
   the `holdOrbReveal` (scale) window; (c) started/finished the
   `holdOrbTravel` (position) window earlier, so position consistently
   leads scale; (d) proportionally re-timed the three continent-reveal
   windows to match, preserving their staggered appearance; (e) reshaped the
   travel bezier's two control points so more of the path's vertical drop
   happens earlier, without touching the start point, end point, or final
   scale formula (all mathematically guaranteed unchanged, since a bezier
   always passes through its own start/end regardless of control points).
5. Verified analytically (evaluating both files' exact formulas at matched
   progress points) and visually (matched real-time screenshot comparison),
   confirmed 0 new console/page errors across the full real flow for both
   files, and confirmed the final hold composition is preserved — by
   measuring v19's OWN run-to-run pixel noise (from its perpetual idle-water
   wobble filter) as a baseline, and showing v19-1's final hold differs from
   v19's by *less* than that baseline noise.

## Result

- v19 hash/size/line-count confirmed unchanged before and after:
  `8e3024fc06f68b70a10b696ab15bc8419d417eaf84c354a3700eae1d2e36558b`,
  3,054,541 bytes, 45,732 lines.
- v19-1: `809754b2008fd918a04a3b8e510ce8e7e2121291c762271d20c43469e4d429a7`,
  3,054,539 bytes, 45,732 lines — exactly 8 lines differ from v19, all
  inside one function.
- Analytically, at the matched worst-case progress point, halo-to-head
  clearance improves from roughly −9.6 (overlapping into the head) to
  +44.5 SVG units (clear separation); across the surrounding range the
  original configuration's worst overlap is roughly −20 to −25 units versus
  a comfortable +30 to +45 units in the correction.
- Visually confirmed via matched real-time screenshots: v19 shows the
  Earth's halo directly over the eye/face at t+150ms into hold; v19-1 shows
  no Earth visible yet at the same offset (still gathering), with a calm,
  non-colliding growth-and-travel sequence over the following ~150ms.
- 0 new console/page errors on either file's full real flow.
- Final hold composition preserved: v19-1 vs. v19 differs by fewer
  high-magnitude pixels (42 pixels >60/255) than two separate real-time
  captures of v19 differ from each other (3,467 pixels >60/255, from the
  perpetual idle-water wobble filter alone).

## Deliverables

`Problem-v86-nav-logo-simplified-signin-continuous-hand-19-1-eye-earth-transition-correction.html`,
`V19-1-EYE-EARTH-TRANSITION-CORRECTION-REPORT.md`,
`V19-to-V19-1-diff-report.md`,
`V19-1-FINAL-HOLD-ENGLISH.png`, `V19-1-FINAL-HOLD-ARABIC.png`,
`V19-to-V19-1-transition-comparison-t150ms.png`,
`V19-1-hold-transition-progression-strip.png`.

Also committed: the uploaded v19 source file itself (not previously in this
repo), since it's the authoritative baseline this correction and its diff
report are built against.

## Scope note

Verdict: `V19_1_ACCEPTED_AS_NEXT_WORKING_BASELINE`. No v20, no Asia/Australia,
no full globe rotation, no redesign of the Sign-in story or Earth system, no
production plan. v19 itself was never written to.

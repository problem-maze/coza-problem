# Visible Eye — Isolated Home Integration Test 01

Continues the lineage from the mechanical-focus prototypes 01–05 (see the
same-dated notes for those). Supersedes nothing.

## Task

Build the first isolated Home integration test for the approved Visible Eye
(`VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-05.html`) against the real Home
source (`Problem-v86-DARK-ONLY.html`). Deliver exactly:
`Problem-v86-VISIBLE-EYE-ISOLATED-INTEGRATION-01.html` and
`VISIBLE-EYE-HOME-INTEGRATION-01-NOTE.md`, plus supporting screenshots and a
machine-readable verification report. Explicitly forbidden: modifying
production, Prototype 05, any earlier prototype, Journey, the existing dark
eye, `HeroV1Life`, routing, or persistent storage; creating a Prototype 06;
creating a production build. The new eye must be inert unless the page is
opened with `?visibleEyeTest=1` (never persisted to storage), and when
active it must be driven by Home's real state (via `setHeroQaStage`/the
`qa-*` classes on `#heroEyeSvg`), not an independent demo loop.

## What was done

1. Read Prototype 05 and the real production Home source in full to extract
   the eye's CSS/SVG/engine and to locate the true hero slot
   (`.hero-visual-wrap` inside `.hero-grid`, one `.hero-v` sibling active at
   a time via `.hero-v.active{display:block}` / `:not(.active){display:none!important}`).
2. Ran a full namespace audit of every Prototype 05 identifier (classes,
   ids, gradient ids, custom properties, global function names, debug
   controls) against the production document — zero collisions found.
3. Wrote a Python CSS-rule-walker (`scope_css.py`, scratchpad-only) that
   prefixes every class-based Prototype 05 selector with
   `#visibleMechanicalEyeIntegrationRoot `, leaving the one
   `html:not(.eye-motion-ok) #eyeAssembly *` rule and the `#eyeDebugPanel`
   rules unprefixed (both already scope safely on their own).
4. Wrote a Python assembler (`assemble_integration.py`, scratchpad-only)
   that copies production and performs exactly three line-anchored splices
   (asserted against the actual file content, not guessed): the scoped
   style block before `</head>`, the integration root + Prototype 05's SVG
   markup as a new sibling inside `.hero-visual-wrap`, and a flag-gated
   `<script>` before `</body>` containing Prototype 05's engine verbatim
   plus slot-activation and a Home-state-bridge `MutationObserver`.
5. Fixed two bugs found via direct Playwright DOM inspection (not guessed):
   (a) a JS syntax error from extracting the wrong `})();` occurrence when
   pulling Prototype 05's script body; (b) a splice-index off-by-one that
   placed the new root **inside** `.hero-vperson` (a hidden sibling)
   instead of after it, which collapsed the root's rendered geometry to
   zero despite its own `active` class — root-caused by walking the full
   `getBoundingClientRect()` ancestor chain and finding the parent was
   `.hero-vperson`, not `.hero-visual-wrap`. Also added `margin:0 auto` to
   the eye's sizing rule to restore centering lost when
   `.hero-v.active{display:block}` (higher specificity) overrides
   `.hero-eye{display:flex}`.
6. Ran a full Playwright verification suite (`verify_integration2.js`,
   scratchpad-only; needed `--disable-dev-shm-usage` on `chromium.launch()`
   to stop the browser target from closing mid-run in this container) that
   captured: default-no-flag behavior, test-flag-active behavior, 4-viewport
   responsive measurements, all 6 semantic states driven through the real
   `setHeroQaStage`, an equal-scale 6-state strip, an original-vs-integrated
   comparison, 3x page-navigation stability, 3x tab-visibility stability,
   and reduced-motion behavior.

## Result

- Production file hash/byte-size/line-count unchanged:
  `c2b62cc98f1e3d0fa00d3709818f79f9ee73bd568700dcb6b665adef20b0d6b1`,
  3,051,238 bytes, 45,690 lines, before and after.
- Prototype 05 hash/byte-size/line-count unchanged:
  `2e35daad2024c847eeac14948a898e598a20da1c5c62ccbc2dbe66d99e53b24e`,
  38,832 bytes, 648 lines.
- New integration file: `b131aefb01166783a0a4e81b579960d5294d3b6ac760989d56cbd97c82090cff`,
  3,099,115 bytes, 46,375 lines.
- Default behavior (no flag): integration root exists but is inactive
  (`display:none`), no new globals initialized, console errors identical to
  a direct production load — 0 new side effects.
- Test-flag-active: exactly one `.hero-v` active (the integration root),
  Journey and the legacy dark eye both remain in the DOM and are simply
  suppressed (fully restorable), 0 duplicate ids, 0 new console errors.
- All 6 semantic states (watching/searching/found/solved/embodied/idle)
  bridge correctly from the real `qa-*` classes on `#heroEyeSvg`.
- No horizontal overflow or clipping at 390×844, 412×915, 768×1024, or
  1440×900; full almond visible at mobile size.
- Page-navigation (×3) and tab-visibility (×3) stability both hold: exactly
  one observer, no duplicate lifecycle work, no new console errors.
- Reduced motion: `eye-motion-ok` correctly absent; a state change applied
  mid-test still resolves to the correct final state.
- All 12 acceptance conditions from the task spec pass. Full details in
  `VISIBLE-EYE-HOME-INTEGRATION-01-NOTE.md` and
  `VISIBLE-EYE-HOME-INTEGRATION-01-VERIFICATION-REPORT.json`.

## Deliverables

`Problem-v86-VISIBLE-EYE-ISOLATED-INTEGRATION-01.html`,
`VISIBLE-EYE-HOME-INTEGRATION-01-NOTE.md`,
`VISIBLE-EYE-HOME-INTEGRATION-01-VERIFICATION-REPORT.json`,
`VISIBLE-EYE-HOME-INTEGRATION-01-default-no-flag.png`,
`VISIBLE-EYE-HOME-INTEGRATION-01-desktop.png`,
`VISIBLE-EYE-HOME-INTEGRATION-01-mobile-390x844.png`,
`VISIBLE-EYE-HOME-INTEGRATION-01-original-vs-integrated.png`,
`VISIBLE-EYE-HOME-INTEGRATION-01-states-strip.png`,
`VISIBLE-EYE-HOME-INTEGRATION-01-state-{watching,searching,found,solved,embodied,idle}.png`.

## Scope note

This is a test-only integration candidate. No production integration was
made, no Prototype 06 was created, and Journey/the dark eye/routing/storage/
`HeroV1Life` were left untouched throughout.

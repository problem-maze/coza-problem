# Performance Verification — Problem v86 Dark Only

## Scope of this report

Covers Gate B (surgical repairs), Gate C (automated runtime checks), and Gate D
(real-device status) for the 4 findings in `PERFORMANCE-INVENTORY-v86.json`. Every
claim below is labeled `VERIFIED` (backed by a captured command/output in this repo),
`PENDING REAL DEVICE`, or `NOT TESTED`. Nothing here is inferred without a citation.

## Gate B — static verification

**Command:**
```
node --check <extracted script block>   # once per physical <script> block
```
**Result:** `test-results/node-check-all-scripts.log` — all 19 physical `<script>`
blocks extracted from the repaired `Problem-v86-DARK-ONLY.html` pass `node --check`
with exit code 0 (Node v22.22.2). **VERIFIED.**

**Code-level check:** `grep -c "function skipIntro" Problem-v86-DARK-ONLY.html` → 2
lines match (`skipIntroReveal` and `skipIntro`), confirming the duplicate
`skipIntro()` declaration was removed and exactly one now exists.
`grep -n "BrandReveal.stop\|BrandReveal._timers"` → no matches, confirming the dead
reference to a nonexistent API was removed, not merely reordered. **VERIFIED.**

## Gate C — automated runtime checks

**Tooling:** Playwright 1.56.1 (`/opt/node22/lib/node_modules/playwright`), headless
Chromium (`/opt/pw-browsers`), Node v22.22.2. Script:
`test-results/gate-c-runtime.js`. Raw output: `test-results/gate-c-runtime-output.json`.

**Command actually run:**
```
NODE_PATH=/opt/node22/lib/node_modules PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers \
  node test-results/gate-c-runtime.js > test-results/gate-c-runtime-output.json
```
Exit code 0. `test-results/gate-c-runtime-stderr.log` is empty.

The script loads `Problem-v86-DARK-ONLY.html` via `file://` once per tier
(`high`, `mid`, `low` forced via `localStorage.p_tierForce`, plus `auto`), and for each
run performs:

| # | Scenario (mission's required scenario family) | How it was exercised |
| - | --- | --- |
| 1 | Cold start + first Home render | `page.goto(..., {waitUntil:'load'})` + `PhaseAValidation.snapshot('cold-start')` |
| 2 | Nav loop x3 (landing→solve→circle→watch→talk→landing) | direct `window.showPage(route)` calls, snapshot after each full loop |
| 3 | Tab hidden/visible | `PageLife.validationSetHidden(true/false)` — the validation-only hook the source itself exposes for headless testing (`PageLife.state()`/`validationSetHidden`, source comment: "used by the automated Phase A stress audit when a headless browser cannot produce real background-tab visibility events") |
| 4 | Each forced tier + Auto | 4 full passes: `high`, `mid`, `low`, `auto` |
| 5 | Tier-force persistence | in-page attempt to call `window.setPerfTier()` without `{force:true}` while a tier is forced |
| 6 | BrandReveal early-stop on background (Repair 1/2) | real `document.hidden` override + `visibilitychange` dispatch mid-cinematic, checked against elapsed time |
| 7 | DevTools interval pause/resume (Repair 3) | real `document.hidden` override + `visibilitychange` dispatch, checked before/during/after |
| 8 | Legacy carousel cold state (Repair 4) | snapshot of `window._showNextBootTimer`/`_showNextInterval` on the shipping page variant |

### Results (from `test-results/gate-c-runtime-output.json`)

**Console/page errors, all 4 tiers:** `pageErrors: []` in every tier — zero uncaught
JS exceptions across cold start, 3x nav loop, hide/restore, and all repair checks.
`overallPageErrors: []`. **VERIFIED.**

The only `console.error`-level messages captured (6 per run, identical across
tiers) are pre-existing and unrelated to this repair: one `X-Frame-Options may only
be set via an HTTP header...` warning from the static `<meta http-equiv=
"X-Frame-Options">` tag at line 14, and 5 `net::ERR_CONNECTION_RESET` messages from
the `fonts.googleapis.com` `<link>` tags (external network blocked in this sandboxed
test environment; confirmed present in source at lines 96-99, not something the
repair touched). **VERIFIED as pre-existing / not caused by the repair.**

**Nav loop (1):** `timers` snapshot after each of the 3 loop iterations is
identical and does not grow (`circle`/`watch`/`watchLive`/`watchTs`/`talk`/
`solveBlink`/`admin` all `false` at every checkpoint, all 4 tiers) — no duplicate
timers accumulate across repeated navigation. **VERIFIED.**

**Visibility (3):** after `validationSetHidden(true)` then `(false)` while ending on
`landing`, `snowActive`/`snowRaf` correctly resume to `true` on `high`/`mid`/`auto`
tiers and correctly stay `false` on the forced `low` tier (canvas/snow work is
tier-gated off). **VERIFIED — matches HeroLife/OffscreenWorkGate's documented
tier-low behavior.**

**Tier-force persistence (5):** for `high`, `mid`, `low` forced runs:
`{"attemptedChange":false,"heldForced":true}` — a same-page attempt to change tier
without `{force:true}` is refused while forced. `auto` run correctly reports
`{"applicable":false,"reason":"tier not forced in this run"}`. **VERIFIED — this is
the acceptance criterion "Tier Tester override persistence" exercised at runtime, not
only read in source.**

**Repair 1/2 — BrandReveal (6):** `activeShortlyAfterPlay:true` (cinematic started
normally), then after simulating tab-hidden mid-flight, `activeAfterEarlyHide:false`
and `finishedEarlyDueToHidden:true` at `elapsedMsWhenChecked` ≈1350-1470ms — well
under the natural 6600ms duration, in all 4 tiers. **VERIFIED: the loop stops early
because of the new `document.hidden` check, not because it ran its full course.**
(Note: an earlier version of this test script incorrectly awaited the cinematic's own
completion promise before checking state, which trivially always showed "finished."
That bug was caught and fixed before recording this result — see git history of
`test-results/gate-c-runtime.js` is not tracked, but the corrected script is the one
delivered.)

**Repair 3 — DevTools interval (7):** `beforeHidden:true` → `duringHidden:false` →
`afterRestore:true`, all 4 tiers. **VERIFIED: the interval is fully cleared while
hidden and recreated on restore, not merely skipping its body.**

**Repair 4 — legacy carousel (8):** on the shipping page (`hiPanelPresent:true`),
`bootTimer:0, interval:0` at the point measured — consistent with the pre-existing
external clear (`insight-cards` script) still firing first, so this scenario shows no
behavior change on the default variant, as the repair plan stated. **VERIFIED for the
"no regression on the shipping variant" claim.** The self-heal branch added in Repair
4 (what happens if `#hiPanel` is ever absent) was **NOT TESTED** at runtime in this
pass — exercising it would require a page variant with `#hiPanel` removed before load,
which was not built. This is honestly listed as a gap, not claimed as verified.

## Gate D — real-device verification

**Samsung A05s (4 GB RAM): PENDING REAL DEVICE.**
**Oppo A55: PENDING REAL DEVICE.**

Neither device is attached to this remote container environment. No device pass is
claimed or fabricated. Headless/desktop results above support diagnosis but do not
substitute for this gate, per the mission's own rule.

**Exact test procedure prepared for whoever runs this on the named phones:**

1. Copy `Problem-v86-DARK-ONLY.html` (or the delivered
   `Problem-v86-DARK-ONLY-PERFORMANCE-REPAIRED.html`) onto the device, or serve it
   over local HTTP/HTTPS, and open it in the device's browser with
   `?phaseAudit=1` appended to the URL.
2. Tap 7 times rapidly anywhere on the page to open the Tier Tester panel (per
   `HANDOFF-BRIEF-v86-DARK-ONLY.md`). Record: device model, Android version, browser
   + version, viewport, DPR, `deviceMemory`, `hardwareConcurrency` (visible in the
   panel / via the `?phaseAudit=1` device audit panel).
3. Cold start: note first Home render, and whether Fast/Auto tier was chosen.
4. Run the `?phaseAudit=1` device panel's "RUN 5s PROBE" button on Home; record the
   JSON output (fps, longFrameRatio, maxFrameMs) — this calls
   `PhaseAValidation.runDeviceAudit(5000)` already built into the file.
5. Navigate Home → Solve → Circle → Watch → Talk → Home, 3 times; note any visible
   stutter, and re-run the 5s probe.
6. Switch tabs / background the app for 5+ seconds, return; note resume behavior.
7. Scroll the hero out of view and back; note resume behavior.
8. In the Tier Tester panel, force High, then Mid, then Low, then Auto (each triggers
   `location.reload()`); repeat steps 3-5 for each forced tier, confirming the forced
   tier is not silently overwritten (compare `ttCurrent` label before/after the nav
   loop).
9. Record any visible regressions, crashes, heat, or battery concern for each tier.

This procedure is ready to run; no result is recorded because neither phone is
available in this session.

## Known limits (declared, not hidden)

- Reading/Realty/Pricing routes and ~150 one-shot `setTimeout` UI micro-interactions
  were confirmed non-recurring by grep pattern, not by full line-by-line read (see
  `not_yet_traced` in `PERFORMANCE-INVENTORY-v86.json`).
- Repair 4's self-heal branch (behavior when `#hiPanel` is absent) is source-reviewed
  and syntax-checked but not exercised by a runtime scenario.
- All Gate C evidence is headless-Chromium/desktop; it supports diagnosis and proves
  the specific fixed behaviors described above, but is not a substitute for Gate D.
- The 6 console messages captured in every Gate C run are pre-existing and unrelated
  to the repaired code paths (see above); they are not a new regression.

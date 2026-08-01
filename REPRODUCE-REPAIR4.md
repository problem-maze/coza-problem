# Reproduction — Problem v86 Performance Evidence Pack (Repair 4 updated)

Exact commands, working directories, and prerequisites to independently re-verify
everything in this package. Unzip the archive and `cd` into
`PROBLEM-V86-PERFORMANCE-EVIDENCE-PACK-REPAIR4-UPDATED/` first; all commands below
run from that directory unless stated otherwise.

## Prerequisites

| Requirement | Version used to produce this evidence | Notes |
| --- | --- | --- |
| Node.js | v22.22.2 | Any recent Node with `--check` works for the syntax step. |
| Playwright | 1.56.1 | Node package. Only needed for the runtime step. |
| Chromium | Playwright-managed build at `/opt/pw-browsers` | Any Playwright-compatible Chromium works. |

The original session resolved Playwright from a **global** install via `NODE_PATH`.
There is no `package.json` / `package-lock.json` in this project — see
`EVIDENCE-PACK-REPAIR4-UPDATED-INDEX.md`.

## 1. Verify package integrity

```bash
sha256sum -c SHA256SUMS.txt
```
Expected: every line reports `OK`.

## 2. Verify the repaired file's identity

```bash
sha256sum Problem-v86-DARK-ONLY-PERFORMANCE-REPAIRED.html
wc -l -c Problem-v86-DARK-ONLY-PERFORMANCE-REPAIRED.html
```
Expected: `c2b62cc98f1e3d0fa00d3709818f79f9ee73bd568700dcb6b665adef20b0d6b1`,
45,690 lines, 3,051,238 bytes.

The authorized original's identity (unchanged, never edited) is recorded in
`CONTEXT-CERTIFICATE-v86.md`: SHA-256
`7608fa8bede185c28e4cc905cc8f60e700fdee5d3bd1f7660c66280b9c28bb26`, 45,668 lines,
3,049,614 bytes.

## 3. Confirm the diff represents exactly this repaired file

```bash
grep -c '^@@' original-vs-repaired-repair4.diff     # expect 7 hunks
grep    '^@@' original-vs-repaired-repair4.diff     # all within the 4 repaired regions
```
The diff's `+++` header records the repaired file it was generated against. To
reconstruct the repaired file from the authorized original (if you hold the
original):

```bash
patch -o reconstructed.html /path/to/authorized-original.html original-vs-repaired-repair4.diff
sha256sum reconstructed.html    # must equal the hash in step 2
```

## 4. Re-run syntax verification for every script block

```bash
node -e "
const fs=require('fs');
const html=fs.readFileSync('Problem-v86-DARK-ONLY-PERFORMANCE-REPAIRED.html','utf8');
const re=/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g;
let m,i=0; fs.mkdirSync('/tmp/v86-check',{recursive:true});
while((m=re.exec(html))){i++;fs.writeFileSync('/tmp/v86-check/script_'+i+'.js',m[1]);}
console.log('extracted',i,'script blocks (expect 19)');
"
for f in /tmp/v86-check/script_*.js; do node --check "$f" || echo "FAIL: $f"; done
echo "no FAIL lines above = all 19 blocks pass"
```
Compare with `test-results/node-check-all-scripts-repair4.log`.

## 5. Re-run the updated runtime/Playwright suite

**Required one-line path adjustment.** `test-results/gate-c-runtime-repair4.js`
line 25 hardcodes the original container path:

```js
const FILE = 'file://' + path.resolve('/home/user/coza-problem/Problem-v86-DARK-ONLY.html');
```

Change it to point at this package's copy, e.g.:

```js
const FILE = 'file://' + path.resolve('./Problem-v86-DARK-ONLY-PERFORMANCE-REPAIRED.html');
```

Then:

```bash
npm install playwright            # or set NODE_PATH to an existing global install
npx playwright install chromium   # skip if a Chromium build is already present
node test-results/gate-c-runtime-repair4.js > rerun.json
echo "exit code: $?"              # 0 = every assertion passed
```

Exit codes: `0` all assertions passed · `1` at least one assertion failed ·
`2` script-level error.

Compare `rerun.json` against the captured runs
`test-results/gate-c-runtime-repair4-output.json` (run 1) and
`test-results/gate-c-runtime-repair4-output-run2.json` (clean repeat). Check the
`summary` block:

```bash
node -e "const r=require('./rerun.json');console.log(JSON.stringify(r.summary,null,2))"
```

Expected:
```
allTiersRouteCompletionAgreed : true
missingHiPanelScenario        : "PASS"
hiPanelPresentScenario        : "PASS"
totalUncaughtPageErrors       : 0
```

### What each part of the suite proves

| Part | Assertion |
| --- | --- |
| Route completion (all tiers) | After each `showPage()`, waits until `PhaseAValidation.activeRoute()` **and** `PageLife.state().route` both equal the requested route, timeout 5000ms (router needs ~300ms + ~360ms settle). Disagreement after timeout = recorded FAIL, not a silent pass. |
| `missing-hiPanel` scenario | `#hiPanel` is removed during parse before the insight-cards script runs; proves that script returned early (so nothing external cleared the legacy timers), and that no 3500ms carousel interval is ever created or left alive — before or after navigating away. |
| `hiPanel-present` scenario | With `#hiPanel` present, the live insight-cards interval (5000ms) starts while Landing is active and is cleared at the lifecycle exit; the superseded legacy carousel owns no interval. |
| Timer instrumentation | `setInterval`/`clearInterval` are wrapped in an init script, so "no interval running" comes from observed create/clear events, not from assuming some other script cleaned up. |

## 6. What this reproduction does NOT cover

Every step above runs in headless Chromium on desktop hardware. None of it measures
frame rate, jank, thermal throttling, memory pressure, or battery drain on real ARM
mobile hardware. **Samsung A05s and Oppo A55 testing has not been performed.** See
`PERFORMANCE-VERIFICATION-REPAIR4-v86.md`, "Gate D", for the on-device procedure that
still needs to be run.

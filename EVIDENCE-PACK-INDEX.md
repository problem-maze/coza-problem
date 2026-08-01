# Evidence Pack Index — Problem v86 Performance Work

This index describes the contents of `PROBLEM-V86-PERFORMANCE-EVIDENCE-PACK.zip`.
All hashes below were computed directly from the packaged files and independently
cross-checked with `sha256sum -c SHA256SUMS.txt` run against the unzipped archive
(see "Package integrity check" at the end of this file).

## Files inside the ZIP

| File (path inside ZIP) | SHA-256 | Purpose | Status |
| --- | --- | --- | --- |
| `CONTEXT-CERTIFICATE-v86.md` | `ac81ad83eab623cfc8320059fe3720e5a973db633382f5190019ccd056937d13` | Gate 0 record: verified identity of the authorized original source (title, byte size, line count, SHA-256) against the mission pack's stated values, plus 2 metadata corrections found by independent recount | **VERIFIED** — identity fields were independently recomputed (`sha256sum`, `wc -l -c`, `grep`) against the actual uploaded attachment, not copied from a claim |
| `Problem-v86-DARK-ONLY-PERFORMANCE-REPAIRED.html` | `01eca32b5223a7097b7a5798688254e772a2fb5703bad0bb6688f7dd07ad66c1` | The repaired, deliverable HTML source (45,668 lines, 3,050,127 bytes) | **VERIFIED** — hash recomputed at packaging time; all 19 embedded `<script>` blocks re-checked with `node --check` (see `test-results/node-check-all-scripts.log`) |
| `CLAUDE-CODE-COMPLETE-WORK-RECORD.md` | `4652f7a38b4086130595ef9ad20b99f4f60969b0ab2e2f34bd1081a58fd6890b` | Full chronological work record: every action, command, file change, and a self-reported process gap from this chat | **VERIFIED** — cross-referenced against actual git history and file hashes at the time it was written |
| `PERFORMANCE-INVENTORY-v86.json` | `b7b563b75220d25295d56b451a5c6e79a087202c50bdd8e72a8c0f7de0dee01a` | Gate A independent runtime inventory: 21 records covering every named lifecycle/performance system, each with anchor line, start/stop condition, and classification (17 `SAFE`, 4 findings) | **VERIFIED** — built from direct source reads, not from the companion mission docs' claims; includes 2 documented corrections to those docs |
| `PERFORMANCE-REPAIR-PLAN-v86.md` | `90c08d3aa5d68f839ff0b81a50ae511796db45db97d60333b19366e4aff9bf1c` | Gate B plan: root cause, exact anchors, before/after behavior, compatibility risk, rollback method, and acceptance check for each of the 4 findings | **VERIFIED** — written before editing; every edit described in it is visible in `original-vs-repaired.diff` |
| `PERFORMANCE-VERIFICATION-v86.md` | `cf03132b768b737a4299a8f083366582f74f76687fdd99d3c726220c6ec04563` | Gate C/D report: static + runtime verification results, and the prepared real-device procedure | **VERIFIED** for Gate C (runtime evidence captured); **PENDING REAL-DEVICE TEST** for Gate D (explicitly, see below) |
| `original-vs-repaired.diff` | `705f030f489ecef0c96479fbafe2cf5b7b016317b92c4e702c6f19f970eb9236` | Full unified diff (104 lines) between the authorized original (`Problem-v86-DARK-ONLY.html`, SHA-256 `7608fa8bede185c28e4cc905cc8f60e700fdee5d3bd1f7660c66280b9c28bb26`) and the repaired file above — the exact and complete change set, nothing summarized | **VERIFIED** — regenerated directly from the original attachment and the repaired file at packaging time, with the SHA-256 of each side embedded in the diff header |
| `REPRODUCE.md` | `c586b32d2b3654f1056020093ea1484402e34625d715427bc470e55b86933ccd` | Exact commands and working directories to re-run every check in this pack | **VERIFIED** — commands match what was actually run in this session; known limitation of one relative path documented inline |
| `test-results/gate-c-runtime.js` | `2e4e0eaed68cadb463e24a79531ff3128a344f51c21459cf451e93b747b91740` | The actual Playwright test script used for Gate C (corrected version — an earlier version had a test-logic bug, fixed before this run) | **VERIFIED** — `node --check` clean; this is the exact script that produced the output file below |
| `test-results/gate-c-runtime-output.json` | `4d3e4002567fe48fc8fa93c77ed11a85a84d108affd5559bc5062d91e37cf2f3` | Raw JSON output of the Gate C run: per-tier cold start, 3x nav loop, hide/restore, tier-force persistence, and all 4 repair checks | **VERIFIED** — raw tool output, not hand-edited; exit code 0, `overallPageErrors: []` |
| `test-results/gate-c-runtime-stderr.log` | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` | stderr capture from the Gate C run (empty file — zero stderr output) | **VERIFIED** — empty is the actual captured result, not an omission |
| `test-results/node-check-all-scripts.log` | `c526edf5d68f061a0c06a8492a583f6811057d73bf96924ae328493d7113867a` | Raw `node --check` results for all 19 extracted `<script>` blocks from the repaired file | **VERIFIED** — 19/19 exit code 0, Node v22.22.2 |
| `SHA256SUMS.txt` | (see package integrity check below) | Checksums for every other file in this package | **VERIFIED** — regenerated at packaging time and independently re-checked with `sha256sum -c` against the unzipped archive before delivery |

**Total: 12 files** (plus 2 directory entries: the package root and `test-results/`).

## Files NOT included, and why

| Expected/possible item | Why it is not in this package |
| --- | --- |
| `package.json` / `package-lock.json` | **Not used.** Playwright (1.56.1) was resolved from a pre-existing global install (`/opt/node22/lib/node_modules/playwright`) via `NODE_PATH`, not from a local npm project. No `package.json` or `package-lock.json` was ever created in this repository. This is stated here explicitly rather than silently omitted. |
| Screenshots | **None were captured.** No screenshot-capture step was run during Gate C; the automated checks read DOM/JS state programmatically (via `PhaseAValidation.snapshot()` and direct `page.evaluate()` calls), not via visual capture. |
| Playwright traces (`.zip` trace files, video) | **None were captured.** Playwright's tracing/video-recording features were not enabled for this test run; only console/page-error listeners and `page.evaluate()` results were captured. |
| The pristine original `Problem-v86-DARK-ONLY.html` (pre-repair) | **Not duplicated in this package.** Its exact identity (title, size, lines, SHA-256) is recorded in `CONTEXT-CERTIFICATE-v86.md`, and the complete, exact change from it is captured in `original-vs-repaired.diff`. It also remains available as the first commit (`2726065`) in the project's git history and as the original uploaded chat attachment. |
| Any Coza/Tuaryex/v77/v79/other repository file | **Deliberately excluded.** This package contains only the v86 performance-mission evidence; no unrelated repository files were added. |
| Any secret, token, password, or private key | **Confirmed absent** — the packaged files were grepped for common secret patterns (`password`, `api[_-]?key`, `secret`, `token`, private-key PEM headers) immediately before packaging; no matches. |

## Real-device testing — stated explicitly

**Samsung A05s: NOT PERFORMED.** **Oppo A55: NOT PERFORMED.**

Neither physical device is attached to this remote execution environment. No claim
of a device pass exists anywhere in this pack, and none is implied by the Gate C
results below. `PERFORMANCE-VERIFICATION-v86.md` contains the exact 9-step procedure
prepared for whoever runs this on the named phones, but that procedure has not been
executed, and its results are not present in this package because they do not exist
yet.

**Playwright / headless-Chromium checks do not prove real-device smoothness.**
The Gate C evidence in `test-results/` proves specific, narrow claims at the level a
headless desktop browser can measure: that all 19 script blocks are syntactically
valid; that the 4 lifecycle repairs behave correctly when their trigger conditions
are simulated (tab-hidden via `document.hidden` override, tier-forcing via
`localStorage`); that repeated navigation does not accumulate duplicate timers; and
that zero uncaught JavaScript errors occur across any of the above. It does **not**
measure frame rate, jank, thermal throttling, memory pressure, or battery drain on
real ARM mobile hardware, and it does not simulate GPU driver differences, real
network conditions, or OS-level backgrounding behavior. The mission's practical
success condition — "normal navigation feels responsive and stable on weak Android
phones, especially Samsung A05s and Oppo A55" — remains **unverified** until the
Gate D procedure is actually run on those devices.

## Missing evidence and remaining blockers

1. **Gate D (real-device) evidence does not exist.** This is the only outstanding
   gate from the original mission. Smallest next action: run the procedure in
   `PERFORMANCE-VERIFICATION-v86.md` → "Gate D" on a Samsung A05s and/or Oppo A55 and
   capture the results.
2. **Repair 4's "self-heal when `#hiPanel` is absent" branch is not runtime-tested.**
   It is present in the repaired file (see `original-vs-repaired.diff`) and passes
   static syntax checking, but no test scenario in `test-results/` exercises the
   specific case where `#hiPanel` is missing from the page. Documented as a known
   limitation in `PERFORMANCE-VERIFICATION-v86.md`.
3. **`REPRODUCE.md`'s Gate C re-run step requires a one-line edit** to
   `test-results/gate-c-runtime.js` (the `FILE` path constant is hardcoded to the
   original session's container path) before it will run on a different machine.
   This is called out explicitly in `REPRODUCE.md` §5.

No other blockers are known at packaging time.

## Package integrity check (performed before delivery)

```
$ sha256sum -c SHA256SUMS.txt        # run inside the unzipped package directory
CLAUDE-CODE-COMPLETE-WORK-RECORD.md: OK
CONTEXT-CERTIFICATE-v86.md: OK
PERFORMANCE-INVENTORY-v86.json: OK
PERFORMANCE-REPAIR-PLAN-v86.md: OK
PERFORMANCE-VERIFICATION-v86.md: OK
Problem-v86-DARK-ONLY-PERFORMANCE-REPAIRED.html: OK
original-vs-repaired.diff: OK
REPRODUCE.md: OK
test-results/gate-c-runtime.js: OK
test-results/gate-c-runtime-output.json: OK
test-results/gate-c-runtime-stderr.log: OK
test-results/node-check-all-scripts.log: OK
```
All 12 entries in `SHA256SUMS.txt` matched their packaged file, and all 12 files
listed in this index were confirmed present inside the ZIP archive
(`unzip -l PROBLEM-V86-PERFORMANCE-EVIDENCE-PACK.zip`) before this pack was
attached to the chat. Secret/token/password scan (see "Files NOT included") was run
against every text file in the package and returned no matches.

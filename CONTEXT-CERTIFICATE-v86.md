# Context Certificate — Problem v86 Dark Only

## Gate 0 status: VERIFIED

## Source identity (verified against the attached file, then against the workspace copy)

| Field | Required (mission pack) | Observed — attachment | Observed — workspace copy |
| --- | --- | --- | --- |
| Filename | `Problem-v86-DARK-ONLY.html` | `95866d73-Problemv86DARKONLY.html` (upload storage name) | `Problem-v86-DARK-ONLY.html` |
| Title | `Problem — The Maze Eye (v86-DARK-ONLY)` | `Problem — The Maze Eye (v86-DARK-ONLY)` ✅ | ✅ identical |
| Size | 3,049,614 bytes | 3,049,614 bytes ✅ | 3,049,614 bytes ✅ |
| Lines | 45,668 | 45,668 ✅ | 45,668 ✅ |
| SHA-256 | `7608fa8bede185c28e4cc905cc8f60e700fdee5d3bd1f7660c66280b9c28bb26` | `7608fa8bede185c28e4cc905cc8f60e700fdee5d3bd1f7660c66280b9c28bb26` ✅ | `7608fa8bede185c28e4cc905cc8f60e700fdee5d3bd1f7660c66280b9c28bb26` ✅ |

`diff` between the uploaded attachment and the workspace copy at `/home/user/coza-problem/Problem-v86-DARK-ONLY.html` returned no differences (byte-identical). The file is now a real tracked-workspace file, not only an uploaded attachment.

**Result: identity fully matches the mission pack. This is the authorized source. No Coza, Tuaryex, v77, v79, or other HTML file was used or substituted.**

## Corrections to companion-doc metadata (found during independent verification, per Thinking-Transfer instruction to verify rather than trust labels)

| Claim in `CODEBASE-ATLAS-v86-DARK-ONLY.md` | Independent check performed | Result |
| --- | --- | --- |
| "Physical executable script blocks: 19" | `grep -no '<script[^>]*>'` → 19 real tags; one extra `grep -c` hit at line 36031 was a regex literal `/<script\b/i,` inside JS, not a tag | **Confirmed: 19** physical `<script>` blocks |
| "Physical style blocks: 10" | `grep -no '<style[^>]*>'` → 12 real top-level `<style>` tags (lines 113, 7282, 7450, 7751, 9340, 10314, 12877, 37248, 37431, 38665, 43708, 44901) | **Correction: 12** physical `<style>` blocks, not 10. Will use 12 as the authoritative count for Gate A/B. |
| Live `div#page...` routes: 13 | `grep -oE 'id="page[A-Za-z]+"'` → 14 matches; `pageLoginTemplate` is inside a `<template>` (not a live route) per Atlas note | **Confirmed: 13 live routes** + 1 non-route `<template>` (`pageLoginTemplate`) |
| `experience='1'` set before first paint | `grep -n "experience\s*=\s*['\"]1['\"]"` → line 53, `var experience='1';`, inside the early boot script before `<body>` content | **Confirmed** |

These are metadata corrections only; they do not change the identity verdict above and do not indicate a different file.

## Working-copy filename

`/home/user/coza-problem/Problem-v86-DARK-ONLY.html` (tracked in the git working tree of `problem-maze/coza-problem`, branch `claude/start-claude-code-v86-tdn3cy`). This file will be the only one edited. The original attachment is left untouched at its upload path as the reference original.

## Observed Home boot behavior — locked for this mission

Line 53 of the source: `var experience='1';`, executed in the earliest boot script before first paint. This selects the legacy Eye preview as the default Home experience. Journey and other Home experiences remain present and selectable elsewhere in the source. **This mission does not change this selection.** Any repair that would alter which experience boots by default, or that would remove Journey/other experiences, is out of scope and will not be made.

## Scope

**In scope:**
- Trace real runtime ownership of every repeating `requestAnimationFrame`, `setInterval`, self-rescheduling `setTimeout`, Canvas/WebGL loop, observer that starts recurring work, and global visibility/route handler.
- Repair lifecycle ownership and duplicate execution so that only the active route/experience owns continuous work (1 = 1).
- Verify tier behavior (`high`/`mid`/`low`/auto), lite mode, `EmergencyLow`, `GpuEffects`.
- Automated runtime checks (headless browser) for the required scenario family.
- Prepare, but not fabricate, real-device evidence for Samsung A05s / Oppo A55.
- Deliver repaired HTML + inventory + repair plan + verification report + raw test outputs + checksums.

**Out of scope — will not be done:**
- v88, the separate AST project, or using AST conclusions as proof of this HTML's performance.
- Any redesign, visual-system change, new features, copy changes, language-behavior changes.
- Changing the default Home experience, routing, or first-paint `experience='1'` selection.
- Removing legacy Eye, Journey, alternate Home experiences, Tier Tester, `PhaseAValidation`, `PageLife`, `OffscreenWorkGate`, `EmergencyLow`, `GpuEffects`, `HeroLife`, `HeroV1Life`.
- Splitting the app into external CSS/JS files.
- Claiming a fixed FPS target as a universal success criterion.
- CSS `:has()`, CSS `inset:0` (must remain `top/right/bottom/left:0`), removal of `transform-box: fill-box`, RTL/language regressions, SVG gradient color changes without device evidence, cyan/blue substitution for the moonlight-white/ice-gray visual language.

## Tools actually available in this environment

| Tool | Version / path | Notes |
| --- | --- | --- |
| Node.js | v22.22.2 | Different from the v24.14.0 used in the Atlas's prior baseline inspection session; both are valid for `node --check` syntax validation, noted here for reproducibility, not treated as a discrepancy in source identity. |
| Playwright | 1.56.1, installed globally at `/opt/node22/lib/node_modules/playwright` | Will be used for headless Chromium automated runtime checks (Gate C). |
| Chromium (Playwright-managed) | present at `/opt/pw-browsers` | `PLAYWRIGHT_BROWSERS_PATH` already points here; no browser download needed. |
| git | working tree, branch `claude/start-claude-code-v86-tdn3cy` | Used for version control of the working copy and all delivered artifacts. |

No physical Android device is attached to this remote container.

## Test devices

| Device | Availability |
| --- | --- |
| Samsung A05s (4 GB RAM) | **Not available** in this remote execution environment. |
| Oppo A55 | **Not available** in this remote execution environment. |

Per the mission's own contingency: Gate D will be marked `PENDING REAL DEVICE`. The exact test script and step list will be produced so it is ready to run on either phone; no device pass will be fabricated or inferred from headless/desktop testing.

## Gate 0 verdict

**VERIFIED — proceeding to Gate A (independent runtime inventory).**

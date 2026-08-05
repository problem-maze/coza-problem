# V20.2.1 — English/LTR viewport settle correction

## Task

User uploaded `CLAUDE-V20-2-1-ONE-SHOT-LTR-SETTLE-CORRECTION-PROMPT.md` and asked
to diagnose, fix, test, evidence, report, and package a runtime defect in the
Sign-in swiper: in some real English/LTR sessions "the entire Sign in
composition remains translated left, while the right side is empty." Required:
instrumented diagnosis before editing (no guessing from screenshots), a
deterministic runtime fix, a repeated real-flow test matrix (English
mobile/desktop, Arabic regression, resize regression), proof the approved
V20.2 Earth subsystem stays byte-identical, and a full report/diff/trace/
manifest/evidence/zip package. The prompt explicitly forbade several "false
fixes" (waiting/hoping, cropping the missing side, a blind permanent
translateX, claiming success from `scrollWidth<=clientWidth` alone, etc.).

## Answer

### Root cause

`initLoginSwiper()`'s `goTo(n)` positioned the swiper track with a bare CSS
percentage: `track.style.transform='translateX(-'+(cur*50)+'%)';`. This
percentage always resolved correctly against the track's own width — the bug
was never there. Repeated instrumented real-flow runs (full rect + computed-
style dumps at 9 checkpoints, real time waits, no fake timers) showed the
computed transform matrix and both slides' widths were *always* correct, but
the flex-computed **position** of `.login-right`/`.login-left` was sometimes
wrong by an arbitrary, run-dependent offset from the very first frame — never
self-correcting. This is a flex child-placement race, empirically tied to the
World globe's own async mount inside `.login-right` racing the swiper's first
layout commit, not a width or timing-flush issue (ruled out via two rejected
fix attempts — see the full report).

### Fix

Replaced the percentage transform with a **measured-delta** transform:
directly measure where the active slide currently sits relative to the
swiper's left edge, and shift the track's current transform by exactly the
delta needed — correct regardless of the flex layout's actual (possibly
wrong) child-width split, since it never assumes what that split should be.
Added a `ResizeObserver`-driven resync for resize/orientation/font
settlement, and a one-time `transitionend` self-correction — both applied
**instantly** (`transition:none` snap) rather than through the swiper's own
0.52s CSS transition, since an earlier version of the resize fix was
mechanically correct but took ~500ms to visually settle because the
corrective write was itself being eased by that transition.

3 diff hunks total, all inside `initLoginSwiper()`. No other line changed.

### Verification

- Full real-flow Playwright matrix: 35/35 checkpoints pass (EN mobile
  first-open ×3, EN mobile reopen ×2, EN desktop ×3, AR regression ×2, resize
  regression ×1), zero new console/page errors.
- Earth-freeze manifest: 65/65 code regions byte-identical between V20.2 and
  V20.2.1 (`combined_sha256` match). V20.2's own file hash confirmed
  unchanged on disk throughout.
- Before/after diagnostic board: reproduced the V20.2 bug (-147px offset) and
  confirmed V20.2.1 clean (0px offset) in the same capture run.

### Deliverables (all in repo root + `V20-2-1-FINAL-DELIVERY-PACKAGE.zip`)

- `Problem-v86-nav-logo-simplified-signin-continuous-hand-20-2-1-english-ltr-viewport-settle-correction.html`
- `V20-2-1-ENGLISH-LTR-VIEWPORT-SETTLE-REPORT.md`
- `V20-2-to-V20-2-1-EXACT-DIFF-REPORT.md`
- `V20-2-1-VIEWPORT-SETTLE-TRACE.json`
- `V20-2-1-EARTH-FREEZE-MANIFEST.json`
- `V20-2-1-MOBILE-390x844-DPR2-ENGLISH-FIRSTOPEN.png`, `-REOPEN.png`
- `V20-2-1-DESKTOP-900x900-ENGLISH.png`
- `V20-2-1-MOBILE-390x844-DPR2-ARABIC.png`
- `V20-2-1-BEFORE-AFTER-DIAGNOSTIC-BOARD.png`

**Verdict: `V20_2_1_READY_FOR_INDEPENDENT_AUDIT`** — full detail and rationale
in `V20-2-1-ENGLISH-LTR-VIEWPORT-SETTLE-REPORT.md`.

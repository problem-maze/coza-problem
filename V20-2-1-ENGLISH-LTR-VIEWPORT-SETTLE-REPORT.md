# V20.2.1 — English/LTR Viewport Settle Correction Report

**Scope of this correction:** the English/LTR Sign-in swiper positioning/settling
defect only — "the entire Sign in composition remains translated left, while the
right side is empty" in some real English/LTR runs. Nothing else in the file was
touched. This is **not** a Golden Master; it is a scoped correction to one runtime
defect, verified against the exact test matrix this task required.

---

## 1. Root cause (exact)

`initLoginSwiper()`'s `goTo(n)` positioned the swiper track with a bare CSS
percentage:

```js
track.style.transform='translateX(-'+(cur*50)+'%)';
```

This percentage resolves against `#lpSwiperTrack`'s own border-box width
(`.lp-swiper-track{width:200%}`), which was **always** correct — 200% of the
`.lp-swiper` viewport. The defect was never in the track's width.

The defect is a **position-only race** in how the browser's flex layout places
the track's two children, `.login-right` (order:0, the World/globe slide) and
`.login-left` (order:1, the Sign-in slide), each declared `width:50%!important`.
Repeated instrumented real-flow runs (full computed-style + `getBoundingClientRect()`
dumps of `.lp-swiper`, `#lpSwiperTrack`, `.login-left`, `.login-right`, the
computed transform matrix, and the inline transform, captured immediately after
`goTo()`, at transition-complete, and at final-hold) showed that in a fraction of
fresh English/LTR page loads:

- `getComputedStyle(track).transform` correctly reported the expected matrix
  (e.g. `matrix(1,0,0,1,-390,0)` for `cur=1` at a 390px viewport) — the JS math
  was never wrong.
- `getComputedStyle(.login-right/.login-left).width` **always** correctly
  reported the right value (e.g. `390px`) — the widths were never wrong.
- Despite both of the above being correct, the children's actual on-screen
  **position** was sometimes offset by an arbitrary, run-dependent amount
  (observed offsets included -147px, -119px, -712px across different runs) —
  present from the very first post-`goTo()` frame and **never self-correcting**
  through hold-entry and final-hold, seconds later.

This rules out a "layout not yet flushed" timing race (forcing an extra reflow
via `track.getBoundingClientRect()` did not fix it — see §6, fix attempt 1) and a
width-computation race (widths were always correct in every dump, good or bad
run). It is specifically the flex algorithm's child **placement** going wrong in
a way the percentage-based transform has no way to detect, tied empirically to
the World globe's own async mount inside `.login-right` racing the swiper's
first flex layout commit. Because a bare percentage transform assumes the
track's width alone determines correct alignment, it cannot detect or correct
for a child-placement discrepancy, and nothing re-triggers the transform once
`goTo()` has run — so a bad first frame stays bad forever.

### Why this affected English/LTR specifically

The bug is not language-specific in its mechanism (it is a raw flex-layout
race), but it is only **user-visible** in LTR: in RTL, `.lp-swiper-track` gets
`direction:rtl` (confirmed unchanged in this correction — see §7), which flips
which edge "the empty side" appears on and, more importantly, RTL sessions in
this file's real usage load through a different navigation path (Arabic
sign-in is reached after the language toggle, by which point the World globe's
async mount has already settled from the initial English load). LTR sessions
hitting this race lose the composition to a visibly-empty right side; RTL
sessions were not observed to reproduce it in any instrumented run in this
correction (§5, Arabic regression: 6/6 checkpoints pass across 2 runs).

---

## 2. Exact lines changed

Full hunk-by-hunk diff: see `V20-2-to-V20-2-1-EXACT-DIFF-REPORT.md`. Summary:

1. **Added** `function applyTrackTransform(n)` (inserted immediately before the
   existing `function goTo(n)`, in the same closure so it shares `track`,
   `swiper`, `cur`). Measures `activeSlide.getBoundingClientRect()` vs
   `swiper.getBoundingClientRect()`, computes the exact delta needed to align
   the active slide's left edge with the swiper's left edge, and adds that
   delta to the **current** transform's `m41` (read via `DOMMatrix`, so it is
   correct regardless of what value the transform already holds).
2. **Replaced** the one line `track.style.transform='translateX(-'+(cur*50)+'%)';`
   inside `goTo()` with `applyTrackTransform(cur);`.
3. **Added** `function applyTrackTransformInstant(n)` — wraps
   `applyTrackTransform` with a temporary `transition:none` so corrective
   snaps do not visibly animate through the swiper's own 0.52s transition
   (see §6, fix attempt 4 for why this was necessary).
4. **Added** resize-safety: a `resize` + `visualViewport.resize` listener
   (80ms debounce) and a `ResizeObserver` on `.login-right`/`.login-left`
   directly (50ms debounce), both calling `applyTrackTransformInstant(cur)`.
5. **Added** a one-time `transitionend` listener on `track`, filtered to
   `e.target===track && e.propertyName==='transform'`, that re-measures and
   calls `applyTrackTransformInstant(cur)` only if the settled position is
   still off by more than 1px.

No other line in the file changed. `goTo()`'s other logic (input
disabling, dot state, reveal-form timer, `headmazeStory.setActive()`) is
byte-identical to V20.2.

---

## 3. Why the fix is deterministic

- It never assumes what the flex layout's child-width split "should" be — it
  measures the **actual** current position of the active slide and the
  **actual** current position of the swiper, and computes the exact pixel
  delta between them. There is no scenario where this delta is wrong, because
  it does not depend on any assumption about `%`-based flex resolution; it
  only depends on `getBoundingClientRect()`, which always reflects the true
  rendered layout at the moment it is called.
- Reading both rects forces a synchronous layout flush first, so the
  measurement is never stale.
- It is idempotent: calling `applyTrackTransform(1)` twice in a row with no
  layout change in between computes a delta of 0 the second time (the slide
  is already aligned), so repeated `goTo(1)` calls converge, not drift.
- Init/resume cannot preserve a stale transform: `_lpLoginSwiperResume()` calls
  `goTo(0)`, which re-measures and re-applies from the DOM's actual current
  state — it does not reuse any cached value.
- The `transitionend` correction is filtered to the track's own transform
  transition and fires exactly once per real transition (not a poll, not a
  free-running timer), and only acts when a residual gap is detected.
- The resize/`ResizeObserver` corrections are two independent, bounded,
  one-shot-per-burst debounced calls (never free-running), tied to real
  geometry change (not a guessed settle delay).
- The `applyTrackTransformInstant` wrapper guarantees these corrections apply
  on the very next frame rather than drifting through the swiper's own 0.52s
  CSS transition (root cause of the resize-regression's initial ~900ms
  convergence tail — see §6, fix attempt 4).

---

## 4. First-open / reopen / resize results

All results below are from the full real-flow Playwright matrix
(`V20-2-1-VIEWPORT-SETTLE-TRACE.json`), run against the live file with real
time waits (no fake timers), polling for the story's own `lhmz-stage-*` /
`.lhmz-story-complete` classes rather than fixed sleeps for stage transitions.

| Scenario | Runs | Checkpoints/run | Result |
|---|---|---|---|
| EN mobile 390×844 DPR2, first open | 3 | transition-complete, hold-entry, final-hold | 9/9 pass |
| EN mobile 390×844 DPR2, close+reopen | 2 | first-open-transition-complete, reopen-transition-complete, reopen-hold-entry, reopen-final-hold | 8/8 pass |
| EN desktop 900×900, first open | 3 | transition-complete, hold-entry, final-hold | 9/9 pass |
| Resize regression (EN 390×844 → 820×1180 → 390×844) | 1 | before-resize, after-resize-wide, after-resize-back-to-390 | 3/3 pass |

**Total: 29/29 English checkpoints pass.**

"Reopen" exercises the real code path (`if(track.dataset.lpSwiperInit==='1'){
_lpLoginSwiperResume(); return; }` → `cancelHeadmazeReveal(); headmazeStory.reset();
headmazeStory.setActive(false); goTo(0);`), not a synthetic DOM reset — the test
calls `window.showLogin()` a second time on the already-initialized document,
which is the real "user navigates back to Sign In" path.

---

## 5. LTR bounding-rectangle results / RTL regression results

The Viewport Acceptance Function checked, for every run and checkpoint, all of:
`.login-headmaze`, `.login-title`, `.login-oauth-primary`, `.login-input-wrap`,
`.login-btn`, `.login-sub`, `.login-content`, `.login-left` — each required to
have `rect.left>=-1`, `rect.right<=viewportWidth+1`, `rect.width>0`, be visible
(`display!=='none' && visibility!=='hidden' && opacity>0`), and — critically —
have `.login-left` checked for containment **relative to `.lp-swiper`**, not
just the document, so an ancestor-transform escape would be caught even if the
element happened to still overlap the viewport by coincidence.

- **EN (LTR):** 29/29 checkpoints pass (see §4).
- **AR (RTL) regression, 2 independent runs, transition-complete / hold-entry /
  final-hold each:** 6/6 checkpoints pass. The Sign-in composition remains
  correctly centered in RTL in every run — this correction changed no
  `dir`/`lang`-conditional code path, no `direction:rtl` rule, and no Arabic
  translation string.

**Grand total: 35/35 checkpoints pass, 0 failures.**

---

## 6. How the fix was reached (including rejected attempts)

1. **Fix attempt 1 (rejected): track-width-based pixel transform.**
   `applyTrackTransform` originally read `track.getBoundingClientRect().width`
   (always correctly reported, e.g. 780px) and computed
   `translateX(-(n*trackW/2))`. This did not fix anything, because track width
   was never the wrong quantity — the bug is in the **children's** computed
   position. Confirmed via the full matrix: 2/3 `en-mobile-firstopen` runs
   still failed at every checkpoint.
2. **Fix attempt 2 (rejected): `transitionend` correction on top of attempt 1.**
   Adding a post-transition re-check using the same (wrong-layer)
   `applyTrackTransform` did not help, since the correction itself still
   measured the wrong quantity. Confirmed via the full matrix: still 3/3
   failures at every checkpoint including final-hold.
3. **Fix attempt 3 (accepted): measured-delta transform.** Rewrote
   `applyTrackTransform` to measure the active slide's actual position
   relative to the swiper and compute the exact delta, added to the current
   transform's `m41`. This does not depend on any width/percentage
   assumption. Validated 10/10 via a minimal-overhead verification script,
   then 33/35 via the full matrix (only resize-regression residually failing
   at that point — a separate code path, see next).
4. **Fix attempt 4 (accepted, resize convergence): instant transform
   application.** A dedicated diagnostic (sampling `.login-left`'s rect,
   `.lp-swiper`'s rect, and the track's computed transform every 50ms across
   a resize) revealed the resize-sync correction was mechanically correct but
   was being **animated** through the swiper's own
   `.lp-swiper-track{transition:transform 0.52s cubic-bezier(...)}` rule —
   the corrective `track.style.transform` write is CSS, so the browser eased
   it exactly like a user-triggered slide change, taking ~500ms past the
   resize event to visually settle. This is why an earlier version of this
   correction needed test waits up to 800ms and still occasionally left a
   residual few-pixel gap. The fix: `applyTrackTransformInstant()` sets
   `track.style.transition='none'`, applies the correction, forces a
   synchronous reflow (`track.getBoundingClientRect()`), then restores the
   transition — so the correction snaps on the very next frame instead of
   drifting through a 500ms ease curve. This resolved the resize-regression
   scenario to 3/3 pass and is the final, currently-shipping mechanism.

A note on process integrity: an early validation of fix attempt 1 (a diagnostic
script with extra `evaluate()` calls between `showLogin()` and the sign-in
click) reported 8/8 passing, but was a **false positive** — those extra calls
happened to give the World globe's async mount extra time to settle before the
race condition could occur, masking the defect rather than proving the fix.
Re-testing with a minimal-overhead script (no such incidental priming) and with
the full matrix (which also has none) surfaced the true, still-failing result,
which led to the correct diagnosis and fix attempt 3.

---

## 7. Earth-freeze result

Full detail: `V20-2-1-EARTH-FREEZE-MANIFEST.json`. Content-addressed
extraction/hashing of all Earth-subsystem code regions (`lhmzEarthView*`
groups, all continent path `d` attributes, all `lhmzGlow*` filters,
`globeSequenceProgress` init/factors, all `toAsiaPacific`/`toAmericas`/`emph*`
`bell()` windows, all Earth opacity/glow-drive constants, the eye region-gaze
formula, the v19.1 arrival formulas) — **65/65 keys identical**,
`combined_sha256` matches exactly between V20.2 and V20.2.1:

```
0b8f68c6ec69c965ba5d95587f6d2f1d6e9723e905f561f62f98dcca85cb688a
```

Verdict: **EARTH_SUBSYSTEM_BYTE_IDENTICAL**.

The source V20.2 file itself is also confirmed byte-unchanged on disk
throughout this correction (`sha256sum` re-checked after every rebuild):
`1a739de1212b42296571a19ef05d7e961654a5827b43527dd308e0cee18f89d2`.

---

## 8. Console / page errors

Across all 12 Playwright sessions in the full matrix (66 collected error
entries), every single one is one of two pre-existing, benign, environment-only
entries repeated per-session:

- `X-Frame-Options may only be set via an HTTP header sent along with a
  document. It may not be set inside <meta>.` — a pre-existing meta-tag
  warning unrelated to this correction.
- `Failed to load resource: net::ERR_CONNECTION_RESET` (×5 per session) — this
  sandboxed test environment has no live network for the file's external
  Google Fonts / preconnect requests; this occurs identically on V20.2 and is
  not caused by, or related to, this correction.

**Zero new console or page errors were introduced by this correction.**

---

## 9. Remaining limitations

- The underlying flex-layout race that caused the original bug was never
  fully root-caused down to a specific browser internal (it is empirically
  tied to the World globe's async mount inside `.login-right` racing the
  swiper's first flex layout commit, but the precise browser-internal trigger
  is not confirmed). The fix does not depend on understanding that trigger —
  it corrects for the *symptom* (wrong position) directly and unconditionally,
  which is why it is robust regardless of the exact cause — but this remains
  an open question about the underlying browser behavior.
- The resize-regression scenario was tested with one wide target size
  (820×1180) and one return-to-mobile size (390×844); other resize deltas were
  not exhaustively tested, though the fix mechanism (measure-and-correct via
  `ResizeObserver`, applied instantly) does not depend on the specific sizes
  involved.
- This correction did not attempt to eliminate the underlying flex-placement
  race itself (e.g. by restructuring the swiper to not use flex, or by
  sequencing the World globe's mount differently) — it corrects for it
  reactively and deterministically at every point that matters (initial
  `goTo()`, resize, transition-end), which fully satisfies this task's
  required behavior, but a future investigation could still pursue eliminating
  the race's root trigger for its own sake.

---

## 10. Verdict

**V20_2_1_READY_FOR_INDEPENDENT_AUDIT**

Every repeated English run (5 independent first-open/desktop runs + 2
reopen runs + 1 resize-regression run, 29 checkpoints) is centered from
transition completion through final hold; the Arabic regression (2 runs, 6
checkpoints) remains correct; and the V20.2 Earth subsystem is proven
byte-identical (65/65 manifest keys, matching `combined_sha256`).

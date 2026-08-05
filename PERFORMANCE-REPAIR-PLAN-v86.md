# Performance Repair Plan — Problem v86 Dark Only

Source for all four repairs: `PERFORMANCE-INVENTORY-v86.json` records `brand-reveal`,
`duplicate-skipintro-declaration`, `devtools-detector`, `hero-principles-legacy-carousel`.
No other record requires a code change — the remaining 17 records are `SAFE` as built.

General rule followed for every edit below: smallest anchored change, no regeneration of
surrounding code, preserve all visual timing/behavior exactly, only add/close a
cancellation path. No route, copy, language, or default-experience behavior changes.

---

## Repair 1 — BrandReveal RAF loop has no visibility/route gate

**Root cause:** `loop()` (inside `const BrandReveal=(function(){...})()`, ~line 18917)
only checks its own `_alive` flag, never `document.hidden`. The cinematic is bounded by
its own 6.6s `TOTAL` timer, so this is not an infinite leak, but it violates 1=1 for up
to 6.6s if the tab is backgrounded or the app force-navigates away from `#pageIntro`
mid-cinematic, since nothing external calls `BrandReveal.skip()` on those transitions.

**Anchor:** lines 18917-18928 (`function loop(ts){...}`), plus a new module-level
`visibilitychange` listener added right after the returned API object (~line 18954).

**Before:** `loop()` reschedules itself via `requestAnimationFrame` purely based on
`_alive` and elapsed time, with no way to be told "the tab/route is no longer visible."

**After:** `loop()` also finishes immediately if `document.hidden` is true (same
`_finish()` path already used for normal completion and for `skip()`), and a
`visibilitychange` listener calls `_finish()` if the cinematic is still `_alive` when the
tab is hidden. No change to the on-screen animation while visible.

**Compatibility risk:** Very low. `_finish()` is the same idempotent completion path
already exercised at end-of-animation and by `skip()`; adding one more caller of an
existing, already-guarded (`if(_finishing)return`) function does not introduce a new
code path, only a new trigger for an existing one.

**Rollback:** revert the two added blocks (one `if` line inside `loop()`, one
`document.addEventListener('visibilitychange', ...)` block after the IIFE).

**Acceptance check:** open `#pageIntro`, trigger `openProblemFromIntro()` to start the
cinematic, then switch tabs (or set `document.hidden` via devtools) before it finishes;
confirm via `PhaseAValidation.snapshot()`/manual inspection that no further
`requestAnimationFrame` callback fires for `BrandReveal` after the tab is hidden.

---

## Repair 2 — Duplicate `skipIntro()` declaration (dead code + broken cleanup)

**Root cause:** `function skipIntro(){...}` is declared twice at the same top-level
scope: lines 18958-18980 and lines 19023-19038. JavaScript function-declaration
hoisting means only the second (later) declaration is ever reachable as `skipIntro()`;
the first is permanently dead. The first is also the *only* code in the file that
attempts `BrandReveal.stop()` / `BrandReveal._timers.forEach(clearTimeout)` — both of
which are no-ops anyway since `BrandReveal`'s public API is only `{play, skip}` (no
`stop`, no `_timers`). Net effect: the live `skipIntro()` never stops `BrandReveal`.

**Anchor:** delete the first declaration, lines 18958-18980. Add one `BrandReveal.skip()`
call to the surviving declaration (originally lines 19023-19038, `stopIntroClock()` call
site) so the cleanup intent is preserved with the API that actually exists.

**Before:** two `skipIntro` functions; the first (dead) tries a nonexistent
`BrandReveal.stop()`; the second (live) never touches `BrandReveal`.

**After:** one `skipIntro()` function that stops the intro clock, calls
`BrandReveal.skip()` if the cinematic is active (reusing the real public API from
Repair 1's file, already used correctly elsewhere by `skipIntroReveal()`), then proceeds
exactly as the surviving version did.

**Compatibility risk:** Low. Removes unreachable code and calls an existing, already
publicly-exposed, idempotent method (`skip()` internally calls the same `_finish()` as
normal completion). No change to any reachable behavior other than closing the gap left
by Repair 1 one route earlier (explicit skip, not just tab-hidden).

**Rollback:** restore the deleted block; revert the one added `BrandReveal.skip()` line.

**Acceptance check:** `grep -c "function skipIntro"` on the repaired file returns 1, not
2. Trigger the cinematic, call `skipIntro()` (not `skipIntroReveal()`) mid-animation,
confirm the `requestAnimationFrame` loop stops immediately rather than continuing to
`TOTAL`.

---

## Repair 3 — `window._devToolsInterval` never pauses on hidden tab

**Root cause:** the devtools-detection IIFE (~line 36168) starts a `setInterval` at load
and never clears it; the callback body skips its work when `document.hidden` but the
timer itself keeps firing every 2000ms in the background indefinitely. Cost per tick is
negligible (two property reads + a compare), but it does not meet the literal 1=1
standard, and every other periodic module in this file (`startIntroClock`/
`stopIntroClock`, the watch/circle tickers, `insight-cards`) already uses the
clear-on-hidden/restart-on-visible idiom — this module is the one outlier.

**Anchor:** lines 36168-36186 (the whole IIFE).

**Before:** one unconditional `setInterval`, no `clearInterval` anywhere in the module.

**After:** wrap the existing interval body unchanged; add a `visibilitychange` listener
that clears `window._devToolsInterval` when hidden and recreates it (same 2000ms
callback) when visible again — the exact pattern already used by
`startIntroClock`/`stopIntroClock`.

**Compatibility risk:** Very low. The detector is purely informational
(`console.log`-only, explicitly commented "NOT a real security measure"); pausing it
while the tab is hidden cannot change any user-visible behavior or the detection
outcome once the tab is visible again.

**Rollback:** revert to the single unconditional `setInterval`, remove the
`visibilitychange` listener.

**Acceptance check:** hide the tab (or set `document.hidden` in devtools), confirm
`window._devToolsInterval` becomes falsy; restore visibility, confirm it is
non-falsy again and the detector still logs on outerWidth/innerWidth mismatch.

---

## Repair 4 — Legacy `heroPrinciples` carousel has no self-owned stop path

**Root cause:** the IIFE at lines 21778-21802 starts an unconditional 4s
`setTimeout` → `setInterval(showNext,3500)` chain with no `document.hidden` or
route-active check anywhere in its own code. It is currently harmless only because a
*different*, unrelated script (`insight-cards`, ~line 44759) happens to clear
`window._showNextBootTimer`/`window._showNextInterval` when it initializes — an
implicit, one-directional dependency. If the `#hiPanel` markup that the insight-cards
script requires (`if(!panel) return;`) is ever absent on some page variant while
`.hp-item` elements remain, this module has no fallback stop condition and ticks
forever regardless of route or tab visibility.

**Anchor:** lines 21785-21801 (`showNext()`, and the interval it schedules).

**Before:** `showNext()` unconditionally toggles classes on every call, with no route or
visibility gate; the module relies entirely on an external script to ever call
`clearTimeout`/`clearInterval` on its two module-level globals.

> ### SUPERSEDED — first attempt was incomplete
>
> The originally-applied version of this repair added a `document.hidden` /
> `#pageLanding.active` guard *inside* `showNext()` only. Independent review found
> it did not actually close the leak, and the review was correct on both counts:
>
> 1. **The guard was defeated by the very next line.** The boot callback ran
>    `showNext(); window._showNextInterval = setInterval(showNext,3500);` — so even
>    when `showNext()` early-returned and cleared the timers, the following
>    statement unconditionally created a new interval and re-assigned the global.
>    An interval was therefore created in exactly the ineligible states the guard
>    was supposed to prevent.
> 2. **The `#hiPanel`-absent case was still unbounded.** The guard only tested
>    hidden/route-active. With `#hiPanel` missing while Landing was active and
>    visible, the guard passed through and the 3.5s interval ran forever — which is
>    the precise `failure_scenario` this record was opened for. The first attempt
>    did not fix the defect it claimed to fix.
>
> The corrected repair below replaces it. The earlier `gate_b_c_outcome` text in
> `PERFORMANCE-INVENTORY-v86.json` overstated that attempt and has been corrected.

**After (corrected repair, as delivered):**

1. A single `eligible()` predicate is the one authority on whether this module may
   run: not `document.hidden`, `#pageLanding` present and `.active`, and `#hiPanel`
   present. A single `stop()` clears both owned globals.
2. `showNext()` calls `stop()` and returns when `!eligible()`.
3. **The boot callback re-checks `eligible()` before creating the interval**, and
   creates it only behind an `if(!window._showNextInterval)` guard. This is the fix
   for defect 1 — no interval can be created in an ineligible state.
4. **`#hiPanel` absent ⇒ ineligible**, so the carousel safely no-ops and creates no
   recurring interval. This is the fix for defect 2.
5. The module now stops **at** its lifecycle exit rather than up to one 3.5s tick
   later: a `visibilitychange` listener calls `stop()` when hidden, and a
   `MutationObserver` on `#pageLanding`'s `class` attribute calls `stop()` when the
   route is left — the same idiom the `insight-cards` engine already uses in this
   file.

**Behavior note (stated, not hidden):** on a hypothetical variant where `#hiPanel`
is absent, the principles zone is now static instead of cycling forever. No shipping
page is affected: `#hiPanel` is present in this source, so `insight-cards` hides
`#heroPrinciples` and clears these timers at init exactly as before. Requirement 5
of the review ("preserve intended behavior when `#hiPanel` exists") is met because
that path is unchanged.

**Compatibility risk:** Low. With `#hiPanel` present the boot timer is cleared by
`insight-cards` before it can fire, so the new code never executes on the shipping
page. `MutationObserver` and `visibilitychange` are both already used elsewhere in
this file, so no new platform requirement is introduced.

**Rollback:** restore the original IIFE body (`showNext()` without `eligible()`/
`stop()`, unconditional `setInterval` in the boot callback, no listeners).

**Acceptance check:** (a) with `#hiPanel` present and Landing active, the live
insight-cards interval starts and is cleared on route exit while the legacy carousel
owns no interval; (b) with `#hiPanel` removed before the insight-cards script runs
and Landing active, no 3500ms interval is ever created — before or after navigating
away — and no uncaught error occurs. Both are asserted from wrapped
`setInterval`/`clearInterval` observations in
`test-results/gate-c-runtime-repair4.js`, not from assuming an external cleanup.

---

## Explicitly out of scope for Gate B

No other record from `PERFORMANCE-INVENTORY-v86.json` is touched. In particular:
`talk-status-ticker`, `solve-blink-timer`, `watch-ticker` (confirmed cooperating
correctly through shared guard variables, not duplicated); `HeroLife`/`HeroV1Life`/
`AtmosphereGL`/`GpuEffects`/`EmergencyLow`/FPS-watchdog/`PageLife`/`OffscreenWorkGate`/
`showpage-wrapper-chain`/`PhaseAValidation` (all independently verified `SAFE`, no
change). Reading/Realty/Pricing routes and one-shot `setTimeout` UI micro-interactions
are left as-is (pattern-confirmed non-recurring).

# Thinking Transfer — How to Work on This Codebase
### For: any AI model (Sol / GPT-5.6 / other) picking up work on "Problem — The Maze Eye"
### Purpose: not just rules, but the *reasoning discipline* behind them

This document exists because a list of constraints alone produces an AI that
follows the letter of the rules but misses the spirit — it fixes the first
instance of a bug and declares victory while three more instances of the
same bug sit untouched two thousand lines away. This document is the
difference between "I changed the line you pointed at" and "I made the
thing you asked for actually true, everywhere, and I checked."

Read this once, fully, before opening the HTML file. It's long on purpose.

---

## PART 1 — The Operating Philosophy

### 1.1 The core failure mode this document exists to prevent

The single most common way an AI damages a codebase like this one isn't
writing bad code — it's **declaring something done based on where it
looked, not based on what's actually true.** A model greps once, finds one
match, fixes it, and reports success. Meanwhile the same pattern exists in
four other places because this file is 38,000+ lines and things get
duplicated, copy-pasted, or re-implemented slightly differently across
different features built at different times.

**The rule: "fixed" is not a feeling, it's a search result of zero.**
Before you say something is resolved, re-run the search that would prove
it's still broken. If the count isn't zero, it isn't fixed — it's partially
fixed, and partially fixed things are worse than untouched things because
they create false confidence.

### 1.2 Root cause vs. symptom — trace backwards from *every* call site

When something behaves wrong, the instinct is to patch where you observe
the symptom. Resist that. Ask: **what are ALL the places that could produce
this state?** Then check each one.

**Real example from this project's history:** the person built a "force
this device into tier X for testing" override. The first implementation
set `perf.tier = 'mid'` and called it done. It didn't work — the device
kept dropping back to `low`. The naive fix would be "check the FPS monitor
that's downgrading it." But there were actually **three independent
systems** that could silently override the tier:
1. A live FPS watchdog (one of *two* separate ones — a second, older one
   existed 13,000 lines away from the first, easy to miss)
2. A saved `localStorage.p_fastMode` flag from a *previous, unrelated*
   feature that did an early `return` before the override code even ran
3. The auto-decision logic itself, which ran *after* the override and
   silently overwrote it if not re-applied post-decision

Fixing #1 alone would have looked like a fix (the obvious watchdog stopped
firing) while #2 and #3 kept the bug alive in different circumstances. The
actual fix required: moving the override to execute *before* the earliest
possible early-return, guarding *both* watchdogs, guarding battery/network/
reduced-motion/lite-mode branches, and re-asserting the forced value *after*
the auto-decision block. Six guard points for one feature. That's the
normal amount of tracing this codebase requires — not the exception.

**Practical method:** when you add a flag/override/state that should "win"
against other logic, don't just add the winning write — grep for every
other writer of that same variable/class/localStorage key, and check
whether each one needs a guard. Assume there are more writers than the
one you found first.

### 1.3 Layers hide underneath layers — keep searching after the first find

**Real example:** the person asked to remove a "blue glow" around the hero
eye. The obvious CSS glow was found and removed. The person came back:
"it's still there." A second layer was found — a large SVG `<ellipse>`
with its own radial gradient, sitting underneath the first fix, invisible
in a casual read of the CSS because it lived in the SVG markup, not the
stylesheet. Removed. Person came back again: "still there." A **third**
layer was found — four separate places in `<canvas>`-drawing JavaScript
functions that repainted a blue radial gradient *every animation frame*
(so even after removing static elements, the animation loop kept
redrawing it). A **fourth** layer after that: an entire WebGL engine
(`AtmosphereGL`) rendering volumetric glow particles to its own canvas,
independently of both the CSS and the SVG.

Four independent rendering systems were all contributing to what looked,
to the human eye, like "one blue glow." None of them were the "real" one —
they were all real, simultaneously. The lesson: **when a person says
"it's still there" after your fix, do not assume they're wrong or seeing
a cache issue as your first hypothesis.** Assume there is another layer
you haven't found yet, and go looking with fresh search terms (don't
re-run the same grep — think about what *other kind* of technology could
produce the same visual effect: CSS? SVG? Canvas 2D? WebGL? inline style?
a JS-injected class?).

**Practical method:** for any "make this visual thing go away" request,
check systematically across: (a) CSS rules/gradients, (b) inline SVG
elements and their `<defs>` gradients, (c) `<canvas>` 2D drawing calls in
JS (grep for `createRadialGradient`, `createLinearGradient`), (d) WebGL/
shader code, (e) inline `style=` attributes written by JS at runtime. Only
report "removed" after checking all five categories return zero matches
for the color/pattern in question.

### 1.4 Distinguish what the person is pointing at from what's nearby

When the person circles something in a screenshot or describes a
location, don't assume the first suspicious-looking element in that
region is the one they mean. In this project, a request to remove "the
milky/blue thing around the eye" and a later, separate request to remove
"the card under the globe on the World page" both required first
confirming — by finding the actual source in code — that the visual
element in the screenshot corresponded to the code being changed, rather
than assuming based on approximate screen position. Two visually similar
glows (`heroGlow` white ellipse vs. `hAura` cyan ellipse vs. WebGL glow)
were genuinely different systems with different intended fates — one was
supposed to survive (the moonlit-white ambient glow, core to the palette)
and the others were supposed to die (the blue variants). Conflating "a
glow" with "the specific glow that's blue" caused a real regression
(the person's moonlight glow got removed by mistake alongside the blue
one) that had to be corrected in a follow-up round. **When a fix removes
more than one thing, separate "confirmed unwanted" from "removed because
it was in the neighborhood" — the second category is a guess, say so.**

### 1.5 The "1 = 1" principle (the person's own framing, take it literally)

The person has articulated a specific requirement across this project:
when a user is on screen A, only screen A's logic should be running — not
screen A's logic *plus* leftover logic from screen B they visited earlier.
This isn't a vague performance nicety; treat it as a strict invariant:

- Every recurring background task (`setInterval`, `requestAnimationFrame`
  loop, `IntersectionObserver`, WebGL render loop) must have a clearly
  paired stop condition.
- If you introduce a new one, it must register with the existing
  `PageLife` manager (see the technical brief) rather than being a
  freestanding `setInterval` — freestanding timers are exactly how the
  original `_watchTsTimer` leak happened.
- "It's paused/hidden so it doesn't visually matter" is not sufficient —
  if it's still consuming CPU/battery/GPU while not visible, it violates
  1=1. Check `document.hidden` and page-active state, not just `opacity`.

### 1.6 Verification is not optional, and it is not a single check

For every change, the minimum verification loop is:
1. **Before editing:** confirm your understanding of the current behavior
   with a grep/read — don't edit based on a description alone if the
   actual code is available to read.
2. **After editing:** re-run the search that defines "the bug" and confirm
   the count is now what you expect (usually zero, sometimes "exactly the
   N intentional ones").
3. **Syntax-check** any JavaScript block you touched in isolation
   (`node --check` on the extracted script content) — a single misplaced
   brace 30,000 lines into a file is invisible by eye and fatal at runtime.
4. **Check callers.** If you changed a function's behavior, contract, or
   removed an object/element, grep for every place that calls or
   references it and confirm none of them now call into a void.
5. **Rebuild both artifacts** (readable dev version + minified prod
   version) so they never drift out of sync with each other.

Skipping any one of these five steps is how confident-sounding, wrong
answers get shipped. All five, every time, no exceptions for "this looks
like a small change."

### 1.7 Own mistakes plainly; don't perform regret

If a fix was wrong or incomplete, say what was missed and correct it. One
clear sentence of acknowledgment, then the correction — not paragraphs of
apology, not defensiveness, not silently redefining what was originally
asked to make the earlier answer retroactively correct. The person is
trusting this file to a process, not to an ego.

---

## PART 2 — The concrete workflow loop

For every task handed to you on this file, run this loop:

1. **Read the actual current code** at the relevant location(s) — do not
   rely on a summary, a screenshot description, or your memory of a
   similar-looking codebase. This file has a lot of near-duplicate
   patterns (multiple hero-visual variants, multiple timer systems) that
   are easy to conflate if you don't check the specific one in front of you.
2. **Search broadly before editing.** Use several different search angles
   for the same target (see 1.3) rather than trusting the first match.
3. **Form a precise, minimal edit.** Prefer surgical, uniquely-matched
   string replacements over regenerating whole blocks. A large rewrite of
   a 38,000-line file is where new, unrelated bugs get introduced.
4. **Apply the edit.**
5. **Immediately verify:** re-search for the old pattern (should be gone
   or reduced to the exact expected count) and search for anything that
   might now be broken as a side effect (orphaned references, unmatched
   braces, a class removed while still referenced elsewhere in CSS/JS).
6. **Syntax-check the touched script block(s).**
7. **Rebuild dev + prod, bump the version marker in `<title>`** so the
   person testing on a real phone can distinguish "loaded the new build"
   from "loaded a stale download" — this codebase's real-world testing
   loop is a phone with an accumulating Downloads folder, and version
   drift there has caused real confusion before.
8. **Report:** what changed, why (root cause, not just symptom), what you
   verified, and — critically — flag anything adjacent you noticed but
   did NOT change, so the person can decide on it explicitly rather than
   have it silently altered or silently ignored.

---

## PART 3 — Communication style expected back to the person

- Egyptian Arabic dialect, direct, no filler preamble.
- Lead with the answer / the fix, not a restatement of the question.
- When reporting a fix, cite concrete evidence (line context, counts
  before/after, "node --check: OK") rather than confident-sounding
  assertions with no evidence attached.
- When something is ambiguous, make the most reasonable assumption, state
  it in one line, and proceed — don't stall the whole task on a
  clarifying question unless proceeding would genuinely go in a wrong
  direction.
- Never claim a visual/behavioral fix is complete without having actually
  traced it in the code per Part 1. "This should work now" based on
  pattern-matching alone is not an acceptable substitute for verification.

---

## PART 4 — Technical constraints (hard rules, non-negotiable)

- **No `:has()`** anywhere in CSS — unsupported on the target old Android/
  WebKit browsers. Mirror parent-reacts-to-child-state needs via an
  explicit JS-toggled class instead.
- **No `inset: 0`** — always the explicit four-sided
  `top:0;right:0;bottom:0;left:0`.
- Keep **`transform-box: fill-box`** wherever it exists for SVG rotation —
  don't "clean it up" away.
- **Single HTML file** — no splitting into separate .js/.css files.
- **RTL Arabic** is the primary direction; don't introduce LTR-only
  assumptions in new UI.
- SVG gradient colors are intentionally hardcoded `rgba()` (a prior fix
  for a real mobile rendering bug) — don't refactor to CSS custom
  properties inside `<defs>` without testing on an actual low-end Android
  device first.
- The glow/aura color family across the whole hero system is **moonlight
  white / ice-gray** (`rgba(232,242,255,...)` family) — **not blue/cyan**.
  This was a deliberate, hard-won correction after multiple rounds of
  finding and removing blue variants (see 1.3). If you touch any glow
  code, keep it in the white/ice-gray family.

---

## PART 5 — System map (what already exists — don't duplicate or fight it)

### PageLife
```js
window.PageLife = {
  register(name, {pages:[...], start(){...}, stop(){...}}),
  syncTo(pageName),   // called from showPage(p) — stops non-matching tasks, starts matching ones
  stopAll()
}
```
Any new page-scoped recurring task registers here. `visibilitychange`
already stops everything when the tab is hidden and resumes only the
current page's tasks when it returns.

### Perf Tier system
- `perf.tier` ∈ `{high, mid, low}`. Auto-decided at load from battery/
  reduced-motion/network, then a live FPS monitor can only downgrade it
  further (never auto-upgrades).
- `perf.tierForced` (boolean) — when true, every degrade path (there are
  currently ~7 guarded sites: two independent FPS watchdogs, battery,
  network 2G/3G, reduced-motion, saved `p_liteMode`, saved `p_fastMode`)
  must no-op. If you add an 8th degrade path, guard it the same way or
  the manual test override silently breaks.
- CSS hooks: `.tier-high`, `.tier-mid`, `.tier-low` on `<html>`.

### Tier Tester panel
- In-app hidden panel (`#tierTester`), opened by 7 rapid taps anywhere
  (<450ms between taps), closed only by its explicit **✕** button (not by
  tapping outside — this was a deliberate UX change from an earlier
  version so the person can freely interact with the app while the panel
  stays open for comparison).
- Buttons write `localStorage.p_tierForce` (`high`/`mid`/`low`) or clear it
  (`auto`), then reload.

### AtmosphereGL
- WebGL hero-glow engine, canvas `#heroAtmoGL`, sits behind `#heroEyeSvg`.
- Self-gates off on tier-low / reduced-motion / no-WebGL / save-data /
  tab-hidden / hero-scrolled-out-of-view.
- Color uniforms are moonlight white / ice-gray (see Part 4) — do not
  reintroduce blue.

### Origin Resonance panel (disabled, intentionally)
- Object `LPOriginResonance` (~line 30647) still exists in full but
  `.install()` is commented out, and CSS forces `display:none` across all
  tiers. This was a "N people from your region mapped their mazes here"
  panel on the World/Sign-in page, removed by explicit request. Leave
  disabled; the runtime hooks (`watchGlobe`, `startLiveCounter`) already
  have null-guards so nothing errors while it's off.

---

## PART 6 — Anti-patterns (things that look like a fix but aren't)

- ❌ Finding one instance of a pattern, fixing it, and reporting "done"
  without searching for other instances.
- ❌ Trusting a code comment or variable name over the actual executed
  logic (comments drift out of sync with code over 100+ iterations of a
  fast-moving project — verify behavior, not documentation).
- ❌ Adding a new `setInterval`/`requestAnimationFrame` loop without a
  paired stop condition and without registering it with `PageLife`.
- ❌ Removing an element/class without grepping for every CSS rule and JS
  reference to it first (orphaned selectors are harmless; orphaned JS
  calls to `null` are not).
- ❌ Editing the minified prod file directly instead of the dev file +
  rebuilding.
- ❌ Assuming "the person said it's still broken" means they're
  misremembering or hitting a cache — the far more common explanation in
  this project's history has been a genuinely separate underlying layer.
- ❌ Silently expanding the scope of a fix (removing something adjacent
  "because it looked related") without flagging that assumption
  explicitly to the person.

---

## PART 7 — Final handoff checklist (copy this into your own final reply)

- [ ] Read the actual current code at the target location before editing
- [ ] Searched for the pattern from at least 2 different angles
      (naming variants, different technology layers per 1.3)
- [ ] Made a minimal, uniquely-matched edit
- [ ] Re-verified the count/absence after editing
- [ ] Checked all call-sites / references to anything removed or renamed
- [ ] `node --check` passed on every touched script block
- [ ] Rebuilt both dev and minified prod builds
- [ ] Bumped the version marker in `<title>`
- [ ] Reported: what changed, root cause, what was verified, and anything
      adjacent noticed but intentionally left untouched

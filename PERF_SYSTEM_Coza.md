# Coza — Performance/Tier System Reference

Companion to `HANDOFF_Coza_3.md`. Read that first for general project context.
This file documents ONLY the performance-tiering architecture — read this
before touching anything related to tier-low/tier-mid, animations, or Lite Mode.

---

## The 4 layers (each one running on top of the last)

### 1. Detection — runs once, at load
- **Manual override:** `localStorage.p_fastMode === '1'` — if set, skips all
  heuristics below and forces `tier-low` immediately.
- **Hardware heuristics:** `navigator.hardwareConcurrency` (cores),
  `navigator.deviceMemory` (RAM, often under-reported by the browser for
  privacy — a real device can report lower than its actual spec), screen
  width, and an "old browser" check (missing `IntersectionObserver` or
  `ResizeObserver` = treated as an old device).
- **Network detection:** `navigator.connection.effectiveType` (flags
  `slow-2g`/`2g`/`3g`) and `saveData` mode.
- **Named special case:** `isWeakOcta` — mobile + exactly 8 cores + RAM ≤4GB.
  Comment in the code names this after the Helio G35 (all-efficiency-core
  octa chip). **This is the most likely reason a normal-looking modern phone
  gets classified `tier-low`** — 8-core/4GB-RAM is common on mainstream
  mid-range Android, not just "weak" devices.

### 2. Static classification — 3 tiers
- `tier-high`: desktop or strong mobile (default, no other condition matched)
- `tier-mid`: mobile with ≤4 cores OR ≤4GB RAM OR small screen (43 CSS rules
  scoped to it)
- `tier-low`: any hardware/network condition above (172 CSS rules scoped to
  it, before this session's simplification attempt — see "What happened"
  below)

### 3. Runtime correction — self-corrects after load, using REAL measurement
- At 5s: measures actual FPS over 30 frames. `<30fps` and currently `high` →
  downgrades to `mid`. `<20fps` and currently `mid` → downgrades to `low`.
  (5s delay is deliberate — an earlier v1 measured at 2s and got false
  positives from devices still parsing the ~2MB HTML.)
- Watchdog starting at 8s: tracks frame times continuously; if 40 of the
  last 60 frames were slow (>55ms) while already `tier-low` → triggers
  **Lite Mode**.
- FPS <10 also triggers Lite Mode directly.
- **Lite Mode is the nuclear option**: closes the main landing page entirely
  and switches to a separate, much simpler `#pageLite` page. Not a CSS
  tweak — a full page swap.

### 4. Persistence
- `localStorage.p_liteMode` — if a person landed in Lite Mode before, it's
  restored on next visit without re-measuring anything.
- 18 `IntersectionObserver` usages — sections (e.g. the background globe)
  pause their own `requestAnimationFrame` loops when scrolled off-screen
  (`perf.isVisible`) and resume when back in view.

**In short: this is not one rule. It's a guess (static classification) +
a real measurement that can override the guess (runtime correction) + a
last-resort safety net (Lite Mode) + memory of the last decision
(persistence). Any future perf work needs to respect all 4 layers, not
just add a new CSS rule and assume it's the only thing in play.**

---

## What happened this session (so it isn't repeated)

Task: 291 of 327 `infinite` CSS animations had no `tier-low` override at
all — they ran at full cost even on devices already classified `tier-low`.

**First attempt:** `html.tier-low *{animation:none}` — a single blanket
rule, low specificity so the existing 36 tier-low-specific overrides
(which use 2+ classes or `!important`) would naturally win over it.

**Bug this caused:** `animation:none` also killed one-time, non-looping
`forwards`-fill reveal animations — e.g. `.he-inner{opacity:0;
animation:revealE 0.4s 5.5s ease-out forwards}` (the Home hero eye's
inner maze rings, which only *reach* `opacity:1` because the animation's
`forwards` fill-mode holds it there). With the animation removed, these
elements were stuck at their base declared value forever — invisible.
Same problem hit the boot/welcome sequence. This matches the exact bug
pattern already logged in `HANDOFF_Coza_3.md`: **a broad rule silently
overriding something unrelated-looking, downstream.**

**Attempted fix:** switched to the same technique already used by the
existing `.reduced-motion` rule — `animation-duration:0.001s;
animation-iteration-count:1` (not `animation:none`). This lets
`forwards`-fill animations still complete and hold their end state
(just almost instantly), while looping infinite animations still stop
looping. Brace-balance and keyframe-name checks passed.

**User's real objection, after the fix worked:** technically correct,
but *stopping* 291 animations (even safely) trades the site's felt
"presence" for raw performance — a jarring instant vs. a quiet ambient
motion, wrong for this product's calm identity. **Reverted everything —
current file has zero tier-low animation changes. All 291 run at full
cost on all devices again, matching pre-session behavior.**

---

## The plan going forward (for whoever — human or Claude — picks this up)

Don't reach for a blanket stop/kill rule again. The direction agreed on:
**simplify, don't silence.** Each of the 291 should degrade to a slower/
lighter version under `tier-low` (the existing `.tier-low .maze-ring-1{
animation:ringBreathe1 12s ease-in-out infinite}` — a deliberately slower
12s version of a faster base animation — is the reference pattern to
copy, not a global kill switch). That means going through them in
batches, not in one command, and preserving the specific character of
each effect at a lower cost rather than erasing it. No work has started
on this yet — this file exists so that starting point isn't lost.

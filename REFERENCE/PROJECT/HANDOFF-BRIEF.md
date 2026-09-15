# Handoff Brief — "Problem — The Maze Eye"
**Current version tag:** `v77-MOONLIGHT` (check the `<title>` after any change to confirm you're on the right file)
**File type:** Single-file HTML SPA, RTL Arabic, ~2.25MB dev / ~1.6MB minified prod

Read this fully before touching the code. This project has hard rules and
several custom systems that look like normal code but are load-bearing.
Breaking them silently is the main risk of a new model working on this file.

---

## 1. Hard constraints — never violate these

- **No `:has()`** in CSS, anywhere. Target Android/WebKit versions don't
  support it. If you need "parent reacts to child state," either add an
  explicit class via JS, or mirror the state onto a body/ancestor class.
- **No `inset:0`** in CSS. Always write `top:0;right:0;bottom:0;left:0`.
- **No `transform-box: fill-box`** removal — SVG rotation depends on it
  where used; don't "simplify" it away.
- **Single file.** Everything — HTML, CSS, JS, inline SVG — lives in this
  one file. Don't split into separate .js/.css files.
- **RTL Arabic is primary.** Don't assume LTR when adding new UI.
- **rgba() colors are hardcoded** in SVG gradients on purpose (a past
  constraint from mobile SVG rendering quirks) — don't refactor to CSS vars
  inside SVG `<defs>` without testing on an actual old Android device.

## 2. Systems already built — don't duplicate or fight them

### PageLife (page lifecycle manager)
```js
window.PageLife = { register(name, {pages:[...], start(){}, stop(){}}), syncTo(page), stopAll() }
```
Any new background task tied to a specific page (timers, tickers, live
updates) **must** register here instead of using bare `setInterval`. Rule:
1 = 1 — a task the user isn't looking at must not be running. `showPage(p)`
calls `PageLife.syncTo(p)`; `visibilitychange` stops everything when the
tab is hidden. If you add a new page-scoped interval, register it — don't
hand-roll another leak.

### Perf Tier system (`perf.tier`: high / mid / low)
- Tier starts from device signals (battery, reduced-motion, network) then
  a live FPS monitor can downgrade it further (high→mid→low), never upgrades.
- `perf.tierForced` is a **manual override flag**. When true, ALL auto
  degraders (FPS watchdogs — there are two, ~line 15085 and ~line 27950 —
  battery, network, reduced-motion, saved `p_liteMode`, saved `p_fastMode`)
  must early-return and leave `perf.tier` alone. If you add a new degrader,
  guard it with `if(!perf.tierForced && ...)` or it will silently break the
  test system.
- CSS hooks: `.tier-high`, `.tier-mid`, `.tier-low` classes on `<html>`.

### Tier Tester panel (in-app, no console needed)
- Hidden panel, opened by **7 quick taps** anywhere on screen (<450ms apart).
- Buttons: High / Mid / Low / Auto — write `localStorage.p_tierForce` and
  reload. Auto clears the key.
- Stays open until the **✕** button is tapped (not tap-outside).
- Element id: `#tierTester`. Don't remove — it's the primary way testing
  happens on real devices without a dev console.

### AtmosphereGL (hero WebGL glow engine)
- Canvas `#heroAtmoGL`, sits behind `#heroEyeSvg`.
- Auto-gates off on tier-low / reduced-motion / no-WebGL / save-data.
- Colors were deliberately changed from blue to **pure moonlight**
  (`a:[0.91,0.95,1.0]`, `b:[0.52,0.57,0.64]`) — no blue anywhere in the glow
  system anymore. If you touch glow colors, keep them in the white/ice-gray
  family, not blue/cyan.
- `#heroGlow` (SVG circle, `rgba(232,242,255,...)`) is the companion
  ambient glow — also intentionally moonlight-white, present on all tiers.

### Origin Resonance panel — currently disabled
- Code still exists (`LPOriginResonance` object, ~line 30647) but
  `.install()` is commented out and CSS forces `display:none` on all tiers.
  This was a "X people from your region mapped their mazes here" panel on
  the World/Sign-in page — removed by request. Leave it disabled unless
  told otherwise; don't resurrect it as a side effect of touching that area.

## 3. Known remaining leak (not yet fixed, flagged only)
Nothing outstanding as of v77 — all previously found leaks
(`_watchTsTimer`, unguarded `console.log`s, duplicate IDs, `:has()`/`inset:0`
violations) are fixed. If you find a new one, register it with PageLife
rather than patching it in isolation.

## 4. Workflow expectations for whoever edits this file
- Every JS change must pass `node --check` on the containing `<script>`
  block before being considered done.
- Maintain two builds: a readable **dev** file (comments, formatting) and
  a **minified prod** file (html-minifier-terser: collapse whitespace,
  remove comments, minify JS+CSS). Never hand-edit the prod file directly.
- Bump the version string in `<title>` on any meaningfully-shipped change,
  so the person testing on a phone can visually confirm which build is
  loaded (browsers/downloads folders accumulate stale copies).
- Prefer small, targeted `str_replace`-style edits over regenerating large
  blocks — this file is large and hand-verified; wholesale rewrites are
  where new bugs get introduced.

## 5. What to tell me back
When you (Sol) finish a task, report: what you changed, which constraint
section above (if any) it touches, and whether you ran a syntax check.
That's what gets reviewed before anything is merged into the working copy.

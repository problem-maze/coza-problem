# Coza_3.html — Handoff Summary

Single-file PWA (~35,000 lines: HTML/CSS/JS). Working file: `/root/projects/Coza_3.html`
(copy from `/storage/emulated/0/Download/Coza_29_unified_color.html` if not present).

---

## ✅ COMPLETED IN THIS SESSION

### 1. Hero message (10 languages)
Old commercial copy replaced everywhere — including a hardcoded HTML fallback
that was still showing the old text (`hero-desc` element, ~line 9046).
New line: **"This will clear — when you're ready."** (and translated equivalents)
Key: `data-i18n="hero.desc"` + i18n dictionary entries per language.

### 2. Sign-in page — maze-head illustration (lhmz-*)
- Walls animate to cyan and back (`lhmzWallsLive` keyframe)
- Solve path draws, disappears, redraws in a loop (`lhmzSolveMaster` keyframe,
  merged draw+loop into ONE animation to avoid `forwards` conflicts)
- Eye blinks fully (scaleY to 0) and glances left/right (`lhmzEyeLife` keyframe)
- Root cause of "nothing animates" bug: a static `lic-hold` class in the HTML
  froze all animation until removed via JS — now removed from the static markup.
- tier-low gets simplified versions of all of the above (`.tier-low .lhmz-*` overrides)

### 3. Home page — hero eye annotations synced to the real phase engine
Previously two unrelated systems ran independently (CSS `heAnnCyc` cycle vs.
the `phase1/phase2/phase3` JS engine that drives the "01 ANALYZING" badge) —
this caused random overlaps.
**Fix:** `window.setHeroAnn(n)` helper (search for it, ~line 14740) is now
called directly inside `phase1()`, `phase2()`, and the "solved" point in
`phase3()`, so text is 100% synced to the badge state:
- phase1 (01 ANALYZING) → shows **"YOUR PROBLEM IS TRAPPED"** (`he-ann-2`)
- phase2 (02 TRACING)   → shows **"THIS IS HOW WE SEE"** (`he-ann-1`)
- phase3 solved (04)    → shows **"WE FIND THE ANSWER"** (`he-ann-3`)
- rest state             → all hidden (`setHeroAnn(0)`)
Old CSS `heAnnCyc` animation is disabled via JS (`disableCSS()` in the same block).

Arrow/line design (`he-ann-line-1/2/3`, `he-ann-dot-1/2/3`):
- Straight `<line>` elements (not curves — curves read as "off-brand" vs.
  the rest of the site's geometric style), `stroke-width:1.7`,
  `stroke-dasharray:3,4`, breathing opacity animation `.he-ann-arrow-breathe`
  (`heArrowBreathe` keyframe, 4.5s, opacity 0.32↔0.58).
- Font sizes bumped substantially (SVG viewBox is 900×750, scales to ~0.38
  on mobile — text needs to be ~34px in the SVG to read as ~13px on screen).
- **Known root cause pattern to remember:** `.he-ann-line,.he-ann-dot{display:none}`
  existed in an old mobile media query and silently killed all arrows on phones
  regardless of any other styling — always check for stray `display:none` rules
  before assuming a color/size fix will work.

### 4. 3D flag-sphere country picker (replaces old flat list)
Triggered by `window.lpOpenCountryPicker()` (the WORLD button), closed by
`window.lpClosePicker()`.
- Canvas-rendered fibonacci-sphere of flag emojis, namespaced under `LPS = {...}`
  (search "LPS = {" — isolated state object, drag-rotate via mouse/touch,
  same mechanics as the reference file `problem-living-mind.html`).
- Full-screen overlay (`.lp-cp-overlay`/`.lp-cp-sheet`), NOT a bottom sheet —
  bottom-sheet clipped the sphere.
- **Root cause of "sphere renders off-center/clustered" bug:** the overlay was
  nested inside an ancestor with a CSS transform (the login slider container),
  which breaks `position:fixed` viewport sizing. Fix applied in
  `lpOpenCountryPicker()`: `if(overlay.parentNode !== document.body)
  document.body.appendChild(overlay);` — reparents to `<body>` on every open.
- Bilingual smart search (`lpFilterCountries`, `lpScoreCountry`,
  `AR_COUNTRY_NAMES` alias table + Levenshtein fallback) — type Arabic or
  English, closest match auto-rotates the sphere to face the viewer
  (`window.lpSphereFocus(code)`).
- **Root cause of "Lite Mode randomly triggers after visiting World" bug:**
  the sphere's `requestAnimationFrame` loop (`LPS.raf`) never stopped when
  the picker closed, silently draining FPS in the background until the
  site's auto-Lite-Mode watchdog kicked in elsewhere. Fixed: `lpClosePicker()`
  now does `cancelAnimationFrame(LPS.raf); LPS.raf = null;`, and
  `lpInitSphere()` was restructured so the one-time setup (`LPS.inited`)
  and the loop-restart are decoupled — reopening always restarts `LPS.raf`.

### 5. Center "eye portal" in the country picker
- SVG eye centered in the sphere, text **"CHOOSE ♥"** underneath
  (`#lpCpEyePortal`, heart pulses via `lpCpHeartBeat` keyframe).
- On country confirm (`lpConfirmCountry(c)`): eye blinks 3× (`lpCpEyeWake`
  keyframe, scaleY 1→0.08→1 alternate), "CHOOSE" text fades, sphere dims
  (`.lp-cp-dimming` on `#lpCpSphereWrap`, canvas opacity → 0.25).
- After a **2-second `setTimeout`**, picker closes and the real background
  globe (`window._lpGlobe.selectCountry`) flies to the chosen country.

### 6. Calm-first entrance for the home hero eye
Previously all detail (5 maze rings + the "01/05" analysis badge) appeared
instantly on page load — felt technical/overwhelming for someone arriving
in a stressed state (this is the whole point of the product).
**Fix:** `.eye-calm-intro` class added by default to `#heroEyeSvg`. Rings/badge
start at `opacity:0`. After a 2-second `setTimeout`, the class is removed,
triggering a staggered fade-in (`maze-ring-5` first at 0s delay, up through
`maze-ring-1` at 0.48s, `qa-badge-group` last at 0.65s — inner-to-outer reveal).
`heroPhaseLoop` itself still starts at the original 4s mark, so the full
"analyzing → tracing → solved" story is unaffected — only the very first
visual impression was softened.

### 7. Globe motion refinement
User explicitly rejected a duration-based ease-in-out "flight" system as
feeling different from the site's established motion language — **reverted**.
Current (kept) approach: same continuous lerp as before, but the alpha now
scales smoothly with remaining distance instead of hard-switching between
two fixed values (`0.055` idle vs `0.18` fastSpin):
```js
const lerpAlpha = G.fastSpin
  ? 0.055 + Math.min(0.16, distNow * 0.0032)
  : 0.055;
```
Also richened: ocean-depth gradient (`#twOceanDepth`, now 4 color stops
instead of 3), sun specular highlight (`#twSpecular`, warmer cream tone),
atmosphere glow rings (brighter/thicker outer rings).

### 8. Moonlight-white color unification — IN PROGRESS
Goal: every accent in the product uses ONE color (`--cyan: 232,242,255`),
not per-language-family tinting.
Fixed so far:
- `.lp-lang-family` pill (the "GERMANIC · 3 SISTER LANGUAGES" pill inside
  the Live Demo card) — was using `--famR/G/B` CSS vars that changed per
  family, now hardcoded to `--cyan`.
- Sign-in eye iris gradient (`#lpIrisGrad`) and pupil glow (`#lpPupilGlow`)
  — were using teal tones (`28,72,90` / `80,160,180`), now unified to `--cyan`.

**❌ STILL PENDING — confirmed by user screenshot:** the OTHER "SLAVIC" pill
— the filled/solid one at the TOP of the page (next to "3 LANGUAGES · 7
FAMILIES", above the globe) — still changes color per selected family.
This is a DIFFERENT element from `.lp-lang-family` (which was already fixed).
Grep attempts so far that returned nothing — try these next:
- Search for the literal displayed text pattern first: `"LANGUAGES"` /
  `"FAMILIES"` in the HTML to locate the container, then look at its
  siblings/parent for the actual filled family-name pill.
- Other remaining `--famR/G/B` usages still in the file (not yet located
  to a specific visible element) are around these line ranges — check each:
  - ~7703–7712 (a `.lp-something.active` or `:hover` state, filled pill style)
  - ~7738–7742 (similar filled-state block)
  - ~7949–7953 (glow/shadow block, likely the world-map dot halo)
  - JS: `famRgb` variable, ~20541–20588 — this builds the color for globe
    dot rings/halos per family and is the most likely JS-side source
    feeding the top pill's inline style if it's set via JS rather than CSS.

---

## KEY NAMING CONVENTIONS (for fast searching)
- `lhmz-*` → Sign-in page maze-head SVG illustration
- `he-ann-*` → Home page hero-eye annotation text/arrows (the 3-message cycle)
- `qa-*` → the "01/05 → 02/05..." analysis-stage badge next to the eye
- `LPS.*` / `lp-cp-*` / `lpConfirmCountry` / `lpOpenCountryPicker` →
  the 3D flag-sphere country picker system (all under one `LPS` namespace)
- `G.*` (e.g. `G.cRotY`, `G.rotY`, `G.fastSpin`) → the background world globe
  state object, `selectCountry(code, fromUser)` is its main entry point
- `--cyan` / `--ice` / `--id` → the site's CSS custom-property color system
  (`--cyan` = moonlight white/signature accent, `--ice` = primary text,
  `--id` = secondary/muted text) — defined near line 495

## KNOWN RECURRING BUG PATTERN
Several bugs in this session traced back to the same root-cause shape:
**a rule/state set once, early, that silently overrides everything downstream**
(a stray `display:none` in a mobile media query, a `lic-hold` class frozen in
static HTML, an animation loop never cancelled, an overlay nested inside a
transformed ancestor). When a fix "should" work but visibly doesn't, search
broadly for the element's class/id across the WHOLE file before adding more
inline overrides — the real cause is often somewhere unrelated-looking.

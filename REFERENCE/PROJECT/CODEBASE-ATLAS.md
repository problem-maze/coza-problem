# Codebase Atlas — "Problem — The Maze Eye"
### v77-MOONLIGHT · 38,454 lines · single HTML file
### Purpose: a literal, verified inventory — not a summary, not a description.
Every number below was pulled directly from the file with `grep`/`wc`, not
recalled from memory. If you (Sol) are reading this alongside the HTML, use
it as a fast index — jump to the line, don't re-search from scratch.

---

## 0. Document skeleton

| Region | Lines |
|---|---|
| `<head>` | 4 – 6618 |
| `<body>` | 6619 – end (38454) |
| Total `<style>` blocks | 10 (see §1) |
| Total `<script>` blocks | 19 (see §3) |

---

## 1. All `<style>` blocks (10 total)

| # | Opens | Closes | Approx. size | What it styles |
|---|---|---|---|---|
| 1 | 95 | 6449 | ~6.3K lines | Core app stylesheet — layout, all pages, hero, tiers, RTL |
| 2 | 6454 (`id="rdCss"`) | 6617 | 163 | Reading page (`pageReading`) styles |
| 3 | 7863 | 8839 | 976 | (login/landing area extension) |
| 4 | 8840 | 9287 | 447 | (landing/hero extension) |
| 5 | 10679 | 10693 | 14 | Small inline block near character-scene |
| 6 | 29722 | 29760 | 38 | Brightness/PBrightness widget styles |
| 7 | 29905 | 30347 | 442 | Sign-in / World / Origin Resonance area |
| 8 | 31129 | 32158 | ~1K | Privacy display (`PPrivacyDisplay`) styles |
| 9 | 36402 | 37085 | 683 | Reading/rd + gateway styles |
| 10 | 37803 | 38237 | 434 | Lite page (`pageLite`) styles |

**192 CSS rules** reference `.tier-high` / `.tier-mid` / `.tier-low` across
the whole file — the tier system is not confined to one block, it's woven
throughout. Don't assume tier-related CSS lives in one place.

---

## 2. All pages (`<div id="page...">`)

| Page ID | Line | Notes |
|---|---|---|
| `pageLite` | 6877 | Pure CSS/SVG fallback, zero canvas — for lowest-end devices |
| `pageLoginTemplate` | 7012 | `<template>` — cloned at runtime, not live in DOM by default |
| `pageLogin` | 7004 | Live login page container |
| `pageIntro` | 9292 | Boot/intro splash |
| `pageLanding` | 9397 | Home / hero eye (the main screen in every screenshot so far) |
| `pageSolve` | 10992 | "Solve" — chat-style problem input |
| `pageCircle` | 11202 | Community page |
| `pagePricing` | 11359 | Pricing |
| `pageRealty` | 11564 | (separate side-project page living in the same file) |
| `pageReading` | 11659 | Reading feature |
| `pageTalk` | 11684 | Voice/listening interface |
| `pageWatch` | 12207 | Admin analytics dashboard |
| `pageAdmin` | 12309 | Admin panel |
| `pageGateway` | 35902 | Test/dev gateway screen (`__testGateway`) |

World/Sign-in is a *slide inside* `pageLogin`, not a separate `page*` div —
search `lpWorldSlideIsActive` if you need that specific slide's logic.

---

## 3. All `<script>` blocks (19 total) — line ranges

| # | Opens | Contains (first symbol / purpose) |
|---|---|---|
| 1 | 30 | Anti-flicker dark-mode lock (runs before paint) |
| 2 | 10776 | Small inline helper near character scene |
| 3 | 12637 | **The big one** — ~715KB, ~majority of app logic (i18n, showPage, hero, tiers, PageLife, most page controllers) |
| 4 | 29447 | `applySavedTheme` area |
| 5 | 29775 | `PBrightness` (auto-brightness engine) |
| 6 | 30383 | `LPOriginResonance` + `LPMax` bundle (World/sign-in extras) |
| 7 | 32269 | `PPrivacyDisplay` |
| 8 | 32918 | `HeroLife` core |
| 9 | 32983 | `setHeroVisual` + hero variant switching |
| 10 | 33078 | Canvas-drawn hero visuals (V1 eye draw calls, etc.) |
| 11 | 35874 | small helper |
| 12 | 35943 | small helper |
| 13 | 36059 | `rdLang` (reading page language) |
| 14 | 37111 | small helper |
| 15 | 37148 | small helper |
| 16 | 37265 | `AtmosphereGL` (WebGL hero glow engine) |
| 17 | 37650 | small helper |
| 18 | 38238 | Lite-page controller (`buildLite`, `lTabActivate`, etc.) |
| 19 | (closing script near EOF) | Tier Tester panel (`#tierTester` handler) |

**664** total lines match a function-declaration pattern; **257** are named
top-level `function name(...)` declarations. The rest are inline
arrow/anonymous functions, object methods, and event handlers — a plain
"how many functions" count depends heavily on which of these you mean, so
don't quote a single number without specifying which.

---

## 4. Named engines / objects hung off `window`

These are the addressable "systems" — if a task touches one of these
behaviors, this is where to look first.

| Engine | First set at line | What it does |
|---|---|---|
| `window.perf` | 14866 | Tier decision object (`perf.tier`, `perf.tierForced`, etc.) |
| `window.PageLife` | 17995 | Page lifecycle switchboard (see THINKING-TRANSFER.md §Part 5) |
| `window.HeroLife` | 32992 | Single-active hero-visual-variant manager |
| `window.showPage` | 15016 (reassigned at 16233, 27981, 28151, 28874, 38418) | Page router — **reassigned 6 times** (feature layers wrap it); if you need "everything that happens on page change," you must read all 6 sites, not just the first |
| `window.setNavEyeMotionPaused` | 14553 (reassigned 5 more times: 14830, 15256, 17033, 20489, 20581) | Same pattern — wrapped repeatedly, read all sites |
| `window.PBrightness` | 29700 | `{ applyBrightness, applyProfile, enableAuto, runAutoProfile, toggleMenu }` |
| `window.LPMax` | 31110 | `{ LPSky, LPEmailMirror, LPReturning, LPAccom, LPSubmitRitual, LPOriginResonance }` — sign-in page feature bundle |
| `window.LPOriginResonance` | inside LPMax bundle, object defined ~30647 | **Disabled** — `.install()` commented out, CSS forces hidden (see THINKING-TRANSFER.md) |
| `window.PPrivacyDisplay` | 32285 | Privacy-related display logic |
| `window.AtmosphereGL` | 37305 (placeholder) then 37619 (real object) | WebGL hero glow — colors are moonlight-white, not blue (see Part 4 of THINKING-TRANSFER.md) |
| `window._lpGlobe` | 25935 | World-page 3D/2D globe state object |
| `window._lpQIdx` | 22319 | Sign-in question-index state |
| `window._lpKbViewportState` | 20870 | Keyboard-viewport tracking (mobile keyboard open/close) |
| `window.applyLang` | 13667 (also 36385, 36387) | i18n applier — reassigned/wrapped; a hook exists at ~36310 that intercepts calls to it |
| `window.rdInit` / `rdOpen` / `rdLum` / `rdFont` / `rdRenderIndex` | 36315–36378 | Reading-page (`pageReading`) controller functions |

### Timer/interval-owning globals (all `window._xxxTimer` / `_xxxInterval`)
`_introClockInterval` · `_fpsMeasureInterval` · `_heroRepeatVisit` ·
`_embodyTimer` · `_showNextBootTimer` / `_showNextInterval` ·
`_talkStatusTimer` · `_watchTsTimer` · `_watchToastTimer` · `_circToastTimer` ·
`_devToolsInterval` · `_adminRenderInterval` · `_skyMoodInterval` /
`_skyMoodRaf` · `_lToastTimer`. **All of these should have a matching clear
site** — if you add a new one, register it with `PageLife` instead (see
THINKING-TRANSFER.md; this is exactly the category the `_watchTsTimer` leak
came from before it was fixed).

---

## 5. i18n system

- `I18N_LANGS` array: line 12641
- `I18N` translation object: line 12654
- Applier: `applyLang(code)` at 13667, saved/read via `localStorage.uiLang`
- **Do not** introduce a second translation mechanism for new UI — extend
  the existing `I18N` object with new keys.

---

## 6. Hero visual system (multiple parallel implementations — important)

The hero (the eye on Home/`pageLanding`) has **5 variants**, switchable via
the `v1 ⌄` dropdown in the UI: `hero-v1` through `hero-v5` (all 5 confirmed
present as CSS classes). V1 is the SVG-drawn eye (`#heroEyeSvg`, the one in
every screenshot so far). Some variants are canvas-drawn instead (see
`setHeroVisual` at 32983 and the canvas draw calls starting ~33078).
**This is why the "blue glow" bug in project history took 4 rounds to fully
kill** — SVG (V1) and canvas-drawn variants are separate rendering paths
that can each have their own copy of similar visual effects. When asked to
change "the hero glow/eye/whatever," confirm *which variant* is active
before assuming your fix touches the one the person is looking at.

---

## 7. localStorage key inventory (43 keys, alphabetical)

```
_t · circMyPosts · heroFirstRevealSeen · hero_visual · introSeen ·
p_analytics · p_bookmarks · p_bright_auto · p_bright_mode · p_brightness ·
p_chats · p_convs · p_current · p_draft · p_fastMode · p_font_size ·
p_last_clean · p_liteMode · p_reduced_motion · p_reports · p_tierForce ·
p_total_time · p_version · p_visits · ppIntroSeen · ppPeek · ppTilt ·
problemGeminiKey · problem_mode · problem_sky · pwaDismissed ·
pwaInstalled · rd_prefs · themeManual · uiLang · userEmail ·
userProvider · vh_name · vh_phrase · vp_design · vp_notes
```
Two are directly relevant to testing/perf: `p_tierForce` (Tier Tester
panel) and `p_fastMode` (older, separate "fast mode" toggle — both are
guarded against each other per THINKING-TRANSFER.md §5, Perf Tier system).
`problemGeminiKey` — a raw API-key-shaped localStorage key exists in this
file; if a task involves API integration, check whether this is a
client-exposed secret before assuming it's safe to reference or extend.

---

## 8. Systems documented in more depth elsewhere

These are covered thoroughly in `THINKING-TRANSFER.md` §Part 5 and are not
repeated in full here — this Atlas gives you the line numbers, that
document gives you the reasoning and gotchas:
- **PageLife** (line 17995)
- **Perf Tier system** (`window.perf`, line 14866; ~7 guarded degrade sites)
- **Tier Tester panel** (`#tierTester`, near EOF, script #19 in §3)
- **AtmosphereGL** (line 37265/37619)
- **Origin Resonance** (disabled, inside `LPMax` bundle)

---

## 9. How to use this Atlas

1. Task mentions a page → look it up in §2, jump to that line, read outward.
2. Task mentions "the hero eye" → check §6 first — confirm which variant.
3. Task mentions a timer/leak/performance issue → check §4's timer list
   and §8's PageLife reference before adding a new interval.
4. Task mentions colors/glow → remember §6's warning: multiple rendering
   paths can each hold a copy of the same visual effect.
5. If something isn't in this Atlas, it means it wasn't part of the
   inventory pass that built this document (built once, at v77) — search
   the live file directly rather than assuming absence means it doesn't
   exist. Re-run the relevant `grep` from Part 1 of this doc's construction
   process if precision matters (line numbers shift as the file changes).

**This Atlas will drift out of date the moment the file is edited again.**
Line numbers are a snapshot of v77-MOONLIGHT. If you're working from a
later version, treat line numbers here as "was here as of v77" and
re-verify with a search rather than trusting them blindly.

# Isolated Home Integration Test 01 — Visible Eye (Prototype 05)

This is a **test-only integration**, not a production change. It answers one
question: can the approved Visible Eye (Prototype 05) be embedded inline into
the real Home page, driven by the real Home state, without touching or
risking the production experience? The answer is yes, verified below.

Nothing here is live by default. `Problem-v86-DARK-ONLY.html` (production) was
never written to. `Problem-v86-VISIBLE-EYE-ISOLATED-INTEGRATION-01.html` is a
new copy-derived file; opened with no query flag it behaves exactly like
production. Opened with `?visibleEyeTest=1` it additionally shows the
integrated eye in the real hero slot, bridged to the real Home state.

## Source identity (copy-based safety)

| File | Role | SHA-256 | Bytes | Lines |
|---|---|---|---|---|
| `Problem-v86-DARK-ONLY.html` | production, read-only | `c2b62cc98f1e3d0fa00d3709818f79f9ee73bd568700dcb6b665adef20b0d6b1` | 3,051,238 | 45,690 |
| `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-05.html` | approved source eye, read-only | `2e35daad2024c847eeac14948a898e598a20da1c5c62ccbc2dbe66d99e53b24e` | 38,832 | 648 |
| `Problem-v86-VISIBLE-EYE-ISOLATED-INTEGRATION-01.html` | new deliverable | `b131aefb01166783a0a4e81b579960d5294d3b6ac760989d56cbd97c82090cff` | 3,099,115 | 46,375 |

Both hash/size/line-count pairs for the production file and Prototype 05 are
identical before and after every regeneration of the integration file —
confirmed by re-hashing after this task's final build. Neither read-only
source was ever opened for writing.

Not modified: `Problem-v86-DARK-ONLY.html`, `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-05.html`,
any earlier prototype file, production routing, Journey, the existing dark
eye, `HeroV1Life`. No Prototype 06 was created. No production build was
created.

## How the integration file was built

A copy of production received exactly three surgical insertions (Python
splice with line-anchor `assert`s to guarantee the right spot, verified
against the actual file, not guessed):

1. **Before `</head>`**: `<style id="visibleEyeIntegrationStyle">` — new
   sizing rules plus the complete Prototype 05 CSS (state deltas, roles,
   rings, chamber, core, tension paths, everything) with every class-based
   selector prefixed `#visibleMechanicalEyeIntegrationRoot `. The one
   `html:not(.eye-motion-ok) #eyeAssembly *` reduced-motion rule is left
   unprefixed on purpose — it already scopes through the unique
   `#eyeAssembly` id and must keep targeting the real `<html>` element for
   the reduced-motion guard to work. The `#eyeDebugPanel` rules are also
   left unprefixed — that panel is appended to `document.body` directly by
   Prototype 05's own debug-panel builder, outside the integration root, and
   `#eyeDebugPanel` is a verified-unique id.
2. **Inside `.hero-visual-wrap`, as a sibling after `.hero-vperson`'s closing
   `</div>`**: `<div id="visibleMechanicalEyeIntegrationRoot" class="hero-eye hero-v" aria-hidden="true" data-visible-eye-integration="1">` containing
   Prototype 05's `<svg class="mech-eye">` markup — defs, gradients,
   `#eyeAssembly`, rings, chamber, core, left/right assemblies — copied
   unmodified internally.
3. **Before `</body>`**: `<script id="visibleEyeIntegrationScript">`, a
   single outer IIFE that returns immediately (zero side effects) unless
   `?visibleEyeTest=1` is present in `location.search`. Everything below
   only runs when that flag is present.

## Namespace safety

A full pre-embedding audit of the Home document checked every class, id,
gradient id, CSS custom property, global function name, and debug-control
name used by Prototype 05 against the production document. Result: **zero
collisions** on every identifier checked. The integration root
(`#visibleMechanicalEyeIntegrationRoot`) is a single, newly-chosen id not
reused from Home. All of Prototype 05's internal class selectors are scoped
under that root in the injected stylesheet, so none of them can match or be
matched by any existing Home rule.

Verified post-build with an automated duplicate-id scan of the live DOM
(both with and without the test flag): **0 duplicate element ids** in either
run.

## Home slot placement

The real hero slot is `.hero-visual-wrap` inside `#pageLanding .hero-grid`
(production line 11011). It holds one sibling per Home Experience option —
`#heroJourney` (`.hero-journey`), `.hero-v1-legacy` (the dark eye,
`#heroEyeSvg` inside), `.hero-v2`…`.hero-v6`, `.hero-vperson` — of which
exactly one carries `.active` at a time. Show/hide is entirely CSS-driven by
Home's own existing rule pair, unchanged:

```
.hero-v:not(.active){ display:none!important; opacity:0; pointer-events:none }
.hero-v.active{ display:block; opacity:1 }
```

The integration root was given the same `hero-eye hero-v` classes and
inserted as one more sibling in that same list, so it participates in this
exact mechanism with no new show/hide CSS required.

**Important discovery about this specific production file**:
`Problem-v86-DARK-ONLY.html` contains a deliberate, explicitly-commented
hardcode (`var experience='1'`, "VISUAL PREVIEW ONLY") that boots this file
directly into the legacy dark eye rather than Journey. This is a documented,
intentional property of this file — not something introduced or altered by
this task. The activation logic below does not hardcode either sibling; it
generically finds "whichever `.hero-v` currently has `.active`" and swaps it
out, so it is correct regardless of which experience the page actually boots
into.

## Bug found and fixed during this task

The first build placed the new root **inside** `.hero-vperson` instead of
as a sibling after it — an off-by-one in the line-splice index (inserting
before `.hero-vperson`'s own closing `</div>` rather than after it). Because
`.hero-vperson` is a non-active, `display:none` sibling, everything nested
inside it collapsed to zero rendered geometry regardless of the new root's
own `active` class — confirmed via direct `getBoundingClientRect()`
inspection of the full ancestor chain, which showed the root's *parent* was
`.hero-vperson` rather than `.hero-visual-wrap`. Fixed by moving the splice
index one line later so the root lands as a true sibling inside
`.hero-visual-wrap`. A related, secondary issue was also fixed: `.hero-v.active{display:block}`
(specificity 0,2,0) beats `.hero-eye{display:flex;...}` (0,1,0), so the
integrated eye loses its flex-centering when activated; `margin:0 auto` was
added to the eye's sizing rule to keep it centered as a block element
instead. Both fixes are numeric/structural corrections only — no Prototype
05 geometry, color, or engine code was touched.

## Preserved engines

With the test flag active: Journey (`#heroJourney`) and the legacy dark eye
(`.hero-v1-legacy`, `#heroEyeSvg`) remain fully in the DOM, simply not
`.active` — fully restorable by removing the query flag or by any future
Home Experience switch, exactly like Home's existing mechanism already
handles switching between its own six built-in options. No engine-selection
code, hero lifecycle code, or `HeroV1Life` implementation was modified.

## Real Home state bridge

The bridge is a single `MutationObserver` on `#heroEyeSvg`'s `class`
attribute — the real, authoritative state source Home already mutates via
its own `setHeroQaStage()` — forwarding the current `qa-*` class to
Prototype 05's approved `setVisibleEyeState()` API:

```
qa-watching → watching   qa-searching → searching   qa-found → found
qa-solved   → solved     qa-embodied  → embodied     (none)   → idle
```

No independent autoplay loop, no duplicated phase schedule, no second state
machine. Verified by driving state changes through the real
`window.setHeroQaStage(svg, removeClasses, addClass)` function and reading
back `window.getVisibleEyeState()` — all six states mapped correctly.

## Lifecycle coordination

The engine only activates behind the query flag; the state bridge only
starts observing once, at load. Listeners/observers introduced:

- One `MutationObserver` on `#heroEyeSvg` (attribute filter: `class`).
- One `window.addEventListener('homeexperiencechange', activateInSlot)` to
  re-assert slot ownership if the Home Experience setting changes while the
  test is running.

Both are created exactly once regardless of how many times the page
navigates or the tab visibility toggles — verified below.

## Responsive fit (measured, not estimated)

| Viewport | Host slot (w×h) | Eye assembly (w×h) | Eye % of host (w / h) | Overflow |
|---|---|---|---|---|
| 390×844 | 350 × 201.9 | 321.0 × 179.0 | 91.7% / 88.7% | none |
| 412×915 | 372 × 219.9 | 351.1 × 195.8 | 94.4% / 89.1% | none |
| 768×1024 | 728 × 230 | 368 × 205.3 | 50.5% / 89.2% | none |
| 1440×900 | 700 × 358.9 | 600.4 × 334.9 | 85.8% / 93.3% | none |

At 768px the eye is deliberately capped at `max-width:380px` (matching
production's own responsive pattern for the hero artwork) so it doesn't
stretch oversized across a wide, short tablet slot — hence the lower
width % there; height fill and zero overflow hold at every size. At mobile
(390×844) the entire almond, focus core, left input, and right output are
all visible with no horizontal overflow and no overlap with surrounding
Home text — `.hero-visual-wrap` is the actual measured artwork box here,
not a parent card.

## Visual modes captured

- `VISIBLE-EYE-HOME-INTEGRATION-01-default-no-flag.png` — no flag, unchanged Home.
- `VISIBLE-EYE-HOME-INTEGRATION-01-desktop.png` — `?visibleEyeTest=1`, 1440×900.
- `VISIBLE-EYE-HOME-INTEGRATION-01-mobile-390x844.png` — `?visibleEyeTest=1`, 390×844.
- `VISIBLE-EYE-HOME-INTEGRATION-01-original-vs-integrated.png` — side-by-side, same viewport/scale.
- `VISIBLE-EYE-HOME-INTEGRATION-01-states-strip.png` — all six states, equal scale.
- `VISIBLE-EYE-HOME-INTEGRATION-01-state-{watching,searching,found,solved,embodied,idle}.png` — individual captures.

## Performance, stability, and reduced motion

- Console errors: identical set before and after the flag is toggled, and
  identical to loading vanilla production directly (`X-Frame-Options` meta
  warning + sandboxed external resource loads) — **0 new errors** anywhere.
- Duplicate ids: **0** with or without the flag.
- Page navigation stability (`Home → #pageCircle → Home`, ×3): root stays
  active, exactly **1** observer present throughout, no new console errors.
- Tab visibility toggling (visible → hidden → visible, ×3): root stays
  active, `eye-motion-ok` state stable, no new console errors.
- Reduced motion (`prefers-reduced-motion: reduce`): `eye-motion-ok` is
  correctly absent; a state change applied mid-test still resolves to the
  correct final bridged state (`found`) — transitions stop, meaning holds.

## Acceptance conditions

All 12 conditions from the task spec are met — see
`VISIBLE-EYE-HOME-INTEGRATION-01-VERIFICATION-REPORT.json` for the full
machine-readable evidence backing each one (source identity, integration
identity, duplicate-id count, console-error count, viewport measurements,
state mapping, lifecycle checks, reduced-motion result, production-untouched
result).

## Scope

This delivers Isolated Home Integration Test 01 and its evidence only. No
production integration, no Prototype 06, no change to Journey/dark
eye/routing/storage/HeroV1Life. Next steps (a real production integration
decision) are out of scope for this task.

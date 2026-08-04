V20_READY_FOR_AUDIT

# V19-1 → V20: World-Style Global Future Earth

`Problem-v86-nav-logo-simplified-signin-continuous-hand-19-1-eye-earth-transition-correction.html`
("v19-1") is the approved baseline and was not modified (hash-verified
below). This phase produces
`Problem-v86-nav-logo-simplified-signin-continuous-hand-20-world-style-global-future-earth.html`
("v20"): the Sign-in Future Earth now presents a guided, six-continent
global sequence — Africa → Asia → Australia → Europe → North America →
South America — with a restrained reorientation sweep and a subtle
eye-follows-the-active-region response, entirely inside the existing
`LoginHeadmazeStory` architecture.

## What changed, in one sentence

Two new continents (Asia, Australia) were added to the Earth's continent
group; a new, independently-paced progress key (`globeSequenceProgress`,
following this file's own established pattern for parallel effect
timelines) drives all six continents through a staggered reveal-with-
emphasis sequence in the required order, alongside one smooth rotation
sweep and a small region-following eye nudge — nothing about the
v19.1-approved Eye→Earth arrival transition was touched.

## Design decisions and why

### Why a new, independent progress key instead of reusing `holdT`

The first build reused `holdT` (the same timeline that paces the
v19.1-approved arrival) for the continent sequence, giving it a late window
(`0.66–0.97`). Driving the real sign-in flow and tracing continent opacity
every 250ms showed the problem immediately: all six continents raced from
"just starting" to "fully revealed" in under **1.7 real seconds** — far too
fast to read as a deliberate, guided sequence. The reason: `holdT` is tuned
for a *fast, snappy* arrival (correctly so — that was exactly what v19.1
fixed), and its own asymptotic pacing compresses its tail into a short
real-time window. Reusing it for a *slower, more deliberate* effect fights
its own tuning.

The fix: a new state key, `globeSequenceProgress`, added with its own
`factors` entry in the `'hold'` stage — the exact same pattern this file
already uses for `touchProgress`, `reviveProgress`, `wakeProgress`, etc.
(each of those also has its own independent pace within a shared stage).
This key advances on its own, slower schedule, so the continent sequence
gets the runway it needs without changing anything about how fast the Earth
arrives or how fast the eye first looks at it.

### A second bug this surfaced: `thresholdFor()`

The first `globeSequenceProgress` build (factor `0.01800`, expecting a
~5-second sequence) instead completed in **~2 seconds with a visible jump**
partway through. Root cause, found by reading `thresholdFor(key)`: it
explicitly special-cases `holdProgress` and five sibling keys to a fine
`0.003` settle-threshold, but `globeSequenceProgress` didn't match any of
its explicit checks, so it fell through to the generic default (`0.12`) —
meaning the value snapped to its target once merely 88% of the way there,
producing a discontinuity. Fixed with a one-line addition to the existing
explicit list (the same fix pattern the file already uses for every other
`*Progress` key). Re-traced afterward: a clean, monotonic, ~5.5-second
sequence with no jump — confirmed in the raw opacity trace included in this
report's evidence.

### Continent geometry: Asia and Australia

Measured the existing continents' path data first (Python, sampling each
cubic bezier): Africa/Europe/North America/South America all stay within a
**~47–50 unit** radius from the orb's center. Asia and Australia were
designed to the same scale (~50–52 units) and placed in the remaining open
arc: Asia upper-right (adjacent to Europe, the way Central America already
bridges North/South America in the existing design), Australia lower-right,
separated from Africa's southern tip. Both use the plain
`.lhmz-story-earth-continent` class — no new colors, no new gradients, no
new CSS. Central America, Greenland, Iceland, and British Isles (the
existing "supporting micro-shapes") were left completely untouched and
un-sequenced, per the task's explicit allowance to preserve or reuse them
as-is.

### Guided motion: reorientation, not spin

`holdEarthRotation` sweeps the continents group (`#lhmzEarthSurface`, the
one new `id` this phase adds) from −5° to +5° once, smoothly, across the
whole sequence — confirmed monotonic in the trace (`-5.000 → -4.958 → … →
5.000`, never reversing, never oscillating per continent). This is
"continent emphasis cycle + restrained reorientation," one of the
explicitly allowed hybrid approaches — not continuous spinning, not a
per-continent jitter.

### Eye response: additive, restrained, continuous

Each continent's brief "emphasis" bell is also summed (with small,
hand-picked directional weights per continent, magnitude ≤ ±0.8) into
`eyeGazeX`/`eyeGazeY`, purely as an *addition* on top of the existing,
untouched `holdEarthGaze` base offset. Because every emphasis term is a
smooth `bell()` curve (this file's own existing helper), the sum is
continuous by construction — there is no per-continent discrete jump, so
the eye cannot jitter; it can only drift a little further in whichever
direction the currently-emphasized region already nudges it.

## Real-flow verification (not simulated)

The real sign-in flow was driven end-to-end in Playwright — `showLogin()` →
clicking the actual sign-in dot → the real `STAGES` sequence through to
`'hold'` and the real completion — with continent opacity, rotation, and
stage-completion traced every ~250ms.

Observed sequence (desktop, English), reproduced from the raw trace:

| Continent | Starts differentiating | Fully revealed by |
|---|---|---|
| Africa | ~t+420ms into hold | ~t+1113ms |
| Asia | ~t+674ms | ~t+1752ms |
| Australia | ~t+1113ms | ~t+2386ms |
| Europe | ~t+2005ms | ~t+3379ms |
| North America | ~t+2638ms | ~t+4037ms |
| South America | ~t+3379ms | ~t+4922ms |

Rotation swept smoothly from −5.000° to +5.000° across the same span.
Story marked complete at **t+5535ms** into the hold stage — a calm,
premium pace, not rushed, not a wait. Total real time from clicking sign-in
to a fully-settled globe: ~18 seconds (12.7s reaching hold, unchanged from
v19.1, + 5.5s for the new sequence).

## Console/runtime check

Both the sequence-trace run and the full desktop/Arabic/mobile-EN/mobile-AR
capture run were driven through the complete real flow with
`console.error`/`pageerror` listeners attached throughout. All runs produced
only the identical, pre-existing baseline error set (an X-Frame-Options
meta-tag warning and sandboxed external-resource `ERR_CONNECTION_RESET`
messages — present for any page load in this sandbox, unrelated to this
file). **Zero new errors introduced.**

## Duplicate-ID scan

Static scan of the built v20 file: 767 total `id` attributes, 761 unique,
zero true duplicates (the 6-count discrepancy is JS template-literal
placeholder strings like `${postId}` that also happen to match the `id="…"`
regex — pre-existing in production, confirmed identical in count to prior
phases' scans). `lhmzEarthAsia`, `lhmzEarthAustralia`, `lhmzEarthSurface`
each appear exactly once.

## Mobile readability (390×844)

Both English and Arabic final-hold mobile captures show no horizontal
overflow (`document.documentElement.scrollWidth <= clientWidth`, checked
directly, both `false`). The head/eye and Earth/hand composition sits
above the sign-in form at a legible size in both.

## Scope compliance

| Preserve (per task) | Status |
|---|---|
| Sign-in page layout | Untouched |
| Head placement/geometry | Untouched — 0 lines touched |
| Hand/forearm geometry | Untouched — 0 lines touched |
| Earth scale neighborhood | Untouched — `FUTURE_EARTH_RIG`, `orbScale`'s final-value formula, and the arrival bezier's endpoints are all byte-identical to v19.1 |
| Navigation | Untouched |
| Login form structure | Untouched |
| Translations/RTL | Untouched — confirmed via matched English/Arabic final-hold captures |
| World page system | Untouched |
| v19-1 file | Untouched — SHA-256 confirmed identical before and after |

| Not allowed (per task) | Status |
|---|---|
| Redesign the entire Sign-in scene | Not done |
| Redesign the head | Not done |
| Redesign the hand | Not done |
| Move the whole composition to a new layout | Not done |
| Flashy/noisy effects | Not done — one smooth rotation sweep, opacity-only continent reveals |
| Heavy new systems | Not done — one new parallel progress key, reusing the exact existing `STAGES`/`stepStage`/`settledPhase`/`smootherWindow`/`bell`/`cubicValue` machinery |
| Overwrite v19-1 | Not done |

## Success criteria checklist

- Earth feels more globally complete: **yes** — 6 continents populate the
  visible disc instead of 3, with the previously-static Europe now part of
  the sequence too.
- Asia and Australia meaningfully integrated: **yes** — new geometry, sized
  to match the existing continents' scale, sequenced like the rest.
- Continent presentation sequence is readable: **yes** — confirmed via the
  real-flow opacity trace and the sequence screenshots/board (each
  continent gets a distinct ~600–1300ms window before the next begins).
- Required order honored: **yes** — Africa → Asia → Australia → Europe →
  North America → South America, confirmed in the trace.
- Eye response visible but restrained: **yes** — additive, continuous,
  magnitude-capped nudge on top of the unchanged base gaze; no discrete
  jumps possible by construction (built from smooth `bell()` sums).
- Motion guided and intelligent: **yes** — one monotonic −5°→+5° sweep,
  confirmed non-oscillating in the trace; no continuous spin.
- Final hold calm and premium: **yes** — see `V20-FINAL-HOLD-ENGLISH.png` /
  `V20-FINAL-HOLD-ARABIC.png`.
- Sign-in composition remains elegant: **yes** — layout/typography/nav/form
  untouched.
- English and Arabic mobile views valid: **yes** — both captured, no
  horizontal overflow in either.
- No unrelated frozen scope damaged: **yes** — the full diff (see
  `V19-1-to-V20-diff-report.md`) touches only the continents group, the
  state-key definitions, and the `'hold'`-stage block of `render()`.

## File identity

| File | Role | SHA-256 | Bytes | Lines |
|---|---|---|---|---|
| `Problem-v86-nav-logo-simplified-signin-continuous-hand-19-1-eye-earth-transition-correction.html` | baseline, read-only | `809754b2008fd918a04a3b8e510ce8e7e2121291c762271d20c43469e4d429a7` | 3,054,539 | 45,732 |
| `Problem-v86-nav-logo-simplified-signin-continuous-hand-20-world-style-global-future-earth.html` | this phase | `cdb1cec63f1b085f7908b947ecc9a12773b01031cc0ad57b96a34c95d38a8894` | 3,058,096 | 45,784 |

v19-1's hash/size/line-count were confirmed identical before and after
building v20.

## Deliverables

1. `Problem-v86-nav-logo-simplified-signin-continuous-hand-20-world-style-global-future-earth.html`
2. `V20-WORLD-STYLE-GLOBAL-FUTURE-EARTH-REPORT.md` (this file)
3. `V19-1-to-V20-diff-report.md`
4. `V20-FINAL-HOLD-ENGLISH.png`, `V20-FINAL-HOLD-ARABIC.png`,
   `V20-sequence-africa.png`, `V20-sequence-asia.png`,
   `V20-sequence-australia.png`, `V20-sequence-europe.png`,
   `V20-sequence-north-america.png`, `V20-sequence-south-america.png`,
   `V20-EARTH-SEQUENCE-BOARD.png` (enlarged, equal-scale board of all 6),
   `V20-MOBILE-390x844-ENGLISH.png`, `V20-MOBILE-390x844-ARABIC.png`

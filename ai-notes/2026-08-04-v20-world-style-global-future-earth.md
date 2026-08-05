# V20: World-Style Global Future Earth

Continues the sign-in "hand/head/eye/Earth" story lineage
(`LoginHeadmazeStory`) from v19 and its v19-1 transition correction (see the
same-dated notes for those). Supersedes nothing — v19-1 remains untouched
and byte-identical.

## Task

Transform the Sign-in Future Earth from a local interaction foundation
(v19-1: Earth arrives, eye acknowledges it) into a World-style global
experience: add a guided six-continent reveal sequence in a specific order
(Africa → Asia → Australia → Europe → North America → South America), add
the two missing continents (Asia, Australia) with simplified geometry
matching the existing style, add a restrained guided rotation/reorientation,
and make the eye subtly follow whichever region is currently emphasized —
all while staying inside the existing `LoginHeadmazeStory` architecture and
without touching v19-1, the head, the hand, or the Earth's final scale.

## What was done

1. Measured the existing continents' path geometry (Python, sampling each
   cubic bezier) to find their shared scale (~47–50 unit max radius from
   the orb's center) before designing Asia and Australia to match.
2. First attempt reused the existing `holdT` timeline (the one that paces
   v19.1's approved arrival) for the new continent sequence. Driving the
   real sign-in flow and tracing continent opacity every 250ms exposed the
   problem immediately: all 6 continents compressed into under 1.7 real
   seconds — unreadable as a guided sequence, because `holdT`'s own tuning
   (correctly snappy for arrival) fights a slower, more deliberate reveal.
3. Fixed by adding a new, independent state key
   (`globeSequenceProgress`) — the same parallel-progress-key pattern this
   file already uses for `touchProgress`/`reviveProgress`/`wakeProgress`/etc.
   — giving the continent sequence its own pace, completely decoupled from
   the untouched arrival timing.
4. That surfaced a second, subtler bug: the new key didn't match any of the
   explicit cases in `thresholdFor()`, so it fell through to the generic
   default threshold (0.12) instead of the 0.003 used by every sibling
   `*Progress` key, snapping to completion early with a visible jump
   (confirmed: an intermediate build settled in ~2s with a discontinuity).
   Fixed with a one-line addition to the existing explicit list.
5. Re-traced after both fixes: a clean, monotonic ~5.5-second sequence,
   each continent getting a distinct window, in the exact required order,
   with a rotation sweep confirmed monotonic (−5.000° → 5.000°, never
   reversing) across the same span.
6. Added a small, additive eye-gaze nudge toward whichever region is
   currently emphasized, built entirely from sums of the same smooth
   `bell()` curves already driving the continents — continuous by
   construction, so it cannot jitter or jump.
7. Verified via the real flow end-to-end (English desktop, Arabic desktop,
   English mobile 390×844, Arabic mobile 390×844): 0 new console/page
   errors, 0 duplicate ids, no horizontal overflow on either mobile
   capture, v19-1 hash unchanged throughout.

## Result

- v19-1 hash/size/line-count confirmed unchanged before and after:
  `809754b2008fd918a04a3b8e510ce8e7e2121291c762271d20c43469e4d429a7`,
  3,054,539 bytes, 45,732 lines.
- v20: `cdb1cec63f1b085f7908b947ecc9a12773b01031cc0ad57b96a34c95d38a8894`,
  3,058,096 bytes, 45,784 lines.
- Continent sequence confirmed via real-flow trace: Africa first (full by
  ~1.1s into hold), then Asia (~1.75s), Australia (~2.4s), Europe (~3.4s),
  North America (~4.0s), South America (~4.9s), story complete at ~5.5s —
  exactly the required order, at a calm, deliberate pace.
- 0 new console/page errors across every real-flow run.
- 0 duplicate ids in the built file.
- No horizontal overflow on English or Arabic mobile (390×844).
- Head, hand, `FUTURE_EARTH_RIG`, the arrival transition's exact formulas,
  navigation, the login form, and the World system are all untouched — the
  entire diff (see the diff report) touches only the continents group, the
  new independent progress key's plumbing, and the `'hold'`-stage block of
  `render()`.

## Deliverables

`Problem-v86-nav-logo-simplified-signin-continuous-hand-20-world-style-global-future-earth.html`,
`V20-WORLD-STYLE-GLOBAL-FUTURE-EARTH-REPORT.md`,
`V19-1-to-V20-diff-report.md`,
`V20-FINAL-HOLD-ENGLISH.png`, `V20-FINAL-HOLD-ARABIC.png`,
`V20-sequence-{africa,asia,australia,europe,north-america,south-america}.png`,
`V20-EARTH-SEQUENCE-BOARD.png`,
`V20-MOBILE-390x844-{ENGLISH,ARABIC}.png`.

## Scope note

Verdict: `V20_READY_FOR_AUDIT`. No redesign of the Sign-in scene, head, or
hand; no layout move; no heavy new systems (one new parallel progress key,
reusing all existing timing/easing machinery); v19-1 untouched throughout.

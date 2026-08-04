V19_1_ACCEPTED_AS_NEXT_WORKING_BASELINE

# V19 → V19-1: Eye → Earth Transition Correction

This is a strict local correction pass over
`Problem-v86-nav-logo-simplified-signin-continuous-hand-19-eye-earth-interaction-foundation.html`
("v19"), producing
`Problem-v86-nav-logo-simplified-signin-continuous-hand-19-1-eye-earth-transition-correction.html`
("v19-1"). v19 was not modified (hash-verified below). Nothing was
redesigned: the Sign-in story, the Earth's continent geometry/count/styling,
the hand, and the head are all untouched. Only the **timing and travel path**
of the existing Eye → Earth transition inside `LoginHeadmazeStory`'s `'hold'`
stage were adjusted — 8 lines, all inside one function.

## The problem, confirmed and root-caused

Driving the real page through its actual sign-in flow (clicking the sign-in
dot → `LoginHeadmazeStory.start()` → the real `STAGES` sequence → the real
`'hold'` stage, not a fabricated demo) and capturing frames every 50ms during
the hold stage's opening milliseconds surfaced the exact defect: at
approximately **t+150ms after entering `'hold'`**, the Earth orb is already
large (its glow/ring/core have grown to nearly full scale) while it has
barely begun traveling from its start point — so it sits directly beside,
and its halo visibly reaches into, the head/eye silhouette, before the hand
has even risen to receive it.

Root cause, found by reading the exact formulas in `render()`:

```js
const holdOrbReveal=smootherWindow(holdT,0.10,0.43);   // SCALE fully done by holdT=0.43
const holdOrbTravel=smootherWindow(holdT,0.16,0.79);   // POSITION only ~40% done at holdT=0.43
const holdEarthGaze=smootherWindow(holdOrbReveal,0.05,0.55); // gaze can't start until reveal already has
```

**The orb's SCALE (`holdOrbReveal`) reaches full size well before its
POSITION (`holdOrbTravel`) has traveled meaningfully away from the start
point** — so for a real stretch of the transition, a big, bright, fully-formed
Earth is rendered still close to where the wilted rose sits, right beside the
face. Separately, the eye's glance toward the Earth (`holdEarthGaze`) was
defined as a function of the orb's *own* reveal progress, so the eye could
only ever react *after* the Earth had already started asserting itself — the
opposite of "the eye notices first."

## The correction

Exactly 8 lines changed, all inside the same `render()` function, all
numeric window/control-point adjustments — no new functions, no new state,
no new timer rig. Full diff in `V19-to-V19-1-diff-report.md`. Summary:

1. **`holdEarthGaze` decoupled and moved earlier.** Was
   `smootherWindow(holdOrbReveal,0.05,0.55)`; now
   `smootherWindow(holdT,0.02,0.24)` — an independent, early window directly
   on the hold stage's own progress, so the eye's glance begins essentially
   at the start of `'hold'` and completes *before* the orb starts growing.
   The eye leads.
2. **`holdOrbReveal` (scale) delayed and widened**: `(0.10,0.43)` →
   `(0.26,0.64)` — the orb now stays small/subtle until travel is already
   well underway, instead of reaching full size almost immediately.
3. **`holdOrbTravel` (position) starts and finishes earlier**: `(0.16,0.79)`
   → `(0.08,0.70)` — position now consistently leads scale instead of
   lagging behind it.
4. **The three continent-reveal windows re-timed proportionally** to the new
   `holdOrbReveal` window, so North/South America and Africa still fade in
   staggered, one after another, rather than bunching together now that the
   sphere itself reveals later.
5. **The travel bezier's two control points reshaped** (`orbX`:
   `223.0,266.0`→`213.0,259.0`; `orbY`: `108.0,118.0`→`117.0,126.0`) so more
   of the path's vertical drop (from face-height 104 toward the hand's
   height 131) happens earlier, giving the orb separation from the face
   plane sooner rather than sliding across at face-height before dropping
   late. **Start point `(204,104)` and end point (the frozen
   `FUTURE_EARTH_RIG.center`) are untouched** — a cubic bezier always passes
   through its start/end regardless of its control points, so this is
   mathematically guaranteed, not just visually similar.

This directly implements the requested 7-step order: eye notices (gaze,
`0.02–0.24`) → gaze established → Earth activates softly (reveal,
`0.26–0.64`, starting right after gaze resolves and shortly after travel has
begun) → Earth travels a cleaner arc → hand receives (existing
`holdPalmReveal`/`holdGrip` windows, **untouched**, now overlapping cleanly
with reveal's tail and travel's completion) → Earth settles → final hold
(unchanged).

## Quantitative verification (computed directly from the formulas)

Evaluating both files' exact formulas at the same hold-stage progress point
(`holdT=0.43`, near the old configuration's worst point) gives a direct,
reproducible before/after comparison of the orb halo's left edge against the
head silhouette's right edge (at SVG-unit x=180):

| | orb scale | travel progress | orb halo left edge | clearance vs. head edge (x=180) |
|---|---|---|---|---|
| **v19 (before)** | ≈1.00 (reveal already done) | ≈0.40 (position far behind) | x≈170.4 | **≈ −9.6** (halo crosses into the head) |
| **v19-1 (after)** | ≈0.42 (still growing) | ≈0.62 (well underway) | x≈224.5 | **≈ +44.5** (clear separation) |

Scanning the surrounding range, the *worst* point in the original
configuration (around `holdT≈0.35–0.38`) shows the halo overlapping roughly
20–25 SVG units into the head silhouette. At the equivalent progress range in
v19-1, clearance stays comfortably positive (≈+30 to +45 units) throughout —
confirmed both analytically and by direct visual inspection of the captured
frames (below).

## Visual verification

The story was driven through its real flow (`showLogin()` → click the actual
sign-in dot → the real `STAGES` sequence, not a fabricated shortcut) in
Playwright, with frames captured every 50ms through the opening of the hold
stage, for both files.

- **`V19-to-V19-1-transition-comparison-t150ms.png`** — the two files at the
  *identical* real-time offset (t+150ms into hold, the confirmed worst point
  for v19): v19 shows the Earth's halo directly overlapping the eye/face
  area; v19-1 shows no Earth visible yet at all (still gathering, hand only
  just beginning to rise) — no collision at any point.
- **`V19-1-hold-transition-progression-strip.png`** — v19-1 at t+150/200/250/300ms,
  showing the calmer sequence: hand rising → Earth appearing already clear
  of the face → Earth growing while traveling toward the hand → arrival.
- **`V19-1-FINAL-HOLD-ENGLISH.png`** / **`V19-1-FINAL-HOLD-ARABIC.png`** —
  the settled final composition in both languages, confirmed unchanged (see
  below).

## Final hold composition: confirmed preserved

Pixel-diffing the settled final-hold screenshots is only meaningful once a
subtlety is accounted for: the completed story keeps a small perpetual
"idle water wobble" (a `feDisplacementMap` filter tied to real elapsed time,
`.lhmz-story-complete .lhmz-idle-wobble-*`) running indefinitely, so *any*
two separate real-time captures of the *same, unmodified* file will differ
by a few pixels at their edges. That baseline noise was measured directly:
capturing v19's own final hold twice in two separate runs produced **3,467
pixels differing by >60/255** between the two v19 captures. Comparing v19's
final hold against v19-1's final hold produced only **42 pixels differing
by >60/255** — smaller than v19's own run-to-run noise. In other words,
v19-1's final composition is *at least as close* to v19's final composition
as v19 is to itself. The final hold is preserved.

## Scope compliance

| Preserved (per task) | Status |
|---|---|
| Sign-in page layout | Untouched — 0 lines changed outside `render()`'s hold-stage block |
| Head placement/geometry | Untouched — no head/eye path or transform formula touched |
| Hand/forearm geometry | Untouched — `armTransform`, finger rotations, palm reveal all untouched |
| Earth final position/scale | Untouched — end-of-bezier and `orbScale` final values are the same formulas, mathematically guaranteed identical at progress=1 |
| v19 final hold composition | Preserved — confirmed via pixel-diff below v19's own run-to-run noise floor |
| Text/translations, RTL | Untouched — no i18n/`dir`-related code touched; Arabic final hold confirmed |
| Navigation, World system | Untouched — `showPage`, globe/World swiper code untouched |
| Continent geometry/count/styling | Untouched — only the continents' *reveal timing windows* were re-proportioned to match the new reveal timing; no path, count, or color changed |

| Not done (per task) | Status |
|---|---|
| Redesign the Sign-in story | Not done |
| Rebuild the Earth system | Not done |
| Start v20 | Not done |
| Add Asia / Australia | Not done |
| Add full globe rotation | Not done |
| Overwrite v19 | Not done — v19 SHA-256 confirmed unchanged |
| New animation architecture / new timer rig | Not done — all edits reuse the existing `STAGES`/`render()`/`smootherWindow`/`cubicValue` machinery already in `LoginHeadmazeStory` |

## Console/runtime check

The real sign-in flow was driven end-to-end (through `'reveal'` → `'wilt'` →
`'touch'` → `'spark'` → `'revive'` → `'awake'` → `'breath'` → `'message'` →
`'through'` → `'signin'` → `'hold'` → story-complete) for both files, with
`console.error` and `pageerror` listeners attached throughout. Both files
produced the identical, pre-existing baseline error set only (an
X-Frame-Options meta-tag warning and sandboxed external-resource
`ERR_CONNECTION_RESET` messages — present in this sandbox for any page load,
unrelated to this file or this correction). **Zero new errors introduced.**

## File identity

| File | Role | SHA-256 | Bytes | Lines |
|---|---|---|---|---|
| `Problem-v86-nav-logo-simplified-signin-continuous-hand-19-eye-earth-interaction-foundation.html` | source, read-only | `8e3024fc06f68b70a10b696ab15bc8419d417eaf84c354a3700eae1d2e36558b` | 3,054,541 | 45,732 |
| `Problem-v86-nav-logo-simplified-signin-continuous-hand-19-1-eye-earth-transition-correction.html` | this correction | `809754b2008fd918a04a3b8e510ce8e7e2121291c762271d20c43469e4d429a7` | 3,054,539 | 45,732 |

v19's hash/size/line-count were confirmed identical before and after
building v19-1.

## Deliverables

1. `Problem-v86-nav-logo-simplified-signin-continuous-hand-19-1-eye-earth-transition-correction.html`
2. `V19-1-EYE-EARTH-TRANSITION-CORRECTION-REPORT.md` (this file)
3. `V19-to-V19-1-diff-report.md`
4. `V19-1-FINAL-HOLD-ENGLISH.png`, `V19-1-FINAL-HOLD-ARABIC.png`,
   `V19-to-V19-1-transition-comparison-t150ms.png`,
   `V19-1-hold-transition-progression-strip.png`

## Scope note

This delivers Correction 19-1 and its evidence only. No v20, no Asia/Australia,
no full globe rotation, no redesign of the Sign-in story or the Earth
system, no production plan.

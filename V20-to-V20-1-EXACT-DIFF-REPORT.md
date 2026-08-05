# V20 -> V20.1 Exact Diff Report

## Scope

This report is a complete diff between the v20 prototype (rejected by independent
audit) and the v20.1 correction. v20.1 was **built from the v19.1 baseline**, not
from v20 — v20's flawed single-flat-surface continent architecture was discarded
entirely and replaced, not patched. This report nonetheless documents the full,
literal `diff` between the v20 and v20.1 HTML files, since that is the artifact
that existed before this correction and the one this task is scoped against.

## Source identities

| File | Role | SHA-256 | Bytes | Lines |
|---|---|---|---|---|
| `Problem-v86-...-19-1-eye-earth-transition-correction.html` | approved baseline v20.1 was built from | `809754b2008fd918a04a3b8e510ce8e7e2121291c762271d20c43469e4d429a7` | 3,054,539 | 45,732 |
| `Problem-v86-...-20-world-style-global-future-earth.html` | rejected prototype (this diff's "before") | `cdb1cec63f1b085f7908b947ecc9a12773b01031cc0ad57b96a34c95d38a8894` | 3,058,096 | 45,784 |
| `Problem-v86-...-20-1-coherent-global-earth-views.html` | this correction (this diff's "after") | `25b26100a1eea30f75798caa4cd287f9518761a633038332bba8c216e38aa8a1` | 3,060,107 | 45,809 |

v19.1 and v20 hashes above were re-verified immediately before this report was
written and match the values recorded at every earlier checkpoint in this task —
**neither file was modified**.

## Diff method

`diff <v20-file> <v20-1-file>` — full line-level diff, no options that hide
content. Total: 165 diff-report lines (add/remove/context markers), covering 8
hunks. Zero hunks touch anything outside the Earth continent geometry, the
sequence/crossfade state machine, the per-continent opacity application, and the
eye region-gaze nudge.

## Hunk-by-hunk summary

### Hunk 1 — continent geometry & structure (the core fix)

**v20 (before):** one flat `<g class="lhmz-story-earth-continents" id="lhmzEarthSurface">`
containing all 10 continent paths (NorthAmerica, CentralAmerica, SouthAmerica,
Europe, **Africa, Asia, Australia** all siblings), rotated together by
`rotate(-5deg -> +5deg)`. Independent geometry measurement (Shapely) found Asia
overlapping Africa by 499.12 SVG² (74.6% of Asia), Asia overlapping Europe by
18.59 SVG² (11.1% of Europe), Australia overlapping Africa by 8.39 SVG² (5.5% of
Australia) — this is the confirmed defect (see section 3 of the main report).

**v20.1 (after):** the flat group is replaced with three named, independently
opacity-controlled sibling `<g>` elements:

- `#lhmzEarthViewAfricaEurope` (View A) — NorthAmericaA, CentralAmericaA,
  SouthAmericaA, EuropeA, AfricaA, Greenland, Iceland, BritishIsles. All path
  `d` data is byte-identical to v19.1's original continents.
- `#lhmzEarthViewAsiaPacific` (View B) — new `lhmzEarthAsia` and
  `lhmzEarthAustralia` paths, authored fresh for this correction, validated
  self-intersection-free, fully inside core radius 53.4, zero overlap with each
  other.
- `#lhmzEarthViewAmericas` (View D) — NorthAmericaD, CentralAmericaD,
  SouthAmericaD, reusing the exact same path data as View A's Americas (ids
  suffixed `-D` only because SVG ids must be unique document-wide).

No rotation transform is applied to any view group. Hemisphere change is
expressed by *which group is opacity-dominant*, never by spinning a flat
surface — the v20 anti-pattern the audit explicitly flagged.

### Hunk 2 — `globeSequenceProgress` state init (INITIAL/REVEALED)

v20 already introduced this key with factor `0.01800`; v20.1 keeps the key but
retunes it (see hunk 4) and the init lines are otherwise structurally identical
(`globeSequenceProgress:0` added to both INITIAL and REVEALED state objects).

### Hunk 3 — `HOLD_READY` / `hold` stage factors

v20: `factors:{holdProgress:0.06350,globeSequenceProgress:0.01800}`.
v20.1: `factors:{holdProgress:0.06350,globeSequenceProgress:0.02200}` — the
factor was raised from 0.01800 to 0.02200. This is a direct, intentional
retiming decision (see section 7 of the main report): the empirically-measured
real-time pacing of a `0.01800`-factor sequence, combined with the crossfade
windows described below, was found (via live Playwright trace) to leave Africa's
own dominant moment almost invisible — the crossfade to Asia began before
`holdOrbReveal` had made the globe meaningfully visible. `0.02200` combined with
later window boundaries fixes this while keeping total duration inside the
required 4.0-5.5s band (measured 4.29s-4.40s across 3 runs).

### Hunk 4 — sequence/crossfade block (the second core fix)

**v20 (before):** a single `holdEarthRotation` value plus three per-continent
opacity ramps (`holdContinentAfrica`, `holdContinentSouthAmerica`,
`holdContinentNorthAmerica`) applied on top of the one shared flat surface —
i.e. an opacity/rotation tour over a single crowded map.

**v20.1 (after):** entirely new logic, still keyed off the same
`globeSequenceProgress` -> `sequenceT` (`settledPhase`) pattern v20 introduced,
but restructured around the three view groups:

```js
const toAsiaPacific=bell(sequenceT,0.30,0.38,0.62,0.70);
const toAmericas=bell(sequenceT,0.74,0.80,0.96,1.00);
const viewAfricaEuropeOpacity=1-toAsiaPacific-toAmericas;
const viewAsiaPacificOpacity=toAsiaPacific;
const viewAmericasOpacity=toAmericas;
const emphAfrica=bell(sequenceT,0.00,0.04,0.20,0.28);
const emphAsia=bell(sequenceT,0.30,0.36,0.46,0.52);
const emphAustralia=bell(sequenceT,0.46,0.52,0.62,0.68);
const emphEurope=bell(sequenceT,0.62,0.68,0.74,0.80);
const emphNorthAmerica=bell(sequenceT,0.74,0.80,0.90,0.94);
const emphSouthAmerica=bell(sequenceT,0.90,0.94,0.98,1.00);
```

`viewAfricaEuropeOpacity`/`viewAsiaPacificOpacity`/`viewAmericasOpacity` are the
group-level crossfade weights (always summing to 1, so at most two groups are
ever simultaneously partial and exactly one is ever fully dominant at a steady
moment). `emphAfrica`..`emphSouthAmerica` are independent per-continent
brightening bumps layered on top of their parent group's opacity, giving each
of the 6 required continents (in the required order) its own readable focus
moment without ever touching a rotation transform.

Window boundaries were shifted later versus an earlier internal draft (see
"Errors and fixes" in the working history) specifically so Africa's own
dominant window doesn't start decaying before `holdOrbReveal` has made the
globe visible in real time — this shift is entirely internal to v20.1's own
build history and does not appear as a separate diff against v20 (v20 never had
this per-continent-emphasis architecture to begin with).

### Hunk 5 — opacity application block

v20 applied `holdOrbReveal*holdContinentX` to 3 individual continent refs
(`earthAfrica`, `earthSouthAmerica`, `earthNorthAmerica` — the only 3 v20 gave
individual sequencing to; Asia/Australia/Europe were only ever touched via the
shared-surface rotation+opacity, not individually ref'd).

v20.1 applies `holdOrbReveal*viewXOpacity` to the 3 new **view-group** refs, and
separately applies the un-multiplied `holdEarthX` emphasis value directly to
each of the 6 individually-sequenced continent refs (`earthAfricaA`,
`earthEuropeA`, `earthAsia`, `earthAustralia`, `earthNorthAmericaD`,
`earthSouthAmericaD`). This two-level composition (group opacity x child
opacity) is why the child-level values are not separately multiplied by
`holdOrbReveal` — the multiplication already happens once, at the group level.

### Hunk 6 — eye region-gaze nudge

Both v20 and v20.1 add an additive `+holdRegionGazeX`/`+holdRegionGazeY` term to
the existing (v19.1-approved, untouched) `eyeGazeX`/`eyeGazeY` base formula. The
line shape is identical between v20 and v20.1; only the upstream `emph*`
variables it reads were rebound from v20's shared-surface continents to
v20.1's per-view continents. No new discrete branches were introduced — the
gaze nudge remains a pure sum of smooth `bell()` curves in both versions.

### Hunk 7 — `thresholdFor` explicit-list addition

Identical in both v20 and v20.1: `globeSequenceProgress` is added to the
explicit `0.003`-threshold list (this was itself a v20 bug fix, carried
forward unchanged into v20.1 since the underlying `settledPhase`/exponential-
decay snap-to-target mechanism is shared code neither version touches
elsewhere).

### Hunk 8 — `mount()` refs

v20 added 3 individual continent refs (`earthAfrica`, `earthSouthAmerica`,
`earthNorthAmerica`) on top of v19.1's existing static continent references.

v20.1 replaces those 3 with 9 refs: 3 view-group container refs
(`earthViewAfricaEurope`, `earthViewAsiaPacific`, `earthViewAmericas`) plus 6
individually-sequenced continent refs (`earthAfricaA`, `earthEuropeA`,
`earthAsia`, `earthAustralia`, `earthNorthAmericaD`, `earthSouthAmericaD`).
NorthAmericaA/SouthAmericaA/CentralAmericaA/Greenland/Iceland/BritishIsles/
CentralAmericaD deliberately have **no** individual ref in either version —
they inherit their parent view-group's opacity directly (matching v19.1's
original pattern for continents that were never part of the explicit sequence).

## What did NOT change between v20 and v20.1

Everything else in the 45,784/45,809-line files is identical: head geometry,
hand/forearm geometry, the v19.1 Eye -> Earth arrival formulas
(`holdOrbReveal`, `holdOrbTravel`, `holdEarthGaze`, `orbX`/`orbY` and their
control points), Earth's final position/outer scale, halo/ring/core/highlight/
grid paths, Sign-in layout, login form, logo, translations, RTL behavior,
navigation, and the entire World runtime/component. See
`V20-1-COHERENT-GLOBAL-EARTH-VIEWS-REPORT.md` section 12 for the direct v19.1
vs v20.1 diff that proves this by literal comparison rather than visual claim.

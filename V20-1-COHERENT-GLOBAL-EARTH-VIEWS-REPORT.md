# V20.1 — Coherent Globe-Facing Views + Eye-Guided Global Sequence

## 1. Verdict

**`V20_1_READY_FOR_INDEPENDENT_AUDIT`**

Coherent multi-view architecture is implemented, all mandatory geometry/overlap
checks pass, the required 6-continent sequence is readable and correctly
ordered, the final hold returns cleanly to a v19.1-style Atlantic composition,
runtime is stable across 3 real-flow drives with zero new console/page errors,
and all required evidence files exist. This is a correction pass, not a final
production sign-off — see section 13 for remaining limitations.

## 2. Source identities

| File | Role | SHA-256 | Bytes |
|---|---|---|---|
| `Problem-v86-...-19-1-eye-earth-transition-correction.html` | approved baseline, edited to produce v20.1 | `809754b2008fd918a04a3b8e510ce8e7e2121291c762271d20c43469e4d429a7` | 3,054,539 |
| `Problem-v86-...-20-world-style-global-future-earth.html` | rejected prototype (not edited; superseded) | `cdb1cec63f1b085f7908b947ecc9a12773b01031cc0ad57b96a34c95d38a8894` | 3,058,096 |
| `Problem-v86-...-20-1-coherent-global-earth-views.html` | this correction | `25b26100a1eea30f75798caa4cd287f9518761a633038332bba8c216e38aa8a1` | 3,060,107 |

v19.1 and v20 hashes above were re-verified immediately before writing this
report and match every earlier checkpoint recorded during this task. Neither
file was overwritten.

## 3. Confirmed v20 defect

v20 added Asia and Australia as siblings inside the same single flat
`<g id="lhmzEarthSurface">` that already held Africa, Europe, and the Americas,
then rotated that whole group ±5° as its only "orientation" mechanism.
Independent Shapely-based geometry measurement on the actual embedded path
data found:

- Asia ↔ Africa overlap: 499.12 SVG² (74.6% of Asia's own area)
- Asia ↔ Europe overlap: 18.59 SVG² (11.1% of Europe's own area)
- Australia ↔ Africa overlap: 8.39 SVG² (5.5% of Australia's own area)
- Land-density: sum of all 10 continent areas = 3499.69 SVG² (39.07% of the
  core sphere) vs. union area after removing overlaps = 2973.38 SVG² (33.19%)

Rotating the whole group together preserves every one of these overlaps at
every rotation angle — the result reads as an opacity/rotation tour over one
permanently overcrowded flat map, not a globe presenting different hemispheres.
This defect is what made v20 `V20_BLOCKED_FOR_WORKING_BASELINE` in the
independent audit, and is the reason v20.1 was built from v19.1 directly
rather than by patching v20.

## 4. Chosen view architecture

A 3-view solution (the brief explicitly permits 3 views provided Europe is
still clearly presented in the required order):

- **View A — Atlantic / Africa-Europe** (`#lhmzEarthViewAfricaEurope`): Africa,
  Europe, North/Central/South America, Greenland, Iceland, British Isles — all
  using v19.1's original, already-approved continent path data unchanged. This
  is both the first dominant continent's view (Africa) and the final settled
  view (calm Atlantic composition, matching v19.1's approved look).
- **View B — Asia-Pacific** (`#lhmzEarthViewAsiaPacific`): newly authored Asia
  and Australia paths only. No Africa, no Europe, no stacking.
- **View D — Americas** (`#lhmzEarthViewAmericas`): North/Central/South America,
  reusing View A's exact path data (ids suffixed `-D` for uniqueness only).

Europe is presented via a controlled return to View A with Europe-specific
emphasis (the brief's explicitly-allowed alternative to a dedicated View C) —
this reads as "the globe turns back to a familiar hemisphere and highlights
Europe within it," not a random zoom or detached cluster, since View A's whole
Atlantic geometry (including Africa at reduced/baseline emphasis) is already
present and unchanged.

At every steady moment exactly one view group is opacity-dominant; during each
of the 3 crossfades (A→B, B→A, A→D) at most two groups are simultaneously
partial, verified empirically in section 9. No rotation transform is applied
to any view group — orientation change is expressed purely through which group
is dominant, deliberately avoiding v20's flagged anti-pattern of rotating a
flat surface as a substitute for changing hemisphere.

## 5. How World data/projection informed the static paths

This specific HTML file contains no separate "World" geographic-data component
to draw from — a repo-wide search for any World-named element, class, or id
inside this file returns zero matches (confirmed via `grep`), and the only
World-named artifacts in the repository are the v20 file and report from the
previous phase, which are themselves prior outputs of this same task lineage,
not a distinct dashboard/dataset. Given that, "using the World globe's
geographic intelligence as an authoring reference" was interpreted as: author
Asia and Australia using their true relative real-world geography (Asia is the
largest landmass, positioned north/northeast in the world map; Australia sits
south/southeast of Asia, clearly separated, smaller) rather than an arbitrary
decorative shape, while matching v19.1's own existing hand-authored continent
path conventions exactly — same simplified cubic-bezier style, comparable node
count (7-9 curve segments, matching Africa/Europe's existing complexity),
comparable scale (max radius 51-53 units, matching Africa's 48 and
NorthAmerica's 48.2), and the same low-detail/no-coastline-micro-detail
standard. `design_continents.py` (scratchpad) iterated three shape drafts,
measuring each candidate's bounding box and max radius against the existing
approved continents before selecting the final Asia/Australia geometry
embedded in v20.1. No World dashboard component exists in this file to modify,
so the freeze-list requirement "do not modify the World component itself" is
trivially and verifiably satisfied.

## 6. Exact SVG/group changes

Full hunk-by-hunk detail is in `V20-to-V20-1-EXACT-DIFF-REPORT.md` (section
"Hunk 1"). Summary: the single flat `.lhmz-story-earth-continents` group's
children were replaced with 3 named sub-groups (`lhmzEarthViewAfricaEurope`,
`lhmzEarthViewAsiaPacific`, `lhmzEarthViewAmericas`), View A's 8 continent
paths are byte-identical to v19.1, View D's 3 paths reuse View A's data under
new ids, and View B's 2 paths (`lhmzEarthAsia`, `lhmzEarthAustralia`) are the
only genuinely new geometry in the file.

## 7. Exact animation/state changes

Full detail in `V20-to-V20-1-EXACT-DIFF-REPORT.md` (Hunks 2-8). Summary:

- New independent progress key `globeSequenceProgress` (factor `0.02200`,
  threshold `0.003`, added to the `hold` STAGES entry) — completely decoupled
  from `holdT`, so it never competes with or alters the approved v19.1 arrival
  timing.
- `sequenceT=settledPhase(values.globeSequenceProgress,0.003)` drives 3
  group-crossfade `bell()` windows (`toAsiaPacific`, `toAmericas`, and the
  implicit `viewAfricaEuropeOpacity=1-toAsiaPacific-toAmericas`) plus 6
  per-continent emphasis `bell()` windows (Africa, Asia, Australia, Europe,
  North America, South America) in the required order.
- 9 new `mount()` refs replace v20's 3.
- The eye's existing region-gaze nudge (`holdRegionGazeX`/`holdRegionGazeY`,
  additive on top of the unchanged v19.1 `holdEarthGaze` base) is rebound from
  v20's shared-surface continents to v20.1's per-view continents; its formula
  shape (a weighted sum of smooth `bell()` emphasis values, never a discrete
  branch) is unchanged.

## 8. Per-view geometry metrics

Full numeric results in `V20-1-GLOBE-VIEW-METRICS.json` (Shapely-based,
n=24 samples per bezier segment). Summary:

| Check | Result |
|---|---|
| Self-intersections (all 13 paths) | 0 |
| Paths outside core radius 53.4 | 0 (max observed: 53.05, Asia) |
| All paths closed | Yes |
| Duplicate ids among new earth-view elements | 0 (16/16 unique) |
| View A internal overlap (excl. Central America bridge) | 0.00 for every pair |
| View A NorthAmerica↔CentralAmerica bridge | 0.19 (0.9% of Central America) — intentional |
| View B Asia↔Australia overlap | 0.00 |
| View D internal overlap (excl. Central America bridge) | 0.00 for every pair |
| Asia↔Africa overlap *within the same active view* | 0 (by construction — never co-members of one view group) |
| Australia↔Africa overlap *within the same active view* | 0 (by construction) |
| North America↔South America overlap | 0.00 (only the controlled Central America bridge exists) |

Cross-view raw path overlap (Asia↔Africa: 872.53/25.4%/79.1%; Australia↔Africa:
61.64/14.3%/5.6%) is reported in the JSON as informational only — these paths
live in different opacity-controlled groups that are never both dominant at a
steady moment (verified empirically in section 9), so this number is not the
acceptance-relevant metric; same-view overlap (0 in both cases) is.

## 9. Sequence timing trace

Real-flow Playwright drive (`trace_v20_1_sequence.js`), no fake timers: click
sign-in dot → poll for `lhmz-stage-hold` → sample opacities every 200ms → poll
for `lhmz-story-complete`.

| Run | Click→hold stage | Hold→sequence complete |
|---|---|---|
| 1 | 12,823ms | 4,399ms |
| 2 | 12,802ms | 4,291ms |
| 3 (state-driven capture run) | — | 4,731ms (final-hold state recorded slightly after `complete` fires, includes settle margin) |

All 3 runs land inside the required 4.0-5.5s target for the tour itself.
Click→hold timing (~12.8s) is unchanged from v19.1/v20 since none of that
timing was touched.

Representative interval trace (run 2, full data in
`V20-1-NORMAL-SPEED-LIFECYCLE-TRACE.json` -> `interval_trace_200ms`):

| t (ms) | viewA | viewB | viewD | dominant |
|---|---|---|---|---|
| 0 | 0 | 0 | 0 | (globe not yet visible) |
| 831 | 0.999 | 0 | 0 | **Africa** (africa=0.995) |
| 1682 | 0 | 1 | 0 | **Asia** (asia=1) |
| 2352 | 0 | 1 | 0 | **Australia** (australia=1) |
| 2993 | 1 | 0 | 0 | **Europe** (europe=1) |
| 3431 | 0 | 0 | 1 | **North America** (na=1) |
| 4085 | 0 | 0 | 1 | **South America** (sa=1) |
| 4291 | 1 | 0 | 0 | final hold (all continents at calm baseline 0.75) |

At every one of these steady samples exactly one view is fully dominant
(value 1) and the other two are exactly 0 — confirming the "never leave every
world surface visible at full opacity" and "one dominant at steady moments"
rules. During the crossfades (e.g. t=1257-1920 for A→B) at most two view
values are simultaneously nonzero, and they sum to ≤1 at every sample.

This directly corrects the pacing defect found during v20.1's own build: an
earlier draft's crossfade-away window started at `sequenceT=0.10`, which
(cross-referenced against `holdOrbReveal`'s real-time behavior) meant the
Earth was still barely visible when the fade to Asia had already progressed
most of the way, so Africa never got a genuine dominant moment. The final
windows (`toAsiaPacific` starting at `sequenceT=0.30`) were verified, as shown
above, to give Africa a clean full-opacity (viewA=0.999, africa=0.995) moment
at t=831ms, well after the globe has become visible.

## 10. Eye-gaze trace

`holdRegionGazeX`/`holdRegionGazeY` values, derived from the recorded continent
opacities via the same directional-weight formula used in `render()` (full
data in `V20-1-NORMAL-SPEED-LIFECYCLE-TRACE.json`):

| Moment | holdRegionGazeX | holdRegionGazeY |
|---|---|---|
| Africa dominant | +0.42 (right/down toward Africa) | +0.10 |
| Asia dominant | +0.60 | -0.24 |
| Australia dominant | +0.40 | +0.60 |
| Europe dominant | +0.36 | -0.60 |
| North America dominant | -0.52 | -0.48 |
| South America dominant | -0.44 | +0.44 |
| Final hold | 0.00 | 0.00 |

Magnitudes stay within the "no large eye displacement" requirement (all ≤0.8
in the underlying weight scale, matching v20's own already-approved
restrained-gaze principle), the nudge is a continuous sum of smooth `bell()`
curves so it never jumps discretely, and it returns exactly to `0,0` at the
final hold — the eye ends calmly Earth-directed, not mid-region.

## 11. Mobile visual results

Captured via real-flow Playwright drives (no fake timers):

| Viewport | File | Result |
|---|---|---|
| English 390×844 DPR2 | `V20-1-MOBILE-390x844-DPR2-ENGLISH.png` | No horizontal overflow; 0 new console/page errors |
| Arabic/RTL 390×844 DPR2 | `V20-1-MOBILE-390x844-DPR2-ARABIC.png` | No horizontal overflow; 0 new console/page errors |
| English ~900×900 | `V20-1-DESKTOP-900x900-ENGLISH.png` | Renders correctly, calm final hold |
| English final hold (1280×900) | `V20-1-FINAL-HOLD-ENGLISH.png` | Atlantic composition, no stacked Asia/Australia |
| Arabic final hold (1280×900) | `V20-1-FINAL-HOLD-ARABIC.png` | RTL layout intact, same Atlantic Earth composition |
| 6 sequence moments | `V20-1-SEQUENCE-{AFRICA,ASIA,AUSTRALIA,EUROPE,NORTH-AMERICA,SOUTH-AMERICA}.png` | Each captured at its state-verified peak (view+continent both >0.9 opacity) |
| Equal-scale sequence board | `V20-1-SEQUENCE-BOARD.png` | All 6 orb crops, same scale, labeled |
| Transition strip | `V20-1-GLOBE-VIEW-TRANSITION-STRIP.png` | 2 frames captured mid Africa→Asia crossfade (both views partially visible) |

Console/page error set observed during all capture runs: 1 pre-existing
`X-Frame-Options may only be set via an HTTP header...` meta-tag warning plus
5 pre-existing `net::ERR_CONNECTION_RESET` entries (a blocked external
resource unrelated to this file's own code). This exact error set was also
present, byte-for-byte, in v20's own capture run — **zero new errors were
introduced by v20.1**.

## 12. Frozen-scope verification

`diff` between v19.1 and v20.1 (full listing in the working history;
159 diff-report lines / 133 changed lines total, 8 hunks) touches only:

1. The continents markup (flat group → 3 view groups)
2. `globeSequenceProgress` state init (INITIAL/REVEALED/HOLD_READY/hold-stage
   factors)
3. The sequence/crossfade/per-continent-emphasis block in `render()`
4. The opacity-application block for the new view/continent refs
5. `thresholdFor`'s explicit list (added `globeSequenceProgress`)
6. The eye-gaze formula's additive `+holdRegionGazeX/Y` terms
7. `mount()` refs

**Every other line in the file is byte-identical to v19.1**, including —
verified by the diff containing zero matches for any of these — the v19.1
arrival formulas (`holdOrbReveal`, `holdOrbTravel`, `holdEarthGaze`, `orbX`,
`orbY` and their cubic control points), head geometry, hand/forearm geometry,
Earth's final position/outer scale, halo/ring/core/highlight/grid paths,
Sign-in layout, login form, logo, translations, RTL behavior, and navigation.
This is a literal-diff proof, not a visual-similarity claim.

## 13. Remaining limitations

- Europe is presented via a controlled return to View A with emphasis, not a
  fully dedicated View C. The brief explicitly permits this ("may be
  implemented as... a controlled return to View A with Europe emphasis"), and
  the sequence trace confirms Europe gets its own clean, fully-emphasized
  moment (t=2993ms, europe=1, viewA=1), but a future pass could still consider
  a dedicated Europe-only view if a reviewer wants stronger visual separation
  from the Africa-dominant moment.
- Cross-view raw path overlap between Asia and Africa (872.53/79.1% of Africa)
  and Australia and Africa (61.64/5.6% of Africa) is nonzero when measured as
  static geometry ignoring opacity — this is architecturally acceptable given
  the two groups are never simultaneously dominant (proven in section 9), but
  it does mean the two view groups' geometry is not spatially independent if
  a future change ever made both groups visible at once by mistake. Treat the
  crossfade-exclusivity invariant as load-bearing.
- JS syntax validation used `new Function(code)` per extracted `<script>`
  block (19/19 pass) rather than a full AST-based linter; this catches syntax
  errors but not, e.g., unreachable-code or type issues (not applicable to
  this vanilla-JS file regardless).
- Testing was performed in Chromium via Playwright only; no cross-browser
  (Firefox/WebKit) or physical-device verification was performed.
- This is a correction pass, not a final production sign-off — do not treat
  v20.1 as a Golden Master.

## 14. Delivered files

- `Problem-v86-nav-logo-simplified-signin-continuous-hand-20-1-coherent-global-earth-views.html`
- `V20-1-COHERENT-GLOBAL-EARTH-VIEWS-REPORT.md` (this file)
- `V20-to-V20-1-EXACT-DIFF-REPORT.md`
- `V20-1-GLOBE-VIEW-METRICS.json`
- `V20-1-SEQUENCE-BOARD.png`
- `V20-1-FINAL-HOLD-ENGLISH.png`
- `V20-1-FINAL-HOLD-ARABIC.png`
- `V20-1-SEQUENCE-AFRICA.png`
- `V20-1-SEQUENCE-ASIA.png`
- `V20-1-SEQUENCE-AUSTRALIA.png`
- `V20-1-SEQUENCE-EUROPE.png`
- `V20-1-SEQUENCE-NORTH-AMERICA.png`
- `V20-1-SEQUENCE-SOUTH-AMERICA.png`
- `V20-1-GLOBE-VIEW-TRANSITION-STRIP.png`
- `V20-1-NORMAL-SPEED-LIFECYCLE-TRACE.json`
- `V20-1-DESKTOP-900x900-ENGLISH.png` (additional runtime-required viewport)
- `V20-1-MOBILE-390x844-DPR2-ENGLISH.png` (additional runtime-required viewport)
- `V20-1-MOBILE-390x844-DPR2-ARABIC.png` (additional runtime-required viewport)

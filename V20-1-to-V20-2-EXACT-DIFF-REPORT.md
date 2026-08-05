# V20.1 -> V20.2 Exact Diff Report

## Method

`diff` between the two HTML files, no options that hide content. Total: 61
diff-report lines (add/remove/context markers), 7 hunks. Every hunk is inside
the Earth continent geometry, the new per-continent glow filters, or the
per-continent opacity formulas — nothing else in either file differs.

## Source identities

| File | SHA-256 | Bytes |
|---|---|---|
| `Problem-v86-...-20-1-coherent-global-earth-views.html` | `25b26100a1eea30f75798caa4cd287f9518761a633038332bba8c216e38aa8a1` | 3,060,107 |
| `Problem-v86-...-20-2-world-derived-global-earth-refinement.html` | `1a739de1212b42296571a19ef05d7e961654a5827b43527dd308e0cee18f89d2` | (see repo listing) |

v20.1's hash above matches every earlier checkpoint recorded during its own
delivery — it was not modified.

## Hunk-by-hunk summary

### Hunk 1 — new glow-filter `<defs>` block (insertion only)

Inserted immediately before `<g class="lhmz-story-earth-continents">`: six
tiny filters (`lhmzGlowAfricaA`, `lhmzGlowEuropeA`, `lhmzGlowAsia`,
`lhmzGlowAustralia`, `lhmzGlowNorthAmericaD`, `lhmzGlowSouthAmericaD`), each a
`feGaussianBlur` (starting `stdDeviation="0"`, i.e. a visual no-op until
driven by JS) feeding a `feMerge` that layers the blur under the crisp
original — the standard "glow" filter shape. No existing content was
touched; this is a pure insertion.

### Hunk 2 — `EuropeA`/`AfricaA` gain `filter=` attributes

`<path ... id="lhmzEarthEuropeA" d="...">` and `<path ... id="lhmzEarthAfricaA"
d="...">` each gained `filter="url(#lhmzGlow...)"` immediately after their
`id` attribute. Their `d` path data is byte-identical to v20.1 (and to
v19.1's original Europe/Africa) — untouched.

### Hunk 3 — View B geometry fully replaced (the core fix)

**Before (v20.1):** `lhmzEarthAsia` (a hand-approximated rounded shape,
independently measured at 3436.85 SVG², reading as a "blob") and
`lhmzEarthAustralia` (a small hand-drawn oval), 2 paths total.

**After (v20.2):** `lhmzEarthAsia` and `lhmzEarthAustralia` re-derived
directly from the real World system's `CONTINENTS` lon/lat data and its
`project()` orthographic projection (camera centered at rotY=213°, rotX=0°;
full derivation in the main report section 3), each gaining a
`filter="url(#lhmzGlow...)"` attribute; plus two new minor accent shapes,
`lhmzEarthNewGuinea` and `lhmzEarthPhilippines`, visible and correctly
positioned at the same camera angle. 4 paths total, up from 2.

### Hunk 4 — `NorthAmericaD`/`SouthAmericaD` gain `filter=` attributes

Same pattern as Hunk 2, for the Americas view. Path data unchanged.

### Hunk 5 — opacity-swing constants widened

```js
// before
const holdEarthAfrica=0.75+0.25*emphAfrica;
const holdEarthEurope=0.75+0.25*emphEurope;
const holdEarthAsiaEmph=0.75+0.25*emphAsia;
const holdEarthAustraliaEmph=0.75+0.25*emphAustralia;
const holdEarthNorthAmerica=0.75+0.25*emphNorthAmerica;
const holdEarthSouthAmerica=0.75+0.25*emphSouthAmerica;

// after
const holdEarthAfrica=0.35+0.65*emphAfrica;
const holdEarthEurope=0.35+0.65*emphEurope;
const holdEarthAsiaEmph=0.35+0.65*emphAsia;
const holdEarthAustraliaEmph=0.35+0.65*emphAustralia;
const holdEarthNorthAmerica=0.35+0.65*emphNorthAmerica;
const holdEarthSouthAmerica=0.35+0.65*emphSouthAmerica;
```

The `emphX` variables themselves (the `bell()` timing windows that compute
them) are completely untouched — only the base/range constants each one
feeds into changed.

### Hunk 6 — 6 new glow-drive lines

```js
if(refs.earthGlowAfricaA)refs.earthGlowAfricaA.setAttribute('stdDeviation',(1.6*emphAfrica).toFixed(2));
if(refs.earthGlowEuropeA)refs.earthGlowEuropeA.setAttribute('stdDeviation',(1.6*emphEurope).toFixed(2));
if(refs.earthGlowAsia)refs.earthGlowAsia.setAttribute('stdDeviation',(1.6*emphAsia).toFixed(2));
if(refs.earthGlowAustralia)refs.earthGlowAustralia.setAttribute('stdDeviation',(1.6*emphAustralia).toFixed(2));
if(refs.earthGlowNorthAmericaD)refs.earthGlowNorthAmericaD.setAttribute('stdDeviation',(1.6*emphNorthAmerica).toFixed(2));
if(refs.earthGlowSouthAmericaD)refs.earthGlowSouthAmericaD.setAttribute('stdDeviation',(1.6*emphSouthAmerica).toFixed(2));
```

Inserted right after the existing `setOpacity(refs.earthSouthAmericaD,...)`
call, reading the same `emphX` values the opacity formulas already use — each
continent's glow is driven purely by its own emphasis, never by a sibling's.

### Hunk 7 — 6 new `mount()` refs

```js
earthGlowAfricaA:host.querySelector('#lhmzGlowAfricaABlur'),
earthGlowEuropeA:host.querySelector('#lhmzGlowEuropeABlur'),
earthGlowAsia:host.querySelector('#lhmzGlowAsiaBlur'),
earthGlowAustralia:host.querySelector('#lhmzGlowAustraliaBlur'),
earthGlowNorthAmericaD:host.querySelector('#lhmzGlowNorthAmericaDBlur'),
earthGlowSouthAmericaD:host.querySelector('#lhmzGlowSouthAmericaDBlur'),
```

Inserted immediately after the existing `earthSouthAmericaD` ref.

## What did NOT change between v20.1 and v20.2

Every other line is byte-identical, including: `globeSequenceProgress`'s
factor/threshold/state-init, every `bell()` crossfade and emphasis window
(`toAsiaPacific`, `toAmericas`, `emphAfrica`..`emphSouthAmerica`'s own
boundary values), the region-gaze nudge formula shape, `thresholdFor`, all
View A/View D path `d` data (only their `filter=` attribute changed), the
v19.1 arrival formulas (`holdOrbReveal`, `holdOrbTravel`, `holdEarthGaze`,
`orbX`/`orbY`), head/hand geometry, halo/ring/core/highlight/grid, Sign-in
layout, login form, logo, translations, RTL, navigation, and the World
runtime/component itself (read as an authoring reference only, never
modified).

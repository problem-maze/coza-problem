# Mechanical Focus Prototype 02 — deep internal refinement note

This is a **refinement**, not a replacement. Prototype 01 was treated as a
protected structural baseline throughout: it was read for its exact geometry
and never modified (`git diff` against it is empty; see the confirmation at
the end of this note). Every number in the "protected/unchanged" rows below
was copied verbatim from Prototype 01's markup, not re-derived or eyeballed.

## Protected-component preservation matrix

| Protected subsystem | Status | Detail |
|---|---|---|
| `#eyeAssembly` | preserved unchanged (id/role) | same wrapping `<g>`, same `viewBox="-760 -440 1520 880"` |
| outer almond silhouette | preserved unchanged | lid `d=` values byte-identical (see below) |
| `.eye-lid-upper` | preserved unchanged | identical path, class, stroke tokens |
| `.eye-lid-lower` | preserved unchanged | identical path, class, stroke tokens |
| optical center | preserved unchanged | still `(0,0)` in the same viewBox |
| `#focusCore` | preserved id, internally expanded | 1 flat disk → 8 layered pieces (below) |
| `#opticalChamber` | preserved id, internally expanded | 1 circle → 3 non-identical boundaries + hierarchy ticks + 1 signal |
| `.ring-system` | preserved unchanged (wrapper) | same 6 `.ring-level[data-ring]` children in the same order |
| all six semantic ring levels (`r1`–`r6`) | preserved ids/radii, internally expanded | same 6 radii (140/160/180/200/222/246), same stroke-widths, piece count 15→27 |
| `#leftControl` | preserved id, internally expanded | bracket/connector/4 dots kept exactly; +1 sleeve piece |
| `#rightBridge` | preserved id, internally expanded | line/ring/signal/terminal kept exactly; +1 sleeve +1 anchor piece |
| horizontal optical axis | preserved unchanged | `.qmf-axis` at y=0, identical `d=` |
| vertical optical axis | preserved unchanged | `.qmf-axis` at x=0, identical `d=` |
| quiet measurement guides | preserved unchanged | entire `.qmf` group byte-identical to Prototype 01 |
| `setVisibleEyeState()` | preserved unchanged | identical signature, validation, class-swap logic |
| `getVisibleEyeState()` | preserved unchanged | identical implementation |
| `VisibleEyeLife` | preserved, additionally exposed | identical internal behavior; now also `window.VisibleEyeLife` (pure addition, was module-private in P01) |
| `watching` | preserved, more coordinated deltas | still the baseline/no-override state |
| `searching` | preserved, more coordinated deltas | now also moves the orientation signal + a ring red path + the gateway plate |
| `found` | preserved, more coordinated deltas | now also shifts the left-gate plate + tightens the core reflection |
| `solved` | preserved, more coordinated deltas | now also resolves chamber-inner boundary + all plates |
| `embodied` | preserved, more coordinated deltas | now also swaps the pupil to a richer gradient |
| `idle` | preserved, more coordinated deltas | now also dims the orientation signal |
| reduced-motion handling | preserved unchanged | same dual guard (`eye-motion-ok` class + direct `@media` block) |
| `?debug=1` controls | preserved unchanged | identical panel-construction code, identical gating |
| responsive shell | preserved unchanged | same `.stage`/`svg` CSS, same `@media(max-width:480px)` rule |

**No protected subsystem was deleted.** Nothing in the table above is marked
"technically replaced" — every protected id/class/role found a home in
Prototype 02, either byte-identical or as the same element carrying more
internal detail.

## Prototype 01 → Prototype 02 component mapping

| Prototype 01 | Prototype 02 successor | Relationship |
|---|---|---|
| `.core-rim` (r=72) | `.core-rim` (r=76) | same class/role, radius nudged for the new inner layers ("approximate outer scale") |
| `.core-body` (flat fill, r=64, centered) | `.core-body` (gradient fill, r=56, offset to (3,-2)) | same class/role — now the *inner pupil* layer specifically, with the gaze offset |
| — (no chamber layer existed) | `.core-chamber` (new, r=68) | new layer inserted between rim and pupil |
| — | `.core-reflection-soft` (new) | new layer |
| — | `.core-shadow-lower` (new) | new layer |
| `#catchlightPrimary` | `#catchlightPrimary` | unchanged id, unchanged `cx/cy/r` (14,-18,13) |
| `#catchlightSecondary` | `#catchlightSecondary` | unchanged id, unchanged `cx/cy/r` (-4,4,5) |
| `.chamber-boundary` (1 circle, r=118) | `.chamber-boundary` (r=118, now an arc with 1 gap) + `.chamber-boundary-outer` (new, r=132) + `.chamber-boundary-inner` (new, r=104) | same class/role for the kept one; two new nested nesting boundaries added |
| 2× `.tick-accent` (duplicate red ticks) | 1× `.chamber-orientation-signal` (filled wedge) | documented successor — the brief asked for "one controlled Morning Wine orientation signal," so the two duplicate accent ticks were consolidated into one clearer wedge marker; the `.tick`/`.tick-major` ticks themselves are otherwise unchanged (51 of the original 60 kept, see below) |
| 15 ring `<path class="seg">` | 27 ring `<path class="seg"|"plate">` + 4 `.connector-bridge` + 2 `.channel-backing` | internal expansion, see per-ring counts below |
| `.lc-bracket`, `.lc-connector`, 4× `.lc-dot` | identical, plus new `.lc-sleeve` | unchanged pieces + 1 new structural-mass piece |
| `.rb-line`, `.rb-signal-ring`, `#bridgeSignal`, `.rb-terminal` | identical, plus new `.rb-sleeve` + `.rb-terminal-anchor` | unchanged pieces + 2 new structural pieces |

## Focus-core layer inventory (8 layers, back to front)

| # | Layer | Element | Notes |
|---|---|---|---|
| 1 | outer optical rim | `.core-rim` circle r=76 | flat white stroke, unchanged role |
| 2 | recessed dark chamber | `.core-chamber` circle r=68 | `fill:url(#coreChamberGrad)` — restrained radial gradient, darker toward center |
| 3 | inner black pupil | `.core-body` circle r=56, center (3,-2) | `fill:url(#corePupilGrad)` — restrained radial gradient; center offset gives the gaze bias (item 8) |
| 4 | soft off-axis tonal reflection | `.core-reflection-soft` ellipse (-16,14) rx22 ry15 | `fill:url(#softReflectionGrad)` fading to transparent, lower-left, opposite the catchlights |
| 5 | primary catchlight | `#catchlightPrimary` | unchanged position (14,-18) r13 |
| 6 | secondary catchlight | `#catchlightSecondary` | unchanged position (-4,4) r5 |
| 7 | restrained lower internal reflection/shadow | `.core-shadow-lower` (annulus wedge, r 38→54, 95°→265°, centered on the pupil) | flat 22%-opacity black, no gradient needed |
| 8 | directional gaze bias | pupil center offset (3,-2) instead of (0,0) | ties the core's attention to the same upper-right band as the ring red-signal path (section 10) |

Exactly 3 gradients exist in the whole file (`coreChamberGrad`, `corePupilGrad`
+ its embodied-state swap `corePupilGradEmbodied`, `softReflectionGrad`), all
inside `<defs>`, and grep-confirmed used only by `.core-chamber`/`.core-body`/
`.core-reflection-soft` — nowhere else in the piece. No `<filter>`, no blur,
no drop-shadow, no box-shadow, no broad external glow anywhere (grep-verified,
see the verification section).

One implementation correction made during this pass: an initial draft tried
to make the `embodied` state deepen the pupil via a CSS custom property
(`--pupil-fill`) read inside the `<radialGradient>`'s `<stop>`. That doesn't
work — `<defs>` is a **sibling** of `#eyeAssembly`, not a descendant, so a
custom property set via `#eyeAssembly.state-embodied .core-body{...}` cannot
cascade into the gradient's `<stop>`. Fixed by defining a second gradient
(`corePupilGradEmbodied`, marginally richer stops) and swapping which URL
`.core-body`'s `fill` resolves to under `.state-embodied` — a plain CSS rule
scoped correctly to a real descendant relationship.

## Optical-chamber inventory

| Element | Radius | Gap | Role |
|---|---|---|---|
| `.chamber-boundary-outer` | 132 (new) | 170°–200° (30°, quiet/left-lower zone) | outer nested boundary |
| `.chamber-boundary` | 118 (kept radius) | 215°–235° (20°, different location than the other two) | the original boundary, now non-circular |
| `.chamber-boundary-inner` | 104 (new) | 130°–150° (20°, aligned with tick interruption zone 1) | inner nested boundary, brightest (white) stroke — "raised lip" |
| `.chamber-ticks` | r 88→98/104 | — | 51 of the original 60 ticks survive; 2 interrupted zones removed (126°–152°, 208°–232°, 9 ticks total) |
| `.chamber-orientation-signal` | r 86–108 | — | 1 filled wedge at ≈340° (attention band), replacing the 2 old duplicate accent ticks |

All three boundary gaps sit in the 130°–235° band — the "quiet counterweight"
side (section 10) — so the chamber stays fully solid and continuous through
the 300°–360° attention band where the orientation signal and the strongest
ring reds live. This is a deliberate, single coherent asymmetry, not
scattered gaps.

## Ring piece count per level

| Level | Radius | Stroke-width | Pieces (seg+plate) | Roles present |
|---|---|---|---|---|
| r1 (inner) | 140 | 9.5 | 5 | ink ×3, red-78 ×1, red-100 ×1 |
| r2 (inner) | 160 | 8.5 | 4 | support ×2, red-78 ×1, red-100 ×1 |
| r3 (middle) | 180 | 8 | 5 | ink ×2, support ×2, red-78 ×1 |
| r4 (middle) | 200 | 7 | 6 | support ×2, quiet ×2, red-50 ×1, gateway-plate ×1 |
| r5 (outer) | 222 | 6.5 | 3 | quiet ×3 |
| r6 (outer) | 246 | 6 | 4 | quiet ×3, left-gate-plate ×1 |

**Total: 27 pieces** (up from 15 in Prototype 01), within the brief's
target bands (inner 3–5 ✓, middle 3–6 ✓, outer 2–4 ✓ — r6's 4 includes its
plate). Plus 4 `.connector-bridge` radial links between adjacent levels and
2 `.channel-backing` arcs (the graphite backing drawn under the 2 white
plates for a visible beveled edge — see Depth/occlusion below). None of the
27 pieces is a random extra line: every one carries a role (major segment,
transition segment, or a gate/plate) documented in the table above.

## Left-control integration

- `.lc-bracket`, `.lc-connector`, and all 4 `.lc-dot` (incl.
  `#indicatorActive`) are byte-identical to Prototype 01 — same position,
  same 4 indicators, same single active Morning Wine indicator.
- New `.lc-sleeve`: a filled, 10%-opacity graphite rectangle from x=-292 to
  x=-246 (i.e. spanning from the bracket to r6's radius), giving the
  connector actual structural mass rather than a floating thin line.
- New `.plate.role-left-gate-plate` on ring **r6** at its 164°–196° gap,
  backed by a wider `.channel-backing` arc underneath (drawn first, in the
  same `<g data-ring="r6">`, so it reads as a beveled graphite edge around a
  raised white plate) — this is the ring system physically "opening and
  stepping around" the assembly, exactly at the angle the bracket sits.
- A `.connector-bridge` at 180° links r5→r6 across the same gate, so the
  assembly reads as one continuous mechanical path from the bracket into the
  ring system rather than a separate UI control placed beside the eye.

## Right-bridge integration

- `.rb-line`, `.rb-signal-ring`, `#bridgeSignal`, and `.rb-terminal` are
  byte-identical to Prototype 01 — same position, same direction, same
  signal point, same terminal.
- New `.rb-sleeve`: a filled, 10%-opacity graphite rectangle from x=200 to
  x=252 (spanning from r4's radius to just past the bridge's own line
  start), the same structural-mass technique as the left sleeve.
- New `.plate.role-gateway-plate` on ring **r4** at its 346°–14° gap (the
  widest gate of the whole system, wrapping through 0°), backed by a
  `.channel-backing` arc — the ring visibly opens into a real gateway that
  the bridge sleeve continues outward from.
- New `.rb-terminal-anchor`: two short perpendicular ticks at the terminal
  (x=380, y=±14) giving the terminal a visibly anchored, not-floating end.
- Two `.connector-bridge` links (r4→r5 and, via the shared corridor, the
  outer rings' aligned gaps at 0°) tie the whole right-hand corridor
  together from the core outward to the bridge.

## Red signal-path mapping (operational role, not hemisphere)

| Level | Red pieces | Level of red | Notes |
|---|---|---|---|
| r1 (nearest core) | 2 of 5 | red-78, red-100 | strongest, in the 272°–352° attention band |
| r2 | 2 of 4 | red-78, red-100 | continuing the same band outward (270°–344°) |
| r3 | 1 of 5 | red-78 | restrained continuation (324°–346°) |
| r4 | 1 of 6 | red-50 | weaker still, approaching the bridge gateway (290°–336°) |
| r5 | 0 of 3 | — | quiet outer field, zero red |
| r6 | 0 of 4 | — | quiet outer field, zero red |
| left-control | 1 indicator (`#indicatorActive`) | red-100 | unchanged from Prototype 01 |
| right-bridge | 1 signal (`#bridgeSignal`) | red-100 | unchanged from Prototype 01 |
| optical chamber | 1 orientation signal | red-100 | new, consolidated from 2 old accent ticks |

Red strength *decreases monotonically* from r1 to r6 (strong → strong →
restrained → weak → none → none) and stays inside one consistent angular
band (270°–352°, i.e. the same upper-right attention direction the core's
gaze offset and the chamber's orientation signal also point toward) at every
level it appears. It is not a hemisphere split and does not repeat as
semicircles — confirmed by inspection of the piece table above (no ring has
red spanning more than 60° of arc, and 2 of 6 levels carry no red at all).

## Depth / occlusion method

Three concrete techniques, all restrained (no 3D extrusion, no broad drop
shadows — grep-confirmed zero `filter`/`blur`/`drop-shadow`/`box-shadow` in
the file):

1. **Two-pass plate/channel occlusion.** Both gate plates (`r4`'s
   gateway-plate, `r6`'s left-gate-plate) are drawn twice at the identical
   `d=` path: first a wider `.channel-backing` arc in graphite at low
   opacity (0.35), then a narrower `.plate` arc in white on top, in the same
   ring-level `<g>` (document order = paint order, so the white plate visibly
   sits above/inside the graphite channel with a beveled edge on both sides).
2. **Structural sleeves.** `.lc-sleeve`/`.rb-sleeve` are low-opacity filled
   rectangles bridging the control assemblies to the ring system's edge,
   giving the impression that the connector line passes *through* a solid
   structural mass rather than floating in empty space.
3. **Connector bridges crossing gaps.** 4 short radial `.connector-bridge`
   lines physically link one ring level's edge to the next level's edge
   at chosen angles (340° ×2 in the attention band, 0° and 180° in the two
   gateway corridors), reading as small mechanical linkages between planes
   rather than the levels being independent, unconnected rings.

## State-by-state visual changes

All deltas below are in *addition* to every rule already present in
Prototype 01 (none were removed) — see the stylesheet for the exact
selectors.

| State | New coordinated changes this pass adds |
|---|---|
| watching | none (still the resting baseline — by design) |
| searching | orientation-signal opacity 0.85→1 + micro-translate (1.5px,-1px); ring r3's red-78 piece brightens 0.85→0.95 stroke-opacity; gateway-plate stroke-opacity →1 |
| found | left-gate-plate translateX(-2px) — visible gate-alignment change; core-reflection-soft opacity 1→0.7 ("reflection tightens"); gateway-plate translateX(1.5px) |
| solved | chamber-boundary-inner stroke-opacity →1 ("chamber gains clarity"); all `.plate` stroke-opacity →1; role-red-50 stroke-opacity 0.7→0.85 (in addition to the existing red-100/red-78 rules) |
| embodied | `.core-body` fill swaps from `corePupilGrad` to the marginally richer `corePupilGradEmbodied` — "core material becomes slightly richer," no burst |
| idle | `.chamber-orientation-signal` opacity 0.85→0.35 — the awareness signal recedes along with the ring reds, exactly as specified ("operational red recedes; structure remains visible") |

Every state remains the same eye and the same personality — no state
introduces a new color, a new element category, or a different visual
concept; each only nudges opacity/position/gradient-choice on elements that
already exist in every other state.

## Movement amplitudes and durations

| Property | Duration | Easing | Amplitude |
|---|---|---|---|
| catchlight / orientation-signal transform | 0.5–0.55s | `cubic-bezier(0.4,0,0.2,1)` / ease | translate ≤ 1.6×1.1px |
| bracket / gate-plate translateX | 0.45–0.5s | `cubic-bezier(0.4,0,0.2,1)` | 2–4px |
| bridge signal opacity/radius | 0.5s | ease | opacity 0.35–1, radius 6–7.5 |
| ring/chamber/plate opacity | 0.5s | ease | ≤ 0.3 delta on any single property |
| core-body gradient swap | instant (no transition — two discrete `url()` references are not interpolable) | — | one-shot, imperceptible as a "cut" given how close the two gradients are |

All durations fall inside the 0.4–0.9s band the brief allows; nothing
repeats, spins, pulses the whole eye, flashes, or bounces (grep-confirmed:
no `@keyframes`, no `<animate>`, anywhere in the file).

## Responsive bounding-box comparison (Prototype 01 vs Prototype 02)

Measured via Playwright `page.locator('#eyeAssembly').boundingBox()` against
both files at the same 4 viewports in the same run:

| Viewport | P01 box (x,y,w,h) | P02 box (x,y,w,h) | P01 w%/h% | P02 w%/h% |
|---|---|---|---|---|
| 390×844 | (19.7, 324.2, 350.6, 195.5) | (19.7, 324.2, 350.6, 195.5) | 89.9% / 23.2% | 89.9% / 23.2% |
| 412×915 | (20.1, 353.8, 371.9, 207.4) | (20.1, 353.8, 371.9, 207.4) | 90.3% / 22.7% | 90.3% / 22.7% |
| 768×1024 | (57.6, 330.0, 652.7, 364.0) | (57.6, 330.0, 652.7, 364.0) | 85.0% / 35.6% | 85.0% / 35.6% |
| 1440×900 | (393.6, 268.0, 652.7, 364.0) | (393.6, 268.0, 652.7, 364.0) | 45.3% / 40.4% | 45.3% / 40.4% |

**The bounding box is pixel-identical at all 4 viewports** — not merely
"materially consistent." This follows directly from section 2's outer-image
lock: the elements that determine `#eyeAssembly`'s extremal bounds (the lid
paths and the `.qmf` guide circles/lines) were kept byte-for-byte unchanged,
so no internal refinement inside the core/chamber/rings could have moved the
outer footprint even if it had wanted to.

## Reduced-motion verification

Same dual guard as Prototype 01, unchanged:
`html:not(.eye-motion-ok) #eyeAssembly *{transition:none!important}` plus an
independent `@media(prefers-reduced-motion:reduce)` block. Verified via
Playwright's `reducedMotion:'reduce'` emulation: `<html>` does **not**
receive `eye-motion-ok` (confirmed `false`). Every state's new deltas
(orientation-signal opacity, plate translateX, gradient swap, etc.) are all
static end-values, so reduced-motion users see the identical final state
differences, just without the in-between motion.

## Debug-controls verification

- No query string: `#eyeDebugPanel` count = 0.
- `?debug=1`: `#eyeDebugPanel` count = 1.
- `window.setVisibleEyeState`/`window.getVisibleEyeState` are functions
  regardless of the debug flag; calling `setVisibleEyeState('found')` with
  no debug flag returns `'found'` and `getVisibleEyeState()` reads back
  `'found'` — confirmed via Playwright. `window.VisibleEyeLife` is now also
  an exposed object (addition, not present as a global in Prototype 01).
- All 6 per-state screenshots were captured with **no** `?debug=1` in the
  URL, so none contain the debug panel.

## Forbidden-effects / well-formedness verification

- `xml.dom.minidom` parses the extracted `<svg>...</svg>` block without
  error: well-formed.
- `grep -n -E "animate|<filter|feGaussianBlur|blur\(|drop-shadow|box-shadow|glow|@keyframes"`: **zero matches**.
- The only gradients in the file are the 3 listed in the focus-core layer
  inventory, and grep confirms `fill:url(...)` is used exclusively by
  `.core-chamber`, `.core-body`, and `.core-reflection-soft` (plus the
  `embodied`-state swap rule for `.core-body`) — no gradient anywhere else
  in the piece, matching the brief's restriction.

## Production-untouched confirmation

`git diff --stat` against `Problem-v86-DARK-ONLY.html`,
`VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-01.html`, and
`VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-01-NOTE.md` is **empty** — none of
them were touched while building Prototype 02. `git status --short` before
committing shows only the new Prototype 02 files as untracked additions. No
Prototype 03 was created. No other prototype, experiment, or production file
was modified.

## Files delivered

1. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-02.html`
2. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-02-desktop.png` (clean, 1440×900)
3. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-02-mobile-390x844.png` (clean)
4. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-02-close-mechanism.png` (clean, cropped around `#opticalChamber`)
5. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-02-state-watching.png`
6. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-02-state-searching.png`
7. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-02-state-found.png`
8. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-02-state-solved.png`
9. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-02-state-embodied.png`
10. `VISIBLE-EYE-MECHANICAL-FOCUS-PROTOTYPE-02-state-idle.png`
11. this note

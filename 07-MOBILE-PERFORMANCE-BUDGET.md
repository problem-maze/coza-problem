# Mobile Performance Budget

Primary target hardware class: 4 GB Android phones comparable to Samsung A05s and Oppo A55.

## Historical evidence
A strong previous phone run demonstrated roughly:
- avg FPS around 59,
- avg frame time around 17 ms,
- p95 around 16.8 ms,
- p99 around 16.8 ms,
- jank around 0.5%,
- zero Long Tasks in one run.

A later run remained near 58.8 FPS with about 0.6% jank and only one 52 ms Long Task.

This proves the device class can sustain a living scene when ownership and cadence are controlled. It does not validate the old renderer.

## Build-phase policy
Z0–Z9: use smoke checks to catch freezes and severe regressions. Do not derail visual construction for tiny performance deltas.

Z10: run full hardening.

## Z10 target envelope
Preferred standalone target:
- average FPS >= 55,
- p95 approximately <= 20 ms,
- jank <= 1%,
- no repeated >50 ms clusters,
- no recurring Long Task pattern,
- no permanent freeze,
- clean background/foreground recovery without page reload.

## Required benchmark fields
- avg/current/min FPS,
- avg frame time,
- p95/p99,
- frames >33.3 ms,
- frames >50 ms,
- jank percentage,
- Long Tasks count and max,
- max frame gap,
- per-layer update/render rate and max cost,
- viewport, DPR, device memory when available,
- worst phase/layer.

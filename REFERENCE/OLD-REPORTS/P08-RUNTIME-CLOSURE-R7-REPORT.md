# P08 Natural Eye — Runtime Closure R7

## Purpose

R7 fixes the repeated **full-stop failure mode** without changing the known-good R5 visual motion engine.

## What is locked

The following R5 motion functions were byte-for-byte preserved in R7:

- `displacement`: UNCHANGED
- `waveHeight`: UNCHANGED
- `surfaceSlope`: UNCHANGED
- `drawPhysicalReflection`: UNCHANGED
- `drawWater`: UNCHANGED
- `drawDistantMist`: UNCHANGED
- `drawWaterfallMotion`: UNCHANGED
- `drawDistantAir`: UNCHANGED
- `drawFoliage`: UNCHANGED

The scheduler wrappers for Atmosphere/Foliage changed only to support runtime cadence control and fault isolation. Their underlying visual draw functions remain preserved.

## Permanent stop-prevention architecture

- One monotonic `SceneClock`; recovery never resets scene phase.
- A draw error in Water / Atmosphere / Foliage is isolated to that layer.
- The next animation frame is scheduled from a `finally` path, so a thrown exception cannot permanently kill the scene loop.
- Layer failures are retried automatically with a short bounded backoff.
- A 1-second watchdog restores a dropped `requestAnimationFrame` owner when the page is visible.
- Android lifecycle recovery is covered by:
  - `visibilitychange`
  - `pagehide`
  - `pageshow`
  - `focus`
- Pixel Motion remains a startup validation only; it does not stay in the hot path.
- Adaptive load shedding changes **cadence only**:
  - FULL
  - SAFE
  - LITE
  It never disables Water / Atmosphere / Foliage and never changes their motion math.

## Validation executed here

- JavaScript syntax: PASS
- `<video>`: 0
- `:has()`: 0
- `inset:0`: 0
- Headless Chromium startup: PASS
- Water Pixel Motion: LIVE
- Atmosphere Pixel Motion: LIVE
- Foliage Pixel Motion: LIVE
- Scene pixels changed over time: PASS
- One-shot injected Canvas draw failure:
  - affected layer error isolated
  - global animation continued
  - no page-level uncaught error
- Simulated dropped rAF scheduling:
  - watchdog restored loop automatically
  - recovery count increased
  - SceneClock continued instead of resetting

## GitHub status

Read access to `problem-maze/coza-problem` worked and `PERF_SYSTEM_Coza.md` was consulted.

Two write attempts were made:
1. Create branch `fix/p08-natural-eye-runtime-closure`
2. Create `P08-RUNTIME-CLOSURE-R7.md` on `claude/light-maze-eye-depth-yfvhch`

Both returned:

`403 Resource not accessible by integration`

So no GitHub write or branch creation is being claimed.

## Acceptance rule before P09

Use R7 on the real phone. It must satisfy both:

1. **No full stop**
   - movement remains visible
   - background/foreground return recovers automatically
   - no manual reload needed

2. **Motion remains real**
   - Water / Atmosphere / Foliage show `LIVE / LIVE / LIVE`

Only after that should performance tuning continue. Future optimization must simplify cadence/quality, not replace the proven R5 visual engine.

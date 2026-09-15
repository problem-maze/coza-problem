# Runtime Kernel Contract

Create one top-level owner: `NaturalEyeRuntime`.

Recommended responsibilities:

```js
NaturalEyeRuntime = {
  clock,
  rafId,
  running,
  visible,
  active,
  mode,
  layers,
  diagnostics,
  start(), stop(), pause(), resume(), frame(now),
  registerLayer(name, layer),
  setMode('proof' | 'natural')
};
```

## SceneClock
- monotonic,
- pause-aware,
- background/foreground does not restart the visual sequence,
- layers do not own private time origins.

## Layer contract

```js
{
  name,
  enabled,
  targetHz,
  init(ctx),
  update(sceneState),
  render(sceneState),
  dispose()
}
```

No layer may schedule its own RAF.

## Failure isolation
An optional layer exception may degrade that layer, but it must not permanently kill the top-level scene loop. Repeated errors must remain visible in diagnostics.

## Diagnostics must separate
- runtime alive,
- update count,
- render count,
- pixel-change evidence where measurable,
- last error,
- resume count,
- clock reset count,
- current tier/mode.

A single `LIVE` label is insufficient.

## Final integration lifecycle
When moved into Problem Home, register the scene with `PageLife`. Leaving Home or hiding the document must stop expensive work, not merely hide it visually.

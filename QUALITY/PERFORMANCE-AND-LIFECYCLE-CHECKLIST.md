# Performance and Lifecycle Checklist

Before passing Z10:
- one top-level RAF owner,
- no orphan recurring timer,
- no work while the scene/page is inactive,
- background/foreground resumes without reload,
- SceneClock does not unexpectedly reset,
- no permanent freeze after notification shade/app switch,
- layer errors are visible in diagnostics,
- benchmark captures worst layer/phase,
- low/reduced-motion fallback remains usable,
- optimization reduces cost without turning the scene visually dead.

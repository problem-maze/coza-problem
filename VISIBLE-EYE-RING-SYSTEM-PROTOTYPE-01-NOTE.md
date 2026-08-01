# Ring System Prototype 01 — delivery note

**Ring layers:** 8 total, in 3 depths (matches the "approximately 7-9" target).
- Inner identity (red): `ringR1`, `ringR2`, `ringR3` — rx/ry 48/34 → 80/55, all confined to the upper-right quadrant around the pupil (span 100°-158°).
- Mid graphite: `ringM1`, `ringM2`, `ringM3` — rx/ry 96/62 → 150/91, each a different ~230-260° open arc with its gap rotated to a different position so no two gaps align radially.
- Outer quiet: `ringO1`, `ringO2` — rx/ry 184/106 and 216/118, the widest and lightest, receding into the white field.

Plus 3 quiet anchor nodes (small circles, not connected to anything) — one graphite, one red, one quiet-gray — placed off to the sides, not on a spoke or radial line from the pupil.

**Color-role mapping** (all via CSS custom properties on the `<svg>`, `color-mix()` for the two lighter reds):
| Role | Token | Value | Used on |
|---|---|---|---|
| Background | `--bg` | `#FAFBFD` | page + `<html>/<body>` |
| Surface | (literal) | `#FFFFFF` | `.stage` card |
| Structural graphite | `--ink` | `#24272E` | outer lid, pupil |
| Supporting graphite | `--support` | `#7C8088` | mid-system rings, one node |
| Quiet graphite | `--quiet` | `#C9CDD3` | outer-system rings, one node |
| Identity red (full) | `--red` | `#D17B73` | `ringR1`, one node |
| Identity red (light) | `--red-72` | `color-mix(in srgb, var(--red) 72%, var(--bg) 28%)` | `ringR2` |
| Identity red (lightest) | `--red-40` | `color-mix(in srgb, var(--red) 40%, var(--bg) 60%)` | `ringR3` |

**How gaps and weights create hierarchy:**
- **Weight decreases outward monotonically**: stroke-width runs 2.5 (`ringR1`, innermost) down to 0.7 (`ringO2`, outermost), and stroke-opacity runs 0.95 down to 0.28 the same direction — so the eye reads "boldest at the pupil, quietest at the edge" without any element needing to be a different shape family.
- **Gaps are staggered, not aligned**, so no two rings' openings sit at the same angle — this is what keeps 8 concentric-ish arcs from reading as a radar/target: each ring shows a different "slice" of itself, so the eye never sees a repeated full ring or a spoke-like alignment of gap edges.
- **Red is scoped to one quadrant** (upper-right of the pupil, ~100-160° of arc) rather than distributed around the full circumference, so it reads as concentrated identity rather than a second color system competing with graphite.
- **Radius and horizontal compression both vary per ring** (rx/ry ratio ranges from ~1.36 on the innermost red ring to ~1.83 on the outermost quiet ring), so the layers don't read as perfectly repeated circles even though they share one center — this, plus the staggered gaps, produces "depth without becoming a radar."

No animation, glow, blur, drop shadow, or glass effect is present — confirmed by direct inspection of the file (no `<animate>`, no `filter=`, no `box-shadow`, no `backdrop-filter`). No other prototype or production file was modified; `git status` shows only these three new files.

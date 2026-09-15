# Hard Constraints

## Project architecture
- Final product remains a single-file HTML SPA.
- Do not use CSS `:has()`.
- Do not use CSS `inset:0`; write explicit top/right/bottom/left edges.
- Preserve `transform-box: fill-box` wherever SVG transform behavior relies on it.
- Every touched JavaScript block must pass `node --check`.
- Final integration must use `PageLife` and obey the one-active-page-resource rule.
- Respect `document.hidden`, page visibility, and final page ownership.

## Repository safety
- Never modify `main` directly.
- Work on a dedicated rebuild branch.
- Never claim a commit, push, or branch creation unless it is verified.

## Visual safety
- Do not generate images.
- Do not use video as the runtime scene.
- Do not draw a literal SVG eye over nature.
- Do not use cyan/neon glow as a realism shortcut.
- Do not move static trunks, rocks, or the island body.
- Do not animate the whole photograph as one rubber sheet.

## Process safety
- No patch stacking from rejected animation builds.
- No progression past failed phone-visible gates.
- No “LIVE” label as a substitute for visible proof.
- Do not optimize by killing the living behavior. Simplify instead of silencing.

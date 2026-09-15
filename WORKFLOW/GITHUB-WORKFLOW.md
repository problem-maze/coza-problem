# GitHub Workflow

Repository: `problem-maze/coza-problem`
Reference branch: `claude/light-maze-eye-depth-yfvhch`
Verified reference head for this package: `447f3851164d082923c554f36d56e37def27c8e9`
Recommended work branch: `rebuild/natural-eye-zero-v1`

Rules:
- do not modify `main`,
- create or use a dedicated rebuild branch,
- verify every push/commit before reporting it,
- if write permission is unavailable, continue locally and report that GitHub write is blocked,
- keep standalone rebuild artifacts isolated until Z10 passes,
- integrate into Home only at Z11.

Suggested commit sequence:
- `natural-eye: lock Z0 static baseline`
- `natural-eye: lock Z1 geometry`
- `natural-eye: add Z2 runtime kernel`
- `natural-eye: prove Z3 water`
- `natural-eye: master Z4 natural water`
- `natural-eye: couple Z5 reflection`
- `natural-eye: add Z6 waterfall spray`
- `natural-eye: add Z7 atmosphere`
- `natural-eye: add Z8 foliage depth`
- `natural-eye: unify Z9 scene`
- `natural-eye: harden Z10 performance`
- `natural-eye: integrate Z11 home`
- `natural-eye: lock Z12 golden`

# Deliverable Contract

Every gate must produce:
1. a uniquely versioned HTML artifact,
2. `REPORT.md`,
3. `report.json` when metrics are involved,
4. syntax/static validation output,
5. a precise user phone-test instruction,
6. a clear PASS / FAIL / REVIEW status.

Recommended artifact names:
- `Problem-NATURAL-EYE-Z0-STATIC-v1.html`
- `Problem-NATURAL-EYE-Z1-GEOMETRY-v1.html`
- `Problem-NATURAL-EYE-Z2-RUNTIME-v1.html`
- `Problem-NATURAL-EYE-Z3-PROOF-WATER-v1.html`
- `Problem-NATURAL-EYE-Z4-NATURAL-WATER-v1.html`
- etc.

Report structure:

```md
# Gate
## Changed
## Intentionally unchanged
## Validation performed
## Evidence
## Known risks
## Phone test
## Decision
```

Stop for user evidence when the next engineering decision depends on perceptual realism. Do not stop for routine syntax checks or internal cleanup that Codex can complete itself.

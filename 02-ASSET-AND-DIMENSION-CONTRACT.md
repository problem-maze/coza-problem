# Asset and Dimension Contract

## Asset inventory

| Role | Package path | Pixel dimensions | Detected format | Authority | SHA-256 prefix |
|---|---|---:|---|---|---|
| authoritative-base | `ASSETS/AUTHORITATIVE/natural-eye-approved-base-960x640.webp` | 960×640 | WEBP | AUTHORITATIVE | `a993834ccddaf3d2…` |
| existing-desktop-composition-reference | `ASSETS/REFERENCE/natural-eye-existing-desktop-1536x1024.jpg` | 1536×1024 | JPEG | REFERENCE-ONLY | `66dc75ef095b15ef…` |
| existing-mobile-composition-reference | `ASSETS/REFERENCE/natural-eye-existing-mobile-1152x1536.jpg` | 1152×1536 | JPEG | REFERENCE-ONLY | `d4cf5ba763912281…` |
| phone-static-evidence | `EVIDENCE/phone-static-golden-691x1536.jpg` | 691×1536 | JPEG | EVIDENCE | `af4c1c94b61d8189…` |
| phone-region-map-evidence | `EVIDENCE/phone-region-map-debug-691x1536.jpg` | 691×1536 | JPEG | EVIDENCE | `76c0ff9145059c21…` |

## Critical finding from package review

The two older files originally named with a `.webp` extension are actually **JPEG-encoded bytes**.
They are therefore included here with `.jpg` filenames so file extension and binary format match.
They are reference-only and must not silently replace the authoritative 960×640 WebP.

## Authoritative source dimensions

- Native image: **960×640**
- Aspect ratio: **3:2**
- Geometry work must use either:
  - native 960×640 coordinates, or
  - normalized coordinates in `[0,1]` converted from the native dimensions.

Do not use the older 640×427 approximation as the new authoritative geometry system.
That approximation introduces avoidable alignment drift.

## Standalone development frame

For Z0 through Z10, keep the scene at the exact 3:2 composition.
The phone may display a landscape scene inside a portrait page; that is intentional.
Do not crop the base during geometry authoring.

## Target phone CSS viewports

Primary validation examples:

- `384×731` CSS pixels, approximately `2.81` DPR on one tested phone.
- `390×844` CSS pixels.
- `360×800` CSS pixels.

These viewport dimensions are not image dimensions. Do not bake device pixels into geometry.

## Integration references

The existing composition references are:

- desktop reference: **1536×1024** (3:2), reference only.
- portrait/mobile reference: **1152×1536** (3:4), reference only.

They help Codex understand historical Home composition but are not permitted to replace the authoritative source without user approval.

## Phone evidence dimensions

Both supplied phone screenshots are **691×1536** captured images.
They are evidence of how the static scene and the old region map appeared on the user device; they are not layout targets.

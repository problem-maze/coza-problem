# Natural Eye A1 — Reality Engine v1

## Why this rebuild exists

The previous A1 chain could execute RAF/draw work while still looking static on the phone.
This rebuild removes the fragile visual path instead of stacking another opacity patch.

## Runtime architecture

- One `requestAnimationFrame` owner.
- Water/Reflection drawn at 20 Hz.
- Atmosphere/Waterfall drawn at 12 Hz.
- Same monotonic scene clock across pause/resume.
- No video.
- No generated image.
- No external runtime assets.
- Uses the existing approved Natural Eye base image embedded in the file.

## Water

The water layer now uses coherent horizontal strip refraction of the actual lake pixels.
This means the photographic ripple texture itself moves instead of relying on tiny tile
changes that can be hard to read on a phone.

The lake uses a direct canvas clip path with an island hole. It does not depend on an
external/embedded water-mask decode and does not use `destination-in`.

## Reflection

Reflection is drawn from the same wave phase used by the water refraction. It is a narrow,
warm-white sun path, not a cyan glow and not an unrelated animation loop.

## Atmosphere

Existing photographic valley mist is augmented with slow translucent moving veils.
The motion is localized to distant depth zones instead of tinting the whole picture.

## Waterfall

The waterfall uses a small fixed number of coherent falling strands plus soft spray.
No new image or video asset is used.

## Failure-mode removals

- Removed mask-image boot dependency.
- Removed destination-in compositing dependency.
- Removed screen blend dependency.
- Removed all-or-nothing multi-asset startup.
- Removed multiple independent animation clocks.

## Static validation

- single_requestAnimationFrame_owner: PASS
- no_video: PASS
- no_mask_image_dependency: PASS
- no_destination_in: PASS
- no_screen_composite: PASS
- no_css_has: PASS
- no_inset_zero: PASS
- base_image_valid: PASS

Base image SHA-256: `a993834ccddaf3d21b847584273b31ec07e8a37df8496570623e4c762c4c66ab`

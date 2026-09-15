# A1 DOM/SVG Reality Pipeline v1

This is a replacement visual pipeline, not another patch on the Canvas runtime.

- Base image SHA-256: `a993834ccddaf3d21b847584273b31ec07e8a37df8496570623e4c762c4c66ab`
- Generated images: none
- External assets: none
- `<canvas>` elements: 0
- `requestAnimationFrame`: 0
- `destination-in`: 0
- `globalCompositeOperation`: 0
- `:has()`: 0
- `inset:0`: 0
- `transform-box:fill-box`: 4
- Water strips: 18
- Reflection glints: 17
- Mist layers: 3
- Waterfall paths: 3
- Spray fields: 2

Why:
Repeated phone tests showed execution could be alive while Canvas changes were not
visually convincing. This build removes Canvas compositing from the visual path entirely
and uses DOM/SVG/CSS, while still moving the original approved photograph rather than
creating a replacement image.

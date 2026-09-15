# Living Natural Eye — Correct Build Order

The earlier static Home integration succeeded at placing a natural scene, but it did not create a living experience. The scene was effectively a large navigation target with no causal environmental response.

The correct order is:
1. define what “alive” means,
2. build reliable scene regions/layers,
3. build the runtime kernel,
4. make water visibly move,
5. make motion natural,
6. couple reflection and waterfall,
7. add atmosphere and foliage,
8. harden lifecycle/performance,
9. integrate with Problem Home,
10. mirror the same interaction meaning into Moon.

## Living interaction contract for final Home integration
- `rest`: very quiet baseline motion.
- `noticed`: pointer/touch presence produces a tiny depth/light bias.
- `looking`: short intentional drag over water may create a restrained response while preserving vertical page scrolling.
- `found`: central interaction clarifies the CTA and meaning without celebration effects.
- `transition`: explicit CTA enters Solve while preserving intent.

## Important boundary
Do not add interactivity before the standalone environmental motion itself looks believable. The user explicitly rejected synthetic-looking movement; therefore environmental realism is a prerequisite for “living response.”

## Tier behavior after integration
- high: full accepted living response,
- mid: simplified but still alive,
- low / reduced motion: stable photograph, clear focus/CTA, no expensive scene loop.

## Verification before final release
- pointer, touch, keyboard,
- Natural/Moon toggle and reload persistence,
- leave Home and return without leaked RAF/listeners,
- reduced motion and low tier,
- `node --check`,
- zero new `:has()` and `inset:0`,
- asset-size review,
- phone layouts at 360, 384/390, and wider reference widths.

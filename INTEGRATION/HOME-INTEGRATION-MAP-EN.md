# Problem Home — Natural Eye Integration Map

This is an English consolidation of the earlier Home Natural Eye build specification.

## Product meaning
Problem is not a decorative AI image and not merely a chatbot. The Home scene should communicate: **see the shape before trying to solve it**.

The natural eye composition uses real environmental forms:
- natural upper wood/branch boundary as upper lid,
- lower rock/wood/vegetation boundary as lower lid,
- lake as iris,
- central island/tree mass as pupil,
- sun reflection as catchlight,
- depth layers to make the person feel located inside the place.

## Existing app hooks to preserve
- `#pageLanding`
- `.hero`
- `.hero-grid`
- `.hero-visual-wrap`
- `.hero-journey`
- `.hero-journey-media`
- `.hero-journey-blend`
- `.hero-journey-light`
- `#heroEyeSvg`
- `window.PROBLEM_HOME_EXPERIENCE`
- `window.applyHomeExperience`
- `setHeroVisual`
- `window.PageLife`
- `I18N` / `applyLang`

Do not create a second router, lifecycle manager, theme state system, or translation system.

## Theme ownership
Use one Home theme owner:

```js
localStorage.problem_home_theme = 'natural' | 'moon';
document.documentElement.dataset.homeTheme = value;
window.PROBLEM_HOME_THEME = value;
```

`PROBLEM_HOME_EXPERIENCE` chooses the scene/experience. `PROBLEM_HOME_THEME` chooses its lighting/profile. Keep these responsibilities separate.

## Natural palette
- Ivory `#F6F4EF`
- Primary text `#1C2923`
- Forest `#2F5D49`
- Moss `#718C61`
- Water `#4E8582`
- Warm sun `#C89455`

## Moon relationship
Natural and Moon are two lighting profiles of the same identity, not unrelated layouts. Preserve CTA placement, hierarchy, and central focus. Existing Moon glow remains white/ice-gray rather than cyan.

## Final interaction meaning
Once the standalone living scene is accepted, Home may support:
- `rest`
- `noticed`
- `looking`
- `found`
- `transition`

The scene should react subtly to presence without becoming a cartoon eye or cursor-chasing face.

## PageLife integration
Final scene work must register as a Home resource and stop when Home is not active or the document is hidden. Reduced motion and tier-low must keep a clear static scene and functional CTA.

## Final content
The visual remains the hero. Text and CTA must not cover the main eye geometry. Navigation to Solve must remain explicit and keyboard accessible.

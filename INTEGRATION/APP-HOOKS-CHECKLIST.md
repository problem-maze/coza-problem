# App Hooks Checklist

Before Z11 integration, Codex must search the actual repository snapshot for all readers/writers of:
- `showPage`
- `PageLife`
- `HeroLife`
- `setHeroVisual`
- `applyHomeExperience`
- `PROBLEM_HOME_EXPERIENCE`
- `PROBLEM_HOME_THEME`
- `data-home-theme`
- `perf.tier`
- `perf.tierForced`
- `I18N`
- `applyLang`
- `#pageLanding`
- `#heroEyeSvg`
- `.hero-journey`

Do not trust historical line numbers as current. Search the branch at integration time.

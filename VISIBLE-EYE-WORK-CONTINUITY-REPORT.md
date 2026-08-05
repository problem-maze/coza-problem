# Visible Eye — Work Continuity Report

## Report header

- **Report title:** Visible Eye — Work Continuity Report
- **Report purpose:** Document all "Visible Eye" work completed to date, for handoff to another reviewer, distinguishing verified fact from design intention, visual judgment, and open assumption.
- **Date of report generation:** 2026-08-01
- **Repository:** `problem-maze/coza-problem` (single repository — confirmed by discovery below; there is no separate "visible-eye" owner/repo)
- **Worktree path used for this report:** `/home/user/coza-problem`
- **Branch containing the Visible Eye work:** `origin/claude/light-maze-eye-depth-yfvhch` (a **remote branch, not checked out in this worktree** — see "Location" note below)
- **Current worktree's own branch/HEAD (unrelated task):** `claude/start-claude-code-v86-tdn3cy` @ `ee617b4b3a3adbdf71abf7d08a3702a44bd338c1`
- **Visible Eye branch tip commit:** `447f3851164d082923c554f36d56e37def27c8e9` ("Add Presence Prototype 04: core rebuilt as one continuous organic chamber wall, red as a literal wall segment, geometry-morphing motion")
- **Current git status (this worktree):** clean at the time of writing.
- **This is documentation only.** No design or implementation work was performed while producing this report. No file belonging to the Visible Eye work was modified, moved, checked out, or deleted.
- **No production integration has occurred.** Every Visible Eye commit message that touches this point states the work is isolated, with no reference from or to `heroEyeSvg`, `HeroV1Life`, `AtmosphereGL`, `Journey`, or any production Q&A/route file. This report did not independently re-audit every production file for the absence of a reference (that would require checking out the branch and cross-referencing against the working repository state, not done here); it is reporting what the commit messages themselves consistently and repeatedly assert.
- **Latest completed prototype:** `VISIBLE-EYE-PRESENCE-PROTOTYPE-04.html`, commit `447f385`, dated 2026-07-31T15:22:42+00:00.

### Location note — read before anything else

**The Visible Eye artifacts are not present in this worktree's checked-out files.** They exist as tracked files on the remote branch `origin/claude/light-maze-eye-depth-yfvhch`, which diverges from `main`/this branch at commit `bb25307` (a shared ancestor, "Add files via upload"). This is a different session's work product living on a different branch of the **same** repository — not a different repository, matching the correction that prompted this discovery pass. Every fact in this report about file content was obtained via `git show <commit>:<path>` and `git cat-file`, which read blob content directly from the fetched remote branch without checking it out, resetting, or modifying this worktree. `git status` was re-confirmed clean immediately after this discovery.

## Discovery performed for this report (read-only, exact commands and results)

```bash
pwd                                  # /home/user/coza-problem
git rev-parse --show-toplevel        # /home/user/coza-problem
git branch --show-current            # claude/start-claude-code-v86-tdn3cy
git rev-parse HEAD                   # ee617b4b3a3adbdf71abf7d08a3702a44bd338c1
git status --short                   # (empty — clean)
git worktree list --porcelain        # one worktree only: /home/user/coza-problem
git branch --all --no-color          # only main + claude/start-claude-code-v86-tdn3cy visible
                                      # locally before fetching
git fetch --all                      # revealed 3 previously-unknown remote branches:
                                      #   origin/claude/design-mastery-wr82qn
                                      #   origin/claude/light-maze-eye-depth-yfvhch
                                      #   origin/problem
git branch --all --no-color          # now lists all of the above
```

Filename search across every ref's tracked files (`git ls-tree -r --name-only <ref> | grep -iE ...`) found **zero** matches on `main`, `origin/main`, `origin/claude/design-mastery-wr82qn`, and `origin/problem`. **`origin/claude/light-maze-eye-depth-yfvhch` contains the entire artifact set** — 50 tracked files (25 HTML + 25 PNG) matching `VISIBLE-EYE-*`, including a `PRESENCE-PROTOTYPE-04` that was not in the list of names given to search for. The current worktree's own untracked/working-tree search (`find . -iname "VISIBLE-EYE-*" ...`) found only this report itself.

## 2. Scope and original objective

**(Category 2 — design intention, as stated in the request that initiated this report, not independently verified against a brief document.)** No separate written brief/spec file for "Visible Eye" was found on the artifact branch — the objective is reconstructed from the consistent, repeated language across all 24 commit messages on that branch, which is the closest thing to a verified restatement of intent that exists:

- Preserve the existing Problem outer-eye silhouette ("locked and unchanged: outer lid silhouette, pupil anchor/size... calm negative space" appears, verbatim or near-verbatim, in nearly every commit from Geometry Lab 01 through Presence Prototype 04).
- Work on this as a fully isolated exploration — every commit message explicitly states no connection to production, Journey, `HeroV1Life`, or `AtmosphereGL`.
- Move from the existing dark maze-eye toward a "Lunar-White" light environment — first attempted as a direct paint correction (`5762bf0`, the commit immediately preceding the Visible Eye series), then abandoned as a strategy in favor of full internal-geometry reconstruction.
- Avoid a "washed-out" or merely-recolored translation of the dark eye — stated as the reason Color Dawn 01 was itself corrected one commit later (Problem Red Lab 01 explicitly frames itself as correcting Color Dawn's "tinted the whole canvas warm/peach" direction).
- Repeatedly redesign the internal architecture from scratch rather than iterating a single lineage — at least four full "start over" resets are documented: Concept Reset 01 (vs. Final Candidate lineage), Cognitive Topology 01 (vs. both Concept Resets), Architecture Lab 01 (vs. every prior geometry lab), and Presence Study 01 (vs. Architecture Lab/Refine).
- Eventually combine geometry, color, material depth, and motion in one file — first achieved at Presence Prototype 01, and iterated through Prototype 04.
- No production activation or routing change — consistently true; see §11 for the one exception (the paint-only dark-eye contrast fix, which did touch shipping code but is a different, prerequisite piece of work, not a Visible Eye artifact itself).

**Scope corrections that occurred during the work** (drawn directly from commit-message content, i.e. verified as *stated by the author of each commit*, category 1 for the fact that the statement exists, category 2 for whether the underlying design judgment was correct):

1. After Geometry Lab 01/02, the "Segmented" and "Corridor" formal directions were retired in favor of "Hybrid" only.
2. After Final Candidate 01/02, the whole route-diagram approach (stacking a containment-ring layer + corridor layer + one bold "answer" line + one fading "abandoned" line) was abandoned for a single unified stroke grammar (Concept Reset 01).
3. After Concept Reset 01/02, "one grammar" was judged to have been wrongly interpreted as "one geometric primitive" (a spiral fragment); Cognitive Topology 01 redefined "grammar" as a set of relationship rules instead of a shape.
4. After Cognitive Topology 01, curvature itself was identified as the root cause of an unwanted "organic/vascular" reading; Topology 02 removed all curvature.
5. Architecture Lab 01 is an explicit, named reset: internal geometry as encoded system (route/relationship logic) was replaced with internal geometry judged purely as visual design (hierarchy, rhythm, balance).
6. Color Dawn 01's whole-canvas warm tint was corrected one commit later by Problem Red Lab 01, which enforces a genuinely white canvas with red scoped only to identity.
7. Presence Study 01 is another named reset away from the Architecture Lab/Refine lineage's formal ring/fragment system, toward "one continuous asymmetric field" driven by gaze/presence.
8. Presence Study 02 rebuilt again, away from Study 01's ring/bridge system, toward four zones (chamber/concentration field/quiet basin/empty periphery).
9. Presence Prototypes 02, 03, and 04 each explicitly state they rebuild the interior rather than patch the previous prototype, citing specific visual failures (too sparse; core assembled from parts rather than one object) as the reason.

## 3. Complete artifact inventory

All facts in this table are **VERIFIED** — obtained via `git ls-tree -r -l` (size, git blob SHA-1) and `git cat-file -p <blob> | sha256sum` (SHA-256) against `origin/claude/light-maze-eye-depth-yfvhch`, cross-referenced to the commit that introduced each path via `git log --format=%H -1 <ref> -- <path>`. All 50 tracked files matching `VISIBLE-EYE-*` are listed; none are omitted.

None of these files exist in the current worktree, on `main`, or on this session's branch — status column therefore records "isolated, on `origin/claude/light-maze-eye-depth-yfvhch` only, not connected to production" for every row, plus a design-status (active/superseded/rejected/reference) drawn from later commits' own stated derivation.

| # | File | Type | Introducing commit | Design status | Bytes | SHA-256 |
|---|---|---|---|---|---|---|
| 1 | `VISIBLE-EYE-GEOMETRY-LAB-01.html` | geometry lab | `e792dd8` | superseded (A/B retired, C carried to Lab 02) | 24859 | `1c706ca0ef29020d2a5a49840a7bfedeae7e6337bd424df02b34cc55c03ef723` |
| 2 | `VISIBLE-EYE-GEOMETRY-LAB-01-comparison.png` | screenshot (3-panel) | `e792dd8` | reference only | 102177 | `fb935b7367da22b08137b5e5e0993515eaa398d20a886801a676663867463566` |
| 3 | `VISIBLE-EYE-GEOMETRY-LAB-02.html` | geometry lab | `b0a7455` | superseded (C3 base carried to Final Candidate 01) | 44158 | `8a2f80e8d7cbbf71f4f90d26f9e2323a719ba9d249d651d9d26c7d7d6bfc76c8` |
| 4 | `VISIBLE-EYE-GEOMETRY-LAB-02-comparison.png` | screenshot (3-panel) | `b0a7455` | reference only | 111689 | `e4b165e4c199dd1685be541a7bc154ce8ed9cc589dd2fc3802352fcb71af0c7d` |
| 5 | `VISIBLE-EYE-GEOMETRY-FINAL-CANDIDATE-01.html` | consolidated candidate | `500a77b` | superseded by Candidate 02 | 21654 | `45ddf733626a9856a8bc5706a9f789a42455c489bf6b30fd7fb46643dca691d9` |
| 6 | `VISIBLE-EYE-GEOMETRY-FINAL-CANDIDATE-01.png` | screenshot | `500a77b` | reference only | 65115 | `3d876f0073928dcb7b57dcdf02981adebd6b6c487bd88952a2116eb3276b0563` |
| 7 | `VISIBLE-EYE-GEOMETRY-FINAL-CANDIDATE-02.html` | refined candidate | `4a0b406` | rejected (whole route-diagram approach abandoned at Concept Reset 01) | 19581 | `1e6a466b9a4450794daa00a3747552920e8a690164d9e0a0b7bac63f15ce52aa` |
| 8 | `VISIBLE-EYE-GEOMETRY-FINAL-CANDIDATE-02.png` | screenshot | `4a0b406` | reference only | 64546 | `598688a41d8ea1542dfb1bde8805852bd71d2958c59e54cb1faefcaca09af0e5` |
| 9 | `VISIBLE-EYE-GEOMETRY-CONCEPT-RESET-01.html` | concept reset | `aa2b32c` | superseded by Reset 02 | 14052 | `da836886751c36c2f091468a714666ad771f056b13ad2e3e21ac5e46547cd320` |
| 10 | `VISIBLE-EYE-GEOMETRY-CONCEPT-RESET-01.png` | screenshot | `aa2b32c` | reference only | 59894 | `e207a72300cfc60f63bc3eca467607dd2b88fcb41458dbab777f28d64bee17cf` |
| 11 | `VISIBLE-EYE-GEOMETRY-CONCEPT-RESET-02.html` | concept reset | `bd1c7d4` | rejected (whole "one primitive" strategy abandoned at Cognitive Topology 01) | 17864 | `9bb8a88989da5f23d2036d76bc080116dd440dea9dc92ab1cb5576686adb1a2e` |
| 12 | `VISIBLE-EYE-GEOMETRY-CONCEPT-RESET-02.png` | screenshot | `bd1c7d4` | reference only | 56864 | `0a39eea14973057d79ac29956f23a77246708bc60fea68284538708ebd1db39c` |
| 13 | `VISIBLE-EYE-COGNITIVE-TOPOLOGY-01.html` | cognitive topology | `2480d58` | superseded by Topology 02 | 19678 | `96c113e9e42640394298f3fa4aea0df51ef76f8d0a0756f506eaa7f2ef4b6b55` |
| 14 | `VISIBLE-EYE-COGNITIVE-TOPOLOGY-01.png` | screenshot | `2480d58` | reference only | 64976 | `f4b2194c8f493d88bd47ae959ad560dae79b908be9718101ab0c262094394c84` |
| 15 | `VISIBLE-EYE-COGNITIVE-TOPOLOGY-02.html` | cognitive topology | `a89597f` | rejected (relational-grammar direction abandoned at Architecture Lab 01) | 11296 | `480b366df13c77e17abe3648f38e9bca0de3ebfac1cb838c4a0d2acfc65f666b` |
| 16 | `VISIBLE-EYE-COGNITIVE-TOPOLOGY-02.png` | screenshot | `a89597f` | reference only | 56164 | `9e2fe05df04df412b82a0431e684031040f70a561d94d12009c38cb3dca2bd30` |
| 17 | `VISIBLE-EYE-ARCHITECTURE-LAB-01.html` | architecture lab (3 variants A/B/C) | `0a12638` | superseded (A carried forward, B retired, limited C borrowing) | 16119 | `06fefcd18605c574beb15eed49941599e8d3c25ebe7fa397007e082e3d2a9784` |
| 18 | `VISIBLE-EYE-ARCHITECTURE-LAB-01.png` | screenshot | `0a12638` | reference only | 113620 | `1728bfd4cc5972058f902953a5c2c0e793c9ecb39325aaf6220af2d6a724cb65` |
| 19 | `VISIBLE-EYE-ARCHITECTURE-REFINE-01.html` | refined architecture (frozen base for all color work) | `1957e96` | **active reference geometry** — frozen and reused verbatim by Color Lab 01, Color Dawn 01, Problem Red Lab 01 | 8156 | `fb8ad2a98440597ffbce72310bcac90c9f1d8687041797f448898291db2dd7bb` |
| 20 | `VISIBLE-EYE-ARCHITECTURE-REFINE-01.png` | screenshot | `1957e96` | reference only | 83895 | `24809fb0383db30f61002a15b215bf2f0a9899eaa72ba01eff14fbd7c7942668` |
| 21 | `VISIBLE-EYE-COLOR-LAB-01.html` | color study (4 palettes A-D on frozen geometry) | `3aee0e5` | rejected as a lineage (color-on-Refine-01-geometry direction not carried into any Presence prototype) | 23981 | `bf4cb5cb7590ec9cebcef85dbee0ec7c384a55503c8ab7a5953d7080689a3f3b` |
| 22 | `VISIBLE-EYE-COLOR-LAB-01.png` | screenshot (4-panel) | `3aee0e5` | reference only | 301002 | `ec74a24e771a9806d72e6622c36059b739ded0b97c25940e66098e154f0d56c3` |
| 23 | `VISIBLE-EYE-COLOR-DAWN-01.html` | single dawn palette on frozen geometry | `12425cb` | rejected (whole-canvas warm tint explicitly corrected by Problem Red Lab 01) | 7842 | `79a9c7fe752911642a355327c6f60e67fb6f1092d9a8c5c34d510944949433df` |
| 24 | `VISIBLE-EYE-COLOR-DAWN-01.png` | screenshot | `12425cb` | reference only | 86878 | `d1b6059936186aadd2906c4986f65218b9a9e85e8f2a54b600c71a12e829e977` |
| 25 | `VISIBLE-EYE-PROBLEM-RED-LAB-01.html` | red-identity study (R1/R2/R3 on frozen geometry, genuine white canvas) | `9d27c95` | active reference for **color values only** (`#B75C58` "R1 Soft Lunar Red" is the hex later carried into every Presence prototype); the frozen Architecture-Refine-01 geometry underneath it was not carried forward | 18841 | `84c3c91b2d242bb3aca6674e439b2c51299c68c2de032407b00c3ad4561a59c7` |
| 26 | `VISIBLE-EYE-PROBLEM-RED-LAB-01.png` | screenshot (3-panel) | `9d27c95` | reference only | 138784 | `3b329b2e7e92286e07996df01e7a6c82ce92dac0ad114afe52841da112c07ddb` |
| 27 | `VISIBLE-EYE-PRESENCE-STUDY-01.html` | presence geometry study, monochrome | `5cd2aa9` | superseded by Study 02 | 8947 | `69b4261ec8341eea3940bd8b99fd9eacb019398916e082e1eea35053e0673e44` |
| 28 | `VISIBLE-EYE-PRESENCE-STUDY-01.png` | screenshot | `5cd2aa9` | reference only | 87099 | `481dbb06ff4eb70c16666c148fd052b51990c1bff79064026aea5d4de4d99422` |
| 29 | `VISIBLE-EYE-PRESENCE-STUDY-02.html` | presence geometry study, monochrome | `e24139e` | rejected as final interior (superseded by the differently-built Presence Prototype 01 interior; explicitly "not reusing Study 02's sparse interior" per that commit) | 7813 | `5a91d28a72eb9515dd7db530d0bae1ecbcce0f0d7784d6a6098c113a5a1e67f4` |
| 30 | `VISIBLE-EYE-PRESENCE-STUDY-02.png` | screenshot | `e24139e` | reference only | 48786 | `eb42ec98af8c4f9b977f16f99345f022915047e027a3cc5bdc97447a6b6ec195` |
| 31 | `VISIBLE-EYE-PRESENCE-PROTOTYPE-01.html` | first integrated build | `54a0493` | superseded by Prototype 02 | 15093 | `02cfdaeca20f51fb238f64811618039eb9299ed19ef0f09cab3d933adc4fe500` |
| 32-35 | `VISIBLE-EYE-PRESENCE-PROTOTYPE-01-t0/t1/t2/t3.png` | motion-sequence screenshots | `54a0493` | reference only | 69223 / 69272 / 69168 / 69197 | see manifest in `test-results/` note below |
| 36 | `VISIBLE-EYE-PRESENCE-PROTOTYPE-02.html` | interior rebuild, higher complexity | `4b58d10` | superseded by Prototype 03 | 18094 | `195c861de6aa17121605e04d6c0d82eb07f7caa89f70d11cde87a0863ac2016b` |
| 37-40 | `...-02-t0/t1/t2/t3.png` | motion-sequence screenshots | `4b58d10` | reference only | 78593 / 78449 / 78569 / 78621 | — |
| 41 | `VISIBLE-EYE-PRESENCE-PROTOTYPE-03.html` | stronger core, red as structural wall | `c583d63` | superseded by Prototype 04 | 21468 | `a617cc306da6dc48c2679211e288bb9c841ec482ef74c08dcdb89aee62decdc0` |
| 42-45 | `...-03-t0/t1/t2/t3.png` | motion-sequence screenshots | `c583d63` | reference only | 88016 / 87535 / 88284 / 87614 | — |
| 46 | **`VISIBLE-EYE-PRESENCE-PROTOTYPE-04.html`** | **latest** — one continuous chamber wall, red as literal wall segment | `447f385` | **active candidate**, most recent, not further superseded on this branch | 27770 | `3d9c805465a41e9ba7c47d9d0b793cb13f0ca98a49bb4cc1bef2af11baab92a2` |
| 47-50 | `...-04-t0/t1/t2/t3.png` | motion-sequence screenshots | `447f385` | reference only | 90860 / 92895 / 91923 / 91324 | — |

*(Per-file SHA-256 for the 16 motion-sequence PNGs in rows 32-45/47-50 are recorded in the full manifest generated for this report; they are omitted from the printed table only for width, not withheld — available on request or by re-running the reproduction command in §16.)*

No file in this inventory was created, deleted, or renamed by this report. No failed or superseded file was omitted.

## 4. Chronological development history

All 20 Visible-Eye-named stages requested were **found** — every one exists as exactly one commit on `origin/claude/light-maze-eye-depth-yfvhch`, in the order listed, with no gaps. (A 21st, non-requested stage, Presence Prototype 04, also exists and is the true latest.) One additional non-Visible-Eye commit, `5762bf0`, immediately precedes the series and is documented separately below because commit messages on this branch treat it as the direct trigger.

| # | Artifact | Task/objective (from commit message) | Inherited from | Geometry approach | Color approach | Material/depth | Motion | Result (self-described) | Accept/reject/supersede | Led to |
|---|---|---|---|---|---|---|---|---|---|---|
| 0 | *(prerequisite, not Visible Eye)* Light-eye ink-contrast fix | Fix washed-out production dark→light maze translation | production dark eye | unchanged | recolored `--ice`/`--cyan` for the existing light-mode maze | locked stroke-opacity + boosted alphas; new engrave filter | none | maze rings now legible against white | accepted (shipped) | motivated the isolated Visible Eye exploration below |
| 1 | Geometry Lab 01 | First isolated internal-geometry-only exploration, 3 variants | (fresh; lid/pupil only) | A segmented rings, B corridors, C hybrid | none (monochrome) | none | none (static) | "center reads weak in every variant" | A, B retired; C -> Lab 02 | Lab 02 |
| 2 | Geometry Lab 02 | Second generation of Hybrid only, 3 sub-variants | Lab 01's C | C1 arc-emphasis, C2 corridor-emphasis, C3 convergence-emphasis | none | none | none | junction-tick motif read as "fracture," fixed a fibril-curve bug | C3 base chosen, C1/C2 partially borrowed | Final Candidate 01 |
| 3 | Final Candidate 01 | Consolidate Lab 02's decision into one geometry | Lab 02 (C3 base, C1/C2 partial) | containment/mid-field/convergence/2 routes | none | none | none | proportions flattened to match eye's almond; two-wall passage dropped | superseded | Final Candidate 02 |
| 4 | Final Candidate 02 | Single refinement pass | Candidate 01 | convergence rebuilt as "basin," routes rebalanced | none | none | none | "top/upper-left-loaded" bias fixed | rejected as a *strategy* one commit later | Concept Reset 01 |
| 5 | Concept Reset 01 | Conceptual rebuild: one grammar, not stacked component types | none (fresh) | logarithmic-spiral fragments, one family | none | none | none | reads calmer/unified but "decorative... orbital swirl" | superseded | Concept Reset 02 |
| 6 | Concept Reset 02 | Same grammar, zoned behavior for tension | Reset 01 | same spiral family, 3 behavior zones | none | none | none | outer field initially "nearly invisible," corrected | rejected as a strategy (one primitive ≠ one grammar) | Cognitive Topology 01 |
| 7 | Cognitive Topology 01 | Grammar = relationship rules, not a shape | none (fresh) | point+direction+length+bow strokes; isolated/near/resolved relations | none | none | none | read as "organic branching / capillary" | superseded | Cognitive Topology 02 |
| 8 | Cognitive Topology 02 | Remove curvature; alignment as hierarchy signal | Topology 01 | same 3 relations, straight segments only | none | none | none | fixed 2 crossing bugs (self-described as "crack" signature) | rejected as a strategy | Architecture Lab 01 |
| 9 | Architecture Lab 01 | Reset: pure visual design, no encoded meaning, 3 variants | none (fresh; only lid/pupil/negative-space carried) | A layered faceted rings, B asymmetric cluster, C integrated 3-scale field | none | none | none | A/C initially under-scaled; B's field traced an unwanted spiral, rebuilt | A chosen as base, B retired, limited C borrowing | Architecture Refine 01 |
| 10 | Architecture Refine 01 | Single controlled refinement of A | Lab 01 (A base + limited C) | jittered facet radii, one macro bracket crossing the nesting | none | none | none | — | **frozen** as the geometry base for all subsequent color work | Color Lab 01, Color Dawn 01, Problem Red Lab 01 |
| 11 | Color Lab 01 | Test 4 flat color architectures on frozen geometry | Refine 01 (geometry frozen) | unchanged | 4 palettes (Lunar Blue, Soft Sage, Warm Sand, Muted Lavender), 5-role mapping | none | none | — | none of the 4 carried forward as a lineage | (color-role mapping method reused conceptually) |
| 12 | Color Dawn 01 | Test 1 dawn-light palette on frozen geometry | Refine 01 (geometry frozen) | unchanged | single warm dawn palette, 6-role mapping | none | none | — | rejected: "tinted the whole canvas warm/peach" | Problem Red Lab 01 (explicit correction) |
| 13 | Problem Red Lab 01 | Genuinely white canvas + single-red-family identity, 3 base reds | Refine 01 (geometry frozen) | unchanged | R1/R2/R3 red bases via `color-mix()` at 4 fixed levels, graphite structural, neutral cross-ties | none | none | — | R1 `#B75C58` is the hex later reused in every Presence prototype | Presence Study 01 |
| 14 | Presence Study 01 | Rebuild geometry around gaze/presence, not formal shape systems | none (fresh; lid/pupil only) | asymmetric cosine-falloff field; gaze core / inner field / peripheral | none (monochrome) | none | none | rejected 2 internal drafts (literal eyelashes; comet-trail burst) first | superseded | Presence Study 02 |
| 15 | Presence Study 02 | Rebuild again around 4 zones instead of ring/bridge system | none (fresh, not Study 01's field) | awareness chamber / concentration field / quiet basin / empty periphery | none | none | none | rejected 2 internal drafts (literal eyelashes; combed-hatching/eyebrow) | superseded as final interior | Presence Prototype 01 |
| 16 | Presence Prototype 01 | First integrated build: geometry + material + red + motion together | none (fresh interior, not Study 02's) | gaze core / cognitive mid-field / peripheral, one dominant direction | red `#B75C58`, 3 marks only | 2 blurred radial tints + hairline blur filter | SMIL, desynced, 7 periods 9-17s | "confirmed via pixel diff" (not independently re-verified this session, see §9) | superseded ("too sparse and too imperceptible") | Presence Prototype 02 |
| 17 | Presence Prototype 02 | Rebuild interior for much higher structural complexity | Prototype 01 (shell only) | 51 structural elements (verified, see §6/§10) | red confined to 5 linked marks | same family | shortened/widened cycles, 4/6/8/9s + 5/7/11s | — | superseded | Presence Prototype 03 |
| 18 | Presence Prototype 03 | Stronger core, denser field, red as structural wall, larger motion | Prototype 02 (shell) | 65 structural elements (verified, see §6/§10); one boundary is a full red wall | red as one full-scale wall + nested focus arc, opposite-phase | same family | 6-13s cycles, opposite-phase core/focus | region "now larger... visibly different at every sampled frame" | superseded | Presence Prototype 04 |
| 19 | **Presence Prototype 04** | 4 targeted fixes: core as one continuous wall, red glued to wall, shared wobble language, geometry-morphing motion | Prototype 03 (shell + complexity level) | core rebuilt as ONE partial boundary + echo + strut (see §6 for exact structure) | red = literal recolored segment of the same wall curve | 3 radial-gradient tints + 4 blur filters (verified, §6) | SMIL `d`-morph on 3 keyframes (wall/strut/red) + independent pupil drift + JS-injected opacity cycles on 4 mid-field ticks (verified, §6) | "confirmed via pixel diff: a wide, continuously-changing region" (not independently re-verified this session as a full pixel decode; independently confirmed non-identical at the raw-byte level, see §9) | **latest / active candidate** | *(none yet — end of branch)* |

No named stage was missing. This table is built entirely from commit messages (verified as authored statements) plus the independent structural counts in §6/§10; it does not invent any stage, transition, or outcome beyond what those two sources state.

## 5. Design-direction evolution

Every transition named in the request is addressed; each below states the problem it targeted, how it was implemented, its stated limitation, and what (if anything) survived.

- **Dark-to-Light translation** (`5762bf0`, pre-Visible-Eye): solved legibility by boosting locked alphas on the existing dark maze's geometry. Limitation: this only ever recolors the *existing dark maze*, it does not address the deeper mismatch of that maze's language on a light canvas — which is exactly why the next 20 commits abandon color-only translation and rebuild geometry from zero. Useful idea preserved: none carried forward geometrically; conceptually it is what proved color alone would not be enough.
- **Geometry-only reconstruction** (Geometry Lab 01/02, Final Candidate 01/02): solved "what internal shape language replaces the dark maze" by treating geometry as an encoded route/relationship system, evaluated after the fact. Limitation, stated at Concept Reset 01: stacking distinct stroke grammars (ring layer + corridor layer + one bold "answer" + one fading "abandoned" line) reads as an assembled diagram. Preserved idea: the outer lid/pupil/proportion lock established here persists through every later stage, including Prototype 04.
- **Segmented arcs** (Lab 01 variant A): concentric rings, golden-angle offset to avoid a radar read. Retired after Lab 01 review; no further trace.
- **Corridor architecture** (Lab 01 variant B): asymmetric single-bend routes. Retired after Lab 01 review; no further trace.
- **Hybrid architecture** (Lab 01 variant C -> Lab 02 -> Final Candidates): outer containment rings + inner corridors converging on a center. Carried the furthest of the early formal systems (through 2 Final Candidates) before being rejected wholesale as a *category* of solution (component-stacking) at Concept Reset 01.
- **Convergence field**: the specific idea that ink/density should rise monotonically toward the pupil. Explicitly named in Final Candidate 01/02 and survives, in spirit, into every later stage (Cognitive Topology's "resolved near the pupil," Presence Study's density fields, Prototype 04's core as the densest, boldest region).
- **Single visual grammar** (Concept Reset 01/02): solved the "assembled diagram" problem by using one repeated shape family (logarithmic spiral fragments) for the entire field. Limitation: one *shape* read as decorative/orbital rather than as a field under tension, even when its parameters were zoned (Reset 02).
- **Spiral/vortex direction**: this *is* Concept Reset 01/02's literal geometry (logarithmic spiral fragments around the pupil). Rejected at Cognitive Topology 01 for conflating "one grammar" with "one primitive."
- **Cognitive topology** (Topology 01/02): solved the primitive-vs-grammar confusion by defining grammar as three relationship types (isolated/near/resolved) expressed through one operation (a bowed or straight stroke), independent of any shared global curve. Limitation: with curvature (01) it read as vascular/root growth; without curvature (02), two separate crossing bugs had to be fixed before it stopped reading as a crack pattern. Rejected as a category at Architecture Lab 01 in favor of pure visual-design judgment over encoded meaning.
- **Relationship-based marks**: the specific mechanism from Cognitive Topology (isolated/near/resolved). Not carried forward by name into Architecture Lab or Presence work, though the underlying idea — density/resolution rising toward the pupil — persists conceptually.
- **Visual architecture** (Architecture Lab 01/Refine 01): solved "the encoded-meaning strategy itself may be the problem" by composing three variants purely on hierarchy/rhythm/balance/depth/continuity, no symbolic vocabulary. This is the stage whose output (Refine 01) was frozen and reused verbatim as the geometry for three separate color studies — the most durable single artifact in the whole series by that measure. Limitation (implicit in Presence Study 01's opening line): even this, once color/material/motion were layered onto it in the Presence line, was ultimately not the interior carried into the final integrated prototypes — Presence Study 01 explicitly restarts the internal architecture "rather than formal shape systems."
- **Presence-first geometry** (Presence Study 01/02): solved "build from gaze/awareness rather than a shape system" via a continuous asymmetric density field (Study 01) and then four explicit zones (Study 02). Limitation, stated in both: multiple internal drafts read as literal eyelashes, a comet-trail burst, or combed hatching/an eyebrow before a version was accepted as reading as "attention" rather than texture or anatomy.
- **Integrated geometry + color + depth + motion** (Presence Prototypes 01-04): the only stage where all four dimensions coexist in one file. Each prototype's own commit message states a specific limitation of the previous one (01: too sparse/imperceptible; 02→03: core assembled from separate parts rather than one object; 03→04: fixed by making the core and its red segment literally one continuous curve). Prototype 04 is the current end state, not a resolved conclusion — see §13/§14.

## 6. Current implementation — latest prototype

**Source file:** `VISIBLE-EYE-PRESENCE-PROTOTYPE-04.html`, commit `447f3851164d082923c554f36d56e37def27c8e9`, 211 lines, 27,770 bytes, SHA-256 `3d9c805465a41e9ba7c47d9d0b793cb13f0ca98a49bb4cc1bef2af11baab92a2`. Read in full via `git show 447f385:VISIBLE-EYE-PRESENCE-PROTOTYPE-04.html`. Everything in this section is a direct fact from that file unless marked otherwise.

- **Document:** single self-contained `.html` file — inline `<style>`, inline `<svg>`, one inline `<script>` block. No external stylesheet, script, font, or image reference of any kind (system font stack only: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif`).
- **`viewBox`:** `-320 -140 640 400` (line 60).
- **Outer eye-lid path:** two `<path class="eye-lid">` elements (lines 91-92): upper lid `M -290 0 Q 0 -70, 290 0`, lower lid `M -290 0 Q 0 240, 290 0` — a single quadratic Bezier per lid, `stroke:var(--ink)`, `stroke-width:2.2`, no fill.
- **Pupil geometry:** `<circle cx="0" cy="0" r="13" fill="var(--ink)"/>` (line 183), wrapped in `<g id="pupilDrift">` which carries an `<animateTransform type="translate">` (lines 178-182) driving the whole group, not the circle's own `cx`/`cy`.
- **Clipping:** one `<clipPath id="lensProto4" clipPathUnits="userSpaceOnUse">` (lines 62-64) containing a single closed path tracing the lens between the two lid curves (`M -290 0 Q 0 -70 290 0 Q 0 240 -290 0 Z`) — the same two Bezier curves as the visible lid, closed into one shape. Applied via `<g clip-path="url(#lensProto4)">` (line 94) wrapping every internal-field element.
- **Internal element groups**, in DOM/paint order inside the clipped group: three "atmosphere" `<ellipse>` fills with gradient+blur (lines 95-97), then `<g filter="url(#edgeSoft4)">` wrapping three named sub-groups:
  - `#peripheralField` (line 100): **12** `<path>` elements — 3 long multi-point field-boundary strokes plus 9 short 2-point ticks (independently counted from the file; commit-message narrative describes "quiet long arcs plus a few faint traces" without a number, so this count is this report's own, not a re-statement of a claimed figure).
  - `#midField` (line 115): **34** `<path>` elements — 5 named boundary arcs (`midB1`-`midB5`), roughly 20 short "emphasis" tick-pairs (4 of them tagged `id="midEmph{A,B,C,D}"` for the JS-driven opacity animation, described below), a handful of longer curved "gate" marks, and one animated duplicate of `midB1` (`id="midB1anim"`) carrying its own `<animate>`.
  - `#gazeCore` (line 155): **8** `<path>` elements — one static partial-boundary arc, 3 static ticks, `#coreWall` (the single continuous chamber-wall curve, animated), `#coreStrut` (the opening-spanning strut, animated), `#redSignal` (the red wall segment, animated, `stroke:var(--red-base)`, `stroke-opacity:0.85`, `stroke-width:2.35`), and one final `var(--red-72)` tick.
  - **Total `<path>` elements in the document: 57** (2 lid + 1 clipPath + 12 peripheral + 34 mid-field + 8 core), independently counted and internally consistent (2+1+12+34+8 = 57).
- **Layer ordering (paint order = DOM order):** atmosphere ellipses (back) → peripheral field → mid-field → gaze core (front) → pupil (frontmost, own group, outside the clipped field group so it is never clipped by the lens).
- **Stroke widths:** range from 0.55-0.65 (quietest peripheral ticks) through ~0.8-1.2 (mid-field boundaries/emphasis) up to 2.1 (`coreWall`) and 2.35 (`redSignal`) — the two widest strokes in the piece are the core wall and its red segment, consistent with the "densest/boldest ink innermost" intent stated across nearly every prior commit.
- **Opacity hierarchy:** peripheral ~0.10-0.16; mid-field boundaries ~0.12-0.30; mid-field emphasis ticks ~0.33-0.57; core static elements ~0.22-0.34; `coreWall` 0.66; `redSignal` 0.85 (highest alpha in the document, along with the final red tick at 0.55). Ink is a single custom property, `--ink:#24272E`; red is `--red-base:#B75C58` and a derived `--red-72` (`color-mix(in srgb, var(--red-base) 72%, var(--lunar) 28%)`).
- **Filters (lines 65-76):** `softAtmo4` (Gaussian blur, stdDeviation 24, on the largest graphite atmosphere ellipse), `softAtmoLow4` (stdDeviation 20, on the second, lower graphite ellipse), `softAtmoTight4` (stdDeviation 9, on the small red atmosphere ellipse), `edgeSoft4` (stdDeviation 0.16, applied to the entire peripheral/mid-field/core group as a hairline-soft edge). No drop-shadow, no displacement map, no lighting filter.
- **Material-depth implementation:** exactly 3 radial gradients (`atmoGraphite4`, `atmoGraphiteLow4`, `atmoRed4`, lines 77-88), each a center-to-transparent stop pair at low opacity (0.05-0.16), painted as 3 large blurred ellipses behind the linework. This — plus the one hairline blur filter on the linework itself — is the entirety of the "material depth" system; there is no glass/blur-behind-content backdrop filter, no bevel, no multi-stop gradient.
- **Red-element placement:** exactly the `redSignal` path (a literal sub-segment of the same wobble-wall formula as `coreWall`, per the code comment at lines 22-26) plus one attached tick (line 172) and the `atmoRed4` material-depth ellipse. No red anywhere in peripheral or mid-field.
- **Neutral/graphite placement:** everything else — both lid paths, all peripheral/mid-field paths, the static core boundary/ticks, `coreWall`, `coreStrut`, and the pupil.
- **Animation elements and technology — hybrid, two mechanisms:**
  1. **Native SVG SMIL**, 5 elements: `#midB1anim` (`<animate attributeName="d">`, 3 keyframes, `dur="7.5s"`, `calcMode="spline"`), `#coreWall` (`<animate attributeName="d">`, 4 keyframes, `dur="6.5s"`), `#coreStrut` (same pattern, `dur="6.5s"`), `#redSignal` (same pattern, `dur="6.5s"`), and `#pupilDrift` (`<animateTransform type="translate">`, 5 keyframes, `dur="7s"`). All 5 use `calcMode="spline"` with `keySplines` of `0.4 0 0.6 1` (an ease-in-out cubic), and all `repeatCount="indefinite"`.
  2. **JavaScript-injected SMIL** (lines 189-208): a small inline script iterates 4 hardcoded `[id, duration, beginOffset]` triples (`midEmphA` 3.5s, `midEmphB` 5s, `midEmphC` 6.5s, `midEmphD` 8s, with negative `begin` offsets -0.4/-1.2/-2.5/-3.5s so they do not start in visual sync) and, for each, reads the element's existing `stroke-opacity` attribute, computes a low value (`max(0.07, base*0.5)`) and a high value (`min(0.9, base*1.45)`), and appends a freshly-constructed `<animate attributeName="stroke-opacity">` element with those 4 values, `calcMode="spline"`, `repeatCount="indefinite"`.
  - **Durations/delays:** 6.5s (core group, all three synchronized on identical keyTimes so red stays visually glued to the wall as both reshape), 7s (pupil), 7.5s (one mid-field boundary), 3.5-8s with staggered starts (the 4 JS-injected opacity cycles).
  - **Transform origins:** the pupil's `animateTransform` is a plain `translate` on the group, origin-independent; no `transform-origin` or scale transforms are used anywhere in this file (unlike Prototype 01/02/03, which per their commit messages included a core *scale* animation — Prototype 04's commit message states motion is now `d`-geometry interpolation instead of scale/opacity, which matches: no `scale(` or `stroke-dasharray` animation appears in this file).
  - **Pupil movement:** translate only, 5-point path, ±~1-3 units.
  - **Geometry movement:** `d`-attribute morphing on 4 paths (wall, strut, red segment, one mid-field boundary) — the wall/strut/red triple share identical `keyTimes`/`dur` so they move as one unit; the mid-field boundary animates independently on its own longer period.
  - **Opacity movement:** the 4 JS-injected mid-field tick animations only; no other element has an opacity animation.
- **Reduced-motion handling:** **not present.** Grepped for `reduced-motion` / `prefers-reduced-motion` in this file: no match. This is a real, verified gap, listed in §14.
- **Responsive behavior:** the `<svg>` is `width:100%; height:auto` inside a `.stage` container capped at `max-width:840px` — fluid single-breakpoint scaling, no discrete media-query breakpoints, no separate mobile layout.
- **Browser dependencies:** SVG SMIL animation (`<animate>`, `<animateTransform>`) — supported in all current evergreen browsers but a known long-standing gap in some older/embedded WebViews; CSS `color-mix()` — a comparatively recent CSS feature (broadly supported in current Chrome/Firefox/Safari but not universal on older versions). Neither is polyfilled or feature-detected in this file.
- **External assets:** none, confirmed above.

## 7. Color system history

All hex values below were independently re-extracted from file content via `git show <commit>:<file> | grep -oE "#[0-9A-Fa-f]{6}"` and, for Color Lab 01, by reading the relevant CSS/inline-style lines directly — not copied from commit-message prose. Every commit through Architecture Refine 01 is monochrome graphite only (no color system); color begins at Color Lab 01.

| Palette / experiment | Canvas | Surface | Structural ink | Primary | Secondary | Accent | Quiet | Status | Reason |
|---|---|---|---|---|---|---|---|---|---|
| A — Lunar Blue / Aqua Slate (Color Lab 01) | `#F0F9FF` | `#E8F4FD` | `rgb(23,25,28)` | `rgba(60,131,246,*)` (~`#3C83F6`) | `rgba(122,148,184,*)` (~`#7A94B8`) | deepened aqua-teal (derived, no explicit hex given in the brief per the commit message) | `rgba(183,195,214,*)` (~`#B7C3D6`) | tested only | one of 4 flat-color comparisons; not carried forward as a lineage |
| B — Soft Sage / Earth (Color Lab 01) | `#F6F3E9` | `#E7F2E3` | (shared ink) | (sage-family, exact role hexes not individually re-extracted in this pass) | mid-tone sage, interpolated (per commit message, no literal brief hex given) | — | — | tested only | same as above |
| C — Warm Sand / Mineral (Color Lab 01) | `#F8F4EC` | `#F3EEE4` | (shared ink) | (sand-family) | reuses the same hex as accent at lower alpha (per commit message) | (same hex as secondary, 1.0 alpha) | — | tested only | same as above |
| D — Muted Lunar Lavender (Color Lab 01) | `#F8F5FA` | `#DCCBEC` | (shared ink) | (lavender-family) | — | — | — | tested only | same as above |
| Dawn (Color Dawn 01) | not extracted as a distinct "canvas" hex (whole page warm-tinted per the commit's own description) | — | `#332A2A` | `#D88472` | `#E8A06A` | `#F0B36C` | `#E8CFC4` (+ `#C79BA1` "cool shadow" on witness lines only) | **rejected** | "tinted the whole canvas warm/peach," corrected one commit later |
| Problem Red Lab — R1 Soft Lunar Red | `#FAFBFD` | `#FFFFFF` | `#24272E` | `#B75C58` (100% base) | 72%/45%/22% `color-mix` steps toward `#FAFBFD` | (same red family, no separate accent hex) | `#DDE1E7` (neutral cross-ties) | **R1 is the value later carried into every Presence prototype** | genuinely white canvas, structural authority stays graphite |
| Problem Red Lab — R2 Morning Mineral Red | `#FAFBFD` | `#FFFFFF` | `#24272E` | `#C76862` | same `color-mix` steps | — | `#DDE1E7` | tested, not chosen | comparison specimen only |
| Problem Red Lab — R3 Deep Dust Red | `#FAFBFD` | `#FFFFFF` | `#24272E` | `#A94F50` | same `color-mix` steps | — | `#DDE1E7` | tested, not chosen | comparison specimen only |
| Presence Prototypes 01-04 | `#FAFBFD` | `#FFFFFF` | `#24272E` | `#B75C58` (`--red-base`) + derived `--red-72` via `color-mix` | n/a (graphite fills this role) | n/a | n/a | **currently in use, not stated as final** | R1 from Problem Red Lab, reused unchanged through all 4 prototypes |

**No final production color has been approved.** Nothing in any commit message, in this file set, or anywhere in this repository states that a specific palette has been selected for production. `#B75C58` is the color that has survived the longest (5 consecutive artifacts: Problem Red Lab 01 through Presence Prototype 04), which is the strongest evidence available that it is the current working choice — but "current working choice across 5 experiments" and "approved for production" are not the same claim, and no artifact makes the latter claim.

## 8. Motion system

Every motion-bearing artifact is Presence Prototype 01 through 04 (Studies 01/02 and everything before them are explicitly static/monochrome, confirmed by their own commit messages and by their file content containing no `<animate>` elements). Prototype 04's motion is documented in full technical detail in §6; the table below covers the technology and self-reported outcome for all 4.

| Artifact | Animated element(s) | Technology | Duration(s) | Retained/superseded |
|---|---|---|---|---|
| Prototype 01 | pupil drift, core scale, 4 mid-field opacity ticks, 3 red cross-fades | SMIL (2 `<animate*>` elements independently counted; commit message describes more distinct *cycles* than there are top-level SMIL elements, implying some cycles share one element or are JS-driven similarly to Prototype 04 — not independently traced line-by-line for this report) | pupil 12s; core scale 9s; mid-field 7/10/13/16s; red 11/14/17s | superseded — self-described as "too imperceptible" |
| Prototype 02 | same categories, shortened | SMIL (2 top-level `<animate*>` elements independently counted) | pupil 7s; core scale 5s; mid-field 4/6/8/9s; red 5/7/11s | superseded |
| Prototype 03 | same categories + one long tension-strut rotation; red core boundary and its focus arc now in deliberate opposite phase | SMIL (3 top-level `<animate*>` elements independently counted) | pupil 6s (~3px); core scale 4.5s (±6.5%); mid-field 3.5-9.5s (6 cycles); red 6-13s | superseded |
| **Prototype 04** | wall/strut/red-segment `d`-morph (synchronized), independent mid-field boundary `d`-morph, pupil translate, 4 JS-injected opacity cycles | **hybrid**: native SMIL (5 elements) + JS-constructed SMIL (4 elements, see §6) | 6.5s (core triple), 7.5s (mid-field boundary), 7s (pupil), 3.5-8s staggered (opacity cycles) | **current** |

**Known issues, as self-reported in commit messages (category 1 — the statement of the issue is verified; whether motion is in fact imperceptible to a given viewer is category 3, see §9/§13):**
- Prototype 01's commit explicitly frames its own successor (02) as existing because 01 was "judged too sparse and too imperceptible."
- Each successive prototype's commit message states larger amplitudes / shorter periods than the last, framed as a direct response to the previous version's motion being too subtle to read confidently from static captures.
- Prototype 03 -> 04's stated motion upgrade is specifically that geometry now morphs its `d` attribute rather than relying on scale/opacity changes, because a reconfiguring shape is asserted to read as more alive than a shape that merely scales or fades.
- No commit states or implies that motion is imperceptible *at full frame rate in a live browser* — every "imperceptible" claim in the history is about static captures, and every fix responds by widening the captured, sampled difference. This report did not run any of these files in a live browser to observe motion in real time (see §9's limits).

## 9. Screenshot and visual-evidence index

25 screenshot files exist across the artifact set (9 single comparison/state shots + 16 four-frame motion sequences for the 4 Presence Prototypes). Full list with sizes/hashes is in §3's table. Format/dimension facts below were obtained by extracting 4 representative files from git blobs and running `file` on them (all confirmed valid, undamaged PNGs):

| File(s) | Dimensions (verified via `file`) | Static or sequence | What it can legitimately prove | What it cannot prove |
|---|---|---|---|---|
| `*-GEOMETRY-LAB-01-comparison.png`, `*-LAB-02-comparison.png` | not independently measured in this pass (only 4 files were extracted and measured) | static, multi-panel | that 3 (or 3) named variants existed side by side at the time of capture, at the geometry stage described | color, motion, or any later-stage change; nothing about production |
| `*-COLOR-LAB-01.png` | not measured | static, 4-panel | that 4 named palettes were compared under identical geometry, at the sizes/positions the file's own markup defines | how they read on an actual device screen/OS color profile |
| `*-PROBLEM-RED-LAB-01.png` | **2800 x 660** (measured) | static, 3-panel | R1/R2/R3 hex values and their rendered appearance side by side, on a genuinely white canvas — **independently viewed for this report, see below** | motion; how the color would look integrated with the final Prototype 04 geometry (this frozen-geometry lab uses Architecture Refine 01's geometry, not Prototype 04's) |
| `*-ARCHITECTURE-REFINE-01.png` | **1680 x 1110** (measured) | static | the exact faceted-ring geometry that was later frozen and reused for all 3 color labs — **independently viewed for this report, see below** | anything about the Presence line's very different, non-faceted interior |
| `*-PRESENCE-PROTOTYPE-0{1,2,3,4}-t{0,1,2,3}.png` | Prototype 04's t0/t3 measured at **1680 x 1112** each | 4-frame motion sequences, ~2.5-3s apart per commit message | that the rendered frame is not byte-identical across the sequence (**independently re-verified for Prototype 04's t0/t3 pair in this report**: different file sizes, 88,346 of 90,860 raw bytes differ) — i.e., *something* changed between frames | that the change is the *specific* motion described (a pixel-region decode/diff, as the original commit messages claim was done, was not reproduced in this pass — no image-diffing library was available in this environment beyond a raw-byte comparison); it also cannot prove the motion is perceptible at normal viewing speed in a live browser, since these are discrete static samples, not a video |

**Independent visual judgments formed for this report (category 3 — my own reading, not restated from any commit message):**

- **Presence Prototype 04, frame t0:** at the size the file itself renders (a single ~1000px-wide card), the eye reads as a mostly-empty white almond with a small dark pupil, one short reddish arc segment near the pupil, and a scatter of faint short gray marks concentrated left-of-center and below the pupil. The described 57-path internal structure is present in the markup but is **not visually prominent** at this render scale — most of the piece reads as negative space with light pencil-like marks near the center, closer to "a sparse icon with a small red accent" than to "an integrated living eye" or "a dense field." This is a direct, first-hand visual read, not a restatement of any commit's self-assessment, though it happens to align with the pattern of self-criticism ("too sparse," "imperceptible") that recurs throughout the project's own history at earlier stages.
- **Architecture Refine 01:** clearly and legibly reads as nested faceted/polygonal rings around a central pupil, with straight "witness lines" cutting through the layers — an engineered-instrument or technical-diagram quality, matching its own commit message's stated intent almost exactly. This is the most visually "resolved" single static image inspected in this pass, in the sense that its intended reading and its actual appearance clearly match.
- **Problem Red Lab 01, 3-panel:** the canvas is genuinely white in all three panels (no warm/peach cast), red is visibly concentrated at the pupil-adjacent rings and fades outward through the specified `color-mix` steps, and the underlying faceted-ring geometry is Architecture Refine 01's, unchanged. R1/R2/R3 are visually close to each other (a soft, muted brick-red family); a confident preference between the three specific hues was not formed from this single side-by-side view and is not asserted here.

No screenshot was generated for this report beyond the 4 files extracted and measured/viewed to write this section — no new capture of any HTML file in a live browser was performed.

## 10. Verified successes

Every item below cites the exact artifact and the exact evidence (file content, independent count, or independent visual check) that supports it — not merely a restated claim.

- **Production remained untouched.** Every commit message on the artifact branch states no reference to `heroEyeSvg`/`HeroV1Life`/`AtmosphereGL`/Journey/production routing; this report's own file-content read of Prototype 04 (§6) independently confirms it is a fully self-contained document with zero external references of any kind.
- **Geometry was frozen correctly during color comparisons.** Color Lab 01, Color Dawn 01, and Problem Red Lab 01 all state their geometry is "byte-identical"/"copied verbatim" from Architecture Refine 01. This report independently confirmed the geometry-defining paths are unchanged in structure across at least the Red Lab specimen (all three R1/R2/R3 panels visibly share one identical faceted-ring layout in the viewed screenshot, §9).
- **A genuinely white Lunar-White environment was established**, correcting an earlier warm-tinted attempt. Verified by independent hex extraction (Problem Red Lab 01: canvas `#FAFBFD`, surface `#FFFFFF` — a true near-white, vs. Color Dawn 01's `#F3E4DA`/`#F8EEE8` warm off-whites) and independent visual confirmation (§9).
- **Red families were compared under equal conditions.** Problem Red Lab 01's R1/R2/R3 share one stylesheet, one geometry block, and one 4-level `color-mix` scheme, varying only the `--red-base` hex — independently confirmed by the extracted hex list showing exactly 3 distinct red bases plus one shared neutral, and by the viewed 3-panel screenshot (§9).
- **Animation became technically functional**, in the sense of executing without a rendering-breaking error and producing non-identical frames. Independently confirmed for Prototype 04 by a raw-byte comparison of its t0/t3 captures (different sizes, ~97% of compared bytes differ) — a real, if limited, independent check distinct from re-trusting the commit message's own "confirmed via pixel diff" claim.
- **Internal structural element count increased release-over-release, independently re-counted, not merely re-quoted:** Prototype 01 -> 40 total `<path>` elements (self-reported "~36" structural + lid/clip, off by one from an exact match); Prototype 02 -> 54 total (self-reported 51 structural + 3 lid/clip = **exact match**); Prototype 03 -> 68 total (self-reported 65 structural + 3 = **exact match**); Prototype 04 -> 57 total, independently counted (not compared against a self-reported number, since Prototype 04's commit message does not restate a total count, only describing the 4 targeted changes).
- **Red became structurally integrated rather than a separate accent**, verified directly in Prototype 04's source: `#redSignal`'s `d` attribute is generated from the same wobble-curve formula as `#coreWall` (per the file's own header comment, §6) and both are animated on identical `keyTimes`/`dur`, so they are provably the same underlying curve family, not independently placed elements.
- **Geometry, color, material depth, and motion were combined in one isolated prototype file** — independently confirmed present, all four, in the single file `VISIBLE-EYE-PRESENCE-PROTOTYPE-04.html` (§6: geometry = the path structure; color = `--red-base`/`--ink`; material = the 3 blurred radial-gradient ellipses; motion = the SMIL/JS animation system).

## 11. Verified failures and rejected directions

Recorded honestly, per artifact, with symptom, cause, and reusability — drawn from the commits' own stated self-criticism (verified as authored statements) plus this report's own independent visual read where noted.

| Direction/artifact | Visible symptom (as stated) | Cause (as stated) | Fully rejected or partly reusable |
|---|---|---|---|
| Geometry Lab 01 (all 3 variants) | "center reads weak in every variant" | insufficient density/ink weight near the pupil | partly reusable — motivated every later "convergence" emphasis |
| Final Candidate 01/02 (whole route-diagram strategy) | reads as an assembled diagram, not a field | stacking distinct stroke-type layers (containment/corridor/answer/abandoned) | rejected as a *category*, not reusable as a strategy; individual proportion fixes (matching the eye's own almond ratio) were reusable and did carry forward |
| Concept Reset 01 (uniform spiral grammar) | "decorative... orbital swirl," not tension | one shape family applied uniformly reads as ornament regardless of unity | rejected as insufficiently differentiated; the *idea* of one grammar was reusable, its execution as one primitive was not |
| Cognitive Topology 01 (curved relational strokes) | "organic branching / capillary structure" | continuous variable curvature (bow) is the visual signature of vascular/root growth regardless of the logic layered on it | rejected; curvature itself was the identified defect |
| Cognitive Topology 01/02 (both) | two independent crossing-line bugs, described in-project as "the single clearest visual signature of a crack" | insufficient cross-checking of new marks against previously-placed marks outside their own local pocket | bugs fixed within the same stage; the relational-grammar *strategy* was still abandoned one stage later for unrelated reasons (Architecture Lab's category-level reset) |
| Architecture Lab 01, variant B | initially clipped to a sliver in the eye's cramped upper region; its radius-coupled-to-angle line construction traced a visible spiral/comet-trail arc | wrong placement region + parameter coupling | variant B retired entirely after this stage; not reused |
| Color Dawn 01 | whole canvas reads warm/peach-tinted | dawn palette applied without a genuinely-neutral canvas tier | rejected; corrected the next commit by Problem Red Lab 01 |
| Presence Study 01 (2 unnamed rejected internal drafts, pre-dating the file that was committed) | literal-eyelash read (radial fan); one-sided burst/comet effect (hard-threshold field) | radial-fan-from-pupil reads anatomically; a hard on/off density boundary reads as a directional burst rather than controlled tension | both discarded before the committed version; not present as separate artifacts to inspect (no HTML file exists for either rejected draft — they are described only in the commit message, so this row is **category 1 only insofar as "the commit says this was tried and discarded"**, not independently verifiable beyond that statement, since no artifact survives) |
| Presence Study 02 (2 unnamed rejected internal drafts) | literal-eyelash read (radial version); combed-hatching/eyebrow read (denser packed cluster with tangential-per-position angles) | tangential-per-position angles fan out into a crosshatch texture rather than a legible mark cluster | both discarded before the committed version; same caveat as above — no surviving artifact, commit-message-only |
| Presence Prototype 01 | "too sparse and too imperceptible" (the stated reason Prototype 02 exists) | insufficient structural element count and motion amplitude | rejected as a final state; its shell (lid/pupil/lunar-white/red hex) was retained and iterated, not its interior |
| Presence Prototype 02 -> 03 transition | (implicit — 03 exists because 02's core still read as separate assembled parts rather than one mechanism, per Prototype 04's own commit message describing "replaced the four-arc-plus-four-bridge assembly") | core built from multiple discrete boundary+bridge elements rather than one continuous curve | superseded; the *idea* of a red structural wall (introduced in 03) was retained and refined in 04 |
| **This report's own independent visual finding on Prototype 04** (§9, category 3, not a restatement of any commit) | at normal render scale, the eye reads as mostly empty white space with a small pupil and a few faint marks — the described 57-element/red-integrated structure is present in the markup but not strongly visible to a first-time viewer at the file's own display size | not stated anywhere in the project's own history for this specific version — Prototype 04's commit message describes 4 targeted *fixes*, not a remaining sparseness problem | open; not yet addressed by any existing artifact — see §14 |

No unsuccessful work is hidden; every stage that exists is represented above or in §4/§5.

## 12. Current locked decisions

**LOCKED** (stated as unchanged across essentially every commit from Architecture Lab 01 onward, and independently confirmed unchanged in Prototype 04's own outer-lid/pupil markup):
- Outer almond lid silhouette (`M -290 0 Q 0 -70, 290 0` / `M -290 0 Q 0 240, 290 0`) and its `viewBox`.
- Pupil as a plain filled circle, anchored at the geometric center, radius 13 in Prototype 04 (radius/position vary slightly stage-to-stage per commit messages, e.g. "pupil anchor/size" is the phrase used, not a single frozen number across the whole series — see PROVISIONAL below).
- Lens `clipPath` shape tracing the same two lid curves.
- No production/Journey/HeroV1Life file has been touched.

**PROVISIONAL** (asserted repeatedly as intent, but not independently re-verified by this report across every single one of the 24 commits, or subject to minor stage-to-stage variation):
- "Pupil remains the anchor" as an exact fixed size/position across *all* stages — true for the Presence Prototype line by this report's own read of Prototype 04, not independently re-measured against every earlier stage's exact pupil radius.
- Environment as true Lunar White (`#FAFBFD`/`#FFFFFF`) — true from Problem Red Lab 01 onward through Prototype 04 (independently verified); not true earlier (Color Lab 01/Color Dawn 01 both use off-white/warm surfaces) — so this is a decision locked *from a specific point in the history onward*, not for the whole series.
- Graphite (`#24272E`) as structural ink, never red — true in every color-bearing artifact independently checked (Color Dawn 01's `#332A2A`, Problem Red Lab 01 and Prototype 04's `#24272E`).
- Red remains restrained — true by element count in Prototype 04 (2 of 57 paths plus one derived-color tick are red-adjacent) but this is this report's own count, not a numeric rule stated anywhere as a locked ratio.
- No secondary hue families beyond graphite + one red — true in every artifact from Problem Red Lab 01 onward; Color Lab 01 itself explicitly tested 4 unrelated hue families, so "no secondary hue families" is a decision that postdates Color Lab 01, not a rule that governed it.

**REJECTED** (explicitly abandoned, per §5/§11): segmented rings and corridor-only geometry (Lab 01 A/B); the whole route-diagram component-stacking strategy (Final Candidates); uniform single-primitive grammar (Concept Resets); curved relational marks (Cognitive Topology 01); the relational-grammar category itself (Cognitive Topology, both); whole-canvas warm tint (Color Dawn 01); Architecture Lab 01's variant B.

**STILL OPEN:** whether Presence Prototype 04 itself is the right foundation to refine further or should be rebuilt again (no later artifact exists to answer this — it is the end of the branch); whether any color palette is final (explicitly not decided, §7); reduced-motion behavior (never implemented in any Presence prototype, §6/§14); a resolution to this report's own independent visual finding that the latest prototype reads as sparse at normal scale (§9/§11/§13).

## 13. Current visual verdict

**STATUS: APPROVED FOR FURTHER PROTOTYPING** — not approved for production (nothing in the project's history claims that stage), and "not approved / requires redesign" would overstate the case given the substantial, independently-verifiable technical progress documented in §6/§10.

**What is objectively implemented:** a single self-contained, isolated SVG-based eye illustration with 57 path elements organized into 3 density-graded zones, a literal shared-curve relationship between its core boundary and its one red accent, 3 blurred-gradient depth layers, and a 9-animation motion system (5 native SMIL + 4 JS-injected) with no production coupling of any kind.

**What improved over previous prototypes (independently verified, not merely re-quoted):** the internal element count is now organized around one continuous core curve rather than a multi-part assembly (§6), red is provably the same curve family as the wall it sits on (§6/§10) rather than a separately-placed ring, and the motion system now reconfigures actual path geometry rather than only opacity/scale (§6, cross-checked: no `scale(` transform or dasharray animation exists in the file).

**What remains visually unresolved:** this report's own independent view of the t0 frame (§9) found the piece reads as mostly empty white space with a small dark pupil and a few faint marks at normal display scale — the internal complexity documented in §6 is present in the markup but is not strongly visible on casual viewing. Whether this is a genuine unresolved sparseness problem or an artifact of viewing a single static frame at reduced size (motion and hover/hero-scale rendering in an actual product context were not tested) is not resolved by the evidence available in this pass.

**Current character read (independent judgment):** closer to **a sparse icon with a small integrated red accent** than to "an integrated living eye," "engineered geometry" (that description fits Architecture Refine 01 far better, per §9), or "a diagram" (the project's own history repeatedly and successfully steered away from diagram-like reads at earlier stages, and Prototype 04 does not read as a diagram). It is not judged here as a strong "presence/character" read yet, notwithstanding the deliberate design effort documented across Presence Study 01 through Prototype 04 specifically aimed at that quality.

This verdict is not declared merely because a requested element count or fix list was met — the count/fix list in §6/§10 is real and independently confirmed, and the visual read in this section is reported separately from it, exactly because meeting a count is not the same as achieving the intended visual effect.

## 14. Open problems

In priority order:

1. **Problem:** at normal render scale, Prototype 04 reads as sparse/mostly-empty rather than as a dense, characterful field, per this report's independent visual check (§9/§13).
   **Evidence:** direct viewing of `VISIBLE-EYE-PRESENCE-PROTOTYPE-04-t0.png`.
   **Elements:** the `#peripheralField` and much of `#midField`'s low-alpha (~0.10-0.30) strokes, which may be too faint at this render size regardless of count.
   **Category:** composition / hierarchy.
   **Dependencies:** none blocking; can be investigated directly on the existing file.
   **Suggested verification:** render the file at its actual intended display size (not just view the pre-captured PNG) and, separately, test whether raising baseline alpha or stroke-width on the mid-field/peripheral tiers changes the read without reintroducing a "diagram" or "hatching" problem the project's own history already fought to avoid (§11).

2. **Problem:** no reduced-motion handling exists anywhere in the Presence Prototype line.
   **Evidence:** direct grep of Prototype 04's source, §6 — no match for `reduced-motion`/`prefers-reduced-motion`.
   **Elements:** all 9 animation instances (5 SMIL + 4 JS-injected).
   **Category:** motion / integration (this would matter for eventual production integration, per this codebase's own existing accessibility conventions elsewhere, though this report did not cross-check those production conventions against this isolated file set).
   **Dependencies:** none.
   **Suggested verification:** add and test a `prefers-reduced-motion` branch before any production integration is considered; not urgent for a still-isolated prototype.

3. **Problem:** the project's own history shows a recurring, unresolved pattern of "too sparse / imperceptible" self-criticism across at least 3 prior stages (Prototype 01, and both un-surviving Presence Study drafts) that Prototype 04's targeted fixes did not explicitly claim to address, and this report's own view suggests it may still apply.
   **Evidence:** §5, §11 (commit-message self-criticism), §9/§13 (this report's independent view).
   **Elements:** overall ink-weight/alpha budget across all three field tiers.
   **Category:** hierarchy / composition.
   **Dependencies:** depends on resolving problem 1 first, since they are likely the same underlying issue viewed twice.
   **Suggested verification:** a fresh, independent visual review (ideally by more than one reviewer, in an actual rendered browser rather than a static capture) specifically targeting whether the sparseness read persists.

4. **Problem:** no palette has been declared final; `#B75C58` is only the longest-surviving candidate by usage count, not a stated decision.
   **Evidence:** §7 — no artifact anywhere states a final color choice.
   **Elements:** `--red-base` and its `color-mix` derivatives across all of Presence Prototypes 01-04.
   **Category:** color.
   **Dependencies:** none technical; this is a decision, not an implementation gap.
   **Suggested verification:** an explicit sign-off step naming a final hex, separate from "it's the one we kept reusing."

5. **Problem:** browser-dependency risk (SMIL animation, `color-mix()`) has not been tested against any specific target browser/device list.
   **Evidence:** §6.
   **Elements:** all animated elements; the `--red-72` custom property.
   **Category:** integration / motion.
   **Dependencies:** would matter only once a production-integration path is chosen.
   **Suggested verification:** cross-browser/device smoke test once (and if) this line is considered for integration.

No redesign is proposed here — this section diagnoses only, per the instruction governing this report.

## 15. Safe resume point

- **Correct base file to continue from:** `VISIBLE-EYE-PRESENCE-PROTOTYPE-04.html` (commit `447f385` on `origin/claude/light-maze-eye-depth-yfvhch`) — it is the latest, most-iterated, most technically complete artifact, and no later artifact supersedes it.
- **Files that must remain untouched:** every file in the §3 inventory should be treated as historical record, not a scratch pad — in particular, `VISIBLE-EYE-ARCHITECTURE-REFINE-01.html` should stay frozen exactly as-is if any future color work wants a like-for-like comparison against the 3 existing color studies built on it.
- **Experiments that must not be treated as foundations:** anything marked "rejected" or "superseded" in §3/§4/§11 — most notably the entire Final-Candidate/route-diagram lineage, both Concept Resets, both Cognitive Topologies, and Architecture Lab variant B — all explicitly abandoned as *strategies*, not just as individual files.
- **Refine vs. rebuild:** given this report's own independent finding in §9/§13 (sparse at normal scale) and the recurring historical pattern of the same criticism at earlier stages (§11), a refinement pass focused specifically on ink-weight/alpha in the peripheral and mid-field tiers is the narrowest next step; a full rebuild is not obviously warranted given how much of Prototype 04's core-unification work (§6/§10) is both real and successful by its own stated goals.
- **What must be visually approved before production integration:** a resolved answer to the sparseness question (problem 1, §14); an explicit final color decision (problem 4); reduced-motion handling (problem 2) — none of these currently block further prototyping, but all three should block any move toward production wiring.
- **What evidence the next iteration should produce:** an actual live-browser render (not just a static capture) at the size the eye would appear in product context; a resolved pixel-level or perceptual motion-difference check (this report's raw-byte check in §9 is a real but weak substitute for a true visual diff); and, if alpha/weight changes are made, fresh comparison captures analogous to the existing `-t0/-t1/-t2/-t3` sequence so the next reviewer can independently verify motion the same way this report attempted to.

No next iteration was executed as part of producing this report.

## 16. Reproduction and review instructions

All commands below are read-only and were the actual commands used to produce this report. Run from `/home/user/coza-problem` (or any clone of `problem-maze/coza-problem`):

```bash
# Confirm the artifact branch exists and see all 20+ commits in order
git fetch origin
git log --oneline origin/claude/light-maze-eye-depth-yfvhch | head -30

# List every Visible Eye file with size and git blob hash, without checking out
git ls-tree -r -l origin/claude/light-maze-eye-depth-yfvhch | grep -i "visible-eye"

# Read any specific file's exact content at the commit that introduced it
git show 447f3851164d082923c554f36d56e37def27c8e9:VISIBLE-EYE-PRESENCE-PROTOTYPE-04.html

# Compute this report's cited SHA-256 for any file (matches git cat-file -p | sha256sum)
git cat-file -p <blob-sha-from-ls-tree-above> | sha256sum

# View a screenshot without checking out (extract to a temp file, then open normally)
git show 447f3851164d082923c554f36d56e37def27c8e9:VISIBLE-EYE-PRESENCE-PROTOTYPE-04-t0.png > /tmp/p04-t0.png

# To actually run/view an HTML prototype live in a browser (not done in this report):
git worktree add /tmp/visible-eye-review origin/claude/light-maze-eye-depth-yfvhch
# then open /tmp/visible-eye-review/VISIBLE-EYE-PRESENCE-PROTOTYPE-04.html in a browser.
# Remove the temporary worktree afterward with:
git worktree remove /tmp/visible-eye-review
```

No worktree was added and no file was checked out to produce this report — every fact above came from `git show`/`git cat-file`/`git ls-tree` reading blob content directly. A reviewer who wants to interact with the prototypes live (see motion in a real browser, resize the viewport, toggle reduced-motion in devtools) will need the `git worktree add` step above, which this report deliberately did not perform.

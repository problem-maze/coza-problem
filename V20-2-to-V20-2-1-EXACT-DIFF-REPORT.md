# V20.2 → V20.2.1 Exact Diff Report

Full literal `diff -u` between:
- `Problem-v86-nav-logo-simplified-signin-continuous-hand-20-2-world-derived-global-earth-refinement.html` (V20.2)
- `Problem-v86-nav-logo-simplified-signin-continuous-hand-20-2-1-english-ltr-viewport-settle-correction.html` (V20.2.1)

**3 hunks total, all inside `initLoginSwiper()`, lines ~26295–26450. No other
line in the file differs.** This was verified both by this literal diff and
independently by the Earth-freeze content-addressed manifest (see
`V20-2-1-EARTH-FREEZE-MANIFEST.json` / `V20-2-1-ENGLISH-LTR-VIEWPORT-SETTLE-REPORT.md`
§7), which confirms every enumerated Earth-subsystem region is byte-identical.

V20.2 source hash (unchanged before and after this correction):
`1a739de1212b42296571a19ef05d7e961654a5827b43527dd308e0cee18f89d2`

---

## Hunk 1 — add `applyTrackTransform()` helper (lines 26295–26327)

```diff
@@ -26295,6 +26295,33 @@
     if(headmazeStory)headmazeStory.start();
   }
 
+  // v20.2.1: measured-delta translation (was a bare percentage) -- see
+  // the v20.2.1 correction report for the full root-cause diagnosis.
+  // Rather than assuming '-50% of track width' always lands the target
+  // slide flush with the swiper's left edge, this measures the slide's
+  // ACTUAL current position and computes the exact delta needed --
+  // correct even if the flex layout's child-width split is transiently
+  // wrong, since it never assumes what that split should be. Reading
+  // both rects forces a synchronous layout flush first, so this always
+  // sees the current real layout, never a stale one. Side-effect-free
+  // by design (only touches the transform) so it is safe to call again
+  // on resize or as a post-transition correction without re-triggering
+  // goTo()'s other logic (disabling inputs, restarting the reveal-form
+  // timer, etc.).
+  function applyTrackTransform(n){
+    const activeSlide=n===0?track.querySelector('.login-right'):track.querySelector('.login-left');
+    if(activeSlide && swiper){
+      const slideRect=activeSlide.getBoundingClientRect();
+      const swiperRect=swiper.getBoundingClientRect();
+      const cs=getComputedStyle(track);
+      const m=(cs.transform==='none')?new DOMMatrix():new DOMMatrix(cs.transform);
+      const delta=swiperRect.left-slideRect.left;
+      track.style.transform='translateX('+(m.m41+delta)+'px)';
+    }else{
+      const trackW=track.getBoundingClientRect().width;
+      track.style.transform='translateX(-'+(n*trackW/2)+'px)';
+    }
+  }
   function goTo(n){
     cur=Math.max(0,Math.min(1,n));
     const worldActive=cur===0;
```

## Hunk 2 — use the helper in `goTo()` (lines 26320–26326)

```diff
@@ -26320,7 +26347,7 @@
         window.LPMax.LPOriginResonance.stopLiveCounter();
       }
     }
-    track.style.transform='translateX(-'+(cur*50)+'%)';
+    applyTrackTransform(cur);
     dots.forEach((d,i)=>d.classList.toggle('lp-dot-active',i===cur));
     if(headmazeStory)headmazeStory.setActive(cur===1);
     if(cur===1){
```

## Hunk 3 — resize-safety + transition-end self-correction (lines 26370–26449)

```diff
@@ -26370,6 +26397,80 @@
     }
   }
 
+  // v20.2.1: self-corrections (resize/orientation/font-settlement and the
+  // post-transition revalidation below) must land INSTANTLY, not via the
+  // swiper's own 0.52s cubic-bezier transition -- a real-flow diagnostic
+  // (repeated resize runs sampled every 50ms) showed applyTrackTransform's
+  // write to track.style.transform was itself being animated by the
+  // '.lp-swiper-track{transition:transform 0.52s ...}' rule, so a correction
+  // that should be a snap took ~500ms to visually settle -- long enough to
+  // still show a displaced slide well after the resize event. Temporarily
+  // clearing the transition, forcing a synchronous layout flush, then
+  // restoring it (back to the CSS class's own rule, since only an inline
+  // override is removed) makes the correction apply on the very next frame.
+  function applyTrackTransformInstant(n){
+    const prevTransition=track.style.transition;
+    track.style.transition='none';
+    applyTrackTransform(n);
+    track.getBoundingClientRect();
+    track.style.transition=prevTransition;
+  }
+  // v20.2.1: keep the measured-delta translation correct across resize /
+  // orientation / font-settlement. A resize can trigger a reflow that is
+  // still settling (e.g. text rewrap) for a short tail after the resize
+  // event itself fires, so this corrects twice: once after a short debounce,
+  // then once more after the browser's own next two paint frames (a
+  // standard 'wait for layout to truly settle' pattern) -- both calls are
+  // bounded and one-shot per resize burst, never a free-running timer.
+  let resizeSyncTimer=0;
+  function syncTrackOnResize(){
+    if(resizeSyncTimer)clearTimeout(resizeSyncTimer);
+    resizeSyncTimer=setTimeout(function(){
+      resizeSyncTimer=0;
+      if(track.isConnected)applyTrackTransformInstant(cur);
+    },80);
+  }
+  window.addEventListener('resize',syncTrackOnResize,{passive:true});
+  if(window.visualViewport){
+    window.visualViewport.addEventListener('resize',syncTrackOnResize,{passive:true});
+  }
+  // ResizeObserver ties the correction directly to .login-right/.login-left
+  // actually changing size, rather than guessing how long a resize's reflow
+  // tail takes -- this is what finally converges the resize case, since the
+  // relevant geometry (not just the window) is what the correction depends on.
+  if(typeof ResizeObserver==='function'){
+    const ro=new ResizeObserver(function(){
+      if(resizeSyncTimer)clearTimeout(resizeSyncTimer);
+      resizeSyncTimer=setTimeout(function(){
+        resizeSyncTimer=0;
+        if(track.isConnected)applyTrackTransformInstant(cur);
+      },50);
+    });
+    const rightEl=track.querySelector('.login-right');
+    const leftEl=track.querySelector('.login-left');
+    if(rightEl)ro.observe(rightEl);
+    if(leftEl)ro.observe(leftEl);
+  }
+
+  // v20.2.1: deterministic self-correction on transition completion.
+  // Even with the measured-delta approach above, an async subtree change
+  // (e.g. the World globe's own late mount) landing exactly between the
+  // goTo() measurement and the transition's visual end could still leave
+  // a residual gap. This does not poll or run on a free timer -- it
+  // fires exactly once per real transition, on the browser's own
+  // 'transitionend' event, and only acts (re-measures + re-applies)
+  // when the settled position actually needs correcting.
+  track.addEventListener('transitionend',function(e){
+    if(e.target!==track || e.propertyName!=='transform')return;
+    const activeSlide=cur===0?track.querySelector('.login-right'):track.querySelector('.login-left');
+    if(!activeSlide || !swiper)return;
+    const slideRect=activeSlide.getBoundingClientRect();
+    const swiperRect=swiper.getBoundingClientRect();
+    if(Math.abs(slideRect.left-swiperRect.left)>1){
+      applyTrackTransformInstant(cur);
+    }
+  });
+
   dots.forEach((d,i)=>d.addEventListener('click',()=>{
     const action = d.dataset.action;
     if(action==='picker'){
```

---

## Frozen scope — confirmed untouched

Per the diff above (and the Earth-freeze manifest's 65/65 key match), the
following are byte-identical to V20.2, as required:

- All Future Earth SVG paths, `lhmzEarthView*` groups, continent `d` attributes
- All `lhmzGlow*` filters and their `feGaussianBlur`/`feMerge` structure
- `globeSequenceProgress` and all its init/factor constants
- Every sequence/crossfade `bell()` window (`toAsiaPacific`, `toAmericas`,
  all `emph*`)
- The eye region-gaze logic
- All v19.1 arrival formulas
- Head/hand geometry
- Halo/ring/core/highlight/grid
- Translation strings (English and Arabic)
- Arabic/RTL layout and `direction:rtl` rule
- Navigation outside the swiper
- The World globe runtime (`twoWorldsInit()`, `CONTINENTS`, `project()`,
  `drawContinents()`)
- All unrelated code

Only the 3 hunks above — entirely inside `initLoginSwiper()`'s swiper-track
positioning logic — were changed.

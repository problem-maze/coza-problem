// Gate C automated runtime checks for Problem-v86-DARK-ONLY.html
// Run with: NODE_PATH=/opt/node22/lib/node_modules node gate-c-runtime.js
const path = require('path');
const { chromium } = require('playwright');

const FILE = 'file://' + path.resolve('/home/user/coza-problem/Problem-v86-DARK-ONLY.html');
const results = { generatedAtNote: 'timestamps below are wall-clock from this run, not baked into the deterministic inventory files', tiers: {} };
let overallErrors = [];

async function runForTier(browser, tier) {
  const context = await browser.newContext();
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
  page.on('pageerror', err => pageErrors.push(String(err)));

  await page.addInitScript((t) => {
    try {
      if (t === 'auto') { localStorage.removeItem('p_tierForce'); }
      else { localStorage.setItem('p_tierForce', t); }
      localStorage.setItem('introSeen', '1'); // skip intro/login churn for the nav-loop portion
    } catch (e) {}
  }, tier);

  const tierResult = { tier, consoleErrorsAtColdStart: null, coldStart: null, navLoop: [], visibility: null, tierForcePersistence: null, brandReveal: null, devtoolsInterval: null, heroPrinciplesColdState: null };

  await page.goto(FILE, { waitUntil: 'load' });
  await page.waitForTimeout(500);

  tierResult.coldStart = await page.evaluate(() => window.PhaseAValidation ? window.PhaseAValidation.snapshot('cold-start') : null);
  tierResult.consoleErrorsAtColdStart = consoleErrors.slice();

  // Nav loop x3: landing -> solve -> circle -> watch -> talk -> landing
  const routes = ['solve', 'circle', 'watch', 'talk', 'landing'];
  for (let i = 0; i < 3; i++) {
    for (const r of routes) {
      await page.evaluate((route) => { if (typeof window.showPage === 'function') window.showPage(route); }, r);
      await page.waitForTimeout(150);
    }
    const snap = await page.evaluate(() => window.PhaseAValidation.snapshot('nav-loop-iteration'));
    tierResult.navLoop.push(snap);
  }

  // Visibility: hide then restore using PageLife's validation-only hook
  const beforeHide = await page.evaluate(() => window.PhaseAValidation.snapshot('before-hide'));
  const hidden = await page.evaluate(() => window.PageLife.validationSetHidden(true));
  const afterHideWait = await page.waitForTimeout(300).then(() => page.evaluate(() => window.PhaseAValidation.snapshot('after-hide-wait')));
  const restored = await page.evaluate(() => window.PageLife.validationSetHidden(false));
  await page.waitForTimeout(300);
  const afterRestore = await page.evaluate(() => window.PhaseAValidation.snapshot('after-restore'));
  tierResult.visibility = { beforeHide, hidden, afterHideWait, restored, afterRestore };

  // Tier-force persistence: attempt to override tier without {force:true} while forced
  tierResult.tierForcePersistence = await page.evaluate(() => {
    if (!window.perf || !window.perf.tierForced) return { applicable: false, reason: 'tier not forced in this run' };
    const before = window.perf.tier;
    const changed = window.setPerfTier(before === 'low' ? 'high' : 'low', 'gate-c-attempted-override');
    const after = window.perf.tier;
    return { applicable: true, before, attemptedChange: changed, after, heldForced: after === before && changed === false };
  });

  // Repair 1 + 2: BrandReveal must stop EARLY (well before its natural ~6.6s) when the
  // tab is simulated hidden mid-cinematic. Do not await play()'s completion promise —
  // that would just wait out the natural duration and prove nothing about the fix.
  tierResult.brandReveal = await page.evaluate(async () => {
    const ov = document.getElementById('brandReveal');
    if (!ov || typeof BrandReveal === 'undefined') return { applicable: false, reason: 'brandReveal element or module not found' };
    ov.classList.remove('active', 'fading');
    let finishedNaturally = false;
    const t0 = performance.now();
    BrandReveal.play(() => { finishedNaturally = true; });
    await new Promise(r => setTimeout(r, 50)); // let the synchronous part of play() run (adds 'active', starts rAF)
    const activeShortlyAfterPlay = ov.classList.contains('active');
    Object.defineProperty(document, 'hidden', { get: () => true, configurable: true });
    document.dispatchEvent(new Event('visibilitychange'));
    // Wait well under the natural 6.6s animation length, but past the loop()'s next
    // rAF tick plus the existing ~900ms fade-out that _finish() always performs.
    await new Promise(r => setTimeout(r, 1300));
    const elapsedMs = performance.now() - t0;
    const activeAfterEarlyHide = ov.classList.contains('active');
    Object.defineProperty(document, 'hidden', { get: () => false, configurable: true });
    document.dispatchEvent(new Event('visibilitychange')); // restore real "visible" state for subsequent checks
    return {
      applicable: true,
      activeShortlyAfterPlay,
      elapsedMsWhenChecked: Math.round(elapsedMs),
      activeAfterEarlyHide,
      finishedEarlyDueToHidden: activeShortlyAfterPlay && !activeAfterEarlyHide && elapsedMs < 6600,
      finishedNaturallyFlagAlreadyTrue: finishedNaturally
    };
  });

  // Repair 3: devtools interval pauses on hidden, resumes on visible
  tierResult.devtoolsInterval = await page.evaluate(async () => {
    const beforeHidden = !!window._devToolsInterval;
    Object.defineProperty(document, 'hidden', { get: () => true, configurable: true });
    document.dispatchEvent(new Event('visibilitychange'));
    await new Promise(r => setTimeout(r, 50));
    const duringHidden = !!window._devToolsInterval;
    Object.defineProperty(document, 'hidden', { get: () => false, configurable: true });
    document.dispatchEvent(new Event('visibilitychange'));
    await new Promise(r => setTimeout(r, 50));
    const afterRestore = !!window._devToolsInterval;
    return { beforeHidden, duringHidden, afterRestore };
  });

  // Repair 4: cold-start state of the legacy carousel (expected already-cleared on this page variant)
  tierResult.heroPrinciplesColdState = await page.evaluate(() => ({
    bootTimer: window._showNextBootTimer || 0,
    interval: window._showNextInterval || 0,
    hiPanelPresent: !!document.getElementById('hiPanel')
  }));

  tierResult.consoleErrorsFull = consoleErrors;
  tierResult.pageErrors = pageErrors;
  overallErrors.push(...pageErrors.map(e => `[tier=${tier}] ${e}`));

  await context.close();
  return tierResult;
}

(async () => {
  const browser = await chromium.launch();
  for (const tier of ['high', 'mid', 'low', 'auto']) {
    results.tiers[tier] = await runForTier(browser, tier);
  }
  await browser.close();
  results.overallPageErrors = overallErrors;
  console.log(JSON.stringify(results, null, 2));
})().catch(e => { console.error('GATE C SCRIPT FAILURE:', e); process.exit(1); });

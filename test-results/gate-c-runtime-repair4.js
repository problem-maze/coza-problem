// Gate C automated runtime checks for Problem-v86-DARK-ONLY.html — Repair-4-updated revision.
//
// Changes vs. the previous (blocked) revision, test-results/gate-c-runtime.js:
//   A. Navigation waits on a deterministic route-completion predicate requiring BOTH
//      route authorities — the DOM-visible route (PhaseAValidation.activeRoute()) and
//      the lifecycle authority (PageLife.state().route) — to agree on the expected
//      route. No fixed sleep. Disagreement after the timeout is recorded as FAIL.
//      The previous revision waited a flat 150ms and captured a mixed state
//      (activeRoute:"talk" while PageLife.route:"landing"), which was not valid proof.
//   B. New scenario: #hiPanel removed before the insight-cards script runs, while
//      Landing stays active — proves the legacy carousel creates and leaves no interval.
//   C. New scenario: #hiPanel present — proves the live carousel starts and is stopped
//      at its lifecycle exit, and that the superseded legacy carousel owns no interval.
//
// Timer ownership is observed directly by wrapping setInterval/clearInterval in an init
// script, so "no interval running" is proven from actual creation/clear events rather
// than inferred from some other script having cleared a global variable.
//
// Run with: NODE_PATH=<playwright install root> node gate-c-runtime-repair4.js
// Exit code 0 = all assertions passed; 1 = at least one assertion failed; 2 = script error.
const path = require('path');
const { chromium } = require('playwright');

// NOTE: adjust this one line when running outside the original session container.
const FILE = 'file://' + path.resolve('/home/user/coza-problem/Problem-v86-DARK-ONLY.html');

// Router transition is ~300ms (showPage) + ~360ms (OffscreenWorkGate settle).
// 5000ms gives ample headroom without masking a real failure.
const ROUTE_TIMEOUT_MS = 5000;
const CAROUSEL_INTERVAL_MS = 3500;   // legacy heroPrinciples carousel cadence
const INSIGHT_INTERVAL_MS = 5000;    // insight-cards carousel cadence
const CAROUSEL_BOOT_MS = 4000;       // legacy carousel boot timer

const results = { note: 'Route waits are predicate-based, not fixed sleeps. Wall-clock values are from this run.', tiers: {}, scenarios: {} };
const overallErrors = [];

// Progress goes to stderr so stdout stays a clean JSON document.
const T0 = Date.now();
const log = (m) => process.stderr.write('[+' + String(Math.round((Date.now() - T0) / 1000)).padStart(4) + 's] ' + m + '\n');

function timerInstrumentation() {
  window.__timerLog = { created: [], cleared: [] };
  const _si = window.setInterval;
  const _ci = window.clearInterval;
  window.setInterval = function (fn, delay) {
    const id = _si.apply(window, arguments);
    try { window.__timerLog.created.push({ id: id, delay: delay }); } catch (e) {}
    return id;
  };
  window.clearInterval = function (id) {
    try { window.__timerLog.cleared.push(id); } catch (e) {}
    return _ci.apply(window, arguments);
  };
}

// Must be a real function, not a string: page.evaluate() treats a string as an
// expression, which here would yield an unserializable Function and silently
// return undefined while ignoring the argument.
function liveIntervalsInPage(delay) {
  const log = window.__timerLog || { created: [], cleared: [] };
  const cleared = new Set(log.cleared);
  const live = log.created.filter(c => !cleared.has(c.id));
  return (delay == null) ? live : live.filter(c => c.delay === delay);
}

async function readRouteState(page) {
  return page.evaluate(() => ({
    activeRoute: (window.PhaseAValidation && window.PhaseAValidation.activeRoute) ? window.PhaseAValidation.activeRoute() : null,
    pageLifeRoute: (window.PageLife && window.PageLife.state) ? window.PageLife.state().route : null
  }));
}

async function navigateAndWaitForRouteCompletion(page, route) {
  const started = Date.now();
  await page.evaluate((r) => { if (typeof window.showPage === 'function') window.showPage(r); }, route);
  let agreed = true, timeoutError = null;
  try {
    await page.waitForFunction((expected) => {
      const av = (window.PhaseAValidation && window.PhaseAValidation.activeRoute) ? window.PhaseAValidation.activeRoute() : null;
      const pl = (window.PageLife && window.PageLife.state) ? window.PageLife.state().route : null;
      return av === expected && pl === expected;
    }, route, { timeout: ROUTE_TIMEOUT_MS });
  } catch (e) {
    agreed = false;
    timeoutError = String(e && e.message ? e.message.split('\n')[0] : e);
  }
  const finalState = await readRouteState(page);
  return {
    requestedRoute: route, agreed, waitedMs: Date.now() - started, finalState, timeoutError,
    verdict: agreed ? 'PASS' : 'FAIL — route authorities disagreed after timeout'
  };
}

async function newInstrumentedPage(browser, tier, extraInit) {
  const context = await browser.newContext();
  const page = await context.newPage();
  const consoleErrors = [], pageErrors = [];
  page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  page.on('pageerror', e => pageErrors.push(String(e)));
  await page.addInitScript(timerInstrumentation);
  await page.addInitScript((t) => {
    try {
      if (t === 'auto') localStorage.removeItem('p_tierForce'); else localStorage.setItem('p_tierForce', t);
      localStorage.setItem('introSeen', '1');
    } catch (e) {}
  }, tier);
  if (extraInit) await page.addInitScript(extraInit);
  return { context, page, consoleErrors, pageErrors };
}

async function runForTier(browser, tier) {
  const { context, page, consoleErrors, pageErrors } = await newInstrumentedPage(browser, tier);
  const r = { tier };

  log('tier ' + tier + ': goto');
  await page.goto(FILE, { waitUntil: 'load' });
  await page.waitForTimeout(500);
  r.coldStart = await page.evaluate(() => window.PhaseAValidation ? window.PhaseAValidation.snapshot('cold-start') : null);
  r.consoleErrorsAtColdStart = consoleErrors.slice();

  const routes = ['solve', 'circle', 'watch', 'talk', 'landing'];
  r.navLoop = [];
  for (let i = 0; i < 3; i++) {
    const iteration = { iteration: i, routes: [] };
    for (const route of routes) {
      const rec = await navigateAndWaitForRouteCompletion(page, route);
      log('  tier ' + tier + ' iter' + i + ' -> ' + route + ' agreed=' + rec.agreed + ' in ' + rec.waitedMs + 'ms');
      iteration.routes.push(rec);
    }
    iteration.snapshotAfterIteration = await page.evaluate(() => window.PhaseAValidation.snapshot('nav-loop-iteration'));
    iteration.allRoutesAgreed = iteration.routes.every(x => x.agreed);
    r.navLoop.push(iteration);
  }
  r.navLoopAllRoutesAgreed = r.navLoop.every(i => i.allRoutesAgreed);

  const beforeHide = await page.evaluate(() => window.PhaseAValidation.snapshot('before-hide'));
  await page.evaluate(() => window.PageLife.validationSetHidden(true));
  await page.waitForTimeout(300);
  const afterHideWait = await page.evaluate(() => window.PhaseAValidation.snapshot('after-hide-wait'));
  await page.evaluate(() => window.PageLife.validationSetHidden(false));
  await page.waitForTimeout(300);
  const afterRestore = await page.evaluate(() => window.PhaseAValidation.snapshot('after-restore'));
  r.visibility = { beforeHide, afterHideWait, afterRestore };

  r.tierForcePersistence = await page.evaluate(() => {
    if (!window.perf || !window.perf.tierForced) return { applicable: false, reason: 'tier not forced in this run' };
    const before = window.perf.tier;
    const changed = window.setPerfTier(before === 'low' ? 'high' : 'low', 'gate-c-attempted-override');
    const after = window.perf.tier;
    return { applicable: true, before, attemptedChange: changed, after, heldForced: after === before && changed === false };
  });

  r.brandReveal = await page.evaluate(async () => {
    const ov = document.getElementById('brandReveal');
    if (!ov || typeof BrandReveal === 'undefined') return { applicable: false };
    ov.classList.remove('active', 'fading');
    const t0 = performance.now();
    BrandReveal.play(() => {});
    await new Promise(r2 => setTimeout(r2, 50));
    const activeShortlyAfterPlay = ov.classList.contains('active');
    Object.defineProperty(document, 'hidden', { get: () => true, configurable: true });
    document.dispatchEvent(new Event('visibilitychange'));
    await new Promise(r2 => setTimeout(r2, 1300));
    const elapsedMs = performance.now() - t0;
    const activeAfterEarlyHide = ov.classList.contains('active');
    Object.defineProperty(document, 'hidden', { get: () => false, configurable: true });
    document.dispatchEvent(new Event('visibilitychange'));
    return { applicable: true, activeShortlyAfterPlay, elapsedMsWhenChecked: Math.round(elapsedMs), activeAfterEarlyHide,
             finishedEarlyDueToHidden: activeShortlyAfterPlay && !activeAfterEarlyHide && elapsedMs < 6600 };
  });

  r.devtoolsInterval = await page.evaluate(async () => {
    const beforeHidden = !!window._devToolsInterval;
    Object.defineProperty(document, 'hidden', { get: () => true, configurable: true });
    document.dispatchEvent(new Event('visibilitychange'));
    await new Promise(r2 => setTimeout(r2, 50));
    const duringHidden = !!window._devToolsInterval;
    Object.defineProperty(document, 'hidden', { get: () => false, configurable: true });
    document.dispatchEvent(new Event('visibilitychange'));
    await new Promise(r2 => setTimeout(r2, 50));
    return { beforeHidden, duringHidden, afterRestore: !!window._devToolsInterval };
  });

  r.liveLegacyCarouselIntervals = await page.evaluate(liveIntervalsInPage, CAROUSEL_INTERVAL_MS);
  r.consoleErrorsFull = consoleErrors;
  r.pageErrors = pageErrors;
  overallErrors.push(...pageErrors.map(e => `[tier=${tier}] ${e}`));
  log('tier ' + tier + ': done');
  await context.close();
  return r;
}

async function runMissingHiPanelScenario(browser) {
  const removeHiPanelEarly = () => {
    window.__hiPanelRemoved = false;
    const mo = new MutationObserver(() => {
      const p = document.getElementById('hiPanel');
      if (p && p.parentNode) { p.parentNode.removeChild(p); window.__hiPanelRemoved = true; mo.disconnect(); }
    });
    // Init scripts run before <html> exists, so documentElement is still null here.
    // `document` is always a Node and subtree:true covers the whole parse.
    mo.observe(document, { childList: true, subtree: true });
  };
  log('scenario: missing-hiPanel');
  const { context, page, pageErrors } = await newInstrumentedPage(browser, 'auto', removeHiPanelEarly);
  const s = { name: 'missing-hiPanel', description: '#hiPanel removed during parse, before the insight-cards script runs; Landing stays active.' };

  await page.goto(FILE, { waitUntil: 'load' });

  s.hiPanelRemovedDuringParse = await page.evaluate(() => !!window.__hiPanelRemoved);
  s.hiPanelPresentNow = await page.evaluate(() => !!document.getElementById('hiPanel'));
  // If insight-cards had seen #hiPanel it would have set #heroPrinciples to display:none.
  // Still-visible => insight-cards returned early => the removal really did win the race,
  // so the legacy carousel is genuinely unsupervised in this scenario (no external clear).
  s.insightCardsReturnedEarly = await page.evaluate(() => {
    const hp = document.getElementById('heroPrinciples');
    return !!hp && hp.style.display !== 'none';
  });
  s.landingActiveAtBoot = await page.evaluate(() => {
    const l = document.getElementById('pageLanding');
    return !!l && l.classList.contains('active');
  });

  await page.waitForTimeout(CAROUSEL_BOOT_MS + 2500);

  s.afterBoot = {
    liveCarouselIntervals: await page.evaluate(liveIntervalsInPage, CAROUSEL_INTERVAL_MS),
    showNextIntervalGlobal: await page.evaluate(() => window._showNextInterval || 0),
    showNextBootTimerGlobal: await page.evaluate(() => window._showNextBootTimer || 0),
    landingStillActive: await page.evaluate(() => { const l = document.getElementById('pageLanding'); return !!l && l.classList.contains('active'); })
  };

  s.navigateAway = await navigateAndWaitForRouteCompletion(page, 'solve');
  await page.waitForTimeout(1000);
  s.afterNavigateAway = {
    liveCarouselIntervals: await page.evaluate(liveIntervalsInPage, CAROUSEL_INTERVAL_MS),
    showNextIntervalGlobal: await page.evaluate(() => window._showNextInterval || 0)
  };

  s.pageErrors = pageErrors;
  s.pass =
    s.hiPanelRemovedDuringParse === true &&
    s.hiPanelPresentNow === false &&
    s.insightCardsReturnedEarly === true &&
    s.landingActiveAtBoot === true &&
    s.afterBoot.liveCarouselIntervals.length === 0 &&
    !s.afterBoot.showNextIntervalGlobal &&
    s.afterBoot.landingStillActive === true &&
    s.afterNavigateAway.liveCarouselIntervals.length === 0 &&
    !s.afterNavigateAway.showNextIntervalGlobal &&
    s.navigateAway.agreed === true &&
    pageErrors.length === 0;
  s.verdict = s.pass ? 'PASS' : 'FAIL';
  overallErrors.push(...pageErrors.map(e => `[scenario=missing-hiPanel] ${e}`));
  await context.close();
  return s;
}

async function runHiPanelPresentScenario(browser) {
  log('scenario: hiPanel-present');
  const { context, page, pageErrors } = await newInstrumentedPage(browser, 'auto');
  const s = { name: 'hiPanel-present-regression', description: '#hiPanel present and Landing active: the live (insight-cards) carousel starts and is stopped when Landing is left; the superseded legacy carousel owns no interval.' };

  await page.goto(FILE, { waitUntil: 'load' });
  s.hiPanelPresent = await page.evaluate(() => !!document.getElementById('hiPanel'));
  await page.waitForTimeout(4200); // insight-cards becomes 'ready' 3s after DOMContentLoaded

  s.whileLandingActive = {
    landingActive: await page.evaluate(() => { const l = document.getElementById('pageLanding'); return !!l && l.classList.contains('active'); }),
    liveInsightIntervals: await page.evaluate(liveIntervalsInPage, INSIGHT_INTERVAL_MS),
    liveLegacyCarouselIntervals: await page.evaluate(liveIntervalsInPage, CAROUSEL_INTERVAL_MS),
    legacyPrinciplesHiddenBySuccessor: await page.evaluate(() => {
      const hp = document.getElementById('heroPrinciples');
      return !!hp && hp.style.display === 'none';
    })
  };

  s.navigateAway = await navigateAndWaitForRouteCompletion(page, 'circle');
  await page.waitForTimeout(800);
  s.afterLifecycleExit = {
    liveInsightIntervals: await page.evaluate(liveIntervalsInPage, INSIGHT_INTERVAL_MS),
    liveLegacyCarouselIntervals: await page.evaluate(liveIntervalsInPage, CAROUSEL_INTERVAL_MS)
  };

  s.pageErrors = pageErrors;
  s.pass =
    s.hiPanelPresent === true &&
    s.whileLandingActive.landingActive === true &&
    s.whileLandingActive.liveInsightIntervals.length >= 1 &&
    s.whileLandingActive.liveLegacyCarouselIntervals.length === 0 &&
    s.whileLandingActive.legacyPrinciplesHiddenBySuccessor === true &&
    s.navigateAway.agreed === true &&
    s.afterLifecycleExit.liveInsightIntervals.length === 0 &&
    s.afterLifecycleExit.liveLegacyCarouselIntervals.length === 0 &&
    pageErrors.length === 0;
  s.verdict = s.pass ? 'PASS' : 'FAIL';
  overallErrors.push(...pageErrors.map(e => `[scenario=hiPanel-present] ${e}`));
  await context.close();
  return s;
}

(async () => {
  const browser = await chromium.launch();
  for (const tier of ['high', 'mid', 'low', 'auto']) results.tiers[tier] = await runForTier(browser, tier);
  results.scenarios.missingHiPanel = await runMissingHiPanelScenario(browser);
  results.scenarios.hiPanelPresent = await runHiPanelPresentScenario(browser);
  await browser.close();

  results.overallPageErrors = overallErrors;
  results.summary = {
    allTiersRouteCompletionAgreed: Object.values(results.tiers).every(t => t.navLoopAllRoutesAgreed),
    missingHiPanelScenario: results.scenarios.missingHiPanel.verdict,
    hiPanelPresentScenario: results.scenarios.hiPanelPresent.verdict,
    totalUncaughtPageErrors: overallErrors.length
  };
  console.log(JSON.stringify(results, null, 2));
  const ok = results.summary.allTiersRouteCompletionAgreed &&
             results.summary.missingHiPanelScenario === 'PASS' &&
             results.summary.hiPanelPresentScenario === 'PASS' &&
             overallErrors.length === 0;
  process.exit(ok ? 0 : 1);
})().catch(e => { console.error('GATE C SCRIPT FAILURE:', e); process.exit(2); });

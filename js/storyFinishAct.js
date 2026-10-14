// Акты 2+: награда (изолента, вещь редкости reward.item, опыт xpPct — доля уровня, очко Реестра paragon), задание уходит из журнала, акт пройден,
// открываются функции следующего акта; через пару секунд начинается следующий акт.
function storyFinishAct() {
  const slot = getActiveSlot();
  const hero = loadSlot(slot);
  if (!hero) return;
  const st = storyState(hero);
  const act = STORY_ACTS[st.act - 1];
  if (!act) return;
  const lockedBefore = Object.keys(STORY_FEATURES).filter(k => !storyFeatureOpen(k, hero));
  hero.tape = (hero.tape || 0) + (act.reward.tape || 0);
  const xp = act.reward.xpPct ? Math.round(xpToNext(hero.level) * act.reward.xpPct) : 0; // опыт — доля уровня
  const ups = xp ? grantXp(hero, xp) : 0;
  if (act.reward.paragon) { // очко Реестра — общее на аккаунт
    const acc = loadAccount();
    acc.paragon = acc.paragon || { ranks: {} };
    acc.paragon.bonus = (acc.paragon.bonus || 0) + act.reward.paragon;
    saveAccount(acc);
  }
  if (act.id === 'act7' && typeof unlockCamp === 'function') unlockCamp(); // лагерь открыт и на аккаунт
  const item = act.reward.item ? rollItem(hero.level, act.reward.item) : null;
  const got = item && addToBag(hero, [item]).added.length;
  hero.quests = hero.quests || {};
  hero.quests.active = (hero.quests.active || []).filter(q => q.uid !== 'story-' + act.id);
  hero.quests.done = (hero.quests.done || 0) + 1;
  st.done = st.act;
  st.act++;
  st.stage = 0;
  saveSlot(slot, hero);
  const opened = lockedBefore.filter(k => storyFeatureOpen(k, hero)).map(k => STORY_FEATURE_NAMES[k]);
  vibrate([30, 40, 30]);
  const parts = [];
  if (act.reward.tape) parts.push(tapeText(act.reward.tape));
  if (xp) parts.push('+' + xp + tr("ui. опыта"));
  if (act.reward.paragon) parts.push('+' + act.reward.paragon + tr("ui. очко Реестра"));
  showToast(tr("ui.Задание «") + act.title + tr("ui.» выполнено. ") + parts.join(', ') +
    (got ? ' + ' + item.name : '') + (opened.length ? tr("ui.. Открыто: ") + opened.join(', ') : ''), 5000);
  hideTutorial();
  const cur = (document.querySelector('.screen.active') || {}).id;
  if (cur && cur !== 'game') renderScreen(cur);
  if (ups) showLevelUp(hero.level, ups); // новый уровень за опыт
  setTimeout(tutorialCheck, 0); // следующий акт — сразу
}

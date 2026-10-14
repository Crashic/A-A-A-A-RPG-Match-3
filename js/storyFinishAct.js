// Акты 2+: награда (изолента и вещь редкости reward.item), задание уходит из журнала, акт пройден,
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
  showToast(tr("ui.Задание «") + act.title + tr("ui.» выполнено. ") + tapeText(act.reward.tape || 0) +
    (got ? ' + ' + item.name : '') + (opened.length ? tr("ui.. Открыто: ") + opened.join(', ') : ''), 5000);
  hideTutorial();
  const cur = (document.querySelector('.screen.active') || {}).id;
  if (cur && cur !== 'game') renderScreen(cur);
  setTimeout(tutorialCheck, 1800); // следующий акт
}

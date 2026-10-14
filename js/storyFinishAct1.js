// Акт 1 пройден: награда (изолента и обычное оружие), задание уходит из журнала, открываются функции.
function storyFinishAct1() {
  const slot = getActiveSlot();
  const hero = loadSlot(slot);
  if (!hero) return;
  const st = storyState(hero);
  const lockedBefore = Object.keys(STORY_FEATURES).filter(k => !storyFeatureOpen(k, hero));
  hero.tape = (hero.tape || 0) + STORY_ACT1.reward.tape;
  const item = storyWeapon(hero.level);
  const got = addToBag(hero, [item]).added.length;
  hero.quests.active = (hero.quests.active || []).filter(q => q.uid !== 'story-act1');
  hero.quests.done = (hero.quests.done || 0) + 1;
  st.done = 1;
  st.act = 2;
  st.stage = 0; // акт 2 начнётся сам, через пару секунд
  saveSlot(slot, hero);
  const opened = lockedBefore.filter(k => storyFeatureOpen(k, hero)).map(k => STORY_FEATURE_NAMES[k]);
  vibrate([30, 40, 30]);
  showToast(tr("ui.Задание «") + STORY_ACT1.title + tr("ui.» выполнено. ") + tapeText(STORY_ACT1.reward.tape) +
    (got ? ' + ' + item.name : '') + (opened.length ? tr("ui.. Открыто: ") + opened.join(', ') : ''), 5000);
  hideTutorial();
  const cur = (document.querySelector('.screen.active') || {}).id;
  if (cur && cur !== 'game') renderScreen(cur);
  setTimeout(tutorialCheck, 500); // следующий акт — через полсекунды
}

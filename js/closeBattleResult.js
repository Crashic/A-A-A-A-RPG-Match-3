// Закрывает окно итогов боя. Если в бою получен уровень — следом окно «Новый уровень» (showLevelUp),
// then — что сделать после всех окон («Ещё раз»).
function closeBattleResult(then) {
  setTimeout(tutorialCheck, 50); // обучение: после итогов — подсказки по меню справа
  document.getElementById('battleResult').classList.remove('open');
  storyJunkDone(); // урок про хлам окончен
  if (storyAfterPending()) then = null; // сюжет: сначала разговор с NPC, «Ещё раз» — потом
  const up = battleLevelUp;
  battleLevelUp = null;
  if (up) showLevelUp(up.level, up.ups, typeof then === 'function' ? then : null);
  else if (typeof then === 'function') then();
}

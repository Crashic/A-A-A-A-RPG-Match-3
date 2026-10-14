// Замки функций по сюжету (storyFeatureOpen): кнопки закрытых функций серые, с замком.
// Кнопки — столбец меню экранов (data-act), меню боя и главное меню; функция кнопки — data-feature.
const FEATURE_BUTTONS = { btnCharGame: 'char', btnCampGame: 'camp', btnJournalGame: 'journal', btnMap: 'map', btnCamp: 'camp', btnCharacter: 'char' };
function updateFeatureLocks(hero) {
  hero = hero === undefined ? loadSlot(getActiveSlot()) : hero;
  const mark = (el, feature) => {
    if (!el) return;
    el.dataset.feature = feature;
    el.classList.toggle('featureLocked', !!hero && !storyFeatureOpen(feature, hero));
  };
  document.querySelectorAll('.sideMenu [data-act]').forEach(b => mark(b, b.dataset.act));
  for (const id in FEATURE_BUTTONS) mark(document.getElementById(id), FEATURE_BUTTONS[id]);
}

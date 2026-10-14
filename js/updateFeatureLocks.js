// Замки функций по сюжету (storyFeatureOpen): закрытые функции СКРЫТЫ (класс featureLocked), появляются, когда сюжет их откроет.
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
  for (const [f, card] of [['stash', 'storage'], ['registry', 'registry']]) // карточки лагеря — целиком
    mark(document.querySelector('#campBody .campCard[data-card="' + card + '"]'), f);
  for (const f of ['board', 'bank']) mark(document.querySelector('#bunkerBody .bunkerCard[data-card="' + f + '"]'), f); // карточки бункера — целиком
}

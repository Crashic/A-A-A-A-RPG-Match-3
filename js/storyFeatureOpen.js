// Открыта ли функция игры по сюжету (STORY_FEATURES): начался её акт (пройдены все предыдущие). Если такого акта ещё нет
// в STORY_ACTS — открывается, когда пройдены все готовые акты. Не из списка — открыта всегда.
function storyFeatureOpen(feature, hero) {
  if (!(feature in STORY_FEATURES)) return true;
  hero = hero || loadSlot(getActiveSlot());
  if (!hero) return true;
  const done = storyState(hero).done || 0;
  const need = Math.min(STORY_FEATURES[feature] - 1, STORY_ACTS.length);
  return done >= need;
}

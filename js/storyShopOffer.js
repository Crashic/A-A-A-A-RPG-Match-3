// Квестовые предметы на прилавке Семёныча: каска — пока идёт акт 3 и её ещё нет.
function storyShopOffer(hero) {
  const st = storyState(hero);
  return st.act === 3 && !hasQuestItem(hero, 'helmet') ? [findById(QUEST_ITEMS, 'helmet')] : [];
}

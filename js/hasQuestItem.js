// Есть ли у героя квестовый предмет id.
function hasQuestItem(hero, id) {
  return !!hero && (hero.questItems || []).includes(id);
}

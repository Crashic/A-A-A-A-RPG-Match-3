// Ряд из пяти значков характеристик героя hero в контейнер box (меню, создание персонажа).
function renderStatChips(box, hero) {
  box.innerHTML = '';
  const stats = heroStats(hero);
  for (const s of STATS) box.appendChild(statChip(hero.raceId, s.id, stats[s.id]));
}

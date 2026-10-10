// Добавляет герою опыт и поднимает уровни (до 60). Возвращает, сколько уровней получено.
function grantXp(hero, amount) {
  let ups = 0;
  hero.xp += amount;
  while (hero.level < MAX_LEVEL && hero.xp >= xpToNext(hero.level)) {
    hero.xp -= xpToNext(hero.level);
    hero.level++;
    ups++;
  }
  if (hero.level >= MAX_LEVEL) hero.xp = 0;
  return ups;
}

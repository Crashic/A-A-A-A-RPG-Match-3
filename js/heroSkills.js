// Навыки персонажа: два навыка расы и класса (у адаптированных классов Прессы — расы-источника)
// и боевой навык класса за ману (js/classSkills.js) — первым.
function heroSkills(hero) {
  if (!hero) return [];
  const race = hero.raceId === 'press' && PRESS_SKILL_SOURCE[hero.classId] ? PRESS_SKILL_SOURCE[hero.classId] : hero.raceId;
  const own = SKILLS[race + ':' + hero.classId] || [];
  const combat = CLASS_SKILLS[hero.classId];
  const list = combat ? [combat, ...own] : own;
  return list.concat(paragonBonus().skills); // навыки из реестра — у всех персонажей аккаунта
}

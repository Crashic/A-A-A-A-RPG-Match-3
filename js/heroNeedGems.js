// Какие маны нужны навыкам героя прямо сейчас: цвета из цены активных навыков
// (кроме «раз за бой», которые уже потрачены). Массив id фишек.
function heroNeedGems() {
  if (!battle) return [];
  const need = new Set();
  for (const s of heroSkills(battle.save)) {
    if (s.type !== 'active' || (s.once && battle.skill.used[s.id])) continue;
    for (const gem of Object.keys(s.cost || {})) need.add(gem);
  }
  return [...need];
}

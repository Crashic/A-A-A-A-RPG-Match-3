// Меняет значение в «Читере» у текущего героя: field — 'level' | 'blue' | 'black' | 'white' | id характеристики.
// delta — на сколько. Сразу сохраняет и перерисовывает окно.
function changeCheat(field, delta) {
  const slot = getActiveSlot();
  const hero = loadSlot(slot);
  if (!hero) return;
  if (field === 'level') {
    hero.level = Math.max(1, Math.min(MAX_LEVEL, hero.level + delta));
    hero.xp = 0;
  } else if (TAPE_KINDS.some(k => k.id === field)) {
    const k = TAPE_KINDS.find(t => t.id === field);
    hero.tape = Math.max(0, (hero.tape || 0) + delta * k.value);
  } else {
    hero.cheat = cheatBonus(hero);
    hero.cheat[field] = Math.max(-STAT_BASE + 1, hero.cheat[field] + delta);
  }
  saveSlot(slot, hero);
  vibrate(8);
  renderCheat();
  renderMenu();
}

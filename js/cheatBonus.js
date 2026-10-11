// Прибавка к характеристикам из «Читера»: { str, agi, sta, int, spi } (у обычных героев — нули).
function cheatBonus(hero) {
  const c = {};
  for (const s of STATS) c[s.id] = (hero && hero.cheat && hero.cheat[s.id]) || 0;
  return c;
}

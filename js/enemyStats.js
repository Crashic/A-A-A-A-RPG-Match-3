// Характеристики врага по аналогии с игроком: у всех по STAT_BASE + очки за уровень
// (STAT_POINTS_PER_LEVEL с 2-го уровня), распределённые по профилю: сильные бьют — больше Силы,
// живучие — больше Выносливости; элита получает на 20 % очков больше.
function enemyStats(e) {
  const total = Math.round(STAT_POINTS_PER_LEVEL * Math.max(0, e.level - 1) * (e.elite ? 1.2 : 1));
  const weights = { str: 1 + (e.atk - 1) * 4, agi: 0.8, sta: 1 + (e.hp - 1) * 4, int: 0.7, spi: 0.7 };
  const sum = Object.values(weights).reduce((a, b) => a + b, 0);
  const out = {};
  let left = total;
  for (const s of STATS) { out[s.id] = STAT_BASE + Math.floor(total * weights[s.id] / sum); left -= out[s.id] - STAT_BASE; }
  out.str += left; // остаток — в Силу
  return out;
}

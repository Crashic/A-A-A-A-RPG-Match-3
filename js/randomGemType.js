// Случайный тип фишки. В бою учитывается локация: её фишки (zone.gems) выпадают в 2 раза чаще.
function randomGemType() {
  const zone = battle && zoneOfEnemy(battle.enemyId);
  if (!zone || !zone.gems.length) return Math.floor(Math.random() * GEM_TYPES.length);
  const weights = GEM_TYPES.map(g => 1 + zone.gems.filter(id => id === g.id).length);
  let roll = Math.random() * weights.reduce((a, b) => a + b, 0);
  for (let i = 0; i < weights.length; i++) {
    roll -= weights[i];
    if (roll < 0) return i;
  }
  return weights.length - 1;
}

// Ищет врага по id на карте. Возвращает { zone, enemy } или null.
function findEnemy(id) {
  for (const zone of ZONES) {
    const enemy = zone.enemies.find(e => e.id === id);
    if (enemy) return { zone, enemy };
  }
  return null;
}
